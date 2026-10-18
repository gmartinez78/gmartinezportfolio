/**
 * Fill untranslated case-study content using LibreTranslate.
 *
 * The UI dictionary (lib/i18n/*) is already fully translated by hand. This
 * script targets the CMS fallback content (content/case-studies.*.json), where
 * ES/DE strings are still identical to the English source. It translates ONLY
 * those fields and leaves anything already translated untouched, so re-running
 * is cheap and idempotent.
 *
 * Endpoint support (choose one):
 *   - Self-hosted (no key):  LIBRETRANSLATE_URL=http://localhost:5000
 *   - Public API (key):      LIBRETRANSLATE_URL=https://libretranslate.com
 *                            LIBRETRANSLATE_API_KEY=xxxx
 *
 * Usage:
 *   node scripts/libretranslate.mjs            # dry-run (preview, no writes, no API)
 *   node scripts/libretranslate.mjs --apply    # translate + write files
 *   node scripts/libretranslate.mjs --apply --targets=es,de
 *   node scripts/libretranslate.mjs --apply --only=nayya-ai-benefits
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const getFlag = (name) => {
  const hit = args.find((a) => a.startsWith("--" + name + "="));
  return hit ? hit.split("=").slice(1).join("=") : undefined;
};

const TARGETS = (getFlag("targets") || "es,de")
  .split(",")
  .map((t) => t.trim().toLowerCase())
  .filter(Boolean);
const ONLY_SLUG = getFlag("only");

const LT_URL = (process.env.LIBRETRANSLATE_URL || "http://localhost:5000").replace(/\/$/, "");
const LT_KEY = process.env.LIBRETRANSLATE_API_KEY || "";

const CACHE_PATH = resolve(ROOT, ".cache/libretranslate.json");
const MIN_CHARS = 2; // skip empty / trivially short strings

// ---------- cache ----------
let cache = {};
if (existsSync(CACHE_PATH)) {
  try {
    cache = JSON.parse(readFileSync(CACHE_PATH, "utf8"));
  } catch {
    cache = {};
  }
}
const saveCache = () => {
  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
};
const cacheKey = (target, text) => target + "\u0000" + text;

// ---------- helpers ----------
const hasLetters = (s) => /[A-Za-zÀ-ÿ]/.test(s);

function walkStrings(node, path = [], out = []) {
  if (typeof node === "string") {
    out.push({ path, value: node });
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => walkStrings(v, [...path, i], out));
  } else if (node && typeof node === "object") {
    for (const k of Object.keys(node)) walkStrings(node[k], [...path, k], out);
  }
  return out;
}

function getPath(obj, path) {
  return path.reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function setPath(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
  cur[path[path.length - 1]] = value;
}

// ---------- API ----------
async function translateText(text, target) {
  const cached = cache[cacheKey(target, text)];
  if (cached) return cached;

  const body = { q: text, source: "en", target, format: "text" };
  if (LT_KEY) body.api_key = LT_KEY;

  const res = await fetch(LT_URL + "/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error("LibreTranslate " + res.status + ": " + detail.slice(0, 200));
  }
  const data = await res.json();
  const translated = (data.translatedText || "").trim();
  cache[cacheKey(target, text)] = translated;
  return translated;
}

async function translateBatch(items, target, onProgress) {
  const results = new Map();
  let done = 0;
  const CONCURRENCY = 4;
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const i = index++;
      const { text } = items[i];
      try {
        results.set(text, await translateText(text, target));
      } catch (err) {
        results.set(text, null);
        console.error("  ! failed [" + target + "]: " + JSON.stringify(text.slice(0, 60)) + " -> " + err.message);
      }
      done++;
      if (onProgress) onProgress(done, items.length);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return results;
}

// ---------- main ----------
async function main() {
  const srcPath = resolve(ROOT, "content/case-studies.json");
  const en = JSON.parse(readFileSync(srcPath, "utf8"));
  const list = Array.isArray(en) ? en : en.caseStudies || [];

  console.log("Endpoint : " + LT_URL + (LT_KEY ? " (api key set)" : " (no key / self-hosted)"));
  console.log("Targets  : " + TARGETS.join(", "));
  console.log("Mode     : " + (APPLY ? "APPLY (will translate + write)" : "DRY-RUN (preview only)"));
  console.log("");

  for (const target of TARGETS) {
    const targetPath = resolve(ROOT, "content/case-studies." + target + ".json");
    const targetData = JSON.parse(readFileSync(targetPath, "utf8"));
    const targetList = Array.isArray(targetData) ? targetData : targetData.caseStudies || [];

    let translatedCount = 0;
    let skippedCount = 0;

    for (const enStudy of list) {
      if (ONLY_SLUG && enStudy.slug !== ONLY_SLUG) continue;
      const tStudy = targetList.find((s) => s.slug === enStudy.slug);
      if (!tStudy) continue;

      const enFields = walkStrings(enStudy);
      const toTranslate = [];

      for (const { path, value } of enFields) {
        const tValue = getPath(tStudy, path);
        const needs =
          typeof tValue !== "string" ||
          tValue.trim() === "" ||
          tValue === value; // identical to English == untranslated
        if (needs && value.trim().length >= MIN_CHARS && hasLetters(value)) {
          toTranslate.push({ text: value, path });
        } else {
          skippedCount++;
        }
      }

      if (!toTranslate.length) continue;

      const unique = [...new Map(toTranslate.map((t) => [t.text, t])).values()];

      if (APPLY) {
        process.stdout.write("  [" + target + "] " + enStudy.slug + ": translating " + unique.length + " strings... ");
        const results = await translateBatch(unique, target, (d, total) => {
          process.stdout.write("\r  [" + target + "] " + enStudy.slug + ": translating " + d + "/" + total + "...");
        });
        process.stdout.write("\n");
        for (const { text, path } of toTranslate) {
          const translated = results.get(text);
          if (translated) {
            setPath(tStudy, path, translated);
            translatedCount++;
          }
        }
      } else {
        translatedCount += unique.length;
        console.log("  [" + target + "] " + enStudy.slug + ": " + unique.length + " untranslated strings");
      }
    }

    if (APPLY) {
      const out = Array.isArray(targetData) ? targetList : { ...targetData, caseStudies: targetList };
      writeFileSync(targetPath, JSON.stringify(out, null, 2) + "\n");
    }
    console.log(
      "  [" + target + "] " +
        (APPLY ? "wrote" : "would translate") + " ~" + translatedCount +
        " fields, left " + skippedCount + " already-translated fields untouched"
    );
    console.log("");
  }

  if (APPLY) {
    saveCache();
    console.log("Cache saved to " + CACHE_PATH + ".");
  } else {
    console.log("Dry-run only. Re-run with --apply to translate and write.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["en", "es", "de"];
const failures = [];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function describe(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function compareStructure(source, localized, location) {
  if (Array.isArray(source)) {
    if (!Array.isArray(localized) || source.length !== localized.length) {
      failures.push(`${location} must contain ${source.length} items.`);
      return;
    }

    source.forEach((item, index) => compareStructure(item, localized[index], `${location}[${index}]`));
    return;
  }

  if (source && typeof source === "object") {
    if (!localized || typeof localized !== "object" || Array.isArray(localized)) {
      failures.push(`${location} must be an object.`);
      return;
    }

    const sourceKeys = Object.keys(source).sort();
    const localizedKeys = Object.keys(localized).sort();
    if (sourceKeys.join("|") !== localizedKeys.join("|")) {
      failures.push(`${location} must keep the same fields as English.`);
      return;
    }

    sourceKeys.forEach((key) => compareStructure(source[key], localized[key], `${location}.${key}`));
    return;
  }

  if (typeof source !== typeof localized) {
    failures.push(`${location} must be ${describe(source)}, not ${describe(localized)}.`);
    return;
  }

  if (typeof source === "string" && source.trim() && !localized.trim()) {
    failures.push(`${location} cannot be empty.`);
  }
}

const siteContent = Object.fromEntries(
  locales.map((locale) => [locale, readJson(`content/site${locale === "en" ? "" : `.${locale}`}.json`)]),
);

for (const locale of locales.slice(1)) {
  compareStructure(siteContent.en, siteContent[locale], `content/site.${locale}`);
}

const caseStudies = Object.fromEntries(
  locales.map((locale) => [locale, readJson(`content/case-studies${locale === "en" ? "" : `.${locale}`}.json`)]),
);
const englishStudiesBySlug = new Map(caseStudies.en.map((study) => [study.slug, study]));

for (const locale of locales.slice(1)) {
  const localizedStudies = new Map(caseStudies[locale].map((study) => [study.slug, study]));

  if (localizedStudies.size !== englishStudiesBySlug.size) {
    failures.push(`content/case-studies.${locale}.json must include every English case study.`);
  }

  for (const [slug, englishStudy] of englishStudiesBySlug) {
    const localizedStudy = localizedStudies.get(slug);
    if (!localizedStudy) {
      failures.push(`content/case-studies.${locale}.json is missing ${slug}.`);
      continue;
    }

    compareStructure(englishStudy, localizedStudy, `case study ${slug} (${locale})`);
  }
}

const dictionarySource = fs.readFileSync(path.join(root, "lib/i18n/dictionary.ts"), "utf8");
const dictionaryKeys = Array.from(dictionarySource.matchAll(/^  "([^"]+)":/gm), ([, key]) => key);
const germanDictionarySource = fs.readFileSync(path.join(root, "lib/i18n/dictionary.de.ts"), "utf8");
const germanDictionaryJson = germanDictionarySource
  .replace(/^\/\*[\s\S]*?\*\/\s*export const germanDictionary = /, "")
  .replace(/ as const;\s*$/, "");
const germanDictionary = JSON.parse(germanDictionaryJson);

for (const key of dictionaryKeys) {
  if (!germanDictionary[key]?.trim()) {
    failures.push(`German UI copy is missing for dictionary key ${key}.`);
  }
}

if (failures.length) {
  process.stderr.write(`Locale validation failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}\n`);
  process.exit(1);
}

process.stdout.write("Locale validation passed for English, Spanish, and German.\n");

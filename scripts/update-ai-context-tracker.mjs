import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const repoRoot = process.cwd();
const metaPath = path.join(repoRoot, ".ai-context-meta.json");
const contextPath = path.join(repoRoot, "AI_CONTEXT.md");

const START = "<!-- AI_CONTEXT_TRACKER_START -->";
const END = "<!-- AI_CONTEXT_TRACKER_END -->";
const REVIEW_EVERY = 20;

function getHeadCommit() {
  try {
    return execSync("git rev-parse --short HEAD", { cwd: repoRoot, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "unknown";
  }
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function readMeta() {
  if (!fs.existsSync(metaPath)) {
    return {
      reviewEvery: REVIEW_EVERY,
      tasksSinceReview: 0,
      totalTrackedTasks: 0,
      lastTrackedCommit: null,
      lastReviewDate: todayIso(),
      status: "up_to_date",
    };
  }

  return JSON.parse(fs.readFileSync(metaPath, "utf8"));
}

function writeMeta(meta) {
  fs.writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`);
}

function buildTrackerBlock(meta) {
  const statusLabel =
    meta.tasksSinceReview >= meta.reviewEvery ? "Requiere revisión" : "Al día";

  return [
    START,
    "## Mantenimiento automático",
    "",
    "- Regla: revisar y actualizar este archivo cada 20 tareas/commits.",
    `- Tareas desde la última revisión: ${meta.tasksSinceReview} / ${meta.reviewEvery}`,
    `- Total de tareas rastreadas: ${meta.totalTrackedTasks}`,
    `- Último commit rastreado: ${meta.lastTrackedCommit ?? "N/A"}`,
    `- Última revisión marcada: ${meta.lastReviewDate}`,
    `- Estado: ${statusLabel}`,
    END,
  ].join("\n");
}

function writeTrackerBlock(meta) {
  const content = fs.readFileSync(contextPath, "utf8");
  const block = buildTrackerBlock(meta);

  if (content.includes(START) && content.includes(END)) {
    const updated = content.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block);
    fs.writeFileSync(contextPath, updated);
    return;
  }

  const updated = `${block}\n\n${content}`;
  fs.writeFileSync(contextPath, updated);
}

function updateTracker() {
  const meta = readMeta();
  const head = getHeadCommit();

  if (meta.lastTrackedCommit === head) {
    writeTrackerBlock(meta);
    return;
  }

  meta.reviewEvery = REVIEW_EVERY;
  meta.tasksSinceReview += 1;
  meta.totalTrackedTasks += 1;
  meta.lastTrackedCommit = head;
  meta.status = meta.tasksSinceReview >= meta.reviewEvery ? "review_required" : "up_to_date";

  writeMeta(meta);
  writeTrackerBlock(meta);
}

function resetTracker() {
  const meta = readMeta();
  meta.reviewEvery = REVIEW_EVERY;
  meta.tasksSinceReview = 0;
  meta.lastReviewDate = todayIso();
  meta.lastTrackedCommit = getHeadCommit();
  meta.status = "up_to_date";
  writeMeta(meta);
  writeTrackerBlock(meta);
}

const mode = process.argv[2] ?? "update";

if (mode === "reset") {
  resetTracker();
} else {
  updateTracker();
}

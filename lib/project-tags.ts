const HIDDEN_PROJECT_TAGS = new Set([
  "BENEFITS / ENSURANCE SAAS",
  "VORTEILE / SICHERHEIT SAAS",
  "COMPANY PROJECT",
  "COMPANY PROJECTS",
  "PROYECTO PARA EMPRESA",
  "PROYECTOS PARA EMPRESAS",
  "UNTERNEHMENSPROJEKT",
  "UNTERNEHMENSPROJEKTE",
]);

export function getVisibleProjectTags(tags: readonly string[], limit = 2) {
  return Array.from(
    new Set(
      tags.filter((tag) => !HIDDEN_PROJECT_TAGS.has(tag.trim().toUpperCase())),
    ),
  ).slice(0, limit);
}

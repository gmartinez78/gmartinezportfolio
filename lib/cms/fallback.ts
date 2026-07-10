import caseStudies from "@/content/case-studies.json";
import caseStudiesEs from "@/content/case-studies.es.json";
import siteContent from "@/content/site.json";
import siteContentEs from "@/content/site.es.json";
import type { Language } from "@/lib/i18n/language-context";
import type { CaseStudyRecord, SiteContent } from "@/lib/cms/types";

export const fallbackSiteContent = siteContent as SiteContent;
export const fallbackSiteContentEs = siteContentEs as SiteContent;

function normalizeCaseStudies(studies: CaseStudyRecord[]) {
  return studies.map((study) => ({
    ...study,
    filters:
      study.filters ??
      (study.tags
        ? Array.from(
            new Set(
              study.tags.filter((tag) =>
                [
                  "UX Research",
                  "Product Design",
                  "Design Systems",
                  "Mobile",
                  "Accessibility",
                  "AI Product",
                  "Compliance",
                ].includes(tag),
              ),
            ),
          )
        : []),
    content_blocks:
      study.content_blocks ??
      [
        { id: "overview", type: "overview", title: "Overview" },
        { id: "metrics", type: "results", title: "Key Metrics" },
        { id: "pain-points", type: "pain_points", title: "Pain Points" },
        { id: "constraints", type: "constraints", title: "Constraints" },
        { id: "methodology", type: "methodology", title: "Methodology" },
        { id: "strategy", type: "strategy", title: "Design Strategy" },
        { id: "reflections", type: "reflection", title: "Reflections" },
      ],
  }));
}

export const fallbackCaseStudies = normalizeCaseStudies(caseStudies as CaseStudyRecord[]);
export const fallbackCaseStudiesEs = normalizeCaseStudies(caseStudiesEs as CaseStudyRecord[]);

export function getFallbackSiteContent(language: Language) {
  return language === "es" ? fallbackSiteContentEs : fallbackSiteContent;
}

export function getFallbackCaseStudies(language: Language) {
  return language === "es" ? fallbackCaseStudiesEs : fallbackCaseStudies;
}

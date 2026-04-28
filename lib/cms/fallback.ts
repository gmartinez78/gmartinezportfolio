import caseStudies from "@/content/case-studies.json";
import siteContent from "@/content/site.json";
import type { CaseStudyRecord, SiteContent } from "@/lib/cms/types";

export const fallbackSiteContent = siteContent as SiteContent;

export const fallbackCaseStudies = (caseStudies as CaseStudyRecord[]).map((study) => ({
  ...study,
  filters:
    study.filters ??
    Array.from(
      new Set(
        study.tags.filter((tag) =>
          [
            "UX Research",
            "Product Design",
            "Design Systems",
            "Mobile",
            "Accessibility",
          ].includes(tag),
        ),
      ),
    ),
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

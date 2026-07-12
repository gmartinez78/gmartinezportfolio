import type { MetadataRoute } from "next";
import caseStudies from "@/content/case-studies.json";
import type { CaseStudyRecord } from "@/lib/cms/types";
import { getAbsoluteUrl, getCaseStudyPath, shouldIndexCaseStudy } from "@/lib/seo";

export const dynamic = "force-static";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/resume", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/social-media-diagnostic", priority: 0.4, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyRoutes = (caseStudies as CaseStudyRecord[])
    .filter(shouldIndexCaseStudy)
    .map((caseStudy) => ({
      url: getAbsoluteUrl(getCaseStudyPath(caseStudy)),
      lastModified: caseStudy.updated_at ? new Date(caseStudy.updated_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const staticEntries = staticRoutes.map((route) => ({
    url: getAbsoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticEntries, ...caseStudyRoutes];
}

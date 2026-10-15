"use client";

import type { ReactNode } from "react";
import { ProjectCaseStudyPageClient } from "@/app/projects/[slug]/page-client";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * A few legacy case-study routes have English-only bespoke compositions. When
 * Spanish or German is selected, serve the shared case-study view instead: it
 * is driven by the localized CMS payload rather than the English-only legacy
 * composition.
 */
export function LocalizedCaseStudyRoute({ slug, children }: { slug: string; children: ReactNode }) {
  const { language } = useLanguage();

  return language === "en" ? <>{children}</> : <ProjectCaseStudyPageClient slug={slug} />;
}

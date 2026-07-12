import caseStudies from "@/content/case-studies.json";
import { LOCKED_NAYYA_PLACEHOLDER_SLUG } from "@/lib/cms/locked-placeholder";
import type { CaseStudyRecord } from "@/lib/cms/types";
import {
  buildKeywordSet,
  buildMetadata,
  getBreadcrumbSchema,
  getCaseStudyPath,
  getCaseStudySchema,
  shouldIndexCaseStudy,
} from "@/lib/seo";
import { redirect } from "next/navigation";
import { ProjectCaseStudyPageClient } from "./page-client";

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = (caseStudies as CaseStudyRecord[]).find((study) => study.slug === slug);

  if (caseStudy) {
    const canonicalPath = getCaseStudyPath(caseStudy);

    if (canonicalPath.startsWith("/") && canonicalPath !== `/projects/${slug}`) {
      redirect(canonicalPath);
    }
  }

  return (
    <>
      {caseStudy ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                getCaseStudySchema(caseStudy, `/projects/${slug}`, caseStudy.images.hero || caseStudy.images.cover),
              ),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                getBreadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Projects", path: "/projects" },
                  { name: caseStudy.title, path: `/projects/${slug}` },
                ]),
              ),
            }}
          />
        </>
      ) : null}
      <ProjectCaseStudyPageClient slug={slug} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = (caseStudies as CaseStudyRecord[]).find((study) => study.slug === slug);

  if (!caseStudy) {
    return buildMetadata({
      title: "Project Not Found",
      description: "The requested project case study could not be found.",
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${caseStudy.title} Case Study`,
    description:
      caseStudy.tagline ??
      `Case study for ${caseStudy.company} covering product design, UX strategy, and delivery outcomes.`,
    path: `/projects/${slug}`,
    image: caseStudy.images.hero || caseStudy.images.cover,
    keywords: [
      ...buildKeywordSet([
        caseStudy.title,
        `${caseStudy.title} case study`,
        caseStudy.company,
        caseStudy.industry ?? "",
        caseStudy.role ?? "",
        ...(caseStudy.tags ?? []),
        ...(caseStudy.filters ?? []),
        ...(caseStudy.tools ?? []),
      ]),
    ],
    noIndex: !shouldIndexCaseStudy(caseStudy),
    type: "article",
  });
}

export async function generateStaticParams() {
  const studies = (caseStudies as { slug: string }[]).filter(
    (study) =>
      study.slug &&
      study.slug !== "benefits-enrollment" &&
      study.slug !== "reversetech"
  );
  if (!studies.some((study) => study.slug === LOCKED_NAYYA_PLACEHOLDER_SLUG)) {
    studies.push({ slug: LOCKED_NAYYA_PLACEHOLDER_SLUG });
  }
  return studies.map((study) => ({ slug: study.slug }));
}

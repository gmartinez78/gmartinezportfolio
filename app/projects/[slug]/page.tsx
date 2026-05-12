import caseStudies from "@/content/case-studies.json";
import { LOCKED_NAYYA_PLACEHOLDER_SLUG } from "@/lib/cms/locked-placeholder";
import { ProjectCaseStudyPageClient } from "./page-client";

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectCaseStudyPageClient slug={slug} />;
}

export async function generateStaticParams() {
  const studies = (caseStudies as { slug: string }[]).filter(
    (study) => study.slug && study.slug !== "benefits-enrollment"
  );
  if (!studies.some((study) => study.slug === LOCKED_NAYYA_PLACEHOLDER_SLUG)) {
    studies.push({ slug: LOCKED_NAYYA_PLACEHOLDER_SLUG });
  }
  return studies.map((study) => ({ slug: study.slug }));
}

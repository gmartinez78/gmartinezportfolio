import { fallbackCaseStudies } from "@/lib/cms/fallback";
import { ProjectCaseStudyPageClient } from "./page-client";

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectCaseStudyPageClient slug={slug} />;
}

export function generateStaticParams() {
  return fallbackCaseStudies
    .filter((study) => study.slug !== "benefits-enrollment")
    .map((study) => ({ slug: study.slug }));
}

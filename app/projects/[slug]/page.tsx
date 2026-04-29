import { fallbackCaseStudies } from "@/lib/cms/fallback";
import { ProjectCaseStudyPageClient } from "./page-client";

export default function ProjectCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  return <ProjectCaseStudyPageClient slug={params.slug} />;
}

export function generateStaticParams() {
  return fallbackCaseStudies
    .filter((study) => study.slug !== "benefits-enrollment")
    .map((study) => ({ slug: study.slug }));
}

import { fallbackCaseStudies } from "@/lib/cms/fallback";
import { CmsCaseStudyEditorClient } from "./editor-client";

export default function CmsCaseStudyEditorPage({
  params,
}: {
  params: { slug: string };
}) {
  return <CmsCaseStudyEditorClient slug={params.slug} />;
}

export function generateStaticParams() {
  return [{ slug: "new" }, ...fallbackCaseStudies.map((study) => ({ slug: study.slug }))];
}

import type { ReactNode } from "react";
import caseStudies from "@/content/case-studies.json";
import type { CaseStudyRecord } from "@/lib/cms/types";
import { buildMetadata, getBreadcrumbSchema, getCaseStudySchema } from "@/lib/seo";

const caseStudy = (caseStudies as CaseStudyRecord[]).find((study) => study.slug === "reversetech");

export const metadata = buildMetadata({
  title: "Reverse Health Funnel Optimization & A/B Testing",
  description:
    "Case study on growth-focused product design, funnel optimization, and A/B testing work for Reverse Health.",
  path: "/reversetech",
  image: "/images/projects/Reversetech/figma-screen.png",
  keywords: [
    "Reverse Health case study",
    "funnel optimization case study",
    "A/B testing UX portfolio",
    "growth product design",
    "conversion optimization case study",
    "growth UX designer",
  ],
});

export default function ReverseTechLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {caseStudy ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getCaseStudySchema(caseStudy, "/reversetech", caseStudy.images.hero || caseStudy.images.cover),
            ),
          }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: "Reverse Health Funnel Optimization & A/B Testing", path: "/reversetech" },
            ]),
          ),
        }}
      />
      {children}
    </>
  );
}

import type { ReactNode } from "react";
import caseStudies from "@/content/case-studies.json";
import type { CaseStudyRecord } from "@/lib/cms/types";
import { buildMetadata, getBreadcrumbSchema, getCaseStudySchema } from "@/lib/seo";

const caseStudy = (caseStudies as CaseStudyRecord[]).find((study) => study.slug === "benefits-enrollment");

export const metadata = buildMetadata({
  title: "Enhancing Benefits Enrollment Case Study",
  description:
    "Case study on redesigning benefits enrollment workflows for Paychex and Flock, reducing processing time and improving self-service experiences.",
  path: "/benefits",
  image: "/images/projects/benefits-enrollment/hero/benefits-hero.png",
  keywords: [
    "benefits enrollment case study",
    "Paychex UX case study",
    "Flock product design",
    "enterprise SaaS UX portfolio",
    "HR SaaS case study",
    "benefits platform UX",
  ],
});

export default function BenefitsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {caseStudy ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getCaseStudySchema(caseStudy, "/benefits", caseStudy.images.hero || caseStudy.images.cover),
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
              { name: "Enhancing Benefits Enrollment", path: "/benefits" },
            ]),
          ),
        }}
      />
      {children}
    </>
  );
}

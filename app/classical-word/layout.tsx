import type { ReactNode } from "react";
import caseStudies from "@/content/case-studies.json";
import type { CaseStudyRecord } from "@/lib/cms/types";
import { buildMetadata, getBreadcrumbSchema, getCaseStudySchema } from "@/lib/seo";

const caseStudy = (caseStudies as CaseStudyRecord[]).find((study) => study.slug === "classical-word");

export const metadata = buildMetadata({
  title: "Classical Word Arabic Institute | Print Design Case Study",
  description: "A warm, editorial trifold brochure design for Classical Word Arabic Institute.",
  path: "/classical-word",
  image: "/images/projects/classical-word/cover-classical-word.png",
  type: "article",
});

export default function ClassicalWordLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {caseStudy ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getCaseStudySchema(caseStudy, "/classical-word", caseStudy.images.cover),
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
              { name: "Classical Word Arabic Institute", path: "/classical-word" },
            ]),
          ),
        }}
      />
      {children}
    </>
  );
}

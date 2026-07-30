import type { ReactNode } from "react";
import caseStudies from "@/content/case-studies.json";
import type { CaseStudyRecord } from "@/lib/cms/types";
import { buildMetadata, getBreadcrumbSchema, getCaseStudySchema } from "@/lib/seo";

const caseStudy = (caseStudies as CaseStudyRecord[]).find((study) => study.slug === "calendar-keeper");

export const metadata = buildMetadata({
  title: "Calendar Keeper",
  description:
    "A design thinking + AI-powered discovery process uncovering real clinical scheduling problems, leading to a phased MVP strategy for healthcare practice management.",
  path: "/calendar-keeper",
  image: "/images/projects/calendar-keeper/hero/calendar-keeper-hero.png",
  keywords: [
    "Calendar Keeper case study",
    "healthcare design thinking",
    "PMS design",
    "product strategy healthcare",
    "design thinking methodology",
    "AI-augmented design",
    "clinical scheduling",
  ],
});

export default function CalendarKeeperLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {caseStudy ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getCaseStudySchema(caseStudy, "/calendar-keeper", caseStudy.images.hero || caseStudy.images.cover),
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
              { name: "Calendar Keeper", path: "/calendar-keeper" },
            ]),
          ),
        }}
      />
      {children}
    </>
  );
}

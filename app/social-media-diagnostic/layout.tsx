import type { ReactNode } from "react";
import { buildMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Social Media Diagnostic",
  description:
    "Bilingual intake form for social media diagnostic projects, collecting business context, goals, resources, and marketing inputs.",
  path: "/social-media-diagnostic",
  keywords: [
    "social media diagnostic",
    "marketing intake form",
    "social media strategy questionnaire",
    "social media audit form",
    "client intake questionnaire",
  ],
});

export default function SocialMediaDiagnosticLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Social Media Diagnostic", path: "/social-media-diagnostic" },
            ]),
          ),
        }}
      />
      {children}
    </>
  );
}

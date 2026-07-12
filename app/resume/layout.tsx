import type { ReactNode } from "react";
import { buildMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resume",
  description:
    "Resume of Greddys Martinez, Senior Product Designer with experience in AI, enterprise SaaS, UX strategy, design systems, and research-led product design.",
  path: "/resume",
  keywords: [
    "Greddys Martinez resume",
    "senior product designer resume",
    "UX designer resume",
    "AI product designer resume",
    "enterprise SaaS product designer resume",
    "design systems designer resume",
  ],
});

export default function ResumeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Resume", path: "/resume" },
            ]),
          ),
        }}
      />
      {children}
    </>
  );
}

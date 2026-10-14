import type { ReactNode } from "react";

import { buildMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Social Growth Agent",
  description:
    "An approval-first workspace for planning podcast content, reviewing social performance, spotting trends, and growing recurring revenue.",
  path: "/social-growth-agent",
  keywords: [
    "social media agent",
    "podcast marketing",
    "Patreon content planning",
    "creator monetization",
    "social media analytics dashboard",
  ],
});

export default function SocialGrowthAgentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Social Growth Agent", path: "/social-growth-agent" },
            ]),
          ),
        }}
      />
      {children}
    </>
  );
}

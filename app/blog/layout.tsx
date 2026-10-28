import type { ReactNode } from "react";
import { buildMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog | Greddys Martinez",
  description: "Practical notes on AI product design, accessibility, design systems, and product strategy.",
  path: "/blog",
  keywords: ["AI product design", "UX design blog", "design systems", "accessibility", "product strategy"],
});

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])) }} />{children}</>;
}

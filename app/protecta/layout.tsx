import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Brand & Bilingual Website",
  description:
    "Case study: researching, designing, and building Protecta Advisory’s brand and bilingual insurance website.",
  path: "/protecta",
  image: "/images/projects/protecta/hero-banner.png",
  type: "article",
});

export default function ProtectaLayout({ children }: { children: React.ReactNode }) {
  return children;
}

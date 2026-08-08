import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Brand, Website & Campaign Launch",
  description:
    "Case study: building a bilingual insurance brand, launch-ready website, and educational social campaign for Protecta Advisory.",
  path: "/protecta",
  image: "/images/projects/protecta/hero-banner.png",
  type: "article",
});

export default function ProtectaLayout({ children }: { children: React.ReactNode }) {
  return children;
}

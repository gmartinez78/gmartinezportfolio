import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CMS",
  description: "Private portfolio CMS area.",
  path: "/cms",
  noIndex: true,
});

export default function CmsLayout({ children }: { children: ReactNode }) {
  return children;
}

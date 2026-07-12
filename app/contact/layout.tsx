import type { ReactNode } from "react";
import { buildMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Greddys Martinez for product design, UX strategy, AI product work, freelance projects, and remote collaboration opportunities.",
  path: "/contact",
  keywords: [
    "contact Greddys Martinez",
    "hire product designer",
    "freelance UX designer",
    "remote senior product designer",
    "hire UX UI designer",
    "AI product designer freelance",
  ],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />
      {children}
    </>
  );
}

import PortfolioPage from "../portfolio-page";
import { buildKeywordSet, buildMetadata, getAbsoluteUrl, getBreadcrumbSchema } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Greddys Martinez | Senior Product Designer Portfolio",
  description:
    "Portfolio of Greddys Martinez, a Senior Product Designer specializing in AI product design, enterprise SaaS, UX research, and design systems.",
  path: "/",
  keywords: [
    "Greddys Martinez",
    "product designer portfolio",
    "senior product designer",
    "UX designer portfolio",
    "AI product designer",
    "enterprise SaaS product designer",
    "design systems portfolio",
    "UX research portfolio",
  ],
});

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Greddys Martinez | Senior Product Designer Portfolio",
  description:
    "Portfolio of Greddys Martinez, a Senior Product Designer specializing in AI product design, enterprise SaaS, UX research, and design systems.",
  url: getAbsoluteUrl("/"),
  keywords: buildKeywordSet([
    "Greddys Martinez",
    "senior product designer portfolio",
    "AI product designer portfolio",
    "enterprise SaaS designer",
    "UX research",
    "design systems",
  ]),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema([{ name: "Home", path: "/" }])),
        }}
      />
      <PortfolioPage />
    </>
  );
}

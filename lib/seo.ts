import type { Metadata } from "next";
import siteContent from "@/content/site.json";
import type { CaseStudyRecord } from "@/lib/cms/types";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const siteUrl = rawSiteUrl.endsWith("/") ? rawSiteUrl.slice(0, -1) : rawSiteUrl;
export const siteName = "Greddys Martinez";
export const defaultTitle = "Greddys Martinez | Senior Product Designer Portfolio";
export const defaultDescription =
  "Senior Product Designer focused on AI, enterprise SaaS, UX strategy, and high-impact digital product experiences.";
export const defaultOgImage = "/images/og-home.png";
export const defaultKeywords = [
  "Greddys Martinez",
  "Senior Product Designer",
  "Product Designer Portfolio",
  "UX/UI Designer",
  "AI Product Design",
  "Enterprise SaaS",
  "UX Research",
  "Design Systems",
];

const caseStudyPathOverrides: Record<string, string> = {
  "benefits-enrollment": "/benefits",
  reversetech: "/reversetech",
};
const nonIndexedCaseStudySlugs = new Set<string>();

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
};

export function buildKeywordSet(...keywordGroups: Array<Array<string | undefined | null>>) {
  return Array.from(
    new Set(
      keywordGroups
        .flat()
        .map((keyword) => keyword?.trim())
        .filter((keyword): keyword is string => Boolean(keyword)),
    ),
  );
}

export function getAbsoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getCaseStudyPath(caseStudy: Pick<CaseStudyRecord, "slug" | "external_link">) {
  if (caseStudy.external_link) {
    return caseStudy.external_link;
  }

  return caseStudyPathOverrides[caseStudy.slug] ?? `/projects/${caseStudy.slug}`;
}

export function shouldIndexCaseStudy(
  caseStudy: Pick<CaseStudyRecord, "slug" | "status" | "password" | "external_link">,
) {
  return (
    caseStudy.status === "published" &&
    !caseStudy.password &&
    !caseStudy.external_link &&
    !nonIndexedCaseStudySlugs.has(caseStudy.slug)
  );
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = defaultOgImage,
  keywords,
  noIndex = false,
  type = "website",
}: BuildMetadataInput): Metadata {
  const canonical = getAbsoluteUrl(path);
  const absoluteImage = getAbsoluteUrl(image);
  const resolvedKeywords = buildKeywordSet(defaultKeywords, keywords ?? []);

  return {
    title,
    description,
    keywords: resolvedKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      siteName,
      images: [
        {
          url: absoluteImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteContent.resume.name,
    url: getAbsoluteUrl("/"),
    image: getAbsoluteUrl("/images/profile-photo.png"),
    jobTitle: siteContent.resume.title,
    description: siteContent.resume.bio,
    keywords: buildKeywordSet(defaultKeywords, [
      "Product Design",
      "UX Strategy",
      "AI Research",
      "Enterprise UX",
    ]),
    email: `mailto:${siteContent.resume.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteContent.resume.location,
    },
    sameAs: [
      "https://linkedin.com/in/greddysmartinez",
      "https://www.behance.net/greddysmartinez",
      "https://www.upwork.com/freelancers/greddysmartinez",
    ],
    knowsAbout: [
      "Product Design",
      "UX Research",
      "Design Systems",
      "AI Product Design",
      "Enterprise SaaS",
      "Accessibility",
    ],
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: getAbsoluteUrl("/"),
    description: defaultDescription,
    keywords: defaultKeywords,
    author: {
      "@type": "Person",
      name: siteContent.resume.name,
    },
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function getCollectionPageSchema(input: {
  title: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.title,
    description: input.description,
    url: getAbsoluteUrl(input.path),
    keywords: buildKeywordSet(defaultKeywords, input.keywords ?? []),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: getAbsoluteUrl(item.path),
      })),
    },
  };
}

export function getCaseStudySchema(caseStudy: CaseStudyRecord, path: string, image?: string | null) {
  const caseStudyKeywords = buildKeywordSet(defaultKeywords, [
    caseStudy.title,
    caseStudy.company,
    caseStudy.industry,
    ...(caseStudy.tags ?? []),
    ...(caseStudy.filters ?? []),
    ...(caseStudy.tools ?? []),
  ]);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    headline: caseStudy.title,
    description: caseStudy.tagline ?? defaultDescription,
    url: getAbsoluteUrl(path),
    image: getAbsoluteUrl(image || caseStudy.images.hero || defaultOgImage),
    keywords: caseStudyKeywords,
    creator: {
      "@type": "Person",
      name: siteContent.resume.name,
    },
    about: [
      caseStudy.company,
      caseStudy.industry,
      ...(caseStudy.tags ?? []),
      ...(caseStudy.filters ?? []),
    ].filter(Boolean),
    datePublished: caseStudy.created_at ?? undefined,
    dateModified: caseStudy.updated_at ?? undefined,
  };
}

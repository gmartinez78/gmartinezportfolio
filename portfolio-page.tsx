"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUp, ArrowUpRight, BrainCircuit, Check, Eye, FolderGit2, GitCommitHorizontal, GitFork, GitPullRequest, Heart, LayoutTemplate, Lightbulb, MessageCircle, Mic, MousePointer2, Paperclip, Play, Repeat2, Star, Target, Wand2 } from "lucide-react";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { ChecklistStatusCard } from "./components/checklist-status-card";
import { HighlightCalloutCard } from "./components/highlight-callout-card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Container } from "./components/ui/container";
import { Heading } from "./components/ui/heading";
import { ClassicalWordBrochurePreview } from "./components/classical-word-brochure-preview";
import { appendLockedNayyaPlaceholder } from "./lib/cms/locked-placeholder";
import { useLanguage } from "./lib/i18n/language-context";
import { useTranslate, useTranslateTag } from "./lib/i18n/use-translate";
import { getVisibleProjectTags } from "./lib/project-tags";
import {
  isHiddenCaseStudySlug,
  resolveHomeCardId,
  resolveProjectListCardImage,
  resolveProjectHref,
  resolveTrustedLogo,
  usePublicCaseStudies,
  usePublicSiteContent,
} from "./lib/cms/public";
import { withBasePath } from "./lib/site";

const PROJECT_BACKGROUNDS: Record<string, string> = {
  reversetech: "linear-gradient(180deg, #eef4fb 0%, #eef4fb 100%)",
  "benefits-enrollment": "radial-gradient(ellipse at 82% 50%, #b7daf1 11%, #e9f3fb 64%, #edf5fb 98%)",
  "nayya-ai-benefits": "radial-gradient(ellipse at 20% 50%, #cfe9f7 0%, #f0f7ff 72%)",
  "flock-accessibility-system": "radial-gradient(ellipse at 80% 20%, #c8f0e0 0%, #edf5fb 70%)",
  "i9-everify-integration": "radial-gradient(ellipse at 50% 80%, #d9e7f5 0%, #f3f8fc 72%)",
};

function getProjectCardDescription(description: string) {
  const trimmed = description.trim();
  const sentenceEnd = trimmed.search(/[.!?](?:\s|$)/);
  const firstSentence = sentenceEnd >= 0 ? trimmed.slice(0, sentenceEnd + 1) : trimmed;

  if (firstSentence.length <= 126) {
    return firstSentence;
  }

  return `${firstSentence.slice(0, 126).replace(/\s+\S*$/, "").trimEnd()}…`;
}

type HeroPhase = "sunrise" | "day" | "sunset" | "night";
type GitHubActivityItem = {
  id: string;
  kind: "commit" | "pull_request" | "issue" | "release" | "repo" | "star";
  title: string;
  detail: string;
  repo: string;
  timestamp: string | null;
  url: string;
};

type HeroAssistantResult = {
  response: string;
  items: Array<{
    id: string;
    title: string;
    snippet: string;
    href: string;
    sectionId?: "projects" | "skills" | "github";
    cardId?: string;
  }>;
};

type HeroVisitorType = "recruiter" | "client";

const PROCESS_CAPABILITIES = [
  {
    id: "ai-product",
    href: "/projects/nayya-ai-benefits",
    media: { videoSrc: null as string | null, posterSrc: null as string | null },
    keys: {
      label: "home.process.aiProduct.label",
      project: "home.process.aiProduct.project",
      title: "home.process.aiProduct.title",
      description: "home.process.aiProduct.description",
      outcomes: [
        "home.process.aiProduct.outcome1",
        "home.process.aiProduct.outcome2",
        "home.process.aiProduct.outcome3",
      ],
    },
  },
  {
    id: "product-research",
    href: "/benefits",
    media: { videoSrc: null as string | null, posterSrc: null as string | null },
    keys: {
      label: "home.process.productResearch.label",
      project: "home.process.productResearch.project",
      title: "home.process.productResearch.title",
      description: "home.process.productResearch.description",
      outcomes: [
        "home.process.productResearch.outcome1",
        "home.process.productResearch.outcome2",
        "home.process.productResearch.outcome3",
      ],
    },
  },
  {
    id: "design-systems",
    href: "/projects/flock-accessibility-system",
    media: { videoSrc: null as string | null, posterSrc: null as string | null },
    keys: {
      label: "home.process.designSystems.label",
      project: "home.process.designSystems.project",
      title: "home.process.designSystems.title",
      description: "home.process.designSystems.description",
      outcomes: [
        "home.process.designSystems.outcome1",
        "home.process.designSystems.outcome2",
        "home.process.designSystems.outcome3",
      ],
    },
  },
  {
    id: "accessibility-audits",
    href: "/projects/flock-accessibility-system",
    media: { videoSrc: null as string | null, posterSrc: null as string | null },
    keys: {
      label: "home.process.accessibility.label",
      project: "home.process.accessibility.project",
      title: "home.process.accessibility.title",
      description: "home.process.accessibility.description",
      outcomes: [
        "home.process.accessibility.outcome1",
        "home.process.accessibility.outcome2",
        "home.process.accessibility.outcome3",
      ],
    },
  },
  {
    id: "brand-social",
    href: "/protecta",
    media: { videoSrc: null as string | null, posterSrc: null as string | null },
    keys: {
      label: "home.process.brandSocial.label",
      project: "home.process.brandSocial.project",
      title: "home.process.brandSocial.title",
      description: "home.process.brandSocial.description",
      outcomes: [
        "home.process.brandSocial.outcome1",
        "home.process.brandSocial.outcome2",
        "home.process.brandSocial.outcome3",
      ],
    },
  },
] as const;

type ProcessCapabilityId = (typeof PROCESS_CAPABILITIES)[number]["id"];

const HERO_ASSISTANT_SUGGESTIONS = [
  "Show me AI projects",
  "Which case studies include UX research?",
  "What design systems work is on this site?",
  "Where can I see resume details?",
];

const MAIN_VISIBLE_CASE_STUDY_SLUGS = new Set(["reversetech"]);
const INDEPENDENT_CLIENT_WORK_SLUGS = new Set([
  "classical-word",
  "protecta",
  "reversetech",
  "calendar-keeper",
  "zapiano-marketing",
]);
type LocalSearchItem = {
  id: string;
  title: string;
  snippet: string;
  href: string;
  sectionId?: "projects" | "skills" | "github";
  cardId?: string;
  audience: HeroVisitorType[];
  content: string;
};

function tokenizeSearchQuery(value: string) {
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean),
    ),
  );
}

function isVisibleOnMain(slug: string) {
  return MAIN_VISIBLE_CASE_STUDY_SLUGS.has(slug) || !isHiddenCaseStudySlug(slug);
}

function compareCaseStudyPriority<
  T extends {
    year?: number | null;
    order?: number | null;
    title?: string | null;
  },
>(left: T, right: T) {
  const yearDiff = (right.year ?? 0) - (left.year ?? 0);
  if (yearDiff !== 0) {
    return yearDiff;
  }

  const orderDiff = (left.order ?? Number.MAX_SAFE_INTEGER) - (right.order ?? Number.MAX_SAFE_INTEGER);
  if (orderDiff !== 0) {
    return orderDiff;
  }

  return (left.title ?? "").localeCompare(right.title ?? "");
}

function resolveHeroAssistantQuery(
  rawQuery: string,
  caseStudies: ReturnType<typeof usePublicCaseStudies>["caseStudies"],
  siteContent: ReturnType<typeof usePublicSiteContent>["siteContent"],
  viewer: HeroVisitorType | null,
  translate: ReturnType<typeof useTranslate>,
): HeroAssistantResult {
  const query = rawQuery.trim();
  if (!query) {
    return {
      response: translate("home.assistantDefaultResponse"),
      items: [],
    };
  }

  const tokens = tokenizeSearchQuery(query);
  const resumeSkills = Object.entries(siteContent.resume.skills).flatMap(([group, items]) => [group, ...items]);
  const experienceText = siteContent.resume.experience
    .flatMap((entry) => [entry.title, entry.company, entry.client, entry.period, entry.location, ...entry.bullets, ...entry.tags])
    .join(" ");

  const searchableItems: LocalSearchItem[] = [
    ...caseStudies
      .filter((study) => study.status === "published" && isVisibleOnMain(study.slug))
      .map((study) => ({
        id: `project-${study.slug}`,
        title: study.title,
        snippet: study.tagline ?? `Case study for ${study.company}`,
        href: resolveProjectHref(study),
        sectionId: "projects" as const,
        cardId: resolveHomeCardId(study.slug),
        audience: ["recruiter", "client"] as HeroVisitorType[],
        content: [
          study.title,
          study.company,
          study.client_context ?? "",
          study.role ?? "",
          study.industry ?? "",
          study.tagline ?? "",
          study.duration ?? "",
          study.tags.join(" "),
          study.filters?.join(" ") ?? "",
          study.tools.join(" "),
          study.metrics.map((metric) => `${metric.label} ${metric.value} ${metric.context ?? ""}`).join(" "),
          study.my_role.join(" "),
          study.design_strategy.join(" "),
          study.problem.admin_pain_points.join(" "),
          study.problem.user_pain_points.join(" "),
          study.constraints.join(" "),
        ].join(" "),
      })),
    {
      id: "resume",
      title: translate("home.assistantResumeTitle"),
      snippet: siteContent.resume.title,
      href: withBasePath("/resume"),
      audience: ["recruiter"] as HeroVisitorType[],
      content: [
        siteContent.resume.name,
        siteContent.resume.title,
        siteContent.resume.bio,
        siteContent.resume.location,
        siteContent.resume.tools.join(" "),
        resumeSkills.join(" "),
        experienceText,
        siteContent.resume.education.map((item) => `${item.degree} ${item.institution} ${item.year}`).join(" "),
        siteContent.resume.certifications.map((item) => `${item.name} ${item.level} ${item.year}`).join(" "),
      ].join(" "),
    },
    {
      id: "contact",
      title: translate("home.assistantContactTitle"),
      snippet: siteContent.contact.intro,
      href: withBasePath("/contact"),
      audience: ["recruiter", "client"] as HeroVisitorType[],
      content: [
        siteContent.contact.headline,
        siteContent.contact.subheadline,
        siteContent.contact.intro,
        siteContent.contact.availability,
        siteContent.contact.details.map((item) => `${item.label} ${item.value}`).join(" "),
      ].join(" "),
    },
    {
      id: "github",
      title: translate("home.assistantGithubTitle"),
      snippet: translate("home.assistantGithubSnippet"),
      href: "#github",
      sectionId: "github" as const,
      audience: ["recruiter", "client"] as HeroVisitorType[],
      content: "github activity repositories commits pull requests public work code react next front end design system",
    },
  ].filter((item) => (viewer ? item.audience.includes(viewer) : true));

  const rankedItems = searchableItems
    .map((item) => {
      const haystack = `${item.title} ${item.snippet} ${item.content}`.toLowerCase();
      const score = tokens.reduce((total, token) => {
        if (!haystack.includes(token)) {
          return total;
        }

        if (item.title.toLowerCase().includes(token)) {
          return total + 4;
        }

        if (item.snippet.toLowerCase().includes(token)) {
          return total + 3;
        }

        return total + 1;
      }, 0);

      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 6)
    .map(({ item }) => ({
      id: item.id,
      title: item.title,
      snippet: item.snippet,
      href: item.href,
      sectionId: item.sectionId,
      cardId: item.cardId,
    }));

  if (!rankedItems.length) {
    return {
      response: translate("home.assistantNoMatch"),
      items: [],
    };
  }

  const projectCount = rankedItems.filter((item) => item.sectionId === "projects").length;
  return {
    response:
      projectCount > 1
        ? translate("home.assistantMultipleMatches").replace("{count}", String(projectCount))
        : projectCount === 1
          ? translate("home.assistantOneProjectMatch")
          : translate("home.assistantGenericMatch").replace("{query}", query),
    items: rankedItems,
  };
}

const HERO_PHASE_STYLES: Record<
  HeroPhase,
  {
    background: string;
    overlay: string;
    cone: string;
    starOpacity: number;
    shootingOpacity: number;
  }
> = {
  sunrise: {
    background: "linear-gradient(90deg, #dcebf8 0%, #eadff8 36%, #f8e0e8 68%, #fbe8d8 100%)",
    overlay:
      "radial-gradient(circle at top,rgba(176,160,255,0.24),transparent 42%),radial-gradient(circle at 72% 26%,rgba(255,176,203,0.24),transparent 32%),radial-gradient(circle at 92% 50%,rgba(255,226,185,0.25),transparent 24%),linear-gradient(180deg,rgba(109,132,171,0.1)_0%,rgba(255,255,255,0)_58%)",
    cone:
      "linear-gradient(118deg, rgba(255,255,255,0.26) 6%, rgba(255,255,255,0) 37%),linear-gradient(242deg, rgba(255,255,255,0.26) 6%, rgba(255,255,255,0) 37%),linear-gradient(180deg, rgba(248,249,255,0.14) 0%, rgba(221,226,249,0.18) 28%, rgba(182,193,232,0.15) 54%, rgba(255,255,255,0) 76%),radial-gradient(circle at 50% 74%, rgba(151,166,220,0.22), rgba(151,166,220,0) 24%)",
    starOpacity: 0.72,
    shootingOpacity: 0.55,
  },
  day: {
    background: "linear-gradient(90deg, #e6f1fb 0%, #eee7fb 37%, #f9e5ee 68%, #fcf0e2 100%)",
    overlay:
      "radial-gradient(circle at top,rgba(171,160,246,0.16),transparent 42%),radial-gradient(circle at 72% 26%,rgba(255,174,202,0.18),transparent 32%),radial-gradient(circle at 92% 50%,rgba(255,224,189,0.2),transparent 24%),linear-gradient(180deg,rgba(118,141,177,0.06)_0%,rgba(255,255,255,0)_58%)",
    cone:
      "linear-gradient(118deg, rgba(255,255,255,0.2) 6%, rgba(255,255,255,0) 37%),linear-gradient(242deg, rgba(255,255,255,0.2) 6%, rgba(255,255,255,0) 37%),linear-gradient(180deg, rgba(249,250,255,0.1) 0%, rgba(225,231,249,0.12) 28%, rgba(191,202,235,0.1) 54%, rgba(255,255,255,0) 76%),radial-gradient(circle at 50% 74%, rgba(162,176,224,0.16), rgba(162,176,224,0) 24%)",
    starOpacity: 0.3,
    shootingOpacity: 0.18,
  },
  sunset: {
    background: "linear-gradient(90deg, #d8e7f6 0%, #e6daf6 34%, #f4d7e5 66%, #fae4d1 100%)",
    overlay:
      "radial-gradient(circle at top,rgba(161,144,242,0.28),transparent 42%),radial-gradient(circle at 72% 26%,rgba(255,157,191,0.28),transparent 32%),radial-gradient(circle at 92% 50%,rgba(255,207,152,0.28),transparent 24%),linear-gradient(180deg,rgba(95,114,152,0.14)_0%,rgba(255,255,255,0)_58%)",
    cone:
      "linear-gradient(118deg, rgba(255,255,255,0.24) 6%, rgba(255,255,255,0) 37%),linear-gradient(242deg, rgba(255,255,255,0.24) 6%, rgba(255,255,255,0) 37%),linear-gradient(180deg, rgba(248,242,255,0.14) 0%, rgba(218,212,244,0.18) 28%, rgba(177,166,220,0.18) 54%, rgba(255,255,255,0) 76%),radial-gradient(circle at 50% 74%, rgba(134,150,205,0.24), rgba(134,150,205,0) 24%)",
    starOpacity: 0.8,
    shootingOpacity: 0.65,
  },
  night: {
    background: "linear-gradient(90deg, #8fa2c3 0%, #9f94c6 36%, #b28db0 68%, #b39b8d 100%)",
    overlay:
      "radial-gradient(circle at top,rgba(147,126,226,0.34),transparent 42%),radial-gradient(circle at 72% 26%,rgba(230,137,179,0.28),transparent 32%),radial-gradient(circle at 92% 50%,rgba(220,184,138,0.24),transparent 24%),linear-gradient(180deg,rgba(41,54,84,0.38)_0%,rgba(91,106,145,0.08)_58%,rgba(255,255,255,0)_100%)",
    cone:
      "linear-gradient(118deg, rgba(255,255,255,0.14) 6%, rgba(255,255,255,0) 37%),linear-gradient(242deg, rgba(255,255,255,0.14) 6%, rgba(255,255,255,0) 37%),linear-gradient(180deg, rgba(237,239,255,0.08) 0%, rgba(191,201,235,0.1) 28%, rgba(124,137,189,0.16) 54%, rgba(255,255,255,0) 76%),radial-gradient(circle at 50% 74%, rgba(95,115,179,0.32), rgba(95,115,179,0) 24%)",
    starOpacity: 1,
    shootingOpacity: 0.95,
  },
};

function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

function calculateSunEventHour(date: Date, latitude: number, longitude: number, isSunrise: boolean) {
  const zenith = 90.833;
  const dayOfYear = getDayOfYear(date);
  const lngHour = longitude / 15;
  const approximateTime = dayOfYear + ((isSunrise ? 6 : 18) - lngHour) / 24;
  const meanAnomaly = 0.9856 * approximateTime - 3.289;
  const trueLongitude = normalizeDegrees(
    meanAnomaly +
      1.916 * Math.sin((meanAnomaly * Math.PI) / 180) +
      0.02 * Math.sin((2 * meanAnomaly * Math.PI) / 180) +
      282.634,
  );
  let rightAscension = normalizeDegrees(
    (Math.atan(0.91764 * Math.tan((trueLongitude * Math.PI) / 180)) * 180) / Math.PI,
  );
  const leftQuadrant = Math.floor(trueLongitude / 90) * 90;
  const rightQuadrant = Math.floor(rightAscension / 90) * 90;
  rightAscension = (rightAscension + leftQuadrant - rightQuadrant) / 15;

  const sinDeclination = 0.39782 * Math.sin((trueLongitude * Math.PI) / 180);
  const cosDeclination = Math.cos(Math.asin(sinDeclination));
  const cosHourAngle =
    (Math.cos((zenith * Math.PI) / 180) - sinDeclination * Math.sin((latitude * Math.PI) / 180)) /
    (cosDeclination * Math.cos((latitude * Math.PI) / 180));

  if (cosHourAngle > 1 || cosHourAngle < -1) {
    return null;
  }

  let hourAngle = isSunrise
    ? 360 - (Math.acos(cosHourAngle) * 180) / Math.PI
    : (Math.acos(cosHourAngle) * 180) / Math.PI;
  hourAngle /= 15;

  const localMeanTime = hourAngle + rightAscension - 0.06571 * approximateTime - 6.622;
  const utcHour = normalizeDegrees(localMeanTime - lngHour * 15) / 15;
  const timezoneOffsetHours = -date.getTimezoneOffset() / 60;

  return utcHour + timezoneOffsetHours;
}

function getDecimalHour(date: Date) {
  return date.getHours() + date.getMinutes() / 60;
}

function getFallbackHeroPhase(date: Date): HeroPhase {
  const hour = getDecimalHour(date);

  if (hour >= 5 && hour < 8) return "sunrise";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "sunset";
  return "night";
}

function getHeroPhaseForLocation(date: Date, latitude: number, longitude: number): HeroPhase {
  const sunriseHour = calculateSunEventHour(date, latitude, longitude, true);
  const sunsetHour = calculateSunEventHour(date, latitude, longitude, false);

  if (sunriseHour === null || sunsetHour === null) {
    return getFallbackHeroPhase(date);
  }

  const hour = getDecimalHour(date);

  if (hour >= sunriseHour - 0.75 && hour < sunriseHour + 1.25) return "sunrise";
  if (hour >= sunriseHour + 1.25 && hour < sunsetHour - 1.25) return "day";
  if (hour >= sunsetHour - 1.25 && hour < sunsetHour + 0.85) return "sunset";
  return "night";
}

function formatRelativeTimestamp(value: string | null) {
  if (!value) {
    return "Recently";
  }

  const then = new Date(value).getTime();
  const now = Date.now();
  const diffMinutes = Math.max(1, Math.round((now - then) / 60000));

  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.round(diffDays / 30);
  return `${diffMonths}mo ago`;
}

function getGitHubActivityIcon(kind: GitHubActivityItem["kind"]) {
  if (kind === "commit") return GitCommitHorizontal;
  if (kind === "pull_request") return GitPullRequest;
  if (kind === "star") return Star;
  if (kind === "repo") return FolderGit2;
  return GitFork;
}

export default function PortfolioPage() {
  const heroPhase: HeroPhase = "day";
  const { language } = useLanguage();
  const translate = useTranslate();
  const translateTag = useTranslateTag();
  const [githubActivity, setGithubActivity] = useState<GitHubActivityItem[]>([]);
  const [githubUsername, setGithubUsername] = useState("gmartinez78");
  const [heroVisitorType, setHeroVisitorType] = useState<HeroVisitorType | null>(null);
  const [heroAssistantQuery, setHeroAssistantQuery] = useState("");
  const [heroAssistantResponse, setHeroAssistantResponse] = useState(() => translate("home.assistantDefaultResponse"));
  const [heroAssistantResults, setHeroAssistantResults] = useState<HeroAssistantResult["items"]>([]);
  const [activeProcessCapability, setActiveProcessCapability] = useState<ProcessCapabilityId>("ai-product");
  const [heroParallax, setHeroParallax] = useState(0);
  const heroScrollRef = useRef<HTMLDivElement | null>(null);
  const { siteContent } = usePublicSiteContent();
  const { caseStudies } = usePublicCaseStudies();
  const activeProcess = PROCESS_CAPABILITIES.find((capability) => capability.id === activeProcessCapability) ?? PROCESS_CAPABILITIES[0];
  const requiredCollaborators = [
    { name: "Zapiano", logo: "/images/zapiano-logo.svg" },
    { name: "Habitat for Humanity", logo: "/images/habitat-for-humanity.svg" },
    { name: "Elevation", logo: "/images/elevation-mark.png" },
    { name: "Indeed", logo: "/images/indeed-logo.svg" },
  ];
  const trustedClients = [
    ...siteContent.home.trusted_by.clients,
    ...requiredCollaborators.filter(
      (collaborator) => !siteContent.home.trusted_by.clients.some((client) => client.name === collaborator.name),
    ),
  ];
  const socialProofLogos = trustedClients.map((client) => ({
    src: resolveTrustedLogo(client.name, client.logo),
    alt: client.name,
    h: client.name === "Skill" ? 59 : client.name === "Zapiano" ? 38 : client.name === "Habitat for Humanity" ? 36 : client.name === "Elevation" ? 36 : client.name === "Indeed" ? 34 : client.name === "Hakuna" ? 30 : client.name === "Paychex" ? 51 : client.name === "Nayya" ? 48 : client.name === "Paramount+" ? 24 : client.name === "IBX" ? 34 : 41,
    w: client.name === "Skill" ? 107 : client.name === "Zapiano" ? 212 : client.name === "Habitat for Humanity" ? 108 : client.name === "Elevation" ? 234 : client.name === "Indeed" ? 126 : client.name === "Hakuna" ? 96 : client.name === "Paychex" ? 142 : client.name === "Nayya" ? 127 : client.name === "Paramount+" ? 94 : client.name === "IBX" ? 48 : 57,
  }));
  const heroRibbon = translate("home.mainHeroRibbon");
  const heroFilters = [
    {
      label: translate("home.heroPill.aiProductTitle"),
      href: "/projects/?filter=AI%20Product",
    },
    {
      label: translate("home.heroPill.designSystemsTitle"),
      href: "/projects/?filter=Design%20Systems",
    },
    {
      label: translate("home.heroPill.uxResearchTitle"),
      href: "/projects/?filter=UX%20Research",
    },
    {
      label: translate("home.heroPill.enterpriseSaasTitle"),
      href: "/projects/?topic=SaaS",
    },
  ];
  const logoCarousel = [...socialProofLogos, ...socialProofLogos];
  const allProjects = appendLockedNayyaPlaceholder(caseStudies ?? []);
  const homeProjects = allProjects
    .filter((study) => study?.slug && isVisibleOnMain(study.slug))
    .sort(compareCaseStudyPriority)
    .map((study) => ({
      slug: study.slug,
      cardId: resolveHomeCardId(study.slug),
      title: study.title,
      company: study.company ?? "",
      description: getProjectCardDescription(study.tagline ?? ""),
      image: resolveProjectListCardImage(study.slug, study.images?.cover || study.images?.hero || ""),
      background: PROJECT_BACKGROUNDS[study.slug] ?? "radial-gradient(ellipse at 20% 50%, #d4e8ff 0%, #edf5fb 70%)",
      href: resolveProjectHref(study),
      tags: getVisibleProjectTags(study.tags),
    }));
  const heroSelectedProjects = [
    "nayya-ai-benefits",
    "i9-everify-integration",
    "flock-accessibility-system",
  ]
    .map((slug) => homeProjects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);
  const projectGroups = [
    {
      id: "company",
      title: translate("home.companyProjects"),
      projects: homeProjects.filter((project) => !INDEPENDENT_CLIENT_WORK_SLUGS.has(project.slug)),
    },
    {
      id: "freelance",
      title: translate("home.freelanceProjects"),
      projects: homeProjects
        .filter((project) => INDEPENDENT_CLIENT_WORK_SLUGS.has(project.slug))
        .sort((left, right) => {
          if (left.slug === "calendar-keeper") return -1;
          if (right.slug === "calendar-keeper") return 1;
          return 0;
        }),
    },
  ].filter((group) => group.projects.length > 0);
  const productStrengths = [
    {
      title: translate("home.productStrengths.endToEnd.title"),
      description: translate("home.productStrengths.endToEnd.description"),
    },
    {
      title: translate("home.productStrengths.complexFlows.title"),
      description: translate("home.productStrengths.complexFlows.description"),
    },
    {
      title: translate("home.productStrengths.systems.title"),
      description: translate("home.productStrengths.systems.description"),
    },
  ];
  const heroPhaseStyles = useMemo(() => HERO_PHASE_STYLES[heroPhase], [heroPhase]);
  const heroProjectProgress = Math.min(1, Math.max(0, (heroParallax - 105) / 45));

  function scrollToSection(sectionId?: "projects" | "skills" | "github") {
    if (!sectionId || typeof document === "undefined") {
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleHeroAssistantSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = heroAssistantQuery.trim();
    if (!query) {
      setHeroAssistantResponse(translate("home.assistantDefaultResponse"));
      setHeroAssistantResults([]);
      return;
    }

    try {
      const result = resolveHeroAssistantQuery(query, caseStudies, siteContent, heroVisitorType, translate);
      setHeroAssistantResponse(result.response);
      setHeroAssistantResults(result.items);

      const firstSection = result.items.find((item) => item.sectionId)?.sectionId;
      scrollToSection(firstSection);
    } catch {
      setHeroAssistantResponse(translate("home.assistantSearchError"));
      setHeroAssistantResults([]);
    }
  }

  function handleHeroVisitorTypeSelect(type: HeroVisitorType) {
    setHeroVisitorType(type);
    setHeroAssistantResults([]);
    setHeroAssistantQuery("");
    setHeroAssistantResponse(
      type === "recruiter" ? translate("home.recruiterMode") : translate("home.clientMode"),
    );
    if (type === "recruiter") {
      scrollToSection("projects");
    }
  }

  useEffect(() => {
    if (!heroAssistantQuery.trim()) {
      setHeroAssistantResponse(translate("home.assistantDefaultResponse"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    let isActive = true;

    void (async () => {
      try {
        const response = await fetch(withBasePath("/api/github-activity"));
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as {
          items?: GitHubActivityItem[];
          username?: string;
        };

        if (!isActive) {
          return;
        }

        setGithubActivity(payload.items ?? []);
        setGithubUsername(payload.username ?? "gmartinez78");
      } catch {
        if (isActive) {
          setGithubActivity([]);
        }
      }
    })();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1025px)");
    if (reducedMotion.matches || !desktop.matches) {
      setHeroParallax(0);
    }

    return () => {
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1025px)");

    const handleWheel = (event: WheelEvent) => {
      const heroBounds = heroScrollRef.current?.getBoundingClientRect();
      const heroIsPinned = heroBounds && heroBounds.top <= 2 && heroBounds.bottom >= window.innerHeight - 2;

      if (!heroIsPinned || reducedMotion.matches || !desktop.matches) {
        return;
      }

      if (event.deltaY > 0 && heroParallax < 150) {
        event.preventDefault();
        setHeroParallax((current) => Math.min(150, current + event.deltaY * 0.28));
      }

      if (event.deltaY < 0 && heroParallax > 0) {
        event.preventDefault();
        setHeroParallax((current) => Math.max(0, current + event.deltaY * 0.28));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [heroParallax]);

  const githubActivityItems = githubActivity.length
    ? githubActivity.filter((item) => item.kind !== "release").slice(0, 6)
    : [
        {
          id: "github-fallback",
          kind: "repo" as const,
          title: translate("home.githubProfile"),
          detail: translate("home.githubEmptyState"),
          repo: githubUsername,
          timestamp: null,
          url: `https://github.com/${githubUsername}`,
        },
      ];

  const githubActivitySummary = useMemo(() => {
    const counts = githubActivityItems.reduce<Record<GitHubActivityItem["kind"], number>>(
      (acc, item) => {
        acc[item.kind] += 1;
        return acc;
      },
      {
        commit: 0,
        pull_request: 0,
        issue: 0,
        release: 0,
        repo: 0,
        star: 0,
      },
    );

    return [
      { label: translate("home.commits"), value: counts.commit },
      { label: translate("home.pullRequests"), value: counts.pull_request },
      { label: translate("home.issues"), value: counts.issue },
      { label: translate("home.repos"), value: counts.repo },
    ].filter((item) => item.value > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [githubActivityItems, language]);

  const recentWorkSection = (
    <section key="work" id="projects" className="bg-white px-6 py-16 md:px-10 md:py-20 xl:px-20">
      <Container size="wide">
        <div className="space-y-20 md:space-y-28">
          {projectGroups.map((group) => (
            <section key={group.id} aria-labelledby={`${group.id}-projects-title`}>
              <div className="flex items-end justify-between gap-6">
                <Heading id={`${group.id}-projects-title`} as="h2" variant="section" className="text-[clamp(2rem,4vw,3.25rem)]">
                  {group.title}
                </Heading>
                <Link
                  href={withBasePath("/projects")}
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--ui-color-brand-primary)] transition-colors hover:text-[var(--ui-color-brand-primary-hover)] md:text-base"
                >
                  {translate("home.viewPortfolio")}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-x-10 gap-y-12 md:grid-cols-2 md:gap-y-16">
                {group.projects.map((project, index) => (
                  <Link
                    key={project.slug}
                    href={project.href}
                    className={`group block ${index % 2 === 1 ? "md:translate-y-12" : ""}`}
                  >
                    <div
                      className="relative aspect-[4/3] overflow-hidden rounded-[var(--ui-radius-card)]"
                      style={{ background: project.background }}
                    >
                      {project.slug === "classical-word" ? (
                        <ClassicalWordBrochurePreview className="transition-transform duration-500 group-hover:scale-[1.025]" />
                      ) : project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} case study preview for ${project.company}`}
                          fill
                          sizes="(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 600px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                        />
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm text-[var(--ui-color-text-muted)]">{project.company}</p>
                    <Heading
                      as="h4"
                      variant="card"
                      className="mt-1 line-clamp-2 text-[18px] leading-[1.25] transition-colors group-hover:text-[var(--ui-color-brand-primary)] md:text-[20px]"
                    >
                      {project.title}
                    </Heading>
                    <p className="mt-2 line-clamp-3 max-w-[38rem] text-[15px] leading-[1.48] text-[var(--ui-color-text-muted)] md:text-[16px]">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} size="tag" variant="secondary">
                          {translateTag(tag)}
                        </Badge>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );

  const productStrengthsSection = (
    <section key="product-strengths" aria-labelledby="product-strengths-title" className="bg-white px-6 pb-16 md:px-10 md:pb-20 xl:px-20">
      <div
        className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[var(--ui-radius-panel)] px-6 py-12 text-white shadow-[var(--ui-shadow-elevated)] sm:px-9 md:px-12 md:py-16"
        style={{ background: "linear-gradient(135deg, #076da9 0%, var(--ui-color-brand-primary) 100%)" }}
      >
        <div className="relative mx-auto max-w-[650px] lg:ml-[15%]">
          <div>
            <Heading id="product-strengths-title" as="h2" variant="feature" tone="inverse" className="max-w-[620px] text-[clamp(2rem,4vw,3.35rem)] leading-[1.04]">
              {translate("home.productStrengths.title")}
            </Heading>
            <p className="mt-5 max-w-[610px] text-[16px] leading-[1.5] text-white/85 md:text-[18px]">
              {translate("home.productStrengths.intro")}
            </p>
          </div>
          <ol className="mt-10">
            {productStrengths.map((strength, index) => (
              <li
                key={strength.title}
                className={`grid grid-cols-[76px_minmax(0,1fr)] gap-3 py-6 transition-colors duration-200 hover:bg-white/10 sm:grid-cols-[86px_minmax(0,1fr)] ${index === 0 ? "" : "border-t border-white/25"}`}
              >
                <span className="pt-0.5 text-[22px] font-semibold leading-none text-[#d5f0ff]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[21px] font-semibold leading-tight sm:text-[24px]">
                    {strength.title}
                  </h3>
                  <p className="mt-3 max-w-[490px] text-sm leading-relaxed text-white/80 sm:text-[15px]">
                    {strength.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <Button asChild variant="tertiary" size="sm" className="mt-8 border-white/65 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white">
            <Link href={withBasePath("/resume")}>
              {translate("home.productStrengths.cta")}
              <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2.25} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );

  const impactEvidenceSection = (
    <section key="impact-evidence" aria-labelledby="impact-evidence-title" className="bg-white px-6 pb-16 md:px-10 md:pb-20 xl:px-20">
      <Container size="wide">
        <div className="mx-auto max-w-[540px] text-center">
          <Heading id="impact-evidence-title" as="h2" variant="section" className="text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.02] text-[#141114]">
            {translate("home.impact.titleLead")} {" "}
            <span className="font-playfair font-normal italic">{translate("home.impact.titleAccent")}</span>{" "}
            {translate("home.impact.titleTail")}
          </Heading>
        </div>

        <div className="mx-auto mt-8 grid max-w-[1120px] gap-4 md:grid-cols-12 md:grid-rows-[252px_216px_210px]">
          <Link
            href={withBasePath("/projects/nayya-ai-benefits")}
            className="group relative min-h-[252px] overflow-hidden rounded-xl md:col-span-4 md:min-h-0"
          >
            <Image
              src="/images/projects/nayya-ai-benefits/thumbnails/thumbnail-nayya-cover.png"
              alt={translate("home.impact.nayyaImageAlt")}
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,rgba(14,41,81,0.78)_100%)]" />
            <span className="absolute left-4 top-4 inline-flex rounded-full bg-[var(--ui-color-brand-amber)] px-3 py-1 text-[10px] font-semibold text-[#141114]">
              {translate("home.impact.caseStudy")}
            </span>
            <div className="absolute inset-x-4 bottom-4 text-white">
              <p className="text-[18px] font-semibold leading-tight">{translate("home.impact.nayyaTitle")}</p>
            </div>
          </Link>

          <Link
            href={withBasePath("/projects/flock-accessibility-system")}
            className="group relative min-h-[252px] overflow-hidden rounded-xl md:col-span-5 md:min-h-0"
          >
            <Image
              src="/images/projects/flock-accessibility-system/thumbnails/flock.png"
              alt={translate("home.impact.flockImageAlt")}
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,rgba(14,41,81,0.78)_100%)]" />
            <span className="absolute left-4 top-4 inline-flex rounded-full bg-[var(--ui-color-brand-amber)] px-3 py-1 text-[10px] font-semibold text-[#141114]">
              {translate("home.impact.featuredProject")}
            </span>
            <div className="absolute inset-x-4 bottom-4 text-white">
              <p className="text-[18px] font-semibold leading-tight">{translate("home.impact.flockTitle")}</p>
            </div>
          </Link>

          <article className="relative flex min-h-[202px] flex-col justify-between overflow-hidden rounded-xl bg-[#cfe8ff] p-5 text-[#141114] md:col-span-3 md:min-h-0">
            <Image src={withBasePath("/images/logo-gj.svg")} alt="" aria-hidden="true" width={120} height={120} className="pointer-events-none absolute -right-7 -top-7 size-28 opacity-25" />
            <div>
              <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold text-[#141114]">{translate("home.impact.tagEnrollment")}</span>
              <p className="mt-3 text-[13px] font-medium leading-snug">{translate("home.impact.enrollment")}</p>
              <strong className="mt-1 block text-[clamp(3.5rem,5vw,4.4rem)] font-semibold leading-none tracking-[-0.07em]">5,500</strong>
            </div>
            <p className="max-w-[180px] text-[13px] leading-snug text-[#141114]/78">{translate("home.impact.enrollmentContext")}</p>
          </article>

          <article className="relative z-10 flex min-h-[180px] flex-col justify-between rounded-xl bg-[#efefef] p-5 text-[#141114] shadow-[0_18px_36px_rgba(14,41,81,0.18)] md:col-span-3 md:min-h-0">
            <div>
              <span className="inline-flex rounded-full bg-[#f5f5f5] px-3 py-1 text-[10px] font-semibold text-[#141114]">{translate("home.impact.tagFormCompletion")}</span>
              <p className="mt-3 max-w-[180px] text-[15px] font-semibold leading-[1.16]">{translate("home.impact.formCompletion")}</p>
            </div>
            <div className="flex items-end justify-between gap-3">
              <div className="flex items-start gap-0.5">
                <strong className="text-[clamp(3.5rem,5vw,4.4rem)] font-semibold leading-none tracking-[-0.07em]">35</strong>
                <span className="mt-1 text-[clamp(1rem,1.5vw,1.3rem)] font-semibold leading-none">%</span>
              </div>
              <ArrowUp aria-hidden="true" className="mb-1 size-5" strokeWidth={2.25} />
            </div>
          </article>

          <article className="relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-xl bg-[#f8df36] p-5 text-[#141114] md:col-span-3 md:min-h-0">
            <Image src={withBasePath("/images/logo-gj.svg")} alt="" aria-hidden="true" width={150} height={150} className="pointer-events-none absolute -bottom-10 -right-9 size-36 opacity-20" />
            <div>
              <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold text-[#141114]">{translate("home.impact.tagProcessing")}</span>
              <p className="mt-3 max-w-[160px] text-[13px] font-medium leading-snug">{translate("home.impact.processingTime")}</p>
            </div>
            <div className="flex items-end justify-between gap-3">
              <div className="flex items-start gap-0.5">
                <strong className="text-[clamp(3.5rem,5vw,4.4rem)] font-semibold leading-none tracking-[-0.07em]">72</strong>
                <span className="mt-1 text-[clamp(1rem,1.5vw,1.3rem)] font-semibold leading-none">%</span>
              </div>
              <ArrowUp aria-hidden="true" className="mb-1 size-5" strokeWidth={2.25} />
            </div>
          </article>

          <article className="relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-xl bg-[#d8f6f4] p-5 text-[#141114] md:col-span-4 md:min-h-0">
            <Image src={withBasePath("/images/logo-gj.svg")} alt="" aria-hidden="true" width={104} height={104} className="pointer-events-none absolute -right-4 -top-4 size-24 opacity-25" />
            <div>
              <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold text-[#141114]">{translate("home.impact.tagSelfService")}</span>
              <p className="mt-3 max-w-[190px] text-[13px] font-medium leading-snug">{translate("home.impact.selfService")}</p>
            </div>
            <div className="flex items-end justify-between gap-3">
              <strong className="text-[clamp(2.9rem,4vw,3.9rem)] font-semibold leading-none tracking-[-0.07em]">500+</strong>
              <ArrowUp aria-hidden="true" className="mb-1 size-5" strokeWidth={2.25} />
            </div>
          </article>

          <div aria-hidden="true" className="relative hidden overflow-hidden bg-[#f5f5f5] md:col-span-2 md:block">
            <Image src={withBasePath("/images/logo-gj.svg")} alt="" aria-hidden="true" width={150} height={150} className="absolute -left-8 -top-7 size-36 opacity-75" />
            <Image src={withBasePath("/images/logo-gj.svg")} alt="" aria-hidden="true" width={120} height={120} className="absolute -bottom-8 -right-7 size-28 rotate-180 opacity-55" />
          </div>

          <article className="relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-xl bg-[#dff8f4] p-5 text-[#141114] md:col-span-4 md:min-h-0">
            <Image src={withBasePath("/images/logo-gj.svg")} alt="" aria-hidden="true" width={104} height={104} className="pointer-events-none absolute -right-4 -top-4 size-24 opacity-25" />
            <div>
              <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold text-[#141114]">{translate("home.impact.tagSupportImpact")}</span>
              <p className="mt-3 max-w-[190px] text-[13px] font-medium leading-snug">{translate("home.impact.supportCalls")}</p>
            </div>
            <div className="flex items-end justify-between gap-3">
              <strong className="text-[clamp(2.9rem,4vw,3.9rem)] font-semibold leading-none tracking-[-0.07em]">9,000+</strong>
              <ArrowUp aria-hidden="true" className="mb-1 size-5" strokeWidth={2.25} />
            </div>
          </article>

          <article className="relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-xl bg-[#f9b5e5] p-5 text-[#141114] md:col-span-5 md:min-h-0">
            <Image src={withBasePath("/images/logo-gj.svg")} alt="" aria-hidden="true" width={150} height={150} className="pointer-events-none absolute -bottom-10 -right-9 size-36 opacity-20" />
            <div>
              <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold text-[#141114]">{translate("home.impact.tagSupportEfficiency")}</span>
              <p className="mt-3 max-w-[220px] text-[13px] font-medium leading-snug">{translate("home.impact.ticketReduction")}</p>
            </div>
            <div className="flex items-end justify-between gap-3">
              <strong className="text-[clamp(2.9rem,4vw,3.9rem)] font-semibold leading-none tracking-[-0.07em]">500+</strong>
              <ArrowUp aria-hidden="true" className="mb-1 size-5" strokeWidth={2.25} />
            </div>
          </article>

          <article className="relative flex min-h-[180px] flex-col overflow-hidden rounded-xl bg-[#cedcff] p-5 text-[#141114] md:col-span-3 md:min-h-0">
            <Image src={withBasePath("/images/logo-gj.svg")} alt="" aria-hidden="true" width={64} height={64} className="pointer-events-none absolute right-4 top-4 size-12 opacity-45" />
            <span className="inline-flex w-fit rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold text-[#141114]">{translate("home.impact.clientReview")}</span>
            <blockquote className="mt-3 text-[13px] font-medium leading-[1.42]">“{translate("home.impact.upworkQuote")}”</blockquote>
          </article>
        </div>
      </Container>
    </section>
  );

  const impactShowcaseSection = (
    <section key="impact-showcase" className="bg-white px-6 pb-8 md:px-10 xl:px-20">
      <div className="mx-auto grid w-full max-w-[1280px] gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.9fr)]">
        <Link
          href={withBasePath("/projects/nayya-ai-benefits")}
          className="group rounded-[34px] bg-[#f4f2f3] p-5 transition-transform duration-300 hover:-translate-y-1 md:p-7"
        >
          <div className="mb-7 flex flex-col gap-3 md:max-w-[760px]">
            <Heading as="h2" variant="feature" className="text-[18px] md:text-[26px]">
              Business thinking across product and design.
            </Heading>
            <p className="max-w-[720px] text-[14px] leading-[1.6] text-[#5c7792] md:text-[15px]">
              Brings clear business thinking to product work, with focus on value delivered for the business. The approach reflects maturity, strategy, and the ability to connect design decisions to broader product goals.
            </p>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-[#e5e8f0] bg-white">
            <div>
              <div className="relative overflow-hidden rounded-b-[28px] border-b border-[#eef2f7] bg-[#f7f8fb]">
              </div>

              <div className="-mx-4 overflow-hidden rounded-[28px] border border-[#dfe8f5] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] shadow-[0_18px_34px_rgba(31,53,94,0.08)] md:-mx-5">
                <div className="flex items-center border-b border-[#e5edf8] bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff6257]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2f]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <div className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6882ad]">
                    <FolderGit2 className="h-4 w-4" />
                    Collaboration board
                  </div>
                  <div className="relative rounded-[24px] border border-[#d9e4f2] bg-white px-4 py-5 shadow-[0_12px_28px_rgba(31,53,94,0.06)] md:px-5">
                    <div
                      className="pointer-events-none absolute left-[18%] top-[24%] hidden items-center gap-2 md:flex animate-[collab-cursor-drift_5.8s_ease-in-out_infinite]"
                      style={{
                        ["--cursor-from-x" as string]: "-26px",
                        ["--cursor-from-y" as string]: "18px",
                        ["--cursor-mid-x" as string]: "0px",
                        ["--cursor-mid-y" as string]: "0px",
                        ["--cursor-to-x" as string]: "28px",
                        ["--cursor-to-y" as string]: "-14px",
                      }}
                    >
                      <MousePointer2 className="h-4 w-4 rotate-[-18deg] fill-[#1183D0] text-[#1183D0]" />
                      <span className="rounded-full bg-[#1183D0] px-2.5 py-1 text-[10px] font-semibold text-white shadow-[0_8px_18px_rgba(17,131,208,0.22)]">
                        Product Manager
                      </span>
                    </div>
                    <div
                      className="pointer-events-none absolute left-[42%] top-[58%] hidden items-center gap-2 md:flex animate-[collab-cursor-drift_6.6s_ease-in-out_1.2s_infinite]"
                      style={{
                        ["--cursor-from-x" as string]: "24px",
                        ["--cursor-from-y" as string]: "22px",
                        ["--cursor-mid-x" as string]: "0px",
                        ["--cursor-mid-y" as string]: "0px",
                        ["--cursor-to-x" as string]: "-30px",
                        ["--cursor-to-y" as string]: "-10px",
                      }}
                    >
                      <MousePointer2 className="h-4 w-4 rotate-[10deg] fill-[#ffb649] text-[#ffb649]" />
                      <span className="rounded-full bg-[#ffb649] px-2.5 py-1 text-[10px] font-semibold text-[#7a4a00] shadow-[0_8px_18px_rgba(255,182,73,0.22)]">
                        Design
                      </span>
                    </div>
                    <div
                      className="pointer-events-none absolute right-[10%] top-[32%] hidden items-center gap-2 md:flex animate-[collab-cursor-drift_6.2s_ease-in-out_2.1s_infinite]"
                      style={{
                        ["--cursor-from-x" as string]: "30px",
                        ["--cursor-from-y" as string]: "-16px",
                        ["--cursor-mid-x" as string]: "0px",
                        ["--cursor-mid-y" as string]: "0px",
                        ["--cursor-to-x" as string]: "-24px",
                        ["--cursor-to-y" as string]: "16px",
                      }}
                    >
                      <MousePointer2 className="h-4 w-4 rotate-[-10deg] fill-[#35b97f] text-[#35b97f]" />
                      <span className="rounded-full bg-[#35b97f] px-2.5 py-1 text-[10px] font-semibold text-white shadow-[0_8px_18px_rgba(53,185,127,0.2)]">
                        Engineer
                      </span>
                    </div>
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-[12px] text-[#5f78a0]">
                        <GitFork className="h-3.5 w-3.5" />
                        User needs + business goals
                      </div>
                      <div className="flex -space-x-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#1183D0] text-[10px] font-semibold text-white">GM</span>
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#ffb649] text-[10px] font-semibold text-[#7a4a00]">PM</span>
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#8fdcb8] text-[10px] font-semibold text-[#1f6a48]">ENG</span>
                      </div>
                    </div>
                    <div className="grid gap-3 lg:grid-cols-[1fr_1fr_0.92fr]">
                      <div className="space-y-3">
                        <div className="rounded-[18px] bg-[#fff1ab] p-4 shadow-[0_10px_20px_rgba(180,154,40,0.10)]">
                          <div className="flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5 text-[#8a6a00]" />
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a6a00]">User need</p>
                          </div>
                          <p className="mt-2 text-[14px] font-medium leading-8 text-[#51461f]">
                            Help people understand what to do next without added friction.
                          </p>
                        </div>
                        <div className="rounded-[18px] bg-[#bfe9e8] p-4 shadow-[0_10px_20px_rgba(76,160,160,0.10)]">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-3.5 w-3.5 text-[#226f72]" />
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#226f72]">Observation</p>
                          </div>
                          <p className="mt-2 text-[14px] font-medium leading-8 text-[#234f52]">
                            Decision confidence drops when value and next steps are not obvious.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="rounded-[18px] bg-[#ffd3a6] p-4 shadow-[0_10px_20px_rgba(210,130,70,0.10)]">
                          <div className="flex items-center gap-2">
                            <Target className="h-3.5 w-3.5 text-[#9a5416]" />
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9a5416]">Business goal</p>
                          </div>
                          <p className="mt-2 text-[14px] font-medium leading-8 text-[#5f3a15]">
                            Support better choices while reducing drop-off and wasted effort.
                          </p>
                        </div>
                        <div className="rounded-[18px] bg-[#d5e2ff] p-4 shadow-[0_10px_20px_rgba(80,120,200,0.10)]">
                          <div className="flex items-center gap-2">
                            <GitCommitHorizontal className="h-3.5 w-3.5 text-[#4668a8]" />
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4668a8]">Decision</p>
                          </div>
                          <p className="mt-2 text-[14px] font-medium leading-8 text-[#2e446f]">
                            Align guidance, timing, and implementation scope around the highest-value path.
                          </p>
                        </div>
                      </div>
                      <div className="rounded-[18px] border border-dashed border-[#d7e1ef] bg-[#fafcff] p-3">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7b8598]">Live notes</p>
                          <span className="rounded-full bg-[#eef6ff] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#1183D0]">
                            Syncing
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          <div className="rounded-[14px] bg-white px-3 py-3 shadow-[0_6px_16px_rgba(31,53,94,0.05)] text-[11px] leading-6 text-[#5c7792]">
                            PM: tie the recommendation to measurable value.
                          </div>
                          <div className="rounded-[14px] bg-white px-3 py-3 shadow-[0_6px_16px_rgba(31,53,94,0.05)] text-[11px] leading-6 text-[#5c7792]">
                            Design: make the tradeoff and next step obvious.
                          </div>
                          <div className="rounded-[14px] bg-white px-3 py-3 shadow-[0_6px_16px_rgba(31,53,94,0.05)] text-[11px] leading-6 text-[#5c7792]">
                            Eng: keep scope lightweight enough to ship.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-5 flex items-center gap-3 px-3">
                      <div className="h-[2px] flex-1 rounded-full bg-[linear-gradient(90deg,#d8b53e_0%,#6fb2f1_52%,#5cc7b9_100%)]" />
                      <span className="rounded-full bg-[#0e2951] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                        Aligned
                      </span>
                      <div className="h-[2px] flex-1 rounded-full bg-[linear-gradient(90deg,#5cc7b9_0%,#6fb2f1_52%,#f0b567_100%)]" />
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#5f78a0]">
                      <GitCommitHorizontal className="h-3.5 w-3.5" />
                      {translate("home.sharedInputsNote")}
                    </div>
                    <div className="mt-3 rounded-[16px] bg-[linear-gradient(135deg,#edf5ff_0%,#f7fbff_100%)] px-3 py-3 text-[12px] leading-7 text-[#4f6486]">
                      {translate("home.collaborationNote")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="grid gap-5">
          <Link
            href={withBasePath("/projects/flock-accessibility-system")}
            className="group rounded-[34px] bg-[#f4f2f3] p-5 transition-transform duration-300 hover:-translate-y-1 md:p-6"
          >
            <div className="mb-5 rounded-[22px] bg-white p-4 shadow-[0_14px_32px_rgba(30,38,61,0.06)]">
              <ChecklistStatusCard
                eyebrow={translate("home.a11yValidationEyebrow")}
                badge={translate("home.a11yValidationBadge")}
                badgeClassName="bg-[#e8f8ea] text-[#339154]"
                items={[
                  { label: translate("home.focusOrder"), status: translate("home.pass"), statusClassName: "bg-[#e8f8ea] text-[#339154]" },
                  { label: translate("home.colorContrast"), status: translate("home.check"), statusClassName: "bg-[#eef7ff] text-[#1183D0]" },
                  { label: translate("home.labelsAndRoles"), status: translate("home.pass"), statusClassName: "bg-[#e8f8ea] text-[#339154]" },
                  { label: translate("home.keyboardStates"), status: translate("home.audit"), statusClassName: "bg-[#fff3df] text-[#d68524]" },
                ]}
              />
            </div>

            <Heading as="h3" variant="feature" className="max-w-[320px] text-[26px]">
              {translate("home.a11yCardTitle")}
            </Heading>
            <p className="mt-3 max-w-[320px] text-[14px] leading-[1.6] text-[#5c7792] md:text-[15px]">
              {translate("home.a11yCardDescription")}
            </p>
          </Link>

          <Link
            href={withBasePath("/benefits")}
            className="group relative overflow-hidden rounded-[34px] bg-[linear-gradient(140deg,#f7f3ff_0%,#eef8ff_46%,#fff4ea_100%)] p-5 transition-transform duration-300 hover:-translate-y-1 md:p-6"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#ffcf8c]/45 blur-2xl" />
            <div className="absolute bottom-8 right-6 h-24 w-24 rounded-full bg-[#9ec6ff]/35 blur-2xl" />
            <div className="relative">
              <Heading as="h3" variant="feature" className="max-w-[320px] text-[26px]">
                {translate("home.designSystemsCardTitle")}
              </Heading>
              <p className="mt-3 max-w-[320px] text-[14px] leading-[1.6] text-[#5c7792] md:text-[15px]">
                {translate("home.designSystemsCardDescription")}
              </p>

              <div className="mt-6 grid gap-3">
                <HighlightCalloutCard
                  icon={
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#eef4ff] text-[#4d6ff5]">
                      <LayoutTemplate className="h-4 w-4" />
                    </span>
                  }
                  title={translate("home.quickDesignFeedback")}
                  description={translate("home.quickDesignFeedbackDescription")}
                  tags={[
                    { label: translate("home.reviews"), className: "rounded-full bg-[#eef6ff] px-3 py-1 text-[11px] font-semibold text-[#1183D0]" },
                    { label: translate("home.iteration"), className: "rounded-full bg-[#fff1df] px-3 py-1 text-[11px] font-semibold text-[#d68524]" },
                    { label: translate("home.alignment"), className: "rounded-full bg-[#ebf8ef] px-3 py-1 text-[11px] font-semibold text-[#2f8c54]" },
                  ]}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );

  const collaboratorsSection = (
    <section
      key="collaborators"
      id="collaborators"
      aria-label={siteContent.home.trusted_by.label}
      className="flex min-h-[160px] flex-col items-center gap-6 px-6 py-10 text-center md:px-10 lg:px-20"
    >
      <div className="flex shrink-0 items-center justify-center">
        <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#141114]">
          {siteContent.home.trusted_by.label}
        </span>
      </div>
      <div className="relative w-full max-w-[1200px] overflow-hidden md:py-2">
        <div className="flex w-max animate-[logo-marquee_22s_linear_infinite] items-center gap-14 pr-14 will-change-transform">
          {logoCarousel.map((logo, index) => (
            <Image
              key={`${logo.alt}-${index}`}
              src={logo.src}
              alt={index < socialProofLogos.length ? logo.alt : ""}
              width={logo.w}
              height={logo.h}
              aria-hidden={index >= socialProofLogos.length}
              className={`w-auto shrink-0 object-contain opacity-80 ${logo.alt === "Zapiano" || logo.alt === "Habitat for Humanity" || logo.alt === "Elevation" || logo.alt === "Indeed" ? "max-h-[28px]" : logo.alt === "Hakuna" ? "max-h-[22px]" : logo.alt === "Paramount+" ? "max-h-[18px]" : "max-h-[36px]"}`}
              style={{ filter: "brightness(0) saturate(100%)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );

  const githubProofSection = (
    <section
      key="github-proof"
      id="github"
      className="bg-white px-6 py-20 md:px-16 xl:px-30"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="rounded-[24px] border border-[#d9e5f2] bg-white/80 p-6 md:p-8">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1183D0]">
              Contribution View
            </p>
          </div>
          <div className="mt-6 overflow-x-auto rounded-[18px] border border-[#e6edf6] bg-[#fbfdff] p-5 md:p-8">
            <div className="flex min-h-[220px] items-center">
              <img
                src={`https://ghchart.rshah.org/1183D0/${githubUsername}`}
                alt={`${githubUsername} GitHub contributions chart`}
                className="mx-auto translate-y-4 h-auto w-full min-w-[880px] object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const ctaSection = (
    <section key="cta" className="bg-white px-6 pb-12 pt-4 text-center md:px-10 md:pb-16 md:pt-6 lg:px-20">
      <div
        className="mx-auto flex max-w-[1280px] flex-col items-center rounded-[var(--ui-radius-panel)] px-6 py-12 text-white shadow-[var(--ui-shadow-elevated)] sm:px-12 md:py-14"
        style={{ background: "var(--ui-surface-contact-cta)" }}
      >
        <Heading as="h2" variant="display" tone="inverse" className="max-w-3xl">
          {translate("home.contactCta")}
        </Heading>
        <Button asChild variant="editorial-outline" size="sm" className="mt-7 border-white/50 bg-white text-[var(--ui-color-text-editorial)] hover:bg-white">
          <Link href={withBasePath("/contact")}>{siteContent.nav.cta_label}</Link>
        </Button>
      </div>
    </section>
  );

  const contentSections = [collaboratorsSection, ctaSection];

  return (
    <main className="bg-white text-[#3c3e3f] overflow-x-hidden lg:my-2 lg:mr-2 lg:overflow-clip lg:rounded-[28px] lg:border lg:border-[#e5eef7] lg:shadow-[0_10px_34px_rgba(14,41,81,0.06)]">
      <SiteHeader variant="transparent" forceSticky={heroProjectProgress >= 1} />

      {/* ── Hero ── */}
      <section className="bg-white">
        <div ref={heroScrollRef} className="min-[1025px]:h-[100svh]">
        <div className="relative isolate overflow-hidden bg-white px-5 pb-8 pt-24 sm:px-10 sm:pt-[8.25rem] lg:px-16 lg:pb-14 min-[1025px]:sticky min-[1025px]:top-2 min-[1025px]:h-[100svh] min-[1025px]:overflow-hidden min-[1025px]:pt-[5.5rem]">
          <div className="pointer-events-none absolute inset-0 bg-[image:var(--ui-surface-hero)]" />
          <div className="pointer-events-none absolute right-[7%] top-[16%] hidden h-14 w-14 rotate-12 xl:block">
            <span className="absolute left-6 top-0 h-full w-[3px] rotate-45 rounded-full bg-[#f06d96]" />
            <span className="absolute left-6 top-0 h-full w-[3px] -rotate-45 rounded-full bg-[#f06d96]" />
            <span className="absolute left-0 top-6 h-[3px] w-full rotate-45 rounded-full bg-[#f06d96]" />
            <span className="absolute left-0 top-6 h-[3px] w-full -rotate-45 rounded-full bg-[#f06d96]" />
          </div>
          <div className="pointer-events-none absolute bottom-[11%] right-[3%] hidden h-20 w-20 xl:block">
            <span className="absolute left-[31px] top-0 h-12 w-9 rotate-[-36deg] rounded-t-full border-[3px] border-b-0 border-[#1183d0]" />
            <span className="absolute left-[13px] top-3 h-12 w-9 rotate-[36deg] rounded-t-full border-[3px] border-b-0 border-[#1183d0]" />
          </div>
          <svg className="pointer-events-none absolute left-[1.5%] top-[36%] hidden h-16 w-16 -rotate-12 xl:block" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path d="M32 6 37 25 57 18 43 33 59 43 39 41 36 60 28 42 10 53 22 35 5 26 26 27Z" stroke="#16A7DF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="pointer-events-none absolute bottom-[18%] left-[49%] hidden h-20 w-24 rotate-[-12deg] xl:block" viewBox="0 0 96 80" fill="none" aria-hidden="true">
            <path d="M14 56 22 24 40 42 49 13 65 39 80 24 76 58 14 56Z" stroke="#F0A51B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 62c18 5 39 5 58-1" stroke="#F0A51B" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="pointer-events-none absolute -bottom-[34%] -left-[12%] -right-[12%] z-0 hidden h-[60%] overflow-hidden rounded-[50%] min-[1025px]:block">
            <Image src="/images/home-hero-table.png" alt="" fill sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,243,0.32)_0%,rgba(255,248,243,0.04)_30%,rgba(215,181,154,0.12)_100%)]" />
          </div>
          <Container size="wide" className="relative grid min-h-0 items-center gap-2 xl:min-h-[650px] xl:grid-cols-[1.08fr_0.92fr] xl:gap-4 2xl:min-h-[720px] 2xl:max-w-[1440px]">
            <div className="relative z-40 order-2 max-w-[800px] pb-2 text-center xl:order-1 xl:-translate-y-12 xl:translate-x-12 xl:pb-12 xl:text-left 2xl:-translate-y-16">
              <div className="relative mb-5 inline-flex max-w-full -rotate-[5deg] overflow-hidden bg-[#39b8e7] px-3 py-2 text-[9px] font-medium tracking-[0.04em] text-[#163143] shadow-[0_5px_10px_rgba(18,111,148,0.16)] [clip-path:polygon(0_9%,2%_1%,7%_4%,12%_0,18%_3%,25%_0,31%_4%,38%_1%,45%_4%,52%_0,59%_3%,66%_0,74%_4%,81%_1%,88%_4%,96%_0,100%_9%,98%_21%,100%_36%,98%_51%,100%_67%,98%_83%,100%_94%,95%_100%,89%_96%,83%_100%,75%_96%,68%_100%,61%_97%,54%_100%,47%_96%,40%_100%,33%_97%,26%_100%,18%_96%,11%_100%,4%_96%,0_87%,2%_72%,0_56%,2%_41%,0_25%)] sm:mb-7 sm:px-7 sm:py-2.5 sm:text-sm xl:-translate-x-12">
                <span className="absolute inset-0 opacity-20 [background-image:linear-gradient(30deg,transparent_42%,rgba(255,255,255,0.7)_43%,transparent_45%),linear-gradient(-30deg,transparent_42%,rgba(255,255,255,0.7)_43%,transparent_45%)] [background-size:18px_16px]" />
                <span className="absolute inset-x-2 top-1 h-px bg-white/45" />
                <span className="relative z-10 whitespace-nowrap font-mono">{heroRibbon}</span>
              </div>
              <Heading
                as="h1"
                variant="hero"
                tone="editorial"
                className="whitespace-nowrap font-medium leading-[0.86] text-[clamp(2rem,5.5vw,4.7rem)]"
              >
                <span className="text-[#e7688f]">Greddys</span>{" "}
                <span className="text-[#141114]">Martinez</span>
              </Heading>
              <div className="mx-auto mt-6 max-w-[610px] sm:mt-9 xl:mx-0">
                <svg className="mb-2 h-7 w-40 -rotate-2" viewBox="0 0 160 28" fill="none" aria-hidden="true">
                  <path d="M4 10c31-7 88-9 148-2" stroke="#25aee1" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M8 20c42-7 100-5 148 1" stroke="#25aee1" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <p className="text-[13px] font-bold uppercase leading-relaxed tracking-[0.04em] text-[#159bd0] sm:text-sm">
                  {translate("home.mainHeroFocus")}
                </p>
                <p className="mt-1 font-inter text-base italic leading-relaxed text-[#3d3438] sm:text-lg">{translate("home.mainHeroDescription")}</p>
                <nav
                  aria-label={translate("projectsPage.filterBy")}
                  className="mt-6 flex flex-wrap justify-center gap-2 xl:justify-start"
                >
                  {heroFilters.map(({ label, href }) => (
                    <Badge key={href} asChild variant="outline" size="default">
                      <Link href={withBasePath(href)}>
                        {label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </Badge>
                  ))}
                </nav>
              </div>
            </div>
            <div className="relative order-1 mx-auto h-[350px] w-full max-w-[380px] self-end sm:h-[460px] sm:max-w-[430px] xl:order-2 xl:h-[650px] xl:max-w-[510px] 2xl:-translate-y-20">
              <div className="absolute bottom-0 left-[-3%] right-[-10%] top-[22px] z-30 origin-bottom-left sm:left-[-6%] sm:right-[-15%] sm:top-[54px] xl:-translate-x-[60%] xl:scale-[1.08]" style={{ translate: `${heroParallax}px 0` }}>
                <Image src="/images/home-hero-portrait-clean-v3.png" alt="Greddys Martinez seated at a laptop" fill priority sizes="(max-width: 1024px) 470px, 590px" className="object-contain object-bottom" />
                <svg className="pointer-events-none absolute left-[57%] -top-[10%] h-20 w-24 rotate-[12deg] overflow-visible" viewBox="0 0 96 80" fill="none" aria-hidden="true">
                  <path d="M16 59 24 20 42 43 51 12 67 42 82 25 76 61 16 59Z" stroke="#F0A51B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 65c18 5 39 5 58-1" stroke="#F0A51B" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="m14 14-3-11M39 9V-3M71 17l6-9" stroke="#171417" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="absolute right-[-11%] -top-[3%] z-20 hidden w-[184px] bg-[#fffdf9] px-4 pb-4 pt-6 text-[#2a2528] shadow-[0_18px_34px_rgba(84,53,58,0.18)] xl:block xl:w-[205px] animate-[hero-paper-float_5.8s_ease-in-out_infinite]" style={{ ["--paper-rotate" as string]: "5deg", translate: `0 -${heroParallax * 0.7}px` }}>
                <span className="absolute -top-3 left-1/2 h-7 w-[106px] -translate-x-1/2 -rotate-[2deg] overflow-hidden bg-[#ed7195] [clip-path:polygon(0_8%,3%_0,14%_4%,25%_0,39%_3%,51%_0,64%_4%,76%_0,90%_4%,100%_0,98%_22%,100%_39%,98%_56%,100%_75%,98%_94%,88%_100%,75%_96%,62%_100%,48%_96%,35%_100%,20%_96%,8%_100%,0_92%,2%_76%,0_58%,2%_40%,0_22%)]">
                  <span className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_25%_35%,transparent_0_8px,rgba(255,255,255,0.85)_9px_10px,transparent_11px),radial-gradient(circle_at_76%_70%,transparent_0_8px,rgba(255,255,255,0.85)_9px_10px,transparent_11px)] [background-size:30px_28px]" />
                  <span className="absolute inset-x-1 top-1 h-px bg-white/35" />
                </span>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e05f88]">{translate("home.heroHelp")}</p>
                <ul className="space-y-3 text-[13px] font-medium leading-tight xl:text-sm">
                  <li className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#2eb4e7] text-[11px]">▣</span> {translate("home.heroServiceWebsite")}</li>
                  <li className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#f181a4] text-[11px]">♡</span> {translate("home.heroServiceSocial")}</li>
                  <li className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#f7b93b] text-[11px]">✎</span> {translate("home.heroServiceBrand")}</li>
                  <li className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#2eb4e7] text-[11px]">▯</span> {translate("home.heroServiceUx")}</li>
                  <li className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#f181a4] text-[11px]">✦</span> {translate("home.heroServiceAi")}</li>
                </ul>
              </div>
              <div className="absolute right-[22%] top-[22%] z-20 hidden w-[210px] bg-[#32b9e8] px-5 py-6 text-[#102a36] shadow-[0_18px_34px_rgba(31,122,157,0.25)] xl:block xl:w-[232px] animate-[hero-paper-float_6.6s_ease-in-out_0.8s_infinite]" style={{ ["--paper-rotate" as string]: "-4deg", translate: `0 -${heroParallax * 0.7}px` }}>
                <Paperclip aria-hidden="true" className="absolute -top-6 right-6 h-12 w-12 rotate-[10deg] stroke-[1.05] text-[#1e2527] drop-shadow-[0_2px_1px_rgba(255,255,255,0.45)]" />
                <svg className="absolute bottom-5 right-6 h-8 w-7 rotate-[8deg]" viewBox="0 0 28 32" fill="none" aria-hidden="true">
                  <path d="M14 28C6 22 3 17 3 11c0-4 2-7 5-7 3 0 5 3 6 5 1-2 3-5 6-5 3 0 5 3 5 7 0 6-3 11-11 17Z" stroke="#087DCE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-inter text-[23px] italic leading-[1.1] xl:text-[27px]">{translate("home.heroIdeaTop")}</p>
                <p className="mt-2 font-inter text-[23px] italic leading-[1.1] xl:text-[27px]">{translate("home.heroIdeaBottom")}</p>
                <div className="mt-5 h-[3px] w-24 bg-[#087da9]" />
                <p className="mt-4 text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em]">{translate("home.heroIdeaDescription")}</p>
              </div>
              <div className="absolute -right-[15%] bottom-[22%] z-20 hidden w-[205px] rounded-[24px] bg-[#fffdf9] p-4 text-[#261f21] shadow-[0_18px_34px_rgba(84,53,58,0.22)] xl:block xl:w-[230px] animate-[hero-paper-float_6.6s_ease-in-out_0.8s_infinite]" style={{ ["--paper-rotate" as string]: "-4deg", translate: `0 -${heroParallax * 0.7}px` }}>
                <div className="flex items-center gap-2 text-[9px] font-bold"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#f8d6ca] text-[#e06b91]">G</span><span>Greddys Martinez<br /><span className="font-normal text-[#766568]">@randomlygreddys</span></span><span className="ml-auto text-base">•••</span></div>
                <p className="mt-4 text-xs">{translate("home.heroNewBrand")} <span className="text-[#eaa223]">✦</span></p>
                <div className="mt-3 grid grid-cols-[1fr_0.72fr] gap-2">
                  <p className="font-inter text-[26px] font-semibold leading-[0.9]">{translate("home.heroDesignPower")}</p>
                  <div className="relative aspect-square overflow-hidden rounded-[10px]">
                    <Image src="/images/home-card-flower-vase.png" alt="Yellow flower in a black vase" fill sizes="120px" className="object-cover" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 text-[10px] font-medium"><span className="inline-flex items-center gap-1"><Heart className="h-4 w-4 fill-[#e7232a] text-[#e7232a]" />128</span><span className="inline-flex items-center gap-1"><MessageCircle className="h-4 w-4 stroke-[1.8]" />12</span><span className="inline-flex items-center gap-1"><Repeat2 className="h-4 w-4 stroke-[1.8]" />8</span></div>
              </div>
              <div className="absolute right-[4%] bottom-[3%] z-20 hidden w-[210px] overflow-hidden rounded-[8px] bg-[#96e4d8] text-[#102a36] shadow-[0_18px_34px_rgba(31,122,157,0.25)] xl:block xl:w-[235px] animate-[hero-paper-float_5.8s_ease-in-out_infinite]" style={{ ["--paper-rotate" as string]: "4deg", translate: `0 -${heroParallax * 0.7}px` }}>
                <div className="flex h-6 items-center justify-between bg-[#11b9a7] px-3 text-[7px] font-bold"><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#ff5f57]" /><i className="h-2 w-2 rounded-full bg-[#febc2e]" /><i className="h-2 w-2 rounded-full bg-[#28c840]" /></span><span>{translate("home.heroShopNav")}</span></div>
                <div className="grid grid-cols-[0.88fr_1.12fr] gap-2 p-4"><div><p className="font-inter text-[28px] leading-[0.88]">{translate("home.heroGlow")}</p><button className="mt-3 bg-[#172423] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white">{translate("home.heroBuy")}</button></div><div className="relative min-h-[115px] overflow-hidden rounded-sm"><Image src="/images/home-card-perfume.png" alt="" fill sizes="125px" className="object-cover object-[62%_50%]" /></div></div>
              </div>
            </div>
          </Container>
          <div className="absolute inset-0 z-40 hidden h-full bg-white px-10 pb-12 pt-28 min-[1025px]:block" style={{ translate: `0 ${100 - heroProjectProgress * 100}%` }}>
            <div className="mx-auto h-full max-w-[1080px]">
              <p className="mb-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#e05f88]">{translate("home.selectedProjects")}</p>
              <div className="mx-auto grid h-[min(62vh,590px)] max-w-[1040px] grid-cols-3 gap-5">
                {heroSelectedProjects.map((project) => (
                  <Link
                    key={`hero-project-${project.cardId}`}
                    href={project.href}
                    className="group relative overflow-hidden rounded-[22px] bg-[#f6f1ed] p-6 shadow-[0_18px_38px_rgba(58,39,47,0.12)]"
                    onMouseEnter={(event) => {
                      const video = event.currentTarget.querySelector("video");
                      void video?.play();
                    }}
                    onMouseLeave={(event) => {
                      const video = event.currentTarget.querySelector("video");
                      if (video) {
                        video.pause();
                        video.currentTime = 0;
                      }
                    }}
                  >
                    <div className="absolute inset-0" style={{ background: project.background }} />
                    {project.slug === "nayya-ai-benefits" ? (
                      <Image src="/images/projects/nayya-ai-benefits/thumbnails/nayya-selected-project.png" alt="" fill sizes="33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    ) : project.slug === "protecta" ? (
                      <>
                        <video src="/images/projects/protecta/hero-banner.mp4" muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        <Image
                          src="/images/projects/protecta/protecta-isotype-pine.svg"
                          alt=""
                          aria-hidden="true"
                          width={170}
                          height={192}
                          className="pointer-events-none absolute left-1/2 top-6 z-10 w-16 -translate-x-1/2 brightness-0 invert drop-shadow-[0_3px_8px_rgba(0,0,0,0.3)] sm:w-[72px]"
                        />
                      </>
                    ) : project.slug === "classical-word" ? (
                      <ClassicalWordBrochurePreview className="transition duration-500 group-hover:scale-105" />
                    ) : project.image ? <Image src={project.image} alt="" fill sizes="33vw" className="object-cover transition duration-500 group-hover:scale-105" /> : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_30%,rgba(255,255,255,0.94)_77%)]" />
                    <div className="relative flex h-full flex-col justify-end">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#5d5260]">{project.company}</span>
                      <span className="mt-2 font-inter text-3xl leading-none text-[#171315]">{project.title}</span>
                      <span className="mt-4 translate-y-2 text-sm font-semibold text-[#e05f88] opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">{translate("home.viewProject")} →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>

        <section hidden id="process" aria-labelledby="process-title" className="border-y border-[var(--ui-color-border-strong)] bg-[var(--ui-color-surface-base)] px-6 py-16 md:px-10 md:py-24 lg:px-20">
          <Container size="wide">
            <div className="mx-auto max-w-3xl text-center">
              <Heading id="process-title" as="h2" variant="display" className="text-[clamp(2.15rem,4vw,3.5rem)]">
                {translate("home.process.title")}
              </Heading>
            </div>

            <div role="tablist" aria-label={translate("home.process.tabsAria")} className="mx-auto mt-10 flex max-w-5xl gap-1 overflow-x-auto rounded-[var(--ui-radius-pill)] bg-[var(--ui-color-surface-base)] p-2 shadow-[var(--ui-shadow-panel)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {PROCESS_CAPABILITIES.map((capability) => {
                const isActive = activeProcessCapability === capability.id;

                return (
                  <Button
                    key={capability.id}
                    id={`process-tab-${capability.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`process-panel-${capability.id}`}
                    variant={isActive ? "secondary" : "ghost"}
                    size="xs"
                    onClick={() => setActiveProcessCapability(capability.id)}
                    className="min-h-10 shrink-0 rounded-[var(--ui-radius-pill)] px-4 text-[var(--ui-color-text-body)] hover:text-[var(--ui-color-brand-primary)] data-[variant=secondary]:text-[var(--ui-color-brand-primary)]"
                  >
                    {translate(capability.keys.label)}
                  </Button>
                );
              })}
            </div>

            <div
              id={`process-panel-${activeProcess.id}`}
              role="tabpanel"
              aria-labelledby={`process-tab-${activeProcess.id}`}
              className="mt-8"
            >
              <div className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ui-color-brand-primary)]">
                    {translate(activeProcess.keys.label)}
                  </span>
                  <Heading as="h3" variant="feature" className="mt-4 max-w-md text-[clamp(1.7rem,2.7vw,2.45rem)]">
                    {translate(activeProcess.keys.title)}
                  </Heading>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--ui-color-text-body)]">
                    {translate(activeProcess.keys.description)}
                  </p>
                  <ul className="mt-7 grid gap-3" aria-label={translate("home.process.outcomesAria")}>
                    {activeProcess.keys.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--ui-color-text-strong)]">
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[var(--ui-color-brand-primary)]" strokeWidth={2.5} />
                        <span>{translate(outcome)}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" size="xs" className="mt-7 w-fit rounded-[var(--ui-radius-pill)]">
                    <Link href={withBasePath(activeProcess.href)}>
                      {translate("home.process.viewProject")}
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                  </Button>
                </div>

                <div className="relative grid min-h-[290px] place-items-center overflow-hidden rounded-[var(--ui-radius-panel)] bg-[var(--ui-color-surface-soft)] p-6 sm:min-h-[360px] sm:p-10">
                  {activeProcess.media.videoSrc ? (
                    <video
                      src={activeProcess.media.videoSrc}
                      poster={activeProcess.media.posterSrc ?? undefined}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="absolute inset-0 size-full object-cover"
                    />
                  ) : (
                    <>
                      <span aria-hidden="true" className="absolute -right-16 -top-20 size-64 rounded-full border border-[var(--ui-color-brand-primary)] opacity-10" />
                      <span aria-hidden="true" className="absolute -bottom-24 -left-20 size-72 rounded-full bg-[var(--ui-color-brand-primary-soft)] opacity-70" />
                    </>
                  )}
                  <div className="relative z-10 max-w-sm text-center">
                    <div className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--ui-color-brand-primary)] text-white shadow-[var(--ui-shadow-button)]">
                      <Play aria-hidden="true" className="ml-0.5 size-5 fill-current" />
                    </div>
                    <span className="mt-7 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ui-color-brand-primary)]">
                      {translate("home.process.featuredProject")}
                    </span>
                    <p className="mt-2 font-inter text-3xl leading-tight text-[var(--ui-color-text-strong)] sm:text-4xl">
                      {translate(activeProcess.keys.project)}
                    </p>
                    <span className="mt-3 block text-sm text-[var(--ui-color-text-muted)]">
                      {translate("home.process.videoPlaceholder")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {recentWorkSection}
        {productStrengthsSection}
        {impactEvidenceSection}
      </section>

      {contentSections}
      <SiteFooter />
    </main>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BrainCircuit, Check, Eye, FolderGit2, GitCommitHorizontal, GitFork, LayoutTemplate, Lightbulb, Mic, MousePointer2, Play, Sparkles, Target, Wand2 } from "lucide-react";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { ChecklistStatusCard } from "./components/checklist-status-card";
import { HighlightCalloutCard } from "./components/highlight-callout-card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Container } from "./components/ui/container";
import { Heading } from "./components/ui/heading";
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

function EmphasizedImpactText({ text, emphasis }: { text: string; emphasis: string }) {
  const start = text.indexOf(emphasis);

  if (start === -1) {
    return text;
  }

  const end = start + emphasis.length;

  return (
    <>
      {text.slice(0, start)}
      <strong className="font-bold">{emphasis}</strong>
      {text.slice(end)}
    </>
  );
}

function ImpactArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 28" fill="none" className="mb-0.5 h-7 w-5 shrink-0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 25V3" />
      <path d="m3.5 9.5 6.5-6.5 6.5 6.5" />
    </svg>
  );
}

type HeroPhase = "sunrise" | "day" | "sunset" | "night";
type GitHubContribution = {
  date: string;
  count: number;
  level: number;
};

type GitHubContributionResponse = {
  total?: {
    lastYear?: number;
  };
  contributions?: GitHubContribution[];
};

const GITHUB_USERNAME = "gmartinez78";
const GITHUB_CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
const GITHUB_CONTRIBUTION_COLORS = ["#e8eff6", "#c8e8fa", "#8bd2f2", "#46aae0", "#1183D0"];

function getGitHubContributionColor(level: number) {
  return GITHUB_CONTRIBUTION_COLORS[Math.max(0, Math.min(level, GITHUB_CONTRIBUTION_COLORS.length - 1))];
}

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
const HOME_HIDDEN_CASE_STUDY_SLUGS = new Set(["classical-word"]);
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
  return !HOME_HIDDEN_CASE_STUDY_SLUGS.has(slug) && (MAIN_VISIBLE_CASE_STUDY_SLUGS.has(slug) || !isHiddenCaseStudySlug(slug));
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

export default function PortfolioPage() {
  const heroPhase: HeroPhase = "day";
  const { language } = useLanguage();
  const translate = useTranslate();
  const translateTag = useTranslateTag();
  const [githubContributions, setGithubContributions] = useState<GitHubContribution[]>([]);
  const [githubContributionTotal, setGithubContributionTotal] = useState(0);
  const [isGitHubActivityLoaded, setIsGitHubActivityLoaded] = useState(false);
  const githubUsername = GITHUB_USERNAME;
  const [heroVisitorType, setHeroVisitorType] = useState<HeroVisitorType | null>(null);
  const [heroAssistantQuery, setHeroAssistantQuery] = useState("");
  const [heroAssistantResponse, setHeroAssistantResponse] = useState(() => translate("home.assistantDefaultResponse"));
  const [heroAssistantResults, setHeroAssistantResults] = useState<HeroAssistantResult["items"]>([]);
  const [activeProcessCapability, setActiveProcessCapability] = useState<ProcessCapabilityId>("ai-product");
  const heroStatementKeys = [
    "home.aiHeroStatementEnd",
    "home.aiHeroStatementEndWorkflows",
    "home.aiHeroStatementEndAccessibility",
    "home.aiHeroStatementEndDecisions",
  ] as const;
  const [activeHeroStatement, setActiveHeroStatement] = useState(0);
  const [previousHeroStatement, setPreviousHeroStatement] = useState<number | null>(null);
  const activeHeroStatementRef = useRef(0);
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
  const heroProjects = [
    {
      href: withBasePath("/projects/nayya-ai-benefits"),
      backImage: "/images/projects/nayya-ai-benefits/banners/nayya-benefit-list-entry.jpg",
      frontImage: "/images/projects/nayya-ai-benefits/thumbnails/thumbnail-nayya-cover.png",
      label: translate("home.aiHeroProjectLabel"),
      title: translate("home.aiHeroProjectTitle"),
    },
    {
      href: withBasePath("/projects/i9-everify-integration"),
      backImage: "/images/projects/i9-everify-integration/hero/i9-banner.png",
      frontImage: "/images/projects/i9-everify-integration/thumbnails/i9-thumbnail.png",
      label: translate("home.aiHeroProjectI9Label"),
      title: translate("home.aiHeroProjectI9Title"),
    },
    {
      href: withBasePath("/projects/flock-accessibility-system"),
      backImage: "/images/projects/flock-accessibility-system/hero/flock-hero.png",
      frontImage: "/images/projects/flock-accessibility-system/thumbnails/flock-accessibility-system-cover.png",
      label: translate("home.aiHeroProjectFlockLabel"),
      title: translate("home.aiHeroProjectFlockTitle"),
    },
    {
      href: withBasePath("/projects/zapiano-marketing"),
      backImage: "/images/projects/zapiano/banners/page-7.svg",
      frontImage: "/images/projects/zapiano/thumbnails/zapiano-thumbnail.png",
      label: translate("home.aiHeroProjectZapianoLabel"),
      title: translate("home.aiHeroProjectZapianoTitle"),
    },
  ];
  const activeHeroProject = heroProjects[activeHeroStatement] ?? heroProjects[0];
  const heroAssistantSuggestions = [
    "home.assistantSuggestion1",
    "home.assistantSuggestion2",
    "home.assistantSuggestion3",
    "home.assistantSuggestion4",
  ] as const;
  const logoCarousel = [...socialProofLogos, ...socialProofLogos];
  const allProjects = appendLockedNayyaPlaceholder(caseStudies ?? []);
  const homeProjects = allProjects
    .filter((study) => study?.slug && isVisibleOnMain(study.slug))
    .sort(compareCaseStudyPriority)
    .map((study) => ({
      slug: study.slug,
      cardId: resolveHomeCardId(study.slug),
      title: study.slug === "flock-accessibility-system" ? translate("home.projectCard.flockTitle") : study.title,
      company: study.company ?? "",
      description: getProjectCardDescription(study.tagline ?? ""),
      image: resolveProjectListCardImage(study.slug, study.images?.cover || study.images?.hero || ""),
      background: PROJECT_BACKGROUNDS[study.slug] ?? "radial-gradient(ellipse at 20% 50%, #d4e8ff 0%, #edf5fb 70%)",
      href: resolveProjectHref(study),
      tags: getVisibleProjectTags(study.tags),
    }));
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
          const rank = (slug: string) => (slug === "calendar-keeper" ? 0 : slug === "protecta" ? 2 : 1);
          return rank(left.slug) - rank(right.slug);
        }),
    },
  ].filter((group) => group.projects.length > 0);
  const productStrengths = [
    {
      title: translate("home.productStrengths.endToEnd.title"),
      description: translate("home.productStrengths.endToEnd.description"),
      href: "/benefits",
    },
    {
      title: translate("home.productStrengths.complexFlows.title"),
      description: translate("home.productStrengths.complexFlows.description"),
      href: "/projects/flock-accessibility-system",
    },
    {
      title: translate("home.productStrengths.systems.title"),
      description: translate("home.productStrengths.systems.description"),
      href: "/projects/nayya-ai-benefits",
    },
  ];
  const heroPhaseStyles = useMemo(() => HERO_PHASE_STYLES[heroPhase], [heroPhase]);
  function scrollToSection(sectionId?: "projects" | "skills" | "github") {
    if (!sectionId || typeof document === "undefined") {
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function runHeroAssistantQuery(rawQuery: string) {
    const query = rawQuery.trim();
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

  function handleHeroAssistantSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runHeroAssistantQuery(heroAssistantQuery);
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => {
      const current = activeHeroStatementRef.current;
      const next = (current + 1) % heroStatementKeys.length;
      setPreviousHeroStatement(current);
      activeHeroStatementRef.current = next;
      setActiveHeroStatement(next);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [heroStatementKeys.length]);

  useEffect(() => {
    if (previousHeroStatement === null) {
      return;
    }

    const timeout = window.setTimeout(() => setPreviousHeroStatement(null), 640);
    return () => window.clearTimeout(timeout);
  }, [previousHeroStatement]);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    void (async () => {
      try {
        const response = await fetch(GITHUB_CONTRIBUTIONS_URL, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as GitHubContributionResponse;

        if (!isActive) {
          return;
        }

        const contributions = payload.contributions ?? [];
        setGithubContributions(contributions);
        setGithubContributionTotal(
          payload.total?.lastYear ?? contributions.reduce((total, item) => total + item.count, 0),
        );
      } catch {
        if (isActive) {
          setGithubContributions([]);
        }
      } finally {
        if (isActive) {
          setIsGitHubActivityLoaded(true);
        }
      }
    })();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const githubContributionWeeks = useMemo(() => {
    const recentContributions = githubContributions.slice(-364);
    const weeks: GitHubContribution[][] = [];

    for (let index = 0; index < recentContributions.length; index += 7) {
      weeks.push(recentContributions.slice(index, index + 7));
    }

    return weeks;
  }, [githubContributions]);

  const recentWorkSection = (
    <section key="work" id="projects" className="bg-white px-6 pb-28 pt-16 md:px-10 md:pb-32 md:pt-20 xl:px-20">
      <Container size="content">
        <div className="space-y-20 md:space-y-28">
          {projectGroups.map((group) => (
            <section key={group.id} aria-labelledby={`${group.id}-projects-title`}>
              <div className="flex items-end justify-between gap-6">
                <Heading id={`${group.id}-projects-title`} as="h2" variant="section" className="text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.02] text-[#141114]">
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
              <div className="mt-8 grid gap-x-10 gap-y-12 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
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
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} case study preview for ${project.company}`}
                          fill
                          sizes="(max-width: 767px) 100vw, 520px"
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
    <section key="product-strengths" aria-labelledby="product-strengths-title" className="bg-white pb-16 md:pb-20">
      <div
        className="relative w-full overflow-hidden px-6 py-12 text-white sm:px-9 md:px-12 md:py-16 xl:px-20"
        style={{ background: "linear-gradient(135deg, #076da9 0%, var(--ui-color-brand-primary) 100%)" }}
      >
        <div className="relative mx-auto max-w-[650px] lg:ml-[15%]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-white">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-white" />
              {translate("home.productStrengths.eyebrow")}
            </p>
            <Heading id="product-strengths-title" as="h2" variant="feature" tone="inverse" className="mt-4 max-w-[620px] text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.02]">
              {translate("home.productStrengths.titleLead")}
              <br />
              {translate("home.productStrengths.titleLineEnd")} {" "}
              <span className="font-playfair font-normal italic">{translate("home.productStrengths.titleAccent")}</span>
            </Heading>
            <p className="mt-5 max-w-[610px] text-[16px] leading-[1.5] text-white/85 md:text-[18px]">
              {translate("home.productStrengths.intro")}
            </p>
          </div>
          <ol className="mt-10">
            {productStrengths.map((strength, index) => (
              <li key={strength.title} className={index === 0 ? "" : "border-t border-white/25"}>
                <Link
                  href={withBasePath(strength.href)}
                  aria-label={`${translate("home.viewProject")}: ${strength.title}`}
                  className="group grid grid-cols-[76px_minmax(0,1fr)] gap-3 py-6 transition-colors duration-200 hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none sm:grid-cols-[86px_minmax(0,1fr)]"
                >
                  <span className="pt-0.5 text-[22px] font-semibold leading-none text-[#f8df36]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="flex items-center gap-2 text-[21px] font-semibold leading-tight sm:text-[24px]">
                      {strength.title}
                      <ArrowRight aria-hidden="true" className="size-5 -translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" strokeWidth={2.25} />
                    </h3>
                    <p className="mt-3 max-w-[490px] text-sm leading-relaxed text-white/80 sm:text-[15px]">
                      {strength.description}
                    </p>
                  </div>
                </Link>
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

  const aboutSection = (
    <section key="about" id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-[#fcf9fb] px-6 py-14 md:px-10 md:py-[4.5rem] xl:px-20">
      <svg aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 hidden h-56 w-72 text-[#f8df36] lg:block" viewBox="0 0 260 210" fill="none">
        <path d="M-24 12C28 48 75 96 111 164" stroke="currentColor" strokeWidth="32" strokeLinecap="round" />
      </svg>
      <Container size="wide" className="relative">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold text-[#1183D0]">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-[#1183D0]" />
              {translate("home.about.eyebrow")}
            </p>
            <Heading id="about-title" as="h2" variant="feature" className="mt-4 max-w-[650px] text-[clamp(2rem,3.2vw,3rem)] leading-[1.08] text-[#141114]">
              {translate("home.about.titleLead")} {" "}
              <span className="font-playfair font-normal italic">{translate("home.about.titleAccent")}</span>
              {translate("home.about.titleTail")}
            </Heading>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#d8d3ff] px-4 py-2 text-xs font-semibold text-[#141114]">{translate("home.about.tagResearch")}</span>
              <span className="rounded-full bg-[#f8df36] px-4 py-2 text-xs font-semibold text-[#141114]">{translate("home.about.tagAi")}</span>
              <span className="rounded-full bg-[#f6c3ed] px-4 py-2 text-xs font-semibold text-[#141114]">{translate("home.about.tagSystems")}</span>
            </div>
          </div>
          <div className="relative z-10 max-w-[430px] pt-6 lg:pt-24">
            <p className="text-[16px] font-semibold leading-[1.45] text-[#141114] md:text-[17px]">
              {translate("home.about.lead")}
            </p>
            <p className="mt-2 text-[15px] font-normal not-italic leading-[1.5] text-[#5e5961] md:text-[16px]">
              {translate("home.about.recruiters")}
            </p>
            <p className="mt-3 text-[15px] leading-[1.5] text-[#5e5961] md:text-[16px]">
              {translate("home.about.copy")} <span className="font-playfair italic">{translate("home.about.copyAccent")}</span>
            </p>
            <Button asChild variant="default" size="sm" className="mt-6 bg-[#141114] text-white hover:bg-[#2d2528]">
              <Link href={withBasePath("/resume")}>
                {translate("home.about.cta")}
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.25} />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );

  const impactEvidenceSection = (
    <section key="impact-evidence" aria-labelledby="impact-evidence-title" className="bg-white px-8 pb-20 md:px-12 md:pb-24 xl:px-24">
      <Container size="wide">
        <div className="mx-auto max-w-[540px] text-center">
          <Heading id="impact-evidence-title" as="h2" variant="section" className="text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.02] text-[#141114]">
            {translate("home.impact.titleLead")} {" "}
            <span className="font-playfair font-normal italic">{translate("home.impact.titleAccent")}</span>{" "}
            {translate("home.impact.titleTail")}
          </Heading>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1120px] gap-8 md:mt-16 md:grid-cols-12 md:grid-rows-[310px_270px_266px] md:gap-8">
          <Link
            href={withBasePath("/projects/nayya-ai-benefits")}
            className="group relative min-h-[310px] overflow-hidden rounded-xl md:col-span-4 md:min-h-0"
          >
            <Image
              src="/images/projects/nayya-ai-benefits/thumbnails/nayya-enrollment-laptop.png"
              alt={translate("home.impact.nayyaImageAlt")}
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,rgba(14,41,81,0.78)_100%)]" />
            <span className="absolute bottom-16 left-4 inline-flex rounded-full bg-[#ffe000] px-5 py-2.5 text-[12px] font-bold leading-none text-[#141114]">
              {translate("home.impact.caseStudy")}
            </span>
            <div className="absolute inset-x-4 bottom-4 text-white">
              <p className="text-[18px] font-normal leading-tight">{translate("home.impact.nayyaTitle")}</p>
            </div>
          </Link>

          <Link
            href={withBasePath("/projects/flock-accessibility-system")}
            className="group relative min-h-[310px] overflow-hidden rounded-xl md:col-span-5 md:min-h-0"
          >
            <Image
              src="/images/projects/flock-accessibility-system/thumbnails/flock-accessibility-system-cover.png"
              alt={translate("home.impact.flockImageAlt")}
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,rgba(14,41,81,0.78)_100%)]" />
            <span className="absolute bottom-16 left-4 inline-flex rounded-full bg-[#ffe000] px-5 py-2.5 text-[12px] font-bold leading-none text-[#141114]">
              {translate("home.impact.featuredProject")}
            </span>
            <div className="absolute inset-x-4 bottom-4 text-white">
              <p className="text-[18px] font-normal leading-tight">{translate("home.impact.flockTitle")}</p>
            </div>
          </Link>

          <Link
            href={withBasePath("/projects/nayya-ai-benefits")}
            aria-label={`${translate("home.viewProject")}: ${translate("home.impact.enrollment")}`}
            className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-xl bg-[var(--ui-color-brand-primary)] p-5 text-white transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141114] focus-visible:ring-offset-4 md:col-span-3 md:min-h-0"
          >
            <div>
              <p className="text-[15px] font-normal leading-[1.16] text-white">{translate("home.impact.enrollment")}</p>
              <strong className="mt-1 block text-[clamp(3.5rem,5vw,4.4rem)] font-bold leading-none tracking-[-0.07em]">5,500</strong>
              <p className="mt-3 max-w-[180px] text-[15px] font-normal leading-[1.16] text-white/80">
                {translate("home.impact.enrollmentContextLead")}
                <span className="font-playfair font-normal italic">{translate("home.impact.enrollmentContextAccent")}</span>
                {translate("home.impact.enrollmentContextTail")}
              </p>
            </div>
          </Link>

          <Link
            href={withBasePath("/projects/i9-everify-integration")}
            aria-label={`${translate("home.viewProject")}: ${translate("home.impact.formCompletion")}`}
            className="group relative flex min-h-[250px] flex-col justify-between rounded-xl bg-white p-5 text-[#141114] shadow-[0_8px_18px_rgba(14,41,81,0.1)] transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141114] focus-visible:ring-offset-4 md:col-span-3 md:min-h-0"
          >
            <div>
              <span className="inline-flex rounded-full bg-[#f5f5f5] px-5 py-2.5 text-[12px] font-bold leading-none text-[#141114]">{translate("home.impact.tagFormCompletion")}</span>
              <p className="mt-3 max-w-[190px] text-[17px] font-normal leading-[1.18] md:text-[18px]"><EmphasizedImpactText text={translate("home.impact.formCompletion")} emphasis={translate("home.impact.formCompletionEmphasis")} /></p>
            </div>
            <div className="flex items-end justify-between gap-3">
              <div className="flex items-start gap-0.5">
                <strong className="text-[clamp(3.5rem,5vw,4.4rem)] font-semibold leading-none tracking-[-0.07em]">35</strong>
                <span className="mt-1 text-[clamp(1rem,1.5vw,1.3rem)] font-semibold leading-none">%</span>
              </div>
              <ImpactArrow />
            </div>
          </Link>

          <Link
            href={withBasePath("/benefits")}
            aria-label={`${translate("home.viewProject")}: ${translate("home.impact.processingTime")}`}
            className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-xl bg-[#f8df36] p-5 text-[#141114] transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141114] focus-visible:ring-offset-4 md:col-span-3 md:min-h-0"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-[5.4rem] left-1/2 size-44 -translate-x-1/2 rounded-full border-[1.75rem] border-[#e4c900]/80" />
            <div className="relative z-10">
              <span className="inline-flex rounded-full bg-white/80 px-5 py-2.5 text-[12px] font-bold leading-none text-[#141114]">{translate("home.impact.tagProcessing")}</span>
              <p className="mt-3 max-w-[175px] text-[17px] font-normal leading-[1.18] md:text-[18px]"><EmphasizedImpactText text={translate("home.impact.processingTime")} emphasis={translate("home.impact.processingTimeEmphasis")} /></p>
            </div>
            <div className="relative z-10 flex items-end justify-between gap-3">
              <div className="flex items-start gap-0.5">
                <strong className="text-[clamp(3.5rem,5vw,4.4rem)] font-semibold leading-none tracking-[-0.07em]">72</strong>
                <span className="mt-1 text-[clamp(1rem,1.5vw,1.3rem)] font-semibold leading-none">%</span>
              </div>
              <ImpactArrow />
            </div>
          </Link>

          <Link
            href={withBasePath("/benefits")}
            aria-label={`${translate("home.viewProject")}: ${translate("home.impact.selfService")}`}
            className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-xl bg-[#efefef] p-5 text-[#141114] transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141114] focus-visible:ring-offset-4 md:col-span-4 md:min-h-0"
          >
            <div>
              <span className="inline-flex rounded-full bg-white/80 px-5 py-2.5 text-[12px] font-bold leading-none text-[#141114]">{translate("home.impact.tagSelfService")}</span>
              <p className="mt-3 max-w-[220px] text-[17px] font-normal leading-[1.18] md:text-[18px]"><EmphasizedImpactText text={translate("home.impact.selfService")} emphasis={translate("home.impact.selfServiceEmphasis")} /></p>
            </div>
            <div className="flex items-end justify-between gap-3">
              <div className="flex items-start gap-0.5">
                <strong className="text-[clamp(2.9rem,4vw,3.9rem)] font-semibold leading-none tracking-[-0.07em]">500</strong>
                <span className="mt-1 text-[clamp(1rem,1.5vw,1.3rem)] font-semibold leading-none">+</span>
              </div>
              <ImpactArrow />
            </div>
          </Link>

          <div aria-hidden="true" className="relative hidden overflow-hidden md:col-span-2 md:block">
            <div className="absolute left-5 top-0 h-[5.5rem] w-[2.8rem] overflow-hidden">
              <div className="absolute -left-[2.8rem] top-0 size-[5.5rem] rounded-full border-[1.5rem] border-[#f8df36]" />
            </div>
            <div className="absolute bottom-0 right-5 h-16 w-32 overflow-hidden">
              <div className="absolute -bottom-16 left-0 size-32 rounded-full border-[1.15rem] border-[#2183ca]" />
            </div>
          </div>

          <Link
            href={withBasePath("/benefits")}
            aria-label={`${translate("home.viewProject")}: ${translate("home.impact.supportCalls")}`}
            className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-xl bg-[#efefef] p-5 text-[#141114] transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141114] focus-visible:ring-offset-4 md:col-span-4 md:min-h-0"
          >
            <div>
              <span className="inline-flex rounded-full bg-white/80 px-5 py-2.5 text-[12px] font-bold leading-none text-[#141114]">{translate("home.impact.tagSupportImpact")}</span>
              <p className="mt-3 max-w-[220px] text-[17px] font-normal leading-[1.18] md:text-[18px]"><EmphasizedImpactText text={translate("home.impact.supportCalls")} emphasis={translate("home.impact.supportCallsEmphasis")} /></p>
            </div>
            <div className="flex items-end justify-between gap-3">
              <div className="flex items-start gap-0.5">
                <strong className="text-[clamp(2.9rem,4vw,3.9rem)] font-semibold leading-none tracking-[-0.07em]">9,000</strong>
                <span className="mt-1 text-[clamp(1rem,1.5vw,1.3rem)] font-semibold leading-none">+</span>
              </div>
              <ImpactArrow />
            </div>
          </Link>

          <Link
            href={withBasePath("/benefits")}
            aria-label={`${translate("home.viewProject")}: ${translate("home.impact.ticketReduction")}`}
            className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-xl bg-[#f9b5e5] p-5 text-[#141114] transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141114] focus-visible:ring-offset-4 md:col-span-5 md:min-h-0"
          >
            <div>
              <span className="inline-flex rounded-full bg-white/80 px-5 py-2.5 text-[12px] font-bold leading-none text-[#141114]">{translate("home.impact.tagSupportEfficiency")}</span>
              <p className="mt-3 max-w-[255px] text-[17px] font-normal leading-[1.18] md:text-[18px]"><EmphasizedImpactText text={translate("home.impact.ticketReduction")} emphasis={translate("home.impact.ticketReductionEmphasis")} /></p>
            </div>
            <div className="flex items-end justify-between gap-3">
              <div className="flex items-start gap-0.5">
                <strong className="text-[clamp(2.9rem,4vw,3.9rem)] font-semibold leading-none tracking-[-0.07em]">500</strong>
                <span className="mt-1 text-[clamp(1rem,1.5vw,1.3rem)] font-semibold leading-none">+</span>
              </div>
              <ImpactArrow />
            </div>
          </Link>

          <Link
            href={withBasePath("/projects/zapiano-marketing")}
            aria-label={`${translate("home.viewProject")}: Zapiano`}
            className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-xl bg-[#cfe8ff] p-5 text-[#141114] transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141114] focus-visible:ring-offset-4 md:col-span-3 md:min-h-0"
          >
            <blockquote className="text-[14px] font-normal leading-[1.45] text-[#141114] md:text-[15px]">“{translate("home.impact.upworkQuote")}”</blockquote>
            <div className="mt-8 flex items-center gap-3">
              <Image
                src={withBasePath("/images/people/sven-haefliger.png")}
                alt="Sven Haefliger"
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-[13px] font-semibold leading-tight">Sven Haefliger</p>
                <p className="mt-1 text-[11px] leading-tight text-[#141114]/72">{translate("home.impact.zapianoOwner")}</p>
              </div>
            </div>
          </Link>
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
        <div className="flex items-center justify-between gap-6">
          <Heading as="h2" variant="section" className="text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.02] text-[#141114]">
            {translate("home.githubActivity")}
          </Heading>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#0e2951] transition-colors hover:text-[#1183D0]"
          >
            @{githubUsername}
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2.25} />
          </a>
        </div>
        <div className="mt-6 overflow-x-auto rounded-[18px] bg-[#fbfdff] p-5 md:p-8">
          <div className="mx-auto flex min-h-[220px] min-w-[840px] flex-col justify-center">
            <div className="flex items-center gap-3 text-[12px] font-medium text-[#5c7792]">
              <span className={`size-2 rounded-full ${isGitHubActivityLoaded ? "bg-[#1183D0]" : "bg-[#bcd2e7]"}`} aria-hidden="true" />
              <span>{isGitHubActivityLoaded ? translate("home.githubLiveActivity") : translate("home.githubLoadingActivity")}</span>
              {githubContributions.length ? (
                <>
                  <span className="text-[#b7c8d8]" aria-hidden="true">•</span>
                  <span><strong className="font-semibold text-[#0e2951]">{githubContributionTotal.toLocaleString(language)}</strong> {translate("home.githubLastYearContributions")}</span>
                </>
              ) : null}
            </div>
            <div className="mt-5 flex items-stretch gap-3" role="img" aria-label={`${githubUsername} GitHub contributions over the last year`}>
              <div className="flex flex-col justify-between pb-px text-[10px] font-medium text-[#8aa0b8]">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>
              <div className="grid aspect-[23/3] flex-1 grid-flow-col grid-rows-7 auto-cols-fr gap-[5px]">
                {(githubContributions.length
                  ? githubContributionWeeks.flat()
                  : Array.from({ length: 364 }, (_, index) => ({ date: `loading-${index}`, count: 0, level: 0 }))
                ).map((contribution) => (
                  <span
                    key={contribution.date}
                    title={contribution.date.startsWith("loading-") ? undefined : `${contribution.count} contribution${contribution.count === 1 ? "" : "s"} on ${contribution.date}`}
                    className="h-full w-full rounded-[4px] transition-transform duration-150 hover:scale-110"
                    style={{ backgroundColor: getGitHubContributionColor(contribution.level) }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-[10px] font-medium text-[#8aa0b8]">
              <span>{translate("home.githubLess")}</span>
              {GITHUB_CONTRIBUTION_COLORS.map((color) => (
                <span key={color} className="size-[11px] rounded-[3px]" style={{ backgroundColor: color }} />
              ))}
              <span>{translate("home.githubMore")}</span>
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

  const contentSections = [collaboratorsSection, githubProofSection, ctaSection];

  return (
    <main className="bg-white text-[#3c3e3f] overflow-x-hidden lg:my-2 lg:mr-2 lg:overflow-clip lg:rounded-[28px] lg:border lg:border-[#e5eef7] lg:shadow-[0_10px_34px_rgba(14,41,81,0.06)]">
      <SiteHeader variant="transparent" />

      {/* ── Hero ── */}
      <section className="bg-white">
        <div>
        <div className="relative isolate overflow-hidden bg-white px-5 py-10 sm:px-10 sm:py-12 lg:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[image:var(--ui-surface-hero)]" />
          <div aria-hidden="true" className="hero-cloud pointer-events-none absolute -left-52 top-[28%] h-44 w-[29rem] sm:-left-44 sm:h-56 sm:w-[36rem]">
            <Image src="/images/hero-clouds.png" alt="" fill sizes="(min-width: 640px) 576px, 464px" className="object-contain" />
          </div>
          <div aria-hidden="true" className="hero-cloud pointer-events-none absolute -right-52 bottom-[-0.5rem] h-40 w-[29rem] -scale-x-100 sm:-right-44 sm:h-52 sm:w-[34rem]">
            <Image src="/images/hero-clouds.png" alt="" fill sizes="(min-width: 640px) 544px, 464px" className="object-contain" />
          </div>
          <Container size="wide" className="relative flex items-center justify-center">
            <div className="relative z-10 mx-auto w-full min-w-0 max-w-[840px] text-center">
              <div className="mx-auto w-full min-w-0 max-w-[840px]">
                <div className="relative mx-auto mb-2 size-16 overflow-hidden rounded-full border-2 border-white shadow-[0_8px_20px_rgba(14,41,81,0.14)] sm:size-[4.5rem]">
                  <Image
                    src="/images/profile-photo.png"
                    alt="Greddys Martinez"
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </div>
                <Heading as="h1" variant="hero" tone="editorial" className="mx-auto mt-2 max-w-[840px] text-center text-[clamp(2.5rem,5.1vw,4.9rem)] leading-[0.95] tracking-[-0.055em] text-[#141114]">
                  <span className="hero-title-reveal hero-title-reveal-name block font-playfair font-normal italic">{translate("home.aiHeroTitleLead")}</span>
                  <span className="hero-title-reveal hero-title-reveal-line mt-4 block font-inter text-[0.5em] font-semibold tracking-[-0.04em] sm:mt-5 sm:text-[0.58em]">
                    {translate("home.aiHeroTitleAccent")}
                  </span>
                </Heading>
                <div className="relative mx-auto mt-5 h-[216px] w-full max-w-[600px] sm:mt-6 sm:h-[256px] sm:max-w-[700px]">
                  <div aria-hidden="true" className="pointer-events-none absolute left-[1%] top-1 z-20 animate-[tool-float_4.6s_ease-in-out_infinite] [animation-delay:-1.2s] motion-reduce:animate-none sm:left-4">
                    <div className="grid size-12 -rotate-[10deg] place-items-center rounded-[15px] bg-[#141414] p-2.5 shadow-[0_10px_18px_rgba(14,41,81,0.22)] sm:size-[4.25rem] sm:rounded-[18px] sm:p-3.5">
                      <Image src="/images/tools/ai/openai.svg" alt="" width={32} height={32} className="size-7 sm:size-9" />
                    </div>
                  </div>
                  <div aria-hidden="true" className="pointer-events-none absolute left-[10%] top-[74px] z-20 animate-[tool-float_5.4s_ease-in-out_infinite] [animation-delay:-3.1s] motion-reduce:animate-none sm:left-[13%] sm:top-[88px]">
                    <div className="grid size-11 rotate-[8deg] place-items-center rounded-[13px] bg-white p-1.5 shadow-[0_10px_18px_rgba(14,41,81,0.2)] sm:size-[3.75rem] sm:rounded-[16px] sm:p-2">
                      <Image src="/images/tools/ai/grok.png" alt="" width={540} height={540} className="size-8 sm:size-10" />
                    </div>
                  </div>
                  <div aria-hidden="true" className="pointer-events-none absolute bottom-1 left-[26%] z-20 animate-[tool-float_4.9s_ease-in-out_infinite] [animation-delay:-0.7s] motion-reduce:animate-none sm:bottom-2 sm:left-[28%]">
                    <div className="grid size-11 rotate-[7deg] place-items-center rounded-[13px] bg-white p-1 shadow-[0_10px_18px_rgba(14,41,81,0.22)] sm:size-[3.5rem] sm:rounded-[16px] sm:p-1.5">
                      <Image src="/images/tools/ai/codex.svg" alt="" width={40} height={40} className="size-9 sm:size-11" />
                    </div>
                  </div>
                  <div aria-hidden="true" className="pointer-events-none absolute right-[1%] top-1 z-20 animate-[tool-float_5.2s_ease-in-out_infinite] [animation-delay:-2.5s] motion-reduce:animate-none sm:right-4">
                    <div className="relative grid size-12 rotate-[9deg] place-items-center rounded-[15px] border border-white bg-white shadow-[0_10px_18px_rgba(14,41,81,0.2)] sm:size-[4.25rem] sm:rounded-[18px]">
                      <Image src="/images/tools/figma.svg" alt="" width={20} height={30} className="h-8 w-auto sm:h-10" />
                      <Sparkles aria-hidden="true" className="absolute -right-1 -top-1 size-4 rounded-full bg-white p-0.5 text-[#8e66ff] sm:size-[1.125rem]" strokeWidth={2.4} />
                    </div>
                  </div>
                  <div aria-hidden="true" className="pointer-events-none absolute right-[10%] top-[76px] z-20 animate-[tool-float_5.6s_ease-in-out_infinite] [animation-delay:-4s] motion-reduce:animate-none sm:right-[13%] sm:top-[88px]">
                    <div className="grid size-11 -rotate-[8deg] place-items-center rounded-[13px] bg-white shadow-[0_10px_18px_rgba(14,41,81,0.2)] sm:size-[3.75rem] sm:rounded-[16px]">
                      <Image src="/images/tools/ai/lovable.svg" alt="" width={32} height={32} className="size-8 sm:size-9" />
                    </div>
                  </div>
                  <div aria-hidden="true" className="pointer-events-none absolute bottom-1 right-[26%] z-20 animate-[tool-float_4.7s_ease-in-out_infinite] [animation-delay:-1.8s] motion-reduce:animate-none sm:bottom-2 sm:right-[28%]">
                    <div className="grid size-11 -rotate-[6deg] place-items-center rounded-[13px] bg-white p-1.5 shadow-[0_10px_18px_rgba(14,41,81,0.22)] sm:size-[3.5rem] sm:rounded-[16px] sm:p-2">
                      <Image src="/images/tools/ai/claude-code.svg" alt="" width={32} height={32} className="size-9 sm:size-11" />
                    </div>
                  </div>
                  <Link
                    href={activeHeroProject.href}
                    className="group absolute left-1/2 top-1/2 z-10 h-[170px] w-[340px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:-translate-y-[54%] sm:h-[205px] sm:w-[445px]"
                  >
                    <div key={activeHeroStatement} className="relative size-full animate-[hero-project-enter_520ms_ease-out]">
                      <div className="absolute left-0 top-6 h-[127px] w-[194px] -rotate-[7deg] overflow-hidden rounded-[16px] bg-[#edf7fc] shadow-[0_14px_26px_rgba(14,41,81,0.19)] transition-transform duration-300 group-hover:-translate-x-1 group-hover:-rotate-[9deg] sm:top-6 sm:h-[158px] sm:w-[242px] sm:rounded-[20px]">
                        <Image
                          src={activeHeroProject.backImage}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 242px, 194px"
                          className="object-cover object-[56%_42%]"
                        />
                      </div>
                      <div className="absolute right-0 top-0 h-[148px] w-[222px] rotate-[6deg] overflow-hidden rounded-[18px] border-0 bg-white shadow-none outline-none transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[8deg] sm:h-[188px] sm:w-[278px] sm:rounded-[24px]">
                        <Image
                          src={activeHeroProject.frontImage}
                          alt={activeHeroProject.title}
                          fill
                          sizes="(min-width: 640px) 278px, 222px"
                          className="object-cover object-[54%_46%] transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,19,37,0.02)_20%,rgba(5,19,37,0.88)_100%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-2.5 text-left text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 sm:p-3.5">
                          <span className="flex items-center gap-1 text-[9px] font-semibold text-white sm:text-[10px]">
                            {translate("home.aiHeroProjectCta")}
                            <ArrowRight aria-hidden="true" className="size-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <p className="mx-auto mt-3 flex max-w-[510px] flex-wrap items-baseline justify-center gap-x-2 text-[#45576a] sm:mt-4">
                  <span className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#71808d] sm:text-[15px]">
                    {translate("home.aiHeroStatementLead")}
                  </span>
                  <span className="relative inline-grid max-w-full overflow-hidden align-[-0.14em] font-playfair text-[clamp(1.05rem,1.7vw,1.35rem)] italic leading-none text-[#45576a]">
                    {previousHeroStatement !== null ? (
                      <span aria-hidden="true" className="hero-statement-out absolute inset-x-0 top-0 text-center">
                        {translate(heroStatementKeys[previousHeroStatement])}
                      </span>
                    ) : null}
                    <span key={activeHeroStatement} className={`block text-center ${previousHeroStatement !== null ? "hero-statement-in" : ""}`}>
                      {translate(heroStatementKeys[activeHeroStatement])}
                    </span>
                  </span>
                </p>
                <nav
                  hidden
                  aria-label={translate("projectsPage.filterBy")}
                  className="mt-6 flex-wrap justify-center gap-2"
                >
                  {heroFilters.map(({ label, href }) => (
                    <Badge key={href} asChild variant="outline" size="default" className="max-sm:min-h-7 max-sm:px-3 max-sm:text-[13px]">
                      <Link href={withBasePath(href)}>
                        {label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </Badge>
                  ))}
                </nav>
                <div
                  hidden
                  className="mt-6 w-full min-w-0 max-w-[540px] rounded-[24px] border border-[#b7ddf4] bg-white p-4 text-left text-[#0e2951] shadow-[0_18px_38px_rgba(14,41,81,0.1)] sm:p-5"
                  style={{ width: "min(540px, calc(100vw - 2.5rem))" }}
                >
                  <div className="flex items-center gap-2 text-[#0e5f9a]">
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#1183D0] text-white">
                      <BrainCircuit aria-hidden="true" className="size-4" />
                    </span>
                    <span className="text-sm font-semibold">{translate("home.assistantHeroTitle")}</span>
                  </div>
                  <p className="mt-4 text-[15px] font-medium leading-snug text-[#0e2951] sm:text-base">
                    {translate("home.assistantHeroPrompt")}
                  </p>
                  <form onSubmit={handleHeroAssistantSubmit} className="mt-3 flex items-center gap-2 rounded-[15px] border border-[#c5def0] bg-[#eef7fd] p-1.5">
                    <Mic aria-hidden="true" className="ml-2 size-4 shrink-0 text-[#1183D0]" />
                    <input
                      value={heroAssistantQuery}
                      onChange={(event) => setHeroAssistantQuery(event.target.value)}
                      aria-label={translate("home.assistantHeroPlaceholder")}
                      placeholder={translate("home.assistantHeroPlaceholder")}
                      className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#0e2951] outline-none placeholder:text-[#5c8fb2]"
                    />
                    <button
                      type="submit"
                      aria-label={translate("home.assistantHeroSubmit")}
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2183ca] text-white transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2183ca]"
                    >
                      <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.5} />
                    </button>
                  </form>
                  {heroAssistantQuery.trim() ? (
                    <div className="mt-3 border-t border-[#d8e7f2] pt-3">
                      <p className="text-xs leading-relaxed text-[#4c6276]">{heroAssistantResponse}</p>
                      {heroAssistantResults.slice(0, 1).map((result) => (
                        <Link
                          key={result.id}
                          href={result.href}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0e78bc] hover:text-[#0e2951]"
                        >
                          {result.title}
                          <ArrowRight aria-hidden="true" className="size-3.5" />
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div hidden className="mt-3 max-w-[540px] flex-wrap justify-center gap-2">
                  {heroAssistantSuggestions.map((suggestion) => {
                    const query = translate(suggestion);

                    return (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          setHeroAssistantQuery(query);
                          runHeroAssistantQuery(query);
                        }}
                        className="rounded-full border border-[#1183D0]/25 bg-white/75 px-3 py-1.5 text-[11px] font-semibold text-[#0e5f9a] transition-colors hover:border-[#1183D0] hover:bg-[#e9f6ff]"
                      >
                        {query}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div hidden className="relative order-1 mx-auto h-[260px] w-full max-w-[280px] sm:h-[380px] sm:max-w-[380px] lg:mx-0 lg:h-[460px] lg:max-w-[460px] xl:h-[520px] xl:max-w-[520px]">
              <div className="absolute left-1/2 top-[48%] z-10 size-[76%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[var(--ui-color-brand-primary)]">
                <Image
                  src="/images/home-hero-portrait-white.png"
                  alt="Greddys Martinez"
                  fill
                  priority
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 460px, (min-width: 640px) 380px, 320px"
                  className="object-contain object-bottom"
                />
              </div>
              <div aria-hidden="true" className="absolute left-1/2 top-[48%] size-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[9px] border-[var(--ui-color-brand-primary)] border-b-transparent border-l-transparent rotate-[28deg] opacity-70" />
            </div>
          </Container>
        </div>
        </div>

        {aboutSection}

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

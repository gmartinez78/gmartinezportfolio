"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, BrainCircuit, Eye, FolderGit2, GitCommitHorizontal, GitFork, GitPullRequest, LayoutTemplate, Lightbulb, Mic, MousePointer2, Star, Target, Wand2 } from "lucide-react";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { ChecklistStatusCard } from "./components/checklist-status-card";
import { ContactFormCard } from "./components/contact-form-card";
import { HighlightCalloutCard } from "./components/highlight-callout-card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { ProjectTeaserCard } from "./components/project-teaser-card";
import { appendLockedNayyaPlaceholder } from "./lib/cms/locked-placeholder";
import { useLanguage } from "./lib/i18n/language-context";
import { useTranslate } from "./lib/i18n/use-translate";
import {
  isHiddenCaseStudySlug,
  resolveHomeCardId,
  resolveProjectListCardImage,
  resolveProjectHref,
  resolveToolIcon,
  resolveTrustedLogo,
  usePublicCaseStudies,
  usePublicSiteContent,
} from "./lib/cms/public";
import { withBasePath } from "./lib/site";

const TOOL_SHOWCASE_ICONS = [
  { label: "Jira", className: "absolute top-[5%] left-[2%] w-[15px] md:w-[30px]", duration: "5.6s", delay: "0.1s" },
  { label: "React", className: "absolute top-[2%] left-[12%] w-[16px] md:w-[32px]", duration: "6.2s", delay: "0.7s" },
  { label: "Miro", className: "absolute top-[25%] left-[15%] w-[20px] md:w-[40px]", duration: "5.8s", delay: "1.1s" },
  { label: "ChatGPT", className: "absolute top-[8%] left-[40%] w-[35px] md:w-[70px]", duration: "6.5s", delay: "0.4s" },
  { label: "HTML", className: "absolute top-[1%] left-[63%] w-[15px] md:w-[30px]", duration: "5.4s", delay: "1.5s" },
  { label: "Confluence", className: "absolute top-[19%] left-[69%] w-[19px] md:w-[38px]", duration: "6.1s", delay: "0.9s" },
  { label: "Notion", className: "absolute top-[15%] left-[82%] w-[20px] md:w-[40px]", duration: "5.9s", delay: "1.3s" },
  { label: "Claude", className: "absolute top-0 left-[90%] w-[12px] md:w-[25px]", duration: "6.4s", delay: "0.2s" },
  { label: "Figma", className: "absolute top-[45%] left-[19%] w-[22px] md:w-[44px]", duration: "5.7s", delay: "0.8s" },
  { label: "Angular", className: "absolute top-[35%] left-[85%] w-[19px] md:w-[38px]", duration: "6.3s", delay: "1.2s" },
  { label: "VS Code", className: "absolute top-[30%] left-[95%] w-[22px] md:w-[44px]", duration: "5.5s", delay: "0.6s" },
  { label: "Copilot", className: "absolute top-[75%] left-[93%] w-[15px] md:w-[30px]", duration: "6.6s", delay: "1.6s" },
  { label: "Maze", className: "absolute top-[80%] left-[10%] w-[15px] md:w-[30px]", duration: "6.0s", delay: "1.0s" },
] as const;

const PROJECT_BACKGROUNDS: Record<string, string> = {
  reversetech: "linear-gradient(180deg, #eef4fb 0%, #eef4fb 100%)",
  "benefits-enrollment": "radial-gradient(ellipse at 82% 50%, #b7daf1 11%, #e9f3fb 64%, #edf5fb 98%)",
  "nayya-ai-benefits": "radial-gradient(ellipse at 20% 50%, #cfe9f7 0%, #f0f7ff 72%)",
  "flock-accessibility-system": "radial-gradient(ellipse at 80% 20%, #c8f0e0 0%, #edf5fb 70%)",
  "i9-everify-integration": "radial-gradient(ellipse at 50% 80%, #d9e7f5 0%, #f3f8fc 72%)",
};

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

const HERO_ASSISTANT_SUGGESTIONS = [
  "Show me AI projects",
  "Which case studies include UX research?",
  "What design systems work is on this site?",
  "Where can I see resume details?",
];

const MAIN_VISIBLE_CASE_STUDY_SLUGS = new Set(["reversetech"]);

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
      id: "skills-tools",
      title: siteContent.home.tools_section.headline,
      snippet: siteContent.home.tools_section.description,
      href: "#skills",
      sectionId: "skills" as const,
      audience: ["recruiter", "client"] as HeroVisitorType[],
      content: [
        siteContent.home.tools_section.headline,
        siteContent.home.tools_section.description,
        siteContent.home.tools_section.row_1.join(" "),
        siteContent.home.tools_section.row_2.join(" "),
        siteContent.resume.title,
        siteContent.resume.bio,
        siteContent.resume.tools.join(" "),
        resumeSkills.join(" "),
        experienceText,
      ].join(" "),
    },
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
  const [githubActivity, setGithubActivity] = useState<GitHubActivityItem[]>([]);
  const [githubUsername, setGithubUsername] = useState("gmartinez78");
  const [heroVisitorType, setHeroVisitorType] = useState<HeroVisitorType | null>(null);
  const [heroAssistantQuery, setHeroAssistantQuery] = useState("");
  const [heroAssistantResponse, setHeroAssistantResponse] = useState(() => translate("home.assistantDefaultResponse"));
  const [heroAssistantResults, setHeroAssistantResults] = useState<HeroAssistantResult["items"]>([]);
  const [highlightedProjectIds, setHighlightedProjectIds] = useState<string[]>([]);
  const [activeProjectCardId, setActiveProjectCardId] = useState<string | null>(null);
  const [ctaForm, setCtaForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [ctaToast, setCtaToast] = useState<string | null>(null);
  const [ctaSubmitting, setCtaSubmitting] = useState(false);
  const [ctaErrors, setCtaErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const { siteContent } = usePublicSiteContent();
  const { caseStudies } = usePublicCaseStudies();
  const hero = siteContent.home.hero;
  const socialProofLogos = siteContent.home.trusted_by.clients.map((client) => ({
    src: resolveTrustedLogo(client.name, client.logo),
    alt: client.name,
    h: client.name === "Skill" ? 59 : client.name === "Hakuna" ? 30 : client.name === "Paychex" ? 51 : client.name === "Nayya" ? 48 : client.name === "Paramount+" ? 24 : client.name === "IBX" ? 34 : 41,
    w: client.name === "Skill" ? 107 : client.name === "Hakuna" ? 96 : client.name === "Paychex" ? 142 : client.name === "Nayya" ? 127 : client.name === "Paramount+" ? 94 : client.name === "IBX" ? 48 : 57,
  }));
  const logoCarousel = [...socialProofLogos, ...socialProofLogos];
  const methodologyChips = hero.methodology_chips.length
    ? hero.methodology_chips
    : ["AI product design", "UX research", "Enterprise SaaS", "Design systems"];
  const allProjects = appendLockedNayyaPlaceholder(caseStudies ?? []);
  const homeProjects = allProjects
    .filter((study) => study?.slug && isVisibleOnMain(study.slug))
    .sort(compareCaseStudyPriority)
    .map((study) => ({
      slug: study.slug,
      cardId: resolveHomeCardId(study.slug),
      title: study.title,
      description: study.tagline ?? "",
      company: study.company ?? "",
      year: study.year ?? 0,
      image: resolveProjectListCardImage(study.slug, study.images?.cover || study.images?.hero || ""),
      background: PROJECT_BACKGROUNDS[study.slug] ?? "radial-gradient(ellipse at 20% 50%, #d4e8ff 0%, #edf5fb 70%)",
      href: resolveProjectHref(study),
      tags: study.tags.slice(0, 2),
      password: study.password,
      cta: study.external_link ? translate("home.viewProject") : translate("home.viewCaseStudy"),
    }));
  const heroPills = [
    {
      title: translate("home.heroPill.aiProductTitle"),
      subtitle: translate("home.heroPill.aiProductSubtitle"),
      href: withBasePath("/projects?filter=AI%20Product"),
      icon: BrainCircuit,
      accentClassName: "bg-[#FFC437] text-[#0e2951]",
    },
    {
      title: translate("home.heroPill.designSystemsTitle"),
      subtitle: translate("home.heroPill.designSystemsSubtitle"),
      href: withBasePath("/projects?filter=Design%20Systems"),
      icon: LayoutTemplate,
      accentClassName: "bg-[#F78BE3] text-[#0e2951]",
    },
    {
      title: translate("home.heroPill.uxResearchTitle"),
      subtitle: translate("home.heroPill.uxResearchSubtitle"),
      href: withBasePath("/projects?filter=UX%20Research"),
      icon: Mic,
      accentClassName: "bg-[#25D7C4] text-[#0e2951]",
    },
    {
      title: translate("home.heroPill.enterpriseSaasTitle"),
      subtitle: translate("home.heroPill.enterpriseSaasSubtitle"),
      href: withBasePath("/projects?topic=SaaS"),
      icon: FolderGit2,
      accentClassName: "bg-[#4E8BFF] text-white",
    },
  ];
  const heroPhaseStyles = useMemo(() => HERO_PHASE_STYLES[heroPhase], [heroPhase]);

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
      setHighlightedProjectIds([]);
      return;
    }

    try {
      const result = resolveHeroAssistantQuery(query, caseStudies, siteContent, heroVisitorType, translate);
      setHeroAssistantResponse(result.response);
      setHeroAssistantResults(result.items);

      const projectMatches = result.items
        .map((item) => item.cardId)
        .filter((value): value is string => Boolean(value));
      setHighlightedProjectIds(projectMatches);

      const firstSection = result.items.find((item) => item.sectionId)?.sectionId;
      scrollToSection(firstSection);
    } catch {
      setHeroAssistantResponse(translate("home.assistantSearchError"));
      setHeroAssistantResults([]);
      setHighlightedProjectIds([]);
    }
  }

  async function handleCtaSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};

    if (!ctaForm.name.trim()) {
      nextErrors.name = translate("contactForm.errorName");
    }

    if (!ctaForm.email.trim()) {
      nextErrors.email = translate("contactForm.errorEmail");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctaForm.email.trim())) {
      nextErrors.email = translate("contactForm.errorEmailInvalid");
    }

    if (!ctaForm.message.trim()) {
      nextErrors.message = translate("contactForm.errorMessage");
    } else if (ctaForm.message.trim().length < 12) {
      nextErrors.message = translate("contactForm.errorMessageDetail");
    }

    setCtaErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setCtaSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/greddysmartinez5@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: ctaForm.name.trim(),
          email: ctaForm.email.trim(),
          message: ctaForm.message.trim(),
          website: "https://www.greddys.com",
          _subject: `Portfolio inquiry from ${ctaForm.name.trim()}`,
          _template: "table",
          _captcha: "false",
          _next: "https://www.greddys.com",
        }),
      });

      if (!response.ok) {
        throw new Error("Email request failed");
      }

      setCtaToast(translate("contactForm.sentSuccess"));
      setCtaForm({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setCtaToast(translate("contactForm.errorSendFailed"));
    } finally {
      setCtaSubmitting(false);
    }
  }

  function handleHeroVisitorTypeSelect(type: HeroVisitorType) {
    setHeroVisitorType(type);
    setHighlightedProjectIds(type === "recruiter" ? homeProjects.slice(0, 2).map((project) => project.cardId) : []);
    setHeroAssistantResults([]);
    setHeroAssistantQuery("");
    setHeroAssistantResponse(
      type === "recruiter"
        ? "Recruiter mode on. I highlighted two relevant case studies below. Ask about shipped work, AI projects, design systems, UX research, resume details, or GitHub activity on this website."
        : "Client mode on. Ask about projects, capabilities, tools, contact details, UX research, or design systems on this website.",
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
    if (!homeProjects.length) {
      setActiveProjectCardId(null);
      return;
    }

    setActiveProjectCardId((current) =>
      current && homeProjects.some((project) => project.cardId === current) ? current : homeProjects[0]?.cardId ?? null,
    );
  }, [homeProjects]);

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
    if (!ctaToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCtaToast(null);
    }, 3200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [ctaToast]);

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
    <section key="work" id="projects" className="bg-white pt-12 pb-24 px-6 md:px-10 xl:px-20">
      <div className="mx-auto flex w-full flex-col items-center gap-12">
        <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3">
          {homeProjects.map((project) => (
            (() => {
              const isActiveCard =
                activeProjectCardId === project.cardId ||
                (highlightedProjectIds.length > 0 && highlightedProjectIds.includes(project.cardId));

              return (
                <ProjectTeaserCard
                  key={project.title}
                  id={project.cardId}
                  href={project.href}
                  dataCardId={project.cardId}
                  onMouseEnter={() => setActiveProjectCardId(project.cardId)}
                  onFocus={() => setActiveProjectCardId(project.cardId)}
                  title={project.title}
                  company={project.company}
                  year={project.year}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  imageAlt={`${project.title} case study preview for ${project.company}`}
                  background={project.background}
                  ctaLabel={project.cta}
                  locked={Boolean(project.password)}
                  variant="grid"
                  inactive={Boolean(highlightedProjectIds.length && !highlightedProjectIds.includes(project.cardId))}
                  active={isActiveCard}
                />
              );
            })()
          ))}
        </div>
      </div>
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
            <h2 className="font-inter text-[18px] leading-[1.15] text-[#0e2951] md:text-[26px]">
              Business thinking across product and design.
            </h2>
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

            <h3 className="max-w-[320px] font-inter text-[26px] leading-[1.15] text-[#0e2951]">
              {translate("home.a11yCardTitle")}
            </h3>
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
              <h3 className="max-w-[320px] font-inter text-[26px] leading-[1.15] text-[#0e2951]">
                {translate("home.designSystemsCardTitle")}
              </h3>
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

  const toolsSection = (
    <section
      key="tools"
      id="skills"
      className="isolate w-full overflow-clip bg-white px-4 pb-10 pt-36 md:px-8"
    >
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6">
        <div className="pointer-events-none absolute bottom-[44px] h-[248px] w-[629px] max-w-none select-none md:bottom-[-12px] md:h-[496px] md:w-[1257px]">
          <div className="relative h-full w-full">
            {TOOL_SHOWCASE_ICONS.map((tool) => (
              <div
                key={`${tool.label}-${tool.className}`}
                className={tool.className}
                style={{ animation: `tool-float ${tool.duration} ease-in-out ${tool.delay} infinite` }}
              >
                <Image
                  src={resolveToolIcon(tool.label)}
                  alt={tool.label}
                  width={64}
                  height={64}
                  draggable={false}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <p className="text-center text-[13px] font-semibold uppercase tracking-[0.3em] text-[#1183D0]">
            Experience & Skills
          </p>
          <h2 className="max-w-[320px] whitespace-pre-line text-center font-inter text-[30px] leading-[1.05] text-[#0e2951] md:max-w-[620px] md:text-[44px]">
            {siteContent.home.tools_section.headline.replace(" Work With", "\nWork With")}
          </h2>
        </div>
        <p className="relative z-10 mb-4 max-w-[320px] text-center text-[14px] leading-[1.8] text-[#5c7792] md:max-w-[560px] md:text-[17px]">
          {siteContent.home.tools_section.description}
        </p>
        <Button asChild variant="secondary" className="relative z-10 h-12 rounded-xl px-6 text-base">
          <Link href={withBasePath(siteContent.home.tools_section.cta_href)}>
            {siteContent.home.tools_section.cta_label.replace("→", "").trim()}
          </Link>
        </Button>
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
    <section
      key="cta"
      className="px-6 py-[80px] md:px-16 xl:px-30"
      style={{
        backgroundImage: `linear-gradient(180deg, #ffffff 0%, #ffffff 18%, rgba(255,255,255,0) 42%), ${heroPhaseStyles.background}`,
      }}
    >
      <div className="mx-auto grid max-w-[1180px] gap-8 text-[#0e2951] lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="relative px-2 py-2 md:px-4 md:py-4">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#1183D0]/14 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#ffcf8c]/10 blur-3xl" />
            <div className="relative">
              <h2 className="max-w-[620px] font-inter text-[42px] font-normal leading-[1.02] text-[#0e2951] md:text-[58px]">
                Let’s work together, or explore my projects first.
              </h2>
              <p className="mt-5 max-w-[620px] text-[16px] leading-[1.8] text-[#5c7792]">
                Browse case studies, share what your team is working on, or reach out directly to start a conversation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-[14px] text-[#4f6486]">
                <a href="mailto:greddysmartinez5@gmail.com" className="underline decoration-[#b8cadf] underline-offset-4 hover:text-[#0e2951]">
                  Email
                </a>
                <a
                  href="https://linkedin.com/in/greddysmartinez"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[#b8cadf] underline-offset-4 hover:text-[#0e2951]"
                >
                  LinkedIn ↗
                </a>
                <Link href={withBasePath("/projects")} className="underline decoration-[#b8cadf] underline-offset-4 hover:text-[#0e2951]">
                  {translate("home.caseStudiesLink")}
                </Link>
                <Link href={withBasePath("/social-media-diagnostic")} className="underline decoration-[#b8cadf] underline-offset-4 hover:text-[#0e2951]">
                  Social media diagnostic
                </Link>
              </div>
            </div>
          </div>

          <ContactFormCard
            title={translate("contactPage.sendAMessage")}
            submitLabel={siteContent.home.stat_banner.cta_label.replace("→", "").trim()}
            onSubmit={handleCtaSubmit}
            values={ctaForm}
            errors={ctaErrors}
            submitting={ctaSubmitting}
            showSubject={false}
            helperText="Tell me about the product, the team, or the design challenge. I’ll follow up from the contact page without the extra friction."
            className="rounded-[32px] border-[#e4ebf3] bg-[rgba(248,251,255,0.88)] shadow-[0_18px_44px_rgba(60,62,63,0.06)] backdrop-blur-sm"
            contentClassName="px-8 py-10 md:px-12 md:py-14"
            submitClassName="h-12 rounded-full border border-[#c8d7ea] bg-white px-6 text-[var(--ui-color-text-strong)] hover:bg-[var(--ui-color-text-strong)] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
            onNameChange={(value) => {
              setCtaForm((current) => ({ ...current, name: value }));
              setCtaErrors((current) => ({ ...current, name: undefined }));
            }}
            onEmailChange={(value) => {
              setCtaForm((current) => ({ ...current, email: value }));
              setCtaErrors((current) => ({ ...current, email: undefined }));
            }}
            onMessageChange={(value) => {
              setCtaForm((current) => ({ ...current, message: value }));
              setCtaErrors((current) => ({ ...current, message: undefined }));
            }}
          />
      </div>
    </section>
  );

  const contentSections = [toolsSection, ctaSection, githubProofSection];

  return (
    <main className="bg-[#F0F7FF] text-[#3c3e3f] overflow-x-hidden">
      {ctaToast ? (
        <div className="fixed right-4 top-24 z-[80] max-w-[320px] rounded-[18px] border border-white/60 bg-[linear-gradient(135deg,rgba(247,241,249,0.96)_0%,rgba(243,247,255,0.94)_45%,rgba(255,247,239,0.92)_100%)] px-4 py-3 text-sm font-medium text-[#0e2951] shadow-[0_18px_40px_rgba(31,53,94,0.16)] backdrop-blur-xl">
          {ctaToast}
        </div>
      ) : null}
      <SiteHeader variant="transparent" />

      {/* ── Hero ── */}
      <section className="bg-white">
        <div className="relative isolate overflow-hidden bg-[#fff8f3] px-6 pb-10 pt-[8.25rem] sm:px-10 lg:px-16 lg:pb-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(255,255,255,0.95),transparent_25%),radial-gradient(circle_at_72%_58%,rgba(255,212,193,0.38),transparent_28%),linear-gradient(112deg,#fffaf5_0%,#fff3ea_54%,#fff9f6_100%)]" />
          <div className="pointer-events-none absolute left-[47%] top-[18%] hidden h-24 w-36 -rotate-[28deg] lg:block">
            <span className="absolute left-0 top-7 h-[3px] w-[108px] rounded-full bg-[#1183d0]" />
            <span className="absolute left-0 top-[19px] h-[3px] w-11 rotate-[-44deg] rounded-full bg-[#1183d0]" />
            <span className="absolute left-[97px] top-[20px] h-[3px] w-11 rotate-[44deg] rounded-full bg-[#1183d0]" />
          </div>
          <div className="pointer-events-none absolute right-[7%] top-[16%] hidden h-14 w-14 rotate-12 lg:block">
            <span className="absolute left-6 top-0 h-full w-[3px] rotate-45 rounded-full bg-[#f06d96]" />
            <span className="absolute left-6 top-0 h-full w-[3px] -rotate-45 rounded-full bg-[#f06d96]" />
            <span className="absolute left-0 top-6 h-[3px] w-full rotate-45 rounded-full bg-[#f06d96]" />
            <span className="absolute left-0 top-6 h-[3px] w-full -rotate-45 rounded-full bg-[#f06d96]" />
          </div>
          <div className="pointer-events-none absolute bottom-[11%] right-[3%] hidden h-20 w-20 lg:block">
            <span className="absolute left-[31px] top-0 h-12 w-9 rotate-[-36deg] rounded-t-full border-[3px] border-b-0 border-[#1183d0]" />
            <span className="absolute left-[13px] top-3 h-12 w-9 rotate-[36deg] rounded-t-full border-[3px] border-b-0 border-[#1183d0]" />
          </div>
          <svg className="pointer-events-none absolute left-[1.5%] top-[36%] hidden h-16 w-16 -rotate-12 lg:block" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path d="M32 6 37 25 57 18 43 33 59 43 39 41 36 60 28 42 10 53 22 35 5 26 26 27Z" stroke="#16A7DF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="pointer-events-none absolute bottom-[18%] left-[49%] hidden h-20 w-24 rotate-[-12deg] lg:block" viewBox="0 0 96 80" fill="none" aria-hidden="true">
            <path d="M14 56 22 24 40 42 49 13 65 39 80 24 76 58 14 56Z" stroke="#F0A51B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 62c18 5 39 5 58-1" stroke="#F0A51B" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <svg className="pointer-events-none absolute left-[48%] top-[52%] hidden h-24 w-28 rotate-[14deg] lg:block" viewBox="0 0 112 96" fill="none" aria-hidden="true">
            <path d="M15 18c24 2 47 14 59 35 8 13 7 25-3 35" stroke="#16A7DF" strokeWidth="3.5" strokeLinecap="round" />
            <path d="m58 72 13 17 16-14" stroke="#16A7DF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[45%] bg-[linear-gradient(180deg,rgba(247,224,211,0)_0%,rgba(242,218,202,0.7)_26%,#e8cdbb_100%)]" />
          <div className="relative mx-auto grid min-h-[570px] max-w-[1280px] items-center gap-10 lg:min-h-[650px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-4">
            <div className="relative z-10 max-w-[800px] pb-4 lg:-translate-x-12 lg:pb-12 xl:-translate-x-20">
              <div className="relative mb-7 inline-flex -rotate-[5deg] bg-[#39b8e7] px-5 py-2.5 text-[11px] font-medium tracking-[0.04em] text-[#163143] shadow-[0_5px_10px_rgba(18,111,148,0.16)] sm:px-7 sm:text-sm">
                <span className="absolute inset-x-1 top-0 h-px bg-white/35" />
                designer <span className="px-2 text-[#f8eff0]">·</span> I solve problems <span className="px-2 text-[#f8eff0]">·</span> I organize ideas
              </div>
              <h1 className="font-serif-display text-[clamp(2.35rem,4.55vw,4.7rem)] font-medium leading-[0.86] tracking-[-0.075em] text-[#141114]">
                I MAKE
                <span className="mt-[0.16em] block text-[#e7688f]">PRODUCTS</span>
                <span className="mt-[0.16em] block">WORK <em className="font-serif-display font-medium text-[#e7688f]">&amp; WOW.</em></span>
              </h1>
              <div className="mt-9 max-w-[610px]">
                <div className="mb-2 h-1.5 w-36 -rotate-2 rounded-full bg-[#25aee1]" />
                <p className="text-[13px] font-bold uppercase leading-relaxed tracking-[0.04em] text-[#159bd0] sm:text-sm">
                  Websites, social media, experiences...
                </p>
                <p className="mt-1 font-serif-display text-base italic leading-relaxed text-[#3d3438] sm:text-lg">I bring order to chaos.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#projects" className="inline-flex items-center justify-center rounded-full bg-[#ee668a] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_12px_24px_rgba(238,102,138,0.25)] transition hover:-translate-y-0.5 hover:bg-[#dc5278]">
                  Explore my work
                </Link>
                <Link href={withBasePath("/contact")} className="inline-flex items-center justify-center rounded-full border border-[#31252a]/20 bg-white/60 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-[#31252a] transition hover:-translate-y-0.5 hover:bg-white">
                  Let&apos;s talk
                </Link>
              </div>
            </div>
            <div className="relative mx-auto h-[330px] w-full max-w-[430px] self-end sm:h-[460px] lg:h-[650px] lg:max-w-[510px]">
              <div className="absolute bottom-0 left-[-6%] right-[-15%] top-[54px] z-30 lg:translate-x-[20%]">
                <Image src="/images/home-hero-portrait-white.png" alt="Greddys Martinez seated at a laptop" fill priority sizes="(max-width: 1024px) 470px, 590px" className="object-contain object-bottom" />
              </div>
              <div className="absolute right-[-11%] top-[3%] z-20 hidden w-[184px] bg-[#fffdf9] px-4 pb-4 pt-6 text-[#2a2528] shadow-[0_18px_34px_rgba(84,53,58,0.18)] sm:block lg:w-[205px] animate-[hero-paper-float_5.8s_ease-in-out_infinite]" style={{ ["--paper-rotate" as string]: "5deg" }}>
                <span className="absolute -top-3 left-1/2 h-7 w-[106px] -translate-x-1/2 -rotate-[2deg] bg-[#ed7195]/90" />
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e05f88]">How I can help</p>
                <ul className="space-y-3 text-[13px] font-medium leading-tight lg:text-sm">
                  <li className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#2eb4e7] text-[11px]">▣</span> Website design</li>
                  <li className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#f181a4] text-[11px]">♡</span> Social media</li>
                  <li className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#f7b93b] text-[11px]">✎</span> Brand identity</li>
                  <li className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#2eb4e7] text-[11px]">▯</span> User experience</li>
                  <li className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#f181a4] text-[11px]">✦</span> Creative direction</li>
                </ul>
              </div>
              <div className="absolute -right-[16%] top-[29%] z-20 hidden w-[210px] bg-[#32b9e8] px-5 py-6 text-[#102a36] shadow-[0_18px_34px_rgba(31,122,157,0.25)] sm:block lg:w-[232px] animate-[hero-paper-float_6.6s_ease-in-out_0.8s_infinite]" style={{ ["--paper-rotate" as string]: "-4deg" }}>
                <span className="absolute right-5 top-4 text-xl text-white/80">⌇</span>
                <p className="font-serif-display text-[23px] italic leading-[1.1] lg:text-[27px]">You have the idea.</p>
                <p className="mt-2 font-serif-display text-[23px] italic leading-[1.1] lg:text-[27px]">I make it work.</p>
                <div className="mt-5 h-[3px] w-24 bg-[#087da9]" />
                <p className="mt-4 text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em]">Beautiful, useful, and ready for real people.</p>
              </div>
              <div className="absolute -right-[15%] bottom-[14%] z-20 hidden w-[205px] rounded-[24px] bg-[#fffdf9] p-4 text-[#261f21] shadow-[0_18px_34px_rgba(84,53,58,0.22)] sm:block lg:w-[230px] animate-[hero-paper-float_6.6s_ease-in-out_0.8s_infinite]" style={{ ["--paper-rotate" as string]: "-4deg" }}>
                <div className="flex items-center gap-2 text-[9px] font-bold"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#f8d6ca] text-[#e06b91]">G</span><span>Studio Greddys<br /><span className="font-normal text-[#766568]">@randomlygreddys</span></span><span className="ml-auto text-base">•••</span></div>
                <p className="mt-4 text-xs">New brand, new era. <span className="text-[#eaa223]">✦</span></p>
                <div className="mt-3 grid grid-cols-[1fr_0.72fr] gap-2">
                  <p className="font-serif-display text-[26px] font-semibold leading-[0.9]">DESIGN<br />HAS<br />POWER.</p>
                  <div className="rounded-[10px] bg-[radial-gradient(circle_at_65%_25%,#ffd37b_0_7%,transparent_8%),radial-gradient(circle_at_44%_40%,#f5a54e_0_17%,transparent_18%),linear-gradient(135deg,#f9c3a5,#c76c38)]" />
                </div>
                <div className="mt-3 flex items-center gap-3 text-[10px]"><span className="text-[#e23f46]">♥</span> 128 <span className="text-base">○</span> 12 <span>↻ 8</span></div>
              </div>
              <div className="absolute -right-[18%] -bottom-[5%] z-20 hidden w-[210px] overflow-hidden rounded-[8px] bg-[#96e4d8] text-[#102a36] shadow-[0_18px_34px_rgba(31,122,157,0.25)] sm:block lg:w-[235px] animate-[hero-paper-float_5.8s_ease-in-out_infinite]" style={{ ["--paper-rotate" as string]: "4deg" }}>
                <div className="flex h-6 items-center justify-between bg-[#11b9a7] px-3 text-[7px] font-bold"><span>◌ ◌ ◌</span><span>SHOP · ABOUT · JOURNAL · CART (0)</span></div>
                <div className="p-4"><p className="font-serif-display text-[28px] leading-[0.88]">Glow<br />from<br />within.</p><button className="mt-3 bg-[#172423] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white">Buy</button></div>
              </div>
              <div className="absolute left-[-31%] top-[18%] z-20 hidden w-[150px] scale-[0.82] bg-[#f6ddea] px-5 pb-5 pt-8 text-[#3c3035] shadow-[0_16px_28px_rgba(85,53,65,0.15)] lg:block animate-[hero-paper-float_6.6s_ease-in-out_0.8s_infinite]" style={{ ["--paper-rotate" as string]: "-8deg" }}>
                <span className="absolute -top-3 left-8 h-7 w-[82px] -rotate-[4deg] bg-[#46bfea]/85" />
                <span className="absolute left-5 top-7 text-xl">✧</span>
                <p className="mt-4 font-serif-display text-lg italic leading-snug">“She understood my vision and turned it into a brand that feels like me.”</p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em]">— Maria</p>
              </div>
              <div className="absolute bottom-5 -left-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6b4560] shadow-[0_10px_22px_rgba(89,55,63,0.12)] backdrop-blur sm:left-2">Designing for people</div>
            </div>
          </div>
          <div className="relative z-10 mx-auto mt-8 grid w-full max-w-[1180px] gap-4 px-6 text-left md:mt-10 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:px-16">
            {heroPills.map((pill) => (
              <Link
                key={pill.title}
                href={pill.href}
                className="group flex min-h-[92px] items-center gap-4 rounded-[22px] border border-[#f1ece8] bg-white px-4 py-4 shadow-[0_12px_24px_rgba(60,62,63,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(60,62,63,0.08)]"
              >
                <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${pill.accentClassName}`}>
                  <pill.icon className="h-5 w-5" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[15px] font-semibold leading-tight text-[#16191d]">
                    {pill.title}
                  </span>
                  <span className="mt-1 text-[12px] leading-relaxed text-[#71717f]">
                    {pill.subtitle}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Social Proof Bar */}
        <div>
          <div className="flex min-h-[160px] flex-col items-center gap-6 px-6 py-10 text-center md:px-10 lg:px-20">
            <div className="flex shrink-0 items-center justify-center">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#5c7792]">
                {siteContent.home.trusted_by.label}
              </span>
            </div>
            <div className="relative w-full max-w-[1200px] overflow-hidden md:py-2">
              <div className="flex w-max animate-[logo-marquee_22s_linear_infinite] items-center gap-14 pr-14 hover:[animation-play-state:paused]">
                {logoCarousel.map((logo, index) => (
                  <Image
                    key={`${logo.alt}-${index}`}
                    src={logo.src}
                    alt={index < socialProofLogos.length ? logo.alt : ""}
                    width={logo.w}
                    height={logo.h}
                    aria-hidden={index >= socialProofLogos.length}
                    className={`w-auto shrink-0 object-contain opacity-80 transition-all hover:opacity-100 ${logo.alt === "Hakuna" ? "max-h-[28px]" : logo.alt === "Paramount+" ? "max-h-[22px]" : "max-h-[46px]"}`}
                    style={{
                      filter: "brightness(0) saturate(100%) invert(42%) sepia(14%) saturate(954%) hue-rotate(170deg) brightness(94%) contrast(88%)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {recentWorkSection}
      </section>

      {contentSections}
      <SiteFooter />
    </main>
  );
}

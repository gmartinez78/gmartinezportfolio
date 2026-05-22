"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, BrainCircuit, Eye, FolderGit2, GitCommitHorizontal, GitFork, GitPullRequest, LayoutTemplate, Lightbulb, Mic, MousePointer2, Star, Target, Wand2 } from "lucide-react";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { TypewriterBanner } from "./components/typewriter-banner";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { appendLockedNayyaPlaceholder } from "./lib/cms/locked-placeholder";
import {
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

const HERO_STARS = [
  { left: "8%", top: "18%", size: 4, duration: "5.8s", delay: "0.2s" },
  { left: "16%", top: "30%", size: 3, duration: "4.9s", delay: "1.1s" },
  { left: "24%", top: "12%", size: 2, duration: "6.4s", delay: "2.1s" },
  { left: "33%", top: "24%", size: 4, duration: "5.4s", delay: "0.8s" },
  { left: "41%", top: "10%", size: 3, duration: "6.1s", delay: "1.9s" },
  { left: "52%", top: "18%", size: 4, duration: "5.1s", delay: "1.3s" },
  { left: "61%", top: "28%", size: 2, duration: "6.6s", delay: "0.5s" },
  { left: "70%", top: "14%", size: 3, duration: "5.7s", delay: "2.2s" },
  { left: "78%", top: "22%", size: 4, duration: "4.8s", delay: "0.4s" },
  { left: "87%", top: "16%", size: 2, duration: "6.2s", delay: "1.6s" },
  { left: "13%", top: "48%", size: 2, duration: "5.9s", delay: "2.8s" },
  { left: "29%", top: "56%", size: 3, duration: "5.2s", delay: "1.4s" },
  { left: "47%", top: "46%", size: 2, duration: "6.8s", delay: "0.6s" },
  { left: "66%", top: "52%", size: 3, duration: "5.5s", delay: "2.4s" },
  { left: "82%", top: "44%", size: 2, duration: "6.3s", delay: "1.7s" },
];

const HERO_UI_ORBS = [
  { left: "9%", top: "28%", width: 132, height: 132, rotate: -18, depth: -18, fill: "linear-gradient(135deg, rgba(86,72,228,0.92) 0%, rgba(60,72,221,0.74) 100%)" },
  { left: "77%", top: "22%", width: 88, height: 88, rotate: 12, depth: -12, fill: "linear-gradient(135deg, rgba(255,178,48,0.96) 0%, rgba(255,153,0,0.74) 100%)" },
  { left: "73%", top: "54%", width: 154, height: 110, rotate: -14, depth: -22, fill: "linear-gradient(135deg, rgba(20,209,140,0.88) 0%, rgba(26,148,116,0.7) 100%)" },
  { left: "21%", top: "64%", width: 160, height: 118, rotate: -22, depth: -28, fill: "linear-gradient(135deg, rgba(72,79,248,0.88) 0%, rgba(59,73,208,0.68) 100%)" },
];

const PROJECT_BACKGROUNDS: Record<string, string> = {
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

function resolveHeroAssistantQuery(
  rawQuery: string,
  caseStudies: ReturnType<typeof usePublicCaseStudies>["caseStudies"],
  siteContent: ReturnType<typeof usePublicSiteContent>["siteContent"],
  viewer: HeroVisitorType | null,
): HeroAssistantResult {
  const query = rawQuery.trim();
  if (!query) {
    return {
      response: "Ask about projects, case studies, skills, resume, contact details, or GitHub activity on this website.",
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
      .filter((study) => study.status === "published")
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
      title: "Resume",
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
      title: "Contact",
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
      title: "GitHub Activity",
      snippet: "Recent public GitHub work and repository activity.",
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
      response: "I can only provide information already available on this website. I couldn't find that here.",
      items: [],
    };
  }

  const projectCount = rankedItems.filter((item) => item.sectionId === "projects").length;
  return {
    response:
      projectCount > 1
        ? `I found ${projectCount} matching projects and a few related sections on this website.`
        : projectCount === 1
          ? "I found 1 matching project on this website and a few relevant places to continue."
          : `I found relevant information on this website for "${query}".`,
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

function getParallaxTransform(x: number, y: number, depth: number, rotate = 0) {
  return `translate3d(${x * depth}px, ${y * depth}px, 0) rotate(${rotate}deg)`;
}

function HeroPrototypeOverlay({
  heroPointer,
}: {
  heroPointer: { x: number; y: number };
}) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      <div
        className="absolute right-[8%] top-[16%] h-[76px] w-[76px] rounded-[20px] border border-dashed border-white/22"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, 0),
          transition: "transform 180ms ease-out",
        }}
      />
      <div
        className="absolute right-[24%] top-[35%] h-px w-[18%] border-t border-dashed border-white/20"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -9, 0),
          transition: "transform 180ms ease-out",
        }}
      />
      <div
        className="absolute right-[38%] top-[27%] h-px w-[16%] border-t border-dashed border-white/18"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -9, 0),
          transition: "transform 180ms ease-out",
        }}
      />
      <div
        className="absolute right-[40%] top-[19%] h-8 w-8 border-l border-t border-white/24"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -7, 0),
          transition: "transform 180ms ease-out",
        }}
      />
      <div
        className="absolute right-[24%] top-[58%] h-9 w-9 border-r border-b border-white/20"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -7, 0),
          transition: "transform 180ms ease-out",
        }}
      />
      <div
        className="absolute right-[10%] bottom-[14%] flex items-center gap-2 rounded-full border border-white/24 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#5f708f]"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, 0),
          transition: "transform 180ms ease-out",
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#13bf85]/65" />
        handoff
      </div>
      <div
        className="absolute inset-x-[30%] top-[27%] h-px bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.32),rgba(255,255,255,0))]"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -6, 0),
          transition: "transform 180ms ease-out",
        }}
      />
      <div
        className="absolute inset-x-[34%] bottom-[26%] h-px bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.24),rgba(255,255,255,0))]"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -6, 0),
          transition: "transform 180ms ease-out",
        }}
      />
    </div>
  );
}

export default function PortfolioPage() {
  const heroPhase: HeroPhase = "day";
  const [githubActivity, setGithubActivity] = useState<GitHubActivityItem[]>([]);
  const [githubUsername, setGithubUsername] = useState("gmartinez78");
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 });
  const [heroVisitorType, setHeroVisitorType] = useState<HeroVisitorType | null>(null);
  const [heroAssistantQuery, setHeroAssistantQuery] = useState("");
  const [heroAssistantResponse, setHeroAssistantResponse] = useState(
    "Ask about projects, UX research, design systems, resume details, contact info, or GitHub activity on this website.",
  );
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
  const projectsSliderRef = useRef<HTMLDivElement | null>(null);
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
    .filter((study) => study?.slug)
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
      cta: study.external_link ? "View project" : "View case study",
    }));
  const heroRoles = [
    "designing with AI.",
    "a senior designer.",
    "research that ships.",
    "enterprise UX.",
    "your next UX hire.",
  ];
  const heroPills = [
    {
      title: "AI Product Design",
      subtitle: "from prompt to shipped UX",
      href: withBasePath("/projects?filter=AI%20Product"),
      icon: BrainCircuit,
      accentClassName: "bg-[#FFC437] text-[#0e2951]",
    },
    {
      title: "Design Systems",
      subtitle: "patterns built to scale",
      href: withBasePath("/projects?filter=Design%20Systems"),
      icon: LayoutTemplate,
      accentClassName: "bg-[#F78BE3] text-[#0e2951]",
    },
    {
      title: "UX Research",
      subtitle: "insight that shapes delivery",
      href: withBasePath("/projects?filter=UX%20Research"),
      icon: Mic,
      accentClassName: "bg-[#25D7C4] text-[#0e2951]",
    },
    {
      title: "Enterprise SaaS",
      subtitle: "clear flows for complex products",
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

  function scrollProjects(direction: "left" | "right") {
    const container = projectsSliderRef.current;
    if (!container) {
      return;
    }

    const firstCard = container.querySelector<HTMLElement>("[data-home-slider-card]");
    const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : container.clientWidth * 0.9;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }

  async function handleHeroAssistantSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = heroAssistantQuery.trim();
    if (!query) {
      setHeroAssistantResponse("Ask about projects, skills, resume, contact details, or GitHub activity on this website.");
      setHeroAssistantResults([]);
      setHighlightedProjectIds([]);
      return;
    }

    try {
      const result = resolveHeroAssistantQuery(query, caseStudies, siteContent, heroVisitorType);
      setHeroAssistantResponse(result.response);
      setHeroAssistantResults(result.items);

      const projectMatches = result.items
        .map((item) => item.cardId)
        .filter((value): value is string => Boolean(value));
      setHighlightedProjectIds(projectMatches);

      const firstSection = result.items.find((item) => item.sectionId)?.sectionId;
      scrollToSection(firstSection);
    } catch {
      setHeroAssistantResponse("I couldn't search the website right now.");
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
      nextErrors.name = "Please add your name.";
    }

    if (!ctaForm.email.trim()) {
      nextErrors.email = "Please add your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctaForm.email.trim())) {
      nextErrors.email = "Please enter a valid email.";
    }

    if (!ctaForm.message.trim()) {
      nextErrors.message = "Please add a message.";
    } else if (ctaForm.message.trim().length < 12) {
      nextErrors.message = "Please add a bit more detail.";
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

      setCtaToast("Email sent. I’ll get back to you soon.");
      setCtaForm({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setCtaToast("I couldn’t send the email right now. Please try again.");
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

  const recentWorkSection = (
    <section key="work" id="projects" className="bg-white py-12 px-6 md:px-10 xl:px-20">
      <div className="mx-auto flex w-full flex-col items-center gap-12">
        <div
          ref={projectsSliderRef}
          className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {homeProjects.map((project) => (
            (() => {
              const isActiveCard =
                activeProjectCardId === project.cardId ||
                (highlightedProjectIds.length > 0 && highlightedProjectIds.includes(project.cardId));

              return (
                <Link
                  key={project.title}
                  id={project.cardId}
                  data-home-card-id={project.cardId}
                  data-home-slider-card
                  href={project.href}
                  onMouseEnter={() => setActiveProjectCardId(project.cardId)}
                  onFocus={() => setActiveProjectCardId(project.cardId)}
                  className={`group flex min-w-[86%] snap-start flex-col gap-5 rounded-[30px] bg-white p-0 outline-none transition-all md:min-w-[46%] xl:min-w-[31%] ${
                    highlightedProjectIds.length && !highlightedProjectIds.includes(project.cardId)
                      ? "opacity-45"
                      : ""
                  }`}
                >
                  <div className="relative h-[230px] overflow-hidden rounded-[28px] bg-[#e9f3fb] transition-all duration-300 group-hover:-translate-y-1 sm:h-[300px] xl:h-[230px]" style={!project.image ? { background: project.background } : undefined}>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-center">
                        <div>
                          <div className="text-5xl font-inter font-bold text-[#1183D0]">{project.year}</div>
                          <div className="mt-2 text-xs leading-tight text-[#5c7792]">{project.company}</div>
                        </div>
                      </div>
                    )}
                    {isActiveCard ? (
                      <div className="pointer-events-none absolute inset-0 ring-2 ring-[#1183D0] ring-offset-4 ring-offset-white" />
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <Badge key={tag} size="tag">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex min-h-[236px] flex-col justify-between">
                    <div className="pb-4">
                      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-xs font-medium text-[#5c7792]">{project.company}</span>
                        <span className="text-[#bcd2ff]">·</span>
                        <span className="text-xs text-[#5c7792]">{project.year}</span>
                        {project.password ? (
                          <>
                            <span className="text-[#bcd2ff]">·</span>
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1183D0]">Locked</span>
                          </>
                        ) : null}
                      </div>
                      <h3 className="font-inter text-[30px] leading-snug text-[rgb(14_41_81/var(--tw-text-opacity,1))] transition-colors duration-200">
                        {project.title}
                      </h3>
                    </div>
                    <div className={`-mt-1 h-[148px] transition-all duration-300 ${isActiveCard ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"}`}>
                      <div className="flex h-full flex-col gap-3">
                        <p className="text-[15px] leading-relaxed text-[#5c7792]">{project.description}</p>
                        <span className="inline-flex text-[14px] font-medium text-[#1183D0] underline-offset-2 group-hover:underline">
                          {project.cta} →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })()
          ))}
        </div>
        <div className="flex w-full items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => scrollProjects("left")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#cfe5f8] bg-white text-[#1183D0] transition-colors hover:border-[#1183D0] hover:bg-[#f7fbff]"
            aria-label="Scroll projects left"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollProjects("right")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#cfe5f8] bg-white text-[#1183D0] transition-colors hover:border-[#1183D0] hover:bg-[#f7fbff]"
            aria-label="Scroll projects right"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
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
                      Shared inputs translated into product direction
                    </div>
                    <div className="mt-3 rounded-[16px] bg-[linear-gradient(135deg,#edf5ff_0%,#f7fbff_100%)] px-3 py-3 text-[12px] leading-7 text-[#4f6486]">
                      Collaboration helps connect user needs, business goals, and implementation tradeoffs into clearer product decisions.
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
              <div className="rounded-[18px] border border-[#e7edf6] bg-[#fbfcfe] p-3 shadow-[0_10px_22px_rgba(30,38,61,0.04)]">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0e2951]">
                    A11y validation
                  </p>
                  <span className="rounded-full bg-[#e8f8ea] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#339154]">
                    in review
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between rounded-[12px] bg-white px-3 py-2">
                    <span className="text-[12px] font-medium text-[#5c7792]">Focus order</span>
                    <span className="rounded-full bg-[#e8f8ea] px-2 py-0.5 text-[10px] font-semibold text-[#339154]">Pass</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[12px] bg-white px-3 py-2">
                    <span className="text-[12px] font-medium text-[#5c7792]">Color contrast</span>
                    <span className="rounded-full bg-[#eef7ff] px-2 py-0.5 text-[10px] font-semibold text-[#1183D0]">Check</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[12px] bg-white px-3 py-2">
                    <span className="text-[12px] font-medium text-[#5c7792]">Labels and roles</span>
                    <span className="rounded-full bg-[#e8f8ea] px-2 py-0.5 text-[10px] font-semibold text-[#339154]">Pass</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[12px] bg-white px-3 py-2">
                    <span className="text-[12px] font-medium text-[#5c7792]">Keyboard states</span>
                    <span className="rounded-full bg-[#fff3df] px-2 py-0.5 text-[10px] font-semibold text-[#d68524]">Audit</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="max-w-[320px] font-inter text-[26px] leading-[1.15] text-[#0e2951]">
              Accessibility documentation and UX validation
            </h3>
            <p className="mt-3 max-w-[320px] text-[14px] leading-[1.6] text-[#5c7792] md:text-[15px]">
              Brings accessibility thinking to product work through documentation, UX audits, and well-structured design systems that support clearer, more consistent decisions.
            </p>
          </Link>

          <Link
            href={withBasePath("/projects/benefits-enrollment")}
            className="group relative overflow-hidden rounded-[34px] bg-[linear-gradient(140deg,#f7f3ff_0%,#eef8ff_46%,#fff4ea_100%)] p-5 transition-transform duration-300 hover:-translate-y-1 md:p-6"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#ffcf8c]/45 blur-2xl" />
            <div className="absolute bottom-8 right-6 h-24 w-24 rounded-full bg-[#9ec6ff]/35 blur-2xl" />
            <div className="relative">
              <h3 className="max-w-[320px] font-inter text-[26px] leading-[1.15] text-[#0e2951]">
                Design systems and cross-functional support.
              </h3>
              <p className="mt-3 max-w-[320px] text-[14px] leading-[1.6] text-[#5c7792] md:text-[15px]">
                A reliable partner for quick design feedback, design systems consultation, and practical IT-related problem solving across the product workflow.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-[24px] bg-white/88 p-4 shadow-[0_18px_34px_rgba(31,53,94,0.08)]">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#eef4ff] text-[#4d6ff5]">
                      <LayoutTemplate className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-[#0e2951]">Quick design feedback</p>
                      <p className="text-[12px] text-[#7b8598]">fast reviews, clear notes, actionable product decisions</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#eef6ff] px-3 py-1 text-[11px] font-semibold text-[#1183D0]">Reviews</span>
                    <span className="rounded-full bg-[#fff1df] px-3 py-1 text-[11px] font-semibold text-[#d68524]">Iteration</span>
                    <span className="rounded-full bg-[#ebf8ef] px-3 py-1 text-[11px] font-semibold text-[#2f8c54]">Alignment</span>
                  </div>
                </div>
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
      className="isolate mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center overflow-clip bg-white px-4 pb-10 pt-36 md:px-8"
    >
      <div className="relative mx-auto flex flex-col items-center gap-6">
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
                  Case studies
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#e4ebf3] bg-[rgba(248,251,255,0.88)] px-8 py-10 shadow-[0_18px_44px_rgba(60,62,63,0.06)] backdrop-blur-sm md:px-12 md:py-14">
            <form className="space-y-5" onSubmit={handleCtaSubmit} noValidate>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#0e2951]" htmlFor="cta-name">Name</label>
                <input
                  id="cta-name"
                  type="text"
                  value={ctaForm.name}
                  onChange={(event) => {
                    setCtaForm((current) => ({ ...current, name: event.target.value }));
                    setCtaErrors((current) => ({ ...current, name: undefined }));
                  }}
                  className="w-full rounded-[14px] border border-[#d7e2f0] bg-white px-4 py-4 text-[15px] text-[#0e2951] outline-none transition-colors placeholder:text-[#8a98ab] focus:border-[#1183D0]"
                  placeholder="Hello"
                  aria-invalid={Boolean(ctaErrors.name)}
                />
                {ctaErrors.name ? <p className="mt-2 text-[12px] text-[#c25b67]">{ctaErrors.name}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#0e2951]" htmlFor="cta-email">Email</label>
                <input
                  id="cta-email"
                  type="email"
                  value={ctaForm.email}
                  onChange={(event) => {
                    setCtaForm((current) => ({ ...current, email: event.target.value }));
                    setCtaErrors((current) => ({ ...current, email: undefined }));
                  }}
                  className="w-full rounded-[14px] border border-[#d7e2f0] bg-white px-4 py-4 text-[15px] text-[#0e2951] outline-none transition-colors placeholder:text-[#8a98ab] focus:border-[#1183D0]"
                  placeholder="How should I reach you?"
                  aria-invalid={Boolean(ctaErrors.email)}
                />
                {ctaErrors.email ? <p className="mt-2 text-[12px] text-[#c25b67]">{ctaErrors.email}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#0e2951]" htmlFor="cta-message">Message</label>
                <textarea
                  id="cta-message"
                  value={ctaForm.message}
                  onChange={(event) => {
                    setCtaForm((current) => ({ ...current, message: event.target.value }));
                    setCtaErrors((current) => ({ ...current, message: undefined }));
                  }}
                  className="min-h-[132px] w-full rounded-[14px] border border-[#d7e2f0] bg-white px-4 py-4 text-[15px] text-[#0e2951] outline-none transition-colors placeholder:text-[#8a98ab] focus:border-[#1183D0]"
                  placeholder="How can I help?"
                  aria-invalid={Boolean(ctaErrors.message)}
                />
                {ctaErrors.message ? <p className="mt-2 text-[12px] text-[#c25b67]">{ctaErrors.message}</p> : null}
              </div>
              <div className="rounded-[18px] border border-[#dce7f4] bg-white px-4 py-4 text-[13px] leading-7 text-[#5c7792]">
                Tell me about the product, the team, or the design challenge. I’ll follow up from the contact page without the extra friction.
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={ctaSubmitting}
                className="h-12 rounded-full border border-[#c8d7ea] bg-white px-6 text-[#0e2951] hover:bg-[#0e2951] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {ctaSubmitting ? "Sending..." : siteContent.home.stat_banner.cta_label.replace("→", "").trim()}
              </Button>
            </form>
          </div>
      </div>
    </section>
  );

  const contentSections = [impactShowcaseSection, toolsSection, ctaSection];

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
        <div
          className="relative overflow-hidden px-6 pt-[8.5rem] pb-[3rem] sm:px-10 lg:px-16"
          style={{ background: heroPhaseStyles.background }}
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
            const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
            setHeroPointer({ x: normalizedX, y: normalizedY });
          }}
          onMouseLeave={() => setHeroPointer({ x: 0, y: 0 })}
        >
          <div className="pointer-events-none absolute inset-0" style={{ background: heroPhaseStyles.overlay }} />
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{ background: heroPhaseStyles.cone }}
          />
          <HeroPrototypeOverlay heroPointer={heroPointer} />
          <div className="pointer-events-none absolute inset-0" style={{ opacity: heroPhaseStyles.starOpacity }}>
            {HERO_STARS.map((star, index) => (
              <span
                key={`hero-star-${index}`}
                className="absolute rounded-full bg-white/85 shadow-[0_0_10px_rgba(255,255,255,0.45)] animate-[hero-star-twinkle_var(--twinkle-duration)_ease-in-out_infinite]"
                style={{
                  left: star.left,
                  top: star.top,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: star.delay,
                  ["--twinkle-duration" as string]: star.duration,
                }}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 block">
            <div
              className="absolute right-[3%] top-[19%] h-[226px] w-[266px] rounded-[34px] border border-white/16 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -7, 9),
                transition: "transform 180ms ease-out",
                opacity: 0.38,
              }}
            />
            <div
              className="absolute right-[7%] top-[24%] h-[154px] w-[204px] rounded-[24px] border border-[#e4bdd0]/22 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, 8),
                transition: "transform 180ms ease-out",
                opacity: 0.52,
              }}
            />
            <div
              className="absolute right-[28%] top-[58%] h-px w-[150px] bg-[#90a4da]/28 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -12, -6),
                transition: "transform 180ms ease-out",
              }}
            />
            <div
              className="absolute right-[28%] top-[58%] h-[56px] w-px bg-[#90a4da]/24 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -12, -6),
                transition: "transform 180ms ease-out",
              }}
            />
            <div
              className="absolute right-[12%] top-[58%] h-px w-[130px] bg-[#d6a8bc]/28 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, 5),
                transition: "transform 180ms ease-out",
              }}
            />
            <div
              className="absolute right-[18%] top-[46%] h-[74px] w-[74px] rounded-full border border-white/14 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -6, 0),
                transition: "transform 180ms ease-out",
                opacity: 0.45,
              }}
            />
            <div
              className="absolute right-[33%] top-[14%] z-[2] rounded-full border border-white/24 bg-white/8 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#64738f] hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -8, 0),
                transition: "transform 180ms ease-out",
              }}
            >
              User flow
            </div>
            <div
              className="absolute right-[26%] top-[50%] z-[2] rounded-full border border-white/24 bg-white/8 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#64738f] hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -8, 0),
                transition: "transform 180ms ease-out",
              }}
            >
              Low-fi
            </div>
            <div
              className="absolute right-[18%] top-[62%] z-[1] rounded-[16px] border border-white/18 bg-white/8 px-4 py-3 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -8, -2),
                transition: "transform 180ms ease-out",
                opacity: 0.72,
              }}
            >
              <div className="mb-2 h-2 w-16 rounded-full bg-white/34" />
              <div className="space-y-2">
                <div className="h-2 w-24 rounded-full bg-white/26" />
                <div className="h-2 w-12 rounded-full bg-white/22" />
              </div>
            </div>
            <div
              className="absolute right-[28%] top-[20%] z-[1] w-[194px] rounded-[26px] border border-white/30 bg-white/12 p-3.5 shadow-[0_20px_42px_rgba(42,54,92,0.06),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl hidden sm:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -26, -10),
                transition: "transform 180ms ease-out",
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3f4a67]">
                  <LayoutTemplate className="h-3.5 w-3.5" />
                  Wireframe
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#6d79ff]" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-[62%] rounded-full bg-[#ffffff]/70" />
                <div className="grid grid-cols-[1.25fr_0.9fr] gap-2">
                  <div className="h-20 rounded-[18px] bg-[#dbe6ff]/75" />
                  <div className="space-y-2">
                    <div className="h-9 rounded-[14px] bg-[#ffffff]/70" />
                    <div className="h-9 rounded-[14px] bg-[#f6d6ff]/60" />
                  </div>
                </div>
                <div className="h-3 w-[48%] rounded-full bg-[#ffffff]/62" />
              </div>
            </div>

            <div
              className="absolute right-[10%] top-[18%] z-[1] w-[166px] rounded-[24px] border border-white/30 bg-white/12 p-3.5 shadow-[0_20px_42px_rgba(42,54,92,0.06),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl hidden sm:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -20, 9),
                transition: "transform 180ms ease-out",
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3f4a67]">
                  <BrainCircuit className="h-3.5 w-3.5" />
                  AI Assist
                </span>
                <span className="rounded-full border border-[#7f8fff]/30 bg-[#6f7cff]/16 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4e5fc7]">
                  live
                </span>
              </div>
              <div className="rounded-[16px] bg-[#f8fbff]/56 p-2.5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#6d79ff]" />
                  <div className="h-2 w-[56%] rounded-full bg-[#d9e2ff]" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-[#e7ecff]" />
                    <div className="h-2 w-[68%] rounded-full bg-white/80" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-[#ffe6d0]" />
                    <div className="h-2 w-[54%] rounded-full bg-white/72" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-[#d8f3e7]" />
                    <div className="h-2 w-[74%] rounded-full bg-white/82" />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute right-[18%] bottom-[26%] z-[2] hidden sm:flex items-center gap-3 rounded-full border border-white/34 bg-white/12 px-4 py-3 shadow-[0_20px_42px_rgba(42,54,92,0.08),inset_0_1px_0_rgba(255,255,255,0.42)] backdrop-blur-xl"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -18, -6),
                transition: "transform 180ms ease-out",
              }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff]/55 text-[#3d52c6]">
                <MousePointer2 className="h-4 w-4" />
              </span>
              <div className="text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5b6a89]">UI Motion</p>
                <p className="text-[13px] font-medium text-[#22314f]">Cursor-aware interactions</p>
              </div>
            </div>

          </div>
          <div
            className="pointer-events-none absolute left-[12%] top-[12%] h-px w-[160px] animate-[hero-shooting-star_11s_linear_infinite] opacity-0"
            style={{ opacity: heroPhaseStyles.shootingOpacity }}
          >
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.95)_45%,rgba(255,255,255,0))] shadow-[0_0_14px_rgba(255,255,255,0.55)]" />
            <span className="absolute right-0 top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.95)]" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.58)_42%,#ffffff_100%)]" />
          <div className="relative mx-auto flex min-h-[340px] w-full max-w-[1200px] flex-col items-start justify-center gap-8 px-5 text-left sm:px-8 lg:px-12">
            <div className="flex w-full max-w-[760px] flex-col items-start justify-center">
              <TypewriterBanner
                greeting={(
                  <>
                    <span className="font-inter text-[2.05em] leading-none text-[#0e2951]">
                      Greddys Martinez
                    </span>
                  </>
                )}
                roles={heroRoles}
                description=""
                greetingClassName="text-[#0e2951]"
                roleClassName="text-[#1183D0]"
                descriptionClassName="text-[#0e2951]"
                align="left"
              />
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowUp, BrainCircuit, FolderGit2, GitCommitHorizontal, GitFork, GitPullRequest, LayoutTemplate, Mic, MousePointer2, Star, Wand2 } from "lucide-react";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { TypewriterBanner } from "./components/typewriter-banner";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { SectionHeading } from "./components/ui/section-heading";
import {
  resolveHomeCardId,
  resolveHomeCardImage,
  resolveProjectHref,
  resolveToolIcon,
  resolveToolIconOptional,
  resolveTrustedLogo,
  usePublicCaseStudies,
  usePublicSiteContent,
} from "./lib/cms/public";
import { withBasePath } from "./lib/site";

const TOOLS_LEFT = [
  { label: "Miro",       x: "left-[27%]", y: "top-[90px]",  size: "lg" as const, delay: "1.2s" },
  { label: "Angular",    x: "left-[26%]", y: "top-[240px]", size: "lg" as const, delay: "0.6s" },
  { label: "Figma",      x: "left-[25%]", y: "top-[370px]", size: "lg" as const, delay: "0s"   },
  { label: "Jira",       x: "left-[15%]", y: "top-[30px]",  size: "sm" as const, delay: "0.3s" },
  { label: "React",      x: "left-[14%]", y: "top-[160px]", size: "sm" as const, delay: "0.9s" },
  { label: "Confluence", x: "left-[15%]", y: "top-[310px]", size: "sm" as const, delay: "1.5s" },
  { label: "Maze",       x: "left-[14%]", y: "top-[440px]", size: "sm" as const, delay: "2.1s" },
  { label: "HTML",       x: "left-[5%]",  y: "top-[70px]",  size: "sm" as const, delay: "1.8s" },
  { label: "Notion",     x: "left-[4%]",  y: "top-[260px]", size: "sm" as const, delay: "0.7s" },
  { label: "Webex",      x: "left-[5%]",  y: "top-[420px]", size: "sm" as const, delay: "1.4s" },
];

const TOOLS_RIGHT = [
  { label: "ChatGPT",  x: "right-[27%]", y: "top-[90px]",  size: "sm" as const, delay: "0.2s" },
  { label: "Copilot",  x: "right-[26%]", y: "top-[240px]", size: "sm" as const, delay: "0.4s" },
  { label: "Notion",   x: "right-[25%]", y: "top-[370px]", size: "sm" as const, delay: "0.1s" },
  { label: "Jira",     x: "right-[15%]", y: "top-[30px]",  size: "sm" as const, delay: "0.5s" },
  { label: "Slack",    x: "right-[14%]", y: "top-[160px]", size: "sm" as const, delay: "1.1s" },
  { label: "Figma",    x: "right-[15%]", y: "top-[310px]", size: "sm" as const, delay: "0.8s" },
  { label: "React",    x: "right-[14%]", y: "top-[440px]", size: "sm" as const, delay: "2.0s" },
  { label: "Claude",   x: "right-[5%]",  y: "top-[70px]",  size: "sm" as const, delay: "1.7s" },
  { label: "VS Code",  x: "right-[4%]",  y: "top-[260px]", size: "sm" as const, delay: "1.3s" },
  { label: "Miro",     x: "right-[5%]",  y: "top-[420px]", size: "sm" as const, delay: "1.6s" },
];

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

function ToolBadge({
  label,
  x,
  y,
  size,
  delay = "0s",
}: {
  label: string;
  x: string;
  y: string;
  size: "lg" | "sm";
  delay?: string;
}) {
  const icon = resolveToolIconOptional(label);

  if (!icon) {
    return null;
  }

  const sizeClass = size === "lg" ? "h-[74px] w-[74px] rounded-[16px]" : "h-16 w-16 rounded-[15px]";

  return (
    <div
      className={`absolute hidden ${x} ${y} z-10 ${sizeClass} items-center justify-center bg-white shadow-[0_18px_42px_rgba(14,41,81,0.10)] lg:flex`}
      title={label}
      style={{ animation: `tool-float 3.8s ease-in-out ${delay} infinite` }}
    >
      <Image
        src={resolveToolIcon(label)}
        alt={label}
        width={size === "lg" ? 42 : 32}
        height={size === "lg" ? 42 : 32}
        className="h-[64%] w-[64%] object-contain"
      />
    </div>
  );
}

function HeroPrototypeOverlay({
  heroPointer,
}: {
  heroPointer: { x: number; y: number };
}) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      <div
        className="absolute left-[6%] top-[14%] h-px w-[14%] bg-[linear-gradient(90deg,rgba(255,255,255,0.55),rgba(255,255,255,0))]"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -8, 0),
          transition: "transform 180ms ease-out",
        }}
      />
      <div
        className="absolute left-[20%] top-[14%] text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5d6d8b]"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -8, 0),
          transition: "transform 180ms ease-out",
        }}
      >
        Prototype grid
      </div>
      <div
        className="absolute right-[8%] top-[16%] h-[76px] w-[76px] rounded-[20px] border border-dashed border-white/22"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, 0),
          transition: "transform 180ms ease-out",
        }}
      />
      <div
        className="absolute left-[14%] top-[34%] h-px w-[22%] border-t border-dashed border-white/20"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -9, 0),
          transition: "transform 180ms ease-out",
        }}
      />
      <div
        className="absolute right-[16%] top-[35%] h-px w-[18%] border-t border-dashed border-white/18"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -9, 0),
          transition: "transform 180ms ease-out",
        }}
      />
      <div
        className="absolute left-[26%] top-[23%] h-8 w-8 border-l border-t border-white/24"
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
        className="absolute left-[22%] bottom-[20%] flex items-center gap-2 rounded-full border border-white/24 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#5f708f]"
        style={{
          transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, 0),
          transition: "transform 180ms ease-out",
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#6e7dff]/70" />
        entry
      </div>
      <div
        className="absolute right-[21%] bottom-[22%] flex items-center gap-2 rounded-full border border-white/24 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#5f708f]"
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
  const [openProjectIdx, setOpenProjectIdx] = useState(0);
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
  const featuredProjects = caseStudies
    .filter((study) => study.featured || study.slug === "flock-accessibility-system")
    .slice(0, 4)
    .map((study) => ({
      slug: study.slug,
      cardId: resolveHomeCardId(study.slug),
      title: study.title,
      description: study.tagline ?? "",
      image: resolveHomeCardImage(study.slug, study.images.cover),
      href: resolveProjectHref(study),
      tags: study.tags.slice(0, 4),
      cta: study.external_link ? "View project" : "View case study",
    }));
  const toolRows = [siteContent.home.tools_section.row_1, siteContent.home.tools_section.row_2]
    .map((row) => row.filter(Boolean))
    .filter((row) => row.length > 0);
  const heroRoles = [
    "designing with AI.",
    "a senior designer.",
    "research that ships.",
    "enterprise UX.",
    "your next UX hire.",
  ];
  const heroPills = [
    { label: "AI Product Design", href: withBasePath("/projects?filter=AI%20Product") },
    { label: "Design Systems", href: withBasePath("/projects?filter=Design%20Systems") },
    { label: "Enterprise SaaS", href: withBasePath("/projects?topic=SaaS") },
    { label: "UX Research", href: withBasePath("/projects?filter=UX%20Research") },
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

  function handleHeroVisitorTypeSelect(type: HeroVisitorType) {
    setHeroVisitorType(type);
    setHighlightedProjectIds(type === "recruiter" ? featuredProjects.slice(0, 2).map((project) => project.cardId) : []);
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

  const recentWorkSection = (
    <section key="work" id="projects" className="bg-white py-12 px-6 md:px-10 xl:px-20">
      <div className="mx-auto flex w-full flex-col items-center gap-12">
        <div className="flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Projects" title="Recent Work" className="items-start text-left" />
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-[#c7d8ea] px-5 text-[13px] font-medium text-[#16385c] shadow-[0_10px_24px_rgba(78,104,138,0.10)] transition-all hover:border-[#9bb9d7] hover:bg-white hover:text-[#0e2951]"
          >
            <Link href={withBasePath("/projects")}>View all projects</Link>
          </Button>
        </div>
        <div
          className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3"
          onMouseLeave={() => setOpenProjectIdx(0)}
        >
          {featuredProjects.map((project, index) => {
            const isOpen = openProjectIdx === index;
            return (
              <Link
                key={project.title}
                id={project.cardId}
                data-home-card-id={project.cardId}
                href={project.href}
                onMouseEnter={() => setOpenProjectIdx(index)}
                className={`flex w-full min-w-0 cursor-pointer flex-col gap-5 outline-none ${
                  highlightedProjectIds.length && !highlightedProjectIds.includes(project.cardId)
                    ? "opacity-45 transition-opacity"
                    : ""
                }`}
              >
                <div className={`relative h-[230px] overflow-hidden rounded-[28px] bg-[#e9f3fb] transition-all duration-300 sm:h-[300px] xl:h-[230px] ${isOpen ? "-translate-y-1 shadow-[0_28px_70px_rgba(14,41,81,0.22)]" : "shadow-[0_18px_52px_rgba(14,41,81,0.12)]"}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`object-cover transition-transform duration-500 ${isOpen ? "scale-[1.04]" : ""}`}
                  />
                  {highlightedProjectIds.includes(project.cardId) ? (
                    <div className="pointer-events-none absolute inset-0 ring-2 ring-[#1183D0] ring-offset-4 ring-offset-white" />
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} size="tag">{tag}</Badge>
                  ))}
                </div>
                <h3 className={`font-serif-display italic text-[30px] leading-snug transition-colors duration-200 ${isOpen ? "text-[#0e2951]" : "text-[#1183D0]"}`}>
                  {project.title}
                </h3>
                <div className={`-mt-2 h-[116px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                  <div className="flex h-full flex-col justify-between">
                    <p className="text-[14px] leading-relaxed text-[#5c7792]">{project.description}</p>
                    <span className={`inline-flex text-[14px] font-medium text-[#1183D0] underline-offset-2 ${isOpen ? "underline" : ""}`}>
                      {project.cta} →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );

  const toolsSection = (
    <section key="tools" id="skills" className="relative isolate overflow-hidden px-6 py-16 md:px-10 lg:h-[520px] xl:px-20">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#F0F7FF_48%,rgba(17,131,208,0.28)_100%)]" />
      {TOOLS_LEFT.map((tool) => (
        <ToolBadge key={`left-${tool.label}-${tool.x}`} {...tool} delay={tool.delay} />
      ))}
      <div className="relative z-20 mx-auto flex max-w-[540px] flex-col items-center gap-5 text-center lg:absolute lg:left-1/2 lg:top-28 lg:-translate-x-1/2">
        <SectionHeading eyebrow="Experience & Skills" title={siteContent.home.tools_section.headline} centered />
        <p className="max-w-[560px] text-[15px] leading-[1.8] text-[#3c3e3f]">
          {siteContent.home.tools_section.description}
        </p>
        <div className="flex w-full flex-col gap-4 lg:hidden">
          {toolRows.map((row, index) => (
            <div key={`tool-row-${index}`} className="flex flex-wrap items-center justify-center gap-3">
              {row.map((label) => (
                <div
                  key={`${index}-${label}`}
                  className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/70 bg-white/90 px-5 py-3 text-[#0e2951] shadow-[0_18px_42px_rgba(14,41,81,0.10)] backdrop-blur"
                  title={label}
                >
                  {resolveToolIconOptional(label) ? (
                    <Image src={resolveToolIcon(label)} alt={label} width={26} height={26} className="h-[26px] w-[26px] object-contain" />
                  ) : (
                    <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-[#E0EEFB] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1183D0]">
                      {label.slice(0, 2)}
                    </span>
                  )}
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Button asChild variant="link" className="mt-2 h-auto gap-4 px-0 text-sm font-normal leading-none text-[#1183D0] hover:no-underline">
          <Link href={withBasePath(siteContent.home.tools_section.cta_href)}>
            {siteContent.home.tools_section.cta_label.replace("→", "").trim()} <span className="text-[22px] leading-none">→</span>
          </Link>
        </Button>
      </div>
      {TOOLS_RIGHT.map((tool) => (
        <ToolBadge key={`right-${tool.label}-${tool.x}`} {...tool} delay={tool.delay} />
      ))}
    </section>
  );

  const ctaSection = (
    <section key="cta" className="flex flex-col items-center justify-center gap-7 px-6 py-[80px] md:px-16 xl:px-30 text-center" style={{ background: "#0e2951" }}>
      <span className="text-[13px] font-medium tracking-[3px] text-[#7CB8E8] uppercase">
        Ready to Level Up?
      </span>
      <p className="text-[28px] leading-[1.5] text-[#A8C8E8] max-w-[800px]">
        {siteContent.home.stat_banner.text} {siteContent.home.stat_banner.value} {siteContent.home.stat_banner.value_label}
      </p>
      <h2 className="font-serif-display italic font-bold text-[40px] text-white">
        {siteContent.home.stat_banner.cta_headline}
      </h2>
      <Button asChild size="sm">
        <Link href={withBasePath(siteContent.home.stat_banner.cta_href.replace("#contact", "/contact"))}>
          {siteContent.home.stat_banner.cta_label.replace("→", "").trim()}
        </Link>
      </Button>
    </section>
  );

  const contentSections = [toolsSection, ctaSection];

  return (
    <main className="bg-[#F0F7FF] text-[#3c3e3f] overflow-x-hidden">
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
              className="absolute left-[7%] top-[16%] h-[280px] w-[320px] rounded-[38px] border border-white/16 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -7, -8),
                transition: "transform 180ms ease-out",
                opacity: 0.4,
              }}
            />
            <div
              className="absolute left-[11%] top-[20%] h-[188px] w-[250px] rounded-[26px] border border-[#9aaee2]/22 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, -6),
                transition: "transform 180ms ease-out",
                opacity: 0.52,
              }}
            />
            <div
              className="absolute right-[8%] top-[19%] h-[226px] w-[266px] rounded-[34px] border border-white/16 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -7, 9),
                transition: "transform 180ms ease-out",
                opacity: 0.38,
              }}
            />
            <div
              className="absolute right-[12%] top-[24%] h-[154px] w-[204px] rounded-[24px] border border-[#e4bdd0]/22 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, 8),
                transition: "transform 180ms ease-out",
                opacity: 0.52,
              }}
            />
            <div
              className="absolute left-[16%] top-[58%] h-px w-[150px] bg-[#90a4da]/28 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -12, -6),
                transition: "transform 180ms ease-out",
              }}
            />
            <div
              className="absolute left-[16%] top-[58%] h-[56px] w-px bg-[#90a4da]/24 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -12, -6),
                transition: "transform 180ms ease-out",
              }}
            />
            <div
              className="absolute right-[18%] top-[58%] h-px w-[130px] bg-[#d6a8bc]/28 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, 5),
                transition: "transform 180ms ease-out",
              }}
            />
            <div
              className="absolute right-[24%] top-[46%] h-[74px] w-[74px] rounded-full border border-white/14 hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -6, 0),
                transition: "transform 180ms ease-out",
                opacity: 0.45,
              }}
            />
            <div
              className="absolute left-[35%] top-[18%] rounded-full border border-white/24 bg-white/8 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#64738f] hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -8, 0),
                transition: "transform 180ms ease-out",
              }}
            >
              User flow
            </div>
            <div
              className="absolute right-[29%] top-[31%] rounded-full border border-white/24 bg-white/8 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#64738f] hidden lg:block"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -8, 0),
                transition: "transform 180ms ease-out",
              }}
            >
              Low-fi
            </div>
            <div
              className="absolute left-[31%] top-[66%] rounded-[16px] border border-white/18 bg-white/8 px-4 py-3 hidden lg:block"
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
            {HERO_UI_ORBS.map((orb, index) => (
              <span
                key={`hero-ui-orb-${index}`}
                className="absolute rounded-[32px] shadow-[0_24px_50px_rgba(20,28,48,0.16),inset_0_1px_0_rgba(255,255,255,0.14)]"
                style={{
                  left: orb.left,
                  top: orb.top,
                  width: `${orb.width}px`,
                  height: `${orb.height}px`,
                  background: orb.fill,
                  opacity: 0.38,
                  filter: "blur(0.2px)",
                  transform: getParallaxTransform(heroPointer.x, heroPointer.y, orb.depth, orb.rotate),
                  transition: "transform 180ms ease-out",
                }}
              />
            ))}

            <div
              className="absolute left-[8%] top-[20%] w-[194px] rounded-[26px] border border-white/30 bg-white/12 p-3.5 shadow-[0_20px_42px_rgba(42,54,92,0.06),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl hidden sm:block"
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
              className="absolute right-[12%] top-[19%] w-[166px] rounded-[24px] border border-white/30 bg-white/12 p-3.5 shadow-[0_20px_42px_rgba(42,54,92,0.06),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl hidden sm:block"
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
              className="absolute left-[16%] bottom-[18%] hidden sm:flex items-center gap-3 rounded-full border border-white/34 bg-white/12 px-4 py-3 shadow-[0_20px_42px_rgba(42,54,92,0.08),inset_0_1px_0_rgba(255,255,255,0.42)] backdrop-blur-xl"
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

            <div
              className="absolute right-[14%] top-[57%] hidden sm:flex items-center gap-3 rounded-full border border-white/28 bg-white/10 px-3.5 py-2.5 shadow-[0_18px_34px_rgba(42,54,92,0.05),inset_0_1px_0_rgba(255,255,255,0.36)] backdrop-blur-xl"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -16, 4),
                transition: "transform 180ms ease-out",
              }}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ffffff]/48 text-[#ff9d2f]">
                <Wand2 className="h-4 w-4" />
              </span>
              <div className="text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5b6a89]">Design craft</p>
                <p className="text-[13px] font-medium text-[#22314f]">Systems, flows, polish</p>
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
          <div className="relative mx-auto flex min-h-[340px] max-w-[980px] flex-col items-center justify-center gap-8 text-center">
            <div className="flex max-w-[760px] flex-col items-center justify-center">
              <TypewriterBanner
                greeting={(
                  <>
                    <span className="font-serif-display text-[1.8em] italic leading-none text-[#0e2951]">
                      Greddys Martinez
                    </span>
                  </>
                )}
                roles={heroRoles}
                description=""
                greetingClassName="text-[#0e2951]"
                roleClassName="text-[#3b82f6]"
                descriptionClassName="text-[#0e2951]"
              />
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {heroPills.map((pill) => (
                  <Badge
                    key={pill.label}
                    asChild
                    variant="outline"
                    className="rounded-full border border-[#c7d8ea] bg-[#fffdf8] px-1 py-1 text-[#16385c] shadow-[0_10px_24px_rgba(78,104,138,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9bb9d7] hover:bg-white hover:text-[#0e2951] hover:shadow-[0_16px_32px_rgba(78,104,138,0.18)]"
                  >
                    <Link href={pill.href} className="rounded-full px-4 py-2 text-[13px] font-medium tracking-[0.01em]">
                      {pill.label}
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {recentWorkSection}

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
                    className={`w-auto shrink-0 object-contain transition-all ${logo.alt === "Hakuna" ? "max-h-[28px]" : logo.alt === "Paramount+" ? "max-h-[22px]" : "max-h-[46px]"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {contentSections}
      <SiteFooter />
    </main>
  );
}

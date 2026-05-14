"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BrainCircuit, FolderGit2, GitCommitHorizontal, GitFork, GitPullRequest, LayoutTemplate, MousePointer2, Star, Wand2 } from "lucide-react";
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
  { label: "Figma", x: "left-[7%]", y: "top-[72px]", size: "lg" as const },
  { label: "Angular", x: "left-[18%]", y: "top-[34px]", size: "lg" as const },
  { label: "Miro", x: "left-[31%]", y: "top-[18px]", size: "lg" as const },
  { label: "React", x: "left-[10%]", y: "top-[236px]", size: "sm" as const },
  { label: "HTML", x: "left-[6%]", y: "top-[352px]", size: "sm" as const },
  { label: "Jira", x: "left-[22%]", y: "top-[132px]", size: "sm" as const },
  { label: "Confluence", x: "left-[37%]", y: "top-[118px]", size: "sm" as const },
  { label: "Maze", x: "left-[30%]", y: "top-[268px]", size: "sm" as const },
  { label: "Notion", x: "left-[19%]", y: "top-[366px]", size: "sm" as const },
  { label: "Webex", x: "left-[41%]", y: "top-[390px]", size: "sm" as const },
];

const TOOLS_RIGHT = [
  { label: "Copilot", x: "right-[31%]", y: "top-[18px]", size: "sm" as const },
  { label: "Slack", x: "right-[18%]", y: "top-[52px]", size: "sm" as const },
  { label: "Claude", x: "right-[7%]", y: "top-[96px]", size: "sm" as const },
  { label: "ChatGPT", x: "right-[26%]", y: "top-[172px]", size: "sm" as const },
  { label: "VS Code", x: "right-[5%]", y: "top-[236px]", size: "sm" as const },
  { label: "Figma", x: "right-[16%]", y: "top-[370px]", size: "sm" as const },
  { label: "React", x: "right-[35%]", y: "top-[386px]", size: "sm" as const },
  { label: "Jira", x: "right-[38%]", y: "top-[122px]", size: "sm" as const },
  { label: "Miro", x: "right-[16%]", y: "top-[272px]", size: "sm" as const },
  { label: "Notion", x: "right-[28%]", y: "top-[354px]", size: "sm" as const },
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
}: {
  label: string;
  x: string;
  y: string;
  size: "lg" | "sm";
}) {
  const icon = resolveToolIconOptional(label);

  if (!icon) {
    return null;
  }

  const sizeClass = size === "lg" ? "h-[74px] w-[74px] rounded-[16px]" : "h-16 w-16 rounded-[15px]";

  return (
    <div
      className={`absolute hidden ${x} ${y} z-10 ${sizeClass} items-center justify-center bg-white shadow-[0_18px_42px_rgba(14,41,81,0.10)] opacity-55 lg:flex`}
      title={label}
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
  const [heroPhase, setHeroPhase] = useState<HeroPhase>(() => getFallbackHeroPhase(new Date()));
  const [githubActivity, setGithubActivity] = useState<GitHubActivityItem[]>([]);
  const [githubUsername, setGithubUsername] = useState("gmartinez78");
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 });
  const { siteContent } = usePublicSiteContent();
  const { caseStudies } = usePublicCaseStudies();
  const hero = siteContent.home.hero;
  const socialProofLogos = siteContent.home.trusted_by.clients.map((client) => ({
    src: resolveTrustedLogo(client.name, client.logo),
    alt: client.name,
    h: client.name === "Skill" ? 59 : client.name === "Hakuna" ? 30 : client.name === "Elevation" ? 56 : client.name === "Paychex" ? 51 : client.name === "Nayya" ? 48 : client.name === "Paramount+" ? 24 : client.name === "IBX" ? 34 : 41,
    w: client.name === "Skill" ? 107 : client.name === "Hakuna" ? 96 : client.name === "Elevation" ? 220 : client.name === "Paychex" ? 142 : client.name === "Nayya" ? 127 : client.name === "Paramount+" ? 94 : client.name === "IBX" ? 48 : 57,
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
    { label: "10+ Years", href: withBasePath("/projects") },
  ];
  const heroPhaseStyles = useMemo(() => HERO_PHASE_STYLES[heroPhase], [heroPhase]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const updateWithCoordinates = (latitude?: number, longitude?: number) => {
      const now = new Date();
      setHeroPhase(
        typeof latitude === "number" && typeof longitude === "number"
          ? getHeroPhaseForLocation(now, latitude, longitude)
          : getFallbackHeroPhase(now),
      );
    };

    updateWithCoordinates();

    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          updateWithCoordinates(coords.latitude, coords.longitude);
          intervalId = setInterval(() => {
            updateWithCoordinates(coords.latitude, coords.longitude);
          }, 15 * 60 * 1000);
        },
        () => {
          intervalId = setInterval(() => {
            updateWithCoordinates();
          }, 15 * 60 * 1000);
        },
        { enableHighAccuracy: false, maximumAge: 30 * 60 * 1000, timeout: 5000 },
      );
    } else {
      intervalId = setInterval(() => {
        updateWithCoordinates();
      }, 15 * 60 * 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

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
        <SectionHeading eyebrow="Projects" title="Recent Work" centered />
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.title}
              id={project.cardId}
              data-home-card-id={project.cardId}
              href={project.href}
              className="group flex w-full min-w-0 cursor-pointer flex-col gap-5 outline-none"
            >
              <div className="relative h-[230px] overflow-hidden rounded-[28px] bg-[#e9f3fb] shadow-[0_18px_52px_rgba(14,41,81,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_70px_rgba(14,41,81,0.22)] group-focus-visible:-translate-y-1 group-focus-visible:shadow-[0_28px_70px_rgba(14,41,81,0.22)] sm:h-[300px] xl:h-[230px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <Badge key={tag} size="tag">{tag}</Badge>
                ))}
              </div>
              <h3 className="font-serif-display italic text-[30px] leading-snug text-[#1183D0] transition-colors duration-200 group-hover:text-[#0e2951] group-focus-visible:text-[#0e2951]">
                {project.title}
              </h3>
              <div className="-mt-2 h-[116px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <div className="flex h-full flex-col justify-between">
                  <p className="text-[14px] leading-relaxed text-[#5c7792]">{project.description}</p>
                  <span className="inline-flex text-[14px] font-medium text-[#1183D0] underline-offset-2 group-hover:underline group-focus-visible:underline">
                    {project.cta} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );

  const toolsSection = (
    <section key="tools" className="relative isolate overflow-hidden px-6 py-16 md:px-10 lg:h-[520px] xl:px-20">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#F0F7FF_48%,rgba(17,131,208,0.28)_100%)]" />
      {TOOLS_LEFT.map((tool) => (
        <ToolBadge key={`left-${tool.label}-${tool.x}`} {...tool} />
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
        <ToolBadge key={`right-${tool.label}-${tool.x}`} {...tool} />
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

  const githubActivitySection = (
    <section key="github-activity" className="bg-white px-6 py-16 md:px-10 xl:px-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#1183D0]">GitHub</p>
            <h2 className="mt-3 font-serif-display text-[38px] italic leading-tight text-[#0e2951]">
              Recent Activity
            </h2>
            <p className="mt-4 max-w-[620px] text-[15px] leading-[1.8] text-[#5c7792]">
              A live snapshot of recent public work and repository activity from @{githubUsername}.
            </p>
          </div>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#1183D0] transition-colors hover:text-[#0e2951]"
          >
            View GitHub profile <span aria-hidden="true">↗</span>
          </a>
        </div>

        {githubActivity.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {githubActivity.map((item) => {
              const Icon = getGitHubActivityIcon(item.kind);
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-[190px] flex-col justify-between rounded-[24px] border border-[#d7e8f7] bg-[#f8fbff] p-6 transition-all hover:-translate-y-1 hover:border-[#bcd2ff] hover:shadow-[0_18px_42px_rgba(14,41,81,0.12)]"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1183D0] shadow-[0_8px_20px_rgba(17,131,208,0.12)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7a98b5]">
                        {formatRelativeTimestamp(item.timestamp)}
                      </span>
                    </div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1183D0]">
                      {item.repo}
                    </p>
                    <h3 className="mt-3 text-[18px] font-semibold leading-snug text-[#0e2951]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-5 text-[14px] leading-[1.7] text-[#5c7792]">
                    {item.detail}
                  </p>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[24px] border border-[#d7e8f7] bg-[#f8fbff] px-6 py-8">
            <p className="text-[15px] leading-[1.7] text-[#5c7792]">
              GitHub activity is temporarily unavailable right now. The section is wired and will populate when the public feed responds.
            </p>
          </div>
        )}
      </div>
    </section>
  );

  const contentSections = [toolsSection, ctaSection, githubActivitySection];

  return (
    <main className="bg-[#F0F7FF] text-[#3c3e3f] overflow-x-hidden">
      <SiteHeader variant="transparent" />

      {/* ── Hero ── */}
      <section className="bg-white">
        <div
          className="relative overflow-hidden px-6 py-[8.5rem] sm:px-10 lg:px-16"
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
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <div
              className="absolute left-[7%] top-[16%] h-[280px] w-[320px] rounded-[38px] border border-white/16"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -7, -8),
                transition: "transform 180ms ease-out",
                opacity: 0.4,
              }}
            />
            <div
              className="absolute left-[11%] top-[20%] h-[188px] w-[250px] rounded-[26px] border border-[#9aaee2]/22"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, -6),
                transition: "transform 180ms ease-out",
                opacity: 0.52,
              }}
            />
            <div
              className="absolute right-[8%] top-[19%] h-[226px] w-[266px] rounded-[34px] border border-white/16"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -7, 9),
                transition: "transform 180ms ease-out",
                opacity: 0.38,
              }}
            />
            <div
              className="absolute right-[12%] top-[24%] h-[154px] w-[204px] rounded-[24px] border border-[#e4bdd0]/22"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, 8),
                transition: "transform 180ms ease-out",
                opacity: 0.52,
              }}
            />
            <div
              className="absolute left-[16%] top-[58%] h-px w-[150px] bg-[#90a4da]/28"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -12, -6),
                transition: "transform 180ms ease-out",
              }}
            />
            <div
              className="absolute left-[16%] top-[58%] h-[56px] w-px bg-[#90a4da]/24"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -12, -6),
                transition: "transform 180ms ease-out",
              }}
            />
            <div
              className="absolute right-[18%] top-[58%] h-px w-[130px] bg-[#d6a8bc]/28"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -10, 5),
                transition: "transform 180ms ease-out",
              }}
            />
            <div
              className="absolute right-[24%] top-[46%] h-[74px] w-[74px] rounded-full border border-white/14"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -6, 0),
                transition: "transform 180ms ease-out",
                opacity: 0.45,
              }}
            />
            <div
              className="absolute left-[35%] top-[18%] rounded-full border border-white/24 bg-white/8 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#64738f]"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -8, 0),
                transition: "transform 180ms ease-out",
              }}
            >
              User flow
            </div>
            <div
              className="absolute right-[29%] top-[31%] rounded-full border border-white/24 bg-white/8 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#64738f]"
              style={{
                transform: getParallaxTransform(heroPointer.x, heroPointer.y, -8, 0),
                transition: "transform 180ms ease-out",
              }}
            >
              Low-fi
            </div>
            <div
              className="absolute left-[31%] top-[66%] rounded-[16px] border border-white/18 bg-white/8 px-4 py-3"
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
                  opacity: heroPhase === "night" ? 0.56 : 0.38,
                  filter: "blur(0.2px)",
                  transform: getParallaxTransform(heroPointer.x, heroPointer.y, orb.depth, orb.rotate),
                  transition: "transform 180ms ease-out",
                }}
              />
            ))}

            <div
              className="absolute left-[8%] top-[20%] w-[194px] rounded-[26px] border border-white/30 bg-white/12 p-3.5 shadow-[0_20px_42px_rgba(42,54,92,0.06),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl"
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
              className="absolute right-[12%] top-[19%] w-[166px] rounded-[24px] border border-white/30 bg-white/12 p-3.5 shadow-[0_20px_42px_rgba(42,54,92,0.06),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl"
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
              className="absolute left-[16%] bottom-[18%] flex items-center gap-3 rounded-full border border-white/34 bg-white/12 px-4 py-3 shadow-[0_20px_42px_rgba(42,54,92,0.08),inset_0_1px_0_rgba(255,255,255,0.42)] backdrop-blur-xl"
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
              className="absolute right-[24%] top-[52%] flex items-center gap-3 rounded-full border border-white/28 bg-white/10 px-3.5 py-2.5 shadow-[0_18px_34px_rgba(42,54,92,0.05),inset_0_1px_0_rgba(255,255,255,0.36)] backdrop-blur-xl"
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
                    <span className="font-serif-display text-[2.15em] italic leading-none text-[#0e2951]">
                      Greddys Martinez
                    </span>
                  </>
                )}
                roles={heroRoles}
                description=""
                greetingClassName="text-[#0e2951]"
                roleClassName="text-[#17406c]"
                descriptionClassName="text-[#0e2951]"
              />
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {heroPills.map((pill) => (
                  <Badge
                    key={pill.label}
                    asChild
                    variant="outline"
                    className="rounded-full border border-white/55 bg-white/28 px-1 py-1 text-[#31405b] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_12px_28px_rgba(109,124,155,0.12)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/42 hover:text-[#0e2951] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_18px_36px_rgba(109,124,155,0.18)]"
                  >
                    <Link href={pill.href} className="rounded-full px-4 py-2 text-[13px] font-semibold tracking-[0.01em]">
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
          <div className="flex min-h-[92px] flex-col items-center gap-4 px-6 py-5 text-center md:px-10 lg:px-20">
            <div className="flex shrink-0 items-center justify-center">
              <span className="text-[12px] font-semibold text-[#5c7792]">
                {siteContent.home.trusted_by.label}
              </span>
            </div>
            <div className="relative w-full max-w-[1080px] overflow-hidden md:py-1">
              <div className="flex w-max animate-[logo-marquee_22s_linear_infinite] items-center gap-10 pr-10 hover:[animation-play-state:paused]">
                {logoCarousel.map((logo, index) => (
                  <Image
                    key={`${logo.alt}-${index}`}
                    src={logo.src}
                    alt={index < socialProofLogos.length ? logo.alt : ""}
                    width={logo.w}
                    height={logo.h}
                    aria-hidden={index >= socialProofLogos.length}
                    className={`w-auto shrink-0 object-contain opacity-75 grayscale transition-all hover:grayscale-0 hover:opacity-100 ${logo.alt === "Hakuna" ? "max-h-[20px] brightness-0 saturate-0 opacity-45 hover:opacity-70" : logo.alt === "Paramount+" ? "max-h-[16px]" : logo.alt === "Elevation" ? "max-h-[38px] mix-blend-multiply" : "max-h-[34px]"}`}
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

import { NextRequest, NextResponse } from "next/server";
import caseStudies from "@/content/case-studies.json";
import siteContent from "@/content/site.json";
import type { CaseStudyRecord, SiteContent } from "@/lib/cms/types";
import { withBasePath } from "@/lib/site";

type SearchSectionId = "projects" | "skills" | "github";

type SearchItem = {
  id: string;
  title: string;
  snippet: string;
  href: string;
  sectionId?: SearchSectionId;
  cardId?: string;
  body: string;
  audience?: Array<"recruiter" | "client">;
};

const content = siteContent as SiteContent;
const studies = caseStudies as CaseStudyRecord[];

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function buildSearchItems(): SearchItem[] {
  const publishedStudies = studies.filter((study) => study.status === "published");
  const projectItems = publishedStudies.map((study) => ({
    id: `project-${study.slug}`,
    title: study.title,
    snippet: study.tagline ?? `Case study for ${study.company}`,
    href: study.external_link ?? withBasePath(`/projects/${study.slug}`),
    sectionId: "projects" as const,
    cardId: `home-card-${study.slug}`,
    audience: ["recruiter", "client"] as Array<"recruiter" | "client">,
    body: [
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
  }));

  const resumeSkills = Object.entries(content.resume.skills).flatMap(([group, items]) => [group, ...items]);
  const experienceText = content.resume.experience
    .flatMap((entry) => [entry.title, entry.company, entry.client, entry.period, entry.location, ...entry.bullets, ...entry.tags])
    .join(" ");

  const toolsItem: SearchItem = {
    id: "skills-tools",
    title: content.home.tools_section.headline,
    snippet: content.home.tools_section.description,
    href: withBasePath("/#skills"),
    sectionId: "skills",
    audience: ["recruiter", "client"],
    body: [
      content.home.tools_section.headline,
      content.home.tools_section.description,
      content.home.tools_section.row_1.join(" "),
      content.home.tools_section.row_2.join(" "),
      content.resume.title,
      content.resume.bio,
      content.resume.tools.join(" "),
      resumeSkills.join(" "),
      experienceText,
      "skills tools figma react ai research design systems enterprise ux product design",
    ].join(" "),
  };

  const resumeItem: SearchItem = {
    id: "resume",
    title: "Resume",
    snippet: content.resume.title,
    href: withBasePath("/resume"),
    audience: ["recruiter"],
    body: [
      content.resume.name,
      content.resume.title,
      content.resume.bio,
      content.resume.location,
      content.resume.tools.join(" "),
      resumeSkills.join(" "),
      experienceText,
      content.resume.education.map((item) => `${item.degree} ${item.institution} ${item.year}`).join(" "),
      content.resume.certifications.map((item) => `${item.name} ${item.level} ${item.year}`).join(" "),
      "resume experience certifications senior product designer enterprise saas ai driven ux",
    ].join(" "),
  };

  const contactItem: SearchItem = {
    id: "contact",
    title: "Contact",
    snippet: content.contact.intro,
    href: withBasePath("/contact"),
    audience: ["client", "recruiter"],
    body: [
      content.contact.headline,
      content.contact.subheadline,
      content.contact.intro,
      content.contact.availability,
      content.contact.details.map((item) => `${item.label} ${item.value}`).join(" "),
      "contact email linkedin behance freelance remote malaga spain",
    ].join(" "),
  };

  const githubItem: SearchItem = {
    id: "github",
    title: "GitHub Activity",
    snippet: "Recent public GitHub work and repository activity.",
    href: withBasePath("/#github"),
    sectionId: "github",
    audience: ["recruiter", "client"],
    body: "github activity repositories commits pull requests public work code react next js front end design system",
  };

  return [...projectItems, toolsItem, resumeItem, contactItem, githubItem];
}

const SEARCH_ITEMS = buildSearchItems();

function scoreItem(tokens: string[], item: SearchItem) {
  const itemTokens = unique(tokenize(`${item.title} ${item.snippet} ${item.body}`));
  const tokenSet = new Set(itemTokens);
  let score = 0;

  for (const token of tokens) {
    if (tokenSet.has(token)) {
      score += item.title.toLowerCase().includes(token) ? 4 : item.snippet.toLowerCase().includes(token) ? 3 : 1;
    }
  }

  const wholeQuery = tokens.join(" ");
  if (wholeQuery && `${item.title} ${item.snippet} ${item.body}`.toLowerCase().includes(wholeQuery)) {
    score += 3;
  }

  return score;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const viewer = request.nextUrl.searchParams.get("viewer");

  if (!query) {
    return NextResponse.json({
      response: "Ask about projects, case studies, skills, resume, contact details, or GitHub activity on this website.",
      items: [],
    });
  }

  const tokens = unique(tokenize(query));
  const filteredItems = SEARCH_ITEMS.filter((item) => {
    if (!item.audience?.length) {
      return true;
    }

    return viewer === "recruiter" || viewer === "client" ? item.audience.includes(viewer) : true;
  });

  const rankedItems = filteredItems
    .map((item) => ({ item, score: scoreItem(tokens, item) }))
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
    return NextResponse.json({
      response:
        "I can only provide information already available on this website. I couldn't find that here.",
      items: [],
    });
  }

  const projectCount = rankedItems.filter((item) => item.sectionId === "projects").length;
  const response =
    projectCount > 1
      ? `I found ${projectCount} matching projects and a few related sections on this website.`
      : projectCount === 1
        ? `I found 1 matching project on this website and a few relevant places to continue.`
        : `I found relevant information on this website for "${query}".`;

  return NextResponse.json({ response, items: rankedItems });
}

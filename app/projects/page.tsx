"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Badge } from "../../components/ui/badge";
import { Container } from "../../components/ui/container";
import { Heading } from "../../components/ui/heading";
import { appendLockedNayyaPlaceholder } from "../../lib/cms/locked-placeholder";
import {
  isHiddenCaseStudySlug,
  resolveProjectListCardId,
  resolveProjectListCardImage,
  resolveProjectHref,
  resolveTrustedLogo,
  usePublicCaseStudies,
  usePublicSiteContent,
} from "../../lib/cms/public";
import { useLanguage } from "../../lib/i18n/language-context";
import { useTranslate, useTranslateTag } from "../../lib/i18n/use-translate";
import { getVisibleProjectTags } from "../../lib/project-tags";
import type { DictionaryKey } from "../../lib/i18n/dictionary";

const FILTER_PILLS = ["All", "UX Research", "Product Design", "Design Systems", "AI Product", "Compliance", "Accessibility"];
const PROJECT_FILTERS = FILTER_PILLS.filter((filter) => filter !== "All");
const PROJECT_BACKGROUNDS: Record<string, string> = {
  reversetech: "linear-gradient(180deg, #eef4fb 0%, #eef4fb 100%)",
  "benefits-enrollment": "radial-gradient(ellipse at 82% 50%, #b7daf1 11%, #e9f3fb 64%, #edf5fb 98%)",
  "nayya-ai-benefits": "radial-gradient(ellipse at 20% 50%, #cfe9f7 0%, #f0f7ff 72%)",
  "flock-accessibility-system": "radial-gradient(ellipse at 80% 20%, #c8f0e0 0%, #edf5fb 70%)",
  "i9-everify-integration": "radial-gradient(ellipse at 50% 80%, #d9e7f5 0%, #f3f8fc 72%)",
};
const FREELANCE_PROJECT_SLUGS = new Set([
  "classical-word",
  "protecta",
  "reversetech",
  "calendar-keeper",
  "zapiano-marketing",
]);

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

function getProjectCardDescription(description: string) {
  const trimmed = description.trim();
  const sentenceEnd = trimmed.search(/[.!?](?:\s|$)/);
  const firstSentence = sentenceEnd >= 0 ? trimmed.slice(0, sentenceEnd + 1) : trimmed;

  if (firstSentence.length <= 126) {
    return firstSentence;
  }

  return `${firstSentence.slice(0, 126).replace(/\s+\S*$/, "").trimEnd()}…`;
}

function ProjectsPage() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const translate = useTranslate();
  const translateTag = useTranslateTag();
  const { caseStudies } = usePublicCaseStudies();
  const { siteContent } = usePublicSiteContent();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const allProjects = appendLockedNayyaPlaceholder(caseStudies ?? [], language);
  const initialFilter = searchParams.get("filter");
  const initialTopic = searchParams.get("topic");

  useEffect(() => {
    if (initialFilter && FILTER_PILLS.includes(initialFilter)) {
      setActiveFilters(initialFilter === "All" ? [] : [initialFilter]);
      setActiveTopic(null);
      return;
    }

    setActiveFilters([]);
    setActiveTopic(initialTopic);
  }, [initialFilter, initialTopic]);
  
  const projects = allProjects
    .filter((project) => project?.slug && !isHiddenCaseStudySlug(project.slug))
    .sort(compareCaseStudyPriority)
    .map((project) => ({
      ...project,
      cardId: resolveProjectListCardId(project.slug),
      title: project.title ?? translate("projectsPage.untitledProject"),
      company: project.company ?? "",
      year: project.year ?? 0,
      description: getProjectCardDescription(project.tagline ?? ""),
      tags: project.tags ?? [],
      filters: project.filters?.length ? project.filters : project.tags ?? [],
      stat: project.metrics?.[0]?.value ?? `${project.year ?? ""}`,
      statLabel: project.metrics?.[0]?.label ?? project.industry ?? "",
      previewImage: resolveProjectListCardImage(project.slug, project.images?.cover || project.images?.hero || ""),
      background: PROJECT_BACKGROUNDS[project.slug] ?? "radial-gradient(ellipse at 20% 50%, #d4e8ff 0%, #edf5fb 70%)",
    }));
  const filteredProjects = useMemo(() => {
    const normalizedTopic = activeTopic?.trim().toLowerCase() ?? null;

    return projects.filter((project) => {
      if (activeFilters.length > 0 && !activeFilters.some((filter) => (project.filters ?? []).includes(filter))) {
        return false;
      }

      if (!normalizedTopic) {
        return true;
      }

      const searchableValues = [
        project.title,
        project.company,
        project.tagline,
        project.industry,
        ...(project.tags ?? []),
        ...(project.filters ?? []),
      ]
        .filter(Boolean)
        .map((value) => String(value).toLowerCase());

      return searchableValues.some((value) => value.includes(normalizedTopic));
    });
  }, [activeFilters, activeTopic, projects]);
  const projectFilterCounts = projects.reduce<Record<string, number>>((counts, project) => {
    for (const filter of project.filters ?? []) {
      counts[filter] = (counts[filter] ?? 0) + 1;
    }

    return counts;
  }, {});
  const projectGroups = [
    {
      title: translate("projectsPage.companyProjects"),
      description: translate("projectsPage.companyProjectsDescription"),
      projects: filteredProjects.filter((project) => !FREELANCE_PROJECT_SLUGS.has(project.slug)),
    },
    {
      title: translate("projectsPage.freelanceProjects"),
      description: translate("projectsPage.freelanceProjectsDescription"),
      projects: filteredProjects
        .filter((project) => FREELANCE_PROJECT_SLUGS.has(project.slug))
        .sort((left, right) => {
          const rank = (slug: string) => (slug === "calendar-keeper" ? 0 : slug === "protecta" ? 2 : 1);
          return rank(left.slug) - rank(right.slug);
        }),
    },
  ].filter((group) => group.projects.length > 0);
  const requiredCollaborators = [
    { name: "Zapiano", logo: "/images/zapiano-logo.svg" },
    { name: "Habitat for Humanity", logo: "/images/habitat-for-humanity.svg" },
    { name: "Elevation", logo: "/images/elevation-mark.png" },
    { name: "Indeed", logo: "/images/indeed-logo.svg" },
  ];
  const trustedClients = [
    ...(siteContent?.home?.trusted_by?.clients ?? []),
    ...requiredCollaborators.filter(
      (collaborator) => !siteContent?.home?.trusted_by?.clients?.some((client) => client.name === collaborator.name),
    ),
  ];
  const socialLogos = trustedClients.map((client) => ({
    src: resolveTrustedLogo(client.name, client.logo),
    alt: client.name,
    h: client.name === "Skill" ? 59 : client.name === "Zapiano" ? 38 : client.name === "Habitat for Humanity" ? 36 : client.name === "Elevation" ? 36 : client.name === "Indeed" ? 34 : client.name === "Hakuna" ? 30 : client.name === "Paychex" ? 51 : client.name === "Nayya" ? 48 : client.name === "Paramount+" ? 24 : client.name === "IBX" ? 34 : 41,
    w: client.name === "Skill" ? 107 : client.name === "Zapiano" ? 212 : client.name === "Habitat for Humanity" ? 108 : client.name === "Elevation" ? 234 : client.name === "Indeed" ? 126 : client.name === "Hakuna" ? 96 : client.name === "Paychex" ? 142 : client.name === "Nayya" ? 127 : client.name === "Paramount+" ? 94 : client.name === "IBX" ? 48 : 57,
  }));
  const logoCarousel = [...socialLogos, ...socialLogos];
  const mutedRingColor = "#a1a1a1";

  return (
    <main className="bg-white text-[#3c3e3f] overflow-x-hidden min-h-screen">
      <SiteHeader active="Projects" />

      <section className="bg-[#fcfafc]">
        <Container as="div" size="wide" className="px-6 pb-9 pt-12 sm:pb-12 sm:pt-16">
          <div className="max-w-[980px]">
            <p className="inline-flex items-center rounded-full bg-[#f8df36] px-5 py-2.5 text-sm font-medium text-[#141114]">
              {translate("projectsPage.workEyebrow")}
            </p>
            <h1 className="mt-8 font-inter text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.88] tracking-[-0.075em] text-[#141114]">
              {translate("projectsPage.heroTitle")}
              <span className="mt-1 block font-playfair font-normal italic tracking-[-0.055em] text-[#1183D0]">
                {translate("projectsPage.heroAccent")}
              </span>
            </h1>
            <p className="mt-8 max-w-[760px] text-lg leading-[1.65] text-[#5c5961] sm:text-[21px]">
              {translate("projectsPage.intro")}
            </p>
          </div>

          <div className="mt-16 border-t border-[#141114]/15 pt-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-3">
                <p className="shrink-0 text-base text-[#5c5961]" aria-live="polite">
                  {activeFilters.length > 0
                    ? translate("projectsPage.showingCasesIn").replace("{count}", String(filteredProjects.length))
                    : translate("projectsPage.showingProjects").replace("{count}", String(filteredProjects.length))}
                </p>
                {activeFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilters((selected) => selected.filter((item) => item !== filter))}
                    aria-label={`${translate("filter." + filter as DictionaryKey)}: ${translate("projectsPage.removeFilter")}`}
                    className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#f8df36] px-5 text-sm font-medium text-[#141114] transition-colors hover:bg-[#f2d92d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141114] focus-visible:ring-offset-2"
                  >
                    {translate(`filter.${filter}` as DictionaryKey)}
                    <span aria-hidden="true" className="text-lg leading-none text-[#5c5961]">×</span>
                  </button>
                ))}
                {activeFilters.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setActiveFilters([])}
                    className="text-sm text-[#5c5961] underline underline-offset-4 hover:text-[#141114]"
                  >
                    {translate("projectsPage.clearAll")}
                  </button>
                ) : null}
              </div>
              <div className="relative shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  aria-expanded={isFilterPanelOpen}
                  aria-controls="projects-filter-panel"
                  onClick={() => setIsFilterPanelOpen((open) => !open)}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[#e6e2e8] bg-white px-5 text-sm font-medium text-[#141114] transition-colors hover:bg-[#f3f3f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141114] focus-visible:ring-offset-2"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
                    <path d="M4 6h16M7 12h10m-7 6h4" />
                  </svg>
                  {translate("projectsPage.filterBy")}
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#f3f3f4] text-xs font-semibold">
                    {activeFilters.length}
                  </span>
                </button>
                {isFilterPanelOpen ? (
                  <div
                    id="projects-filter-panel"
                    className="absolute left-0 right-auto top-full z-30 mt-3 w-[min(360px,calc(100vw-3rem))] rounded-[24px] border border-[#e6e2e8] bg-white p-4 shadow-[0_18px_48px_rgba(20,17,20,0.12)] sm:left-auto sm:right-0 sm:p-6"
                  >
                    <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#5c5961]">
                      {translate("projectsPage.filterBy")}
                    </p>
                    <div className="space-y-1">
                      {PROJECT_FILTERS.map((filter) => (
                        <label
                          key={filter}
                          className={`flex cursor-pointer items-center gap-4 rounded-2xl px-3 py-3 transition-colors ${activeFilters.includes(filter) ? "bg-[#f3f3f4]" : "hover:bg-[#f8f8f9]"}`}
                        >
                          <input
                            type="checkbox"
                            checked={activeFilters.includes(filter)}
                            onChange={(event) => {
                              setActiveFilters((selected) =>
                                event.target.checked
                                  ? [...selected, filter]
                                  : selected.filter((selectedFilter) => selectedFilter !== filter),
                              );
                              setIsFilterPanelOpen(false);
                              setActiveTopic(null);
                            }}
                            className="size-5 shrink-0 accent-[#141114]"
                          />
                          <span className="min-w-0 flex-1 text-base text-[#141114]">
                            {translate(`filter.${filter}` as DictionaryKey)}
                          </span>
                          <span className="text-sm text-[#5c5961]">{projectFilterCounts[filter] ?? 0}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {activeTopic ? (
              <p className="mt-4 text-sm leading-relaxed text-[#1183D0]">
                {translate("projectsPage.showingRelatedTo")} <span className="font-semibold">{activeTopic}</span>.
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Project Grid */}
      <Container as="section" size="wide" className="flex flex-col gap-20 px-6 pb-24 pt-14">
        {projectGroups.map((group, index) => (
          <section key={group.title} className={index === 0 ? undefined : "border-t border-[#e6e2e8] pt-16"}>
            <div className="flex items-end justify-between gap-6">
              <Heading as="h2" variant="section" className="text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.02] text-[#141114]">
                {group.title}
              </Heading>
            </div>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#5c7792]">{group.description}</p>
            <div className="mt-8 grid gap-x-10 gap-y-12 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
              {group.projects.map((project, projectIndex) => (
                <Link
                  key={project.title}
                  id={project.cardId}
                  href={resolveProjectHref(project)}
                  className={`group block ${projectIndex % 2 === 1 ? "md:translate-y-12" : ""}`}
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden rounded-[var(--ui-radius-card)]"
                    style={{ background: project.background }}
                  >
                    {project.previewImage ? (
                      <Image
                        src={project.previewImage}
                        alt={translate("projectsPage.previewAlt").replace("{project}", project.title)}
                        fill
                        sizes="(max-width: 767px) 100vw, 520px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                      />
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm text-[var(--ui-color-text-muted)]">{project.company}</p>
                  <Heading
                    as="h3"
                    variant="card"
                    className="mt-1 line-clamp-2 text-[18px] leading-[1.25] transition-colors group-hover:text-[var(--ui-color-brand-primary)] md:text-[20px]"
                  >
                    {project.title}
                  </Heading>
                  <p className="mt-2 line-clamp-3 max-w-[38rem] text-[15px] leading-[1.48] text-[var(--ui-color-text-muted)] md:text-[16px]">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {getVisibleProjectTags(project.tags ?? []).map((tag) => (
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
      </Container>

      {/* Social proof */}
      <section className="flex min-h-[160px] flex-col items-center gap-6 border-t border-[#bcd2ff]/40 px-6 py-10 text-center md:px-10 lg:px-20">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#141114]">
          {translate("projectsPage.companiesWorkedWith")}
        </p>
        <div className="relative w-full max-w-[1200px] overflow-hidden md:py-2">
          <div className="flex w-max animate-[logo-marquee_22s_linear_infinite] items-center gap-14 pr-14 will-change-transform">
            {logoCarousel.map((logo, index) => (
              <Image
                key={`${logo.alt}-${index}`}
                src={logo.src}
                alt={index < socialLogos.length ? logo.alt : ""}
                width={logo.w}
                height={logo.h}
                aria-hidden={index >= socialLogos.length}
                className={`w-auto shrink-0 object-contain opacity-80 ${logo.alt === "Zapiano" || logo.alt === "Habitat for Humanity" || logo.alt === "Elevation" || logo.alt === "Indeed" ? "max-h-[28px]" : logo.alt === "Hakuna" ? "max-h-[22px]" : logo.alt === "Paramount+" ? "max-h-[18px]" : "max-h-[36px]"}`}
                style={{ filter: "brightness(0) saturate(100%)" }}
              />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProjectsPage />
    </Suspense>
  );
}

"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilterPillGroup } from "../../components/filter-pill-group";
import { ProjectCard } from "../../components/project-card";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
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

const FILTER_PILLS = ["All", "UX Research", "Product Design", "Design Systems", "AI Product", "Compliance", "Accessibility"];
const PROJECT_BACKGROUNDS: Record<string, string> = {
  "benefits-enrollment": "radial-gradient(ellipse at 82% 50%, #b7daf1 11%, #e9f3fb 64%, #edf5fb 98%)",
  "nayya-ai-benefits": "radial-gradient(ellipse at 20% 50%, #cfe9f7 0%, #f0f7ff 72%)",
  "flock-accessibility-system": "radial-gradient(ellipse at 80% 20%, #c8f0e0 0%, #edf5fb 70%)",
  "i9-everify-integration": "radial-gradient(ellipse at 50% 80%, #d9e7f5 0%, #f3f8fc 72%)",
};

function ProjectsPage() {
  const searchParams = useSearchParams();
  const { caseStudies } = usePublicCaseStudies();
  const { siteContent } = usePublicSiteContent();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const allProjects = appendLockedNayyaPlaceholder(caseStudies ?? []);
  const initialFilter = searchParams.get("filter");
  const initialTopic = searchParams.get("topic");

  useEffect(() => {
    if (initialFilter && FILTER_PILLS.includes(initialFilter)) {
      setActiveFilter(initialFilter);
      setActiveTopic(null);
      return;
    }

    setActiveFilter("All");
    setActiveTopic(initialTopic);
  }, [initialFilter, initialTopic]);
  
  const projects = allProjects.filter((project) => project?.slug && !isHiddenCaseStudySlug(project.slug)).map((project) => ({
    ...project,
    cardId: resolveProjectListCardId(project.slug),
    title: project.title ?? "Untitled Project",
    company: project.company ?? "",
    year: project.year ?? 0,
    tagline: project.tagline ?? "",
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
      if (activeFilter !== "All" && !(project.filters ?? []).includes(activeFilter)) {
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
  }, [activeFilter, activeTopic, projects]);
  const socialLogos = siteContent?.home?.trusted_by?.clients?.map((client) => ({
    src: resolveTrustedLogo(client.name, client.logo),
    alt: client.name,
    h: client.name === "Skill" ? 59 : client.name === "Hakuna" ? 30 : client.name === "Elevation" ? 56 : client.name === "Paychex" ? 51 : client.name === "Nayya" ? 48 : client.name === "Paramount+" ? 24 : client.name === "IBX" ? 34 : 41,
    w: client.name === "Skill" ? 107 : client.name === "Hakuna" ? 96 : client.name === "Elevation" ? 220 : client.name === "Paychex" ? 142 : client.name === "Nayya" ? 127 : client.name === "Paramount+" ? 94 : client.name === "IBX" ? 48 : 57,
  }));
  const mutedRingColor = "#a1a1a1";

  return (
    <main className="bg-white text-[#3c3e3f] overflow-x-hidden min-h-screen">
      <SiteHeader active="Projects" />

      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-10 text-center">
        <h1 className="font-inter text-[44px] leading-[1.05] text-[var(--ui-color-text-strong)]">Projects</h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#5c7792] mt-6">
          Case studies and highlights from 10+ years designing enterprise SaaS, healthtech, and nonprofit digital experiences.
        </p>
        {activeTopic ? (
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#1183D0]">
            Showing projects related to <span className="font-semibold">{activeTopic}</span>.
          </p>
        ) : null}

        {/* Filter Pills */}
        <div className="mt-8">
          <FilterPillGroup
            items={FILTER_PILLS}
            activeItem={activeFilter}
            onSelect={(filter) => {
              setActiveFilter(filter);
              if (filter !== "All") {
                setActiveTopic(null);
              }
            }}
          />
        </div>
      </section>

      {/* Project Grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20 flex flex-col gap-6">
        {filteredProjects.map((project, i) => (
          <ProjectCard
            key={project.title}
            id={project.cardId}
            href={resolveProjectHref(project)}
            title={project.title}
            company={project.company}
            year={project.year}
            tagline={project.tagline}
            tags={project.tags ?? []}
            previewImage={project.previewImage}
            previewAlt={`${project.title} preview`}
            stat={project.stat}
            statLabel={project.statLabel}
            background={project.background}
            locked={Boolean(project.password)}
            reversed={i % 2 === 1}
            ctaLabel={project.password ? "Password required ↗" : resolveProjectHref(project) === "#" ? "Coming soon" : "View case study ↗"}
          />
        ))}
      </section>

      {/* Social proof */}
      <section className="border-t border-[#bcd2ff]/40 py-10">
        <p className="mb-6 text-center text-[13px] font-semibold uppercase tracking-[0.45em] text-[var(--ui-color-text-strong)]">
          Companies I've worked with
        </p>
        <div className="flex items-center justify-center gap-10 flex-wrap px-6">
          {socialLogos.map((logo) => (
            <span
              key={logo.alt}
              aria-label={logo.alt}
              role="img"
              className={`block opacity-100 transition-opacity ${logo.alt === "Hakuna" ? "max-h-[30px]" : logo.alt === "Paramount+" ? "max-h-[24px]" : logo.alt === "Elevation" ? "max-h-[56px]" : "max-h-[58px]"}`}
              style={{
                width: `${logo.w}px`,
                height: `${logo.h}px`,
                backgroundColor: "var(--ui-color-text-strong)",
                WebkitMaskImage: `url(${logo.src})`,
                maskImage: `url(${logo.src})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
          ))}
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

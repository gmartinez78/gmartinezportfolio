"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
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
    bg: PROJECT_BACKGROUNDS[project.slug] ?? "radial-gradient(ellipse at 20% 50%, #d4e8ff 0%, #edf5fb 70%)",
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
        <h1 className="font-inter text-[44px] leading-[1.05] text-[#a1a1a1]">Projects</h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#5c7792] mt-6">
          Case studies and highlights from 10+ years designing enterprise SaaS, healthtech, and nonprofit digital experiences.
        </p>
        {activeTopic ? (
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#1183D0]">
            Showing projects related to <span className="font-semibold">{activeTopic}</span>.
          </p>
        ) : null}

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTER_PILLS.map((filter) => (
            <Badge
              key={filter}
              asChild
              variant={activeFilter === filter ? "default" : "outline"}
              size="tag"
            >
              <button
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => {
                  setActiveFilter(filter);
                  if (filter !== "All") {
                    setActiveTopic(null);
                  }
                }}
              >
                {filter}
              </button>
            </Badge>
          ))}
        </div>
      </section>

      {/* Project Grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20 flex flex-col gap-6">
        {filteredProjects.map((project, i) => (
          <Link
            key={project.title}
            id={project.cardId}
            data-project-list-card-id={project.cardId}
            href={resolveProjectHref(project)}
            className="group block transition-all duration-300 hover:-translate-y-1.5"
          >
            <Card className="relative flex overflow-hidden rounded-[40px] border border-white/55 bg-[linear-gradient(135deg,rgba(247,241,249,0.82)_0%,rgba(243,247,255,0.76)_40%,rgba(255,246,238,0.78)_100%)] p-0 py-0 shadow-[0_26px_70px_rgba(31,53,94,0.10)] backdrop-blur-xl transition-all duration-300 group-hover:border-white/75 group-hover:shadow-[0_34px_84px_rgba(31,53,94,0.14)] md:flex-row">
            <div className="pointer-events-none absolute -left-12 top-10 h-44 w-44 rounded-full bg-[#d8ebff]/70 blur-3xl" />
            <div className="pointer-events-none absolute right-10 top-0 h-36 w-36 rounded-full bg-[#f0d9ff]/55 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#ffe7c7]/60 blur-3xl" />
            {/* Preview */}
            <div
              className={`relative flex h-64 w-full shrink-0 items-center justify-center overflow-hidden border-b border-white/35 bg-white/22 p-5 md:h-auto md:w-[340px] md:border-b-0 ${i % 2 === 1 ? "md:order-2" : ""}`}
              style={!project.previewImage ? { background: project.bg } : undefined}
            >
              <div className={`relative h-full w-full overflow-hidden rounded-[30px] border border-white/60 bg-white/55 shadow-[0_18px_42px_rgba(31,53,94,0.08)] transition-transform duration-500 group-hover:scale-[1.03] ${i % 2 === 1 ? "md:rotate-[1.6deg]" : "md:rotate-[-1.6deg]"}`}>
                {project.previewImage ? (
                  <Image
                    src={project.previewImage}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 768px) 340px, 100vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-center">
                    <div>
                      <div className="text-5xl font-inter font-bold text-[#1183D0]">{project.stat}</div>
                      <div className="mx-auto mt-1 max-w-[120px] text-xs leading-tight text-[#5c7792]">{project.statLabel}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <CardContent className="relative flex flex-1 flex-col justify-between bg-transparent p-8 md:p-9">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/72 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">
                    {project.company}
                  </span>
                  <span className="rounded-full bg-white/62 px-3 py-1 text-[11px] font-medium text-[#6a7e9d]">
                    {project.year}
                  </span>
                  {project.password ? (
                    <span className="rounded-full bg-[#eaf4ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1183D0]">Locked</span>
                  ) : null}
                </div>
                <h2 className="mb-5 text-[28px] font-inter leading-[1.08] text-[rgb(14_41_81/var(--tw-text-opacity,1))]">{project.title}</h2>
                <p className="max-w-[560px] text-[15px] leading-[1.8] text-[#5c7792]">{project.tagline}</p>
              </div>
              <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {(project.tags ?? []).map((tag) => (
                    <Badge key={tag} size="tag">{tag}</Badge>
                  ))}
                </div>
                <span className="rounded-full bg-white/72 px-4 py-2 text-sm font-medium text-[#1183D0] transition-colors group-hover:bg-white">
                  {project.password ? "Password required ↗" : resolveProjectHref(project) === "#" ? "Coming soon" : "View case study ↗"}
                </span>
              </div>
            </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* Social proof */}
      <section className="border-t border-[#bcd2ff]/40 py-10">
        <p className="mb-6 text-center text-[13px] font-semibold uppercase tracking-[0.45em] text-[#a1a1a1]">
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
                backgroundColor: "#a1a1a1",
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

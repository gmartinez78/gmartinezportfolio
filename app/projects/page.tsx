"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { SectionHeading } from "../../components/ui/section-heading";
import { appendLockedNayyaPlaceholder } from "../../lib/cms/locked-placeholder";
import {
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

export default function ProjectsPage() {
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
  
  const projects = allProjects.filter(p => p?.slug).map((project) => ({
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

  return (
    <main className="bg-[#F0F7FF] text-[#3c3e3f] overflow-x-hidden min-h-screen">
      <SiteHeader active="Projects" />

      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-10 text-center">
        <SectionHeading eyebrow="Selected Work" title="Projects" centered />
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
            className="group block transition-all hover:-translate-y-0.5"
          >
            <Card className="flex p-0 py-0 transition-shadow hover:shadow-[0_12px_40px_#00000018] md:flex-row">
            {/* Preview */}
            <div
              className={`w-full md:w-80 shrink-0 h-60 md:h-auto flex items-center justify-center relative overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}
              style={!project.previewImage ? { background: project.bg } : undefined}
            >
              {project.previewImage ? (
                <Image
                  src={project.previewImage}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="object-cover object-center"
                />
              ) : (
                <div className="text-center">
                  <div className="text-5xl font-serif-display italic font-bold text-[#1183D0]">{project.stat}</div>
                  <div className="text-xs text-[#5c7792] mt-1 max-w-[120px] mx-auto leading-tight">{project.statLabel}</div>
                </div>
              )}
            </div>

            {/* Content */}
            <CardContent className="flex flex-1 flex-col justify-between p-8">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-xs text-[#5c7792] font-medium">{project.company}</span>
                  <span className="text-[#bcd2ff]">·</span>
                  <span className="text-xs text-[#5c7792]">{project.year}</span>
                  {project.password ? (
                    <>
                      <span className="text-[#bcd2ff]">·</span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1183D0]">Locked</span>
                    </>
                  ) : null}
                </div>
                <h2 className="text-2xl font-serif-display italic text-[#0e2951] leading-snug mb-5">{project.title}</h2>
                <p className="text-[#5c7792] text-sm leading-relaxed">{project.tagline}</p>
              </div>
              <div className="flex items-end justify-between mt-6 flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {(project.tags ?? []).map((tag) => (
                    <Badge key={tag} size="tag">{tag}</Badge>
                  ))}
                </div>
                <span className="text-sm text-[#1183D0] font-medium group-hover:underline">
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
        <p className="text-center text-[13px] font-semibold text-[#1183D0] uppercase tracking-[0.45em] mb-6">Companies I've worked with</p>
        <div className="flex items-center justify-center gap-10 flex-wrap px-6">
          {socialLogos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={logo.h}
              className={`w-auto object-contain opacity-80 grayscale transition-all hover:grayscale-0 hover:opacity-100 ${logo.alt === "Hakuna" ? "max-h-[30px] brightness-0 saturate-0 opacity-45 hover:opacity-70" : logo.alt === "Paramount+" ? "max-h-[24px]" : logo.alt === "Elevation" ? "max-h-[56px] mix-blend-multiply" : "max-h-[58px]"}`}
            />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

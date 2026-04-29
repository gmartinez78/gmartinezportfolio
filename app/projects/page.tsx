"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { SectionHeading } from "../../components/ui/section-heading";
import {
  resolveProjectHref,
  resolveTrustedLogo,
  usePublicCaseStudies,
  usePublicSiteContent,
} from "../../lib/cms/public";

const FILTER_PILLS = ["All", "UX Research", "Product Design", "Design Systems", "Mobile", "Accessibility"];
const PROJECT_BACKGROUNDS: Record<string, string> = {
  "benefits-enrollment": "radial-gradient(ellipse at 82% 50%, #b7daf1 11%, #e9f3fb 64%, #edf5fb 98%)",
  "nayya-ai-benefits": "radial-gradient(ellipse at 20% 50%, #d4e8ff 0%, #edf5fb 70%)",
  "easterseals-portal": "radial-gradient(ellipse at 80% 20%, #c8f0e0 0%, #edf5fb 70%)",
  "transport-for-troops": "radial-gradient(ellipse at 50% 80%, #ffe8c0 0%, #edf5fb 70%)",
};

export default function ProjectsPage() {
  const { caseStudies } = usePublicCaseStudies();
  const { siteContent } = usePublicSiteContent();
  const [activeFilter, setActiveFilter] = useState("All");
  const projects = caseStudies.map((project) => ({
    ...project,
    filters: project.filters?.length ? project.filters : project.tags,
    stat: project.metrics[0]?.value ?? `${project.year ?? ""}`,
    statLabel: project.metrics[0]?.label ?? project.industry ?? "",
    bg: PROJECT_BACKGROUNDS[project.slug] ?? "radial-gradient(ellipse at 20% 50%, #d4e8ff 0%, #edf5fb 70%)",
  }));
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => (project.filters ?? []).includes(activeFilter));
  const socialLogos = siteContent.home.trusted_by.clients.map((client) => ({
    src: resolveTrustedLogo(client.name, client.logo),
    alt: client.name,
    h: client.name === "Skill" ? 59 : client.name === "Paychex" ? 51 : client.name === "Nayya" ? 48 : 41,
    w: client.name === "Skill" ? 107 : client.name === "Paychex" ? 142 : client.name === "Nayya" ? 127 : 57,
  }));

  return (
    <main className="bg-[#F0F7FF] text-[#3c3e3f] overflow-x-hidden min-h-screen">
      <SiteHeader active="Projects" />

      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-10">
        <SectionHeading eyebrow="Selected Work" title="Projects" />
        <p className="text-[#5c7792] text-lg max-w-xl leading-relaxed">
          Case studies and highlights from 10+ years designing enterprise SaaS, healthtech, and nonprofit digital experiences.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-8">
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
                onClick={() => setActiveFilter(filter)}
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
          <a
            key={project.title}
            href={resolveProjectHref(project)}
            className="group block transition-all hover:-translate-y-0.5"
          >
            <Card className="flex p-0 py-0 transition-shadow hover:shadow-[0_12px_40px_#00000018] md:flex-row">
            {/* Preview */}
            <div
              className={`w-full md:w-80 shrink-0 h-60 md:h-auto flex items-center justify-center relative overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}
              style={{ background: project.bg }}
            >
              <div className="text-center">
                <div className="text-5xl font-serif-display italic font-bold text-[#1183D0]">{project.stat}</div>
                <div className="text-xs text-[#5c7792] mt-1 max-w-[120px] mx-auto leading-tight">{project.statLabel}</div>
              </div>
            </div>

            {/* Content */}
            <CardContent className="flex flex-1 flex-col justify-between p-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-[#5c7792] font-medium">{project.company}</span>
                  <span className="text-[#bcd2ff]">·</span>
                  <span className="text-xs text-[#5c7792]">{project.year}</span>
                </div>
                <h2 className="text-2xl font-serif-display italic text-[#0e2951] leading-snug mb-3">{project.title}</h2>
                <p className="text-[#5c7792] text-sm leading-relaxed">{project.tagline}</p>
              </div>
              <div className="flex items-end justify-between mt-6 flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} size="tag">{tag}</Badge>
                  ))}
                </div>
                <span className="text-sm text-[#1183D0] font-medium group-hover:underline">
                  {resolveProjectHref(project) === "#" ? "Coming soon" : "View case study ↗"}
                </span>
              </div>
            </CardContent>
            </Card>
          </a>
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
              className="max-h-[58px] w-auto object-contain opacity-80 grayscale transition-all hover:grayscale-0 hover:opacity-100"
            />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

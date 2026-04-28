"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { SectionHeading } from "../../components/ui/section-heading";
import { withBasePath } from "../../lib/site";


const FILTER_PILLS = [
  "All",
  "UX Research",
  "Product Design",
  "Design Systems",
  "Mobile",
  "Accessibility",
];

const PROJECTS = [
  {
    slug: "benefits",
    title: "Enhancing Benefits Enrollment",
    company: "Independence Blue Cross",
    tags: ["HR/Payroll SaaS", "UX Research", "Interaction Design", "Design Systems"],
    filters: ["UX Research", "Product Design", "Design Systems"],
    description:
      "Redesigned the employee benefits enrollment experience for a Fortune 500 insurer, reducing support tickets by 72% and cutting enrollment time from 47 to 13 minutes.",
    stat: "72%",
    statLabel: "reduction in support tickets",
    bg: "radial-gradient(ellipse at 82% 50%, #b7daf1 11%, #e9f3fb 64%, #edf5fb 98%)",
    year: "2024",
  },
  {
    slug: "#",
    title: "AI-Powered Benefits Advisor",
    company: "Nayya",
    tags: ["AI/ML Product", "UX Research", "Prototyping"],
    filters: ["UX Research", "Product Design"],
    description:
      "Designed the conversational UX for an AI-driven benefits recommendation engine that helped employees understand and select the right coverage for their life stage.",
    stat: "4.8★",
    statLabel: "average user satisfaction",
    bg: "radial-gradient(ellipse at 20% 50%, #d4e8ff 0%, #edf5fb 70%)",
    year: "2022",
  },
  {
    slug: "#",
    title: "Accessible Service Portal",
    company: "Easterseals",
    tags: ["Accessibility", "Web Design", "Nonprofit"],
    filters: ["Product Design", "Accessibility"],
    description:
      "Redesigned the public-facing portal for a nonprofit serving people with disabilities, achieving WCAG 2.1 AA compliance and reducing task completion time by 40%.",
    stat: "40%",
    statLabel: "faster task completion",
    bg: "radial-gradient(ellipse at 80% 20%, #c8f0e0 0%, #edf5fb 70%)",
    year: "2020",
  },
  {
    slug: "#",
    title: "Ride Coordination Mobile App",
    company: "Transport for Troops",
    tags: ["Mobile", "Brand Design", "Startup"],
    filters: ["Product Design", "Mobile"],
    description:
      "Built a mobile app from zero to launch for a veteran-focused logistics nonprofit, enabling ride coordination for 200+ volunteers and reducing dispatcher workload by 60%.",
    stat: "60%",
    statLabel: "less dispatcher workload",
    bg: "radial-gradient(ellipse at 50% 80%, #ffe8c0 0%, #edf5fb 70%)",
    year: "2018",
  },
];

const SOCIAL_LOGOS = [
  { src: withBasePath("/images/SNUZw.png"), alt: "IBX", h: 41, w: 57 },
  { src: withBasePath("/images/IbuV3.png"), alt: "Skill", h: 59, w: 107 },
  { src: withBasePath("/images/bBw3A.png"), alt: "Nayya", h: 48, w: 127 },
  { src: withBasePath("/images/c54fy.png"), alt: "Paychex", h: 51, w: 142 },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.filters.includes(activeFilter));

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
            href={project.slug === "#" ? "#" : withBasePath(`/${project.slug}`)}
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
                <p className="text-[#5c7792] text-sm leading-relaxed">{project.description}</p>
              </div>
              <div className="flex items-end justify-between mt-6 flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} size="tag">{tag}</Badge>
                  ))}
                </div>
                <span className="text-sm text-[#1183D0] font-medium group-hover:underline">
                  {project.slug === "#" ? "Coming soon" : "View case study ↗"}
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
          {SOCIAL_LOGOS.map((logo) => (
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

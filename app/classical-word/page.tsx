"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass, LayoutPanelTop, Palette } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProjectTeaserCard } from "@/components/project-teaser-card";
import { withBasePath } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/language-context";
import { useTranslate } from "@/lib/i18n/use-translate";
import {
  isHiddenCaseStudySlug,
  resolveHomeCardId,
  resolveHomeCardImage,
  resolveProjectHref,
  usePublicCaseStudies,
} from "@/lib/cms/public";
import { getClassicalWordCopy } from "./copy";

const principleIcons = [LayoutPanelTop, Palette, Compass];

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

function isFreelanceProject(project: { slug?: string | null; title?: string | null; company?: string | null }) {
  const slug = project.slug?.trim().toLowerCase();
  const title = project.title?.trim().toLowerCase();
  const company = project.company?.trim().toLowerCase();

  return (
    (slug ? FREELANCE_PROJECT_SLUGS.has(slug) : false) ||
    title === "classical word arabic institute" ||
    company === "classical word"
  );
}

export default function ClassicalWordPage() {
  const { language } = useLanguage();
  const translate = useTranslate();
  const { caseStudies } = usePublicCaseStudies();
  const t = getClassicalWordCopy(language);

  const otherProjects = caseStudies
    .filter(
      (project) =>
        project.slug !== "classical-word" &&
        project.status === "published" &&
        !isHiddenCaseStudySlug(project.slug) &&
        isFreelanceProject(project),
    )
    .slice(0, 3)
    .map((project) => ({
      ...project,
      cardId: resolveHomeCardId(project.slug),
      previewImage: resolveHomeCardImage(project.slug, project.images?.cover || project.images?.hero || ""),
      background: PROJECT_BACKGROUNDS[project.slug] ?? "radial-gradient(ellipse at 20% 50%, #d4e8ff 0%, #edf5fb 70%)",
    }));

  return (
    <main className="overflow-hidden bg-white text-[#141114]">
      <SiteHeader active="Projects" behavior="reveal" />

      <section className="relative isolate overflow-hidden bg-white">
        <div className="relative mx-auto max-w-[1240px] px-6 pt-6 md:px-10 lg:px-20">
          <nav className="flex flex-wrap items-center gap-3 text-sm text-[#5c5960]" aria-label="Breadcrumb">
            <Link href={withBasePath("/")} className="text-[#451044] transition-colors hover:text-[#0E6FB4]">{t.breadcrumbHome}</Link>
            <span className="text-[#aaa5aa]">›</span>
            <Link href={withBasePath("/projects")} className="transition-colors hover:text-[#0E6FB4]">{t.breadcrumbProjects}</Link>
            <span className="text-[#aaa5aa]">›</span>
            <span className="min-w-0 break-words font-semibold text-[#141114]">{t.breadcrumbCurrent}</span>
          </nav>
        </div>
        <div className="relative mx-auto grid max-w-[1240px] gap-12 px-6 py-16 md:px-10 lg:items-center lg:px-20 lg:py-24">
          <div>
            <span className="inline-flex rounded-full bg-[#f8df36] px-4 py-2 font-inter text-xs font-semibold text-[#141114]">{t.pill}</span>
            <h1 className="mt-6 max-w-[860px] font-inter text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.055em] text-[#141114]">
              {t.titleLead}{" "}
              <span className="font-playfair font-normal italic tracking-[-0.045em]">{t.titleAccent}</span>
            </h1>
            <p className="mt-7 max-w-[560px] text-[17px] leading-[1.7] text-[#5c5960]">
              {t.lede}
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-[#5c5960]" aria-label="Project details">
              {t.details.map((detail, index) => (
                <span key={detail} className="inline-flex items-center gap-3">
                  {index > 0 ? <span aria-hidden="true">·</span> : null}
                  <span>{detail}</span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#0E6FB4]">{t.printEyebrow}</p>
              <h2 className="mt-3 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                {t.printTitleLead}{" "}
                <span className="font-playfair font-normal italic tracking-[-0.045em]">{t.printTitleAccent}</span>
              </h2>
              <p className="mt-5 text-[17px] leading-[1.7] text-[#5c5960]">{t.printBody}</p>
            </div>
            <div className="relative overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white p-2 shadow-[0_30px_70px_rgba(20,17,20,0.12)] sm:p-3">
              <Image src={withBasePath("/images/projects/classical-word/cover-classical-word.png")} alt={t.printImageAlt} width={1448} height={1086} className="h-auto w-full rounded-[14px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-20">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#0E6FB4]">{t.directionEyebrow}</p>
            <h2 className="mx-auto mt-3 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              {t.directionTitleLead}{" "}
              <span className="font-playfair font-normal italic tracking-[-0.045em]">{t.directionTitleAccent}</span>
            </h2>
            <p className="mt-5 text-[17px] leading-[1.7] text-[#5c5960]">{t.directionBody}</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {t.principles.map(({ title, body }, index) => {
              const Icon = principleIcons[index] ?? LayoutPanelTop;
              return (
                <article key={title} className="relative overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white p-7 shadow-[0_12px_30px_rgba(20,17,20,0.05)]">
                  <span className="absolute right-5 top-3 font-inter text-[64px] font-semibold leading-none text-[#f8df36]/45">0{index + 1}</span>
                  <Icon className="h-6 w-6 text-[#0E6FB4]" strokeWidth={1.5} />
                  <h3 className="mt-7 font-inter text-[20px] font-semibold leading-tight text-[#141114]">{title}</h3>
                  <p className="mt-4 text-[14px] leading-[1.75] text-[#5c5960]">{body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 lg:px-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#0E6FB4]">{t.pieceEyebrow}</p>
            <h2 className="mt-3 max-w-[560px] font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              {t.pieceTitleLead}{" "}
              <span className="font-playfair font-normal italic tracking-[-0.045em]">{t.pieceTitleAccent}</span>
            </h2>
          </div>
          <p className="max-w-[520px] text-[17px] leading-[1.7] text-[#5c5960]">{t.pieceBody}</p>
        </div>
        <div className="relative mt-12 overflow-hidden rounded-[20px] border border-[#d7d2d3] shadow-[0_30px_70px_rgba(20,17,20,0.12)]">
          <Image src={withBasePath("/images/projects/classical-word/brochure-cover-panels.png")} alt={t.coverAlt} width={1584} height={1225} className="h-auto w-full rounded-[20px]" />
        </div>
        <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5c5960]">{t.coverCaption}</p>
        <div className="relative mt-12 overflow-hidden rounded-[20px] border border-[#d7d2d3] shadow-[0_30px_70px_rgba(20,17,20,0.12)]">
          <Image src={withBasePath("/images/projects/classical-word/brochure-inside-panels.png")} alt={t.insideAlt} width={1584} height={1225} className="h-auto w-full rounded-[20px]" />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-1 md:px-10 xl:px-20">
        <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#5c5960]">{translate("caseStudy.moreWork")}</p>
        <h2 className="mb-8 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">{translate("caseStudy.otherProjects")}</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {otherProjects.map((project) => (
            <ProjectTeaserCard
              key={project.slug}
              id={project.cardId}
              href={resolveProjectHref(project)}
              dataCardId={project.cardId}
              title={project.title}
              description={project.tagline ?? ""}
              tags={project.tags}
              image={project.previewImage}
              imageAlt={`${project.title} case study preview for ${project.company}`}
              background={project.background}
              ctaLabel={project.external_link ? translate("home.viewProject") : t.viewCaseStudy}
            />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

"use client";

import Image from "next/image";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { SectionHeading } from "./components/ui/section-heading";
import {
  resolveCertificationLogo,
  resolveProjectHref,
  resolveProjectImage,
  resolveToolIcon,
  resolveTrustedLogo,
  usePublicCaseStudies,
  usePublicSiteContent,
} from "./lib/cms/public";
import { withBasePath } from "./lib/site";

const TOOLS_LEFT = [
  { label: "Figma", x: "left-[78px]", y: "top-[72px]", size: "lg" as const, tone: "white" as const },
  { label: "Angular", x: "left-[235px]", y: "top-[36px]", size: "lg" as const, tone: "white" as const },
  { label: "Miro", x: "left-[405px]", y: "top-[18px]", size: "lg" as const, tone: "white" as const },
  { label: "React", x: "left-[130px]", y: "top-[230px]", size: "sm" as const, tone: "white" as const },
  { label: "HTML", x: "left-[78px]", y: "top-[340px]", size: "sm" as const, tone: "white" as const },
  { label: "Jira", x: "left-[305px]", y: "top-[124px]", size: "sm" as const, tone: "white" as const },
  { label: "Confluence", x: "left-[488px]", y: "top-[110px]", size: "sm" as const, tone: "white" as const },
  { label: "Maze", x: "left-[395px]", y: "top-[252px]", size: "sm" as const, tone: "white" as const },
  { label: "Notion", x: "left-[260px]", y: "top-[354px]", size: "sm" as const, tone: "white" as const },
  { label: "Webex", x: "left-[550px]", y: "top-[385px]", size: "sm" as const, tone: "white" as const },
];

const TOOLS_RIGHT = [
  { label: "Copilot", x: "right-[410px]", y: "top-[18px]", size: "sm" as const, tone: "white" as const },
  { label: "Slack", x: "right-[250px]", y: "top-[52px]", size: "sm" as const, tone: "white" as const },
  { label: "Claude", x: "right-[92px]", y: "top-[92px]", size: "sm" as const, tone: "white" as const },
  { label: "ChatGPT", x: "right-[345px]", y: "top-[170px]", size: "sm" as const, tone: "white" as const },
  { label: "VS Code", x: "right-[62px]", y: "top-[232px]", size: "sm" as const, tone: "white" as const },
  { label: "Figma", x: "right-[210px]", y: "top-[365px]", size: "sm" as const, tone: "white" as const },
  { label: "React", x: "right-[460px]", y: "top-[382px]", size: "sm" as const, tone: "white" as const },
  { label: "Jira", x: "right-[500px]", y: "top-[118px]", size: "sm" as const, tone: "white" as const },
  { label: "Miro", x: "right-[205px]", y: "top-[268px]", size: "sm" as const, tone: "white" as const },
  { label: "Notion", x: "right-[380px]", y: "top-[350px]", size: "sm" as const, tone: "white" as const },
];

function ToolBadge({
  label,
  x,
  y,
  size,
  tone,
}: {
  label: string;
  x: string;
  y: string;
  size: "lg" | "sm";
  tone: "white" | "blue";
}) {
  const sizeClass =
    size === "lg"
      ? "h-[74px] w-[74px] rounded-[16px]"
      : "h-16 w-16 rounded-[15px]";
  const toneClass =
    tone === "white"
      ? "bg-white shadow-[0_18px_42px_rgba(14,41,81,0.10)]"
      : "bg-white shadow-[0_18px_42px_rgba(14,41,81,0.10)]";

  return (
    <div
      className={`absolute ${x} ${y} z-0 ${sizeClass} ${toneClass} flex items-center justify-center opacity-55`}
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

export default function PortfolioPage() {
  const { siteContent } = usePublicSiteContent();
  const { caseStudies } = usePublicCaseStudies();
  const socialProofLogos = siteContent.home.trusted_by.clients.map((client) => ({
    src: resolveTrustedLogo(client.name, client.logo),
    alt: client.name,
    h: client.name === "Skill" ? 59 : client.name === "Paychex" ? 51 : client.name === "Nayya" ? 48 : 41,
    w: client.name === "Skill" ? 107 : client.name === "Paychex" ? 142 : client.name === "Nayya" ? 127 : 57,
  }));
  const logoCarousel = [...socialProofLogos, ...socialProofLogos];
  const certifications = siteContent.home.certifications.map((item) => ({
    ...item,
    logo: resolveCertificationLogo(item.name, item.logo),
  }));
  const methodologyChips = siteContent.home.hero.methodology_chips.length
    ? siteContent.home.hero.methodology_chips
    : ["AI product design", "UX research", "Enterprise SaaS", "Design systems"];
  const featuredProjects = caseStudies.slice(0, 3).map((study) => ({
    title: study.title,
    description: study.tagline ?? "",
    image: resolveProjectImage(study.slug, study.images.cover),
    href: resolveProjectHref(study),
    tags: study.tags.slice(0, 4),
    cta: study.slug === "benefits-enrollment" ? "See case study" : "See improvements",
  }));

  return (
    <main className="bg-[#F0F7FF] text-[#3c3e3f] overflow-x-hidden">
      <SiteHeader />

      {/* ── Hero ── */}
      <section className="bg-white px-4 py-5 sm:px-6 lg:px-10">
        <div className="relative mx-auto min-h-[560px] max-w-[1440px] overflow-hidden rounded-[28px] bg-[#102944] px-6 py-10 shadow-[0_24px_80px_rgba(14,41,81,0.18)] sm:px-10 lg:px-16 lg:py-16">
          <Image
            src={withBasePath("/images/k58t4.png")}
            alt=""
            fill
            priority
            className="object-cover opacity-35 blur-[1px] scale-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,20,35,0.92)_0%,rgba(8,20,35,0.72)_48%,rgba(8,20,35,0.3)_100%)]" />
          <div className="relative grid min-h-[440px] gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="flex max-w-[760px] flex-col justify-center">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#7CB8E8]">
                Product Designer
              </p>
              <h1 className="text-[44px] font-semibold leading-[1.05] text-white sm:text-[64px] lg:text-[82px]">
                {siteContent.home.hero.greeting}
              </h1>
              <p className="mt-8 max-w-[660px] text-xl font-semibold leading-[1.35] text-white sm:text-2xl">
                {siteContent.home.hero.tagline}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {methodologyChips.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-white/70 bg-white/10 text-white backdrop-blur hover:bg-white/10 hover:text-white"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="sm"
                >
                  <a href={withBasePath("/projects")}>View selected work</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <a href={withBasePath("/contact")}>Let&apos;s work together</a>
                </Button>
              </div>
            </div>

            <aside className="flex flex-col items-start gap-4 rounded-[22px] border border-white/20 bg-white/12 p-5 text-white backdrop-blur-md lg:ml-auto lg:w-[260px]">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Certified by
              </span>
              <div className="flex items-center gap-4">
                {certifications.slice(0, 2).map((item) => (
                  <div key={item.name} className="rounded-2xl bg-white/95 p-2 transition-opacity hover:opacity-85">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={86}
                      height={86}
                      className="h-[72px] w-[72px] object-contain sm:h-[86px] sm:w-[86px]"
                    />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-10">
          <div className="flex min-h-[104px] flex-col items-start gap-5 px-6 py-6 md:flex-row md:items-center md:px-10 lg:px-20">
            <div className="flex shrink-0 items-center md:h-full md:w-[280px] md:pr-10">
              <span className="text-[13px] font-semibold text-[#3c3e3f]">
                {siteContent.home.trusted_by.label}
              </span>
            </div>
            <div className="relative w-full flex-1 overflow-hidden md:py-2">
              <div className="flex w-max animate-[logo-marquee_22s_linear_infinite] items-center gap-14 pr-14 hover:[animation-play-state:paused]">
                {logoCarousel.map((logo, index) => (
                  <Image
                    key={`${logo.alt}-${index}`}
                    src={logo.src}
                    alt={index < socialProofLogos.length ? logo.alt : ""}
                    width={logo.w}
                    height={logo.h}
                    aria-hidden={index >= socialProofLogos.length}
                    className="max-h-[58px] w-auto shrink-0 object-contain opacity-80 grayscale transition-all hover:grayscale-0 hover:opacity-100"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recent Work ── */}
      <section id="projects" className="bg-white py-12 px-6 md:px-10 xl:px-20">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-12">
          <SectionHeading eyebrow="Portfolio" title="Recent Work" centered />

          {/* Project cards */}
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                className="group flex cursor-pointer flex-col gap-5 outline-none"
              >
                {/* Image */}
                <div className="relative h-[230px] overflow-hidden rounded-[28px] bg-[#e9f3fb] shadow-[0_18px_52px_rgba(14,41,81,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_70px_rgba(14,41,81,0.22)] group-focus-visible:-translate-y-1 group-focus-visible:shadow-[0_28px_70px_rgba(14,41,81,0.22)] sm:h-[300px] xl:h-[230px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                  />
                </div>

                {/* Tags – always visible */}
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} size="tag">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-serif-display italic text-[30px] leading-snug text-[#1183D0] transition-colors duration-200 group-hover:text-[#0e2951] group-focus-visible:text-[#0e2951]">
                  {project.title}
                </h3>

                <div className="-mt-2 h-[116px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <div className="flex h-full flex-col justify-between">
                    {/* Description */}
                    <p className="text-[14px] leading-relaxed text-[#5c7792]">
                      {project.description}
                    </p>

                    {/* CTA */}
                    <span className="inline-flex text-[14px] font-medium text-[#1183D0] underline-offset-2 group-hover:underline group-focus-visible:underline">
                      {project.cta} →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ── Tools Section ── */}
      <section
        className="relative isolate overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F0F7FF 48%, rgba(17,131,208,0.28) 100%)",
          height: 520,
        }}
      >
        {TOOLS_LEFT.map((t) => (
          <ToolBadge key={t.label} {...t} />
        ))}

        <div
          className="absolute z-10 flex flex-col items-center gap-3.5 text-center"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: 112,
            width: 500,
          }}
        >
          <span className="text-[13px] font-medium tracking-[3px] text-[#0a1729] uppercase">
            Experience &amp; Skills
          </span>
          <h2 className="font-serif-display italic text-[48px] leading-[1.15] text-[#1183D0] w-full text-center">
            {siteContent.home.tools_section.headline.split(" & ").map((part, index, parts) => (
              <span key={part}>
                {part}
                {index < parts.length - 1 ? <><br />&amp; </> : null}
              </span>
            ))}
          </h2>
          <p className="text-[15px] leading-[1.6] text-[#3c3e3f] max-w-[409px]">
            {siteContent.home.tools_section.description}
          </p>
          <Button
            asChild
            variant="link"
            className="mt-7 h-auto gap-4 px-0 text-sm font-normal leading-none text-[#1183D0] hover:no-underline"
          >
            <a href={withBasePath(siteContent.home.tools_section.cta_href)}>{siteContent.home.tools_section.cta_label.replace("→", "").trim()} <span className="text-[22px] leading-none">→</span></a>
          </Button>
        </div>

        {TOOLS_RIGHT.map((t) => (
          <ToolBadge key={t.label} {...t} />
        ))}
      </section>

      {/* ── CTA Section ── */}
      <section
        className="flex flex-col items-center justify-center gap-7 px-6 py-[80px] md:px-16 xl:px-30 text-center"
        style={{ background: "#0e2951" }}
      >
        <span className="text-[13px] font-medium tracking-[3px] text-[#7CB8E8] uppercase">
          Ready to Level Up?
        </span>
        <p className="text-[28px] leading-[1.5] text-[#A8C8E8] max-w-[800px]">
          {siteContent.home.stat_banner.text} {siteContent.home.stat_banner.value} {siteContent.home.stat_banner.value_label}
        </p>
        <h2 className="font-serif-display font-bold text-[40px] text-white">
          {siteContent.home.stat_banner.cta_headline}
        </h2>
        <Button
          asChild
          size="sm"
        >
          <a href={withBasePath(siteContent.home.stat_banner.cta_href.replace("#contact", "/contact"))}>
            {siteContent.home.stat_banner.cta_label.replace("→", "").trim()}
          </a>
        </Button>
      </section>

      <SiteFooter />
    </main>
  );
}

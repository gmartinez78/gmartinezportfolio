"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { TypewriterBanner } from "./components/typewriter-banner";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { SectionHeading } from "./components/ui/section-heading";
import {
  resolveCertificationLogo,
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

export default function PortfolioPage() {
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
  const certifications = siteContent.home.certifications.map((item) => ({
    ...item,
    logo: resolveCertificationLogo(item.name, item.logo),
  }));
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
  const heroDescription = "Building products end to end, from UX architecture and design systems to cross-functional execution that ships.";

  return (
    <main className="bg-[#F0F7FF] text-[#3c3e3f] overflow-x-hidden">
      <SiteHeader />

      {/* ── Hero ── */}
      <section className="bg-white px-4 py-5 sm:px-6 lg:px-10">
        <div className="relative mx-auto min-h-[560px] max-w-[1440px] overflow-hidden rounded-[28px] bg-[#102944] px-6 py-10 shadow-[0_24px_80px_rgba(14,41,81,0.18)] sm:px-10 lg:px-16 lg:py-16">
          <Image
            src={withBasePath(hero.photo || "/images/projects/benefits-enrollment/hero/benefits-hero.png")}
            alt={hero.greeting}
            fill
            priority
            className="pointer-events-none object-cover opacity-35 blur-[1px] scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,20,35,0.92)_0%,rgba(8,20,35,0.72)_48%,rgba(8,20,35,0.3)_100%)]" />
          <div className="relative grid min-h-[440px] gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="flex max-w-[760px] flex-col justify-center">
              <TypewriterBanner
                greeting={hero.greeting}
                roles={[hero.tagline]}
                description={heroDescription}
              />
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
                  <Link href={withBasePath("/projects")}>View selected work</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <Link href={withBasePath("/contact")}>Let&apos;s work together</Link>
                </Button>
              </div>
            </div>

            <aside className="flex flex-col items-start gap-4 p-5 text-white lg:ml-auto lg:w-[260px]">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Certified by
              </span>
              <div className="flex items-center gap-4">
                {certifications.slice(0, 2).map((item) => (
                  <div key={item.name} className="p-2 transition-opacity hover:opacity-85">
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
                    className={`w-auto shrink-0 object-contain opacity-80 grayscale transition-all hover:grayscale-0 hover:opacity-100 ${logo.alt === "Hakuna" ? "max-h-[30px] brightness-0 saturate-0 opacity-45 hover:opacity-70" : logo.alt === "Paramount+" ? "max-h-[24px]" : logo.alt === "Elevation" ? "max-h-[56px] mix-blend-multiply" : "max-h-[58px]"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recent Work ── */}
      <section id="projects" className="bg-white py-12 px-6 md:px-10 xl:px-20">
        <div className="mx-auto flex w-full flex-col items-center gap-12">
          <SectionHeading eyebrow="Portfolio" title="Recent Work" centered />

          {/* Project cards */}
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.title}
                id={project.cardId}
                data-home-card-id={project.cardId}
                href={project.href}
                className="group flex w-full min-w-0 cursor-pointer flex-col gap-5 outline-none"
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
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── Tools Section ── */}
      <section
        className="relative isolate overflow-hidden px-6 py-16 md:px-10 lg:h-[520px] xl:px-20"
      >
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
                      <Image
                        src={resolveToolIcon(label)}
                        alt={label}
                        width={26}
                        height={26}
                        className="h-[26px] w-[26px] object-contain"
                      />
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
          <Button
            asChild
            variant="link"
            className="mt-2 h-auto gap-4 px-0 text-sm font-normal leading-none text-[#1183D0] hover:no-underline"
          >
            <Link href={withBasePath(siteContent.home.tools_section.cta_href)}>
              {siteContent.home.tools_section.cta_label.replace("→", "").trim()} <span className="text-[22px] leading-none">→</span>
            </Link>
          </Button>
        </div>
        {TOOLS_RIGHT.map((tool) => (
          <ToolBadge key={`right-${tool.label}-${tool.x}`} {...tool} />
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
        <h2 className="font-serif-display italic font-bold text-[40px] text-white">
          {siteContent.home.stat_banner.cta_headline}
        </h2>
        <Button
          asChild
          size="sm"
        >
          <Link href={withBasePath(siteContent.home.stat_banner.cta_href.replace("#contact", "/contact"))}>
            {siteContent.home.stat_banner.cta_label.replace("→", "").trim()}
          </Link>
        </Button>
      </section>

      <SiteFooter />
    </main>
  );
}

import Image from "next/image";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { withBasePath } from "./lib/site";

const SOCIAL_PROOF_LOGOS = [
  { src: "/images/SNUZw.png", alt: "IBX", h: 41, w: 57 },
  { src: "/images/IbuV3.png", alt: "Skill", h: 59, w: 107 },
  { src: "/images/bBw3A.png", alt: "Nayya", h: 48, w: 127 },
  { src: "/images/c54fy.png", alt: "Paychex", h: 51, w: 142 },
];

const LOGO_CAROUSEL = [...SOCIAL_PROOF_LOGOS, ...SOCIAL_PROOF_LOGOS];

const HERO_TAGS = ["AI product design", "UX research", "Enterprise SaaS", "Design systems"];

const PROJECTS = [
  {
    title: "Enhancing Benefits Enrollment",
    description:
      "Replaced a manual workflow with a centralized, self-managed platform; cutting processing time by 72%.",
    image: "/images/AxnrM.png",
    href: withBasePath("/benefits"),
    tags: ["Enterprise", "SaaS", "HR Tech", "B2C"],
    cta: "See case study",
  },
  {
    title: "Nayya AI Integration",
    description:
      "AI-powered benefits navigation across desktop and mobile, simplifying enrollment decisions for 2.3M+ users.",
    image: "/images/k58t4.png",
    href: "#",
    tags: ["SaaS", "AI Features", "FinTech", "B2C"],
    cta: "See improvements",
  },
  {
    title: "Paychex HR Platform",
    description:
      "End-to-end redesign of hiring and onboarding flows, reducing support calls by 9,000+ per year.",
    image: "/images/AxnrM.png",
    href: "#",
    tags: ["Enterprise", "SaaS", "Hiring", "Research"],
    cta: "See improvements",
  },
];

const TOOLS_LEFT = [
  { label: "Figma", x: "left-[60px]", y: "top-[80px]", size: "lg" as const, bg: "bg-white" },
  { label: "Framer", x: "left-[170px]", y: "top-[40px]", size: "lg" as const, bg: "bg-white" },
  { label: "Miro", x: "left-[290px]", y: "top-[20px]", size: "lg" as const, bg: "bg-white" },
  { label: "React", x: "left-[100px]", y: "top-[230px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Node", x: "left-[60px]", y: "top-[332px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Python", x: "left-[190px]", y: "top-[346px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Swift", x: "left-[394px]", y: "top-[372px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "TS", x: "left-[220px]", y: "top-[130px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "Vue", x: "left-[350px]", y: "top-[120px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "Go", x: "left-[282px]", y: "top-[234px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "SQL", x: "left-[320px]", y: "top-[320px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
];

const TOOLS_RIGHT = [
  { label: "GitHub", x: "right-[300px]", y: "top-[20px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Slack", x: "right-[180px]", y: "top-[40px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "AWS", x: "right-[70px]", y: "top-[80px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Vercel", x: "right-[50px]", y: "top-[230px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Docker", x: "right-[76px]", y: "top-[336px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Tailwind", x: "right-[194px]", y: "top-[372px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Next.js", x: "right-[386px]", y: "top-[384px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Rust", x: "right-[360px]", y: "top-[120px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "Redis", x: "right-[168px]", y: "top-[256px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "GPT", x: "right-[250px]", y: "top-[160px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "GCP", x: "right-[270px]", y: "top-[340px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
];

function ToolBadge({
  label,
  x,
  y,
  size,
  bg,
}: {
  label: string;
  x: string;
  y: string;
  size: "lg" | "sm";
  bg: string;
}) {
  const base =
    size === "lg"
      ? "w-13 h-13 rounded-xl text-[9px]"
      : "w-11 h-11 rounded-[10px] opacity-70 text-[9px]";
  return (
    <div
      className={`absolute ${x} ${y} ${base} ${bg} flex items-center justify-center shadow-sm text-[#3c3e3f] font-medium font-inter`}
    >
      {label}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <main className="bg-[#F0F7FF] font-inter text-[#3c3e3f] overflow-x-hidden">
      <SiteHeader />

      {/* ── Hero ── */}
      <section className="bg-white px-4 py-5 sm:px-6 lg:px-10">
        <div className="relative mx-auto min-h-[560px] max-w-[1440px] overflow-hidden rounded-[28px] bg-[#102944] px-6 py-10 shadow-[0_24px_80px_rgba(14,41,81,0.18)] sm:px-10 lg:px-16 lg:py-16">
          <Image
            src="/images/k58t4.png"
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
                I am Greddys Martinez
              </h1>
              <p className="mt-8 max-w-[660px] text-xl font-semibold leading-[1.35] text-white sm:text-2xl">
                Senior Product Designer focused on AI-assisted UX, enterprise SaaS, and design systems that help teams ship clearer product experiences.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {HERO_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/70 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-12 rounded-full bg-white px-7 text-sm font-semibold text-[#102944] hover:bg-[#E0EEFB]"
                >
                  <a href={withBasePath("/projects")}>View selected work</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-white/80 bg-transparent px-7 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
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
                <a
                  href="https://www.upwork.com/freelancers/greddysmartinez"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-white/95 p-2 transition-opacity hover:opacity-85"
                >
                  <Image
                    src="/images/iNSrn.png"
                    alt="Upwork Skill Certification"
                    width={86}
                    height={86}
                    className="h-[72px] w-[72px] object-contain sm:h-[86px] sm:w-[86px]"
                  />
                </a>
                <div className="rounded-2xl bg-white/95 p-2">
                  <Image
                    src="/images/OiSjn.png"
                    alt="NN Group UX Certification"
                    width={86}
                    height={86}
                    className="h-[72px] w-[72px] object-contain sm:h-[86px] sm:w-[86px]"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="-mx-4 border-y border-[#bcd2ff]/50 bg-[#F0F7FF] sm:-mx-6 lg:-mx-10">
          <div className="flex min-h-[104px] flex-col items-start gap-5 px-6 py-6 md:flex-row md:items-center md:px-10 lg:px-20">
            <div className="flex shrink-0 items-center md:h-full md:w-[280px] md:border-r md:border-[#00006e]/25 md:pr-10">
              <span className="text-[13px] font-semibold text-[#3c3e3f]">
                Trusted by industry leaders
              </span>
            </div>
            <div className="relative w-full flex-1 overflow-hidden md:py-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F0F7FF] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F0F7FF] to-transparent" />
              <div className="flex w-max animate-[logo-marquee_22s_linear_infinite] items-center gap-14 pr-14 hover:[animation-play-state:paused]">
                {LOGO_CAROUSEL.map((logo, index) => (
                  <Image
                    key={`${logo.alt}-${index}`}
                    src={logo.src}
                    alt={index < SOCIAL_PROOF_LOGOS.length ? logo.alt : ""}
                    width={logo.w}
                    height={logo.h}
                    aria-hidden={index >= SOCIAL_PROOF_LOGOS.length}
                    className="max-h-[58px] w-auto shrink-0 object-contain opacity-80 grayscale transition-all hover:grayscale-0 hover:opacity-100"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recent Work ── */}
      <section id="projects" className="bg-white py-12 px-20">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-12">
          <h2 className="font-serif-display italic text-[36px] leading-[1.2] text-[#1183D0]">
            Recent Work
          </h2>

          {/* Project cards */}
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
            {PROJECTS.map((project) => (
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
                    <Badge
                      key={tag}
                      className="h-auto rounded-full border-0 bg-[#E0EEFB] px-5 py-2 text-[14px] font-semibold text-[#1183D0] hover:bg-[#E0EEFB]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-serif-display italic text-[30px] leading-snug text-[#1183D0] transition-colors duration-200 group-hover:text-[#0e2951] group-focus-visible:text-[#0e2951]">
                  {project.title}
                </h3>

                <div className="-mt-2 grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
                  <div className="overflow-hidden">
                    {/* Description */}
                    <p className="text-[14px] leading-relaxed text-[#5c7792]">
                      {project.description}
                    </p>

                    {/* CTA */}
                    <span className="mt-4 inline-flex text-[14px] font-medium text-[#1183D0] underline-offset-2 group-hover:underline group-focus-visible:underline">
                      {project.cta} →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* View all work CTA */}
          <Button className="h-9 rounded-full bg-[#d60060] px-5 text-[13px] font-medium text-white hover:bg-[#b5004e]">
            View all work
          </Button>
        </div>
      </section>

      {/* ── Tools Section ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #F0F7FF 0%, #DCEEFB 100%)",
          height: 453,
        }}
      >
        {TOOLS_LEFT.map((t) => (
          <ToolBadge key={t.label} {...t} />
        ))}

        <div
          className="absolute flex flex-col items-center gap-3.5 text-center"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: 80,
            width: 500,
          }}
        >
          <span className="text-[13px] font-medium tracking-[3px] text-[#0a1729] uppercase">
            Experience &amp; Skills
          </span>
          <h2 className="font-serif-display italic text-[48px] leading-[1.15] text-[#1183D0] w-full text-center">
            Tools I Love
            <br />
            &amp; Work With
          </h2>
          <p className="text-[15px] leading-[1.6] text-[#3c3e3f] max-w-[409px]">
            I integrate seamlessly with the tools your team already uses,
            creating workflows that feel natural and efficient.
          </p>
          <Button
            asChild
            className="h-11 rounded-full bg-[#d60060] px-7 text-[14px] font-medium text-white hover:bg-[#b5004e]"
          >
            <a href="#resume">View My Resume <span>→</span></a>
          </Button>
        </div>

        {TOOLS_RIGHT.map((t) => (
          <ToolBadge key={t.label} {...t} />
        ))}
      </section>

      {/* ── CTA Section ── */}
      <section
        className="flex flex-col items-center justify-center gap-7 text-center px-30 py-25"
        style={{ background: "#0e2951" }}
      >
        <span className="text-[13px] font-medium tracking-[3px] text-[#7CB8E8] uppercase">
          Ready to Level Up?
        </span>
        <p className="text-[28px] leading-[1.5] text-[#A8C8E8] max-w-[800px]">
          Last quarter, my clients saw a 47% average increase in conversions.
        </p>
        <h2 className="font-serif-display font-bold text-[40px] text-white">
          Your product deserves that too.
        </h2>
        <Button
          asChild
          className="h-13 rounded-full bg-white px-9 text-[15px] font-medium text-[#0b182c] hover:bg-gray-100"
        >
          <a href="#contact">Let&apos;s work together <span>→</span></a>
        </Button>
      </section>

      <SiteFooter />
    </main>
  );
}

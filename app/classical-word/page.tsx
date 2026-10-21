import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, LayoutPanelTop, Palette, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { withBasePath } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { LocalizedCaseStudyRoute } from "@/components/localized-case-study-route";

export const metadata: Metadata = buildMetadata({
  title: "Classical Word Arabic Institute | Print Design Case Study",
  description: "A warm, editorial trifold brochure design for Classical Word Arabic Institute.",
  path: "/classical-word",
  image: "/images/projects/classical-word/brochure-cover-panels.png",
  type: "article",
});

const principles = [
  {
    icon: LayoutPanelTop,
    title: "A considered reading path",
    body: "The outside introduces the institute, sets the invitation, and makes enrollment tangible. The inside expands the story from purpose to faculty credibility.",
  },
  {
    icon: Palette,
    title: "A visual language with roots",
    body: "Ivory paper tones, a measured gold accent, editorial serif type, and delicate geometric patterning create a calm, heritage-led identity.",
  },
  {
    icon: Compass,
    title: "Clarity at every fold",
    body: "Headlines, pricing, QR actions, testimonials, and faculty profiles are sequenced to make the programme easy to understand and act on.",
  },
];

export default function ClassicalWordPage() {
  return (
    <LocalizedCaseStudyRoute slug="classical-word">
    <main className="overflow-hidden bg-[#faf8f7] text-[#141114]">
      <SiteHeader active="Projects" behavior="reveal" />

      <section className="relative isolate overflow-hidden border-b border-[#d7d2d3] bg-[#faf8f7]">
        <div className="relative mx-auto max-w-[1240px] px-6 pt-6 md:px-10 lg:px-20">
          <nav className="flex flex-wrap items-center gap-3 text-sm text-[#5c5960]" aria-label="Breadcrumb">
            <Link href={withBasePath("/")} className="text-[#451044] transition-colors hover:text-[#1183D0]">Home</Link>
            <span className="text-[#aaa5aa]">›</span>
            <Link href={withBasePath("/projects")} className="transition-colors hover:text-[#1183D0]">Projects</Link>
            <span className="text-[#aaa5aa]">›</span>
            <span className="min-w-0 break-words font-semibold text-[#141114]">Classical Word Arabic Institute</span>
          </nav>
        </div>
        <div className="relative mx-auto grid max-w-[1240px] gap-12 px-6 py-16 md:px-10 lg:items-center lg:px-20 lg:py-24">
          <div>
            <div>
              <span className="inline-flex rounded-full bg-[#f8df36] px-4 py-2 font-inter text-xs font-semibold text-[#141114]">Print design · 2026</span>
            </div>
            <h1 className="mt-6 max-w-[860px] font-inter text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.055em] text-[#141114]">
              Classical Word Arabic Institute{" "}
              <span className="font-playfair font-normal italic tracking-[-0.045em]">brochure.</span>
            </h1>
            <p className="mt-7 max-w-[560px] text-[17px] leading-[1.7] text-[#5c5960]">
              Classical Word is a six-panel trifold created to introduce an Arabic learning institute through its faculty, values, and an inviting path to enrollment.
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-[#5c5960]" aria-label="Project details">
              {["2026", "Brand & Print Designer", "Client: Classical Word"].map((detail, index) => (
                <span key={detail} className="inline-flex items-center gap-3">
                  {index > 0 ? <span aria-hidden="true">·</span> : null}
                  <span>{detail}</span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d7d2d3] bg-[#faf8f7] py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#1183D0]">Print presentation</p>
              <h2 className="mt-3 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
                The brand, from first fold to the{" "}
                <span className="font-playfair font-normal italic tracking-[-0.045em]">full story.</span>
              </h2>
              <p className="mt-5 text-[17px] leading-[1.7] text-[#5c5960]">A three-part presentation that introduces the visual language, compares both sides of the brochure, then reveals the full interior.</p>
            </div>
            <div className="relative overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white p-2 shadow-[0_30px_70px_rgba(20,17,20,0.12)] sm:p-3">
              <Image src={withBasePath("/images/projects/classical-word/cover-classical-word.png")} alt="Classical Word Arabic Institute brochure cover" width={1448} height={1086} loading="eager" className="h-auto w-full rounded-[14px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d7d2d3] bg-[#faf8f7] py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-20">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#1183D0]">Design direction</p>
            <h2 className="mx-auto mt-3 font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              Designed to feel considered, not{" "}
              <span className="font-playfair font-normal italic tracking-[-0.045em]">crowded.</span>
            </h2>
            <p className="mt-5 text-[17px] leading-[1.7] text-[#5c5960]">The visual system leans into the warmth of traditional print materials while giving every message a clear hierarchy and enough room to breathe.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, body }, index) => <article key={title} className="relative overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white p-7 shadow-[0_12px_30px_rgba(20,17,20,0.05)]"><span className="absolute right-5 top-3 font-inter text-[64px] font-semibold leading-none text-[#f8df36]/45">0{index + 1}</span><Icon className="h-6 w-6 text-[#1183D0]" strokeWidth={1.5} /><h3 className="mt-7 font-inter text-[20px] font-semibold leading-tight text-[#141114]">{title}</h3><p className="mt-4 text-[14px] leading-[1.75] text-[#5c5960]">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 lg:px-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#1183D0]">The complete piece</p>
            <h2 className="mt-3 max-w-[560px] font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#141114]">
              An interior that turns information into an{" "}
              <span className="font-playfair font-normal italic tracking-[-0.045em]">experience.</span>
            </h2>
          </div>
          <p className="max-w-[520px] text-[17px] leading-[1.7] text-[#5c5960]">The reverse side gives the programme’s story more depth: why Classical Arabic matters, what learners can expect, and the faculty credentials that establish trust.</p>
        </div>
        <div className="relative mt-12 overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white p-2 shadow-[0_30px_70px_rgba(20,17,20,0.12)] sm:p-3">
          <Image src={withBasePath("/images/projects/classical-word/brochure-cover-panels.png")} alt="Outside panels of the Classical Word Arabic Institute trifold brochure" width={1900} height={1469} loading="eager" className="h-auto w-full rounded-[14px]" />
        </div>
        <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5c5960]">Outside panels · cover, enrollment and contact</p>
        <div className="relative mt-12 overflow-hidden rounded-[20px] border border-[#d7d2d3] bg-white p-2 shadow-[0_30px_70px_rgba(20,17,20,0.12)] sm:p-4">
          <Image src={withBasePath("/images/projects/classical-word/brochure-inside-panels.png")} alt="Inside panels of the Classical Word Arabic Institute trifold brochure" width={1900} height={1469} className="h-auto w-full rounded-[18px]" />
        </div>
      </section>

      <section className="bg-[#141114] px-6 py-20 text-white md:px-10 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
          <Sparkles className="h-7 w-7 text-[#f8df36]" strokeWidth={1.4} />
          <p className="mt-7 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#1183D0]">Portfolio project</p>
          <h2 className="mt-4 max-w-[760px] font-inter text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-white">Good print design guides the eye before it asks for attention.</h2>
          <Link href={withBasePath("/projects")} className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#f8df36] px-5 py-3 text-[13px] font-semibold text-[#141114] transition-colors hover:bg-white">Explore more work <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
    </LocalizedCaseStudyRoute>
  );
}

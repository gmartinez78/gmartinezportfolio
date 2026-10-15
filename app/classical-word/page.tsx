import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Compass, LayoutPanelTop, Palette, Sparkles } from "lucide-react";
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

const details = [
  ["Client", "Classical Word Arabic Institute"],
  ["Deliverable", "Six-panel trifold brochure"],
  ["Focus", "Brand storytelling & information design"],
  ["Format", "Print + digital-ready collateral"],
];

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
    <main className="overflow-hidden bg-[#fbf8f1] text-[#1f1a16]">
      <SiteHeader active="Projects" behavior="reveal" />

      <section className="relative isolate overflow-hidden border-b border-[#9a702d]/15 bg-[#f7f2e8]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:radial-gradient(circle_at_1px_1px,rgba(154,112,45,0.22)_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full border border-[#a97a36]/25" />
        <div className="pointer-events-none absolute -right-12 top-1/2 h-[340px] w-[340px] -translate-y-1/2 rotate-45 border border-[#a97a36]/20" />
        <div className="relative mx-auto grid max-w-[1240px] gap-12 px-6 py-16 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-20 lg:py-24">
          <div>
            <Link href={withBasePath("/projects")} className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#987033] transition-colors hover:text-[#6c4d1e]">
              <ArrowLeft className="h-4 w-4" /> Back to projects
            </Link>
            <p className="mt-12 text-[12px] font-semibold uppercase tracking-[0.32em] text-[#a27336]">Print design / 2026</p>
            <h1 className="mt-5 max-w-[600px] font-inter text-[52px] leading-[0.97] text-[#241d17] sm:text-[68px] lg:text-[76px]">
              A brochure with a sense of place.
            </h1>
            <p className="mt-7 max-w-[520px] text-[17px] leading-[1.8] text-[#62564a]">
              Classical Word is a six-panel trifold created to introduce an Arabic learning institute through its faculty, values, and an inviting path to enrollment.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#a27336]/35 bg-[#fffdf8]/70 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#775521]">Editorial layout</span>
              <span className="rounded-full border border-[#a27336]/35 bg-[#fffdf8]/70 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#775521]">Brand collateral</span>
              <span className="rounded-full border border-[#a27336]/35 bg-[#fffdf8]/70 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#775521]">Information design</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[730px]">
            <div className="absolute -inset-7 -z-10 rounded-[44px] bg-[#c29a5c]/15 blur-3xl" />
            <div className="overflow-hidden rounded-[22px] border border-[#9a702d]/20 bg-[#fffdf8] p-2 shadow-[0_30px_70px_rgba(66,45,20,0.18)] sm:p-3">
              <Image src={withBasePath("/images/projects/classical-word/brochure-cover-panels.png")} alt="Outside panels of the Classical Word Arabic Institute trifold brochure" width={1900} height={1469} loading="eager" className="h-auto w-full rounded-[14px]" />
            </div>
            <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6b3e]">Outside panels · cover, enrollment and contact</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 lg:px-20 lg:py-24">
        <div className="grid border-y border-[#a27336]/20 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(([label, value]) => <div key={label} className="border-[#a27336]/15 px-0 py-5 sm:px-6 sm:py-2 sm:odd:border-l lg:first:border-l-0 lg:border-l"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9c7439]">{label}</p><p className="mt-2 text-[15px] leading-snug text-[#3c3026]">{value}</p></div>)}
        </div>
      </section>

      <section className="border-y border-[#a27336]/15 bg-[#f3ecdf] py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-20">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#a27336]">Print presentation</p>
            <h2 className="mt-4 font-inter text-[40px] leading-tight text-[#241d17] sm:text-[52px]">The brand, from first fold to the full story.</h2>
            <p className="mt-5 text-[16px] leading-[1.8] text-[#62564a]">A three-part presentation that introduces the visual language, compares both sides of the brochure, then reveals the full interior.</p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              ["The Brand", "/images/projects/classical-word/behance/classical-word-behance-01-brand.png", "A closer look at the visual language and an open trifold."],
              ["Two Open Views", "/images/projects/classical-word/behance/classical-word-behance-02-open-views.png", "Exterior and interior panels, shown side by side."],
              ["Fully Open", "/images/projects/classical-word/behance/classical-word-behance-03-fully-open.png", "The complete interior reading experience."],
            ].map(([title, src, caption]) => (
              <figure key={title} className="overflow-hidden rounded-[20px] border border-[#a27336]/20 bg-[#fffdf8] p-2 shadow-[0_14px_36px_rgba(74,53,26,0.08)]">
                <Image src={withBasePath(src)} alt={`${title} presentation for the Classical Word trifold brochure`} width={1600} height={1510} className="h-auto w-full rounded-[14px]" />
                <figcaption className="p-5"><p className="font-inter text-[24px] text-[#2e251e]">{title}</p><p className="mt-2 text-[13px] leading-[1.65] text-[#6c5d4d]">{caption}</p></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#a27336]/15 bg-[#f3ecdf] py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-20">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#a27336]">Design direction</p>
            <h2 className="mt-4 font-inter text-[40px] leading-tight text-[#241d17] sm:text-[52px]">Designed to feel considered, not crowded.</h2>
            <p className="mt-5 text-[16px] leading-[1.8] text-[#62564a]">The visual system leans into the warmth of traditional print materials while giving every message a clear hierarchy and enough room to breathe.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, body }, index) => <article key={title} className="relative overflow-hidden rounded-[20px] border border-[#a27336]/20 bg-[#fffdf8] p-7 shadow-[0_12px_30px_rgba(74,53,26,0.05)]"><span className="absolute right-5 top-3 font-inter text-[64px] leading-none text-[#b68a4d]/15">0{index + 1}</span><Icon className="h-6 w-6 text-[#a27336]" strokeWidth={1.5} /><h3 className="mt-7 font-inter text-[26px] leading-tight text-[#2e251e]">{title}</h3><p className="mt-4 text-[14px] leading-[1.75] text-[#6c5d4d]">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 lg:px-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#a27336]">The complete piece</p>
            <h2 className="mt-4 max-w-[560px] font-inter text-[42px] leading-[1.06] text-[#241d17] sm:text-[58px]">An interior that turns information into an experience.</h2>
          </div>
          <p className="max-w-[520px] text-[16px] leading-[1.8] text-[#62564a]">The reverse side gives the programme’s story more depth: why Classical Arabic matters, what learners can expect, and the faculty credentials that establish trust.</p>
        </div>
        <div className="relative mt-12 overflow-hidden rounded-[26px] border border-[#9a702d]/20 bg-[#fffdf8] p-2 shadow-[0_30px_70px_rgba(66,45,20,0.12)] sm:p-4">
          <Image src={withBasePath("/images/projects/classical-word/brochure-inside-panels.png")} alt="Inside panels of the Classical Word Arabic Institute trifold brochure" width={1900} height={1469} className="h-auto w-full rounded-[18px]" />
        </div>
      </section>

      <section className="bg-[#29231d] px-6 py-20 text-[#faf5ea] md:px-10 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
          <Sparkles className="h-7 w-7 text-[#d5af68]" strokeWidth={1.4} />
          <p className="mt-7 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#d5af68]">Portfolio project</p>
          <h2 className="mt-4 max-w-[760px] font-inter text-[40px] leading-tight sm:text-[54px]">Good print design guides the eye before it asks for attention.</h2>
          <Link href={withBasePath("/projects")} className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#d5af68]/50 px-5 py-3 text-[13px] font-semibold transition-colors hover:bg-[#d5af68] hover:text-[#29231d]">Explore more work <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
    </LocalizedCaseStudyRoute>
  );
}

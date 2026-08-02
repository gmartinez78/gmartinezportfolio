import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  Bot,
  CheckCircle2,
  ChevronRight,
  Route,
  UsersRound,
} from "lucide-react";
import { CalendarKeeperPrototypeViews } from "@/components/calendar-keeper-prototype-views";
import { CalendarKeeperServiceBlueprint } from "@/components/calendar-keeper-service-blueprint";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const hmwQuestions = [
  "How might we make a sync interruption visible and understandable the moment it happens?",
  "How might we let the clinic keep booking safely when identity verification is unavailable?",
  "How might we reserve the practitioner, room, equipment, and prep time as one appointment?",
  "How might we help an MFA resolve exceptions without learning a new system?",
  "How might we give returning patients a fast path for routine changes?",
  "How might we prove resource-aware scheduling during the sales demo itself?",
];

const aiSteps = [
  {
    title: "Synthesized the landscape",
    body: "AI helped cluster competitor signals, app-store reviews, and early research notes into recurring scheduling patterns.",
  },
  {
    title: "Expanded the question set",
    body: "It generated alternative HMW directions and edge cases, giving the team a broader set of hypotheses to challenge.",
  },
  {
    title: "Accelerated the story",
    body: "It supported copy exploration and prototype iteration so more time could go to the critical product choices.",
  },
];

const decisions = [
  "Treat data sovereignty and MFA-first workflows as entry requirements—not the differentiator.",
  "Keep resource-aware booking in the shared core, because it cannot be reliably retrofitted later.",
  "Make degraded mode a named, visible state with a reconciliation path rather than a silent failure.",
  "Start with the Calendar Keeper and returning patient surfaces because they relieve the highest-volume friction without requiring network liquidity.",
];

export default function CalendarKeeperPresentationPage() {
  return (
    <main className="min-h-screen bg-[#f8fbff] text-[#0e2951]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#0e2951] px-6 pb-20 pt-12 text-white md:px-10 md:pb-28 xl:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_84%_18%,rgba(17,131,208,0.55),transparent_23%),radial-gradient(circle_at_67%_80%,rgba(143,195,236,0.18),transparent_32%)]" />
        <div className="relative mx-auto max-w-[1120px]">
          <Link href="/calendar-keeper" className="inline-flex items-center gap-2 text-sm font-semibold text-[#bfe2fb] transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to case study
          </Link>
          <p className="mt-16 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#83cef8]">Stakeholder presentation</p>
          <h1 className="mt-5 max-w-[900px] font-inter text-5xl font-semibold leading-[1.06] tracking-[-0.045em] md:text-7xl">
            A reliable schedule when the clinic cannot pause.
          </h1>
          <p className="mt-7 max-w-[680px] text-lg leading-relaxed text-[#c5d9e9]">
            Calendar Keeper turns clinic scheduling from a fragile calendar into a resource-aware service that stays useful when infrastructure does not.
          </p>
          <a href="#decision" className="mt-12 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0e2951] transition-transform hover:-translate-y-0.5">
            See the strategy <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      <nav className="sticky top-0 z-20 border-b border-[#d9e5f2] bg-white/95 px-6 py-3 backdrop-blur md:px-10 xl:px-20">
        <div className="mx-auto flex max-w-[1120px] gap-5 overflow-x-auto text-xs font-semibold text-[#5c7792]">
          {[["Decision", "decision"], ["Strategy", "strategy"], ["Design", "design"], ["AI & decisions", "ai"], ["Next", "next"]].map(([label, id]) => (
            <a key={id} href={`#${id}`} className="shrink-0 transition-colors hover:text-[#1183D0]">{label}</a>
          ))}
        </div>
      </nav>

      <section id="decision" className="mx-auto max-w-[1120px] px-6 py-20 md:px-10 xl:px-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">01 · The decision</p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h2 className="max-w-[710px] font-inter text-4xl font-semibold tracking-[-0.035em] md:text-5xl">One product, three layers, two entrances.</h2>
            <p className="mt-6 max-w-[720px] text-[17px] leading-relaxed text-[#5c7792]">
              The shared scheduling core coordinates the appointment and its resources. Above it, a Calendar Keeper console supports clinic staff, while a deliberately focused patient surface deflects routine calls. The product adapts to the shape of a practice—not a country label.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              ["Shared core", "Resource-aware appointments"],
              ["Console entrance", "The Calendar Keeper"],
              ["Patient entrance", "Returning patients"],
            ].map(([label, detail], index) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border border-[#d9e5f2] bg-white p-4 shadow-[0_8px_22px_rgba(14,41,81,0.05)]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e8f5ff] text-xs font-bold text-[#1183D0]">0{index + 1}</span>
                <div><p className="text-sm font-semibold">{label}</p><p className="mt-0.5 text-xs text-[#5c7792]">{detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#d9e5f2] bg-white px-6 py-20 md:px-10 xl:px-20">
        <div className="mx-auto max-w-[1120px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">The problem we chose to solve</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <article className="rounded-[24px] bg-[#edf6fd] p-7">
              <UsersRound className="h-6 w-6 text-[#1183D0]" />
              <h3 className="mt-5 font-inter text-2xl font-semibold">The Calendar Keeper</h3>
              <p className="mt-3 leading-relaxed text-[#5c7792]">Medical assistants lose time to interruptions, double-bookings, manual checks, and uncertainty when a system fails.</p>
            </article>
            <article className="rounded-[24px] bg-[#f3efff] p-7">
              <Route className="h-6 w-6 text-[#7657c9]" />
              <h3 className="mt-5 font-inter text-2xl font-semibold">Returning patients</h3>
              <p className="mt-3 leading-relaxed text-[#5c7792]">Routine rebooking and changes still turn into phone calls—the exact work that overwhelms front-desk teams.</p>
            </article>
          </div>
          <p className="mt-6 max-w-[850px] text-[15px] leading-relaxed text-[#5c7792]">
            We did not begin with a broad patient marketplace or a backfill feature. Neither provides value at the first clinic without history or waitlist liquidity. These two users expose the highest-frequency friction and give the service a useful starting point on day one.
          </p>
        </div>
      </section>

      <section id="strategy" className="mx-auto max-w-[1120px] px-6 py-20 md:px-10 xl:px-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">02 · Strategy</p>
        <h2 className="mt-5 max-w-[740px] font-inter text-4xl font-semibold tracking-[-0.035em] md:text-5xl">Trust the schedule—even in degraded mode.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {decisions.map((decision, index) => (
            <div key={decision} className="flex gap-4 rounded-2xl border border-[#d9e5f2] bg-white p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1183D0]" />
              <p className="text-[15px] leading-relaxed text-[#31526e]">{decision}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-[26px] border border-[#cde5f7] bg-[#eff8ff] p-7 md:p-9">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1183D0]">From research to design questions</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {hmwQuestions.map((question) => <p key={question} className="rounded-xl bg-white px-4 py-3 text-sm leading-relaxed text-[#31526e]">{question}</p>)}
          </div>
        </div>
      </section>

      <section id="design" className="border-y border-[#d9e5f2] bg-white px-6 py-20 md:px-10 xl:px-20">
        <div className="mx-auto max-w-[1120px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">03 · The service and experience</p>
          <h2 className="mt-5 max-w-[720px] font-inter text-4xl font-semibold tracking-[-0.035em] md:text-5xl">The design makes both paths legible.</h2>
          <p className="mt-5 max-w-[760px] text-[16px] leading-relaxed text-[#5c7792]">Staff see the operational state, exceptions, and resource dependencies. Patients get a clear, low-friction way to manage routine appointments. The same booking logic protects both experiences.</p>
          <div className="mt-12"><CalendarKeeperServiceBlueprint /></div>
          <div className="mt-16 rounded-[28px] border border-[#d9e5f2] bg-[#f8fbff] p-4 md:p-8">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1183D0]">Prototype</p><h3 className="mt-2 font-inter text-3xl font-semibold">Try both entrances</h3></div>
              <p className="max-w-[330px] text-sm leading-relaxed text-[#5c7792]">Switch between the staff console and the patient-facing flow.</p>
            </div>
            <CalendarKeeperPrototypeViews />
          </div>
        </div>
      </section>

      <section id="ai" className="mx-auto max-w-[1120px] px-6 py-20 md:px-10 xl:px-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">04 · AI-assisted, human-directed</p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Bot className="h-8 w-8 text-[#1183D0]" />
            <h2 className="mt-5 font-inter text-4xl font-semibold tracking-[-0.035em]">AI accelerated the work. It did not make the product choices.</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-[#5c7792]">I used Claude, Gemini, NotebookLM, ChatGPT, and Codex as research, synthesis, writing, and prototyping partners. Their output was treated as material to interrogate—not evidence to accept uncritically.</p>
          </div>
          <div className="space-y-4">
            {aiSteps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-[#d9e5f2] bg-white p-5">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-[#1183D0]">AI USE 0{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5c7792]">{step.body}</p>
              </article>
            ))}
            <div className="rounded-2xl bg-[#0e2951] p-5 text-white"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#83cef8]">Designer decision</p><p className="mt-2 text-sm leading-relaxed text-[#d4e5f2]">The key calls—what to prioritize, what to defer, how to define safety in degraded mode, and how to structure the shared core—were made against the clinic workflow and feasibility constraints.</p></div>
          </div>
        </div>
      </section>

      <section id="next" className="bg-[#0e2951] px-6 py-20 text-white md:px-10 xl:px-20">
        <div className="mx-auto grid max-w-[1120px] gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div><p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#83cef8]">What we validate next</p><h2 className="mt-5 font-inter text-4xl font-semibold tracking-[-0.035em]">A calm schedule is the outcome—not just a polished calendar.</h2></div>
          <div className="space-y-3">
            {["Can staff resolve a sync exception without training?", "Do resource rules prevent rework before the appointment is created?", "Can returning patients complete routine changes without calling?", "Does the experience scale from a team practice to a solo practitioner?"].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-white/15 px-4 py-3 text-sm leading-relaxed text-[#d4e5f2]"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#83cef8]" />{item}</div>)}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-12 text-center md:px-10">
        <Link href="/calendar-keeper" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1183D0] hover:text-[#0e2951]">Explore the complete Calendar Keeper case study <ChevronRight className="h-4 w-4" /></Link>
      </section>
      <SiteFooter />
    </main>
  );
}

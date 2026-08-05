"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const slides = [
  { eyebrow: "Calendar Keeper · Product strategy", title: "A reliable schedule when the clinic cannot pause.", body: "Calendar Keeper makes clinical scheduling resource-aware and keeps the day operable when infrastructure fails." },
  { eyebrow: "The problem", title: "A clinical appointment is not a time slot.", body: "It has to coordinate a practitioner, room, equipment, and preparation time—while staff manage calls, changes, and technical interruptions." },
  { eyebrow: "The evidence", title: "The risks ruled out a broad, feature-first launch.", body: "The first clinic has no waitlist history, migration anxiety blocks adoption, and infrastructure failures already disrupt day-to-day operations." },
  { eyebrow: "The recommendation", title: "Launch the most dependable service first.", body: "Phase 1 makes the schedule accurate, resource-aware, and recoverable. Backfill follows only after the product has the data and trust to make it useful." },
  { eyebrow: "The experience", title: "Two surfaces. One trustworthy service.", body: "Staff get operational visibility and a safe recovery path. Returning patients can complete routine changes without creating another phone call." },
  { eyebrow: "Degraded mode", title: "A sync failure should become a known condition—not a crisis.", body: "The experience names the failure, protects the day’s work, and gives staff a clear reconciliation path instead of a silent desync or full-day block." },
  { eyebrow: "AI-assisted, human-directed", title: "AI accelerated the work. I owned the decisions.", body: "AI supported research synthesis, idea expansion, writing, and prototype iteration. The priority, scope, and safety boundaries remained design decisions." },
  { eyebrow: "What I would validate next", title: "Prove that the first release earns operational trust.", body: "Validate whether staff can recover from an exception without training, whether dependencies prevent rework, and whether patients can complete routine changes without calling." },
];

function SlideLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">{children}</p>;
}

export function CalendarKeeperStakeholderPresentation() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];
  const goTo = (index: number) => setActiveSlide(Math.max(0, Math.min(index, slides.length - 1)));

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") goTo(activeSlide + 1);
      if (event.key === "ArrowLeft") goTo(activeSlide - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeSlide]);

  return (
    <main className="min-h-screen bg-[#f8fbff] text-[#0e2951]">
      <header className="flex h-[68px] items-center justify-between border-b border-[#d9e5f2] bg-white px-5 md:px-10">
        <p className="font-inter text-[15px] font-semibold text-[#0e2951]">Calendar Keeper</p>
        <Link href="/calendar-keeper/" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#5c7792] transition-colors hover:text-[#1183D0]"><ArrowLeft className="h-4 w-4" /> Exit presentation</Link>
      </header>

      <section className="mx-auto flex min-h-[calc(100svh-138px)] max-w-[1200px] items-center px-6 py-10 md:px-12">
        <div className="w-full">
          <div className="mb-7 flex items-center justify-between">
            <SlideLabel>{slide.eyebrow}</SlideLabel>
            <p className="text-[12px] font-semibold text-[#5c7792]">{String(activeSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</p>
          </div>

          <div key={activeSlide} className="animate-in fade-in slide-in-from-right-3 duration-300">
            {activeSlide === 0 ? (
              <div className="relative overflow-hidden rounded-[32px] bg-[#0e2951] px-7 py-16 text-white md:px-16 md:py-20">
                <div className="absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border-[90px] border-[#174778]" />
                <div className="absolute right-20 top-20 h-48 w-48 rounded-full bg-[#1183D0]" />
                <div className="relative max-w-[760px]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#83cef8]">{slide.eyebrow}</p>
                  <h1 className="mt-7 font-inter text-5xl font-semibold leading-[1.05] tracking-[-0.045em] md:text-7xl">{slide.title}</h1>
                  <p className="mt-7 max-w-[610px] text-[18px] leading-relaxed text-[#d4e5f2]">{slide.body}</p>
                </div>
              </div>
            ) : activeSlide === 1 ? (
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div><h1 className="font-inter text-5xl font-semibold leading-[1.07] tracking-[-0.045em] md:text-6xl">{slide.title}</h1><p className="mt-7 max-w-[520px] text-[19px] leading-relaxed text-[#5c7792]">{slide.body}</p></div>
                <div className="grid grid-cols-2 gap-4">
                  {[["Practitioner", "#1183D0"], ["Room", "#5da9dc"], ["Equipment", "#7657c9"], ["Prep time", "#72b78d"]].map(([label, color]) => <div key={label} className="rounded-2xl border border-[#d9e5f2] bg-white p-6 shadow-[0_12px_28px_rgba(14,41,81,0.06)]"><span className="block h-4 w-4 rounded-full" style={{ backgroundColor: color }} /><p className="mt-12 text-xl font-semibold">{label}</p></div>)}
                  <p className="col-span-2 mt-2 text-center text-sm font-semibold text-[#1183D0]">One coordinated appointment</p>
                </div>
              </div>
            ) : activeSlide === 2 ? (
              <div><h1 className="max-w-[820px] font-inter text-5xl font-semibold leading-[1.07] tracking-[-0.045em] md:text-6xl">{slide.title}</h1><p className="mt-6 max-w-[760px] text-[19px] leading-relaxed text-[#5c7792]">{slide.body}</p><div className="mt-12 grid gap-4 md:grid-cols-2"><div className="rounded-[26px] bg-[#fff2a8] p-7"><SlideLabel>Launch constraint</SlideLabel><p className="mt-4 text-2xl font-semibold">No liquidity on day one</p><p className="mt-3 text-[15px] leading-relaxed text-[#5c7792]">Backfill needs a waitlist and history. Neither exists at the first clinic.</p></div><div className="rounded-[26px] bg-[#eaf5fd] p-7"><SlideLabel>Operational risk</SlideLabel><p className="mt-4 text-2xl font-semibold">Infrastructure already fails</p><p className="mt-3 text-[15px] leading-relaxed text-[#5c7792]">Silent desync and blocked days turn a technical fault into a clinical operations problem.</p></div><div className="rounded-[26px] bg-[#f4efff] p-7"><p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7657c9]">Adoption risk</p><p className="mt-4 text-2xl font-semibold">Migration outweighs polish</p><p className="mt-3 text-[15px] leading-relaxed text-[#5c7792]">A credible move from an incumbent must be visible before a clinic can trust a new tool.</p></div><div className="rounded-[26px] bg-[#edf6fd] p-7"><p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0e2951]">Market choice</p><p className="mt-4 text-2xl font-semibold">Germany is the narrower opening</p><p className="mt-3 text-[15px] leading-relaxed text-[#5c7792]">The strategy starts where the product can prove operational value without trying to outscale an incumbent.</p></div></div></div>
            ) : activeSlide === 3 ? (
              <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center"><div><h1 className="font-inter text-5xl font-semibold leading-[1.07] tracking-[-0.045em] md:text-6xl">{slide.title}</h1><p className="mt-7 text-[19px] leading-relaxed text-[#5c7792]">{slide.body}</p><p className="mt-8 max-w-[520px] text-[15px] leading-relaxed text-[#31526e]">Data privacy and support for medical assistants are essential to compete, but they will not make the product stand out. The difference is a schedule that understands what each appointment needs and still works when systems fail.</p></div><div className="space-y-4"><div className="rounded-[26px] bg-[#eaf5fd] p-7"><SlideLabel>Phase 1 · high fidelity</SlideLabel><p className="mt-3 font-inter text-2xl font-semibold">Resource-aware booking</p><p className="mt-2 text-[15px] leading-relaxed text-[#5c7792]">Practitioner, room, equipment, and prep work as one appointment.</p></div><div className="rounded-[26px] bg-[#f4efff] p-7"><p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7657c9]">Phase 1 · high fidelity</p><p className="mt-3 font-inter text-2xl font-semibold">Visible recovery</p><p className="mt-2 text-[15px] leading-relaxed text-[#5c7792]">Named sync status, a reconciliation queue, and a safe next action.</p></div><div className="rounded-[26px] border border-dashed border-[#b7cce0] bg-white p-7"><p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5c7792]">Phase 2</p><p className="mt-3 font-inter text-2xl font-semibold">Backfill after liquidity</p></div></div></div>
            ) : activeSlide === 4 ? (
              <div><h1 className="max-w-[740px] font-inter text-5xl font-semibold leading-[1.07] tracking-[-0.045em] md:text-6xl">{slide.title}</h1><p className="mt-6 max-w-[720px] text-[19px] leading-relaxed text-[#5c7792]">{slide.body}</p><div className="mt-11 grid gap-6 md:grid-cols-2"><div className="rounded-[28px] border border-[#d9e5f2] bg-white p-7"><SlideLabel>Staff console</SlideLabel><p className="mt-4 text-2xl font-semibold">Resource-aware calendar</p><div className="mt-7 space-y-3">{["Appointment details", "Practitioner · room · equipment", "Not synced: reconciliation queue"].map((item, i) => <div key={item} className={`rounded-xl px-4 py-3 text-sm font-medium ${i === 2 ? "bg-[#fff2a8] text-[#6a5800]" : "bg-[#f1f7fc] text-[#31526e]"}`}>{item}</div>)}</div></div><div className="rounded-[28px] border border-[#d9e5f2] bg-white p-7"><p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7657c9]">Patient surface</p><p className="mt-4 text-2xl font-semibold">One clear next step</p><div className="mt-7 space-y-3">{["Upcoming appointment", "Reschedule appointment", "Cancel or check status"].map((item, i) => <div key={item} className={`rounded-xl px-4 py-3 text-sm font-medium ${i === 1 ? "bg-[#1183D0] text-white" : "bg-[#f6f3ff] text-[#4d3a80]"}`}>{item}</div>)}</div></div></div></div>
            ) : activeSlide === 5 ? (
              <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center"><div><h1 className="font-inter text-5xl font-semibold leading-[1.07] tracking-[-0.045em] md:text-6xl">{slide.title}</h1><p className="mt-7 text-[19px] leading-relaxed text-[#5c7792]">{slide.body}</p></div><div className="space-y-3"><div className="rounded-2xl bg-[#fff2a8] p-5"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6a5800]">1 · Make it visible</p><p className="mt-2 text-xl font-semibold">Not synced</p></div><div className="rounded-2xl border border-[#d9e5f2] bg-white p-5"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1183D0]">2 · Keep work moving</p><p className="mt-2 text-xl font-semibold">Create locally with identity pending</p></div><div className="rounded-2xl bg-[#0e2951] p-5 text-white"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#83cef8]">3 · Reconcile safely</p><p className="mt-2 text-xl font-semibold">Queue the exception—never block the whole day</p></div></div></div>
            ) : activeSlide === 6 ? (
              <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center"><div><Sparkles className="h-8 w-8 text-[#1183D0]" /><h1 className="mt-5 font-inter text-5xl font-semibold leading-[1.07] tracking-[-0.045em] md:text-6xl">{slide.title}</h1><p className="mt-7 text-[19px] leading-relaxed text-[#5c7792]">{slide.body}</p></div><div className="space-y-4">{[["Synthesize", "Clustered competitor signals, reviews, and research notes."], ["Expand", "Generated alternative HMW directions and edge cases."], ["Accelerate", "Supported copy exploration and prototype iteration."]].map(([title, detail], index) => <div key={title} className="rounded-2xl border border-[#d9e5f2] bg-white p-5"><p className="text-[11px] font-semibold text-[#1183D0]">AI USE 0{index + 1}</p><p className="mt-2 text-xl font-semibold">{title}</p><p className="mt-1 text-[15px] leading-relaxed text-[#5c7792]">{detail}</p></div>)}<div className="rounded-2xl bg-[#0e2951] p-5 text-white"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#83cef8]">My decision</p><p className="mt-2 text-[15px] leading-relaxed text-[#d4e5f2]">The launch scope, safety boundaries, and phased strategy were mine to defend.</p></div></div></div>
            ) : (
              <div className="rounded-[32px] bg-[#0e2951] px-7 py-14 text-white md:px-16 md:py-20"><h1 className="max-w-[870px] font-inter text-5xl font-semibold leading-[1.07] tracking-[-0.045em] md:text-6xl">{slide.title}</h1><p className="mt-7 max-w-[720px] text-[19px] leading-relaxed text-[#d4e5f2]">{slide.body}</p><div className="mt-12 grid gap-3 md:grid-cols-2">{["Can staff resolve a sync exception without training?", "Do resource rules prevent rework before booking?", "Can returning patients complete routine changes without calling?", "Does the experience scale from a team practice to a solo practitioner?"].map((item) => <p key={item} className="flex gap-3 rounded-xl border border-white/15 px-4 py-4 text-[15px] text-[#d4e5f2]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#83cef8]" />{item}</p>)}</div></div>
            )}
          </div>
        </div>
      </section>

      <footer className="flex h-[70px] items-center justify-between border-t border-[#d9e5f2] bg-white px-5 md:px-10">
        <button type="button" onClick={() => goTo(activeSlide - 1)} disabled={activeSlide === 0} className="inline-flex items-center gap-2 text-sm font-semibold text-[#5c7792] disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft className="h-5 w-5" /> Previous</button>
        <div className="flex items-center gap-1.5">{slides.map((item, index) => <button key={item.title} type="button" aria-label={`Go to slide ${index + 1}`} onClick={() => goTo(index)} className={`h-1.5 rounded-full transition-all ${index === activeSlide ? "w-8 bg-[#1183D0]" : "w-3 bg-[#cbdceb] hover:bg-[#9ebcd7]"}`} />)}</div>
        <button type="button" onClick={() => goTo(activeSlide + 1)} disabled={activeSlide === slides.length - 1} className="inline-flex items-center gap-2 text-sm font-semibold text-[#1183D0] disabled:cursor-not-allowed disabled:opacity-35">Next <ChevronRight className="h-5 w-5" /></button>
      </footer>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "gm_persona";

export type Persona = "recruiter" | "client";

function BriefcaseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12" />
      <path d="M2 12h20" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function PersonaModal({ onSelect }: { onSelect: (p: Persona) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    } else {
      onSelect(stored as Persona);
    }
  }, [onSelect]);

  function choose(p: Persona) {
    localStorage.setItem(STORAGE_KEY, p);
    setVisible(false);
    onSelect(p);
  }

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "client");
    setVisible(false);
    onSelect("client");
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0e2951]/80 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative w-full max-w-[520px] rounded-[24px] bg-white px-8 py-10 shadow-[0_32px_80px_rgba(14,41,81,0.28)]">
        <p className="mb-1 text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-[#1183D0]">
          Welcome
        </p>
        <h2 className="mb-2 text-center font-serif-display text-[32px] italic leading-tight text-[#0e2951]">
          What brings you here?
        </h2>
        <p className="mb-8 text-center text-[14px] leading-[1.7] text-[#5c7792]">
          I'll show you the most relevant work for you.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => choose("recruiter")}
            className="group flex flex-col items-center gap-4 rounded-[16px] border-2 border-transparent bg-[#F0F7FF] px-6 py-7 text-center transition-all duration-200 hover:border-[#1183D0] hover:bg-white hover:shadow-[0_8px_32px_rgba(17,131,208,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1183D0] shadow-[0_4px_16px_rgba(17,131,208,0.12)] transition-transform duration-200 group-hover:scale-110">
              <BriefcaseIcon />
            </span>
            <span>
              <span className="block text-[17px] font-semibold text-[#0e2951]">I'm a Recruiter</span>
              <span className="mt-1 block text-[13px] leading-snug text-[#5c7792]">Looking for a senior designer to hire</span>
            </span>
          </button>

          <button
            onClick={() => choose("client")}
            className="group flex flex-col items-center gap-4 rounded-[16px] border-2 border-transparent bg-[#F0F7FF] px-6 py-7 text-center transition-all duration-200 hover:border-[#1183D0] hover:bg-white hover:shadow-[0_8px_32px_rgba(17,131,208,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1183D0] shadow-[0_4px_16px_rgba(17,131,208,0.12)] transition-transform duration-200 group-hover:scale-110">
              <StarIcon />
            </span>
            <span>
              <span className="block text-[17px] font-semibold text-[#0e2951]">I'm a Client</span>
              <span className="mt-1 block text-[13px] leading-snug text-[#5c7792]">Looking for a designer for a project</span>
            </span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={dismiss}
            className="text-[13px] text-[#5c7792] underline-offset-2 hover:underline"
          >
            Just browsing
          </button>
        </div>
      </div>
    </div>
  );
}

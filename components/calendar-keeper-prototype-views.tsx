"use client";

import { useState } from "react";
import { CalendarKeeperDesktopPrototype } from "@/components/calendar-keeper-desktop-prototype";
import { CalendarKeeperMobilePrototype } from "@/components/calendar-keeper-mobile-prototype";

export function CalendarKeeperPrototypeViews() {
  const [view, setView] = useState<"mobile" | "desktop">("mobile");

  return <div>
    <div className="mx-auto mb-8 flex w-fit rounded-full border border-[#d9e5f2] bg-white p-1 shadow-[0_8px_18px_rgba(14,41,81,0.06)]">
      {(["mobile", "desktop"] as const).map((option) => <button key={option} type="button" onClick={() => setView(option)} className={`rounded-full px-4 py-2 text-[12px] font-semibold capitalize transition-colors ${view === option ? "bg-[#1183D0] text-white" : "text-[#5c7792] hover:text-[#0e2951]"}`}>{option} view</button>)}
    </div>
    {view === "mobile" ? <CalendarKeeperMobilePrototype /> : <CalendarKeeperDesktopPrototype />}
  </div>;
}

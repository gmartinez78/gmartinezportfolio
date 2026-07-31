"use client";

import { useState } from "react";

const initialBookings = [
  { patient: "Marta Schmidt", time: "09:00", status: "Synced", tone: "bg-[#e7f6ee] text-[#19714e]" },
  { patient: "Leon Weber", time: "10:00", status: "Needs review", tone: "bg-[#fff3d8] text-[#895400]" },
  { patient: "Anika Fischer", time: "11:30", status: "Sync failed", tone: "bg-[#ffebeb] text-[#b52f2f]" },
];

type PracticeShape = "team" | "solo";
type Entrance = "console" | "patient";

export function CalendarKeeperDesktopPrototype() {
  const [isDegraded, setIsDegraded] = useState(true);
  const [entrance, setEntrance] = useState<Entrance>("console");
  const [practiceShape, setPracticeShape] = useState<PracticeShape>("team");
  const [patient, setPatient] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [bookings, setBookings] = useState(initialBookings);
  const [setupProgress, setSetupProgress] = useState(2);
  const [patientNotice, setPatientNotice] = useState("");
  const practice = practiceShape === "team"
    ? { label: "Team practice", description: "Delegation-ready coordination for a multi-staff clinic", operation: "Assistant-led coordination" }
    : { label: "Solo practice", description: "A lean workspace for a doctor-led practice", operation: "Doctor-led coordination" };

  const createBooking = () => {
    if (!patient || !time) return;
    setBookings((current) => [...current, { patient, time, status: isDegraded ? "Needs review" : "Synced", tone: isDegraded ? "bg-[#fff3d8] text-[#895400]" : "bg-[#e7f6ee] text-[#19714e]" }]);
    if (entrance === "patient") setPatientNotice(`Your return visit is booked for ${time}.`);
    setPatient(null);
    setTime(null);
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#d8e2f1] bg-[#f4f8ff] shadow-[0_20px_48px_rgba(40,99,216,0.12)]">
      <div className="border-b border-[#d8e2f1] bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-[#edf2f8] px-5 py-3">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#2863d8]">CLARITY SCHEDULE</p>
          <div className="flex rounded-full border border-[#d8e2f1] bg-[#f4f8ff] p-1" aria-label="Prototype entrance">
            {(["console", "patient"] as const).map((option) => <button key={option} type="button" onClick={() => setEntrance(option)} className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${entrance === option ? "bg-[#2863d8] text-white" : "text-[#667085]"}`}>{option === "console" ? "Console" : "Patient"}</button>)}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div><h3 className="font-inter text-[22px] font-semibold text-[#24324a]">{entrance === "console" ? "Calendar Keeper console" : "Returning patient"}</h3><p className="mt-1 text-[12px] text-[#667085]">{entrance === "console" ? practice.description : "A simple self-service path for a familiar appointment."}</p></div>
        <div className="flex flex-wrap items-center gap-2">
          {entrance === "console" ? <><div className="flex rounded-full border border-[#d8e2f1] bg-[#f4f8ff] p-1" aria-label="Practice shape">
            {(["team", "solo"] as const).map((shape) => <button key={shape} type="button" onClick={() => setPracticeShape(shape)} className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${practiceShape === shape ? "bg-[#2863d8] text-white" : "text-[#667085]"}`}>{shape === "team" ? "Team practice" : "Solo practice"}</button>)}
          </div>
          <button type="button" onClick={() => setIsDegraded((current) => !current)} className={`rounded-full px-3 py-2 text-[11px] font-bold ${isDegraded ? "bg-[#fff3d8] text-[#895400]" : "bg-[#e7f6ee] text-[#19714e]"}`}>{isDegraded ? "● Not synced · working locally" : "● Integration healthy"}</button></> : <span className="rounded-full bg-[#e7f6ee] px-3 py-2 text-[11px] font-bold text-[#19714e]">Secure self-service</span>}
        </div>
        </div>
      </div>
      <div className="p-5 md:p-7">
        {entrance === "patient" ? <section className="mx-auto max-w-[760px] rounded-2xl bg-white p-6 shadow-[0_8px_20px_rgba(40,99,216,0.08)] md:p-8"><p className="text-[11px] font-bold tracking-[0.14em] text-[#2863d8]">WELCOME BACK, MARTA</p><h4 className="mt-2 font-inter text-[26px] font-semibold text-[#24324a]">Book a return visit</h4><p className="mt-2 max-w-[560px] text-[14px] leading-[1.6] text-[#667085]">Choose a suitable time. The clinic checks the practitioner, room, equipment, and preparation window together before confirming.</p><div className="mt-7 rounded-xl border border-[#d8e2f1] bg-[#fbfdff] p-5"><p className="text-[11px] font-bold text-[#2863d8]">ECG CONSULTATION</p><p className="mt-2 text-[17px] font-bold text-[#24324a]">With Dr. Maya Patel</p><p className="mt-1 text-[13px] text-[#667085]">30 min · Your familiar clinic</p><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{["09:30", "10:30", "13:00", "14:30"].map((slot) => <button key={slot} type="button" onClick={() => setTime(slot)} className={`rounded-lg border px-3 py-3 text-[13px] font-semibold ${time === slot ? "border-[#2863d8] bg-[#2863d8] text-white" : "border-[#d8e2f1] bg-white text-[#24324a]"}`}>{slot}</button>)}</div></div><div className="mt-5 rounded-xl bg-[#eaf1fc] p-4 text-[13px] leading-[1.55] text-[#506078]"><strong className="text-[#24324a]">Everything is reserved together.</strong> You only choose a time; the clinic coordinates the operational details in the shared scheduling core.</div><button type="button" disabled={!time} onClick={() => { if (!time) return; setBookings((current) => [...current, { patient: "Marta Schmidt", time, status: "Synced", tone: "bg-[#e7f6ee] text-[#19714e]" }]); setPatientNotice(`Your return visit is booked for ${time}.`); setTime(null); }} className="mt-6 rounded-xl bg-[#2863d8] px-5 py-3 text-[13px] font-bold text-white disabled:opacity-40">{time ? `Confirm ${time}` : "Choose a time"}</button>{patientNotice ? <p className="mt-4 rounded-xl bg-[#e7f6ee] p-3 text-[13px] font-semibold text-[#19714e]">{patientNotice}</p> : null}</section> : <>
        {isDegraded ? <div className="mb-5 flex items-start justify-between gap-4 rounded-xl border-l-4 border-[#ffaa1d] bg-white p-4 text-[13px] text-[#667085]"><p><strong className="text-[#24324a]">Degraded mode</strong><br />Continue booking locally. Exceptions stay visible until they are reconciled.</p><span className="rounded-full bg-[#fff3d8] px-2 py-1 text-[10px] font-bold text-[#895400]">Action required</span></div> : null}

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
          <div className="space-y-5">
            <section className="rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><div className="flex items-start justify-between"><div><p className="text-[11px] font-bold text-[#2863d8]">TODAY&apos;S SCHEDULE</p><h4 className="mt-1 text-[18px] font-bold text-[#24324a]">Resource-aware appointments</h4></div><div className="flex flex-wrap justify-end gap-2"><span className="rounded-full bg-[#eaf1fc] px-2 py-1 text-[10px] font-bold text-[#2863d8]">{practice.operation}</span><span className="rounded-full bg-[#e7f6ee] px-2 py-1 text-[10px] font-bold text-[#19714e]">Room 3 ready</span></div></div><div className="mt-4 space-y-3">{bookings.map((booking) => <div key={`${booking.patient}-${booking.time}`} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d8e2f1] bg-[#fbfdff] p-4"><div><p className="font-semibold text-[#24324a]">{booking.time} · {booking.patient}</p><p className="mt-1 text-[12px] text-[#667085]">30 min · Dr. Maya Patel · Room 3 · ECG-02 · Prep window</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${booking.tone}`}>{booking.status}</span></div>)}</div></section>
            <section className="rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><p className="text-[11px] font-bold text-[#2863d8]">NEW APPOINTMENT</p><h4 className="mt-1 text-[18px] font-bold text-[#24324a]">ECG consultation</h4><p className="mt-1 text-[13px] text-[#667085]">30 min · Dr. Maya Patel · Room 3 · ECG-02 · 10 min preparation</p><div className="mt-5 grid gap-5 md:grid-cols-2"><div><p className="text-[12px] font-bold text-[#24324a]">1. Select patient</p><div className="mt-3 space-y-2">{["Marta Schmidt", "Walk-in patient"].map((name) => <button key={name} type="button" onClick={() => setPatient(name)} className={`w-full rounded-lg border px-3 py-2.5 text-left text-[12px] font-semibold ${patient === name ? "border-[#2863d8] bg-[#eaf1fc]" : "border-[#d8e2f1]"}`}>{name}<span className="ml-2 text-[10px] font-normal text-[#667085]">{name === "Marta Schmidt" ? "Returning patient" : "Identity pending"}</span></button>)}</div></div><div><p className="text-[12px] font-bold text-[#24324a]">2. Select an available time</p><div className="mt-3 grid grid-cols-2 gap-2">{["09:30", "10:30", "13:00", "14:30"].map((slot) => <button key={slot} type="button" onClick={() => setTime(slot)} className={`rounded-lg border px-3 py-2.5 text-[12px] font-semibold ${time === slot ? "border-[#2863d8] bg-[#2863d8] text-white" : "border-[#d8e2f1]"}`}>{slot}</button>)}</div></div></div><div className="mt-5 rounded-xl bg-[#eaf1fc] p-4 text-[12px] leading-[1.5] text-[#506078]"><strong className="text-[#24324a]">Resources reserved together.</strong> The practitioner, room, equipment, and preparation window are validated as one booking.</div><button type="button" disabled={!patient || !time} onClick={createBooking} className="mt-5 rounded-xl bg-[#2863d8] px-5 py-3 text-[13px] font-bold text-white disabled:opacity-40">{patient && time ? `Confirm ${time}` : "Choose a patient and time"}</button></section>
          </div>
          <aside className="space-y-5"><section className="rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><div className="flex items-center justify-between"><div><p className="text-[11px] font-bold text-[#2863d8]">RECONCILIATION</p><h4 className="mt-1 text-[17px] font-bold text-[#24324a]">Action queue</h4></div><span className="rounded-full bg-[#eaf1fc] px-2.5 py-1 text-[11px] font-bold text-[#2863d8]">{bookings.filter((booking) => booking.status !== "Synced").length}</span></div><div className="mt-4 space-y-3">{bookings.filter((booking) => booking.status !== "Synced").map((booking) => <div key={`queue-${booking.patient}-${booking.time}`} className="rounded-xl border border-[#d8e2f1] p-3"><p className="text-[12px] font-semibold text-[#24324a]">{booking.patient} · {booking.time}</p><p className="mt-1 text-[11px] text-[#667085]">{booking.status === "Sync failed" ? "Integration timeout" : "Identity verification pending"}</p><button type="button" onClick={() => setBookings((current) => current.map((item) => item.patient === booking.patient && item.time === booking.time ? { ...item, status: "Synced", tone: "bg-[#e7f6ee] text-[#19714e]" } : item))} className="mt-3 w-full rounded-lg border border-[#d8e2f1] px-3 py-2 text-[11px] font-bold text-[#2863d8]">Verify & reconcile</button></div>)}</div></section><section className="rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><p className="text-[11px] font-bold text-[#2863d8]">SETUP PROGRESS</p><h4 className="mt-1 text-[17px] font-bold text-[#24324a]">First bookable schedule</h4><div className="mt-4 space-y-3">{["Add a practitioner", "Add room & equipment", "Create appointment type", "Publish availability"].map((step, index) => <div key={step} className="flex items-center gap-3"><span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${index < setupProgress ? "bg-[#e7f6ee] text-[#19714e]" : "bg-[#eaf1fc] text-[#2863d8]"}`}>{index < setupProgress ? "✓" : index + 1}</span><span className="text-[11px] font-semibold text-[#24324a]">{step}</span></div>)}</div>{setupProgress < 4 ? <button type="button" onClick={() => setSetupProgress((current) => current + 1)} className="mt-5 w-full rounded-lg bg-[#2863d8] px-3 py-2.5 text-[11px] font-bold text-white">Complete next step</button> : <p className="mt-5 rounded-lg bg-[#e7f6ee] p-3 text-center text-[11px] font-bold text-[#19714e]">Ready to publish.</p>}</section></aside>
        </div></>}
      </div>
    </div>
  );
}

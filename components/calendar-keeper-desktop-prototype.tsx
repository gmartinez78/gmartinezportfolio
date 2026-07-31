"use client";

import { useState } from "react";

type Tab = "schedule" | "new" | "queue" | "setup";

const initialBookings = [
  { patient: "Marta Schmidt", time: "09:00", status: "Synced", tone: "bg-[#e7f6ee] text-[#19714e]" },
  { patient: "Leon Weber", time: "10:00", status: "Needs review", tone: "bg-[#fff3d8] text-[#895400]" },
  { patient: "Anika Fischer", time: "11:30", status: "Sync failed", tone: "bg-[#ffebeb] text-[#b52f2f]" },
];

export function CalendarKeeperDesktopPrototype() {
  const [activeTab, setActiveTab] = useState<Tab>("schedule");
  const [isDegraded, setIsDegraded] = useState(true);
  const [patient, setPatient] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [bookings, setBookings] = useState(initialBookings);
  const [setupProgress, setSetupProgress] = useState(2);

  const createBooking = () => {
    if (!patient || !time) return;
    setBookings((current) => [...current, { patient, time, status: isDegraded ? "Needs review" : "Synced", tone: isDegraded ? "bg-[#fff3d8] text-[#895400]" : "bg-[#e7f6ee] text-[#19714e]" }]);
    setPatient(null);
    setTime(null);
    setActiveTab("schedule");
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#d8e2f1] bg-[#f4f8ff] shadow-[0_20px_48px_rgba(40,99,216,0.12)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d8e2f1] bg-white px-5 py-4">
        <div><p className="text-[11px] font-bold tracking-[0.14em] text-[#2863d8]">CLARITY SCHEDULE</p><h3 className="mt-1 font-inter text-[22px] font-semibold text-[#24324a]">Cardiology outpatient clinic</h3></div>
        <button type="button" onClick={() => setIsDegraded((current) => !current)} className={`rounded-full px-3 py-2 text-[11px] font-bold ${isDegraded ? "bg-[#fff3d8] text-[#895400]" : "bg-[#e7f6ee] text-[#19714e]"}`}>{isDegraded ? "● Not synced · working locally" : "● Integration healthy"}</button>
      </div>
      <div className="flex flex-wrap gap-1 border-b border-[#d8e2f1] bg-white px-4 pt-3">
        {([{ id: "schedule", label: "Schedule" }, { id: "new", label: "+ New appointment" }, { id: "queue", label: "Reconciliation queue" }, { id: "setup", label: "Setup" }] as { id: Tab; label: string }[]).map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`rounded-t-lg px-4 py-3 text-[12px] font-semibold ${activeTab === tab.id ? "bg-[#eaf1fc] text-[#2863d8]" : "text-[#667085]"}`}>{tab.label}</button>)}
      </div>
      <div className="p-5 md:p-7">
        {isDegraded ? <div className="mb-5 flex items-start justify-between gap-4 rounded-xl border-l-4 border-[#ffaa1d] bg-white p-4 text-[13px] text-[#667085]"><p><strong className="text-[#24324a]">Degraded mode</strong><br />Continue booking locally. Exceptions stay visible until they are reconciled.</p><span className="rounded-full bg-[#fff3d8] px-2 py-1 text-[10px] font-bold text-[#895400]">Action required</span></div> : null}

        {activeTab === "schedule" ? <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]"><section className="rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><div className="flex items-start justify-between"><div><p className="text-[11px] font-bold text-[#2863d8]">TODAY&apos;S SCHEDULE</p><h4 className="mt-1 text-[18px] font-bold text-[#24324a]">Resource-aware appointments</h4></div><span className="rounded-full bg-[#e7f6ee] px-2 py-1 text-[10px] font-bold text-[#19714e]">Room 3 ready</span></div><div className="mt-4 space-y-3">{bookings.map((booking) => <div key={`${booking.patient}-${booking.time}`} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d8e2f1] bg-[#fbfdff] p-4"><div><p className="font-semibold text-[#24324a]">{booking.time} · {booking.patient}</p><p className="mt-1 text-[12px] text-[#667085]">30 min · Dr. Maya Patel · Room 3 · ECG-02 · Prep window</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${booking.tone}`}>{booking.status}</span></div>)}</div></section><aside className="rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><p className="text-[11px] font-bold text-[#2863d8]">SETUP PROGRESS</p><h4 className="mt-1 text-[17px] font-bold text-[#24324a]">First bookable schedule</h4><p className="mt-3 text-[13px] text-[#667085]">{setupProgress} of 4 configuration steps complete.</p><button type="button" onClick={() => setActiveTab("setup")} className="mt-4 w-full rounded-lg border border-[#d8e2f1] px-3 py-2 text-[12px] font-bold text-[#2863d8]">View setup</button></aside></div> : null}

        {activeTab === "new" ? <section className="mx-auto max-w-[760px] rounded-2xl bg-white p-6 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><p className="text-[11px] font-bold text-[#2863d8]">NEW APPOINTMENT</p><h4 className="mt-1 text-[20px] font-bold text-[#24324a]">ECG consultation</h4><p className="mt-1 text-[13px] text-[#667085]">30 min · Dr. Maya Patel · Room 3 · ECG-02 · 10 min preparation</p><div className="mt-6 grid gap-5 md:grid-cols-2"><div><p className="text-[12px] font-bold text-[#24324a]">1. Select patient</p><div className="mt-3 space-y-2">{["Marta Schmidt", "Walk-in patient"].map((name) => <button key={name} type="button" onClick={() => setPatient(name)} className={`w-full rounded-lg border px-3 py-2.5 text-left text-[12px] font-semibold ${patient === name ? "border-[#2863d8] bg-[#eaf1fc]" : "border-[#d8e2f1]"}`}>{name}<span className="ml-2 text-[10px] font-normal text-[#667085]">{name === "Marta Schmidt" ? "Returning patient" : "Identity pending"}</span></button>)}</div></div><div><p className="text-[12px] font-bold text-[#24324a]">2. Select an available time</p><div className="mt-3 grid grid-cols-2 gap-2">{["09:30", "10:30", "13:00", "14:30"].map((slot) => <button key={slot} type="button" onClick={() => setTime(slot)} className={`rounded-lg border px-3 py-2.5 text-[12px] font-semibold ${time === slot ? "border-[#2863d8] bg-[#2863d8] text-white" : "border-[#d8e2f1]"}`}>{slot}</button>)}</div></div></div><div className="mt-5 rounded-xl bg-[#eaf1fc] p-4 text-[12px] leading-[1.5] text-[#506078]"><strong className="text-[#24324a]">Resources reserved together.</strong> The practitioner, room, equipment, and preparation window are validated as one booking.</div><button type="button" disabled={!patient || !time} onClick={createBooking} className="mt-5 w-full rounded-xl bg-[#2863d8] px-4 py-3 text-[13px] font-bold text-white disabled:opacity-40">{patient && time ? `Confirm ${time}` : "Choose a patient and time"}</button></section> : null}

        {activeTab === "queue" ? <section className="mx-auto max-w-[760px] rounded-2xl bg-white p-6 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><p className="text-[11px] font-bold text-[#2863d8]">RECONCILIATION</p><h4 className="mt-1 text-[20px] font-bold text-[#24324a]">Exceptions that need attention</h4><div className="mt-5 space-y-3">{bookings.filter((booking) => booking.status !== "Synced").map((booking) => <div key={`queue-${booking.patient}-${booking.time}`} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#d8e2f1] p-4"><div><p className="font-semibold text-[#24324a]">{booking.patient} · {booking.time}</p><p className="mt-1 text-[12px] text-[#667085]">{booking.status === "Sync failed" ? "Integration timeout" : "Identity verification pending"}</p></div><button type="button" onClick={() => setBookings((current) => current.map((item) => item.patient === booking.patient && item.time === booking.time ? { ...item, status: "Synced", tone: "bg-[#e7f6ee] text-[#19714e]" } : item))} className="rounded-lg border border-[#d8e2f1] px-3 py-2 text-[12px] font-bold text-[#2863d8]">Verify & reconcile</button></div>)}</div></section> : null}

        {activeTab === "setup" ? <section className="mx-auto max-w-[760px] rounded-2xl bg-white p-6 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><p className="text-[11px] font-bold text-[#2863d8]">ONBOARDING</p><h4 className="mt-1 text-[20px] font-bold text-[#24324a]">Build the first bookable schedule</h4><div className="mt-5 space-y-3">{["Add a practitioner", "Add a consultation room and equipment", "Create ECG appointment type · 30 min + 10 min prep", "Publish availability"].map((step, index) => <div key={step} className="flex items-center gap-3 rounded-xl border border-[#d8e2f1] p-3"><span className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${index < setupProgress ? "bg-[#e7f6ee] text-[#19714e]" : "bg-[#eaf1fc] text-[#2863d8]"}`}>{index < setupProgress ? "✓" : index + 1}</span><p className="text-[13px] font-semibold text-[#24324a]">{step}</p></div>)}</div>{setupProgress < 4 ? <button type="button" onClick={() => setSetupProgress((current) => current + 1)} className="mt-5 rounded-xl bg-[#2863d8] px-4 py-3 text-[13px] font-bold text-white">Complete next step</button> : <p className="mt-5 rounded-xl bg-[#e7f6ee] p-3 text-center text-[12px] font-bold text-[#19714e]">Schedule is ready to publish.</p>}</section> : null}
      </div>
    </div>
  );
}

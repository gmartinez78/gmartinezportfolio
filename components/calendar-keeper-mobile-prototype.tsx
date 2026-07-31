"use client";

import { useState } from "react";
import { Bell, CalendarDays, CheckCircle2, CirclePlus, ClipboardList, Clock3, Settings2, UserRound } from "lucide-react";

type Screen = "role" | "schedule" | "book" | "queue" | "setup";
type Entrance = "console" | "patient";

const initialAppointments = [
  { name: "Marta Schmidt", time: "09:00", status: "Synced", tone: "bg-[#e7f6ee] text-[#19714e]" },
  { name: "Leon Weber", time: "10:00", status: "Needs review", tone: "bg-[#fff3d8] text-[#895400]" },
  { name: "Anika Fischer", time: "11:30", status: "Sync failed", tone: "bg-[#ffebeb] text-[#b52f2f]" },
];

export function CalendarKeeperMobilePrototype() {
  const [screen, setScreen] = useState<Screen>("role");
  const [entrance, setEntrance] = useState<Entrance>("console");
  const [isDegraded, setIsDegraded] = useState(true);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [setupProgress, setSetupProgress] = useState(2);
  const [notice, setNotice] = useState("Degraded mode is active. Scheduling remains available.");

  const setupSteps = ["Add practitioner", "Add room & equipment", "Create appointment type", "Publish availability"];

  const addAppointment = () => {
    if (!selectedTime || !selectedPatient) return;
    setAppointments((current) => [...current, { name: selectedPatient, time: selectedTime, status: isDegraded ? "Needs review" : "Synced", tone: isDegraded ? "bg-[#fff3d8] text-[#895400]" : "bg-[#e7f6ee] text-[#19714e]" }]);
    setNotice(isDegraded ? "Appointment created locally. Identity verification is pending." : "Appointment confirmed.");
    setSelectedTime(null);
    setSelectedPatient(null);
    setScreen(entrance === "patient" ? "role" : "schedule");
  };

  return (
    <div className="mx-auto w-full max-w-[410px] rounded-[42px] border-[8px] border-[#17243b] bg-[#17243b] p-2 shadow-[0_24px_56px_rgba(14,41,81,0.24)]">
      <div className="overflow-hidden rounded-[32px] bg-[#f4f8ff]">
        <div className="flex h-7 items-center justify-between bg-[#17243b] px-6 text-[10px] font-medium text-white">
          <span>9:41</span><span className="h-3 w-20 rounded-full bg-black" aria-hidden="true" /><span>● ◔</span>
        </div>
        <div className="min-h-[650px] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dcecff] text-[12px] font-bold text-[#2863d8]">MS</span><div><p className="text-[9px] font-bold tracking-[0.15em] text-[#2863d8]">CLARITY SCHEDULE</p><h3 className="mt-0.5 text-[18px] font-bold text-[#24324a]">{screen === "role" ? "Choose an entrance" : screen === "book" ? entrance === "patient" ? "Book a return visit" : "New appointment" : screen === "queue" ? "Action queue" : screen === "setup" ? "First bookable schedule" : "Calendar Keeper"}</h3></div></div>
            {screen !== "role" ? <button type="button" aria-label="Toggle integration status" onClick={() => { setIsDegraded((current) => !current); setNotice(isDegraded ? "Integration restored. Review outstanding appointments." : "Degraded mode is active. Scheduling remains available."); }} className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${isDegraded ? "bg-[#fff3d8] text-[#895400]" : "bg-[#e7f6ee] text-[#19714e]"}`}><Bell size={12} />{isDegraded ? "Not synced" : "Synced"}</button> : null}
          </div>

          {screen === "role" ? <div className="mt-8"><p className="text-[12px] leading-[1.5] text-[#667085]">One shared scheduling core, accessed through two focused entrances.</p><div className="mt-5 space-y-3">{[{ id: "patient", label: "Returning patient", description: "A deliberately simple surface for booking or managing a familiar visit" }, { id: "console", label: "Calendar Keeper console", description: "A coordination workspace for assistants, clinicians, and practice operations" }].map((item) => <button key={item.id} type="button" onClick={() => setEntrance(item.id as Entrance)} className={`w-full rounded-2xl border p-4 text-left ${entrance === item.id ? "border-[#2863d8] bg-[#eaf1fc] shadow-[0_8px_20px_rgba(40,99,216,0.08)]" : "border-[#d8e2f1] bg-white"}`}><span className="block text-[12px] font-bold text-[#24324a]">{item.label}</span><span className="mt-1 block text-[10px] text-[#667085]">{item.description}</span></button>)}</div><button type="button" onClick={() => setScreen(entrance === "patient" ? "book" : "schedule")} className="mt-5 w-full rounded-xl bg-[#2863d8] px-4 py-3 text-[12px] font-bold text-white">Open {entrance === "patient" ? "patient booking" : "the console"}</button></div> : null}

          {screen === "schedule" ? <>
            {isDegraded ? <div className="mt-4 rounded-xl border-l-4 border-[#ffaa1d] bg-white p-3 text-[11px] leading-[1.45] text-[#667085]"><strong className="text-[#24324a]">Degraded mode</strong><br />Continue booking locally. Reconcile records when service returns.</div> : null}
            <div className="mt-4 rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold text-[#2863d8]">TODAY&apos;S SCHEDULE</p><p className="mt-1 text-[14px] font-bold text-[#24324a]">Resource-aware bookings</p></div><span className="flex items-center gap-1 rounded-full bg-[#e7f6ee] px-2 py-1 text-[9px] font-bold text-[#19714e]"><CheckCircle2 size={10} />Room 3 ready</span></div><div className="mt-3 space-y-2.5">{appointments.map((appointment) => <div key={`${appointment.name}-${appointment.time}`} className="rounded-xl border border-[#d8e2f1] bg-[#fbfdff] p-3"><div className="flex justify-between gap-2"><div><p className="flex items-center gap-1.5 text-[12px] font-bold text-[#24324a]"><Clock3 size={12} className="text-[#2863d8]" />{appointment.time} · {appointment.name}</p><p className="mt-1 text-[10px] text-[#667085]">30 min · Dr. Maya Patel</p></div><span className={`h-fit rounded-full px-2 py-1 text-[9px] font-bold ${appointment.tone}`}>{appointment.status}</span></div><p className="mt-2 text-[9px] font-bold text-[#506078]">Room 3 · ECG-02 · Prep window</p></div>)}</div></div>
            <div className="mt-3 grid grid-cols-3 gap-2">{[{ label: "Book", icon: CirclePlus, action: () => setScreen("book") }, { label: "Review", icon: ClipboardList, action: () => setScreen("queue") }, { label: "Set up", icon: Settings2, action: () => setScreen("setup") }].map((item) => <button key={item.label} type="button" onClick={item.action} className="flex flex-col items-center rounded-xl border border-[#d8e2f1] bg-white px-2 py-2.5 text-[9px] font-bold text-[#506078]"><item.icon size={15} className="mb-1 text-[#2863d8]" />{item.label}</button>)}</div>
            <button type="button" onClick={() => setScreen("setup")} className="mt-3 flex w-full items-center justify-between rounded-xl border border-[#d8e2f1] bg-white px-3 py-2.5 text-left"><span><span className="block text-[9px] font-bold tracking-[0.12em] text-[#2863d8]">SETUP PROGRESS</span><span className="mt-1 block text-[11px] font-bold text-[#24324a]">{setupProgress} of 4 steps complete</span></span><span className="text-[11px] font-bold text-[#2863d8]">View →</span></button>
            <button type="button" onClick={() => setScreen("book")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2863d8] px-4 py-3 text-[12px] font-bold text-white"><CirclePlus size={16} />New appointment</button>
          </> : null}

          {screen === "book" ? <><button type="button" onClick={() => setScreen(entrance === "patient" ? "role" : "schedule")} className="mt-4 text-[11px] font-bold text-[#2863d8]">← {entrance === "patient" ? "Choose an entrance" : "Today&apos;s schedule"}</button><div className="mt-4 rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><p className="text-[10px] font-bold text-[#2863d8]">PATIENT</p><p className="mt-2 text-[12px] font-bold text-[#24324a]">Who is this appointment for?</p><div className="mt-3 grid gap-2">{["Marta Schmidt", "Walk-in patient"].map((patient) => <button key={patient} type="button" onClick={() => setSelectedPatient(patient)} className={`rounded-lg border px-3 py-2.5 text-left text-[11px] font-bold ${selectedPatient === patient ? "border-[#2863d8] bg-[#eaf1fc] text-[#24324a]" : "border-[#d8e2f1] bg-white text-[#24324a]"}`}>{patient}<span className="ml-2 text-[9px] font-medium text-[#667085]">{patient === "Marta Schmidt" ? "Returning patient" : "Identity pending"}</span></button>)}</div><p className="mt-5 text-[10px] font-bold text-[#2863d8]">ECG CONSULTATION</p><p className="mt-1 text-[13px] leading-[1.5] text-[#667085]">30 min · Dr. Maya Patel · Room 3 · ECG-02</p><p className="mt-5 text-[12px] font-bold text-[#24324a]">Available times</p><div className="mt-3 grid grid-cols-2 gap-2">{["09:30", "10:30", "13:00", "14:30"].map((time) => <button key={time} type="button" onClick={() => setSelectedTime(time)} className={`rounded-lg border px-2 py-2.5 text-[11px] font-bold ${selectedTime === time ? "border-[#2863d8] bg-[#2863d8] text-white" : "border-[#d8e2f1] bg-white text-[#24324a]"}`}>{time}</button>)}</div><div className="mt-4 rounded-xl bg-[#eaf1fc] p-3 text-[10px] leading-[1.45] text-[#506078]"><strong className="text-[#24324a]">Resources reserved together</strong><br />The practitioner, room, equipment, and preparation window are checked as one booking.</div><button type="button" disabled={!selectedTime || !selectedPatient} onClick={addAppointment} className="mt-4 w-full rounded-xl bg-[#2863d8] px-4 py-3 text-[12px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">{selectedTime && selectedPatient ? `Confirm ${selectedTime}` : "Choose a patient and time"}</button></div></> : null}

          {screen === "queue" ? <><div className="mt-4 rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><p className="text-[10px] font-bold text-[#2863d8]">RECONCILIATION</p><p className="mt-1 text-[15px] font-bold text-[#24324a]">Action queue</p><div className="mt-4 space-y-3">{appointments.filter((appointment) => appointment.status !== "Synced").map((appointment) => <div key={`queue-${appointment.name}-${appointment.time}`} className="rounded-xl border border-[#d8e2f1] p-3"><p className="text-[12px] font-bold text-[#24324a]">{appointment.name}</p><p className="mt-1 text-[10px] text-[#667085]">{appointment.status === "Sync failed" ? "Integration timeout" : "Identity verification pending"}</p><button type="button" onClick={() => { setAppointments((current) => current.map((item) => item.name === appointment.name && item.time === appointment.time ? { ...item, status: "Synced", tone: "bg-[#e7f6ee] text-[#19714e]" } : item)); setNotice("Appointment reconciled."); }} className="mt-3 w-full rounded-lg border border-[#d8e2f1] px-2 py-2 text-[10px] font-bold text-[#2863d8]">Verify & reconcile</button></div>)}</div></div></> : null}

          {screen === "setup" ? <><button type="button" onClick={() => setScreen("schedule")} className="mt-4 text-[11px] font-bold text-[#2863d8]">← Today&apos;s schedule</button><div className="mt-4 rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(40,99,216,0.08)]"><p className="text-[10px] font-bold text-[#2863d8]">ONBOARDING</p><p className="mt-1 text-[13px] leading-[1.5] text-[#667085]">Set up the people, resources, and appointment rules needed before the first booking.</p><div className="mt-5 space-y-3">{setupSteps.map((step, index) => <div key={step} className="flex items-center gap-3"><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${index < setupProgress ? "bg-[#e7f6ee] text-[#19714e]" : "bg-[#eaf1fc] text-[#2863d8]"}`}>{index < setupProgress ? "✓" : index + 1}</span><div><p className="text-[11px] font-bold text-[#24324a]">{step}</p>{index === 2 ? <p className="mt-0.5 text-[9px] text-[#667085]">ECG consultation · 30 min · 10 min prep</p> : null}</div></div>)}</div>{setupProgress < setupSteps.length ? <button type="button" onClick={() => { setSetupProgress((current) => current + 1); setNotice(`${setupSteps[setupProgress]} completed.`); }} className="mt-5 w-full rounded-xl bg-[#2863d8] px-4 py-3 text-[12px] font-bold text-white">Complete next step</button> : <div className="mt-5 rounded-xl bg-[#e7f6ee] p-3 text-center text-[11px] font-bold text-[#19714e]">Schedule is ready to publish.</div>}</div></> : null}

          <p className="mt-4 text-[10px] leading-[1.4] text-[#667085]" aria-live="polite">{notice}</p>
        </div>
        {screen !== "role" ? <nav className="flex border-t border-[#d8e2f1] bg-white px-3 py-2" aria-label="Prototype navigation">
          {(entrance === "patient" ? [{ id: "book", label: "Book", icon: CalendarDays }, { id: "role", label: "Switch", icon: UserRound }] : [{ id: "schedule", label: "Schedule", icon: CalendarDays }, { id: "book", label: "New", icon: CirclePlus }, { id: "queue", label: "Queue", icon: ClipboardList }, { id: "setup", label: "Setup", icon: Settings2 }, { id: "role", label: "Switch", icon: UserRound }]).map((item) => <button key={item.id} type="button" onClick={() => setScreen(item.id as Screen)} className={`flex flex-1 flex-col items-center rounded-lg px-2 py-1.5 text-[9px] font-bold ${screen === item.id ? "bg-[#2863d8] text-white" : "text-[#667085]"}`}><item.icon size={13} className="mb-0.5" />{item.label}</button>)}
        </nav> : null}
      </div>
    </div>
  );
}

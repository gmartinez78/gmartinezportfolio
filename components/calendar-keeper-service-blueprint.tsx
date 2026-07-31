const stages = ["Choose context", "Find a time", "Reserve resources", "Confirm or recover", "Manage follow-up"];

const lanes = [
  {
    label: "User actions",
    tone: "bg-[#eaf1fc] text-[#0e2951]",
    cells: ["Select role and identify the patient", "Choose visit type and a suitable time", "Review appointment details", "Receive confirmation or see a clear exception", "Rebook, cancel, or check status"],
  },
  {
    label: "Frontstage",
    tone: "bg-[#f2edff] text-[#0e2951]",
    cells: ["Two entrances with a clear next action", "Calendar-led availability with visit details", "Resource-aware booking summary", "Console: action queue · Patient: clear next step", "Self-service controls with durable confirmation"],
  },
  {
    label: "Backstage",
    tone: "bg-[#eef9f5] text-[#0e2951]",
    cells: ["Load known patient and practice context", "Check practitioner, room, equipment, and prep together", "Create a shared booking or local pending record", "Queue identity and sync exceptions for reconciliation", "Update availability and notify the right people"],
  },
  {
    label: "Supporting systems",
    tone: "bg-[#fff7e9] text-[#0e2951]",
    cells: ["Patient identity and consent", "Availability, appointment-type rules", "Practice management and resource data", "Integration / eGK status and audit trail", "Messaging and appointment history"],
  },
];

export function CalendarKeeperServiceBlueprint() {
  return (
    <div className="mx-auto max-w-[1120px] overflow-x-auto rounded-[24px] border border-[#d9e5f2] bg-white shadow-[0_12px_32px_rgba(14,41,81,0.06)]">
      <div className="min-w-[980px] p-5 md:p-7">
        <div className="grid grid-cols-[150px_repeat(5,minmax(0,1fr))] border-b border-[#d9e5f2]">
          <div className="p-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Journey stage</div>
          {stages.map((stage, index) => <div key={stage} className="border-l border-[#d9e5f2] p-3"><p className="text-[10px] font-semibold tracking-[0.16em] text-[#1183D0]">0{index + 1}</p><p className="mt-1 font-inter text-[14px] font-semibold leading-[1.25] text-[#0e2951]">{stage}</p></div>)}
        </div>
        {lanes.map((lane, index) => <div key={lane.label} className={`grid grid-cols-[150px_repeat(5,minmax(0,1fr))] ${index === 2 ? "border-t-2 border-dashed border-[#9ebcd7]" : "border-t border-[#d9e5f2]"}`}>
          <div className="p-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${lane.tone}`}>{lane.label}</span>{index === 2 ? <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.08em] text-[#5c7792]">Line of visibility</p> : null}</div>
          {lane.cells.map((cell) => <div key={cell} className="border-l border-[#d9e5f2] p-3 text-[11px] leading-[1.5] text-[#5c7792]">{cell}</div>)}
        </div>)}
      </div>
    </div>
  );
}

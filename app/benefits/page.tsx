import { Playfair_Display, Inter } from "next/font/google";
import Image from "next/image";
import { withBasePath } from "../../lib/site";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ── Assets from Figma ─────────────────────────────────────────────────────────
const ASSETS = {
  figmaLogo: "/images/benefits/figma-logo.png",
  jiraLogo: "/images/benefits/jira-logo.png",
  miroLogo: "/images/benefits/miro-logo.png",
  userIcon: "/images/benefits/user-icon.png",
  clockIcon: "/images/benefits/clock-icon.png",
  arrowVector: "/images/benefits/arrow-vector.png",
  sigPenYellow: "/images/benefits/sig-pen-yellow.png",
  sigPenTeal: "/images/benefits/sig-pen-teal.png",
  miscSticker: "/images/benefits/misc-sticker.png",
  paychex: "/images/paychex.png",
  nayya: "/images/nayya.png",
  ibx: "/images/ibx.png",
};

// ── Data ──────────────────────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  "Product Owner", "Program manager", "Business analyst",
  "Researcher", "Dev team (12)", "UX manager",
  "UX Lead", "UX/UI designer", "Service architect", "Scrum master",
];

const MY_ROLE = ["User Research", "UX/UI Design", "Product Thinking", "Narrative"];
const TOOLS = ["Figma", "Jira", "Miro", "Webex", "Outlook", "Copilot"];

const USER_PAIN_POINTS = [
  {
    bold: "manual development effort",
    before: "Adding new employees required support tickets and ",
    after: ".",
  },
  {
    bold: "through emails.",
    before: "Data needed to be collected, validated and sent across teams. Changes were tracked ",
    after: "",
  },
  {
    bold: "No centralized governance",
    before: "",
    after: " or clear permission structure.",
  },
];

const ADMIN_PAIN_POINTS = [
  {
    bold: "multiple payroll cycles",
    before: "Benefits changes required running ",
    after: " and manual reconciliation.",
  },
  {
    bold: "aggregate employee data",
    before: "Admins had no easy way to ",
    after: " across departments in one place.",
  },
  {
    bold: "enrollment spikes",
    before: "When ",
    after: " occurred, there was no clear escalation or alert workflow.",
  },
];

const CONSTRAINTS = [
  {
    icon: ASSETS.clockIcon,
    alt: "Clock",
    title: "An aggressive ",
    bold: "timeline.",
    label: "Constraints",
  },
  {
    icon: ASSETS.userIcon,
    alt: "User",
    title: "Balancing the ",
    bold: "product's existing patterns",
    after: " with user needs without disrupting the experience.",
    label: "Constraints",
  },
];

const STRATEGY_POINTS = [
  {
    before: "Define the ",
    bold: "underlying architecture",
    after: " and logic before changing the UI.",
  },
  {
    before: "Find what parts of the system work well and ",
    bold: "build around those.",
    after: "",
  },
  {
    before:
      "With no design system, collaboration with the development team ensured the forward-facing UI remained ",
    bold: "cohesive throughout",
    after: ".",
  },
];

const DESIGN_PROCESS = [
  { label: "Empathize", color: "#87d4ac", desc: "User interviews & stakeholder sessions" },
  { label: "Define", color: "#f5e692", desc: "Problem framing & pain point mapping" },
  { label: "Ideate", color: "#d9b8ff", desc: "Flows, architecture & wireframing" },
  { label: "Prototype", color: "#68c7c1", desc: "Hi-fi screens & interactive prototypes" },
  { label: "Test", color: "#d1f090", desc: "Usability testing & dev collaboration" },
];

const RESULTS = [
  { value: "72%", label: "Reduction in processing time" },
  { value: "500+", label: "Employees self-managed without IT tickets" },
  { value: "3 mo", label: "End-to-end design & delivery" },
];

const REFLECTIONS = [
  {
    title: "Architecture before UI",
    body:
      "Investing time in mapping the permission model before designing screens prevented costly rework. The logic had to be airtight before any pixel moved.",
  },
  {
    title: "Trust through constraints",
    body:
      "Working without a design system forced tight collaboration with engineers. Constant syncs kept the UI cohesive and the handoff smooth even under timeline pressure.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-inter text-[#06578d] text-[19px] leading-normal tracking-wide">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-playfair italic text-[#1183D0] text-[45px] leading-tight font-normal">
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <div
      className="w-full h-px"
      style={{ background: "linear-gradient(to right, rgba(17,131,208,0.4), rgba(9,67,106,0))" }}
    />
  );
}

function PainPoint({ before, bold, after }: { before: string; bold: string; after: string }) {
  return (
    <p className="font-inter text-[#06578d] text-[22px] leading-[1.9] font-normal">
      {before}
      <strong className="font-semibold">{bold}</strong>
      {after}
    </p>
  );
}

// ── User Management Table Preview ─────────────────────────────────────────────
function ProductPreview() {
  const rows = [
    { name: "Hanks, Tom", email: "tomhanks@mail.com", role: "Billing", status: "Active" },
    { name: "Pons, Tamara", email: "tamaraponss@mail.com", role: "Reporting & Form Admin", status: "Invitation pending" },
    { name: "Laczko, Billie", email: "laczkobillie@mail.com", role: "Billing", status: "Active" },
    { name: "Davila, Ryan", email: "davilaryan@mail.com", role: "Billing", status: "Active" },
    { name: "Sulivan, Gretchen", email: "sulivang@mail.com", role: "Reporting & Form Admin", status: "Invitation pending" },
    { name: "Thai, Mary", email: "thaymary@mail.com", role: "Form", status: "Active" },
  ];
  return (
    <div className="rounded-[24px] overflow-hidden border-2 border-[#1183D0]/20 shadow-[0_24px_64px_rgba(17,131,208,0.18)]">
      {/* App chrome */}
      <div className="bg-[#f1f3f5] px-5 py-2.5 flex items-center gap-4 border-b border-[#e0e0e0]">
        <div className="bg-[#1183D0] h-3.5 w-10 rounded" />
        {["Clients", "Users", "Reports", "Forms", "Billing"].map((t) => (
          <span key={t} className="text-[#7f868f] text-[10px] font-inter">{t}</span>
        ))}
      </div>
      {/* Tab bar */}
      <div className="bg-white px-10 pt-3 flex gap-6 border-b border-[#ccc]">
        {["UserAccounts", "Roles and Permissions", "Settings"].map((t, i) => (
          <div key={t} className="flex flex-col gap-1.5 pb-0">
            <span className={`text-[11px] font-inter ${i === 0 ? "text-black font-semibold" : "text-[#7f868f]"}`}>{t}</span>
            <div className={`h-[2px] rounded ${i === 0 ? "bg-[#148ce6]" : "bg-transparent"}`} />
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="bg-white px-8 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="border border-[#d8d8d8] rounded px-3 py-1.5 text-[11px] text-[#303030] font-inter w-64">
            Search by name, role, or branch
          </div>
          <div className="bg-[#46b275] text-white text-[11px] px-4 py-1.5 rounded font-inter">Add User</div>
        </div>
        <table className="w-full text-left text-[11px] font-inter">
          <thead>
            <tr className="bg-[#f7f9fb] text-[#000] uppercase text-[10px] font-semibold tracking-wide">
              {["Name", "Role", "Branch Location", "Sign In", "Status", "Actions"].map((h) => (
                <th key={h} className="px-3 py-2.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-[#dbdde0]">
                <td className="px-3 py-2.5">
                  <p className="font-bold text-[#262a2d]">{r.name}</p>
                  <p className="text-[#7f868f]">{r.email}</p>
                </td>
                <td className="px-3 py-2.5 text-[#262a2d]">{r.role}</td>
                <td className="px-3 py-2.5 text-[#262a2d]">Company</td>
                <td className="px-3 py-2.5 text-[#262a2d]">Sep 12, 2022</td>
                <td className="px-3 py-2.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${r.status === "Active" ? "bg-[#e6f7ee] text-[#46b275]" : "bg-[#fff3e0] text-[#e67e00]"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-[#7f868f]">···</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Bar Chart ─────────────────────────────────────────────────────────────────
function BarChart() {
  const bars = [
    { h: 145, color: "#1183D0", label: "Before" },
    { h: 120, color: "#1183D0", label: "" },
    { h: 101, color: "#4d87ae", label: "" },
    { h: 69, color: "#7CB8E8", label: "" },
    { h: 43, color: "#afd4ed", label: "After" },
  ];
  return (
    <div className="flex items-end gap-4 h-[160px] px-4 pt-4">
      {bars.map((b, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full rounded-t-md"
            style={{ height: b.h, backgroundColor: b.color, transition: "height 0.6s ease" }}
          />
          {b.label && (
            <span className="text-[10px] text-[#4d87ae] font-inter mt-1">{b.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Design Strategy Illustration ──────────────────────────────────────────────
function KanbanIllustration() {
  const cols = [
    { color: "#87d4ac", items: [{ h: 92, c: "#87d4ac" }, { h: 66, c: "#f5e692" }, { h: 92, c: "#d1f090" }] },
    { color: "#68c7c1", items: [{ h: 55, c: "#f5e692" }, { h: 53, c: "#d9b8ff" }, { h: 66, c: "#68c7c1" }] },
    { color: "#d1f090", items: [{ h: 92, c: "#87d4ac" }, { h: 55, c: "#f5e692" }, { h: 72, c: "#d1f090" }] },
  ];

  return (
    <div
      className="relative rounded-[28px] overflow-hidden p-8"
      style={{ background: "#e2f7e8", transform: "rotate(3deg)", width: 440, height: 340 }}
    >
      {/* Column header bars */}
      <div className="flex gap-4 mb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 h-4 rounded-full bg-[#87d4ac]" />
        ))}
      </div>
      {/* Cards grid */}
      <div className="flex gap-4 items-end">
        {cols.map((col, ci) => (
          <div key={ci} className="flex-1 flex flex-col gap-3">
            {col.items.map((item, ii) => (
              <div
                key={ii}
                className="w-full rounded-lg"
                style={{ height: item.h * 0.5, backgroundColor: item.c }}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Vertical lines */}
      <div className="absolute top-0 bottom-0 border-l border-[#87d4ac]/40" style={{ left: "37%" }} />
      <div className="absolute top-0 bottom-0 border-l border-[#87d4ac]/40" style={{ left: "67%" }} />
      {/* Sticky note */}
      <div
        className="absolute bottom-10 left-12 bg-[#ffcd29] border border-[#ba9622] rounded-bl-xl rounded-br-xl rounded-tr-xl px-3 py-1.5 text-[#55440e] text-[11px] font-medium font-inter shadow-sm"
      >
        Agreed!
      </div>
      <div
        className="absolute top-16 right-8 bg-[#93c7c2] border border-[#4a8e88] rounded-bl-xl rounded-br-xl rounded-tr-xl px-3 py-1.5 text-[#1d4b47] text-[11px] font-medium font-inter shadow-sm"
      >
        I love using these!
      </div>
      <Image src={ASSETS.miscSticker} alt="" width={28} height={28} className="absolute bottom-20 left-1/2" />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BenefitsPage() {
  return (
    <main
      className={`${playfair.variable} ${inter.variable} bg-[#1183D0] font-inter text-[#06578d] overflow-x-hidden`}
    >
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-[#1183D0]/90 backdrop-blur border-b border-white/10 h-16 px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm font-inter">
          <a href={withBasePath("/")} className="text-white/60 hover:text-white transition-colors">Home</a>
          <span className="text-white/30">›</span>
          <a href={withBasePath("/projects")} className="text-white/60 hover:text-white transition-colors">Projects</a>
          <span className="text-white/30">›</span>
          <span className="text-white font-semibold">Enhancing Benefits Enrollment</span>
        </div>
        <div className="flex items-center gap-3">
          {["HR/Payroll SaaS", "UX Research", "IA", "Interaction Design", "Design Systems"].map((tag) => (
            <span key={tag} className="text-xs text-white/70 bg-white/10 px-3 py-1 rounded-full hidden lg:inline">{tag}</span>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative px-20 pt-16 pb-0 max-w-[1440px] mx-auto">
        {/* Company logos */}
        <div className="flex items-center gap-6 mb-10">
          <Image src={ASSETS.paychex} alt="Paychex" width={120} height={32} className="object-contain opacity-80 brightness-0 invert" />
          <Image src={ASSETS.nayya} alt="Nayya" width={80} height={32} className="object-contain opacity-80 brightness-0 invert" />
          <Image src={ASSETS.ibx} alt="IBX" width={60} height={32} className="object-contain opacity-80 brightness-0 invert" />
        </div>

        <div className="flex items-end justify-between gap-12 mb-6">
          {/* Left: text */}
          <div className="max-w-[520px]">
            <p className="text-white/60 text-[13px] uppercase tracking-[3px] font-inter mb-3">
              Case Study Redesign 2025
            </p>
            <h1 className="font-inter font-bold text-white text-[44px] leading-[1.15] mb-5">
              Enhancing{" "}
              <span className="font-playfair italic font-normal">Benefits Enrollment</span>
            </h1>
            <p className="text-white/80 text-[18px] leading-[1.7] font-inter">
              Replaced a manual workflow with a centralized, self-managed platform;{" "}
              <strong className="text-white font-semibold">cutting processing time by 72%.</strong>
            </p>
          </div>

          {/* Right: 72% stat */}
          <div className="shrink-0 text-right">
            <div className="font-inter font-bold text-white/10 text-[180px] leading-none select-none">
              72%
            </div>
          </div>
        </div>

        {/* Product Screenshot */}
        <div className="mt-4 -mx-4">
          <ProductPreview />
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="bg-[#1183D0] px-20 py-20 max-w-[1440px] mx-auto">
        <div className="mb-6">
          <SectionLabel>Overview</SectionLabel>
          <div className="relative inline-block">
            <SectionTitle>Structure</SectionTitle>
            <div className="absolute bottom-2 left-0 w-28 h-3 bg-[#afd4ed]/30 rounded-full" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-0 border-t border-[#4d87ae]/30 pt-8">
          {/* Team */}
          <div className="pr-8 border-r border-[#4d87ae]/20">
            <p className="text-[#4d87ae] text-[15px] uppercase tracking-[1.5px] mb-4 font-inter">
              Team Members
            </p>
            <div className="h-[3px] w-full bg-[#4d87ae]/20 rounded-full mb-5" />
            <ul className="space-y-1">
              {TEAM_MEMBERS.map((m) => (
                <li key={m} className="text-[#4d87ae] text-[16px] font-inter capitalize leading-[1.75]">{m}</li>
              ))}
            </ul>
          </div>

          {/* Role */}
          <div className="px-8 border-r border-[#4d87ae]/20">
            <p className="text-[#06578d] text-[15px] uppercase tracking-[1.5px] mb-4 font-inter font-medium">
              My Role
            </p>
            <div className="h-[3px] w-full bg-[#1183D0] rounded-full mb-5" />
            <ul className="space-y-1">
              {MY_ROLE.map((r) => (
                <li key={r} className="text-[#06578d] text-[16px] font-inter capitalize leading-[1.75] font-medium">{r}</li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="px-8 border-r border-[#4d87ae]/20">
            <p className="text-[#4d87ae] text-[15px] uppercase tracking-[1.5px] mb-4 font-inter">
              Tools Used
            </p>
            <div className="h-[3px] w-full bg-[#4d87ae]/20 rounded-full mb-5" />
            <ul className="space-y-1 mb-6">
              {TOOLS.map((t) => (
                <li key={t} className="text-[#4d87ae] text-[16px] font-inter capitalize leading-[1.75]">{t}</li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <Image src={ASSETS.figmaLogo} alt="Figma" width={20} height={30} className="object-contain" />
              <Image src={ASSETS.jiraLogo} alt="Jira" width={30} height={30} className="object-contain rounded-md" />
              <Image src={ASSETS.miroLogo} alt="Miro" width={30} height={30} className="object-contain rounded-md" />
            </div>
          </div>

          {/* Timeline */}
          <div className="pl-8">
            <p className="text-[#4d87ae] text-[15px] uppercase tracking-[1.5px] mb-4 font-inter">
              Timeline
            </p>
            <div className="h-[3px] w-full bg-[#4d87ae]/20 rounded-full mb-5" />
            <p className="text-[#4d87ae] text-[16px] font-inter capitalize leading-[1.75]">3 months</p>
          </div>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section className="px-20 py-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 gap-20">
          {/* Admin Pain Points – left */}
          <div>
            <SectionLabel>Admins' Pain</SectionLabel>
            <SectionTitle>Points</SectionTitle>
            <div className="mt-8 flex flex-col gap-8">
              {ADMIN_PAIN_POINTS.map((p, i) => (
                <div key={i}>
                  <PainPoint {...p} />
                  {i < ADMIN_PAIN_POINTS.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          </div>

          {/* User Pain Points – right */}
          <div>
            <SectionLabel>Users&apos; Pain</SectionLabel>
            <SectionTitle>Points</SectionTitle>
            <div className="mt-8 flex flex-col gap-8">
              {USER_PAIN_POINTS.map((p, i) => (
                <div key={i}>
                  <PainPoint {...p} />
                  {i < USER_PAIN_POINTS.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 72% Big Number ── */}
      <section className="px-20 py-8 max-w-[1440px] mx-auto flex items-center justify-center">
        <div className="text-center">
          <p className="font-inter font-bold text-white/8 select-none leading-none"
            style={{ fontSize: "clamp(120px, 18vw, 280px)" }}>
            72%
          </p>
          <p className="font-inter text-white/50 text-[18px] tracking-wide -mt-10">
            reduction in benefits processing time
          </p>
        </div>
      </section>

      {/* ── Constraints ── */}
      <section className="px-20 py-20 max-w-[1440px] mx-auto">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <SectionTitle>Constraints</SectionTitle>
            <div className="absolute bottom-2 left-8 w-16 h-3 bg-[#bedef6]/30 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {CONSTRAINTS.map((c, i) => (
            <div key={i} className="bg-white rounded-[32px] p-8 relative shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <Image src={c.icon} alt={c.alt} width={30} height={30} className="object-contain opacity-70" />
                <span className="bg-[rgba(174,211,237,0.29)] text-[#1183D0] text-[13px] font-medium font-inter px-4 py-1 rounded-full">
                  {c.label}
                </span>
              </div>
              <p className="text-[#06578d] text-[22px] font-inter leading-[1.85] mt-4">
                {c.title && <span>{c.title}</span>}
                <strong className="font-semibold">{c.bold}</strong>
                {c.after && <span>{c.after}</span>}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Design Thinking Process ── */}
      <section className="px-20 py-20 max-w-[1440px] mx-auto">
        <div className="mb-12">
          <SectionLabel>Methodology</SectionLabel>
          <SectionTitle>Design Thinking</SectionTitle>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {DESIGN_PROCESS.map((step, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div
                className="h-2 rounded-full"
                style={{ backgroundColor: step.color }}
              />
              <div
                className="rounded-2xl p-5 flex flex-col gap-2 flex-1"
                style={{ backgroundColor: step.color + "33" }}
              >
                <div
                  className="rounded-xl w-full"
                  style={{ height: 80, backgroundColor: step.color }}
                />
                <p className="text-[#06578d] font-inter font-semibold text-[15px] mt-2">
                  {i + 1}. {step.label}
                </p>
                <p className="text-[#4d87ae] font-inter text-[13px] leading-[1.5]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Design Strategy ── */}
      <section className="px-20 py-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <h2 className="font-inter font-normal text-[#06578d] text-[45px] leading-tight mb-8">
              Design{" "}
              <span className="font-playfair italic text-[#2496e2]">Strategy</span>
            </h2>
            <div className="flex flex-col gap-8">
              {STRATEGY_POINTS.map((p, i) => (
                <div key={i}>
                  <PainPoint before={p.before} bold={p.bold} after={p.after} />
                  {i < STRATEGY_POINTS.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          </div>

          {/* Right illustration */}
          <div className="flex justify-end">
            <KanbanIllustration />
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="px-20 py-20 max-w-[1440px] mx-auto">
        <div className="mb-12">
          <SectionLabel>Impact</SectionLabel>
          <SectionTitle>Results</SectionTitle>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Bar chart card */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm">
            <p className="font-inter font-bold text-[#06578d] text-[20px] mb-1">Processing Time</p>
            <p className="font-inter text-[#4d87ae] text-[14px] mb-4">Before vs. After</p>
            <BarChart />
            <div className="border-t border-[#dbdde0] mt-4 pt-4 flex justify-between">
              <p className="font-inter text-[#4d87ae] text-[13px]">Payroll cycle avg. duration</p>
              <p className="font-inter font-bold text-[#1183D0] text-[13px]">72% faster</p>
            </div>
          </div>

          {/* Stat cards column */}
          <div className="flex flex-col gap-6">
            {RESULTS.map((r) => (
              <div key={r.label} className="bg-white rounded-[32px] p-8 shadow-sm flex-1 flex items-center gap-6">
                <span className="font-inter font-bold text-[#1183D0] text-[52px] leading-none shrink-0">
                  {r.value}
                </span>
                <p className="font-inter text-[#06578d] text-[18px] leading-[1.5]">
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Deep Dive ── */}
      <section className="px-20 py-20 max-w-[1440px] mx-auto">
        <div className="mb-10">
          <SectionLabel>Solution</SectionLabel>
          <SectionTitle>The Platform</SectionTitle>
        </div>
        <ProductPreview />
      </section>

      {/* ── Reflections ── */}
      <section className="px-20 py-20 max-w-[1440px] mx-auto">
        <div className="mb-12">
          <div className="relative inline-block">
            <SectionTitle>Reflections</SectionTitle>
            <div className="absolute bottom-2 left-4 w-32 h-4 bg-[#bedef6]/30 rounded-full" />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {REFLECTIONS.map((r, i) => (
            <div key={i}>
              <p className="font-inter text-[#06578d] text-[22px] leading-[1.9]">
                <strong className="font-semibold">{r.title}. </strong>
                {r.body}
              </p>
              {i < REFLECTIONS.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </section>

      {/* ── NDA Notice ── */}
      <section className="px-20 py-10 max-w-[1440px] mx-auto">
        <div className="border-t border-white/15 pt-8">
          <p className="font-inter text-white/40 text-[13px] leading-[1.7] max-w-[900px]">
            <strong className="font-semibold text-white/50">NDA notice:</strong> Parts of this presentation — including some screens and project details — have been redacted or blurred due to a confidentiality agreement signed with the client. The work shown is real; full details are withheld to protect client privacy.
          </p>
        </div>
      </section>

      {/* ── Other Projects ── */}
      <section className="px-20 py-16 max-w-[1440px] mx-auto">
        <p className="font-inter text-white/50 text-[13px] uppercase tracking-[2px] mb-2">More work</p>
        <h2 className="font-playfair italic text-white text-[32px] mb-8">Other Projects</h2>
        <div className="grid grid-cols-3 gap-5">
          {[
            { title: "AI-Powered Benefits Advisor", company: "Nayya", tag: "AI/ML Product", bg: "radial-gradient(ellipse at 20% 50%, #d4e8ff 0%, #edf5fb 70%)", stat: "4.8★" },
            { title: "Accessible Service Portal", company: "Easterseals", tag: "Accessibility", bg: "radial-gradient(ellipse at 80% 20%, #c8f0e0 0%, #edf5fb 70%)", stat: "40%" },
            { title: "Ride Coordination App", company: "Transport for Troops", tag: "Mobile", bg: "radial-gradient(ellipse at 50% 80%, #ffe8c0 0%, #edf5fb 70%)", stat: "60%" },
          ].map((p) => (
            <a key={p.title} href="#" className="group bg-white/10 hover:bg-white/15 border border-white/10 rounded-[28px] overflow-hidden transition-all hover:-translate-y-0.5">
              <div className="h-36 flex items-center justify-center" style={{ background: p.bg }}>
                <span className="font-playfair italic font-bold text-[#1183D0] text-3xl">{p.stat}</span>
              </div>
              <div className="p-6">
                <p className="text-white/50 text-xs mb-1">{p.company}</p>
                <h3 className="font-inter font-semibold text-white text-[15px] leading-snug mb-2">{p.title}</h3>
                <span className="text-xs text-white/40 bg-white/10 px-3 py-1 rounded-full">{p.tag}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/15 px-20 py-8 flex items-center justify-between max-w-[1440px] mx-auto">
        <span className="font-inter text-white/40 text-[13px]">
          © 2025 Greddys Martinez. All rights reserved.
        </span>
        <div className="flex items-center gap-6">
          {["Home", "Projects", "Resume", "Contact"].map((l) => (
            <a key={l} href={l === "Home" ? withBasePath("/") : withBasePath(`/${l.toLowerCase()}`)} className="text-white/40 hover:text-white/80 text-[13px] font-inter transition-colors">{l}</a>
          ))}
        </div>
        <a href={withBasePath("/")} className="font-inter text-[#1183D0] text-[13px] font-medium bg-white px-5 py-2 rounded-full hover:bg-white/90 transition-colors">
          Back to Portfolio
        </a>
      </footer>
    </main>
  );
}

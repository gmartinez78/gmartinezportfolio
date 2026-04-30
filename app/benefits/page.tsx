"use client";

import Image from "next/image";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { SectionHeading } from "../../components/ui/section-heading";
import { resolveProjectHref, resolveTrustedLogo, usePublicCaseStudies, usePublicCaseStudy } from "../../lib/cms/public";
import { withBasePath } from "../../lib/site";

// ── Assets from Figma ─────────────────────────────────────────────────────────
const ASSETS = {
  heroBannerDashboard: withBasePath("/images/benefits/enhancing-benefits-banner.png"),
  figmaLogo: withBasePath("/images/benefits/figma-logo.png"),
  jiraLogo: withBasePath("/images/benefits/jira-logo.png"),
  miroLogo: withBasePath("/images/benefits/miro-logo.png"),
  userIcon: withBasePath("/images/benefits/user-icon.png"),
  clockIcon: withBasePath("/images/benefits/clock-icon.png"),
  arrowVector: withBasePath("/images/benefits/arrow-vector.png"),
  miscSticker: withBasePath("/images/benefits/misc-sticker.png"),
  paychex: withBasePath("/images/c54fy.png"),
  nayya: withBasePath("/images/bBw3A.png"),
  ibx: withBasePath("/images/SNUZw.png"),
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

const CHALLENGE_POINTS = [
  "Manual workarounds wasted users' time and increased the risk of costly errors.",
  "Internal user couldn't change users' roles and permissions on their own, which increased support tickets and development work.",
  "Each unsupported enrollment request took 5-7 business days and was multiplied across hundreds of clients.",
];

const CHALLENGE_METRICS = [
  { value: "85%", label: "of HR teams reported enrollment errors" },
  { value: "3 weeks", label: "average time to complete enrollment cycle" },
  { value: "40%", label: "of employees confused by their benefits" },
];

const TASK_SUMMARY =
  "Design a self-service enrollment experience that reduced support dependency, clarified permissions, and fit the product's existing operational model.";

const RESEARCH_DISCOVERY_ITEMS = [
  {
    title: "User Research",
    body: "Interviewed 50+ HR administrators and employees to understand pain points, workflows, and unmet needs across the enrollment journey.",
    icon: ASSETS.userIcon,
  },
  {
    title: "System Architecture",
    body: "Built a modular component system that scales across multiple employer sizes, from startups to enterprise organizations with 10,000+ employees.",
    icon: ASSETS.arrowVector,
  },
  {
    title: "Role Mapping",
    body: "Mapped internal roles, governance rules, and permission boundaries before UI implementation so the system would support real operational needs.",
    icon: ASSETS.userIcon,
  },
  {
    title: "Flow Validation",
    body: "Validated the enrollment lifecycle against exceptions, support scenarios, and admin edge cases before moving deeper into delivery.",
    icon: ASSETS.clockIcon,
  },
  {
    title: "Cross-Team Review",
    body: "Worked closely with product and engineering to keep the experience coherent while aligning with system constraints and delivery pressure.",
    icon: ASSETS.miscSticker,
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div
      className="w-full h-px"
      style={{ background: "linear-gradient(to right, rgba(17,131,208,0.4), rgba(9,67,106,0))" }}
    />
  );
}

// ── User Management Table Preview ─────────────────────────────────────────────
function ProductPreview() {
  const rows = [
    { name: "Hanks, Tom", email: "tomhanks@mail.com", role: "Billing", status: "Active" },
    { name: "Pons, Tamara", email: "tamaraponss@mail.com", role: "Reporting & Form Admin", status: "Invitation pending" },
    { name: "Laczko, Billie", email: "laczkobillie@mail.com", role: "Billing", status: "Active" },
    { name: "Davila, Ryan", email: "davilaryan@mail.com", role: "Billing", status: "Active" },
  ];
  return (
    <div className="w-full rounded-[24px] overflow-hidden border-2 border-[#1183D0]/20 shadow-[0_24px_64px_rgba(17,131,208,0.18)]">
      {/* App chrome */}
      <div className="bg-[#f1f3f5] px-5 py-2.5 flex items-center gap-4 border-b border-[#e0e0e0]">
        <div className="bg-[#F3F7FA] h-3.5 w-10 rounded" />
        {["Clients", "Users", "Reports", "Forms", "Billing"].map((t) => (
          <span key={t} className="text-[#7f868f] text-[9px] font-inter">{t}</span>
        ))}
      </div>
      {/* Tab bar */}
      <div className="bg-white px-10 pt-3 flex gap-6 border-b border-[#ccc]">
        {["UserAccounts", "Roles and Permissions", "Settings"].map((t, i) => (
          <div key={t} className="flex flex-col gap-1.5 pb-0">
            <span className={`text-[10px] font-inter ${i === 0 ? "text-black font-semibold" : "text-[#7f868f]"}`}>{t}</span>
            <div className={`h-[2px] rounded ${i === 0 ? "bg-[#148ce6]" : "bg-transparent"}`} />
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="bg-white px-6 py-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="border border-[#d8d8d8] rounded px-3 py-1.5 text-[10px] text-[#303030] font-inter w-64">
            Search by name, role, or branch
          </div>
          <div className="bg-[#46b275] text-[#0e2951] text-[10px] px-4 py-1.5 rounded font-inter">Add User</div>
        </div>
        <table className="w-full text-left text-[10px] font-inter">
          <thead>
            <tr className="bg-[#f7f9fb] text-[#000] uppercase text-[9px] font-semibold tracking-wide">
              {["Name", "Role", "Branch Location", "Sign In", "Status", "Actions"].map((h) => (
                <th key={h} className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-[#dbdde0]">
                <td className="px-3 py-2">
                  <p className="font-bold text-[#262a2d]">{r.name}</p>
                  <p className="text-[#7f868f]">{r.email}</p>
                </td>
                <td className="px-3 py-2 text-[#262a2d]">{r.role}</td>
                <td className="px-3 py-2 text-[#262a2d]">Company</td>
                <td className="px-3 py-2 text-[#262a2d]">Sep 12, 2022</td>
                <td className="px-3 py-2">
                  <span className={`text-[9px] px-2 py-0.5 rounded-full ${r.status === "Active" ? "bg-[#e6f7ee] text-[#46b275]" : "bg-[#fff3e0] text-[#e67e00]"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-[#7f868f]">···</td>
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
            <span className="text-[10px] text-[#5c7792] font-inter mt-1">{b.label}</span>
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
  const { caseStudy } = usePublicCaseStudy("benefits-enrollment");
  const { caseStudies } = usePublicCaseStudies();
  const isLiveCaseStudy = Boolean(caseStudy && caseStudy.status === "published");
  const userPainPoints = caseStudy?.problem.user_pain_points ?? USER_PAIN_POINTS.map((item) => `${item.before}${item.bold}${item.after}`);
  const constraints = caseStudy?.constraints ?? CONSTRAINTS.map((item) => `${item.title ?? ""}${item.bold}${item.after ?? ""}`);
  const strategyPoints = caseStudy?.design_strategy ?? STRATEGY_POINTS.map((item) => `${item.before}${item.bold}${item.after}`);
  const teamMembers = caseStudy?.team ?? TEAM_MEMBERS;
  const myRole = caseStudy?.my_role ?? MY_ROLE;
  const toolsUsed = caseStudy?.tools ?? TOOLS;
  const methodologySteps =
    caseStudy?.methodology.steps.map((step, index) => ({
      label: step.label,
      color: DESIGN_PROCESS[index]?.color ?? "#87d4ac",
      desc: step.description,
    })) ?? DESIGN_PROCESS;
  const results = caseStudy?.metrics.length
    ? caseStudy.metrics.map((metric) => ({ value: metric.value, label: metric.label }))
    : RESULTS;
  const primaryMetric = results[0] ?? RESULTS[0];
  const reflections = caseStudy?.reflections ?? REFLECTIONS;
  const otherProjects = caseStudies.filter((project) => project.slug !== "benefits-enrollment").slice(0, 3);
  const clientLogos = caseStudy?.client_logos.length
    ? caseStudy.client_logos.map((logo) => ({
        src: resolveTrustedLogo(logo.name, logo.logo),
        alt: logo.name,
        width: logo.name === "Paychex" ? 120 : logo.name === "Nayya" ? 80 : 60,
      }))
    : [
        { src: ASSETS.paychex, alt: "Paychex", width: 120 },
        { src: ASSETS.nayya, alt: "Nayya", width: 80 },
        { src: ASSETS.ibx, alt: "IBX", width: 60 },
      ];

  return (
    <main className="bg-white text-[#3c3e3f] overflow-x-hidden">
      <SiteHeader active="Projects" />

      {!isLiveCaseStudy ? (
        <>
          <section className="mx-auto flex min-h-[60vh] max-w-[1200px] flex-col items-center justify-center px-6 py-20 text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.45em] text-[#1183D0]">
              Case Study Unavailable
            </p>
            <h1 className="mt-6 font-serif-display text-[44px] italic leading-[1.05] text-[#0e2951]">
              This case study is no longer published
            </h1>
            <p className="mt-5 max-w-[620px] text-base leading-7 text-[#5c7792]">
              The CMS entry for this page was deleted or unpublished. It will reappear here once a
              published record with the slug <span className="font-semibold text-[#0e2951]">benefits-enrollment</span> exists again.
            </p>
            <a
              href={withBasePath("/projects")}
              className="mt-8 inline-flex rounded-[24px] bg-[#1183D0] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0e75b8]"
            >
              Back to Projects
            </a>
          </section>
          <SiteFooter />
        </>
      ) : (
        <>
      <div className="bg-[#F0F7FF]">
      <div className="mx-auto max-w-[1200px] px-6 pt-6 lg:px-20">
        <div className="flex items-center gap-3 text-sm">
          <a href={withBasePath("/")} className="text-[#5c7792] transition-colors hover:text-[#0e2951]">Home</a>
          <span className="text-[#b8cce0]">›</span>
          <a href={withBasePath("/projects")} className="text-[#5c7792] transition-colors hover:text-[#0e2951]">Projects</a>
          <span className="text-[#b8cce0]">›</span>
          <span className="font-semibold text-[#0e2951]">{caseStudy?.title ?? "Enhancing Benefits Enrollment"}</span>
        </div>
        <div className="mt-5 h-px w-full bg-[#d7e8f7]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative mx-auto max-w-[1200px] px-6 pt-8 pb-16 md:px-10 xl:px-20">
        <div className="relative mx-auto h-[150px] w-full max-w-[1040px] overflow-hidden rounded-[24px] shadow-[0_20px_64px_rgba(14,41,81,0.12)]">
          <Image
            src={ASSETS.heroBannerDashboard}
            alt="Benefits enrollment workflow and dashboard preview"
            fill
            sizes="(min-width: 1200px) 1040px, calc(100vw - 48px)"
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="px-6 pt-12 text-center md:px-12 lg:px-[120px]">
          <div className="mx-auto max-w-[820px]">
            <p className="mb-3 font-inter text-[13px] uppercase tracking-[3px] text-[#5c7792]">
              {caseStudy?.industry ?? "Case Study Redesign 2025"}
            </p>
            <h1 className="font-inter text-[40px] font-bold leading-[1.15] text-[#0e2951] md:text-[48px]">
              {caseStudy?.title ?? "Enhancing Benefits Enrollment"}
            </h1>
            <p className="mx-auto mt-5 max-w-[680px] font-inter text-[16px] leading-[1.625em] text-[#5c7792]">
              {caseStudy?.tagline ?? "Replaced a manual workflow with a centralized, self-managed platform; cutting processing time by 72%."}
            </p>
            <div className="mt-10 flex flex-col items-center gap-8 pt-8">
              <div className="grid w-full gap-8 text-center md:grid-cols-[1fr_2fr_1fr] md:items-center">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0e2951]/50">Year</p>
                  <p className="mt-1 text-[14px] font-medium text-[#0e2951]">{caseStudy?.year ?? 2024}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0e2951]/50">Role</p>
                  <p className="mt-1 text-[14px] font-medium text-[#0e2951]">{caseStudy?.role ?? "Sr. Product Designer"}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0e2951]/50">Client</p>
                  <p className="mt-1 text-[14px] font-medium text-[#0e2951]">
                    {caseStudy?.client_context ?? "Paychex via ITX Corp"}
                  </p>
                </div>
              </div>
              <div className="h-px w-full bg-[linear-gradient(90deg,rgba(9,67,106,0)_0%,rgba(17,131,208,0.4)_50%,rgba(9,67,106,0)_100%)]" />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 text-center md:grid-cols-3">
          {results.slice(0, 3).map((metric, index) => (
            <div
              key={metric.label}
              className={index < 2 ? "md:border-r md:border-[#d7e8f7]" : ""}
            >
              <p className="text-[46px] font-bold leading-none text-[#1183D0]">{metric.value}</p>
              <p className="mt-3 text-[16px] leading-[1.625em] text-[#5c7792]">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* ── Overview ── */}
      <section className="px-6 py-20 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <SectionHeading eyebrow="Overview" title="Structure" className="mb-6" />

        <div className="mt-8 grid gap-8 pt-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          {/* Team */}
          <div className="xl:pr-8">
            <p className="text-[#5c7792] text-[15px] uppercase tracking-[1.5px] mb-4 font-inter">
              Team Members
            </p>
            <div className="h-[3px] w-full bg-[#4d87ae]/20 rounded-full mb-5" />
            <ul className="space-y-1">
              {teamMembers.map((m) => (
                <li key={m} className="text-[#5c7792] text-[16px] font-inter capitalize leading-[1.75]">{m}</li>
              ))}
            </ul>
          </div>

          {/* Role */}
          <div className="xl:px-8">
            <p className="text-[#3c3e3f] text-[15px] uppercase tracking-[1.5px] mb-4 font-inter font-medium">
              My Role
            </p>
            <div className="h-[3px] w-full bg-[#1183D0] rounded-full mb-5" />
            <ul className="space-y-1">
              {myRole.map((r) => (
                <li key={r} className="text-[#3c3e3f] text-[16px] font-inter capitalize leading-[1.75] font-medium">{r}</li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="xl:px-8">
            <p className="text-[#5c7792] text-[15px] uppercase tracking-[1.5px] mb-4 font-inter">
              Tools Used
            </p>
            <div className="h-[3px] w-full bg-[#4d87ae]/20 rounded-full mb-5" />
            <ul className="space-y-1 mb-6">
              {toolsUsed.map((t) => (
                <li key={t} className="text-[#5c7792] text-[16px] font-inter capitalize leading-[1.75]">{t}</li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <Image src={ASSETS.figmaLogo} alt="Figma" width={20} height={30} className="object-contain" />
              <Image src={ASSETS.jiraLogo} alt="Jira" width={30} height={30} className="object-contain rounded-md" />
              <Image src={ASSETS.miroLogo} alt="Miro" width={30} height={30} className="object-contain rounded-md" />
            </div>
          </div>

          {/* Timeline */}
          <div className="xl:pl-8">
            <p className="text-[#5c7792] text-[15px] uppercase tracking-[1.5px] mb-4 font-inter">
              Timeline
            </p>
            <div className="h-[3px] w-full bg-[#4d87ae]/20 rounded-full mb-5" />
            <p className="text-[#5c7792] text-[16px] font-inter capitalize leading-[1.75]">{caseStudy?.duration ?? "3 months"}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-20 md:px-10 xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <SectionHeading title="Situation" className="mb-8" />
            <div className="mt-8 space-y-6">
              {CHALLENGE_POINTS.map((point) => (
                <p key={point} className="max-w-[720px] text-[16px] leading-[1.625em] text-[#3c3e3f]">
                  {point}
                </p>
              ))}
            </div>

            <h3 className="mt-12 text-[15px] uppercase tracking-[0.24em] text-[#5c7792]">
              Supporting signals
            </h3>
            <div className="mt-8 space-y-6">
              {userPainPoints.map((point) => (
                <p key={point} className="max-w-[720px] text-[16px] leading-[1.625em] text-[#3c3e3f]">
                  {point}
                </p>
              ))}
            </div>

            <h3 className="mt-12 text-[15px] uppercase tracking-[0.24em] text-[#5c7792]">
              Task
            </h3>
            <p className="mt-8 max-w-[720px] text-[16px] leading-[1.625em] text-[#3c3e3f]">
              {TASK_SUMMARY}
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {CHALLENGE_METRICS.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`px-7 py-7 ${index < CHALLENGE_METRICS.length - 1 ? "border-b border-[#d7e8f7]" : ""}`}
                >
                  <p className="text-[30px] font-bold leading-none text-[#0e2951]">{metric.value}</p>
                  <p className="mt-3 max-w-[220px] text-[16px] leading-[1.625em] text-[#1183D0]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Action ── */}
      <section className="px-6 py-20 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <SectionHeading title="Action" centered className="mb-14" />
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {RESEARCH_DISCOVERY_ITEMS.map((item, index) => (
            <Card
              key={item.title}
              className="border-transparent bg-transparent shadow-none"
            >
              <CardContent className="p-0">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#eaf4fd] shadow-[0_10px_24px_rgba(17,131,208,0.08)]">
                  <Image src={item.icon} alt="" width={20} height={20} className="h-5 w-5 object-contain opacity-85" />
                </div>
                <h3 className="text-[28px] font-normal leading-none text-[#1183D0]">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-[320px] text-[16px] leading-[1.625em] text-[#3c3e3f]">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Constraints ── */}
      <section className="px-6 py-20 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <SectionHeading title="Constraints" centered className="mb-12" />

        <div className="grid gap-6 md:grid-cols-2">
          {constraints.map((constraint, i) => (
            <Card key={i} className="relative p-0 py-0">
              <CardContent className="p-8">
              <div className="flex items-start justify-between mb-4">
                <Image src={i === 0 ? ASSETS.clockIcon : ASSETS.userIcon} alt={i === 0 ? "Clock" : "User"} width={30} height={30} className="object-contain opacity-70" />
                <Badge>
                  Constraints
                </Badge>
              </div>
              <p className="mt-4 font-inter text-[16px] leading-[1.625em] text-[#3c3e3f]">{constraint}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Design Thinking Process ── */}
      <section className="px-6 py-20 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <SectionHeading eyebrow="Action" title="Methodology" className="mb-12" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {methodologySteps.map((step, i) => (
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
                <p className="text-[#3c3e3f] font-inter font-semibold text-[15px] mt-2">
                  {i + 1}. {step.label}
                </p>
                <p className="font-inter text-[16px] leading-[1.625em] text-[#5c7792]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Design Strategy ── */}
      <section className="px-6 py-20 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left text */}
          <div>
            <SectionHeading title={<>Design <span className="text-[#1183D0]">Strategy</span></>} className="mb-8" />
            <div className="flex flex-col gap-8">
              {strategyPoints.map((p, i) => (
                <div key={i}>
                  <p className="font-inter text-[16px] leading-[1.625em] font-normal text-[#3c3e3f]">{p}</p>
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
      <section className="px-6 py-20 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <SectionHeading title="Result" className="mb-12" />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bar chart card */}
          <Card className="p-0 py-0">
            <CardContent className="p-8">
            <p className="font-inter font-bold text-[#3c3e3f] text-[20px] mb-1">Processing Time</p>
            <p className="font-inter text-[#5c7792] text-[14px] mb-4">Before vs. After</p>
            <BarChart />
            <div className="border-t border-[#dbdde0] mt-4 pt-4 flex justify-between">
              <p className="font-inter text-[#5c7792] text-[13px]">{primaryMetric.label}</p>
              <p className="font-inter font-bold text-[#1183D0] text-[13px]">{primaryMetric.value}</p>
            </div>
            </CardContent>
          </Card>

          {/* Stat cards column */}
          <div className="flex flex-col gap-6">
            {results.map((r) => (
              <Card key={r.label} className="flex-1 p-0 py-0">
                <CardContent className="flex items-center gap-6 p-8">
                <span className="font-inter font-bold text-[#1183D0] text-[52px] leading-none shrink-0">
                  {r.value}
                </span>
                <p className="font-inter text-[16px] leading-[1.625em] text-[#3c3e3f]">
                  {r.label}
                </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Deep Dive ── */}
      <section className="px-6 py-20 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <SectionHeading eyebrow="Solution" title="The Platform" className="mb-10" />
        <ProductPreview />
      </section>

      {/* ── Reflections ── */}
      <section className="px-6 py-20 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <SectionHeading title="Reflections" centered className="mb-14" />

        <div className="border-t border-[#d7e8f7]">
          {reflections.map((r, i) => (
            <div
              key={i}
              className={`py-10 text-center ${i < reflections.length - 1 ? "border-b border-[#d7e8f7]" : ""}`}
            >
              <h3 className="text-[28px] font-semibold leading-none text-[#1183D0]">
                {r.title}
              </h3>
              <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-[1.625em] text-[#3c3e3f]">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 border-t border-[#d7e8f7] pt-10">
          {clientLogos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={32}
              className="object-contain opacity-80"
            />
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.32em] text-[#5c7792]">
            Tools
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {toolsUsed.map((tool) => (
              <Badge key={tool} size="tag">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ── NDA Notice ── */}
      <section className="px-6 py-10 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <div className="mb-8 flex flex-wrap gap-3">
          {(caseStudy?.tags?.length ? caseStudy.tags : ["HR/Payroll SaaS", "UX Research", "IA", "Interaction Design", "Design Systems"]).map((tag) => (
            <Badge key={tag} size="tag">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="border-t border-[#bcd2ff]/40 pt-8">
          <p className="max-w-[900px] font-inter text-[16px] leading-[1.625em] text-[#5c7792]">
            <strong className="font-semibold text-[#5c7792]">NDA notice:</strong> {caseStudy?.nda_notice ?? "Parts of this presentation — including some screens and project details — have been redacted or blurred due to a confidentiality agreement signed with the client. The work shown is real; full details are withheld to protect client privacy."}
          </p>
        </div>
      </section>

      {/* ── Other Projects ── */}
      <section className="px-6 py-16 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <p className="text-[13px] font-semibold uppercase tracking-[0.45em] text-[#1183D0] mb-2">More work</p>
        <h2 className="font-serif-display italic text-[#0e2951] text-[32px] mb-8">Other Projects</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {otherProjects.map((p) => (
            <a key={p.title} href={resolveProjectHref(p)} className="group bg-white hover:bg-white border border-[#CFE5F8] rounded-[28px] overflow-hidden transition-all hover:-translate-y-0.5">
              <div className="h-36 flex items-center justify-center" style={{ background: "radial-gradient(ellipse at 20% 50%, #d4e8ff 0%, #edf5fb 70%)" }}>
                <span className="font-serif-display italic font-bold text-[#1183D0] text-3xl">{p.metrics[0]?.value ?? p.year}</span>
              </div>
              <div className="p-6">
                <p className="text-[#5c7792] text-xs mb-1">{p.company}</p>
                <h3 className="font-inter font-semibold text-[#0e2951] text-[15px] leading-snug mb-2">{p.title}</h3>
                <Badge variant="outline" size="tag">{p.tags[0]}</Badge>
              </div>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
        </>
      )}
    </main>
  );
}

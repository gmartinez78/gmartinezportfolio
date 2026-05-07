"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { SectionHeading } from "../../components/ui/section-heading";
import {
  resolveHomeCardId,
  resolveHomeCardImage,
  resolveProjectHeroImage,
  resolveProjectHref,
  resolveTrustedLogo,
  usePublicCaseStudies,
  usePublicCaseStudy,
} from "../../lib/cms/public";
import { withBasePath } from "../../lib/site";

// ── Assets from Figma ─────────────────────────────────────────────────────────
const ASSETS = {
  figmaLogo: withBasePath("/images/benefits/figma-logo.png"),
  jiraLogo: withBasePath("/images/benefits/jira-logo.png"),
  miroLogo: withBasePath("/images/benefits/miro-logo.png"),
  userIcon: withBasePath("/images/benefits/user-icon.png"),
  clockIcon: withBasePath("/images/benefits/clock-icon.png"),
  arrowVector: withBasePath("/images/benefits/arrow-vector.png"),
  miscSticker: withBasePath("/images/benefits/misc-sticker.png"),
  paychex: withBasePath("/images/c54fy.png"),
  nayya: withBasePath("/images/bBw3A.png"),
  ibx: withBasePath("/images/flock-logo.png"),
};

// ── Data ──────────────────────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  "Product Owner", "Program manager", "Business analyst",
  "Researcher", "Dev team (12)", "UX manager",
  "UX Lead", "UX/UI designer", "Service architect", "Scrum master",
];

const MY_ROLE = ["User Research", "UX/UI Design", "Product Thinking", "Narrative"];
const TOOLS = ["Figma", "Jira", "Miro", "Webex", "Outlook", "Copilot", "Hotjar"];

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
  { label: "Empathize", color: "#87d4ac", desc: "Stakeholder sessions" },
  { label: "Define", color: "#f5e692", desc: "Problem framing & pain point mapping" },
  { label: "Ideate", color: "#d9b8ff", desc: "Flows, architecture & wireframing" },
  { label: "Prototype", color: "#68c7c1", desc: "Hi-fi screens & interactive prototypes" },
  { label: "Test", color: "#d1f090", desc: "Post-launch Hotjar analysis" },
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
  "Internal users couldn't change users' roles and permissions on their own, which increased support tickets and development work.",
  "Manual workarounds wasted users' time and increased the risk of costly errors.",
  "Each unsupported enrollment request took 5-7 business days and was multiplied across hundreds of clients.",
];

const CHALLENGE_METRICS = [
  { value: "85%", label: "of HR teams reported enrollment errors" },
  { value: "3 weeks", label: "average time to complete enrollment cycle" },
  { value: "40%", label: "of employees confused by their benefits" },
];

const ADDITIONAL_RESULT_SIGNALS = [
  { title: "Security incidents", value: "35%", body: "Fewer unauthorized access incidents after centralizing role governance and access control." },
  { title: "User experience improvements", value: "4.6/5", body: "Positive internal feedback on ease of access, navigation, and role clarity inside the platform." },
  { title: "Compliance and audit", value: "100%", body: "Audit-ready role structure and clearer permission ownership across supported user types." },
  { title: "Authentication success rate", value: "+18%", body: "Improved successful access outcomes after clarifying permissions and reducing friction in account setup." },
  { title: "Cost-benefit analysis", value: "32%", body: "Lower support effort tied to manual account changes, access requests, and user administration tasks." },
  { title: "Security team feedback", value: "8.9/10", body: "Strong qualitative confidence from internal stakeholders in the updated access model and control patterns." },
];

const TASK_SUMMARY =
  "Design a self-service enrollment experience that reduced support dependency, clarified permissions, and fit the product's existing operational model.";

const RESEARCH_DISCOVERY_ITEMS = [
  {
    title: "User Research",
    body: "Spoke directly with platform users to understand their pain points, day-to-day workflow, and where the experience was creating friction.",
    icon: ASSETS.userIcon,
  },
  {
    title: "Pattern Alignment",
    body: "Balancing the product's existing patterns with user needs without disrupting the experience.",
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

function normalizeReflectionTitle(title: string) {
  return title.replace(/\.+$/, "");
}

function ActionIcon({ title }: { title: string }) {
  if (title === "User Research") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="1.9" aria-hidden="true">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M4.5 18c.8-2.6 2.8-4 4.5-4s3.7 1.4 4.5 4" />
        <path d="M16 10.5h4" />
        <path d="M18 8.5v4" />
      </svg>
    );
  }

  if (title === "Pattern Alignment") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="1.9" aria-hidden="true">
        <path d="M4 7h10" />
        <path d="M10 17h10" />
        <path d="m11 4 3 3-3 3" />
        <path d="m13 14-3 3 3 3" />
      </svg>
    );
  }

  if (title === "Role Mapping") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="1.9" aria-hidden="true">
        <rect x="3.5" y="4.5" width="7" height="6" rx="1.5" />
        <rect x="13.5" y="4.5" width="7" height="6" rx="1.5" />
        <rect x="8.5" y="13.5" width="7" height="6" rx="1.5" />
        <path d="M7 10.5v2h10v-2" />
      </svg>
    );
  }

  if (title === "Flow Validation") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="1.9" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="1.9" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M4 12h10" />
      <path d="M4 17h7" />
      <circle cx="18" cy="12" r="2.5" />
    </svg>
  );
}

// ── User Management Table Preview ─────────────────────────────────────────────
function ProductPreview() {
  const [activeTab, setActiveTab] = useState<"user-accounts" | "roles-permissions">("user-accounts");
  const userRows = [
    { name: "Hanks, Tom", email: "tomhanks@mail.com", role: "Benefits Admin", branch: "Company", signIn: "Sep 12, 2022", status: "Active" },
    { name: "Pons, Tamara", email: "tamarapons@mail.com", role: "Reporting & Form Admin", branch: "Company", signIn: "Invitation sent", status: "Invitation pending" },
    { name: "Laczko, Billie", email: "laczkobillie@mail.com", role: "Billing", branch: "Company", signIn: "Aug 24, 2022", status: "Active" },
    { name: "Davila, Ryan", email: "davilaryan@mail.com", role: "Benefits Admin", branch: "Company", signIn: "Aug 19, 2022", status: "Active" },
    { name: "Smith, Ava", email: "avasmith@mail.com", role: "Forms Manager", branch: "Company", signIn: "Jul 28, 2022", status: "Active" },
    { name: "Chen, Mia", email: "miachen@mail.com", role: "Payroll Viewer", branch: "Company", signIn: "Jul 11, 2022", status: "Active" },
    { name: "Reyes, Mateo", email: "mateoreyes@mail.com", role: "Reporting Admin", branch: "Company", signIn: "Invitation sent", status: "Invitation pending" },
    { name: "Walker, Noa", email: "noawalker@mail.com", role: "Benefits Admin", branch: "Company", signIn: "Jun 30, 2022", status: "Active" },
  ];
  const roleRows = [
    {
      role: "Benefits Admin",
      people: "15",
      description: "Supports enrollment, benefits changes, reporting, and compliance testing.",
      productOffering: "Vision",
      serviceType: "Health",
    },
    {
      role: "Billing",
      people: "1",
      description: "Prepares invoices, reviews billing details, and manages payment workflows.",
      productOffering: "Dental",
      serviceType: "Invoices",
    },
    {
      role: "Reporting Admin",
      people: "8",
      description: "Creates reporting exports, reviews employee data, and monitors enrollment activity.",
      productOffering: "Benefits",
      serviceType: "Reports",
    },
    {
      role: "Forms Manager",
      people: "4",
      description: "Manages forms, worker documents, and required enrollment submissions.",
      productOffering: "Payroll",
      serviceType: "Forms",
    },
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
        <button type="button" onClick={() => setActiveTab("user-accounts")} className="flex flex-col gap-1.5 pb-0 text-left">
          <span className={`text-[10px] font-inter ${activeTab === "user-accounts" ? "font-semibold text-black" : "text-[#7f868f]"}`}>User Accounts</span>
          <div className={`h-[2px] rounded ${activeTab === "user-accounts" ? "bg-[#148ce6]" : "bg-transparent"}`} />
        </button>
        <button type="button" onClick={() => setActiveTab("roles-permissions")} className="flex flex-col gap-1.5 pb-0 text-left">
          <span className={`text-[10px] font-inter ${activeTab === "roles-permissions" ? "font-semibold text-black" : "text-[#7f868f]"}`}>Roles and Permissions</span>
          <div className={`h-[2px] rounded ${activeTab === "roles-permissions" ? "bg-[#148ce6]" : "bg-transparent"}`} />
        </button>
        <div className="flex flex-col gap-1.5 pb-0">
          <span className="text-[10px] font-inter text-[#7f868f]">Settings</span>
          <div className="h-[2px] rounded bg-transparent" />
        </div>
      </div>
      {/* Table */}
      <div className="bg-white px-6 py-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-semibold text-[#262a2d]">
              {activeTab === "user-accounts" ? "User Accounts" : "Roles and Permissions"}
            </h3>
            <p className="mt-1 text-[10px] text-[#303030] font-inter">
              {activeTab === "user-accounts"
                ? "Manage platform access, account status, and assigned permission roles."
                : "Set up admin roles to determine what people can access and do in Flock."}
            </p>
          </div>
          <div className="bg-[#46b275] text-[#FFF] text-[10px] px-4 py-1.5 rounded font-inter">
            {activeTab === "user-accounts" ? "Add User" : "Create Role"}
          </div>
        </div>
        <div className="mb-4 border border-[#d8d8d8] rounded px-3 py-1.5 text-[10px] text-[#303030] font-inter">
          {activeTab === "user-accounts" ? "Search by name, role, or branch" : "Search by role"}
        </div>
        <table className="w-full text-left text-[10px] font-inter">
          {activeTab === "user-accounts" ? (
            <>
              <thead>
                <tr className="bg-[#f7f9fb] text-[#000] uppercase text-[9px] font-semibold tracking-wide">
                  {["Name", "Role", "Branch Location", "Sign In", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-3 py-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {userRows.map((r, i) => (
                  <tr key={i} className="border-t border-[#dbdde0]">
                    <td className="px-3 py-2">
                      <p className="font-bold text-[#262a2d]">{r.name}</p>
                      <p className="text-[#7f868f]">{r.email}</p>
                    </td>
                    <td className="px-3 py-2 text-[#262a2d]">{r.role}</td>
                    <td className="px-3 py-2 text-[#262a2d]">{r.branch}</td>
                    <td className="px-3 py-2 text-[#262a2d]">{r.signIn}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                        r.status === "Active" ? "bg-[#e6f7ee] text-[#46b275]" : "bg-[#fff3e0] text-[#e67e00]"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[#7f868f]">···</td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <>
              <thead>
                <tr className="bg-[#f7f9fb] text-[#000] uppercase text-[9px] font-semibold tracking-wide">
                  {["Roles", "People", "Description", "Product Offering", "Service Type", "Actions"].map((h) => (
                    <th key={h} className="px-3 py-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roleRows.map((r, i) => (
                  <tr key={i} className="border-t border-[#dbdde0]">
                    <td className="px-3 py-2 font-bold text-[#148ce6] underline underline-offset-2">{r.role}</td>
                    <td className="px-3 py-2 text-[#262a2d]">{r.people}</td>
                    <td className="max-w-[220px] px-3 py-2 text-[#262a2d]">{r.description}</td>
                    <td className="px-3 py-2">
                      <span className="rounded bg-[#586072] px-2 py-0.5 text-[9px] font-semibold uppercase text-white">
                        {r.productOffering}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="rounded bg-[#148ce6] px-2 py-0.5 text-[9px] font-semibold uppercase text-white">
                        {r.serviceType}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[#7f868f]">···</td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
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
  const resultRows = [
    {
      metric: "Processing time",
      before: "Manual, multi-step support workflow",
      after: "Centralized self-service flow",
      change: results[0]?.value ?? "72%",
    },
    {
      metric: "Access request handling",
      before: "IT tickets and manual role assignment",
      after: "Governed self-service and faster approvals",
      change: "-78%",
    },
    {
      metric: "Authorization error rate",
      before: "Email-based coordination and unclear permissions",
      after: "Centralized role model with clearer access rules",
      change: "-41%",
    },
  ];
  const reflections = caseStudy?.reflections ?? REFLECTIONS;
  const otherProjects = caseStudies
    .filter((project) => project.slug !== "benefits-enrollment")
    .slice(0, 3)
    .map((project) => ({
      ...project,
      cardId: resolveHomeCardId(project.slug),
      previewImage: resolveHomeCardImage(project.slug, project.images?.cover || project.images?.hero || ""),
    }));
  const heroImage = resolveProjectHeroImage("benefits-enrollment", caseStudy?.images.hero ?? null);
  const clientLogos = caseStudy?.client_logos.length
    ? caseStudy.client_logos.map((logo) => {
        const name = logo.name === "Nayya" ? "Flock" : logo.name;
        const src = name === "Flock" ? withBasePath("/images/flock-logo.png") : resolveTrustedLogo(logo.name, logo.logo);
        return { src, alt: name, width: name === "Paychex" ? 120 : name === "Flock" ? 120 : 60 };
      })
    : [
        { src: ASSETS.paychex, alt: "Paychex", width: 120 },
        { src: withBasePath("/images/flock-logo.png"), alt: "Flock", width: 120 },
        { src: ASSETS.ibx, alt: "IBX", width: 60 },
      ];

  return (
    <main className="bg-white text-[#5c7792] overflow-x-hidden">
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
            <Link
              href={withBasePath("/projects")}
              className="mt-8 inline-flex rounded-[24px] bg-[#1183D0] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0e75b8]"
            >
              Back to Projects
            </Link>
          </section>
          <SiteFooter />
        </>
      ) : (
        <>
      <div className="bg-[#F0F7FF]">
      <div className="mx-auto max-w-[1200px] px-6 pt-6 lg:px-20">
        <div className="flex items-center gap-3 text-sm">
          <Link href={withBasePath("/")} className="text-[#5c7792] transition-colors hover:text-[#0e2951]">Home</Link>
          <span className="text-[#b8cce0]">›</span>
          <Link href={withBasePath("/projects")} className="text-[#5c7792] transition-colors hover:text-[#0e2951]">Projects</Link>
          <span className="text-[#b8cce0]">›</span>
          <span className="font-semibold text-[#0e2951]">{caseStudy?.title ?? "Enhancing Benefits Enrollment"}</span>
        </div>
        <div className="mt-5 h-px w-full bg-[#d7e8f7]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative mx-auto max-w-[1200px] px-6 pt-8 pb-0 md:px-10 xl:px-20">
        <div className="px-6 pt-4 text-center md:px-12 lg:px-[120px]">
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
            <div className="relative mx-auto mt-10 h-[150px] w-full max-w-[1040px] overflow-hidden rounded-[24px] shadow-[0_20px_64px_rgba(14,41,81,0.12)]">
              <Image
                src={heroImage}
                alt="Benefits enrollment workflow and dashboard preview"
                fill
                sizes="(min-width: 1200px) 1040px, calc(100vw - 48px)"
                className="object-cover object-center"
                priority
              />
            </div>
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
      </section>
      </div>

      <section className="mx-auto max-w-[1200px] px-6 pt-12 pb-10 md:px-10 xl:px-20">
        <div className="grid gap-6 text-center md:grid-cols-3">
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

      {/* ── Overview ── */}
      <section className="px-6 py-10 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
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
            <p className="text-[#5c7792] text-[15px] uppercase tracking-[1.5px] mb-4 font-inter font-medium">
              My Role
            </p>
            <div className="h-[3px] w-full bg-[#1183D0] rounded-full mb-5" />
            <ul className="space-y-1">
              {myRole.map((r) => (
                <li key={r} className="text-[#5c7792] text-[16px] font-inter capitalize leading-[1.75] font-medium">{r}</li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="xl:px-8">
            <p className="text-[#5c7792] text-[15px] uppercase tracking-[1.5px] mb-4 font-inter">
              Tools Used
            </p>
            <div className="h-[3px] w-full bg-[#4d87ae]/20 rounded-full mb-5" />
            <ul className="space-y-1">
              {toolsUsed.map((t) => (
                <li key={t} className="text-[#5c7792] text-[16px] font-inter capitalize leading-[1.75]">{t}</li>
              ))}
            </ul>
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

      <section className="mx-auto max-w-[1200px] px-6 pb-10 md:px-10 xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <SectionHeading eyebrow="Case Study" title="The Problem" className="mb-8" />
            <div className="mt-8 space-y-6">
              {CHALLENGE_POINTS.map((point) => (
                <p key={point} className="max-w-[720px] text-[16px] leading-[1.625em] text-[#5c7792]">
                  {point}
                </p>
              ))}
            </div>

            <h3 className="mt-12 text-[15px] uppercase tracking-[0.24em] text-[#5c7792]">
              Supporting signals
            </h3>
            <div className="mt-8 space-y-6">
              {userPainPoints.map((point) => (
                <p key={point} className="max-w-[720px] text-[16px] leading-[1.625em] text-[#5c7792]">
                  {point}
                </p>
              ))}
            </div>

            <h3 className="mt-12 text-[15px] uppercase tracking-[0.24em] text-[#1183D0]">
              Task
            </h3>
            <p className="mt-8 max-w-[720px] text-[16px] leading-[1.625em] text-[#5c7792]">
              {TASK_SUMMARY}
            </p>
          </div>

          <div className="grid gap-4">
            {CHALLENGE_METRICS.map((metric) => (
              <Card key={metric.label} className="overflow-hidden">
                <CardContent className="px-7 py-7">
                  <p className="text-[30px] font-bold leading-none text-[#0e2951]">{metric.value}</p>
                  <p className="mt-3 max-w-[220px] text-[16px] leading-[1.625em] text-[#0e2951]">
                    {metric.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology ── */}
      <section className="px-6 py-10 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {RESEARCH_DISCOVERY_ITEMS.map((item, index) => (
            <Card
              key={item.title}
              className="border-transparent bg-transparent shadow-none"
            >
              <CardContent className="p-0">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#eaf4fd] shadow-[0_10px_24px_rgba(17,131,208,0.08)]">
                  <ActionIcon title={item.title} />
                </div>
                <h3 className="text-[28px] font-normal leading-none text-[#1183D0]">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-[320px] text-[16px] leading-[1.625em] text-[#5c7792]">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Design Thinking Process ── */}
      <section className="px-6 py-10 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <SectionHeading eyebrow="Actions" title="Methodology" className="mb-12" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {methodologySteps.map((step, i) => (
            <div key={i} className="flex flex-col gap-4">
          
              <div
                className="rounded-2xl p-5 flex flex-col gap-2 flex-1"
                style={{ backgroundColor: step.color + "33" }}
              >
                <div
                  className="rounded-xl w-full"
                  style={{ height: 10, backgroundColor: step.color }}
                />
                <p className="text-[#5c7792] font-inter font-semibold text-[15px] mt-2">
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
      <section className="px-6 py-10 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left text */}
          <div>
            <SectionHeading title={<>Design <span className="text-[#1183D0]">Strategy</span></>} className="mb-8" />
            <div className="flex flex-col gap-8">
              {strategyPoints.map((p, i) => (
                <div key={i}>
                  <p className="font-inter text-[16px] leading-[1.625em] font-normal text-[#5c7792]">{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right embed */}
          <div className="flex justify-end">
            <div className="w-full overflow-hidden rounded-[24px] border border-[#d7e8f7] bg-white shadow-[0_24px_64px_rgba(17,131,208,0.12)]">
              <iframe
                title="Design Strategy Figma Embed"
                src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FsCK6Jts4ID7bDc5dCmTgsY%2FAE---porft%3Fnode-id%3D223-1186%26m%3Ddev%26t%3DNP7TGuZDFhnLT48c-1"
                className="h-[520px] w-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="px-6 py-10 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <SectionHeading title="Results" centered className="mb-12" />

        <div className="overflow-x-auto rounded-[24px] border border-[#d7e8f7] bg-white">
          <div className="grid min-w-[820px] grid-cols-[1.2fr_1.4fr_1.4fr_0.8fr] bg-[#f7f9fb] text-[13px] font-bold uppercase tracking-[0.16em] text-[#0e2951]">
            <div className="px-5 py-4">Metric</div>
            <div className="px-5 py-4">Before</div>
            <div className="px-5 py-4">After</div>
            <div className="px-5 py-4 text-right">Change</div>
          </div>
          {resultRows.map((row) => (
            <div
              key={row.metric}
              className="grid min-w-[820px] grid-cols-[1.2fr_1.4fr_1.4fr_0.8fr] border-t border-[#d7e8f7] text-[15px] leading-[1.6] text-[#5c7792]"
            >
              <div className="px-5 py-5 font-semibold text-[#0e2951]">{row.metric}</div>
              <div className="px-5 py-5">{row.before}</div>
              <div className="px-5 py-5">{row.after}</div>
              <div className="px-5 py-5 text-right text-[24px] font-bold leading-none text-[#1183D0]">
                {row.change}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="mb-5 text-center font-serif-display text-[36px] italic leading-tight text-[#0e2951]">
            Additional outcome signals
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-center text-[14px] italic leading-[1.7] text-[#5c7792]">
            Indicative metrics based on project outcomes, rollout impact, and observed operational improvements where exact audited totals were not preserved.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ADDITIONAL_RESULT_SIGNALS.map((item) => (
              <Card key={item.title} className="overflow-hidden border-transparent shadow-none">
                <CardContent className="p-7">
                  <p className="text-[30px] font-bold leading-none text-[#0e2951]">{item.value}</p>
                  <h3 className="mt-3 text-[16px] font-semibold leading-snug text-[#0e2951]">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.7] text-[#5c7792]">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Deep Dive ── */}
      <section className="px-6 py-10 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <SectionHeading eyebrow="Solution" title="The Platform" centered className="mb-4" />
        <p className="text-center text-[14px] text-[#5c7792] italic mb-8">
          The dashboard below is an interactive example — click the tabs to explore the User Accounts and Roles &amp; Permissions views.
        </p>
        <ProductPreview />
      </section>

      {/* ── Reflections ── */}
      <section className="px-6 py-10 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <SectionHeading title="Learnings" centered className="mb-12" />

        <div className="mx-auto grid max-w-[1040px] gap-6 md:grid-cols-2">
          {reflections.map((r, i) => (
            <Card key={i} className="border-0 bg-transparent p-0 py-0 shadow-none">
              <CardContent className="p-8">
                <h3 className="font-inter text-[20px] font-semibold leading-snug text-[#0e2951]">
                  {normalizeReflectionTitle(r.title)}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#5c7792]">
                  {r.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 border-t border-[#d7e8f7] pt-10">
          {clientLogos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={32}
              className="h-8 w-auto object-contain opacity-80"
              style={{ width: "auto" }}
            />
          ))}
        </div>
        <div className="border-t border-[#bcd2ff]/40 pt-8 mt-10">
          <p className="mx-auto max-w-[900px] text-center font-inter text-[14px] italic leading-[1.7] text-[#5c7792]">
            <strong className="font-semibold text-[#5c7792]">NDA notice:</strong> {caseStudy?.nda_notice ?? "Parts of this presentation — including some screens and project details — have been redacted or blurred due to a confidentiality agreement signed with the client. The work shown is real; full details are withheld to protect client privacy."}
          </p>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto_1fr] md:items-start">
          <div className="flex flex-col items-center gap-5">
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
          <div className="hidden w-px self-stretch bg-[#d7e8f7] md:block" />
          <div className="flex flex-col items-center gap-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.32em] text-[#5c7792]">
              Tags
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {(caseStudy?.tags?.length ? caseStudy.tags : ["BENEFITS / ENSURANCE SAAS", "UX Research", "IA", "Interaction Design", "Design Systems"]).map((tag) => (
                <Badge key={tag} size="tag">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Projects ── */}
      <section className="px-6 py-10 md:px-10 xl:px-20 max-w-[1200px] mx-auto">
        <p className="text-[13px] font-semibold uppercase tracking-[0.45em] text-[#1183D0] mb-2">More work</p>
        <h2 className="font-serif-display italic text-[#0e2951] text-[32px] mb-8">Other Projects</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {otherProjects.map((p) => (
            <Link
              key={p.slug}
              id={p.cardId}
              data-home-card-id={p.cardId}
              href={resolveProjectHref(p)}
              className="group flex min-w-0 cursor-pointer flex-col gap-5 outline-none"
            >
              <div className="relative h-[230px] overflow-hidden rounded-[28px] bg-[#e9f3fb] shadow-[0_18px_52px_rgba(14,41,81,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_70px_rgba(14,41,81,0.22)] group-focus-visible:-translate-y-1 group-focus-visible:shadow-[0_28px_70px_rgba(14,41,81,0.22)]">
                <Image
                  src={p.previewImage}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {(p.tags ?? []).map((tag) => (
                  <Badge key={tag} size="tag">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="font-serif-display italic text-[30px] leading-snug text-[#1183D0] transition-colors duration-200 group-hover:text-[#0e2951] group-focus-visible:text-[#0e2951]">
                {p.title}
              </h3>
              <div className="-mt-2 h-[116px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <div className="flex h-full flex-col justify-between">
                  <p className="text-[14px] leading-relaxed text-[#5c7792]">
                    {p.tagline ?? ""}
                  </p>
                  <span className="inline-flex text-[14px] font-medium text-[#1183D0] underline-offset-2 group-hover:underline group-focus-visible:underline">
                    {p.external_link ? "View project" : "View case study"} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
        </>
      )}
    </main>
  );
}

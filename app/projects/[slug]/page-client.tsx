"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  resolveHomeCardId,
  resolveHomeCardImage,
  resolveProjectHeroImage,
  resolveProjectHref,
  resolveTrustedLogo,
  usePublicCaseStudies,
  usePublicCaseStudy,
} from "@/lib/cms/public";
import type { CaseStudyContentBlock, CaseStudyReflection } from "@/lib/cms/types";
import { withBasePath } from "@/lib/site";

type PayloadRow = {
  metric?: string;
  value?: string;
  context?: string;
};

type ProblemMetric = {
  value: string;
  label: string;
  context?: string;
};

type HighlightMetric = {
  value: string;
  label: string;
  context?: string;
};

const NAYYA_HIGHLIGHT_METRICS: HighlightMetric[] = [
  { value: "307%", label: "IRR", context: "Projected ROI — estimated return from increased plan uptake (NPV $11.4M)." },
  { value: "~115,500", label: "Annual Benefits", context: "Enrollments completed 5% above the 100K goal." },
  { value: "67%", label: "Conversion Rate", context: "Users who received Nayya recommendations that fit their needs and enrolled in a plan." },
];

const NAYYA_PROBLEM_METRICS: ProblemMetric[] = [
  { value: "32%", label: "of employees dropped off before completing the benefits selection flow" },
  { value: "44%", label: "of employees felt confident they had selected the best plan for their needs" },
  { value: "48%", label: "understood why they needed to continue in a separate experience" },
  { value: "2.9/5", label: "trust score for the transition in testing" },
];

const NAYYA_PROCESS_ALTERNATIVES = [
  {
    title: "Embedded Nayya section",
    status: "Rejected",
    body:
      "Add the Nayya form as its own step inside the enrollment process, keeping the assistance directly in the core flow.",
    imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-embedded-section.jpg",
  },
  {
    title: "Benefit-list entry point",
    status: "Rejected",
    body:
      "Place a button in the benefits list so users could choose to use Nayya while reviewing available coverage options.",
    imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-benefit-list-entry.jpg",
  },
  {
    title: "Guided decision modal",
    status: "Selected",
    body:
      "Show a modal after users entered their family information, when guidance felt timely connected to choosing better benefits.",
    imageSrc: "/images/projects/nayya-ai-benefits/banners/nayya-guided-decision-modal.jpg",
  },
];

const NAYYA_PROCESS_TRADEOFFS = [
  {
    alternative: "Embedded Nayya section",
    strength: "Most seamless and visible inside enrollment.",
    tradeoff: "Required too much product and engineering work for the project scope.",
    decision: "Rejected",
  },
  {
    alternative: "Benefit-list entry point",
    strength: "Lower implementation effort and easy to place in the existing UI.",
    tradeoff: "Relied on users noticing and seeking help, which was not their primary goal in that moment.",
    decision: "Rejected",
  },
  {
    alternative: "Guided decision modal",
    strength: "Introduced help at a high-intent moment after family details were entered.",
    tradeoff: "Less deeply integrated than a full embedded section, but clearer and more feasible.",
    decision: "Selected",
  },
];

const NAYYA_DESIGN_STRATEGY = [
  "I started by reviewing the available data, gathering the right inputs, and aligning with the team on constraints and goals before moving into design.",
  "From there, I explored several integration approaches and evaluated each one based on timing in the user journey, technical feasibility, and how clearly it communicated the value of the experience.",
  "Once a direction was selected, I designed the handoff to feel intentional and trustworthy, using clear messaging and visual cues to help users understand the transition and stay confident as they chose their benefits.",
];

const NAYYA_TESTING_RESULTS = [
  {
    metric: "7",
    label: "Participants",
    finding: "Moderated usability testing on the integrated prototype",
    insight: "Representative sample for qualitative insight, with patterns that were consistent across participants",
    signal: "Positive",
  },
  {
    metric: "4/5",
    label: "Satisfaction score",
    finding: "Users rated their overall experience completing the flow",
    insight: "High comfort level with the process, and users felt supported through the benefit selection steps",
    signal: "Positive",
  },
  {
    metric: "100%",
    label: "Task completion",
    finding: "All participants successfully completed the end-to-end flow",
    insight: "Core interaction design supported task completion without critical failure points",
    signal: "Positive",
  },
  {
    metric: "High",
    label: "Data trust",
    finding: "Users felt comfortable sharing personal information within the Nayya form",
    insight: "Trust signals and context-setting reduced anxiety around data sharing",
    signal: "Positive",
  },
  {
    metric: "Low",
    label: "Form fatigue",
    finding: "Users perceived the form as shorter than expected",
    insight: "Perceived effort was lower than anticipated, reducing drop-off risk at form entry",
    signal: "Positive",
  },
  {
    metric: "Critical",
    label: "Transition clarity",
    finding: "Users did not know Nayya was part of the Flex process and were confused returning to their original point",
    insight: "The platform handoff lacked sufficient context, and users lost their place after completing Nayya",
    signal: "Negative",
  },
  {
    metric: "Modal",
    label: "Dismissal rate",
    finding: "Some users closed the modal automatically without reading it",
    insight: "Reflexive dismiss behavior suggests the modal pattern may need reconsideration or a stronger hook",
    signal: "Negative",
  },
  {
    metric: "Low",
    label: "Question relevance",
    finding: "A few users questioned why certain personal questions were being asked",
    insight: "Missing context around question purpose means users need clearer rationale to stay engaged",
    signal: "Negative",
  },
];

const NAYYA_REFLECTIONS: CaseStudyReflection[] = [
  {
    title: "Designing under constraints.",
    body: "Designing under technical constraints does not mean compromising the experience. It means finding the most effective path within the boundaries you are given.",
  },
  {
    title: "Test early, fix early.",
    body: "User testing, even at a small scale, surfaces the decisions that matter most before they become expensive to fix.",
  },
  {
    title: "Trust is a design problem.",
    body: "When users cross platform boundaries, clarity and context are what keep them moving forward.",
  },
  {
    title: "Constraints force focus.",
    body: "The inability to embed Nayya natively pushed the team to invest in transition design, an area that is often overlooked when seamless integration feels like the obvious solution.",
  },
];

const NAYYA_PHONE_IMAGE = "/images/projects/nayya-ai-benefits/banners/nayya-design-process.png";
const NAYYA_IMPACT_FIGMA_EMBED =
  "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FYK1xcLLDokH5gNYAeDmNiP%2FNayya%3Fnode-id%3D20753-8774%26m%3Ddev%26t%3DOkK79FuO2xBLEwc6-1";
const NAYYA_INSIGHTS_CLOSING =
  "Participants who completed the Nayya survey enrolled in TWICE as many benefits as those who skipped it.";

const METHODOLOGY_COLORS = ["#87d4ac", "#f5e692", "#d9b8ff", "#68c7c1", "#d1f090"];
const FLOCK_AUDIT_LABELS = [
  { color: "#50A8FF", label: "Navigation", note: "Top-level hierarchy and route clarity." },
  { color: "#AD86FF", label: "Typography", note: "Heading scale, weight, and readability drift." },
  { color: "#F091FF", label: "Spacing", note: "Inconsistent padding, gutters, and density." },
  { color: "#FFB865", label: "States", note: "Hover, selected, and status patterns varied too much." },
  { color: "#9CD99F", label: "Tables", note: "Headers, rows, and controls lacked a shared pattern." },
  { color: "#D9A49C", label: "Dialogs", note: "Modal structure and actions were not standardized." },
];
const FLOCK_CHECKLIST_SECTIONS = [
  {
    title: "Color & Typography",
    intro: "The audit found low-contrast surfaces, weak hierarchy, and inconsistent heading treatment across pages.",
    checklist: [
      "Contrast: All text, UI elements, and graphics meet minimum contrast ratios and remain readable in all states.",
      "Color Usage: Color is not the only way to convey information; additional cues (icons, labels, states) are used.",
      "Focus & States: Interactive elements have clear, visible focus states that are distinct from hover and other states.",
    ],
  },
  {
    title: "Layout & Navigation",
    intro: "Navigation patterns and page structure drifted between modules, making the product feel less predictable.",
    checklist: [
      "Reading Order: Content follows a clear, logical order, ensuring proper reading and navigation for all users, including screen readers.",
      "Tables: Data tables are simplified, avoid complex structures, and include clear captions.",
      "Navigation Consistency: Navigation is consistent across pages, making it easier to learn and use.",
      "Navigation States: All navigation elements include clear states (default, hover, active, focus, and selected) to indicate interaction and location.",
    ],
  },
  {
    title: "Links & Buttons",
    intro: "Interactive controls used mixed visual rules, so priority and affordance were not always obvious.",
    checklist: [
      "Links vs Buttons: Links are used for navigation (URL change or focus shift); buttons are used for actions.",
      "Link & Button Text: Labels are clear, descriptive, and concise. Avoid vague text and indicate external links when needed.",
      "Contrast: Links and buttons meet contrast requirements, including text, background, and borders, and are clearly distinguishable as interactive elements.",
      "Target Size: Clickable elements meet minimum size requirements (24×24 CSS px) where applicable.",
    ],
  },
  {
    title: "Forms & Controls",
    intro: "Form fields, inline feedback, and changeable content lacked enough structure to support accessibility and QA.",
    checklist: [
      "Forms & Controls: Inputs, labels, and controls are clear, visible, and placed close together. All states (active, focus, hover) are defined.",
      "Error & Status Messages: Users receive clear feedback for actions, errors, and system states. Messages are placed correctly and provide enough guidance to fix issues.",
      "Dynamic Content: Interactive content (audio, video, UI elements) is accessible via keyboard and meets contrast and state requirements.",
      "Motion & Animation: Animations follow accessibility guidelines, avoid unnecessary motion, and include options to reduce or stop movement.",
    ],
  },
];
const FLOCK_CHECKLIST_USAGE = [
  {
    step: "1. Baseline audit",
    body: "I reconstructed a representative legacy dashboard and tagged recurring issues instead of reviewing isolated screens in a vacuum.",
  },
  {
    step: "2. Pattern grouping",
    body: "Findings were grouped into checklist categories so accessibility issues could be connected to reusable system decisions.",
  },
  {
    step: "3. Component translation",
    body: "Each issue was then translated into a before/after component example the team could review, implement, and QA consistently.",
  },
];
const FLOCK_RESULTS_COMPARISON = [
  {
    before: "Compliance issues across existing pages.",
    after: "Approved accessibility standards (Level A, Level AA) and a clearer standardization path.",
  },
  {
    before: "Fragmented and duplicated patterns.",
    after: "Unified shared library direction.",
  },
  {
    before: "Weak handoff and limited reusable components.",
    after: "Documented information to create alignment and clearer implementation support.",
  },
];
const FLOCK_SOLUTION = [
  {
    title: "Consistency",
    body: "Reusable components (buttons, headers, fonts, etc.) ensure a uniform design across the project, making it easier for developers to match the final product to the design.",
  },
  {
    title: "Faster Updates",
    body: "When a component is updated, all instances automatically adjust, keeping designers and developers aligned without manual revisions.",
  },
  {
    title: "Design Systems",
    body: "Components are part of a design system, providing clear guidelines for both teams and reducing errors in implementation.",
  },
  {
    title: "Auto Layout & Constraints",
    body: "Designers can use auto layout to create responsive components, which developers can easily translate into code for different screen sizes.",
  },
];

function FlockAuditSnapshot() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#d7e8f7] bg-white shadow-[0_24px_64px_rgba(17,131,208,0.10)]">
      <div className="border-b border-[#e3eef8] bg-[#f7fbff] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8e6f4]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8e6f4]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8e6f4]" />
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.35fr)_320px]">
        <div className="overflow-x-auto bg-[#fbfdff] p-4 md:p-6">
          <div className="min-w-[820px] rounded-[22px] border border-[#dceaf7] bg-white p-4 shadow-[0_18px_48px_rgba(14,41,81,0.08)]">
            <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-4">
              <aside className="rounded-[18px] border border-[#e4eef7] bg-[#f7fbff] p-4">
                <div className="mb-4 h-9 rounded-[10px] border-[5px]" style={{ borderColor: "#50A8FF" }} />
                <div className="space-y-3">
                  {["Workspace", "Queues", "Policies", "Users", "Reports", "Settings"].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-[10px] px-3 py-2 text-[13px] font-medium ${
                        index === 2 ? "border-[5px]" : "border border-transparent"
                      }`}
                      style={index === 2 ? { borderColor: "#AD86FF", color: "#0e2951" } : { color: "#5c7792" }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[12px] border-[5px] px-3 py-4" style={{ borderColor: "#D9A49C" }}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0e2951]">Action panel</p>
                  <div className="mt-3 flex gap-2">
                    <div className="h-8 flex-1 rounded-[10px] bg-[#eef5fb]" />
                    <div className="h-8 w-12 rounded-[10px] bg-[#eef5fb]" />
                  </div>
                </div>
              </aside>

              <div className="space-y-4">
                <div className="rounded-[18px] border border-[#e4eef7] bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex rounded-full border-[5px] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ borderColor: "#9CD99F", color: "#0e2951" }}>
                        Audit baseline
                      </div>
                      <h3 className="mt-4 max-w-[360px] border-[5px] px-3 py-2 text-[24px] font-semibold leading-tight text-[#0e2951]" style={{ borderColor: "#AD86FF" }}>
                        Access patterns and interface rules had drifted over time
                      </h3>
                      <div className="mt-4 grid max-w-[420px] gap-3 sm:grid-cols-2">
                        <div className="rounded-[14px] border-[5px] p-3" style={{ borderColor: "#F091FF" }}>
                          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Density</p>
                          <p className="mt-2 text-[14px] leading-[1.5] text-[#0e2951]">Spacing changed from section to section without a shared rule.</p>
                        </div>
                        <div className="rounded-[14px] border-[5px] p-3" style={{ borderColor: "#FFB865" }}>
                          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">States</p>
                          <p className="mt-2 text-[14px] leading-[1.5] text-[#0e2951]">Tags, pills, and selected rows used competing visual signals.</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full max-w-[210px] rounded-[16px] border border-[#e4eef7] bg-[#f8fbfe] p-4">
                      <div className="mb-3 border-[5px] p-3" style={{ borderColor: "#9CD99F" }}>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Table header</p>
                        <div className="mt-3 space-y-2">
                          <div className="h-2 rounded-full bg-[#dceaf7]" />
                          <div className="h-2 w-4/5 rounded-full bg-[#dceaf7]" />
                        </div>
                      </div>
                      <div className="border-[5px] p-3" style={{ borderColor: "#50A8FF" }}>
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Sort / filter</p>
                        <div className="mt-3 flex gap-2">
                          <div className="h-8 flex-1 rounded-[10px] bg-white" />
                          <div className="h-8 w-10 rounded-[10px] bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[18px] border border-[#e4eef7] bg-white p-4">
                  <div className="grid grid-cols-[1.15fr_0.9fr_0.9fr_1fr_0.7fr] gap-3 border-b border-[#e8f0f7] px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">
                    <span className="border-[5px] px-2 py-1" style={{ borderColor: "#50A8FF" }}>Entity</span>
                    <span>Role</span>
                    <span>Status</span>
                    <span className="border-[5px] px-2 py-1" style={{ borderColor: "#F091FF" }}>Permissions</span>
                    <span>Actions</span>
                  </div>
                  <div className="space-y-3 pt-3">
                    {[
                      ["Northwind Team", "Owner", "Active", "12 rules"],
                      ["Ops Group", "Editor", "Pending", "8 rules"],
                      ["Support Pod", "Viewer", "Active", "5 rules"],
                      ["Regional Admin", "Manager", "Inactive", "11 rules"],
                    ].map((row, index) => (
                      <div key={row[0]} className="grid grid-cols-[1.15fr_0.9fr_0.9fr_1fr_0.7fr] gap-3 rounded-[14px] border border-[#edf3f8] bg-[#fcfeff] px-3 py-3 text-[14px] text-[#0e2951]">
                        <div className={index === 1 ? "border-[5px] px-2 py-1" : ""} style={index === 1 ? { borderColor: "#AD86FF" } : undefined}>{row[0]}</div>
                        <div>{row[1]}</div>
                        <div className={index === 2 ? "border-[5px] px-2 py-1" : ""} style={index === 2 ? { borderColor: "#FFB865" } : undefined}>{row[2]}</div>
                        <div>{row[3]}</div>
                        <div className="flex justify-end">
                          <div className={index === 3 ? "border-[5px] px-3 py-1" : "px-3 py-1"} style={index === 3 ? { borderColor: "#D9A49C" } : undefined}>•••</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e3eef8] bg-[#f8fbfe] p-6 lg:border-l lg:border-t-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#1183D0]">Audit Key</p>
          <h3 className="mt-4 text-[24px] font-semibold leading-tight text-[#0e2951]">How the “before” was analyzed</h3>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#5c7792]">
            The original product surface was mapped as an audit artifact. I tagged recurring issues by pattern family so the team could see where accessibility, hierarchy, and system consistency were breaking down before proposing a shared solution.
          </p>
          <div className="mt-6 space-y-3">
            {FLOCK_AUDIT_LABELS.map((item) => (
              <div key={item.label} className="rounded-[16px] border border-[#dceaf7] bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-5 w-5 rounded-[5px]" style={{ backgroundColor: item.color }} />
                  <p className="text-[14px] font-semibold text-[#0e2951]">{item.label}</p>
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#5c7792]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlockChecklistShowcase() {
  return (
    <div className="space-y-8">
      {FLOCK_CHECKLIST_SECTIONS.map((section) => (
        <Card key={section.title} className="gap-0 overflow-hidden border border-[#d7e8f7] py-0">
          <CardContent className="p-0">
            <div className="border-b border-[#e4eef7] bg-[#f7fbff] px-6 py-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#1183D0]">Checklist Applied</p>
              <h3 className="mt-2 text-[28px] font-semibold leading-tight text-[#0e2951]">{section.title}</h3>
              <p className="mt-3 max-w-[820px] text-[15px] leading-[1.7] text-[#5c7792]">{section.intro}</p>
            </div>

            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)_320px]">
              <div className="border-b border-[#e4eef7] p-6 lg:border-b-0 lg:border-r">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9b6b6b]">Before</p>
                <div className="mt-4 rounded-[20px] border border-[#EEEFEF] p-5">
                  {section.title === "Color & Typography" ? (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-[14px] font-medium uppercase tracking-[0.16em] text-[#7D7F80]">General</p>
                        <h4 className="text-[26px] font-medium leading-tight text-[#7D7F80]">settings</h4>
                      </div>
                      <p className="max-w-[420px] text-[14px] leading-[1.6] text-[#929395]">
                        Supporting text blended into the background and the heading scale did not create a reliable reading order.
                      </p>
                      <div className="grid max-w-[460px] gap-3 sm:grid-cols-2">
                        <div className="rounded-[14px] bg-white/70 p-4">
                          <p className="text-[12px] text-[#b4b4b4]">Status</p>
                          <p className="mt-2 inline-flex rounded-full bg-[#FE9C32] px-3 py-1 text-[14px] font-medium text-white">Review</p>
                        </div>
                        <div className="rounded-[14px] bg-white/70 p-4">
                          <p className="text-[12px] text-[#b4b4b4]">Owner</p>
                          <p className="mt-2 text-[14px] text-[#989898]">Operations</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-[14px] bg-[#1AB065] px-4 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(26,176,101,0.18)]"
                      >
                        Save changes
                      </button>
                    </div>
                  ) : null}

                  {section.title === "Layout & Navigation" ? (
                    <div className="space-y-4">
                      <div className="rounded-[12px] bg-[#FFF7AC] px-4 py-3 text-[13px] font-medium text-[#7D7F80]">
                        Go back to broker portal
                      </div>
                      <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)]">
                        <div className="rounded-[16px] bg-[#303845] p-4">
                          <div className="space-y-3 text-[13px] text-white">
                            <p>Home</p>
                            <p>Reports</p>
                            <p className="rounded-[10px] bg-white/12 px-2 py-1 text-white">Settings</p>
                            <p>Users</p>
                          </div>
                        </div>
                        <div className="rounded-[16px] bg-white/70 p-4">
                          <div className="rounded-[16px] border border-[#eadede] bg-[#fcfbfb] p-4">
                            <div className="min-h-[240px] rounded-[20px] border border-[#eadede] bg-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {section.title === "Links & Buttons" ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        <button type="button" className="rounded-[14px] bg-[#1AB065] px-4 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(26,176,101,0.18)]">Save</button>
                        <button type="button" className="rounded-[14px] bg-[#0E6FB3] px-4 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(14,111,179,0.18)]">Cancel</button>
                        <a href="#0" className="self-center text-[14px] text-[#1249BF] no-underline">View details</a>
                      </div>
                      <div className="rounded-[14px] bg-white/70 p-4">
                        <p className="text-[14px] leading-[1.6] text-[#9a9a9a]">
                          Controls looked related, but visual priority and focus behavior were not clearly differentiated.
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {section.title === "Forms & Controls" ? (
                    <div className="space-y-4">
                      <div className="rounded-[14px] bg-white/70 p-4">
                        <div className="h-11 rounded-[12px] border border-[#e7d7d7] bg-white" />
                        <p className="mt-2 text-[12px] text-[#b2a5a5]">No persistent label, helper text, or validation context.</p>
                        <p className="mt-2 text-[12px] text-[#C98F8F]">Error</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="rounded-[12px] bg-white/70 px-4 py-2 text-[13px] text-[#9f9f9f]">Filter</div>
                        <div className="rounded-[12px] bg-[#f2e7e7] px-4 py-2 text-[13px] text-[#9f9f9f]">Active only</div>
                      </div>
                      <div className="rounded-[14px] bg-white/70 p-4">
                        <p className="text-[14px] leading-[1.6] text-[#9a9a9a]">Inline updates and control state changes were easy to miss.</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="border-b border-[#e4eef7] p-6 lg:border-b-0 lg:border-r">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#4d87ae]">After</p>
                <div className="mt-4 rounded-[20px] border border-[#d7e8f7] bg-[#f8fbfe] p-5">
                  {section.title === "Color & Typography" ? (
                    <div className="space-y-4">
                      <div className="flex items-start justify-end gap-4">
                        <button
                          type="button"
                          aria-label="Close"
                          className="inline-flex items-center justify-center text-[16px] font-medium leading-none text-[#5c7792]"
                        >
                          X
                        </button>
                      </div>
                      <h4 className="text-[28px] font-semibold leading-tight text-[#0e2951]">System settings</h4>
                      <p className="max-w-[420px] text-[15px] leading-[1.7] text-[#5c7792]">
                        A stronger type scale, darker body copy, and clearer supporting labels created a more readable baseline for every screen.
                      </p>
                      <div className="grid max-w-[460px] gap-3 sm:grid-cols-2">
                        <div className="rounded-[14px] border border-[#d7e8f7] bg-white p-4">
                          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Status</p>
                          <p className="mt-2 inline-flex rounded-full bg-[#FFF1E2] px-3 py-1 text-[14px] font-medium text-[#A85A00]">Review</p>
                        </div>
                        <div className="rounded-[14px] border border-[#d7e8f7] bg-white p-4">
                          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Owner</p>
                          <p className="mt-2 text-[14px] font-medium text-[#0e2951]">Operations</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-[14px] bg-[#1183D0] px-4 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(17,131,208,0.18)]"
                      >
                        Save changes
                      </button>
                    </div>
                  ) : null}

                  {section.title === "Layout & Navigation" ? (
                    <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)]">
                      <div className="flex flex-col justify-between rounded-[16px] bg-[#303845] p-4">
                        <div className="space-y-3 text-[13px] font-medium text-white">
                          <p>Home</p>
                          <p>Reports</p>
                          <p className="block w-full rounded-[10px] bg-[rgba(17,131,208,0.26)] px-3 py-2 text-white shadow-[0_10px_24px_rgba(17,131,208,0.18)] ring-1 ring-[rgba(216,236,251,0.4)]">Settings</p>
                          <p>Users</p>
                        </div>
                        <button
                          type="button"
                          className="mt-6 inline-flex items-center gap-2 bg-transparent px-0 py-2 text-[13px] font-medium text-white"
                        >
                          <span aria-hidden="true">←</span>
                          Back to the portal
                        </button>
                      </div>
                      <div className="rounded-[16px] border border-[#d7e8f7] bg-white p-4">
                        <div className="rounded-[16px] border border-[#d7e8f7] bg-[#f8fbfe] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                          <div className="min-h-[240px] rounded-[20px] border border-[#d7e8f7] bg-white shadow-[0_8px_20px_rgba(17,131,208,0.08)]" />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {section.title === "Links & Buttons" ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        <button type="button" className="rounded-[14px] bg-[#1183D0] px-4 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(17,131,208,0.18)]">Save changes</button>
                        <button type="button" className="rounded-[14px] border border-[#CFE5F8] bg-white px-4 py-2 text-[14px] font-semibold text-[#1183D0]">Cancel</button>
                        <a href="#0" className="self-center text-[14px] font-medium text-[#0e2951] underline underline-offset-4">View details</a>
                      </div>
                      <div className="rounded-[14px] border border-[#d7e8f7] bg-white p-4">
                        <p className="text-[14px] leading-[1.6] text-[#5c7792]">
                          Action hierarchy, hover affordance, and focus visibility were standardized to make interactions easier to interpret and test.
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {section.title === "Forms & Controls" ? (
                    <div className="space-y-4">
                      <div className="rounded-[14px] border border-[#d7e8f7] bg-white p-4">
                        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Name and last name</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="h-11 rounded-[12px] border border-[#d7e8f7] bg-[#F7FBFF]" />
                          <div className="h-11 rounded-[12px] border border-[#d7e8f7] bg-[#F7FBFF]" />
                        </div>
                        <p className="mt-2 text-[12px] text-[#5c7792]">Users can enter their first and last name in clearly separated fields.</p>
                      </div>
                      <div className="rounded-[14px] border border-[#d7e8f7] bg-white p-4">
                        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5c7792]">Email address</p>
                        <div className="h-11 rounded-[12px] border-2 border-[#1183D0] bg-[#F7FBFF]" />
                        <p className="mt-2 text-[12px] text-[#5c7792]">Used for account recovery and system alerts.</p>
                        <div className="mt-2 inline-flex items-center gap-2 rounded-[10px] bg-[#FDECEC] px-3 py-2 text-[12px] font-medium text-[#B54708]">
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#FDEAD7] text-[11px] leading-none text-[#B54708]">!</span>
                          <p>Enter a valid email address to continue.</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="rounded-[12px] border border-[#d7e8f7] bg-white px-4 py-2 text-[13px] font-medium text-[#0e2951]">Filter</div>
                        <div className="rounded-[12px] bg-[#E0EEFB] px-4 py-2 text-[13px] font-medium text-[#1183D0]">Active only</div>
                      </div>
                      <div className="rounded-[14px] border border-[#9CD99F] bg-[#f3fbf4] p-4">
                        <p className="text-[14px] leading-[1.6] text-[#0e2951]">Changes saved. Filters and validation now use persistent status messaging.</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="p-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1183D0]">Requirements met</p>
                <div className="mt-4 space-y-3">
                  {section.checklist.map((item) => (
                    <div key={item} className="px-1 py-1">
                      <p
                        className="text-[14px] leading-[1.6] text-[#0e2951]"
                        dangerouslySetInnerHTML={{
                          __html: item
                            .replace("Contrast:", "<strong>Contrast:</strong>")
                            .replace("Color Usage:", "<strong>Color Usage:</strong>")
                            .replace("Focus & States:", "<strong>Focus & States:</strong>")
                            .replace("Reading Order:", "<strong>Reading Order:</strong>")
                            .replace("Tables:", "<strong>Tables:</strong>")
                            .replace("Navigation Consistency:", "<strong>Navigation Consistency:</strong>")
                            .replace("Navigation States:", "<strong>Navigation States:</strong>")
                            .replace("Links vs Buttons:", "<strong>Links vs Buttons:</strong>")
                            .replace("Link & Button Text:", "<strong>Link & Button Text:</strong>")
                            .replace("Target Size:", "<strong>Target Size:</strong>")
                            .replace("Forms & Controls:", "<strong>Forms & Controls:</strong>")
                            .replace("Error & Status Messages:", "<strong>Error & Status Messages:</strong>")
                            .replace("Dynamic Content:", "<strong>Dynamic Content:</strong>")
                            .replace("Motion & Animation:", "<strong>Motion & Animation:</strong>"),
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FlockChecklistUsage() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {FLOCK_CHECKLIST_USAGE.map((item) => (
        <Card key={item.step} className="overflow-hidden border border-[#d7e8f7]">
          <CardContent className="p-7">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1183D0]">{item.step}</p>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#5c7792]">{item.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function getPayloadList(payload: Record<string, unknown> | null | undefined, key: string) {
  const value = payload?.[key];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function getPayloadRows(payload: Record<string, unknown> | null | undefined, key: string) {
  const value = payload?.[key];
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is PayloadRow => {
    return Boolean(item && typeof item === "object" && ("metric" in item || "value" in item));
  });
}

function isContentBlock(block: CaseStudyContentBlock | undefined): block is CaseStudyContentBlock {
  return Boolean(block);
}

function stripLeadingBullet(value: string) {
  return value.replace(/^\s*[•·▪‣◦]\s*/, "");
}

function normalizeInsightHeading(value: string) {
  return stripLeadingBullet(value).replace(/^2026\s+data$/i, "2026");
}

function shouldHideInsight(value: string) {
  const normalized = stripLeadingBullet(value).toLowerCase();

  return (
    normalized === "skip this survey" ||
    normalized === "get recommendation" ||
    normalized === "powered by nayya"
  );
}

export function ProjectCaseStudyPageClient({ slug }: { slug: string }) {
  const { caseStudy, loading } = usePublicCaseStudy(slug);
  const { caseStudies } = usePublicCaseStudies();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F0F7FF] text-[#3c3e3f]">
        <SiteHeader active="Projects" />
        <section className="mx-auto max-w-[1200px] px-6 py-20 text-sm text-[#5c7792]">Loading case study...</section>
      </main>
    );
  }

  if (!caseStudy || caseStudy.status !== "published") {
    return (
      <main className="min-h-screen bg-[#F0F7FF] text-[#3c3e3f]">
        <SiteHeader active="Projects" />
        <section className="mx-auto flex min-h-[60vh] max-w-[1200px] flex-col items-center justify-center px-6 py-20 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.45em] text-[#1183D0]">
            Case Study Unavailable
          </p>
          <h1 className="mt-6 font-serif-display text-[44px] italic leading-[1.05] text-[#0e2951]">
            This case study is no longer published
          </h1>
          <a
            href={withBasePath("/projects")}
            className="mt-8 inline-flex rounded-[24px] bg-[#1183D0] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0e75b8]"
          >
            Back to Projects
          </a>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const otherProjects = caseStudies
    .filter((project) => project.slug !== caseStudy.slug && project.status === "published")
    .slice(0, 3)
    .map((project) => ({
      ...project,
      cardId: resolveHomeCardId(project.slug),
      previewImage: resolveHomeCardImage(project.slug, project.images.cover || project.images.hero || ""),
    }));
  const findBlock = (id: string) => caseStudy.content_blocks?.find((block) => block.id === id);
  const overviewBlock = findBlock("overview");
  const storyBlocks = ["situation", "task", "actions", "research"]
    .map((id) => findBlock(id))
    .filter(isContentBlock);
  const visibleStoryBlocks =
    caseStudy.slug === "flock-accessibility-system"
      ? storyBlocks.filter((block) => block.id !== "research" && block.id !== "actions")
      : caseStudy.slug === "i9-everify-integration"
      ? storyBlocks.filter((block) => block.id !== "research")
      : storyBlocks;
  const resultBlock = findBlock("impact");
  const resultRows = getPayloadRows(resultBlock?.payload, "rows");
  const resultInsights = getPayloadList(resultBlock?.payload, "insights");
  const resultOpportunities = getPayloadList(resultBlock?.payload, "opportunities");
  const projectedImprovements = getPayloadList(resultBlock?.payload, "projected");
  const successMetrics = getPayloadList(resultBlock?.payload, "successMetrics");
  const highlightMetrics = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_HIGHLIGHT_METRICS : caseStudy.metrics.slice(0, 3);
  const problemMetrics = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_PROBLEM_METRICS : caseStudy.metrics.slice(0, 3);
  const designStrategy = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_DESIGN_STRATEGY : caseStudy.design_strategy;
  const methodologyName = caseStudy.methodology.name;
  const reflections = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_REFLECTIONS : caseStudy.reflections;
  const projectYear = caseStudy.year;
  const heroImage = resolveProjectHeroImage(caseStudy.slug, caseStudy.images.hero);

  return (
    <main className="bg-white text-[#3c3e3f] overflow-x-hidden">
      <SiteHeader active="Projects" />

      <div className="bg-[#F0F7FF]">
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-6 pt-6 text-sm lg:px-20">
          <a href={withBasePath("/")} className="text-[#5c7792] transition-colors hover:text-[#0e2951]">Home</a>
          <span className="text-[#b8cce0]">›</span>
          <a href={withBasePath("/projects")} className="text-[#5c7792] transition-colors hover:text-[#0e2951]">Projects</a>
          <span className="text-[#b8cce0]">›</span>
          <span className="font-semibold text-[#0e2951]">{caseStudy.title}</span>
        </div>

        <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-0 md:px-10 xl:px-20">
          <div className="mx-auto max-w-[1040px]">
            <div className="mb-6 text-center">
              <div className="mx-auto max-w-[760px]">
                <p className="mb-3 font-inter text-[13px] uppercase tracking-[3px] text-[#5c7792]">
                  {caseStudy.industry ?? "Case Study"}
                </p>
                <h1 className="mb-5 font-inter text-[36px] font-bold leading-[1.15] text-[#0e2951] md:text-[44px]">
                  {caseStudy.title}
                </h1>
                <p className="text-[16px] leading-[1.7] text-[#5c7792]">{caseStudy.tagline}</p>
              </div>
            </div>

            {heroImage ? (
              <div className="relative mx-auto mb-10 h-[150px] w-full max-w-[840px] overflow-hidden rounded-[24px] shadow-[0_20px_64px_rgba(14,41,81,0.12)]">
                <img
                  src={withBasePath(heroImage)}
                  alt={`${caseStudy.title} banner`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ) : null}

            <div className="mt-10 flex flex-col items-center gap-8 pt-8 text-center">
              <div className="grid w-full gap-8 md:grid-cols-[1fr_2fr_1fr] md:items-center">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0e2951]/50">Year</p>
                  <p className="mt-1 text-[14px] font-medium text-[#0e2951]">{projectYear ?? ""}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0e2951]/50">Role</p>
                  <p className="mt-1 text-[14px] font-medium text-[#0e2951]">{caseStudy.role ?? ""}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0e2951]/50">Client</p>
                  <p className="mt-1 text-[14px] font-medium text-[#0e2951]">{caseStudy.client_context ?? caseStudy.company}</p>
                </div>
              </div>
              <div className="h-px w-full bg-[linear-gradient(90deg,rgba(9,67,106,0)_0%,rgba(17,131,208,0.4)_50%,rgba(9,67,106,0)_100%)]" />
            </div>
          </div>
        </section>
      </div>

      {caseStudy.slug !== "flock-accessibility-system" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10 xl:px-20">
          <div className="mx-auto max-w-[1040px]">
            <div className="grid gap-12 text-center md:grid-cols-3">
              {highlightMetrics.map((metric, index) => (
                <div
                  key={`${metric.label}-${metric.value}`}
                  className={`relative px-4 md:px-8 ${index < 2 ? "after:absolute after:right-0 after:top-1/2 after:h-24 after:w-px after:-translate-y-1/2 after:bg-[#d7e8f7] after:content-['']" : ""}`}
                >
                  <p className="text-[46px] font-bold leading-none text-[#1183D0]">{metric.value}</p>
                  <p className="mt-5 text-[16px] leading-[1.625em] text-[#5c7792]">{metric.label}</p>
                  {metric.context ? <p className="mt-3 text-[14px] leading-[1.6] text-[#5c7792]">{metric.context}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
        <SectionHeading eyebrow="Overview" title="Structure" className="mb-6" />
        {overviewBlock?.body ? (
          <p className="mt-8 max-w-[860px] font-inter text-[18px] leading-[1.8] text-[#5c7792]">
            {overviewBlock.body}
          </p>
        ) : null}
        <div className="mt-8 grid gap-8 md:grid-cols-4 md:gap-0">
          <div className="border-[#4d87ae]/20 pb-8 md:border-r md:pb-0 md:pr-8">
            <p className="mb-4 font-inter text-[15px] uppercase tracking-[1.5px] text-[#5c7792]">Team Members</p>
            <div className="mb-5 h-[3px] w-full rounded-full bg-[#4d87ae]/20" />
            <ul className="space-y-1">
              {caseStudy.team.map((item) => (
                <li key={item} className="font-inter text-[16px] capitalize leading-[1.75] text-[#5c7792]">{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-[#4d87ae]/20 py-8 md:border-r md:px-8 md:py-0">
            <p className="mb-4 font-inter text-[15px] uppercase tracking-[1.5px] font-medium text-[#3c3e3f]">My Role</p>
            <div className="mb-5 h-[3px] w-full rounded-full bg-[#1183D0]" />
            <ul className="space-y-1">
              {caseStudy.my_role.map((item) => (
                <li key={item} className="font-inter text-[16px] capitalize leading-[1.75] font-medium text-[#3c3e3f]">{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-[#4d87ae]/20 py-8 md:border-r md:px-8 md:py-0">
            <p className="mb-4 font-inter text-[15px] uppercase tracking-[1.5px] text-[#5c7792]">Tools Used</p>
            <div className="mb-5 h-[3px] w-full rounded-full bg-[#4d87ae]/20" />
            <ul className="space-y-1">
              {caseStudy.tools.map((item) => (
                <li key={item} className="font-inter text-[16px] capitalize leading-[1.75] text-[#5c7792]">{item}</li>
              ))}
            </ul>
          </div>
          <div className="pt-8 md:pl-8 md:pt-0">
            <p className="mb-4 font-inter text-[15px] uppercase tracking-[1.5px] text-[#5c7792]">Timeline</p>
            <div className="mb-5 h-[3px] w-full rounded-full bg-[#4d87ae]/20" />
            <p className="font-inter text-[16px] capitalize leading-[1.75] text-[#5c7792]">{caseStudy.duration}</p>
          </div>
        </div>
      </section>

      {visibleStoryBlocks.length ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <SectionHeading eyebrow="Case Study" title="The problem" className="mb-12" />
              <div className="space-y-10">
                {visibleStoryBlocks.map((block) => {
                  const items = getPayloadList(block.payload, "items");

                  return (
                    <div key={block.id}>
                      {block.title !== "Situation" && block.title !== "Actions" ? (
                        <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">
                          {block.title}
                        </p>
                      ) : null}
                      {block.body ? (
                        block.body.split(/\n+/).map((paragraph, idx) => (
                          <p key={idx} className="max-w-[720px] font-inter text-[16px] leading-[1.7] text-[#5c7792] mb-4 last:mb-0">{paragraph.trim()}</p>
                        ))
                      ) : null}
                      {items.length ? (
                        <div className="mt-5 space-y-3">
                          {items.map((item) => (
                            <p key={item} className="max-w-[720px] font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                              {item}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4">
              {problemMetrics.map((metric) => (
                <Card key={`${metric.label}-${metric.value}`} className="overflow-hidden">
                  <CardContent className="px-7 py-7">
                    <p className="text-[30px] font-bold leading-none text-[#0e2951]">{metric.value}</p>
                    <p className="mt-3 text-[16px] leading-[1.625em] text-[#0e2951]">
                      {metric.label}
                    </p>
                    {metric.context ? (
                      <p className="mt-2 text-[14px] leading-[1.6] text-[#5c7792]">{metric.context}</p>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Admins' Pain" title="Points" className="mb-8" />
              <div className="space-y-8">
                {caseStudy.problem.admin_pain_points.map((item) => (
                  <p key={item} className="font-inter text-[22px] leading-[1.9] text-[#5c7792]">{item}</p>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Users' Pain" title="Points" className="mb-8" />
              <div className="space-y-8">
                {caseStudy.problem.user_pain_points.map((item) => (
                  <p key={item} className="font-inter text-[22px] leading-[1.9] text-[#5c7792]">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {caseStudy.slug === "flock-accessibility-system" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10 xl:px-20">
          <SectionHeading
            eyebrow="Methodology"
            title={methodologyName}
            centered
            className="mb-12"
          />
          <div className="grid gap-4 md:grid-cols-5">
            {caseStudy.methodology.steps.map((step, index) => (
              <div key={step.step} className="flex flex-col gap-4">
                <div
                  className="flex flex-1 flex-col gap-2 rounded-2xl p-5"
                  style={{ backgroundColor: `${METHODOLOGY_COLORS[index] ?? "#87d4ac"}33` }}
                >
                  <div
                    className="w-full rounded-xl"
                    style={{ height: 10, backgroundColor: METHODOLOGY_COLORS[index] ?? "#87d4ac" }}
                  />
                  <p className="mt-2 font-inter text-[15px] font-semibold text-[#3c3e3f]">
                    {step.step}. {step.label}
                  </p>
                  <p className="font-inter text-[14px] leading-[1.625em] text-[#5c7792]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "flock-accessibility-system" ? (
        <>
          <section className="mx-auto max-w-[1200px] px-6 py-6 md:px-10 xl:px-20">
            <div className="px-6 py-6 md:px-10">
              <div className="mb-5 text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">Research & discovery</p>
                <h2 className="mt-3 font-serif-display text-[34px] italic leading-tight text-[#0e2951] md:text-[42px]">
                  Accessibility Audit
                </h2>
              </div>
              <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <Card className="overflow-hidden border-0 bg-transparent shadow-none">
                  <CardContent className="px-0 py-4 text-left lg:flex lg:min-h-[420px] lg:flex-col lg:justify-center">
                    <div className="space-y-4">
                      <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                        Existing Confluence documentation and the product were reviewed to identify missing patterns and determine which could be retained within the new library structure.
                      </p>
                      <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                        Issues were organized by severity, system impact, and implementation complexity, while distinguishing between accessibility gaps and system inconsistencies.
                      </p>
                      <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                        Audit findings were translated into reusable system guidance by separating accessibility issues from pattern decisions and documenting expected component behavior.
                      </p>
                      <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                        Accessibility checks were conducted using Axe and VoiceOver to analyze issues across desktop and mobile.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <a
                  href={withBasePath("/images/projects/flock-accessibility-system/banners/flock-buttons-ui.svg")}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                  <div className="overflow-hidden rounded-[24px] border border-[#d7e8f7] bg-white shadow-[0_20px_64px_rgba(14,41,81,0.10)]">
                    <img
                      src={withBasePath("/images/projects/flock-accessibility-system/banners/flock-buttons-ui.svg")}
                      alt="Flock button accessibility audit examples"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                  <p className="mt-4 text-center font-inter text-[13px] leading-[1.6] text-[#5c7792]">
                    Open image to zoom
                  </p>
                </a>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
            <h2 className="mb-12 text-center font-serif-display text-[28px] italic leading-tight text-[#0e2951] md:text-[34px]">
              Before &amp; After Accessibility Updates
            </h2>
            <p className="mx-auto mb-10 max-w-[860px] text-center font-inter text-[16px] leading-[1.7] text-[#5c7792]">
              Each example below shows how the same product patterns were reworked to improve hierarchy, navigation, controls, and clarity without relying on the original branded UI.
            </p>
            <FlockChecklistShowcase />
          </section>
        </>
      ) : null}

      {caseStudy.slug !== "nayya-ai-benefits" && caseStudy.slug !== "flock-accessibility-system" && caseStudy.slug !== "i9-everify-integration" && (caseStudy.constraints?.length ?? 0) > 0 ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <SectionHeading title="Constraints" centered className="mb-12" />
          <div className="grid gap-6 md:grid-cols-2">
            {(caseStudy.constraints ?? []).map((item) => (
              <Card key={item} className="p-0 py-0">
                <CardContent className="p-8">
                  <Badge>Constraint</Badge>
                  <p className="mt-4 font-inter text-[22px] leading-[1.85] text-[#5c7792]">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.slug !== "flock-accessibility-system" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <SectionHeading
            eyebrow={["nayya-ai-benefits", "i9-everify-integration"].includes(caseStudy.slug) ? methodologyName : "Methodology"}
            title={["nayya-ai-benefits", "i9-everify-integration"].includes(caseStudy.slug) ? "Methodology" : methodologyName}
            centered={["nayya-ai-benefits", "i9-everify-integration"].includes(caseStudy.slug)}
            className="mb-12"
          />
          <div className="grid gap-4 md:grid-cols-5">
            {caseStudy.methodology.steps.map((step, index) => (
              ["nayya-ai-benefits", "i9-everify-integration"].includes(caseStudy.slug) ? (
                <div key={step.step} className="flex flex-col gap-4">
                  <div
                    className="flex flex-1 flex-col gap-2 rounded-2xl p-5"
                    style={{ backgroundColor: `${METHODOLOGY_COLORS[index] ?? "#87d4ac"}33` }}
                  >
                    <div
                      className="w-full rounded-xl"
                      style={{ height: 10, backgroundColor: METHODOLOGY_COLORS[index] ?? "#87d4ac" }}
                    />
                    <p className="mt-2 font-inter text-[15px] font-semibold text-[#3c3e3f]">
                      {index + 1}. {step.label}
                    </p>
                    <p className="font-inter text-[14px] leading-[1.625em] text-[#5c7792]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ) : (
                <Card key={step.step} className="p-0 py-0">
                  <CardContent className="p-6">
                    <p className="font-inter text-[15px] font-semibold text-[#3c3e3f]">{index + 1}. {step.label}</p>
                    <p className="mt-2 font-inter text-[13px] leading-[1.5] text-[#5c7792]">{step.description}</p>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "i9-everify-integration" && findBlock("research") ? (() => {
        const block = findBlock("research")!;
        const items = getPayloadList(block.payload, "items");
        return (
          <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
            <SectionHeading title={block.title} centered className="mb-12" />
            <div className="mx-auto max-w-[820px] space-y-4 text-center">
              {block.body ? block.body.split(/\n+/).map((p, i) => (
                <p key={i} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">{p.trim()}</p>
              )) : null}
              {items.length ? (
                <div className="mt-5 space-y-3">
                  {items.map((item) => (
                    <p key={item} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">{item}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })() : null}

      <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
        {caseStudy.slug === "nayya-ai-benefits" ? (
          <>
            <h2 className="mb-5 text-center font-serif-display text-[36px] italic leading-tight text-[#0e2951]">
              Design Process
            </h2>
            <div className="mx-auto grid max-w-[980px] items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="flex justify-center lg:justify-start">
                <img
                  src={withBasePath(NAYYA_PHONE_IMAGE)}
                  alt="Nayya mobile recommendation concept"
                  className="h-auto w-full max-w-[420px] sm:max-w-[500px]"
                />
              </div>
              <div className="space-y-5 text-center lg:text-left">
                {designStrategy.map((item) => (
                  <p key={item} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">{item}</p>
                ))}
              </div>
            </div>
          </>
        ) : caseStudy.slug === "i9-everify-integration" ? (
          <>
            <SectionHeading
              title="Design Process"
              centered
              className="mb-12"
            />
            <div className="mx-auto mb-10 max-w-[820px] text-center">
              <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                Made I-9 feel like part of Flex onboarding rather than a disconnected compliance task by aligning it with existing onboarding patterns and designing a dedicated company settings flow to configure and manage the integration.
              </p>
            </div>
            <div className="mx-auto max-w-[1100px]">
              <img
                src={withBasePath("/images/projects/i9-everify-integration/banners/i9-admin-design-process.svg")}
                alt="I-9 admin interface design"
                className="h-auto w-full"
              />
            </div>
            <div className="mx-auto mt-10 max-w-[820px] text-center">
              <div className="space-y-5">
                {designStrategy.map((item) => (
                  <p key={item} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">{item}</p>
                ))}
              </div>
            </div>
            <div className="mx-auto mt-10 max-w-[1100px]">
              <div>
                <div className="mt-6">
                  <img
                    src={withBasePath("/images/projects/i9-everify-integration/banners/i9-employee-design-process.svg")}
                    alt="I-9 employee interface design"
                    className="h-auto w-full"
                  />
                </div>
                <div className="mx-auto my-10 max-w-[820px] text-center">
                  <p className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                    Keep completed documents, progress indicators, and follow-up actions visible after the vendor experience.
                  </p>
                </div>
                <div className="mt-6">
                  <img
                    src={withBasePath("/images/projects/i9-everify-integration/banners/i9-admin-experience.svg")}
                    alt="I-9 admin experience"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </>
        ) : caseStudy.slug === "flock-accessibility-system" ? (
          <>
            <SectionHeading
              title="Design Process"
              centered
              className="mb-12"
            />
            <div className="mx-auto grid max-w-[1100px] items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="flex justify-center lg:justify-start">
                <img
                  src={withBasePath("/images/projects/flock-accessibility-system/banners/flock-notification-banner.svg")}
                  alt="Flock notification banner design"
                  className="h-auto w-full max-w-[420px]"
                />
              </div>
              <div className="space-y-8 text-center lg:text-left">
                {designStrategy.map((item) => (
                  <p key={item} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">{item}</p>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <SectionHeading
              title="Design Process"
              centered
              className="mb-12"
            />
            <div className="mx-auto max-w-[820px] space-y-8 text-center">
              {designStrategy.map((item) => (
                <p key={item} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">{item}</p>
              ))}
            </div>
          </>
        )}
      </section>

      {caseStudy.slug === "nayya-ai-benefits" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <h2 className="mb-5 text-center font-serif-display text-[36px] italic leading-tight text-[#0e2951]">
            Alternatives explored
          </h2>
          <p className="mx-auto mb-10 max-w-[760px] text-center font-inter text-[16px] leading-[1.7] text-[#5c7792]">
            Three integration approaches were considered and assessed on placement, feasibility, and user support. The guided decision modal was selected as the strongest option and moved into testing.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {NAYYA_PROCESS_ALTERNATIVES.map((item) => (
              <Card key={item.title} className="overflow-hidden border-transparent shadow-none">
                <CardContent className="p-7">
                  <Badge className={item.status === "Rejected" ? "border border-[#1183D0] bg-white text-[#1183D0]" : ""}>{item.status}</Badge>
                  <h3 className="mt-5 font-inter text-[20px] font-semibold leading-snug text-[#0e2951]">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-inter text-[15px] leading-[1.7] text-[#5c7792]">{item.body}</p>
                  {item.imageSrc ? (
                    <div className="mt-6 overflow-hidden rounded-[18px] bg-white">
                      <img
                        src={withBasePath(item.imageSrc)}
                        alt="Nayya recommendation step inside benefits enrollment"
                        className="h-auto w-full"
                      />
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 hidden overflow-x-auto rounded-[24px] border border-[#d7e8f7] bg-white md:block">
            <div className="grid min-w-[900px] grid-cols-[1fr_1.2fr_1.4fr_0.8fr] bg-[#f7f9fb] text-[13px] font-bold uppercase tracking-[0.16em] text-[#0e2951]">
              <div className="px-5 py-4">Alternative</div>
              <div className="px-5 py-4">Strength</div>
              <div className="px-5 py-4">Tradeoff</div>
              <div className="px-5 py-4">Decision</div>
            </div>
            {NAYYA_PROCESS_TRADEOFFS.map((row) => (
              <div
                key={row.alternative}
                className="grid min-w-[900px] grid-cols-[1fr_1.2fr_1.4fr_0.8fr] border-t border-[#d7e8f7] text-[15px] leading-[1.6] text-[#5c7792]"
              >
                <div className="px-5 py-5 font-semibold text-[#0e2951]">{row.alternative}</div>
                <div className="px-5 py-5">{row.strength}</div>
                <div className="px-5 py-5">{row.tradeoff}</div>
                <div className="px-5 py-5 font-semibold text-[#1183D0]">{row.decision}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:hidden">
            {NAYYA_PROCESS_TRADEOFFS.map((row) => (
              <Card key={row.alternative} className="overflow-hidden">
                <CardContent className="space-y-4 px-5 py-5">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1183D0]">Alternative</p>
                    <p className="mt-2 text-[18px] font-semibold leading-snug text-[#0e2951]">{row.alternative}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1183D0]">Strength</p>
                    <p className="mt-2 text-[15px] leading-[1.6] text-[#5c7792]">{row.strength}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1183D0]">Tradeoff</p>
                    <p className="mt-2 text-[15px] leading-[1.6] text-[#5c7792]">{row.tradeoff}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1183D0]">Decision</p>
                    <p className="mt-2 text-[15px] font-semibold text-[#1183D0]">{row.decision}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "nayya-ai-benefits" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <h2 className="mb-5 text-center font-serif-display text-[36px] italic leading-tight text-[#0e2951]">
            Key Insights from Testing
          </h2>
          <p className="mx-auto mb-10 max-w-[760px] text-center font-inter text-[16px] leading-[1.7] text-[#5c7792]">
            Research and discovery clarified the key questions for testing: Did users understand the
            handoff, feel confident continuing, and maintain trust throughout the experience? The selected
            guided decision modal was the concept tested, and the findings showed which parts of the
            integration felt clear and where friction still remained.
          </p>
          <div className="hidden overflow-hidden rounded-[24px] border border-[#d7e8f7] bg-white md:block">
            <div className="grid grid-cols-[1.05fr_1.45fr_1.5fr] gap-6 border-b border-[#d7e8f7] bg-[#f7f9fb] px-6 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-[#0e2951]">
              <div>Metric</div>
              <div>Finding</div>
              <div>Insight</div>
            </div>
            {NAYYA_TESTING_RESULTS.map((row) => (
              <div
                key={`${row.metric}-${row.label}`}
                className="grid grid-cols-[1.05fr_1.45fr_1.5fr] gap-6 border-t border-[#d7e8f7] px-5 py-5 text-[15px] leading-[1.6] text-[#5c7792]"
              >
                <div>
                  <p className="text-[30px] font-semibold leading-none text-[#0e2951]">{row.metric}</p>
                  <p className="mt-3 text-[14px] leading-[1.5] text-[#5c7792]">{row.label}</p>
                </div>
                <p className="font-normal text-[#5c7792]">{row.finding}</p>
                <p className="font-normal text-[#5c7792]">{row.insight}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:hidden">
            {NAYYA_TESTING_RESULTS.map((row) => (
              <Card key={`${row.metric}-${row.label}`} className="overflow-hidden">
                <CardContent className="space-y-4 px-5 py-5">
                  <div>
                    <p className="text-[28px] font-semibold leading-none text-[#0e2951]">{row.metric}</p>
                    <p className="mt-2 text-[14px] leading-[1.5] text-[#5c7792]">{row.label}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1183D0]">Finding</p>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[#5c7792]">{row.finding}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1183D0]">Insight</p>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[#5c7792]">{row.insight}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "nayya-ai-benefits" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <SectionHeading title="The Solution" centered className="mb-12" />
          {resultBlock?.body ? (
            <p className="mx-auto max-w-[860px] text-center font-inter text-[16px] leading-[1.7] text-[#5c7792]">
              {resultBlock.body}
            </p>
          ) : null}
        </section>
      ) : null}

      {caseStudy.slug === "flock-accessibility-system" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <SectionHeading title="The Solution" centered className="mb-12" />
          <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="space-y-5 text-center lg:text-left">
              {FLOCK_SOLUTION.map((item) => (
                <div key={item.title} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
                  <p>
                    <span className="font-semibold text-[#0e2951]">{item.title}:</span> {item.body}
                  </p>
                </div>
              ))}
            </div>
            <a
              href={withBasePath("/images/projects/flock-accessibility-system/banners/flock-buttons-suggestions.svg")}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="overflow-hidden rounded-[24px] border border-[#d7e8f7] bg-white shadow-[0_20px_64px_rgba(14,41,81,0.10)]">
                <img
                  src={withBasePath("/images/projects/flock-accessibility-system/banners/flock-buttons-suggestions.svg")}
                  alt="Flock button suggestions and solution example"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </a>
          </div>
        </section>
      ) : null}

      {caseStudy.slug === "nayya-ai-benefits" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="max-w-[1040px] mx-auto">
            <div className="overflow-hidden rounded-[24px] border border-[#d7e8f7] bg-white shadow-[0_24px_64px_rgba(17,131,208,0.10)]">
              <iframe
                title="Nayya impact frame from Figma"
                src={NAYYA_IMPACT_FIGMA_EMBED}
                className="h-[520px] w-full"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
        <SectionHeading title="Results & Impact" centered className="mb-12" />
        {caseStudy.slug === "flock-accessibility-system" ? (
          <div className="mx-auto max-w-[1040px] overflow-hidden rounded-[24px] border border-[#d7e8f7] bg-white">
            <div className="grid grid-cols-[1fr_1fr] gap-6 border-b border-[#d7e8f7] bg-[#f7f9fb] px-6 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-[#0e2951]">
              <div>Before</div>
              <div>After</div>
            </div>
            {FLOCK_RESULTS_COMPARISON.map((row) => (
              <div
                key={row.before}
                className="grid grid-cols-[1fr_1fr] gap-6 border-t border-[#d7e8f7] px-6 py-5 text-[15px] leading-[1.7] text-[#5c7792]"
              >
                <p>{row.before}</p>
                <p className="text-[#0e2951]">{row.after}</p>
              </div>
            ))}
          </div>
        ) : resultRows.length ? (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {resultRows.map((row) => (
              <Card key={`${row.metric}-${row.value}`} className="overflow-hidden">
                <CardContent className="px-4 py-5">
                  <p className="text-[24px] font-bold leading-none text-[#0e2951]">{row.value}</p>
                  <p className="mt-2 text-[13px] leading-[1.4] text-[#0e2951]">{row.metric}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
        {caseStudy.slug !== "flock-accessibility-system" && [resultInsights, resultOpportunities, projectedImprovements, successMetrics].some((items) => items.length) ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {resultInsights.length ? (
              <Card className="border-0 bg-transparent p-0 py-0 shadow-none">
                <CardContent className="p-8">
                  <h3 className="font-inter text-[20px] font-semibold leading-snug text-[#0e2951]">{caseStudy.slug === "i9-everify-integration" ? "Key Results" : "Enrollment Behavior Insights"}</h3>
                  <ul className="mt-5 list-disc space-y-3 pl-5">
                    {resultInsights.filter((item) => !shouldHideInsight(item)).map((item) => (
                      /^2026(?:\s+data)?$/i.test(stripLeadingBullet(item)) ? (
                        <li key={item} className="list-none mt-6 mb-3 pl-1 text-[13px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">{normalizeInsightHeading(item)}</li>
                      ) : (
                        <li key={item} className="font-inter text-[15px] leading-[1.7] text-[#5c7792]">{stripLeadingBullet(item)}</li>
                      )
                    ))}
                  </ul>
                  {caseStudy.slug === "nayya-ai-benefits" ? (
                    <p className="mt-5 font-inter text-[15px] font-semibold leading-[1.7] text-[#5c7792]">
                      {NAYYA_INSIGHTS_CLOSING}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            ) : null}
            {resultOpportunities.length ? (
              <Card className="border-0 bg-transparent p-0 py-0 shadow-none">
                <CardContent className="p-8">
                  <h3 className="font-inter text-[20px] font-semibold leading-snug text-[#0e2951]">Opportunities and Next Steps</h3>
                  <ul className="mt-5 list-disc space-y-3 pl-5">
                    {resultOpportunities.map((item) => (
                      <li key={item} className="font-inter text-[15px] leading-[1.7] text-[#5c7792]">{stripLeadingBullet(item)}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
            {projectedImprovements.length ? (
              <Card className="p-0 py-0">
                <CardContent className="p-8">
                  <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">Projected Improvements</p>
                  <ul className="space-y-3">
                    {projectedImprovements.map((item) => (
                      <li key={item} className="font-inter text-[15px] leading-[1.7] text-[#5c7792]">{stripLeadingBullet(item)}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
            {successMetrics.length ? (
              <Card className="p-0 py-0">
                <CardContent className="p-8">
                  <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">Success Metrics</p>
                  <ul className="space-y-3">
                    {successMetrics.map((item) => (
                      <li key={item} className="font-inter text-[15px] leading-[1.7] text-[#5c7792]">{stripLeadingBullet(item)}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
        <SectionHeading title="Learnings" centered className="mb-12" />
        <div className="mx-auto max-w-[820px] space-y-8 text-center">
          {reflections.map((reflection) => (
            <p key={reflection.title} className="font-inter text-[16px] leading-[1.7] text-[#5c7792]">
              <strong className="font-semibold">{reflection.title} </strong>
              {reflection.body}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10 xl:px-20">
        <div className="mb-8 h-px w-full bg-[linear-gradient(90deg,rgba(9,67,106,0)_0%,rgba(17,131,208,0.4)_50%,rgba(9,67,106,0)_100%)]" />
        {caseStudy.slug === "flock-accessibility-system" ? (
          <div className="mb-10 flex flex-wrap items-center justify-center gap-8">
            <img
              src={withBasePath("/images/SNUZw.png")}
              alt="IBX"
              className="h-12 w-auto object-contain opacity-80"
            />
            <img
              src={withBasePath("/images/c54fy.png")}
              alt="Paychex"
              className="h-12 w-auto object-contain opacity-80"
            />
            <img
              src={withBasePath("/images/IbuV3.png")}
              alt="Flock"
              className="h-12 w-auto object-contain opacity-80"
            />
          </div>
        ) : null}
        {caseStudy.client_logos.length ? (
          <div className="mb-10 flex flex-wrap items-center justify-center gap-8">
            {caseStudy.client_logos.map((logo) => (
              <img
                key={logo.name}
                src={resolveTrustedLogo(logo.name, logo.logo)}
                alt={logo.name}
                className="h-12 w-auto object-contain opacity-80"
              />
            ))}
            <img
              src={withBasePath("/images/SNUZ.svg")}
              alt="ITX"
              className="h-12 w-auto object-contain opacity-80"
            />
          </div>
        ) : null}
        <div className="mt-10 h-px w-full bg-[linear-gradient(90deg,rgba(9,67,106,0)_0%,rgba(17,131,208,0.4)_50%,rgba(9,67,106,0)_100%)]" />
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto_1fr] md:items-start">
          <div className="flex flex-col items-center gap-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.32em] text-[#5c7792]">
              Tools
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {caseStudy.tools.map((tool) => (
                <Badge key={tool} size="tag">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
          <div className="hidden w-px self-stretch bg-[#d7e8f7] md:block" />
          <div className="flex flex-col items-center gap-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.32em] text-[#5c7792]">
              Tags
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {caseStudy.tags.map((tag) => (
                <Badge key={tag} size="tag">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
        <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.45em] text-[#1183D0]">More work</p>
        <h2 className="mb-8 font-serif-display text-[32px] italic text-[#0e2951]">Other Projects</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {otherProjects.map((project) => (
            <Link
              key={project.slug}
              id={project.cardId}
              data-home-card-id={project.cardId}
              href={resolveProjectHref(project)}
              className="group flex min-w-0 cursor-pointer flex-col gap-5 outline-none"
            >
              <div className="relative h-[230px] overflow-hidden rounded-[28px] bg-[#e9f3fb] shadow-[0_18px_52px_rgba(14,41,81,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_70px_rgba(14,41,81,0.22)] group-focus-visible:-translate-y-1 group-focus-visible:shadow-[0_28px_70px_rgba(14,41,81,0.22)]">
                <Image
                  src={project.previewImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <Badge key={tag} size="tag">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="font-serif-display italic text-[30px] leading-snug text-[#1183D0] transition-colors duration-200 group-hover:text-[#0e2951] group-focus-visible:text-[#0e2951]">
                {project.title}
              </h3>
              <div className="-mt-2 h-[116px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <div className="flex h-full flex-col justify-between">
                  <p className="text-[14px] leading-relaxed text-[#5c7792]">
                    {project.tagline}
                  </p>
                  <span className="inline-flex text-[14px] font-medium text-[#1183D0] underline-offset-2 group-hover:underline group-focus-visible:underline">
                    {project.external_link ? "View project" : "View case study"} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

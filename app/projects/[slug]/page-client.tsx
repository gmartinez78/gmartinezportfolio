"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  resolveProjectHeroImage,
  resolveProjectHref,
  resolveProjectImage,
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
    imageSrc: "/images/projects/nayya-embedded-section.jpg",
  },
  {
    title: "Benefit-list entry point",
    status: "Rejected",
    body:
      "Place a button in the benefits list so users could choose to use Nayya while reviewing available coverage options.",
    imageSrc: "/images/projects/nayya-benefit-list-entry.jpg",
  },
  {
    title: "Guided decision modal",
    status: "Selected",
    body:
      "Show a modal after users entered their family information, when guidance felt timely connected to choosing better benefits.",
    imageSrc: "/images/projects/nayya-guided-decision-modal.jpg",
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

const NAYYA_IMPACT_FIGMA_EMBED =
  "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FYK1xcLLDokH5gNYAeDmNiP%2FNayya%3Fnode-id%3D20753-8774%26t%3DaR6ccy3XAhFLwCo4-1";

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

const NAYYA_PHONE_IMAGE = "/images/projects/nayya-design-process.png";
const NAYYA_METHODOLOGY_NAME = "Research & Discovery";
const NAYYA_YEAR = 2025;
const NAYYA_INSIGHTS_CLOSING =
  "Participants who completed the Nayya survey enrolled in TWICE as many benefits as those who skipped it.";

const METHODOLOGY_COLORS = ["#87d4ac", "#f5e692", "#d9b8ff", "#68c7c1", "#d1f090"];

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
      previewImage: resolveProjectImage(project.slug, project.images.cover || project.images.hero || ""),
      previewMetric: project.metrics[0]?.value ?? project.year,
      previewLabel: project.metrics[0]?.label ?? project.industry ?? "",
    }));
  const findBlock = (id: string) => caseStudy.content_blocks?.find((block) => block.id === id);
  const overviewBlock = findBlock("overview");
  const storyBlocks = ["situation", "task", "research", "actions"]
    .map((id) => findBlock(id))
    .filter(isContentBlock);
  const resultBlock = findBlock("impact");
  const resultRows = getPayloadRows(resultBlock?.payload, "rows");
  const resultInsights = getPayloadList(resultBlock?.payload, "insights");
  const resultOpportunities = getPayloadList(resultBlock?.payload, "opportunities");
  const projectedImprovements = getPayloadList(resultBlock?.payload, "projected");
  const successMetrics = getPayloadList(resultBlock?.payload, "successMetrics");
  const highlightMetrics = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_HIGHLIGHT_METRICS : caseStudy.metrics.slice(0, 3);
  const problemMetrics = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_PROBLEM_METRICS : caseStudy.metrics.slice(0, 3);
  const designStrategy = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_DESIGN_STRATEGY : caseStudy.design_strategy;
  const methodologyName = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_METHODOLOGY_NAME : caseStudy.methodology.name;
  const reflections = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_REFLECTIONS : caseStudy.reflections;
  const projectYear = caseStudy.slug === "nayya-ai-benefits" ? NAYYA_YEAR : caseStudy.year;
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

      {storyBlocks.length ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <SectionHeading eyebrow="Case Study" title="The problem" className="mb-12" />
              <div className="space-y-10">
                {storyBlocks.map((block) => {
                  const items = getPayloadList(block.payload, "items");

                  return (
                    <div key={block.id}>
                      {block.title !== "Situation" ? (
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

      {caseStudy.slug !== "nayya-ai-benefits" ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <SectionHeading title="Constraints" centered className="mb-12" />
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudy.constraints.map((item) => (
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

      <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
        <SectionHeading
          eyebrow={caseStudy.slug === "nayya-ai-benefits" ? methodologyName : "Methodology"}
          title={caseStudy.slug === "nayya-ai-benefits" ? "Methodology" : methodologyName}
          centered={caseStudy.slug === "nayya-ai-benefits"}
          className="mb-12"
        />
        <div className="grid gap-4 md:grid-cols-5">
          {caseStudy.methodology.steps.map((step, index) => (
            caseStudy.slug === "nayya-ai-benefits" ? (
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
        ) : (
          <>
            <SectionHeading
              title="Design Strategy"
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
        {resultRows.length ? (
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
        {[resultInsights, resultOpportunities, projectedImprovements, successMetrics].some((items) => items.length) ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {resultInsights.length ? (
              <Card className="border-0 bg-transparent p-0 py-0 shadow-none">
                <CardContent className="p-8">
                  <h3 className="font-inter text-[20px] font-semibold leading-snug text-[#0e2951]">Enrollment Behavior Insights</h3>
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
            <a key={project.slug} href={resolveProjectHref(project)} className="group overflow-hidden rounded-[28px] border border-[#CFE5F8] bg-white transition-all hover:-translate-y-0.5">
              <div className="relative h-40 overflow-hidden bg-[radial-gradient(ellipse_at_20%_50%,#d4e8ff_0%,#edf5fb_70%)]">
                {project.previewImage ? (
                  <img
                    src={withBasePath(project.previewImage)}
                    alt={`${project.title} preview`}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-center">
                    <div>
                      <span className="font-serif-display text-3xl font-bold italic text-[#1183D0]">
                        {project.previewMetric}
                      </span>
                      {project.previewLabel ? (
                        <p className="mx-auto mt-2 max-w-[140px] text-xs leading-tight text-[#5c7792]">
                          {project.previewLabel}
                        </p>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-xs font-medium text-[#5c7792]">{project.company}</span>
                  <span className="text-[#bcd2ff]">·</span>
                  <span className="text-xs text-[#5c7792]">{project.year}</span>
                </div>
                <h3 className="mb-2 text-[15px] font-semibold leading-snug text-[#0e2951]">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-[#5c7792]">{project.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} size="tag">{tag}</Badge>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

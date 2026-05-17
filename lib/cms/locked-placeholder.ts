import type { CaseStudyRecord } from "@/lib/cms/types";

export const LOCKED_NAYYA_PLACEHOLDER_SLUG = "nayya-ai-benefits-private";

const LOCKED_NAYYA_SOURCE_SLUG = "nayya-ai-benefits";
const LOCKED_NAYYA_PLACEHOLDER_PASSWORD = "placeholder";
const LOCKED_NAYYA_PLACEHOLDER_MEDIA = "/images/projects/EB.png";

function createLockedPlaceholder(order: number): CaseStudyRecord {
  return {
    slug: LOCKED_NAYYA_PLACEHOLDER_SLUG,
    status: "published",
    featured: false,
    order,
    title: "Landing Page Optimization for Course Enrollment",
    company: "Confidential Client",
    client_context: "Confidential education brand",
    role: "Sr. Product Designer",
    year: 2025,
    duration: "8 weeks",
    industry: "Education / Performance Marketing",
    tagline: "Redesigned paid campaign landing pages and tested two new variants, increasing purchases by 150% while lowering cost per purchase by 80%.",
    tags: ["Confidential", "Product Design", "Experimentation", "Growth"],
    filters: ["Product Design"],
    tools: ["Meta Ads Manager", "Figma", "GA4", "Hotjar", "Google Sheets"],
    images: {
      cover: LOCKED_NAYYA_PLACEHOLDER_MEDIA,
      hero: LOCKED_NAYYA_PLACEHOLDER_MEDIA,
      gallery: [],
    },
    client_logos: [],
    metrics: [
      {
        value: "150%",
        label: "Increase in purchases",
        context: "Winning landing-page variant versus the original control campaign.",
      },
      {
        value: "25.0%",
        label: "Conversion rate",
        context: "Community-led variant achieved the strongest conversion performance.",
      },
      {
        value: "$0.85",
        label: "Cost per purchase",
        context: "Reduced from $4.20 on the control, an 80% improvement.",
      },
    ],
    team: ["Growth lead", "Paid media manager", "Copywriter", "Creative strategist", "Product designer"],
    my_role: ["Experiment strategy", "Landing page UX", "A/B test design", "Performance analysis"],
    problem: {
      admin_pain_points: [
        "The original campaign was expensive to scale and produced only a 6.0% conversion rate.",
        "The team had no clear evidence for which landing-page structure or message framing drove higher purchase intent.",
      ],
      user_pain_points: [
        "The original page introduced the offer too slowly and buried the strongest proof points.",
        "The experience did not clearly match the expectations set by ad creative, which increased friction before checkout.",
      ],
    },
    constraints: [
      "Client, campaign names, and creative assets had to remain anonymized.",
      "The experiment had to run inside an existing paid media setup with fixed daily budgets and no major engineering buildout.",
      "Changes needed to isolate message hierarchy and page structure without introducing unrelated variables.",
    ],
    methodology: {
      name: "Experimentation Sprint",
      steps: [
        {
          step: 1,
          label: "Audit the control",
          description: "Reviewed campaign performance, landing-page hierarchy, and the control variant to identify where users were losing momentum before purchase.",
        },
        {
          step: 2,
          label: "Frame test hypotheses",
          description: "Defined clear hypotheses around clearer offer framing, stronger social context, and tighter information hierarchy.",
        },
        {
          step: 3,
          label: "Design competing variants",
          description: "Created multiple landing-page directions so the team could compare message framing and layout patterns under the same budget conditions.",
        },
        {
          step: 4,
          label: "Measure and scale",
          description: "Compared purchases, conversion rate, and cost efficiency, then used the winning variant to guide scale recommendations.",
        },
      ],
    },
    design_strategy: [
      "Simplify the landing-page hierarchy so the offer, value proposition, and next step are visible earlier and with less cognitive load.",
      "Align landing-page messaging more closely to ad intent so users arrive with a clearer expectation of what they will get.",
      "Design each variant around a distinct narrative angle, then validate performance with campaign data instead of relying on preference alone.",
    ],
    reflections: [
      {
        title: "Performance data should shape design decisions.",
        body: "This project reinforced that landing-page design improves fastest when UX decisions are tied directly to measurable campaign outcomes, not just aesthetics or stakeholder preference.",
      },
      {
        title: "Message clarity can outperform visual complexity.",
        body: "The strongest result came from a clearer community-led framing and tighter hierarchy rather than from adding more content or interaction.",
      },
      {
        title: "Experiments need deliberate constraints.",
        body: "Keeping the variants focused made it easier to learn which changes truly mattered and gave the team a stronger basis for future scaling decisions.",
      },
    ],
    nda_notice: "Client details, campaign names, and creative assets are anonymized due to confidentiality.",
    password: LOCKED_NAYYA_PLACEHOLDER_PASSWORD,
    external_link: null,
    content_blocks: [
      {
        id: "overview",
        type: "overview",
        title: "Overview",
        body: "I partnered with a confidential education brand to improve the performance of paid acquisition landing pages tied to course purchases. The team had a control campaign already in market, but it was expensive to scale and not converting efficiently enough to support broader growth goals.\n\nI redesigned the landing-page experience, helped structure two competing variants, and used campaign performance data to compare outcomes. The winning direction increased purchases by 150%, raised conversion rate to 25.0%, and reduced cost per purchase from $4.20 to $0.85.",
      },
      {
        id: "situation",
        type: "custom",
        title: "Situation",
        body: "The original campaign was generating purchases, but it relied on a landing page that underperformed relative to budget. The team needed a faster way to learn which structure and message framing could improve outcomes without rebuilding the broader acquisition funnel.",
      },
      {
        id: "task",
        type: "custom",
        title: "Task",
        body: "My role was to rethink the landing-page experience, create testable design directions, and help the team evaluate performance through a clear UX and experimentation lens. The goal was not simply to refresh the page visually, but to improve purchase efficiency in a measurable way.",
      },
      {
        id: "actions",
        type: "custom",
        title: "Actions",
        body: "I audited the control variant, mapped where the page was losing momentum, and designed two new landing-page directions that emphasized different narrative strategies. One variant focused on a meetup-style introduction, while the winning version leaned into a stronger community signal and clearer path to the offer.\n\nThe design work focused on hierarchy, message sequencing, CTA clarity, and better alignment between ad intent and landing-page content. I then reviewed results alongside the team to identify which variant created the strongest return.",
      },
      {
        id: "research",
        type: "custom",
        title: "Research",
        body: "The experiment surfaced a clear relationship between message framing and conversion efficiency.",
        payload: {
          items: [
            "The control campaign produced 2,847 purchases at a 6.0% conversion rate and a cost per purchase of $4.20.",
            "Variant A improved performance to 4,920 purchases, a 17.30% conversion rate, and a $1.74 cost per purchase.",
            "Variant B outperformed both with 7,118 purchases, a 25.0% conversion rate, and a $0.85 cost per purchase.",
            "The stronger community-led framing and tighter page hierarchy appear to have reduced hesitation and improved purchase intent.",
          ],
        },
      },
      {
        id: "impact",
        type: "results",
        title: "Impact",
        payload: {
          rows: [
            {
              metric: "Purchases",
              value: "7,118",
              context: "Winning variant delivered 150% more purchases than the original control.",
            },
            {
              metric: "Conversion rate",
              value: "25.0%",
              context: "Up from 6.0% on the control and 17.30% on the first test variant.",
            },
            {
              metric: "Cost per purchase",
              value: "$0.85",
              context: "Down from $4.20 on the control, making the campaign significantly more efficient to scale.",
            },
          ],
          insights: [
            "Best-performing direction paired a clearer narrative with stronger social proof and a more focused page structure.",
            "The gap between Variant A and Variant B showed that message framing mattered as much as page polish.",
            "Performance gains created a stronger business case for scaling spend behind the winning direction.",
          ],
          opportunities: [
            "Carry the winning hierarchy into adjacent acquisition campaigns and retest with new audience segments.",
            "Use the same experimentation framework to compare checkout friction, proof placement, and offer packaging.",
          ],
          successMetrics: [
            "Increase total purchases without increasing daily budget.",
            "Improve conversion rate versus the original control.",
            "Lower cost per purchase to support more efficient campaign scaling.",
          ],
        },
      },
    ],
  };
}

export function buildLockedNayyaPlaceholder(source: CaseStudyRecord | null, order: number): CaseStudyRecord {
  if (!source) {
    return createLockedPlaceholder(order);
  }

  return {
    ...createLockedPlaceholder(order),
    status: source.status,
  };
}

export function appendLockedNayyaPlaceholder(studies: CaseStudyRecord[]) {
  if (studies.some((study) => study.slug === LOCKED_NAYYA_PLACEHOLDER_SLUG)) {
    return [...studies].sort((left, right) => left.order - right.order);
  }

  const sourceStudy = studies.find((study) => study.slug === LOCKED_NAYYA_SOURCE_SLUG) ?? null;
  const nextOrder = studies.reduce((maxOrder, study) => Math.max(maxOrder, study.order), 0) + 1;

  return [...studies, buildLockedNayyaPlaceholder(sourceStudy, nextOrder)].sort(
    (left, right) => left.order - right.order,
  );
}

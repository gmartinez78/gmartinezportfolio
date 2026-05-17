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
    title: "Paid Traffic Funnel Redesign",
    company: "Zapiano",
    client_context: "activ music GmbH, Switzerland | online piano course platform for adults",
    role: "Sr. Product Designer",
    year: 2025,
    duration: "2-3 weeks, April-May 2025",
    industry: "Education / Performance Marketing",
    tagline: "Paid landing conversion lifted from 6% to 25% while cost per acquisition dropped from $4.20 to $0.85, without increasing ad spend.",
    tags: ["Growth", "Paid Acquisition", "Experimentation", "Landing Pages"],
    filters: ["Product Design"],
    tools: ["Figma", "ClickUp", "Microsoft Copilot", "Google Analytics", "Meta Ads Manager"],
    images: {
      cover: LOCKED_NAYYA_PLACEHOLDER_MEDIA,
      hero: LOCKED_NAYYA_PLACEHOLDER_MEDIA,
      gallery: [],
    },
    client_logos: [],
    metrics: [
      {
        value: "6% -> 25%",
        label: "Paid landing conversion",
        context: "+19 percentage points, or 4.2x versus the original control.",
      },
      {
        value: "$4.20 -> $0.85",
        label: "Cost per acquisition",
        context: "An 80% reduction on the winning variant.",
      },
      {
        value: "4.9x",
        label: "More purchases",
        context: "Modeled spend efficiency improvement at the same ad budget.",
      },
    ],
    team: ["1 PM", "1 Developer", "1 Marketing analyst (data)", "Me (design + research + strategy)"],
    my_role: ["Sr. Product Designer (solo)", "Research", "Strategy", "Landing page design"],
    problem: {
      admin_pain_points: [
        "Meta campaigns were generating healthy reach, but paid landing conversion was stuck at 6% and the team was losing most visitors before any conversion event.",
        "The existing Club-tier offer forced cold visitors to process three high-commitment subscription options before they understood whether the product was right for them.",
      ],
      user_pain_points: [
        "Cold visitors hit the highest-priced tier within the first scroll, creating friction before trust or relevance had been established.",
        "Beginners and adult returners were treated as the same audience, even though they arrived with different motivations and needed different cues.",
      ],
    },
    constraints: [],
    methodology: {
      name: "Paid Funnel Redesign Sprint",
      steps: [
        {
          step: 1,
          label: "Audit the funnel",
          description: "Used Copilot with Meta and Google Analytics data to identify where cold paid visitors dropped off and what the page was answering too early.",
        },
        {
          step: 2,
          label: "Benchmark the category",
          description: "Compared direct competitors against seven conversion heuristics to identify the structural gaps blocking Zapiano's entry conversion.",
        },
        {
          step: 3,
          label: "Reframe the offer",
          description: "Recommended replacing Club tiers as the cold-traffic entry point with a EUR9 introduction course and a clearer upsell path to PianoStarter.",
        },
        {
          step: 4,
          label: "Design, test, and learn",
          description: "Built modular Kajabi-friendly sections, tested two social-proof variants, and used Copilot to synthesize the winning behavior patterns.",
        },
      ],
    },
    design_strategy: [
      "Reduce the cognitive cost of the first yes by leading with a single low-friction paid entry instead of multiple long-term commitments.",
      "Make founder credibility, beginner-vs-returner relevance, and community proof visible early enough to help cold traffic orient before price friction hits.",
      "Design the page as a modular no-code system Marketing could keep testing inside Kajabi without needing engineering for every iteration.",
    ],
    reflections: [
      {
        title: "The bottleneck was the offer, not the UI.",
        body: "The biggest lift came from changing what we asked visitors to decide, not from changing how the page looked. The Club tiers were a funnel strategy problem disguised as a layout problem.",
      },
      {
        title: "Cold traffic needs a low-cognitive first step.",
        body: "On cold paid visits, the first job of the landing page is to lower the mental cost of saying yes. A EUR9 intro offer did that far better than a multi-tier subscription choice.",
      },
      {
        title: "Proof type matters as much as proof volume.",
        body: "Variant B won because mobile app screenshots made the product tangible for digital-native visitors. Authenticity alone was not enough if the proof implied too much commitment too early.",
      },
    ],
    nda_notice: "Some supporting visuals and data views are adapted for portfolio use, but the funnel strategy, benchmark, and performance outcomes reflect the project.",
    password: LOCKED_NAYYA_PLACEHOLDER_PASSWORD,
    external_link: null,
    content_blocks: [
      {
        id: "overview",
        type: "overview",
        title: "Overview",
        body: "",
      },
      {
        id: "situation",
        type: "custom",
        title: "Situation",
        body: "Zapiano is a Swiss online piano course platform founded by Sven Haefliger, a piano teacher with 25+ years of experience. The product is built for adult beginners and returners who want depth and structure rather than the gamified, song-by-song experience many competitors offer.\n\nThe paid acquisition engine was working at the top of the funnel. Meta campaigns drove healthy reach, but paid landing conversion was stuck at 6%, and the majority of visitors dropped before any conversion event.\n\nThe existing page led with the full Zapiano Club offer: three subscription tiers presented side by side, dense feature blocks, and three competing CTAs. Cold visitors were seeing the highest-priced tier within the first scroll and bouncing.",
      },
      {
        id: "task",
        type: "custom",
        title: "Task",
        body: "Lift paid landing conversion and reduce CAC while working within two constraints: the site had to stay modular inside Kajabi, and the same page needed to serve both complete beginners and adults returning to piano after years away.\n\nThe brief from Marketing was simple: more conversions, lower cost per acquisition, same ad spend.",
      },
      {
        id: "actions",
        type: "custom",
        title: "Actions",
        body: "I started by auditing the funnel with Microsoft Copilot, pulling together Meta campaign data and Google Analytics flow reports to locate the main drop-off. The pattern was clear: visitors scrolled past the hero, hit the multi-year Club pricing within seconds, and exited. The page was answering the wrong question first.\n\nNext, I ran a competitive benchmark, then reframed the offer architecture itself. I recommended removing the Club tiers as the cold-traffic entry point, leading instead with the EUR9 introduction course, and reserving PianoStarter at EUR29 per month as the recurring upsell after the intro.\n\nFrom there, I redesigned the landing around the new offer: Sven leads the hero, beginner-vs-returner segmentation appears in the copy, one clear CTA drives the EUR9 purchase, the email gate moves below proof, and community credibility shows up within the fold.\n\nI also built the page as a modular Figma system for Kajabi, then tested two social-proof directions: Variant A used annual meetup imagery, and Variant B used digital community signals like mobile app screenshots and member-feed views. Copilot helped synthesize the behavior patterns behind the winning result.",
      },
      {
        id: "research",
        type: "custom",
        title: "Research",
        body: "The audit and experiment made the structural gaps visible before design execution started.",
        payload: {
          items: [
            "Pianote, the closest gold-standard comparable, scored 7 out of 7 on the benchmark while Zapiano scored 0 strong out of 7.",
            "Four critical gaps stood out: no low-friction entry offer, no beginner-vs-returner path, no founder visibility, and no sticky CTA.",
            "Variant A used physical community proof from member meetups in Switzerland and Germany; Variant B used digital community proof through app and feed screenshots.",
            "Variant B won because the product became more tangible to cold, mobile-first visitors without implying an in-person commitment too early.",
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
              metric: "Purchase rate",
              value: "25.0%",
              context: "Up from 6.0% on the original landing page, a +19 percentage point lift and 4.2x improvement.",
            },
            {
              metric: "Cost per acquisition",
              value: "$0.85",
              context: "Down from $4.20, an 80% reduction on the winning variant.",
            },
            {
              metric: "Modeled revenue",
              value: "~EUR198K",
              context: "Approximate incremental top-of-funnel revenue from the added intro-course purchases at EUR9 each.",
            },
          ],
          insights: [
            "The winning page combined a lower-friction offer with a clearer founder-led narrative and stronger digital community proof.",
            "The lift did not come from visual polish alone; it came from reordering the decision the page asked users to make.",
            "At the same ad spend, the redesigned funnel modeled roughly 4.9x more purchases with materially lower acquisition cost.",
          ],
          opportunities: [
            "Personalize hero copy to match beginner versus returner ad creative for stronger scent matching between Meta and landing.",
            "Test a short qualifier quiz before paywall to improve intro-to-subscription conversion after the first purchase.",
            "Use AI-generated headline variants to scale future landing-page tests more quickly.",
          ],
          successMetrics: [
            "Increase paid landing conversion without increasing ad spend.",
            "Reduce CAC enough to make scale more efficient.",
            "Create a modular Kajabi page structure Marketing can keep testing post-launch.",
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

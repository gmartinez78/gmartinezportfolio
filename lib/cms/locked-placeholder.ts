import type { CaseStudyRecord } from "@/lib/cms/types";

export const LOCKED_NAYYA_PLACEHOLDER_SLUG = "zapiano-marketing";

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
    client_context: "Zapiano",
    role: "Sr. Product Designer",
    year: 2025,
    duration: "2 to 3 months",
    industry: "Education / Performance Marketing",
    tagline: "Paid landing conversion lifted 6% to 25%. Winning-variant acquisition cost dropped from $4.20 to $0.85.",
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
        value: "+19%",
        label: "Paid landing conversion",
        context: "",
      },
      {
        value: "80%",
        label: "reduction on the winning variant.",
        context: "",
      },
      {
        value: "7,118",
        label: "Purchases on winning variant",
        context: "",
      },
    ],
    team: ["Product Manager", "Developer", "Marketing analyst (data)", "Product designer"],
    my_role: ["Sr. Product Designer", "Design", "Research", "Strategy"],
    problem: {
      admin_pain_points: [
        "Zapiano is a Swiss online piano course platform for adults, founded by piano teacher Sven Haefliger. Meta campaigns were driving healthy reach (1.04M reach, 2.85M impressions), but paid landing conversion was stuck at 6% and most visitors bounced before any conversion event.",
        "The existing page led with three Club subscription tiers side-by-side, dense feature blocks, and three competing CTAs. Cold traffic hit the highest-priced tier within the first scroll and left.",
      ],
      user_pain_points: [
        "Cold paid visitors hit the highest-priced tier within the first scroll, creating friction before trust or relevance had been established.",
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
          description: "Mapped Meta campaign data against Google Analytics flow reports to locate the drop-off. The pattern was clear: visitors scrolled past the hero, hit the EUR5220 Gold tier within seconds, and exited. The page was answering the wrong question first: is this about years of cost, or whether this is for me and how I start?",
        },
        {
          step: 2,
          label: "Benchmark the category",
          description: "",
        },
        {
          step: 3,
          label: "Reframe the landing",
          description: "The Club tiers were the real conversion blocker, so I recommended killing them as the cold-traffic entry, leading with the €9 Introduction Course, and upselling to PianoStarter at €29/month after the intro.\n\nUsers did not need three options to compare, they needed one clear next thing to do. The team approved the change, and I redesigned the landing around the new entry:\n\n- beginner vs returner segmentation\n- one primary CTA for the €9 intro\n- email gate below social proof\n- community credibility in the fold instead of three competing pricing blocks",
        },
        {
          step: 4,
          label: "Build modular components",
          description: "The redesign combined a funnel audit, competitor benchmark, offer reframe, modular landing-page redesign, and post-launch testing. Reduce the cognitive cost of the first yes by leading with a single low-friction paid entry instead of multiple long-term commitments.\n\nMake founder credibility, beginner-vs-returner relevance, and community proof visible early enough to help cold traffic orient before price friction hits. Design the page as a modular no-code system Marketing could keep testing inside Kajabi without needing engineering for every iteration.",
        },
        {
          step: 5,
          label: "A/B test social proof",
          description: "Variant A used physical community proof through annual Zapiano member meetup photos in Switzerland and Germany. Variant B used digital community proof through mobile app screenshots, member feed views, and in-product social proof.",
        },
      ],
    },
    design_strategy: [],
    reflections: [
      {
        title: "The bottleneck was the offer, not the UI.",
        body: "The Club tier setup was not a UI problem. It was an offer problem dressed up as a layout problem. The biggest conversion lift came from changing what visitors were being asked to decide.",
      },
      {
        title: "Cold traffic needs a low-cognitive first step.",
        body: "On cold paid traffic, the landing page's first job is not to sell everything. It is to lower the cognitive cost of saying yes. The EUR9 intro offer did that far better than a multi-tier subscription choice.",
      },
      {
        title: "Proof type matters as much as proof volume.",
        body: "Variant B won because the mobile app screenshots gave cold visitors a tangible preview of what they were buying. The meetup photos in Variant A were warmer, but they implied a commitment visitors were not ready to make yet.",
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
        body: "Zapiano is a Swiss online piano course platform for adults, founded by piano teacher Sven Haefliger. Meta campaigns were driving healthy reach (1.04M reach, 2.85M impressions), but paid landing conversion was stuck at 6% and most visitors bounced before any conversion event.\n\nThe existing page led with three Club subscription tiers side-by-side, dense feature blocks, and three competing CTAs. Cold traffic hit the highest-priced tier within the first scroll and left.",
      },
      {
        id: "task",
        type: "custom",
        title: "Task",
        body: "Lift paid landing conversion and reduce CAC while working within two real constraints.\n\nThe site runs on Kajabi, so any redesign had to be modular and assemblable from existing content blocks. No custom engineering per variant.\n\nThe page had to serve two distinct user types Marketing identified in the ad funnel: complete beginners and adults returning to piano after years away. Same product, different motivations, same landing page.\n\nThe goal Marketing handed me was simple: more conversions, lower cost per acquisition, same ad spend.",
      },
      {
        id: "actions",
        type: "custom",
        title: "Actions",
        body: "",
      },
      {
        id: "impact",
        type: "results",
        title: "Impact",
        payload: {
          rows: [
            {
              metric: "Amount Spent",
              value: "$6,050.30",
              context: "Direct dashboard spend for the winning variant, aligned with the CPA and purchase figures shown in this case study.",
            },
            {
              metric: "Return on Ad Spend (ROAS)",
              value: "~5.0x",
              context: "Modeled from total recorded purchases at a €9 intro-course price point: ~€133,965 revenue against $26,568.50 spend.",
            },
            {
              metric: "Cost per Acquisition (CPA)",
              value: "$0.85",
              context: "Direct dashboard value for the winning variant, down from $4.20 on the original control.",
            },
            {
              metric: "Cost per Click (CPC)",
              value: "~$0.25",
              context: "Modeled blended estimate across the three campaign variants using implied clicks from purchase volume and landing conversion rates; included as directional, not as a direct platform CPC.",
            },
            {
              metric: "Cost per Result (CPR)",
              value: "$1.79",
              context: "Average cost per result across all three campaigns in the dashboard snapshot.",
            },
            {
              metric: "Reach",
              value: "1.04M",
              context: "Total recorded reach across the three campaign variants in the dashboard snapshot.",
            },
          ],
          insights: [
            "Variant B won decisively because mobile app screenshots gave cold visitors a tangible preview of what they were buying.",
            "The meetup photos in Variant A were warmer and more authentic, but they implicitly required showing up in person, a commitment cold visitors were not ready to make.",
            "The lift did not come from visual polish alone. It came from reordering the decision the page asked users to make.",
          ],
          opportunities: [
            "Personalized hero copy based on ad creative so beginner ads route to a beginner hero and returner ads route to a returner hero.",
            "A pre-paywall qualifier quiz with 3-4 questions on goals and level to lift intro-to-subscription conversion further down the funnel.",
            "AI-generated copy variants for headline A/B testing at scale.",
          ],
          projected: [
            "Conservative 1-month scenario: with a 5,500 to 6,000 media budget and using the blended dashboard CPR of $1.79 rather than the winning-variant low of $0.85, the campaign would project roughly 3,070 to 3,350 intro-course purchases.",
            "At a €9 entry ticket, that implies about €27.6K to €30.2K in top-of-funnel revenue before any PianoStarter upsell or downstream LTV is counted.",
            "Using the preserved dashboard delivery ratios as a baseline, that same budget range would conservatively translate to roughly 215K to 235K people reached and about 590K to 645K impressions over one month.",
            "Primary markets worked in this setup: Germany, Switzerland, Sweden, and the Netherlands.",
            "Recommended targeting mix for a conservative next-month run: broad Advantage+ / algorithmic cold audiences for scale, piano-learning and adult-beginner interest clusters for control, plus warm retargeting from site visitors or CRM / first-party lists when available.",
            "Estimated audience size by targeting type: broad Advantage+ cold audiences in these four markets can usually support a combined reachable pool in the low millions, interest-based pools are typically narrower but still large enough for monthly testing, and first-party / retargeting pools depend on site traffic and database volume.",
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

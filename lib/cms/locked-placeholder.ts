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
    client_context: "Zapiano",
    role: "Sr. Product Designer",
    year: 2025,
    duration: "2-3 weeks",
    industry: "Education / Performance Marketing",
    tagline: "Paid landing conversion lifted 6% to 25%. Cost per acquisition dropped from $4.20 to $0.85.",
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
        value: "4.9x",
        label: "More purchases",
        context: "",
      },
    ],
    team: ["Product Manager", "Developer", "Marketing analyst (data)", "Product designer"],
    my_role: ["Sr. Product Designer", "Design", "Research", "Strategy"],
    problem: {
      admin_pain_points: [
        "Zapiano is a Swiss online piano course platform for adults, founded by piano teacher Sven Haefliger. Meta campaigns were driving healthy reach (1.77M people, 5.84M impressions), but paid landing conversion was stuck at 6% and most visitors bounced before any conversion event.",
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
          description: "Compared five direct competitors against seven conversion-driving dimensions that matter for cold paid traffic in the adult piano learning category. Pianote, the closest gold-standard comparable, scored 7 of 7 while Zapiano scored 0 strong out of 7.",
        },
        {
          step: 3,
          label: "Reframe the offer",
          description: "This is where the redesign stopped being a landing page exercise and became a funnel strategy recommendation. I proposed killing the Club tiers as the paid entry point, moving them deeper in the funnel for warm and returning users, leading with the EUR9 Introduction Course as the cold-traffic entry, and upselling to PianoStarter at EUR29/month after the intro. The reasoning I brought to the PM and Marketing was straightforward: users did not need three options to compare, they needed one clear next thing to do. Daily piano practice is a habit, and the offer architecture should mirror that.",
        },
        {
          step: 4,
          label: "Redesign the landing",
          description: "Sven leads the hero, beginner-vs-returner segmentation is woven into the copy, one primary CTA focuses on the EUR9 intro purchase, the email gate moves below social proof, and community credibility shows up in the fold instead of three competing pricing blocks.",
        },
        {
          step: 5,
          label: "Build modular components",
          description: "Designed each section as a swappable unit so Marketing could keep testing post-launch without needing engineering for every iteration.",
        },
        {
          step: 6,
          label: "A/B test social proof",
          description: "Variant A used physical community proof through annual Zapiano member meetup photos in Switzerland and Germany. Variant B used digital community proof through mobile app screenshots, member feed views, and in-product social proof.",
        },
        {
          step: 7,
          label: "Synthesize with Copilot",
          description: "Once both variants had statistically meaningful data, I used Copilot to compare scroll depth, time-to-CTA, and segment behavior across variants. It compressed the slowest part of the testing cycle, synthesis, without replacing the design judgment that came before it.",
        },
      ],
    },
    design_strategy: [
      "The redesign combined a funnel audit, competitor benchmark, offer reframe, modular landing-page redesign, and post-launch testing. Reduce the cognitive cost of the first yes by leading with a single low-friction paid entry instead of multiple long-term commitments.",
      "Make founder credibility, beginner-vs-returner relevance, and community proof visible early enough to help cold traffic orient before price friction hits.",
      "Design the page as a modular no-code system Marketing could keep testing inside Kajabi without needing engineering for every iteration.",
    ],
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
        body: "Zapiano is a Swiss online piano course platform for adults, founded by piano teacher Sven Haefliger. Meta campaigns were driving healthy reach (1.77M people, 5.84M impressions), but paid landing conversion was stuck at 6% and most visitors bounced before any conversion event.\n\nThe existing page led with three Club subscription tiers side-by-side, dense feature blocks, and three competing CTAs. Cold traffic hit the highest-priced tier within the first scroll and left.",
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
        id: "research",
        type: "custom",
        title: "Research",
        body: "The audit and experiment made the structural gaps visible before design execution started.",
        payload: {
          items: [
            "Pianote, the closest gold-standard comparable, scored 7 out of 7 on the benchmark while Zapiano scored 0 strong out of 7.",
            "Four critical gaps stood out: no low-friction entry offer, no beginner-vs-returner path, no pricing clarity, and no sticky CTA.",
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
              context: "Modeled against campaign reach, the redesign translated to roughly 22,000 incremental intro course purchases with no increase in ad spend, with strong downstream LTV implications once PianoStarter upsell is factored in.",
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

insert into public.case_studies (
  slug,
  status,
  featured,
  "order",
  title,
  company,
  client_context,
  role,
  year,
  duration,
  industry,
  tagline,
  tags,
  filters,
  tools,
  images,
  client_logos,
  metrics,
  team,
  my_role,
  problem,
  constraints,
  methodology,
  design_strategy,
  reflections,
  content_blocks,
  nda_notice,
  password,
  external_link
)
values (
  'zapiano-marketing',
  'published',
  false,
  5,
  'Paid Traffic Funnel Redesign',
  'Zapiano',
  'Zapiano',
  'Sr. Product Designer',
  2025,
  '2 to 3 months',
  'Education / Performance Marketing',
  'Across three campaign variants, the funnel generated 1.04M reach, 14,885 purchases, and a blended $1.79 cost per result on $26.6K spend.',
  array['Growth','Paid Acquisition','Experimentation','Landing Pages'],
  array['Product Design'],
  array['Figma','ClickUp','Microsoft Copilot','Google Analytics','Meta Ads Manager'],
  '{"cover":"/images/projects/zapiano/thumbnails/zapiano-thumbnail.png","hero":"/images/projects/zapiano/thumbnails/zapiano-thumbnail.png","gallery":[]}'::jsonb,
  '[]'::jsonb,
  '[
    {"value":"1.04M","label":"Reach across all campaign variants","context":""},
    {"value":"14,885","label":"Purchases recorded across the test snapshot","context":""},
    {"value":"$1.79","label":"Blended cost per result","context":""}
  ]'::jsonb,
  array['Product Manager','Developer','Marketing analyst (data)','Product designer'],
  array['Sr. Product Designer','Design','Research','Strategy'],
  '{
    "admin_pain_points":[
      "Zapiano is a Swiss online piano course platform for adults, founded by piano teacher Sven Haefliger. Meta campaigns were driving healthy reach (1.04M reach, 2.85M impressions), but paid landing conversion was stuck at 6% and most visitors bounced before any conversion event.",
      "The existing page led with three Club subscription tiers side-by-side, dense feature blocks, and three competing CTAs. Cold traffic hit the highest-priced tier within the first scroll and left."
    ],
    "user_pain_points":[
      "Cold paid visitors hit the highest-priced tier within the first scroll, creating friction before trust or relevance had been established.",
      "Beginners and adult returners were treated as the same audience, even though they arrived with different motivations and needed different cues."
    ]
  }'::jsonb,
  array[]::text[],
  '{
    "name":"Paid Funnel Redesign Sprint",
    "steps":[
      {
        "step":1,
        "label":"Audit the funnel",
        "description":"Mapped Meta campaign data against Google Analytics flow reports to locate the drop-off. The pattern was clear: visitors scrolled past the hero, hit the EUR5220 Gold tier within seconds, and exited. The page was answering the wrong question first: is this about years of cost, or whether this is for me and how I start?"
      },
      {
        "step":2,
        "label":"Benchmark the category",
        "description":""
      },
      {
        "step":3,
        "label":"Reframe the landing",
        "description":"The Club tiers were the real conversion blocker, so I recommended killing them as the cold-traffic entry, leading with the €9 Introduction Course, and upselling to PianoStarter at €29/month after the intro.\n\nUsers did not need three options to compare, they needed one clear next thing to do. The team approved the change, and I redesigned the landing around the new entry:\n\n- beginner vs returner segmentation\n- one primary CTA for the €9 intro\n- email gate below social proof\n- community credibility in the fold instead of three competing pricing blocks"
      },
      {
        "step":4,
        "label":"Build modular components",
        "description":"The redesign combined a funnel audit, competitor benchmark, offer reframe, modular landing-page redesign, and post-launch testing. Reduce the cognitive cost of the first yes by leading with a single low-friction paid entry instead of multiple long-term commitments.\n\nMake founder credibility, beginner-vs-returner relevance, and community proof visible early enough to help cold traffic orient before price friction hits. Design the page as a modular no-code system Marketing could keep testing inside Kajabi without needing engineering for every iteration."
      },
      {
        "step":5,
        "label":"A/B test social proof",
        "description":"Variant A used physical community proof through annual Zapiano member meetup photos in Switzerland and Germany. Variant B used digital community proof through mobile app screenshots, member feed views, and in-product social proof."
      }
    ]
  }'::jsonb,
  array[]::text[],
  '[
    {
      "title":"The bottleneck was the offer, not the UI.",
      "body":"The Club tier setup was not a UI problem. It was an offer problem dressed up as a layout problem. The biggest conversion lift came from changing what visitors were being asked to decide."
    },
    {
      "title":"Cold traffic needs a low-cognitive first step.",
      "body":"On cold paid traffic, the landing page''s first job is not to sell everything. It is to lower the cognitive cost of saying yes. The EUR9 intro offer did that far better than a multi-tier subscription choice."
    },
    {
      "title":"Proof type matters as much as proof volume.",
      "body":"Variant B won because the mobile app screenshots gave cold visitors a tangible preview of what they were buying. The meetup photos in Variant A were warmer, but they implied a commitment visitors were not ready to make yet."
    }
  ]'::jsonb,
  '[
    {"id":"overview","type":"overview","title":"Overview","body":""},
    {
      "id":"situation",
      "type":"custom",
      "title":"Situation",
      "body":"Zapiano is a Swiss online piano course platform for adults, founded by piano teacher Sven Haefliger. Meta campaigns were driving healthy reach (1.04M reach, 2.85M impressions), but paid landing conversion was stuck at 6% and most visitors bounced before any conversion event.\n\nThe existing page led with three Club subscription tiers side-by-side, dense feature blocks, and three competing CTAs. Cold traffic hit the highest-priced tier within the first scroll and left."
    },
    {
      "id":"task",
      "type":"custom",
      "title":"Task",
      "body":"Lift paid landing conversion and reduce CAC while working within two real constraints.\n\nThe site runs on Kajabi, so any redesign had to be modular and assemblable from existing content blocks. No custom engineering per variant.\n\nThe page had to serve two distinct user types Marketing identified in the ad funnel: complete beginners and adults returning to piano after years away. Same product, different motivations, same landing page.\n\nThe goal Marketing handed me was simple: more conversions, lower cost per acquisition, same ad spend."
    },
    {"id":"actions","type":"custom","title":"Actions","body":""},
    {
      "id":"impact",
      "type":"results",
      "title":"Impact",
      "payload":{
        "rows":[
          {"metric":"Amount Spent","value":"$26,568.50","context":"Total spend across the three campaign variants shown in the preserved Meta dashboard."},
          {"metric":"Return on Ad Spend (ROAS)","value":"~5.0x","context":"Modeled from total recorded purchases at a €9 intro-course price point: ~€133,965 revenue against $26,568.50 spend."},
          {"metric":"Purchases","value":"14,885","context":"Total purchases recorded across the three campaign variants in the dashboard snapshot."},
          {"metric":"Cost per Click (CPC)","value":"~$0.25","context":"Modeled blended estimate across the three campaign variants using implied clicks from purchase volume and landing conversion rates."},
          {"metric":"Cost per Result (CPR)","value":"$1.79","context":"Average cost per result across all three campaigns in the dashboard snapshot."},
          {"metric":"Reach","value":"1.04M","context":"Total recorded reach across the three campaign variants in the dashboard snapshot."},
          {"metric":"Impressions","value":"2.85M","context":"Total impressions recorded across the three campaign variants in the dashboard snapshot."}
        ],
        "insights":[
          "Variant B won decisively because mobile app screenshots gave cold visitors a tangible preview of what they were buying.",
          "The meetup photos in Variant A were warmer and more authentic, but they implicitly required showing up in person, a commitment cold visitors were not ready to make.",
          "The lift did not come from visual polish alone. It came from reordering the decision the page asked users to make."
        ],
        "opportunities":[
          "Personalized hero copy based on ad creative so beginner ads route to a beginner hero and returner ads route to a returner hero.",
          "A pre-paywall qualifier quiz with 3-4 questions on goals and level to lift intro-to-subscription conversion further down the funnel.",
          "AI-generated copy variants for headline A/B testing at scale."
        ],
        "projected":[
          "Conservative 1-month scenario: with a 5,500 to 6,000 media budget and using the blended dashboard CPR of $1.79 rather than the winning-variant low of $0.85, the campaign would project roughly 3,070 to 3,350 intro-course purchases.",
          "At a €9 entry ticket, that implies about €27.6K to €30.2K in top-of-funnel revenue before any PianoStarter upsell or downstream LTV is counted.",
          "Using the preserved dashboard delivery ratios as a baseline, that same budget range would conservatively translate to roughly 215K to 235K people reached and about 590K to 645K impressions over one month.",
          "Primary markets worked in this setup: Germany, Switzerland, Sweden, and the Netherlands.",
          "Recommended targeting mix for a conservative next-month run: broad Advantage+ / algorithmic cold audiences for scale, piano-learning and adult-beginner interest clusters for control, plus warm retargeting from site visitors or CRM / first-party lists when available.",
          "Estimated audience size by targeting type: broad Advantage+ cold audiences in these four markets can usually support a combined reachable pool in the low millions, interest-based pools are typically narrower but still large enough for monthly testing, and first-party / retargeting pools depend on site traffic and database volume."
        ],
        "successMetrics":[
          "Increase paid landing conversion without increasing ad spend.",
          "Reduce CAC enough to make scale more efficient.",
          "Create a modular Kajabi page structure Marketing can keep testing post-launch."
        ]
      }
    }
  ]'::jsonb,
  'Some supporting visuals and data views are adapted for portfolio use, but the funnel strategy, benchmark, and performance outcomes reflect the project.',
  null,
  null
)
on conflict (slug) do update
set
  status = excluded.status,
  featured = excluded.featured,
  "order" = excluded."order",
  title = excluded.title,
  company = excluded.company,
  client_context = excluded.client_context,
  role = excluded.role,
  year = excluded.year,
  duration = excluded.duration,
  industry = excluded.industry,
  tagline = excluded.tagline,
  tags = excluded.tags,
  filters = excluded.filters,
  tools = excluded.tools,
  images = excluded.images,
  client_logos = excluded.client_logos,
  metrics = excluded.metrics,
  team = excluded.team,
  my_role = excluded.my_role,
  problem = excluded.problem,
  constraints = excluded.constraints,
  methodology = excluded.methodology,
  design_strategy = excluded.design_strategy,
  reflections = excluded.reflections,
  content_blocks = excluded.content_blocks,
  nda_notice = excluded.nda_notice,
  password = excluded.password,
  external_link = excluded.external_link;

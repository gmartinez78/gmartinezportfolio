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
  'reversetech',
  'published',
  false,
  6,
  'Reverse Health Quiz Funnel Diagnosis',
  'Reverse Health',
  'Paid search acquisition funnel',
  'Sr. Product Designer',
  2026,
  'Strategy and funnel analysis',
  'Health & Fitness / Growth Funnel',
  'A 44-step quiz funnel selling a calisthenics program for women was converting at just 0.63%, and the team needed to determine whether the visible problem, the long middle, was actually the real bottleneck.',
  array['Growth','UX Research','Product Design','Paid Acquisition','Funnel Optimization'],
  array['UX Research','Product Design'],
  array['Figma','Google Ads','Analytics','Miro','Notion'],
  '{"cover":"/images/projects/EB.png","hero":"/images/projects/EB.png","gallery":[]}'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  array['Growth team','Paid acquisition stakeholders','Product designer','Analytics partners'],
  array['Funnel Data Interpretation','UX & Conversion Problem Identification','Paywall Experiment Design','Testable Design Solution Framing'],
  '{
    "admin_pain_points":[
      "The funnel was converting at only 0.63% end to end, creating pressure to optimize quickly without clear evidence about where the real breakdown occurred.",
      "Because the experience contained 44 steps, the team could easily default to the most visible explanation, that the quiz was simply too long, without first proving whether that was the dominant problem."
    ],
    "user_pain_points":[
      "Most visitors were arriving cold from Google Ads, so every step had to justify why they should keep going before enough trust had been built.",
      "The middle of the funnel contained 37+ quiz steps, making it easy to assume the interaction cost itself was pushing users out.",
      "Without a sharper diagnosis, any redesign risked polishing the middle while ignoring weaker parts of the funnel before or after it."
    ]
  }'::jsonb,
  array[]::text[],
  '{
    "name":"Funnel Diagnosis",
    "steps":[
      {
        "step":1,
        "label":"Map",
        "description":"Documented the full funnel from Google ad click through the 44-step quiz to purchase, identifying where the team believed friction was highest."
      },
      {
        "step":2,
        "label":"Question",
        "description":"Challenged the default assumption that the long middle was the primary issue, reframing the problem as a funnel-level diagnosis instead of a step-count complaint."
      },
      {
        "step":3,
        "label":"Break down",
        "description":"Separated the experience into acquisition promise, entry experience, quiz progression, and post-quiz transition so each part could be evaluated on its own terms."
      },
      {
        "step":4,
        "label":"Prioritize",
        "description":"Focused the team on identifying which section of the funnel was truly leaking intent before committing to a redesign direction."
      },
      {
        "step":5,
        "label":"Frame next moves",
        "description":"Defined the core problem statement the next design phase should solve instead of assuming the answer was to shorten the quiz."
      }
    ]
  }'::jsonb,
  array[
    'I chose Enter Email as the focus for the design proposal because it is the second-largest in-funnel drop-off and one of the critical moments to lose users.',
    'By this point, users have invested time in the quiz but still have not seen the product''s value clearly. Because progress is not visible, the funnel can feel longer than necessary, creating fatigue even when each screen is simple. This makes the email request feel abrupt instead of earned.',
    'The issue is a weak value exchange. Users are being asked to give something valuable, their email and attention, before clearly understanding what they receive in return. In the current flow, the step feels more like lead capture than part of the personalized plan experience.',
    'Hypothesis 1',
    'To reduce friction, the pages before email should better prepare users by showing progress, reinforcing why each question matters, and previewing the value of the final plan.',
    'Adding trust signals, visible progress, app previews, and more relevant imagery would also make the ask feel safer and more connected to the product.'
  ],
  '[
    {
      "title":"The obvious problem is not always the real one.",
      "body":"A long quiz is easy to blame because it is visible. That does not automatically make it the highest-leverage place to intervene."
    },
    {
      "title":"Cold traffic changes the standard.",
      "body":"Visitors arriving from Google Ads have not earned much trust yet, so every part of the funnel has to work harder than it would in a warm audience context."
    },
    {
      "title":"Diagnosis is design work.",
      "body":"Before changing layouts or reducing steps, the team needed a sharper understanding of where intent was actually breaking down."
    }
  ]'::jsonb,
  '[
    {"id":"overview","type":"overview","title":"Project Overview","body":""},
    {
      "id":"team-context",
      "type":"custom",
      "title":"Team",
      "body":"I worked across growth and product conversations to help frame the real problem before design effort was spent in the wrong place. The work required alignment between acquisition thinking, funnel behavior, and user experience diagnosis."
    },
    {
      "id":"situation",
      "type":"custom",
      "title":"Situation",
      "body":"Reverse Health was running a 44-step quiz funnel that sold a calisthenics program for women. End to end, the funnel was converting at 0.63%.\n\nTraffic was mostly cold paid search, with a typical visit beginning from a Google ad. Inside the team, the most intuitive explanation was that the long quiz middle, more than 37 steps, had to be where users were dropping."
    },
    {
      "id":"task",
      "type":"custom",
      "title":"Task",
      "body":"The scope of the work centered on funnel diagnosis and design improvements, paywall experiment design, and competitor pattern extraction.\n\nMy role was to interpret funnel data, identify UX and conversion problems, and translate those insights into concrete, testable design solutions inside a performance-driven product environment."
    },
    {
      "id":"task-1",
      "type":"custom",
      "title":"Task 1",
      "body":"Rather than treat every step as equal, I read all 44 and picked 3 to examine, balancing churn, user volume, and downstream influence. Then for each I dug into two questions: why it performs the way it does, and what user behavior, friction, or clarity issue explains the data.",
      "payload":{
        "heading":"Funnel diagnosis & design improvements",
        "table":[
          {
            "step":"31. age",
            "churnCount":"7",
            "churnPercent":"0.13%",
            "userCount":"5,403",
            "remainingPercent":"18.03%",
            "dotColor":"#5ca95c"
          },
          {
            "step":"4. Main goal",
            "churnCount":"224",
            "churnPercent":"3.20%",
            "userCount":"6,784",
            "remainingPercent":"22.64%",
            "dotColor":"#ffd45c"
          },
          {
            "step":"34. enter email",
            "churnCount":"1,156",
            "churnPercent":"21.62%",
            "userCount":"4,190",
            "remainingPercent":"13,99%",
            "dotColor":"#ff2d2d",
            "tag":"Design pick"
          }
        ],
        "analyses":[
          {
            "title":"31. Age Step - Good Performance",
            "body":"A clear, low-effort step. By this point abandoning the flow would feel wasteful, so users push through. The cognitive and emotional load is minimal, there's no financial decision attached, and most people understand that age matters in a health plan.",
            "consideration":"Age is asked twice, on the landing and again at step 31. Testing it on a single step could cut effort and shorten the funnel.",
            "image":"/images/projects/Reversetech/age.png"
          },
          {
            "title":"4. Main goal - Regular Performance",
            "body":"The single-select option keeps it light and avoids decision overload for users. The friction is more subtle: this is the moment the user tells the product what outcome they want, so naming one goal carries emotional weight. A hypothesis, based on research, is that selecting a goal adds emotional weight to this step, and that weight can feel like pressure, especially when the options don't fully align with the user or they haven't decided yet.",
            "consideration":"Test a version with different content options, and add an \"I haven't decided yet\" choice. Also reduce the number of steps before this question, so users reach their goal-setting moment sooner, while intent is still high.",
            "image":"/images/projects/Reversetech/goal.png"
          },
          {
            "title":"34. Enter Email - Bad Performance",
            "body":"This is the second biggest in funnel leak, and it's the worst possible place to lose people. At this point users can't yet see the value of the product, so asking for an email without explaining the benefit can feel like a marketing capture step rather than part of the personalized plan experience.",
            "consideration":"Some users also sense the paywall coming. Handing over an email right before a likely payment ask makes the wall feel closer, so a chunk bail preemptively.",
            "image":"/images/projects/Reversetech/email.png"
          }
        ]
      }
    },
    {
      "id":"cta-variants",
      "type":"custom",
      "title":"CTA Variant",
      "body":"The content on the email step does not feel personalized enough to make users believe a custom result is being built for them. The email page should reconnect them to their goal, preview what they will receive, and use outcome-based copy.",
      "payload":{
        "variants":[
          {
            "label":"Variant 1",
            "title":"CTA Variant 1",
            "body":"Add explanation here.",
            "imageSrc":"/images/projects/Reversetech/cta-variant-1.svg"
          },
          {
            "label":"Variant 2",
            "title":"CTA Variant 2",
            "body":"Add explanation here.",
            "imageSrc":"/images/projects/Reversetech/cta-variant-2.svg"
          },
          {
            "label":"Variant 3",
            "title":"CTA Variant 3",
            "body":"Add explanation here.",
            "imageSrc":"/images/projects/Reversetech/cta-variant-3.svg"
          }
        ]
      }
    },
    {
      "id":"content-variants",
      "type":"custom",
      "title":"Content Variant",
      "body":"",
      "payload":{
        "variants":[
          {
            "label":"Variant 1",
            "title":"Content Variant 1",
            "body":"Add explanation here.",
            "imageSrc":"/images/projects/Reversetech/content-variant-1.svg"
          },
          {
            "label":"Variant 2",
            "title":"Content Variant 2",
            "body":"Add explanation here.",
            "imageSrc":"/images/projects/Reversetech/content-variant-2.svg"
          },
          {
            "label":"Variant 3",
            "title":"Content Variant 3",
            "body":"Add explanation here.",
            "imageSrc":"/images/projects/Reversetech/content-variant-3.svg"
          }
        ]
      }
    },
    {
      "id":"impact",
      "type":"results",
      "title":"Impact",
      "body":"This phase sharpened the problem statement: a long middle may be part of the issue, but it should not be treated as the answer before the full funnel is diagnosed. The immediate value of the work was creating a better frame for what to test and redesign next.",
      "payload":{
        "rows":[],
        "insights":[
          "The quiz middle felt like the problem because it was long and highly visible.",
          "Cold paid search traffic raised the cost of every commitment in the funnel, not just the quiz steps themselves.",
          "The most important outcome of this phase was reframing the work from \"shorten the quiz\" to \"diagnose the real bottleneck first.\""
        ],
        "opportunities":[
          "Compare drop-off and intent quality between the landing entry, the quiz middle, and the post-quiz purchase transition.",
          "Test whether the ad promise and landing expectation are aligned well enough for cold search traffic before asking users to commit to a long flow.",
          "Identify which moments in the quiz earn momentum and which ones merely add interaction cost."
        ]
      }
    },
    {
      "id":"sources",
      "type":"custom",
      "title":"Sources",
      "body":"",
      "payload":{
        "sources":[
          {
            "title":"Nielsen Norman Group — \"Progress Indicators Make a Slow System Less Insufferable\"",
            "url":"https://www.nngroup.com/articles/progress-indicators/",
            "description":"Supports progress feedback reducing uncertainty and keeping users moving. Caveat: this NN/g piece is about system and wait-time progress, not multi-step counters, so it works best paired with the goal-gradient research below for the step-count point specifically."
          },
          {
            "title":"Baymard Institute — \"Checkout Flows Average 5 Steps and 11+ Form Fields\"",
            "url":"https://baymard.com/blog/checkout-flow-average-form-fields",
            "description":"Supports unifying questions over just splitting steps: the number of form fields users must manage matters more to checkout UX than the number of steps, and most flows can drop to 6 to 8 fields."
          },
          {
            "title":"The Manifest — \"6 Steps for Avoiding Online Form Abandonment\"",
            "url":"https://themanifest.com/web-design/6-steps-avoiding-online-form-abandonment",
            "description":"Used for the stat that 27% of users abandon a form because it is too long, and once they abandon, they rarely return. Caveat: this is a 2018 survey of 502 people, so I treat it as dated."
          },
          {
            "title":"Nunes & Drèze (2006), Journal of Consumer Research — \"The Endowed Progress Effect: How Artificial Advancement Increases Effort\"",
            "url":"https://academic.oup.com/jcr/article-abstract/32/4/504/1787425",
            "description":"The exact origin of the term \"endowed progress effect\": people given artificial advancement toward a goal show greater persistence toward reaching it."
          },
          {
            "title":"Kivetz, Urminsky & Zheng (2006), Journal of Marketing Research — \"The Goal-Gradient Hypothesis Resurrected\"",
            "url":"https://journals.sagepub.com/doi/abs/10.1509/jmkr.43.1.39",
            "description":"Supports the claim that people accelerate effort as they get closer to a reward. I use this when I reference the goal-gradient effect.",
            "secondaryTitle":"Columbia Business School summary",
            "secondaryUrl":"https://business.columbia.edu/insights/chazen-global-insights/goal-gradient-hypothesis-resurrected-purchase-acceleration"
          },
          {
            "title":"IBM Carbon Design System — Progress indicator, usage guidelines",
            "url":"https://carbondesignsystem.com/components/progress-indicator/usage/",
            "description":"An authoritative design-system reference for showing users where they are: dividing the end goal into smaller subtasks increases the sense of completeness, and keeping users informed of where they are gives them a sense of control."
          },
          {
            "title":"WebAIM Million 2025 report",
            "url":"https://webaim.org/projects/million/2025",
            "description":"Used for the accessibility angle on the email field: home pages averaged 6.3 form inputs, and 34.2% of those inputs were not properly labeled. Note: the 48% figure floating around secondary sources is the share of homepages with at least one unlabeled input, which is a different metric."
          },
          {
            "title":"HubSpot — \"10 Form Conversion Optimization Tips\"",
            "url":"https://blog.hubspot.com/marketing/optimize-conversion-forms",
            "description":"From HubSpot's analysis of 40,000+ landing pages: buttons labeled \"Submit\" had lower conversion rates, and 3-field forms converted best with a drop-off after that. I use this for the \"outcome copy beats continue\" and \"keep the ask minimal\" points."
          }
        ]
      }
    }
  ]'::jsonb,
  'Some funnel details are summarized for portfolio use, but the structure, traffic context, and conversion problem reflect the real engagement.',
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

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
  '[
    {"value":"44","label":"Total quiz steps","context":"Full end-to-end funnel length from paid click to purchase."},
    {"value":"0.63%","label":"End-to-end conversion","context":"Overall purchase conversion across the full funnel."},
    {"value":"37+","label":"Mid-funnel steps under suspicion","context":"The long quiz middle that appeared to be the likely source of drop-off."}
  ]'::jsonb,
  array['Growth team','Paid acquisition stakeholders','Product designer','Analytics partners'],
  array['Funnel Diagnosis','UX Strategy','Conversion Research','Problem Framing'],
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
  array[
    'Traffic was primarily cold paid search, which meant intent and trust were weaker than in a warm or referral-based funnel.',
    'The quiz felt like the obvious culprit, but that intuition itself was a constraint because it could bias the team toward the wrong intervention.',
    'The work needed to separate what looked painful from what was actually suppressing conversion.'
  ],
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
    'Treat the 44-step flow as a system rather than a single UI problem, because low conversion can come from weak acquisition-to-landing alignment, not just excessive step count.',
    'Resist optimizing the most painful-looking section until the funnel is broken into diagnosable stages with clearer hypotheses.',
    'Use problem framing to protect the team from solving the wrong problem too early.'
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
      "body":"My job was not to immediately shorten screens or redraw the flow. It was to help define the problem correctly.\n\nThe core question was whether the funnel was truly failing because the middle was too long, or whether the visible pain of the quiz was distracting the team from higher-leverage issues elsewhere in the journey."
    },
    {
      "id":"actions",
      "type":"custom",
      "title":"Actions",
      "body":"I framed the funnel as a sequence of separate commitments: the ad promise, the landing entry, the quiz progression, and the post-quiz transition into purchase. That made it possible to evaluate the experience as more than just a long form.\n\nInstead of treating the 37+ step middle as a proven root cause, I positioned it as a hypothesis. The design work at this stage was about creating a clearer diagnostic lens so the next round of decisions would target the actual bottleneck rather than the most obvious-looking friction."
    },
    {
      "id":"impact",
      "type":"results",
      "title":"Impact",
      "body":"This phase sharpened the problem statement: a long middle may be part of the issue, but it should not be treated as the answer before the full funnel is diagnosed. The immediate value of the work was creating a better frame for what to test and redesign next.",
      "payload":{
        "rows":[
          {"metric":"Total funnel length","value":"44 steps"},
          {"metric":"Overall conversion","value":"0.63%"},
          {"metric":"Suspected friction zone","value":"37+ steps"}
        ],
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

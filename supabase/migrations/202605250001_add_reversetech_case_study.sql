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
  'ReverseTech AI Workflow Redesign',
  'ReverseTech',
  'Confidential B2B platform',
  'Sr. Product Designer',
  2026,
  '4 months',
  'AI Operations / Enterprise SaaS',
  'Redesigned a fragmented AI-assisted operations workflow into a guided review experience that helped teams move faster with more confidence.',
  array['AI Product','UX Research','Product Design','Enterprise SaaS','Workflow Design'],
  array['UX Research','Product Design','AI Product'],
  array['Figma','Jira','Miro','Webex','Notion','Copilot'],
  '{"cover":"/images/projects/EB.png","hero":"/images/projects/EB.png","gallery":[]}'::jsonb,
  '[]'::jsonb,
  '[
    {"value":"38%","label":"Faster review completion","context":"Average time to evaluate and approve AI-generated repair recommendations."},
    {"value":"24%","label":"Lower clarification requests","context":"Fewer follow-ups between operations and specialist teams after rollout."},
    {"value":"4.3/5","label":"Operator confidence","context":"Post-pilot satisfaction with the new review and approval flow."}
  ]'::jsonb,
  array['Product Owner','Engineering Lead','2 developers','Data specialist','Operations lead'],
  array['UX Strategy','Workflow Design','User Research','Prototype Validation'],
  '{
    "admin_pain_points":[
      "Operations teams were reviewing AI-generated repair recommendations across disconnected screens with limited context.",
      "Specialists spent too much time answering repeat clarification questions because confidence signals were weak and decision history was hard to read."
    ],
    "user_pain_points":[
      "Operators could see the recommendation, but not enough rationale to understand why the system suggested it.",
      "Key actions were spread across separate views, forcing users to jump between records before they could approve, edit, or escalate a case.",
      "The workflow needed to feel dependable without pretending the AI was always right."
    ]
  }'::jsonb,
  array[
    'The existing platform architecture could not support a full rebuild, so improvements had to fit within the current data model and release timeline.',
    'AI recommendations needed stronger explainability without overwhelming users with technical detail.',
    'The pilot had to prove value quickly with a small operational team before broader rollout.'
  ],
  '{
    "name":"Discovery to Pilot",
    "steps":[
      {
        "step":1,
        "label":"Observe",
        "description":"Mapped current review behavior with operations stakeholders to identify hesitation points, missing context, and handoff failures."
      },
      {
        "step":2,
        "label":"Frame",
        "description":"Defined the minimum information users needed to trust, edit, or reject an AI recommendation without leaving the main task."
      },
      {
        "step":3,
        "label":"Design",
        "description":"Explored guided-review concepts that grouped evidence, system rationale, and next actions into one clear sequence."
      },
      {
        "step":4,
        "label":"Validate",
        "description":"Tested interactive prototypes with operators and refined the flow around confidence, exception handling, and escalation paths."
      },
      {
        "step":5,
        "label":"Pilot",
        "description":"Measured adoption and task efficiency after release with the first operations cohort."
      }
    ]
  }'::jsonb,
  array[
    'Bring the recommendation, supporting evidence, and decision action into one review surface so users do not need to stitch the workflow together themselves.',
    'Use explainability as decision support, not as a technical dump, surfacing only the rationale that helps users act with confidence.',
    'Design clear override and escalation paths so the system feels assistive rather than overly automated.'
  ],
  '[
    {
      "title":"Confidence needed structure.",
      "body":"Users were not rejecting AI because they disliked automation. They were hesitating because the workflow made them reconstruct too much context before they could trust the output."
    },
    {
      "title":"Explainability has to be selective.",
      "body":"Showing every signal would have made the experience heavier. The better move was surfacing only the evidence that supported the next decision."
    },
    {
      "title":"Escalation is part of trust.",
      "body":"AI-assisted workflows feel stronger when people know exactly what happens when they disagree with the system."
    }
  ]'::jsonb,
  '[
    {"id":"overview","type":"overview","title":"Project Overview","body":""},
    {
      "id":"team-context",
      "type":"custom",
      "title":"Team",
      "body":"I partnered with the Product Owner, Engineering Lead, and operations stakeholders to define a review flow that balanced speed, explainability, and real implementation limits. The work also required close coordination with a data specialist to understand what evidence the model could expose reliably in the interface."
    },
    {
      "id":"situation",
      "type":"custom",
      "title":"Situation",
      "body":"ReverseTech was introducing AI-assisted recommendations into an operations workflow where teams still needed to make the final call. The opportunity was strong, but the current experience scattered evidence, history, and next actions across multiple screens.\n\nThat fragmentation slowed reviews and made users second-guess the system even when the recommendation itself was useful."
    },
    {
      "id":"task",
      "type":"custom",
      "title":"Task",
      "body":"My responsibility was to define a clearer review experience that helped users understand what the AI suggested, why it suggested it, and what action they should take next.\n\nThe solution needed to fit the current platform, support exceptions and overrides, and prove value quickly in a pilot setting."
    },
    {
      "id":"actions",
      "type":"custom",
      "title":"Actions",
      "body":"I started by mapping the review workflow with operators and identifying the moments where they paused, switched screens, or asked for specialist help. That gave us a practical definition of what “confidence” actually meant in this product.\n\nFrom there, I designed a guided review surface that grouped recommendation rationale, record evidence, change history, and action controls into a single sequence. We tested prototypes with operators, simplified the evidence hierarchy, and clarified when users should approve, edit, or escalate a case."
    },
    {
      "id":"impact",
      "type":"results",
      "title":"Impact",
      "body":"The pilot showed that a more structured review experience could improve speed without making the AI feel like a black box. Teams moved faster, asked fewer repeat questions, and reported stronger confidence when making final decisions.",
      "payload":{
        "rows":[
          {"metric":"Review completion time","value":"-38%"},
          {"metric":"Clarification requests","value":"-24%"},
          {"metric":"Pilot satisfaction","value":"4.3/5"},
          {"metric":"Escalation accuracy","value":"+17%"}
        ],
        "insights":[
          "Operators no longer needed to open multiple records to understand the recommendation before acting.",
          "Trust improved most when evidence and action were presented together rather than on separate screens.",
          "Override and escalation options reduced resistance by making the AI feel assistive instead of absolute."
        ],
        "opportunities":[
          "Expand confidence signals with richer evidence summaries for higher-risk recommendation types.",
          "Add saved review states for interrupted sessions so operators can resume complex cases without losing context.",
          "Instrument downstream quality metrics to compare accepted AI recommendations with manual decisions over time."
        ]
      }
    }
  ]'::jsonb,
  'Client-specific names, interface details, and supporting visuals are omitted, but the workflow, process, and outcomes shown here reflect the shipped work.',
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

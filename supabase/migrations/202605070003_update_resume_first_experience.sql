update public.site_content
set payload = jsonb_set(
  payload,
  '{resume,experience,0}',
  $json${
    "title": "Sr. Product Designer",
    "company": "ITX Corp",
    "client": "Paychex (Nayya, Flock, E-Verify, Indeed)",
    "period": "Mar. 2021 – Present",
    "location": "Malaga, Spain (Remote)",
    "bullets": [
      "Lead end-to-end design architecture for an enterprise HR SaaS platform with over 2.3 million users by making data-driven design decisions while acting as Staff Designer, aligning cross-functional teams around a unified product vision across multiple high-impact products.",
      "Apply UX fundamentals and accessibility rigor to data visualization in engineering-led environments, elevating usability, clarity, and visual consistency quality.",
      "Use evidence-based methods through heuristic reviews, usability feedback, and heatmaps using Maze, Hotjar, and UserTesting.com, continuously refining experiences based on research to redesign flows and reduce form completion time by 35%.",
      "Define design strategy, vision, and roadmap for several major, ambiguous products using Jira and Confluence.",
      "Take full ownership of design decisions and use Figma to present product enhancements regularly to senior stakeholders with clear rationale, handling feedback constructively and pushing back when needed.",
      "Define reusable UX patterns and components, improving consistency and scalability across multiple large-scale products.",
      "Identify and reduce design debt, consolidating duplicate components and improving system consistency.",
      "Build and implement a scalable React-based design system, defining reusable patterns, components, and documentation to reduce design debt and improve consistency across platforms.",
      "Apply layout, spacing, typography, and color fundamentals within component-based systems to maintain UI craft quality across enterprise-scale products.",
      "Structure information architecture for complex, content-heavy workflows, improving clarity and navigation.",
      "Produce wireframes, design mockups, and interactive prototypes using AI tools including Balsamiq, Figma AI, Copilot, and Framer.",
      "Launch AI-powered features using LLMs to improve user decision-making during enrollment, framing problems effectively by aligning user goals, key tasks, constraints, success criteria, and business goals prior to execution.",
      "Use AI such as Copilot, Lovable, Claude, and ChatGPT throughout the design workflow to synthesize research, generate early concepts, and prototype quickly, enabling the team to validate and refine experiences much faster.",
      "Reduce support tickets by 500+ and support call volume by 9,000+ calls per year through redesigned HR and hiring flows.",
      "Play a key role in exceeding the annual enrollment goal by 5,500 users, simplifying workflows to improve completion rates and user confidence.",
      "Work closely with cross-functional teams including Product, Engineering, Marketing, Finance, Compliance, and Research to align user experience with business and content goals.",
      "Partner with engineering teams in a component-based delivery model, defining states, variants, and responsive behavior to align UX strategy and delivery using Miro and Figma.",
      "Support and mentor junior and senior designers through regular reviews, exchanging feedback, and contributing to overall design quality.",
      "Create design documentation, best practices, and usage guidelines, enabling cross-team adoption of shared patterns."
    ],
    "tags": ["B2C SaaS", "AI Features", "Design Systems", "Research", "React.js"]
  }$json$::jsonb
)
where key = 'site';

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ResumeExperienceCard } from "../../components/resume-experience-card";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Container } from "../../components/ui/container";
import { Heading } from "../../components/ui/heading";
import { resolveToolIcon, usePublicSiteContent } from "../../lib/cms/public";
import { withBasePath } from "../../lib/site";
import { useTranslate } from "../../lib/i18n/use-translate";

type ExperienceBullet =
  | string
  | { segments: { text: string; bold?: boolean }[] }
  | { heading: string; items: string[] };
type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: ExperienceBullet[];
  tags: string[];
};

function ResumeSectionHeading({
  eyebrow,
  title,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  inverse?: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-3">
      <p className={`flex items-center gap-2 text-[13px] font-semibold tracking-normal ${inverse ? "text-white/85" : "text-[var(--ui-color-brand-primary)]"}`}>
        <span aria-hidden="true" className={`size-2 rounded-full ${inverse ? "bg-white" : "bg-[var(--ui-color-brand-primary)]"}`} />
        {eyebrow}
      </p>
      <Heading
        as="h2"
        variant="section"
        className={`text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.055em] ${inverse ? "text-white" : "text-[var(--ui-color-text-editorial)]"}`}
      >
        {title}
      </Heading>
    </div>
  );
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Sr. Product Designer",
    company: "ITX Corp | Paychex",
    period: "Mar. 2021, Present",
    location: "Malaga, Spain (Remote)",
    bullets: [
      {
        segments: [
          { text: "Lead end-to-end design architecture", bold: true },
          { text: " for an enterprise HR SaaS platform with over 2.3 million users, making data-driven decisions across multiple high-impact products. As Staff Designer, align Product, Engineering, Marketing, Finance, Compliance, and Research around a unified product vision, balancing user experience with business and content goals. Partner with engineering on component-based delivery, defining states, variants, and responsive behavior using Miro and Figma." },
        ],
      },
      {
        segments: [
          { text: "Apply " },
          { text: "UX fundamentals and accessibility", bold: true },
          { text: " rigor to data visualization in engineering-led environments, elevating usability, clarity, and visual consistency." },
        ],
      },
      {
        segments: [
          { text: "Use evidence-based methods—" },
          { text: "heuristic reviews, usability feedback,", bold: true },
          { text: " and heatmap signals from Maze, Hotjar, and UserTesting.com—to refine flows and reduce form completion time by 35%. Separately, simplifying enrollment workflows helped exceed the annual goal by 5,500 users while improving completion rates and user confidence." },
        ],
      },
      {
        segments: [
          { text: "Define design strategy, vision, and roadmap for major, ambiguous products", bold: true },
          { text: " using " },
          { text: "Jira and Confluence", bold: true },
          { text: " while owning " },
          { text: "multiple product initiatives", bold: true },
          { text: " simultaneously. Make clear design decisions, present enhancements to senior stakeholders with a clear rationale, incorporate feedback, and push back when needed." },
        ],
      },
      {
        segments: [
          { text: "Build and implement scalable React-based design systems with " },
          { text: "reusable UX patterns and components", bold: true },
          { text: ", improving consistency and scalability across products and platforms." },
        ],
      },
      {
        segments: [
          { text: "Create design documentation", bold: true },
          { text: ", best practices, and usage guidelines to support cross-team adoption." },
        ],
      },
      {
        segments: [
          { text: "Apply layout, spacing, typography, and color fundamentals using pixel-perfect execution within component-based systems to maintain UI craft quality across enterprise-scale products.", bold: true },
        ],
      },
      {
        segments: [
          { text: "Structure information architecture for complex, content-heavy workflows, improving clarity and navigation.", bold: true },
        ],
      },
      {
        segments: [
          { text: "Launch AI-powered features (LLMs) that improve user decision-making during enrollment by framing problems around user goals, key tasks, constraints, success criteria, and business goals. Produce wireframes, mockups, and interactive prototypes", bold: true },
          { text: " using Balsamiq, Figma AI, Copilot, Framer, Lovable, Claude, and ChatGPT to synthesize research, generate early concepts, and enable faster validation and refinement." },
        ],
      },
      {
        segments: [
          { text: "Reduce support tickets by 500+ and support call volume by 9,000+ calls per year through redesigned HR and hiring flows.", bold: true },
        ],
      },
      {
        segments: [
          { text: "Support and mentor junior and senior designers through regular reviews, exchanging feedback, and contributing to overall design quality.", bold: true },
        ],
      },
    ],
    tags: ["B2C", "SaaS", "AI Features", "Design Systems", "Research", "React.js"],
  },
  {
    role: "UX/UI Designer",
    company: "Alquilando S.A. | PropTech Marketplace",
    period: "Mar. 2019, May. 2021",
    location: "Buenos Aires, Argentina (Remote)",
    bullets: [
      "Designing and shipping end-to-end UX/UI solutions for a PropTech startup building a large-scale real estate platform serving the LATAM market, B2C.",
      "Established the company's user-centric foundation through Alan Cooper-inspired personas, leading research and definition with the marketing team to place the customer at the heart of the work.",
      "Led the end-to-end product design process for a B2C proptech, from user research and information architecture to mobile-first UI and design system development.",
      "Built a component system from scratch based on Google Material Design standards, establishing visual consistency and scalability across the platform.",
      "Collaborated with stakeholders to translate product goals into user-centered solutions, validating through usability testing and iteration.",
      "Created wireframes and prototypes to deliver final design solutions to the team and client prior to development.",
      "Delivered high-fidelity UI designs and interactive prototypes for innovative product features, reducing implementation ambiguity and accelerating developer handoffs.",
      "Built HTML and CSS email templates for compatibility and consistent brand presentation across campaigns.",
    ],
    tags: ["PropTech", "B2C", "Material Design", "UI Systems", "Email HTML/CSS"],
  },
  {
    role: "Freelance UX / UI Designer",
    company: "Studio Hakuna | Client: Paramount App LATAM",
    period: "Dec. 2019, May. 2020",
    location: "Buenos Aires, Argentina (Remote)",
    bullets: [
      "Conducted UX research to understand audience needs and behaviors, translating insights into intuitive layouts and optimized user flows for the Paramount App LATAM.",
      "Redesigned existing platform features, improving usability and overall user engagement across the streaming experience.",
      "Collaborated with cross-functional teams to ensure effective communication, alignment, and on-time project execution.",
      "Developed wireframes, prototypes, and high-fidelity UI designs that balanced user needs with business and content strategy goals.",
      "Stayed current with industry trends and streaming UX patterns to inform design decisions and maintain a competitive product experience.",
    ],
    tags: ["Streaming", "Research", "Prototyping", "UI Design"],
  },
  {
    role: "UX/UI Designer",
    company: "Elevation | Web Solutions for Nonprofits",
    period: "01/2017 – 02/2019",
    location: "Buenos Aires, Argentina (Hybrid)",
    bullets: [
      "Delivered UX/UI solutions for multiple nonprofit clients (B2B & B2C).",
      "Improved usability and accessibility across digital platforms.",
      "Designed e-commerce and donation flows, improving conversion rates.",
      "Collaborated with developers and strategists to align user needs with business goals, and partnered with marketing teams to implement SEO-informed UX and growth-focused web experiences, enhancing content structure and usability.",
      "Contributed to brand identity work for multiple clients, applying branding principles to enhance overall product identity and visual consistency across digital touchpoints.",
    ],
    tags: ["B2B", "B2C", "Accessibility", "Fundraising"],
  },
  {
    role: "Freelance UX/UI & Graphic Designer",
    company: "Multiple clients | Web and social media",
    period: "Feb. 2014, Feb. 2017",
    location: "LATAM, Spain, USA (Remote)",
    bullets: [
      "Delivered end-to-end UX/UI design for early-stage products, e-commerce platforms, and marketplaces across multiple industries.",
      "Designed and launched brand identities and digital experiences from 0→1, including websites, product interfaces, and design systems.",
      "Improved user engagement and conversion through optimized user flows, visual design, and marketing assets.",
      "Contributed to growth initiatives, including social campaigns, landing pages, and paid acquisition assets (Google Ads, email, social media).",
      "Designed and developed responsive interfaces using HTML/CSS, ensuring consistency across platforms.",
    ],
    tags: ["UX/UI Design", "Graphic Design", "E-commerce", "Social Media", "HTML/CSS"],
  },
];

const SKILLS = [
  {
    category: "Design",
    items: [
      "Scalable design systems",
      "Component adoption",
      "Pattern definition",
      "Design tokens",
      "Figma libraries",
      "Digital Experience",
      "Storyboards",
      "Accessibility Standards",
      "Mapping Design Thinking",
      "AI Product Design",
      "Enterprise UX",
      "B2B & B2C Products",
    ],
  },
  {
    category: "Data-Heavy Interfaces",
    items: [
      "Complex workflow design",
      "Tables",
      "Filters",
      "Role-based experiences",
      "Multi-step flows",
      "Interconnected entities",
      "State-aware design",
    ],
  },
  {
    category: "Research",
    items: [
      "Competitive Analysis",
      "Qualitative & Quantitative Research",
      "User Research",
      "Usability Testing",
      "Surveys",
      "Heuristic Evaluation",
      "User Interviews",
      "Information Architecture",
      "Personas",
      "Affinity Mapping",
    ],
  },
  {
    category: "Collaboration & Delivery",
    items: [
      "Async-friendly handoff",
      "Figma annotations",
      "Design-to-build alignment",
      "HTML",
      "CSS",
      "Cross-functional Collaboration",
      "Stakeholder Management",
      "Agile / Scrum",
      "UX Advocacy",
      "Workshop Facilitation",
    ],
  },
  {
    category: "AI in Design",
    items: [
      "Copilot",
      "OOUX with AI",
      "Research synthesis",
      "Rapid prototyping",
      "Design-frontend workflow automation",
      "LLM",
    ],
  },
  {
    category: "Soft",
    items: [
      "Friendly",
      "Flexibility",
      "Team Player",
      "Communication",
      "Strategic",
      "Leadership",
      "Time Management",
      "Engaging",
      "Empathy",
      "Attention to Detail",
      "Problem Solving",
      "Prioritization",
      "Accountability",
      "Conflict Resolution",
    ],
  },
];

const EDUCATION = [
  {
    degree: "UX Design / Graphic Design",
    school: "Coderhouse",
    year: "2017",
  },
  {
    degree: "Diploma in Web Media Design",
    school: "Universidad Rafael Belloso Chacín (URBE)",
    year: "2014 - 2015",
  },
  {
    degree: "Bachelor's in Graphic Design",
    school: "Universidad Rafael Belloso Chacín (URBE)",
    year: "2012 - 2015",
  },
];

const TOOLS = [
  { label: "Figma",      src: withBasePath("/images/tools/figma.svg") },
  { label: "Canva",      src: withBasePath("/images/tools/canva.svg") },
  { label: "Jira",       src: withBasePath("/images/tools/jira.svg") },
  { label: "Miro",       src: withBasePath("/images/tools/miro.svg") },
  { label: "Copilot",    src: withBasePath("/images/tools/githubcopilot.svg") },
  { label: "Webex",      src: withBasePath("/images/tools/webex.svg") },
  { label: "ClickUp",    src: withBasePath("/images/tools/clickup.svg") },
  { label: "Confluence", src: withBasePath("/images/tools/confluence.svg") },
  { label: "Maze",       src: withBasePath("/images/tools/maze.svg") },
  { label: "Notion",     src: withBasePath("/images/tools/notion.svg") },
  { label: "Slack",      src: withBasePath("/images/tools/slack.svg") },
  { label: "HTML5",      src: withBasePath("/images/tools/html5.svg") },
  { label: "CSS",        src: withBasePath("/images/tools/css.svg") },
  { label: "React",      src: withBasePath("/images/tools/react.svg") },
  { label: "Angular",    src: withBasePath("/images/tools/Angular_gradient_logo.png") },
  { label: "Supabase",   src: withBasePath("/images/tools/supabase.svg") },
  { label: "Hotjar",     src: withBasePath("/images/tools/hotjar.svg") },
  { label: "WCAG",       src: withBasePath("/images/tools/accessibility.svg") },
  { label: "Claude",     src: withBasePath("/images/tools/anthropic.svg") },
  { label: "Claude Code", src: withBasePath("/images/tools/ai/claude-code.svg") },
  { label: "Codex",      src: withBasePath("/images/tools/ai/codex.svg") },
  { label: "VS Code",    src: withBasePath("/images/tools/visualstudiocode.svg") },
  { label: "ChatGPT",    src: withBasePath("/images/tools/openai.svg") },
];

const CERTIFICATION_ITEMS = [
  {
    year: "01/2026",
    title: "Understanding LLMs: A Guide for UX Practitioners",
    description: "How LLMs are trained, and how to design responsibly and communicate AI costs and risks to stakeholders",
  },
  {
    year: "06/2025",
    title: "Measuring UX and ROI",
    description: "Quantitative UX evaluation and building the case for the ROI of design changes",
  },
  {
    year: "01/2025",
    title: "Practical AI for UX Professionals",
    description: "Prompt engineering, evaluating AI model outputs, and identifying appropriate uses of AI tools",
  },
  {
    year: "01/2025",
    title: "Information Architecture",
    description: "Designing and documenting a useful, usable, and extensible information architecture",
  },
  {
    year: "12/2023",
    title: "Designing Complex Apps for Specialized Domains",
    description: "Creating and evaluating applications for advanced decision-making and specialized, expert-level workflows",
  },
  {
    year: "12/2023",
    title: "Writing Compelling Digital Copy",
    description: "Research-backed UX writing: how people read digital content and what to write",
  },
  {
    year: "2023",
    title: "The Human Mind and Usability",
    description: "Designing around users' cognitive constraints to understand why some interfaces work better than others",
  },
  {
    year: "06/2023",
    title: "Accessibility: How to Design for All",
    description: "Designing and testing for accessibility, from image and ARIA handling to working with users with disabilities",
  },
  {
    year: "01/2021",
    title: "Web Design for Usability",
    description: "Usability and accessibility guidelines, user research, personas, and navigation design for the web",
  },
  {
    year: "03/2021",
    title: "UI Design Patterns for Successful Software",
    description: "Practical UI patterns for structure, content, navigation, forms, and social features",
  },
  {
    year: "11/2020",
    title: "User Research: Methods and Best Practices",
    description: "Planning and running interviews, contextual inquiries, observational studies, and usability tests",
  },
  {
    year: "06/2024",
    title: "Object-Oriented UX (OOUX) Fundamentals",
    description: "Structuring products around objects, their relationships, and the actions users take on them",
  },
  {
    year: "07/2025",
    title: "How to Write Great Microcopy",
    description: "Writing clear, helpful microcopy for buttons, forms, error states, and onboarding flows",
  },
  {
    year: "01/2019",
    title: "Evaluating User Interfaces",
    description: "Action analysis, heuristic evaluation, usability testing, and setting measurable usability goals",
  },
];

export default function ResumePage() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [toolsExpanded, setToolsExpanded] = useState(false);
  const [collapsedSkillGroups, setCollapsedSkillGroups] = useState<Record<string, boolean>>({});
  const [nngCertificationsExpanded, setNngCertificationsExpanded] = useState(false);
  const [ixdfCertificationsExpanded, setIxdfCertificationsExpanded] = useState(false);
  const [courseraCertificationsExpanded, setCourseraCertificationsExpanded] = useState(false);
  const [udemyCertificationsExpanded, setUdemyCertificationsExpanded] = useState(false);
  const translate = useTranslate();
  const { siteContent } = usePublicSiteContent();
  const resume = siteContent.resume;

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 0);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const experience = resume.experience.length
    ? resume.experience.map((job) => ({
        role: job.title,
        company: job.client ? `${job.company} | ${job.client}` : job.company,
        period: job.period,
        location: job.location,
        bullets: job.bullets,
        tags: job.tags,
      }))
    : EXPERIENCE;
  const skills = Object.entries(resume.skills).length
    ? Object.entries(resume.skills).map(([category, items]) => ({ category, items }))
    : SKILLS;
  const education = resume.education.length
    ? resume.education.map((edu) => ({ degree: edu.degree, school: edu.institution, year: edu.year }))
    : EDUCATION;
  const tools = resume.tools.length
    ? resume.tools.map((label) => ({ label, src: resolveToolIcon(label) }))
    : TOOLS;
  const certifications = resume.certifications.length
    ? resume.certifications.map((item) => ({
        year: item.year,
        title: item.name,
        description: item.level,
      }))
    : CERTIFICATION_ITEMS;
  const nngCertifications = certifications.slice(0, 7);
  const ixdfCertifications = certifications.slice(7, 11);
  const udemyCertifications = certifications.slice(11, 13);
  const courseraCertifications = certifications.slice(13, 14);
  const otherCertifications = certifications.slice(14);
  const heroBio = resume.bio.replace(/^Senior Product Designer with/, "With");
  const heroTitle = resume.title
    .replace("Senior Product Designer", "Sr. Product Designer")
    .replace(" | Enterprise SaaS", "");
  const resumeHighlights = [
    { label: "resume.experienceHighlight", value: "resume.experienceHighlightValue", unit: "resume.experienceHighlightUnit", detail: "resume.experienceHighlightDetail", className: "bg-[#dceeff] text-[#141114]" },
    { label: "resume.globalReachHighlight", value: "resume.globalReachHighlightValue", unit: "resume.globalReachHighlightUnit", detail: "resume.globalReachHighlightDetail", className: "bg-[#f8df36] text-[#141114]" },
    { label: "resume.languagesHighlight", value: "resume.languagesHighlightValue", unit: "resume.languagesHighlightUnit", detail: "resume.languagesHighlightDetail", className: "bg-[#d8d3ff] text-[#141114]" },
    { label: "resume.learningHighlight", value: "resume.learningHighlightValue", unit: "resume.learningHighlightUnit", detail: "resume.learningHighlightDetail", className: "bg-[#0e2951] text-white" },
  ] as const;

  function toggleSkillGroup(category: string) {
    setCollapsedSkillGroups((current) => ({
      ...current,
      [category]: !current[category],
    }));
  }

  return (
    <main className="bg-white text-[#3c3e3f] overflow-x-clip min-h-screen">
      <SiteHeader active="Resume" />

      <div className={`sticky top-[88px] z-[70] bg-[#1183D0] transition-shadow duration-200 lg:top-0 ${hasScrolled ? "shadow-[0_8px_24px_rgba(14,41,81,0.14)]" : ""}`}>
        <Container size="wide" className="px-6">
          <div className="flex items-center justify-between gap-4 py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
              <a href={withBasePath("/")} className="text-white/70 transition-colors hover:text-white">
                {translate("footer.home")}
              </a>
              <span aria-hidden="true" className="text-white/40">/</span>
              <span className="font-medium text-white">{translate("resume.eyebrow")}</span>
            </nav>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                asChild
                variant="tertiary"
                size="sm"
                className="border-white/70 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
              >
                <a href={withBasePath(resume.pdf_link || "/documents/greddys-martinez-resume-2026.pdf")} download>
                  {translate("resume.downloadResume")}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-white text-[#1183D0] hover:bg-white/90"
              >
                <a href={withBasePath("/contact")}>{translate("resume.getInTouch")}</a>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <section className="relative bg-[#1183D0]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-[16rem] -left-28 size-[34rem] rounded-full border-[6rem] border-[#54aae0]/85" />
      </div>
      <Container size="wide" className="relative z-10 px-6 pb-10 pt-[10px]">
        <div className="relative px-2 py-12 text-white sm:px-4 lg:px-6 lg:py-16">
          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] lg:gap-14">
          <div className="mx-0 flex max-w-[760px] flex-col items-start text-left">
            <span className="rounded-full bg-[#f8df36] px-4 py-2 text-xs font-semibold text-[#141114]">{translate("resume.eyebrow")}</span>
            <Heading as="h1" variant="hero" className="mt-8 max-w-[840px] font-playfair text-[clamp(2.5rem,5.1vw,4.9rem)] font-normal italic leading-[0.95] tracking-[-0.055em] text-white">
              {resume.name}
            </Heading>
            <p className="mt-5 text-2xl font-medium text-white sm:text-3xl">
              {heroTitle}
            </p>
            <p className="mt-8 max-w-[680px] text-lg font-normal leading-[2.2] text-white/85 sm:text-xl">
              {heroBio}
            </p>
          </div>
          <div className="grid translate-y-16 grid-cols-2 gap-4 lg:translate-x-12 lg:translate-y-32">
            {resumeHighlights.map((highlight) => (
              <article key={highlight.label} className={`flex min-h-[160px] flex-col justify-between rounded-[20px] p-5 shadow-[0_14px_28px_rgba(14,41,81,0.12)] sm:min-h-[190px] sm:p-7 ${highlight.className}`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-75">{translate(highlight.label)}</p>
                <p className="flex items-baseline gap-2">
                  <strong className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-[clamp(2.5rem,4vw,3.5rem)]">{translate(highlight.value)}</strong>
                  <span className="text-base font-medium leading-tight opacity-80 sm:text-lg">{translate(highlight.unit)}</span>
                </p>
                <p className="text-sm leading-[1.35] opacity-85 sm:text-[15px]">{translate(highlight.detail)}</p>
              </article>
            ))}
          </div>
        </div>
        </div>
      </Container>
      </section>

      <Container as="section" size="wide" aria-label="Product design approach" className="relative z-20 px-6 pb-14 pt-0 md:pb-20">
        <div className="pt-12 md:pt-16">
          <div className="max-w-[700px]">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#1183D0]">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#1183D0]" />
              Product design approach
            </p>
            <p className="mt-6 max-w-[700px] text-[17px] leading-[1.8] tracking-[-0.02em] text-[#141114] sm:text-[20.4px]">
              <strong className="font-semibold">Double Diamond design thinking</strong> guides the work: simplifying complex workflows, clarifying <strong className="font-semibold">information architecture</strong>, and building <strong className="font-semibold">reusable systems</strong>. Content-rich, data-heavy experiences are structured with scalable hierarchy and interaction patterns, in partnership with product and engineering to define success, strengthen implementation, and <strong className="font-semibold">reduce design debt</strong>.
            </p>
          </div>
          </div>
      </Container>

      <Container as="section" size="wide" aria-label={translate("resume.contactDetails")} className="px-6 py-8 md:py-10">
        <div className="grid overflow-hidden rounded-[24px] border border-[#d7e7f5] bg-[#d7e7f5] gap-px md:grid-cols-2">
          <a href={`mailto:${resume.email}`} className="group bg-[#fbfdff] p-7 transition-colors hover:bg-[#f2f8fd] sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1183D0]">{translate("resume.emailLabel")}</span>
            <span className="mt-2 block break-words text-xl font-normal leading-tight tracking-[-0.035em] text-[#141114] transition-colors group-hover:text-[#1183D0] sm:text-2xl">{resume.email}</span>
          </a>
          <div className="bg-[#fbfdff] p-7 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1183D0]">{translate("resume.locationLabel")}</span>
            <span className="mt-2 block text-xl font-normal leading-tight tracking-[-0.035em] text-[#141114] sm:text-2xl">{resume.location}</span>
          </div>
          <a href={`https://${resume.website}`} target="_blank" rel="noreferrer" className="group bg-[#fbfdff] p-7 transition-colors hover:bg-[#f2f8fd] sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1183D0]">{translate("resume.portfolioLabel")}</span>
            <span className="mt-2 block break-words text-xl font-normal leading-tight tracking-[-0.035em] text-[#141114] transition-colors group-hover:text-[#1183D0] sm:text-2xl">{resume.website}</span>
          </a>
          <a href={`https://${resume.linkedin}`} target="_blank" rel="noreferrer" className="group bg-[#fbfdff] p-7 transition-colors hover:bg-[#f2f8fd] sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1183D0]">{translate("resume.linkedinLabel")}</span>
            <span className="mt-2 block break-words text-xl font-normal leading-tight tracking-[-0.035em] text-[#141114] transition-colors group-hover:text-[#1183D0] sm:text-2xl">{resume.linkedin}</span>
          </a>
        </div>
      </Container>

      {/* Experience */}
      <Container as="section" size="wide" className="px-6 py-10">
        <div className="mb-8 px-6 sm:px-7">
          <ResumeSectionHeading
            eyebrow={translate("resume.careerEyebrow")}
            title={translate("resume.experienceHeading")}
          />
        </div>
        <div className="flex flex-col gap-5">
          {experience.map((job) => (
            <ResumeExperienceCard
              key={`${job.role}-${job.company}`}
              role={job.role}
              company={job.company}
              period={job.period}
              location={job.location}
              bullets={job.bullets}
              tags={job.tags}
              statusBadges={[
                ...(job.location.match(/\((remote|remoto|hybrid|híbrido)\)/i)
                  ? [
                      /hybrid|híbrido/i.test(job.location)
                        ? translate("resume.hybrid")
                        : translate("resume.remote"),
                    ]
                  : []),
              ]}
              expandLabel={translate("resume.readMore")}
              collapseLabel={translate("resume.readLess")}
              className="rounded-[24px] border border-[#e5e1e8] bg-white transition-shadow duration-200 hover:shadow-[0_16px_32px_rgba(29,22,36,0.10)]"
            />
          ))}
        </div>
      </Container>

      {/* Education */}
      <section className="w-full bg-[#1183D0] text-white">
        <Container as="div" size="wide" className="px-6 py-12 sm:py-16">
          <ResumeSectionHeading
            eyebrow={translate("resume.trainingHeading")}
            title={translate("resume.educationEyebrow")}
            inverse
          />
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {education.map((edu) => (
              <article key={edu.degree} className="border-t border-white/25 pt-6">
                <p className="font-playfair text-4xl italic leading-none text-[#f8df36] sm:text-5xl">
                  {edu.year}
                </p>
                <Heading as="h3" variant="card" className="mt-5 text-xl font-semibold text-white">
                  {edu.degree}
                </Heading>
                <p className="mt-3 text-base leading-relaxed text-white/80">{edu.school}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="relative isolate overflow-hidden bg-[#fffdfd]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-[28rem] size-[64rem] rounded-full border-[5rem] border-[#f4ff00]" />
        <Container as="div" size="wide" className="relative px-6 pt-12 pb-8 sm:pt-16 sm:pb-8">
          <ResumeSectionHeading
            eyebrow={translate("resume.recognitionHeading")}
            title={translate("resume.certificationsEyebrow")}
          />
          <div className="mt-8 flex flex-wrap items-start gap-5 border-b border-[#e6e2e8] pb-8">
            <a
              href="https://www.upwork.com/freelancers/greddysmartinez"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 transition-opacity hover:opacity-80"
            >
              <Image
                src={withBasePath("/images/iNSrn.png")}
                alt="Upwork Skill Certification"
                width={110}
                height={110}
                className="h-auto w-[78px] sm:w-[92px]"
              />
            </a>
            <div className="max-w-3xl">
              <h3 className="text-xl font-semibold leading-snug text-[#141114]">
                {translate("resume.upworkCertificationTitle")}
              </h3>
              <p className="mt-1 text-base leading-relaxed text-[#5c5961]">
                {translate("resume.upworkCertificationDescription")}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setNngCertificationsExpanded((expanded) => !expanded)}
              aria-expanded={nngCertificationsExpanded}
              aria-label={
                nngCertificationsExpanded
                  ? translate("resume.collapseCertifications")
                  : translate("resume.expandCertifications")
              }
              className="group flex w-full items-center gap-5 text-left"
            >
              <Image
                src={withBasePath("/images/OiSjn.png")}
                alt=""
                aria-hidden="true"
                width={110}
                height={154}
                className="h-auto w-[64px] sm:w-[74px]"
              />
              <span className="flex min-w-0 flex-1 items-center gap-6">
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-semibold leading-snug text-[#141114]">
                    {translate("resume.nnGroupCertifiedLabel")}
                    {" - "}
                    {translate("resume.interactionDesign")}
                  </span>
                  <span className="mt-2 block text-base leading-relaxed text-[#5c5961]">
                    {translate("resume.nnGroupCertificationDescription")}
                  </span>
                </span>
                <span className="ml-auto flex size-12 shrink-0 items-center justify-center text-4xl font-light leading-none text-[#1183D0] transition-colors group-hover:text-[#0d6fae]">
                  {nngCertificationsExpanded ? "−" : "+"}
                </span>
              </span>
            </button>
          </div>
          {nngCertificationsExpanded ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {nngCertifications.map((item) => (
                <article
                  key={`${item.year}-${item.title}`}
                  className="flex min-h-[260px] flex-col rounded-[20px] border border-[#e6e2e8] bg-white p-8 transition-shadow duration-200 hover:shadow-[0_16px_32px_rgba(29,22,36,0.10)]"
                >
                  <p className="text-sm font-medium text-[#5c5961]">{item.year}</p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug text-[#141114]">{item.title}</h3>
                  <p className="mt-auto pt-3 text-base leading-relaxed text-[#5c5961]">{item.description}</p>
                </article>
              ))}
            </div>
          ) : null}

          <div className="mt-16 border-t border-[#e6e2e8] pt-10">
            <button
              type="button"
              onClick={() => setIxdfCertificationsExpanded((expanded) => !expanded)}
              aria-expanded={ixdfCertificationsExpanded}
              aria-label={
                ixdfCertificationsExpanded
                  ? translate("resume.collapseCertifications")
                  : translate("resume.expandCertifications")
              }
              className="group flex w-full items-center gap-5 text-left"
            >
              <Image
                src={withBasePath("/images/ixdf-logo.svg")}
                alt=""
                aria-hidden="true"
                width={64}
                height={64}
                className="size-16 shrink-0"
              />
              <span className="flex min-w-0 flex-1 items-center gap-6">
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-semibold leading-snug text-[#141114]">
                    Interaction Design Foundation (IxDF)
                  </span>
                  <span className="mt-1 block text-base leading-relaxed text-[#5c5961]">
                    {translate("resume.ixdfDescription")}
                  </span>
                </span>
                <span className="ml-auto flex size-12 shrink-0 items-center justify-center text-4xl font-light leading-none text-[#1183D0] transition-colors group-hover:text-[#0d6fae]">
                  {ixdfCertificationsExpanded ? "−" : "+"}
                </span>
              </span>
            </button>
            {ixdfCertificationsExpanded ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {ixdfCertifications.map((item) => (
                  <article
                    key={`${item.year}-${item.title}`}
                    className="flex min-h-[260px] flex-col rounded-[20px] border border-[#e6e2e8] bg-white p-8 transition-shadow duration-200 hover:shadow-[0_16px_32px_rgba(29,22,36,0.10)]"
                  >
                    <p className="text-sm font-medium text-[#5c5961]">{item.year}</p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-[#141114]">{item.title}</h3>
                    <p className="mt-auto pt-3 text-base leading-relaxed text-[#5c5961]">{item.description}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-16 border-t border-[#e6e2e8] pt-10">
            <button
              type="button"
              onClick={() => setCourseraCertificationsExpanded((expanded) => !expanded)}
              aria-expanded={courseraCertificationsExpanded}
              aria-label={
                courseraCertificationsExpanded
                  ? translate("resume.collapseCertifications")
                  : translate("resume.expandCertifications")
              }
              className="group flex w-full items-center gap-5 text-left"
            >
              <Image
                src={withBasePath("/images/coursera.svg")}
                alt=""
                aria-hidden="true"
                width={64}
                height={64}
                className="size-16 shrink-0"
              />
              <span className="flex min-w-0 flex-1 items-center gap-6">
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-semibold leading-snug text-[#141114]">Coursera</span>
                  <span className="mt-1 block text-base leading-relaxed text-[#5c5961]">
                    {translate("resume.courseraDescription")}
                  </span>
                </span>
                <span className="ml-auto flex size-12 shrink-0 items-center justify-center text-4xl font-light leading-none text-[#1183D0] transition-colors group-hover:text-[#0d6fae]">
                  {courseraCertificationsExpanded ? "−" : "+"}
                </span>
              </span>
            </button>
            {courseraCertificationsExpanded ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {courseraCertifications.map((item) => (
                  <article
                    key={`${item.year}-${item.title}`}
                    className="flex min-h-[260px] flex-col rounded-[20px] border border-[#e6e2e8] bg-white p-8 transition-shadow duration-200 hover:shadow-[0_16px_32px_rgba(29,22,36,0.10)]"
                  >
                    <p className="text-sm font-medium text-[#5c5961]">{item.year}</p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-[#141114]">{item.title}</h3>
                    <p className="mt-auto pt-3 text-base leading-relaxed text-[#5c5961]">{item.description}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-16 border-t border-[#e6e2e8] pt-10">
            <button
              type="button"
              onClick={() => setUdemyCertificationsExpanded((expanded) => !expanded)}
              aria-expanded={udemyCertificationsExpanded}
              aria-label={
                udemyCertificationsExpanded
                  ? translate("resume.collapseCertifications")
                  : translate("resume.expandCertifications")
              }
              className="group flex w-full items-center gap-5 text-left"
            >
              <Image
                src={withBasePath("/images/udemy-logo.svg")}
                alt=""
                aria-hidden="true"
                width={91}
                height={34}
                className="h-auto w-20 shrink-0"
              />
              <span className="flex min-w-0 flex-1 items-center gap-6">
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-semibold leading-snug text-[#141114]">Udemy</span>
                  <span className="mt-1 block text-base leading-relaxed text-[#5c5961]">
                    {translate("resume.udemyDescription")}
                  </span>
                </span>
                <span className="ml-auto flex size-12 shrink-0 items-center justify-center text-4xl font-light leading-none text-[#1183D0] transition-colors group-hover:text-[#0d6fae]">
                  {udemyCertificationsExpanded ? "−" : "+"}
                </span>
              </span>
            </button>
            {udemyCertificationsExpanded ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {udemyCertifications.map((item) => (
                  <article
                    key={`${item.year}-${item.title}`}
                    className="flex min-h-[260px] flex-col rounded-[20px] border border-[#e6e2e8] bg-white p-8 transition-shadow duration-200 hover:shadow-[0_16px_32px_rgba(29,22,36,0.10)]"
                  >
                    <p className="text-sm font-medium text-[#5c5961]">{item.year}</p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-[#141114]">{item.title}</h3>
                    <p className="mt-auto pt-3 text-base leading-relaxed text-[#5c5961]">{item.description}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>

          {otherCertifications.length > 0 && (
            <div className="mt-16 border-t border-[#e6e2e8] pt-10">
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {otherCertifications.map((item) => (
                  <article
                    key={`${item.year}-${item.title}`}
                    className="flex min-h-[260px] flex-col rounded-[20px] border border-[#e6e2e8] bg-white p-8 transition-shadow duration-200 hover:shadow-[0_16px_32px_rgba(29,22,36,0.10)]"
                  >
                    <p className="text-sm font-medium text-[#5c5961]">{item.year}</p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-[#141114]">{item.title}</h3>
                    <p className="mt-auto pt-3 text-base leading-relaxed text-[#5c5961]">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="w-full bg-[#f6f4f9] text-[#141114]">
        <Container as="div" size="wide" className="px-6 py-12 sm:py-16">
          <ResumeSectionHeading
            eyebrow={translate("resume.stackEyebrow")}
            title={translate("resume.toolsHeading")}
          />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#5c5961]">
            {translate("resume.toolsDescription")}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {tools.map((tool, index) => (
              <div
                key={tool.label}
                className={`${index >= 5 && !toolsExpanded ? "hidden sm:flex" : "flex"} min-h-24 items-center gap-5 rounded-[18px] bg-[#fbf8f9] p-5 shadow-[0_14px_30px_rgba(29,22,36,0.08)] transition-shadow duration-200 hover:shadow-[0_18px_36px_rgba(29,22,36,0.12)] sm:p-6`}
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white">
                  <Image src={tool.src} alt="" aria-hidden="true" width={36} height={36} className="max-h-9 w-auto max-w-9 object-contain" />
                </div>
                <span className="text-base font-medium text-[#141114]">{tool.label}</span>
              </div>
            ))}
          </div>
          {tools.length > 5 ? (
            <button
              type="button"
              onClick={() => setToolsExpanded((expanded) => !expanded)}
              aria-expanded={toolsExpanded}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1183D0] underline-offset-4 hover:underline sm:hidden"
            >
              {translate(toolsExpanded ? "resume.toolsShowLess" : "resume.toolsShowMore")}
            </button>
          ) : null}
        </Container>
      </section>

      {/* Skills */}
      <section className="w-full bg-[#fbf8f9] text-[#141114]">
        <Container as="div" size="wide" className="px-6 py-12 sm:py-16">
          <ResumeSectionHeading
            eyebrow={translate("resume.capabilitiesEyebrow")}
            title={translate("resume.skillsHeading")}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {skills.map((group) => (
              <article
                key={group.category}
                className="rounded-[20px] border border-[#e6e2e8] bg-[#fffdfd] p-6 sm:p-7"
              >
                <button
                  type="button"
                  onClick={() => toggleSkillGroup(group.category)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                  aria-expanded={!collapsedSkillGroups[group.category]}
                >
                  <Heading as="h3" variant="card" className="text-xl font-semibold text-[#141114]">
                    {group.category === "Languages" ? translate("resume.languagesHighlight") : group.category}
                  </Heading>
                </button>
                {!collapsedSkillGroups[group.category] ? (
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <Badge
                        key={item}
                        size="tag"
                        className="h-auto rounded-full border border-[#e6e2e8] bg-transparent px-4 py-2 text-sm font-medium text-[#4f4b53] hover:bg-white"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white px-6 py-12 sm:px-10 sm:py-16">
        <div
          className="relative mx-auto flex max-w-[1280px] flex-col items-center overflow-hidden rounded-[24px] px-6 py-12 text-center text-white shadow-[var(--ui-shadow-elevated)] sm:px-12 md:py-16"
          style={{ background: "var(--ui-surface-contact-cta)" }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-5rem] h-56 w-72 -translate-x-1/2 rounded-[50%] bg-white/10 blur-[1px]" />
          <Heading as="h2" variant="display" tone="inverse" className="relative max-w-3xl">
            {translate("home.contactCta")}
          </Heading>
          <p className="relative mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {translate("resume.contactCtaDescription")}
          </p>
          <Button
            asChild
            variant="editorial-outline"
            size="sm"
            className="relative mt-8 border-transparent bg-white text-[#141114] hover:bg-white/90"
          >
            <a href={withBasePath("/contact")}>
              {translate("resume.getInTouch")}
            </a>
          </Button>
        </div>
      </section>

      <div className="mt-10">
        <SiteFooter />
      </div>
    </main>
  );
}

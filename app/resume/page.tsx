"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { SectionHeading } from "../../components/ui/section-heading";
import { resolveCertificationLogo, resolveToolIcon, usePublicSiteContent } from "../../lib/cms/public";
import { withBasePath } from "../../lib/site";

type ExperienceBullet = string | { heading: string; items: string[] };
type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: ExperienceBullet[];
  tags: string[];
};

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Sr. Product Designer",
    company: "ITX Corp | Client: Paychex (Nayya, Flock, E-Verify, Indeed)",
    period: "Mar. 2021 – Present",
    location: "Malaga, Spain (Remote)",
    bullets: [
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
      "Create design documentation, best practices, and usage guidelines, enabling cross-team adoption of shared patterns.",
    ],
    tags: ["B2C SaaS", "AI Features", "Design Systems", "Research", "React.js"],
  },
  {
    role: "UX/UI Designer",
    company: "Alquilando S.A. | PropTech Marketplace",
    period: "Mar. 2019 – May. 2021",
    location: "Buenos Aires, Argentina (Remote)",
    bullets: [
      "Designing and shipping end-to-end UX/UI solutions for a PropTech startup building a large-scale real estate platform serving the LATAM market — B2C.",
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
    period: "Dec. 2019 – May. 2020",
    location: "Buenos Aires, Argentina (Remote)",
    bullets: [
      "Conducted UX research to understand audience needs and behaviors, translating insights into intuitive layouts and optimized user flows for the Paramount App LATAM.",
      "Redesigned existing platform features, improving usability and overall user engagement across the streaming experience.",
      "Collaborated with cross-functional teams to ensure effective communication, alignment, and on-time project execution.",
      "Developed wireframes, prototypes, and high-fidelity UI designs that balanced user needs with business and content strategy goals.",
      "Stayed current with industry trends and streaming UX patterns to inform design decisions and maintain a competitive product experience.",
    ],
    tags: ["Streaming", "LATAM", "UX Research", "Prototyping", "UI Design"],
  },
  {
    role: "UX/UI Designer",
    company: "Elevation | Web Solutions for Nonprofits",
    period: "Jan. 2017 – Feb. 2019",
    location: "Buenos Aires, Argentina (Hybrid)",
    bullets: [
      "Delivered end-to-end UX/UI design across multiple nonprofit clients (B2B and B2C) simultaneously, managing competing priorities and deadlines in a fast-paced agency environment.",
      "Developed wireframes, prototypes, and optimized interface designs that improved usability and digital accessibility for mission-driven organizations.",
      "Designed and optimized e-commerce experiences for nonprofit fundraising platforms, contributing to improved donor conversion and online giving flows.",
      "Created engaging email newsletters and marketing materials that supported client communication strategies and audience retention.",
      "Collaborated cross-functionally with developers and strategists to ensure design solutions aligned with user needs and nonprofit business goals.",
      "Created marketing assets, including HTML/CSS emails, brochures, and campaign materials, tailored to each client's needs.",
    ],
    tags: ["Nonprofits", "B2B", "B2C", "Accessibility", "Fundraising"],
  },
  {
    role: "Freelance UX / UI Designer / Graphic Designer",
    company: "Multiple clients | Web and social media",
    period: "Feb. 2014 – Feb. 2017",
    location: "LATAM, Spain, USA (Remote)",
    bullets: [
      "Delivered end-to-end UX/UI design for early-stage products, e-commerce platforms, and marketplaces across multiple industries.",
      "Designed and launched brand identities and digital experiences from 0→1, including websites, product interfaces, and design systems.",
      "Improved user engagement and conversion through optimized user flows, visual design, and marketing assets.",
      "Contributed to growth initiatives, including social campaigns, landing pages, and paid acquisition assets (Google Ads, email, social media).",
      "Designed and developed responsive interfaces using HTML/CSS, ensuring consistency across platforms.",
    ],
    tags: ["Freelance", "UX/UI Design", "Graphic Design", "E-commerce", "Social Media", "HTML/CSS"],
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
    school: "Universidad Rafael Belloso Chacín",
    year: "2014–2015",
  },
  {
    degree: "Bachelor's in Graphic Design",
    school: "URBE",
    year: "2012–2015",
  },
];

const TOOLS = [
  { label: "Figma",      src: withBasePath("/images/tools/figma.svg") },
  { label: "Jira",       src: withBasePath("/images/tools/jira.svg") },
  { label: "Miro",       src: withBasePath("/images/tools/miro.svg") },
  { label: "Copilot",    src: withBasePath("/images/tools/githubcopilot.svg") },
  { label: "Webex",      src: withBasePath("/images/tools/webex.svg") },
  { label: "ClickUp",    src: withBasePath("/images/tools/clickup.svg") },
  { label: "Confluence", src: withBasePath("/images/tools/confluence.svg") },
  { label: "Maze",       src: withBasePath("/images/tools/maze.svg") },
  { label: "Notion",     src: withBasePath("/images/tools/notion.svg") },
  { label: "Slack",      src: withBasePath("/images/tools/slack.svg") },
  { label: "HTML/CSS",   src: withBasePath("/images/tools/html5.svg") },
  { label: "React",      src: withBasePath("/images/tools/react.svg") },
  { label: "Claude",     src: withBasePath("/images/tools/anthropic.svg") },
  { label: "VS Code",    src: withBasePath("/images/tools/visualstudiocode.svg") },
  { label: "ChatGPT",    src: withBasePath("/images/tools/openai.svg") },
];

const CERTIFICATION_ITEMS = [
  {
    year: "2023",
    title: "Interaction Design Specialty",
    description: "Advanced patterns for complex interactive systems and enterprise workflows",
  },
  {
    year: "2023",
    title: "UX Management: Strategy & Tactics",
    description: "Leading design teams, stakeholder alignment, and design ops",
  },
  {
    year: "2022",
    title: "Measuring UX & ROI",
    description: "Quantifying design impact through analytics, A/B testing, and KPIs",
  },
  {
    year: "2022",
    title: "Journey Mapping",
    description: "Mapping end-to-end user experiences across touchpoints and channels",
  },
  {
    year: "2021",
    title: "Information Architecture",
    description: "Organizing and structuring content for findability and clarity",
  },
  {
    year: "2021",
    title: "Usability Testing",
    description: "Planning, conducting, and analyzing usability studies",
  },
  {
    year: "2020",
    title: "User Interface Design Guidelines",
    description: "Applying evidence-based UI patterns and accessibility standards",
  },
  {
    year: "2020",
    title: "Human-Computer Interaction",
    description: "Foundational principles of cognitive science applied to design",
  },
];

const FEATURED_CREDENTIALS = [
  {
    type: "image" as const,
    image: withBasePath("/images/iNSrn.png"),
    alt: "Upwork Skill Certification",
    title: "Upwork Skill Certification",
    href: "https://www.upwork.com/freelancers/greddysmartinez",
    subtitle: "User Interface Design",
    description:
      "Verified professional certification for UI Design skills on the Upwork platform, demonstrating expertise in creating intuitive and visually appealing interfaces.",
    year: "2024",
  },
  {
    type: "image" as const,
    image: withBasePath("/images/coursera.svg"),
    alt: "Coursera",
    title: "User Interface Design",
    subtitle: "University of Minnesota - COURSERA",
    description:
      "Comprehensive course covering user interface design principles, visual hierarchy, typography, and responsive design patterns.",
    year: "2018",
  },
  {
    type: "image" as const,
    image: withBasePath("/images/coderhouse.jpeg"),
    alt: "Coderhouse",
    title: "UX / UI Course",
    subtitle: "Coderhouse",
    description:
      "Intensive program covering UX research methodologies, wireframing, prototyping, and end-to-end design workflow.",
    year: "2017",
  },
];

function Tag({ label }: { label: string }) {
  return <Badge size="tag">{label}</Badge>;
}

export default function ResumePage() {
  const [collapsedSkillGroups, setCollapsedSkillGroups] = useState<Record<string, boolean>>({});
  const { siteContent } = usePublicSiteContent();
  const resume = siteContent.resume;
  const experience = resume.experience.length
    ? resume.experience.map((job) => ({
        role: job.title,
        company: job.client ? `${job.company} | Client: ${job.client}` : job.company,
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
  const featuredCredentials = resume.certifications.length
    ? resume.certifications.slice(0, 3).map((item, index) => ({
        type: "image" as const,
        image: resolveCertificationLogo(item.name, item.logo),
        alt: item.name,
        title: item.name,
        ...(index === 0 ? { href: "https://www.upwork.com/freelancers/greddysmartinez" } : {}),
        subtitle: item.level,
        description: item.level,
        year: item.year,
      }))
    : FEATURED_CREDENTIALS;

  function toggleSkillGroup(category: string) {
    setCollapsedSkillGroups((current) => ({
      ...current,
      [category]: !current[category],
    }));
  }

  return (
    <main className="bg-white text-[#3c3e3f] overflow-x-hidden min-h-screen">
      <SiteHeader active="Resume" />

      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 pt-[10px] pb-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <a href={withBasePath("/")} className="inline-flex items-center gap-2 text-[#5c7792] text-sm hover:text-[#1183D0] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Home
          </a>
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="shrink-0"
          >
            <a href={withBasePath(resume.pdf_link || "/documents/greddys-martinez-resume-2026.pdf")} download>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Resume
            </a>
          </Button>
        </div>
        <div className="relative overflow-hidden px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0e2951]">Resume</span>
            <h1 className="mt-8 text-5xl font-inter leading-[0.95] text-[#0e2951] sm:text-6xl lg:text-7xl">
              {resume.name}
            </h1>
            <p className="mt-5 text-xl font-medium text-[#1f2f3d] sm:text-2xl">
              {resume.title}
            </p>
            <div className="mt-8 flex w-full max-w-[980px] flex-col items-center gap-4 text-sm text-[#24425d] sm:text-base lg:flex-row lg:flex-nowrap lg:justify-center lg:gap-6">
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                {resume.email}
              </span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="2" aria-hidden="true"><path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z"/><circle cx="12" cy="11" r="2.5"/></svg>
                {resume.location}
              </span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9Z"/></svg>
                {resume.website}
              </span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="2" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                {resume.linkedin}
              </span>
            </div>
            <p className="mt-8 max-w-4xl text-[15px] leading-[1.7] text-[#243746] sm:text-base">
              {resume.bio}
            </p>
            <div className="mt-10 flex flex-wrap items-start justify-center gap-10 sm:gap-14">
              <a
                href="https://www.upwork.com/freelancers/greddysmartinez"
                target="_blank"
                rel="noreferrer"
                className="flex max-w-[180px] flex-col items-center text-center hover:opacity-80 transition-opacity"
              >
                <Image
                  src={withBasePath("/images/iNSrn.png")}
                  alt="Upwork Skill Certification"
                  width={110}
                  height={110}
                  className="h-auto w-[92px] sm:w-[110px]"
                />
                <p className="mt-3 text-[15px] font-medium leading-snug text-[#1f2f3d]">
                  Upwork Certified
                </p>
                <p className="mt-1 text-[15px] font-medium leading-snug text-[#1f2f3d]">
                  User Interface Design
                </p>
              </a>
              <div className="flex max-w-[180px] flex-col items-center text-center">
                <Image
                  src={withBasePath("/images/OiSjn.png")}
                  alt="NN Group UX Certified Interaction Design"
                  width={110}
                  height={154}
                  className="h-auto w-[92px] sm:w-[110px]"
                  style={{ height: "auto" }}
                />
                <p className="mt-3 text-[15px] font-medium leading-snug text-[#1f2f3d]">
                  NN/Group Certified
                </p>
                <p className="mt-1 text-[15px] font-medium leading-snug text-[#1f2f3d]">
                  Interaction Design
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        <SectionHeading eyebrow="Career" title="Experience" centered className="mb-8" />
        <div className="flex flex-col gap-5">
          {experience.map((job) => (
            <Card
              key={`${job.role}-${job.company}`}
              className="overflow-hidden rounded-[34px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.84)_0%,rgba(247,251,255,0.74)_100%)] p-0 py-0 shadow-[0_22px_56px_rgba(31,53,94,0.08)] backdrop-blur-xl"
            >
              <CardContent className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-lg font-semibold text-[#0e2951]">{job.role}</h3>
                  <p className="text-sm text-[#5c7792] mt-0.5">{job.company}</p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <Badge variant="secondary" size="sm">{job.period}</Badge>
                  <Badge variant="secondary" size="sm">{job.location}</Badge>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {job.bullets.map((b) => (
                  typeof b === "string" ? (
                    <li key={b} className="text-sm text-[#3c3e3f] leading-relaxed flex gap-2">
                      <span className="text-[#1183D0] mt-1 shrink-0">›</span>
                      {b}
                    </li>
                  ) : (
                    <li key={b.heading} className="text-sm text-[#3c3e3f] leading-relaxed">
                      <div className="flex gap-2">
                        <span className="text-[#1183D0] mt-1 shrink-0">›</span>
                        <span className="font-inter font-semibold text-[#0e2951]">
                          {b.heading}
                        </span>
                      </div>
                      <ul className="mt-2 space-y-2 pl-5">
                        {b.items.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-[#3c3e3f] leading-relaxed">
                            <span className="text-[#1183D0] mt-1 shrink-0">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {job.tags.map((t) => <Tag key={t} label={t} />)}
              </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills & Education */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        <Card className="overflow-hidden rounded-[36px] border border-white/60 bg-[linear-gradient(135deg,rgba(247,241,249,0.78)_0%,rgba(243,247,255,0.82)_38%,rgba(255,248,241,0.76)_100%)] p-0 py-0 shadow-[0_24px_64px_rgba(31,53,94,0.10)]">
          <CardContent className="px-6 py-10 sm:px-8 lg:px-12 lg:py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading eyebrow="Capabilities" title="Skills" />
              <div className="mt-8 flex flex-col gap-8">
                {skills.map((group) => (
                  <div key={group.category}>
                    <button
                      type="button"
                      onClick={() => toggleSkillGroup(group.category)}
                      className="flex w-full items-center justify-between gap-4 text-left"
                      aria-expanded={!collapsedSkillGroups[group.category]}
                    >
                      <h3 className="text-[15px] font-semibold text-[#1f2f3d]">
                        {group.category}
                      </h3>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`shrink-0 text-[#1183D0] transition-transform ${
                          collapsedSkillGroups[group.category] ? "-rotate-90" : "rotate-0"
                        }`}
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {!collapsedSkillGroups[group.category] ? (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {group.items.map((item) => (
                          <Badge key={item} size="tag">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Training" title="Education" />
              <div className="mt-8 flex flex-col gap-5">
                {education.map((edu) => (
                  <Card key={edu.degree} className="rounded-[28px] border border-white/60 bg-white/72 p-0 py-0 shadow-[0_14px_36px_rgba(31,53,94,0.06)]">
                    <CardContent className="px-6 py-6">
                    <Badge size="tag">
                      {edu.year}
                    </Badge>
                    <h3 className="mt-4 text-[18px] font-semibold text-[#111827]">
                      {edu.degree}
                    </h3>
                    <p className="mt-2 text-base text-[#3c3e3f]">{edu.school}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-10">
                <SectionHeading eyebrow="Stack" title="Tools" />
                <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4">
                  {tools.map((tool) => (
                    <div key={tool.label} className="flex flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/70 bg-white/82 shadow-[0_10px_24px_rgba(31,53,94,0.06)]">
                        <Image src={tool.src} alt={tool.label} width={26} height={26} />
                      </div>
                      <span className="mt-2 text-xs font-medium text-[#3c3e3f]">
                        {tool.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </CardContent>
        </Card>
      </section>

      {/* Certifications */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading eyebrow="Recognition" title="Certifications" />
            <div className="mt-8 flex items-center gap-5">
              <Image
                src={withBasePath("/images/OiSjn.png")}
                alt="NN Group UX Certified Interaction Design"
                width={38}
                height={54}
                className="h-auto w-[30px] sm:w-[38px]"
                style={{ height: "auto" }}
              />
              <div>
                <h3 className="text-[18px] font-semibold text-[#0e2951] sm:text-[20px]">
                  NN/Group UX Certification — Interaction Design
                </h3>
                <p className="mt-1 text-base text-[#5c7792]">UX Certified Professional</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-5">
              {certifications.map((item) => (
                <Card key={`${item.year}-${item.title}`} className="rounded-[30px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.82)_0%,rgba(247,251,255,0.76)_100%)] p-0 py-0 shadow-[0_16px_40px_rgba(31,53,94,0.07)]">
                  <CardContent className="p-6">
                  <Badge size="tag">
                    {item.year}
                  </Badge>
                  <h3 className="mt-4 text-[18px] font-semibold text-[#0e2951]">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#5c7792]">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:pt-[92px]">
            {featuredCredentials.map((credential) => {
              const CardWrapper = ({ children }: { children: React.ReactNode }) =>
                "href" in credential ? (
                  <a
                    href={(credential as { href: string }).href}
                    target="_blank"
                    rel="noreferrer"
                    key={credential.title}
                    className="block rounded-[30px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.82)_0%,rgba(247,251,255,0.78)_100%)] text-center shadow-[0_18px_42px_rgba(31,53,94,0.08)] transition-all hover:-translate-y-1 hover:opacity-95"
                  >
                    <CardContent className="px-8 py-8">{children}</CardContent>
                  </a>
                ) : (
                  <Card
                    key={credential.title}
                    className="rounded-[30px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.82)_0%,rgba(247,251,255,0.78)_100%)] p-0 py-0 text-center shadow-[0_18px_42px_rgba(31,53,94,0.08)]"
                  >
                    <CardContent className="px-8 py-8">{children}</CardContent>
                  </Card>
                );
              return (
              <CardWrapper key={credential.title}>
                {credential.type === "image" ? (
                  credential.image === withBasePath("/images/coursera.svg") ||
                  credential.image === withBasePath("/images/coderhouse.jpeg") ? (
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e7f1fd]">
                      <Image
                        src={credential.image}
                        alt={credential.alt!}
                        width={54}
                        height={54}
                        className={`h-[54px] w-[54px] object-contain ${
                          credential.image === withBasePath("/images/coderhouse.jpeg") ? "mix-blend-multiply" : ""
                        }`}
                      />
                    </div>
                  ) : (
                    <Image
                      src={credential.image!}
                      alt={credential.alt!}
                      width={92}
                      height={92}
                      className="mx-auto h-auto w-[72px] sm:w-[92px]"
                    />
                  )
                ) : (
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e7f1fd]">
                    {"icon" in credential && credential.icon === "cap" ? (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="1.8" aria-hidden="true">
                        <path d="m2 9 10-5 10 5-10 5Z" />
                        <path d="M6 11.5v4.2c0 1.2 2.7 2.8 6 2.8s6-1.6 6-2.8v-4.2" />
                      </svg>
                    ) : (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="1.8" aria-hidden="true">
                        <path d="m8 8-4 4 4 4" />
                        <path d="m16 8 4 4-4 4" />
                      </svg>
                    )}
                  </div>
                )}
                <h3 className="mt-6 text-[18px] font-semibold text-[#0e2951]">{credential.title}</h3>
                <p className="mt-3 text-[15px] font-semibold text-[#1183D0]">{credential.subtitle}</p>
                <p className="mx-auto mt-4 max-w-[430px] text-[15px] leading-relaxed text-[#5c7792]">
                  {credential.description}
                </p>
                <Badge className="mt-6" size="tag">
                  {credential.year}
                </Badge>
              </CardWrapper>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mt-10">
        <SiteFooter />
      </div>
    </main>
  );
}

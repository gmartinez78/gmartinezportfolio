"use client";

import { useState } from "react";
import Image from "next/image";
import { ResumeDetailCard } from "../../components/resume-detail-card";
import { ResumeExperienceCard } from "../../components/resume-experience-card";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, cardVariants } from "../../components/ui/card";
import { Container } from "../../components/ui/container";
import { Heading } from "../../components/ui/heading";
import { SectionHeading } from "../../components/ui/section-heading";
import { resolveCertificationLogo, resolveToolIcon, usePublicSiteContent } from "../../lib/cms/public";
import { withBasePath } from "../../lib/site";
import { useTranslate } from "../../lib/i18n/use-translate";
import { cn } from "../../lib/utils";

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

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Sr. Product Designer",
    company: "ITX Corp | Client: Paychex (Nayya, Flock, E-Verify, Indeed)",
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
          { text: "Define design strategy, vision, and roadmap for several major, ambiguous products", bold: true },
          { text: " using " },
          { text: "Jira and Confluence", bold: true },
          { text: "." },
        ],
      },
      {
        segments: [
          { text: "Take full " },
          { text: "ownership of multiple product initiatives", bold: true },
          { text: " simultaneously, making clear design decisions and presenting product enhancements regularly to senior stakeholders with a clear rationale, handling feedback, and pushing back when needed." },
        ],
      },
      {
        segments: [
          { text: "Build and implement scalable React-based design systems with " },
          { text: "reusable UX patterns and components", bold: true },
          { text: ", identifying design debt and consolidating duplicates to improve consistency across products. Create documentation, best practices, and usage guidelines to support cross-team adoption." },
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
          { text: "Produce wireframes, mockups, and interactive prototypes", bold: true },
          { text: " using Balsamiq, Figma AI, and Framer. Use Copilot, Lovable, Claude, and ChatGPT to synthesize research, generate early concepts, and prototype quickly, helping the team validate and refine experiences faster." },
        ],
      },
      {
        segments: [
          { text: "Launch AI-powered features (LLMs), improving user decision-making during enrollment, framing problems effectively by aligning users' goals, key tasks, constraints, success criteria, and business goals prior to execution.", bold: true },
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
    tags: ["B2C SaaS", "AI Features", "Design Systems", "Research", "React.js"],
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
    tags: ["Streaming", "LATAM", "UX Research", "Prototyping", "UI Design"],
  },
  {
    role: "UX/UI Designer",
    company: "Elevation | Web Solutions for Nonprofits",
    period: "Jan. 2017, Feb. 2019",
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
    period: "Feb. 2014, Feb. 2017",
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
    year: "2014, 2015",
  },
  {
    degree: "Bachelor's in Graphic Design",
    school: "URBE",
    year: "2012, 2015",
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

export default function ResumePage() {
  const [collapsedSkillGroups, setCollapsedSkillGroups] = useState<Record<string, boolean>>({});
  const translate = useTranslate();
  const { siteContent } = usePublicSiteContent();
  const resume = siteContent.resume;
  const experience = resume.experience.length
    ? resume.experience.map((job) => ({
        role: job.title,
        company: job.client ? `${job.company} | ${translate("resume.clientLabel")}: ${job.client}` : job.company,
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
  const heroBio = resume.bio.replace(/^Senior Product Designer with/, "With");
  const heroTitle = resume.title
    .replace("Senior Product Designer", "Sr. Product Designer")
    .replace(" | Enterprise SaaS", "");
  const resumeHighlights = [
    { label: "Experience", value: "10+", detail: "Years designing digital products", className: "bg-[#dceeff] text-[#141114]" },
    { label: "Platform scale", value: "2.3M", detail: "Users supported across HR products", className: "bg-[#f8df36] text-[#141114]" },
    { label: "Form completion", value: "35%", detail: "Less time to complete I-9 forms", className: "bg-[#d8d3ff] text-[#141114]" },
    { label: "Processing time", value: "72%", detail: "Less benefits processing time", className: "bg-[#0e2951] text-white" },
  ];

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
      <section className="relative bg-[#1183D0]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-[16rem] -left-28 size-[34rem] rounded-full border-[6rem] border-[#54aae0]/85" />
      </div>
      <Container size="wide" className="relative z-10 px-6 pb-10 pt-[10px]">
        <div className="sticky top-[88px] z-40 mb-6 flex items-center justify-between gap-4 py-3 lg:top-0">
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {translate("resume.downloadResume")}
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
            <p className="mt-8 max-w-[680px] text-lg font-normal leading-[1.8] text-white/85 sm:text-xl">
              {heroBio}
            </p>
          </div>
          <div className="grid translate-y-16 grid-cols-2 gap-4 lg:translate-x-12 lg:translate-y-32">
            {resumeHighlights.map((highlight) => (
              <article key={highlight.label} className={`flex min-h-[160px] flex-col justify-between rounded-[20px] p-5 shadow-[0_14px_28px_rgba(14,41,81,0.12)] sm:min-h-[190px] sm:p-7 ${highlight.className}`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-75">{highlight.label}</p>
                <strong className="text-[clamp(2.8rem,5vw,4.6rem)] font-semibold leading-none tracking-[-0.07em]">{highlight.value}</strong>
                <p className="max-w-[160px] text-sm leading-[1.35] opacity-85 sm:text-[15px]">{highlight.detail}</p>
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
            <p className="mt-6 max-w-[700px] text-xl leading-[1.8] tracking-[-0.02em] text-[#141114] sm:text-2xl">
              <strong className="font-semibold">Double Diamond design thinking</strong> guides the work: simplifying complex workflows, clarifying <strong className="font-semibold">information architecture</strong>, and building <strong className="font-semibold">reusable systems</strong>. Content-rich, data-heavy experiences are structured with scalable hierarchy and interaction patterns, in partnership with product and engineering to define success, strengthen implementation, and <strong className="font-semibold">reduce design debt</strong>.
            </p>
            <div className="mt-10 flex flex-wrap items-start gap-10 sm:gap-14">
              <a
                href="https://www.upwork.com/freelancers/greddysmartinez"
                target="_blank"
                rel="noreferrer"
                className="flex max-w-[180px] flex-col items-start text-left transition-opacity hover:opacity-80"
              >
                <Image
                  src={withBasePath("/images/iNSrn.png")}
                  alt="Upwork Skill Certification"
                  width={110}
                  height={110}
                  className="h-auto w-[92px] sm:w-[110px]"
                />
                <p className="mt-3 text-[15px] font-medium leading-snug text-[#141114]">
                  {translate("resume.upworkCertifiedLabel")}
                </p>
                <p className="mt-1 text-[15px] font-medium leading-snug text-[#5c7792]">
                  {translate("resume.userInterfaceDesign")}
                </p>
              </a>
              <div className="flex max-w-[180px] flex-col items-start text-left">
                <Image
                  src={withBasePath("/images/OiSjn.png")}
                  alt="NN Group UX Certified Interaction Design"
                  width={110}
                  height={154}
                  className="h-auto w-[92px] sm:w-[110px]"
                  style={{ height: "auto" }}
                />
                <p className="mt-3 text-[15px] font-medium leading-snug text-[#141114]">
                  {translate("resume.nnGroupCertifiedLabel")}
                </p>
                <p className="mt-1 text-[15px] font-medium leading-snug text-[#5c7792]">
                  {translate("resume.interactionDesign")}
                </p>
              </div>
            </div>
          </div>
          </div>
      </Container>

      <Container as="section" size="wide" aria-label={translate("resume.contactDetails")} className="px-6 py-8 md:py-10">
        <div className="grid overflow-hidden rounded-[24px] border border-[#d7e7f5] bg-[#d7e7f5] gap-px md:grid-cols-2">
          <a href={`mailto:${resume.email}`} className="group bg-[#fbfdff] p-7 transition-colors hover:bg-[#f2f8fd] sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1183D0]">{translate("resume.emailLabel")}</span>
            <span className="mt-2 block break-words text-xl font-semibold leading-tight tracking-[-0.035em] text-[#141114] transition-colors group-hover:text-[#1183D0] sm:text-2xl">{resume.email}</span>
          </a>
          <div className="bg-[#fbfdff] p-7 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1183D0]">{translate("resume.locationLabel")}</span>
            <span className="mt-2 block text-xl font-semibold leading-tight tracking-[-0.035em] text-[#141114] sm:text-2xl">{resume.location}</span>
          </div>
          <a href={`https://${resume.website}`} target="_blank" rel="noreferrer" className="group bg-[#fbfdff] p-7 transition-colors hover:bg-[#f2f8fd] sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1183D0]">{translate("resume.portfolioLabel")}</span>
            <span className="mt-2 block break-words text-xl font-semibold leading-tight tracking-[-0.035em] text-[#141114] transition-colors group-hover:text-[#1183D0] sm:text-2xl">{resume.website}</span>
          </a>
          <a href={`https://${resume.linkedin}`} target="_blank" rel="noreferrer" className="group bg-[#fbfdff] p-7 transition-colors hover:bg-[#f2f8fd] sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1183D0]">{translate("resume.linkedinLabel")}</span>
            <span className="mt-2 block break-words text-xl font-semibold leading-tight tracking-[-0.035em] text-[#141114] transition-colors group-hover:text-[#1183D0] sm:text-2xl">{resume.linkedin}</span>
          </a>
        </div>
      </Container>

      {/* Experience */}
      <Container as="section" size="wide" className="px-6 py-10">
        <div className="mb-8 flex flex-col items-start gap-3 px-6 sm:px-7">
          <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--ui-color-brand-primary)]">
            <span aria-hidden="true" className="size-2 rounded-full bg-[var(--ui-color-brand-primary)]" />
            {translate("resume.careerEyebrow")}
          </p>
          <Heading
            as="h2"
            variant="section"
            className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.055em] text-[var(--ui-color-text-editorial)]"
          >
            {translate("resume.experienceHeading")}
          </Heading>
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
            />
          ))}
        </div>
      </Container>

      {/* Skills & Education */}
      <Container as="section" size="wide" className="px-6 py-10">
        <Card variant="editorial" className="overflow-hidden rounded-[36px] p-0 py-0">
          <CardContent className="px-6 py-10 sm:px-8 lg:px-12 lg:py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading eyebrow={translate("resume.capabilitiesEyebrow")} title={translate("resume.skillsHeading")} />
              <div className="mt-8 flex flex-col gap-8">
                {skills.map((group) => (
                  <div key={group.category}>
                    <button
                      type="button"
                      onClick={() => toggleSkillGroup(group.category)}
                      className="flex w-full items-center justify-between gap-4 text-left"
                      aria-expanded={!collapsedSkillGroups[group.category]}
                    >
                      <Heading as="h3" variant="card" className="text-[15px] text-[#1f2f3d]">
                        {group.category}
                      </Heading>
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
              <SectionHeading eyebrow={translate("resume.trainingHeading")} title={translate("resume.educationEyebrow")} />
              <div className="mt-8 flex flex-col gap-5">
                {education.map((edu) => (
                  <ResumeDetailCard
                    key={edu.degree}
                    badge={edu.year}
                    title={edu.degree}
                    description={edu.school}
                    className="rounded-[28px] border border-white/60 bg-white/72 shadow-[0_14px_36px_rgba(31,53,94,0.06)]"
                    contentClassName="px-6 py-6"
                    titleClassName="text-[#111827]"
                    descriptionClassName="text-base text-[var(--ui-color-text-body)]"
                  />
                ))}
              </div>

              <div className="mt-10">
                <SectionHeading eyebrow={translate("resume.stackEyebrow")} title={translate("resume.toolsHeading")} />
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
      </Container>

      {/* Certifications */}
      <Container as="section" size="wide" className="px-6 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading eyebrow={translate("resume.recognitionHeading")} title={translate("resume.certificationsEyebrow")} />
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
                <Heading as="h3" variant="card" className="text-[18px] text-[#0e2951] sm:text-[20px]">
                  NN/Group UX Certification, Interaction Design
                </Heading>
                <p className="mt-1 text-base text-[#5c7792]">{translate("resume.uxCertifiedProfessional")}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-5">
              {certifications.map((item) => (
                <ResumeDetailCard
                  key={`${item.year}-${item.title}`}
                  badge={item.year}
                  title={item.title}
                  description={item.description}
                />
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
                    className={cn(
                      cardVariants({ variant: "glass" }),
                      "block rounded-[30px] py-0 text-center transition-all hover:-translate-y-1 hover:opacity-95"
                    )}
                  >
                    <CardContent className="px-8 py-8">{children}</CardContent>
                  </a>
                ) : (
                  <Card
                    key={credential.title}
                    variant="glass"
                    className="rounded-[30px] p-0 py-0 text-center"
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
                <Heading as="h3" variant="card" className="mt-6 text-[18px] text-[#0e2951]">{credential.title}</Heading>
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
      </Container>

      <div className="mt-10">
        <SiteFooter />
      </div>
    </main>
  );
}

"use client";

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
      "Shipping complex B2C SaaS workflows across Payroll, HR, Hiring, benefits, insurance, and retirement platforms (Fintech).",
      "Redesigning form flows based on research findings from user interviews, usability tests, and assisted testing, reducing completion time by 35%.",
      "Reducing support tickets by 500+ and support call volume by 9,000+ calls per year through redesigned HR and hiring flows.",
      "Designing and launching AI-powered features that improve user decision-making during enrollment.",
      "Crafting product briefs, user-centric SWOTs, problem statements, competitor benchmarks, mood boards, and rapid prototypes that set criteria for the next product stage.",
      "Contributing to exceeding the annual enrollment goal by 5,500 users by simplifying workflows.",
      "Applying accessibility and usability standards in non-design-led environments for data visualization.",
      "Making end-to-end design decisions for an enterprise HR platform with 2.3 million users, actively prioritizing in cross-functional reviews.",
      "Building design systems using React.js components, ensuring consistency on mobile and desktop.",
      "Partnering with Product and Engineering to align UX strategy and delivery using Miro as a dashboard.",
      "Using AI tools like Copilot, Lovable, Claude, and ChatGPT throughout the workflow to synthesize research, generate early concepts, and prototype quickly.",
      "Designing for operational users in fast-moving, high-stakes environments with a focus on reducing cognitive load and driving engagement.",
      "Taking ownership of design decisions, presenting work regularly to senior stakeholders with clear rationale, handling feedback constructively, and pushing back when needed.",
      "Acting as Staff Designer by producing wireframes, design mockups, and interactive prototypes, while defining design strategy, vision, and roadmap for major ambiguous products.",
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
      {
        heading: "Resoluto C.A. - Notable Projects: Social media campaigning — UX/UI design for Tech / Full-service Tech company, Venezuela market — B2C product ecosystem",
        items: [
          "Developed engaging social media campaigns that enhanced brand visibility.",
          "Created wireframes and prototypes for innovative projects, ensuring user-centric design.",
          "Redesigned outdated websites to improve user experience and modernize aesthetics.",
          "Designed a variety of marketing materials, including logos, business cards, and brochures.",
        ],
      },
      {
        heading: "Ultimate Design Solutions - Notable Projects: Multi-client branding & digital design — UX/UI / Graphic Design for Full-service Design Agency — USA market — B2C product ecosystem",
        items: [
          "Designed wireframes and mockups for various projects, enhancing user experience and visual appeal.",
          "Developed new logos and branding materials, including business cards, banners, and posters, to strengthen brand identity.",
          "Improved social media posts and campaigns, increasing engagement and visibility for clients.",
        ],
      },
      {
        heading: "Belua Vzla — UX/UI / Graphic Design for Fashion / Lifestyle brand — Venezuela & Spain market — B2C product ecosystem",
        items: [
          "Designed wireframes and mockups for new projects, enhancing user experience and visual appeal.",
          "Improved social media posts and campaigns, increasing brand visibility and audience engagement.",
          "Developed new logos and branding materials to strengthen brand identity and market positioning.",
          "Created business cards, banners, and posters to support marketing and promotional efforts.",
          "Updated e-commerce design to improve the online shopping experience and drive conversions.",
          "Designed large-format advertising materials (tarpaulins/ads) to boost offline brand visibility.",
        ],
      },
      {
        heading: "La Bodega — UX/UI / Graphic Design for Retail — Ecuador market — B2C product ecosystem",
        items: [
          "Edited and optimized product visuals for e-commerce, ensuring compelling and consistent presentation.",
          "Updated website banners to reflect current promotions and maintain brand consistency.",
          "Improved social media posts and campaigns, increasing brand visibility and customer engagement.",
          "Created ads using Google Ads to drive traffic and boost online sales.",
          "Coded HTML/CSS for websites and digital projects independently.",
        ],
      },
      {
        heading: "Delicious Frozen — UX/UI / Graphic Design for Restaurant / Food chain — Colombia market — B2C product ecosystem",
        items: [
          "Built the new brand from scratch, establishing a strong and recognizable visual identity.",
          "Researched brands within the industry niche to inform strategic design decisions.",
          "Created a brand logo & tagline, including logo sizing and placement, color palette, typography, iconography, and photography/image style.",
          "Formed the brand voice to ensure consistent and authentic communication across all touchpoints.",
        ],
      },
      {
        heading: "Sportive — UX/UI / Graphic Design for Sports / E-commerce brand — Spain market — B2C product ecosystem",
        items: [
          "Updated website banners to support campaigns and maintain a fresh, engaging digital storefront.",
          "Improved social media posts and campaigns to boost brand visibility and community engagement.",
          "Designed social media strategy to align content with brand goals and audience growth.",
          "Edited and optimized product visuals for e-commerce, ensuring a consistent and compelling shopping experience.",
        ],
      },
      {
        heading: "Shoptana — UX/UI / Graphic Design for Online Marketplace — Ecuador market — B2C product ecosystem",
        items: [
          "Updated website banners to reflect current offers and maintain a cohesive visual identity.",
          "Improved social media posts and campaigns, increasing platform visibility and user engagement.",
          "Edited and optimized product listings and visuals to enhance the online shopping experience.",
        ],
      },
      {
        heading: "Tivia Store — Web / UX Design for Artisanal E-commerce platform — Venezuela market — B2C product ecosystem",
        items: [
          "Built the new brand from scratch, defining a visual identity that reflected the artisanal and local essence of the business.",
          "Researched brands within the industry niche to inform strategic and differentiated design decisions.",
          "Created a brand logo & tagline, including logo sizing and placement, color palette, typography, iconography, and photography/image style.",
          "Formed the brand voice to ensure authentic and consistent communication across all touchpoints.",
          "Developed wireframes and prototypes to guide the design of the new website.",
          "Designed the new website to deliver an intuitive and visually engaging user experience.",
        ],
      },
      {
        heading: "Pro Ideas Web - Notable Projects: Multi-client digital projects — UX/UI / Graphic Design for Full-service Digital Agency — Mexico market — B2B product ecosystem",
        items: [
          "Updated website banners to support ongoing client campaigns and ensure visual consistency.",
          "Improved social media posts and campaigns, driving engagement and increasing brand awareness for clients.",
          "Designed new social media strategies aligned with each client's business goals and target audience.",
          "Edited and optimized product visuals for e-commerce to enhance online performance and conversion.",
        ],
      },
    ],
    tags: ["Freelance", "Branding", "E-commerce", "Social Media", "HTML/CSS"],
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
    type: "icon" as const,
    icon: "cap",
    title: "User Interface Design",
    subtitle: "University of Minnesota - COURSERA",
    description:
      "Comprehensive course covering user interface design principles, visual hierarchy, typography, and responsive design patterns.",
    year: "2018",
  },
  {
    type: "icon" as const,
    icon: "code",
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

  return (
    <main className="bg-[#F0F7FF] text-[#3c3e3f] overflow-x-hidden min-h-screen">
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
            variant="outline"
            size="sm"
            className="shrink-0"
          >
            <a href={withBasePath("/documents/greddys-martinez-resume-2026.pdf")} download>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF
            </a>
          </Button>
        </div>
        <div className="relative overflow-hidden px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0e2951]">Resume</span>
            <div className="mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#1183D0] to-[#0e2951] text-4xl font-serif-display italic font-bold text-white shadow-[0_18px_45px_rgba(17,131,208,0.22)] ring-8 ring-white/70">
              G
            </div>
            <h1 className="mt-8 text-5xl font-serif-display italic leading-[0.95] text-[#0e2951] sm:text-6xl lg:text-7xl">
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
            <div className="mt-8 h-1 w-20 rounded-full bg-[#1183D0]" />
            <p className="mt-8 max-w-4xl text-lg leading-relaxed text-[#243746]">
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
        <SectionHeading eyebrow="Career" title="Experience" className="mb-8" />
        <div className="flex flex-col gap-5">
          {experience.map((job) => (
            <Card key={job.role} className="p-0 py-0">
              <CardContent className="p-6">
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
                        <span className="font-serif-display italic font-semibold text-[#0e2951]">
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
        <Card className="bg-[#F0F7FF] p-0 py-0">
          <CardContent className="px-6 py-10 sm:px-8 lg:px-12 lg:py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading eyebrow="Capabilities" title="Skills" />
              <div className="mt-8 flex flex-col gap-8">
                {skills.map((group) => (
                  <div key={group.category}>
                    <h3 className="text-[15px] font-semibold text-[#1f2f3d]">
                      {group.category}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {group.items.map((item) => (
                        <Badge key={item} size="tag">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Training" title="Education" />
              <div className="mt-8 flex flex-col gap-5">
                {education.map((edu) => (
                  <Card key={edu.degree} className="p-0 py-0">
                    <CardContent className="px-6 py-6">
                    <Badge size="lg">
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
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
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
                <Card key={`${item.year}-${item.title}`} className="bg-[#f7fbff] p-0 py-0">
                  <CardContent className="p-6">
                  <Badge size="lg">
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
                    className="block rounded-[28px] border-2 border-[#CFE5F8] bg-[#f7fbff] text-center shadow-sm transition-opacity hover:opacity-80"
                  >
                    <CardContent className="px-8 py-8">{children}</CardContent>
                  </a>
                ) : (
                  <Card
                    key={credential.title}
                    className="bg-[#f7fbff] p-0 py-0 text-center"
                  >
                    <CardContent className="px-8 py-8">{children}</CardContent>
                  </Card>
                );
              return (
              <CardWrapper key={credential.title}>
                {credential.type === "image" ? (
                  <Image
                    src={credential.image!}
                    alt={credential.alt!}
                    width={92}
                    height={92}
                    className="mx-auto h-auto w-[72px] sm:w-[92px]"
                  />
                ) : (
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e7f1fd]">
                    {credential.icon === "cap" ? (
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
                <Badge className="mt-6" size="lg">
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

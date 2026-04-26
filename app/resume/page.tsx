import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const EXPERIENCE = [
  {
    role: "UX UI Designer / Manager",
    company: "Independence Blue Cross (IBX) · Philadelphia, PA",
    period: "2022 – Present",
    bullets: [
      "Led end-to-end UX for enterprise benefits enrollment platform used by 500k+ members.",
      "Managed a team of 3 designers, ran weekly critiques, and established a shared design system.",
      "Partnered with Product and Engineering to ship 4 major releases, including a self-service admin portal that reduced support tickets by 72%.",
      "Ran generative and evaluative research (interviews, usability tests, card sorts) to inform strategy.",
    ],
    tags: ["UX Strategy", "Design Systems", "Leadership", "Research"],
  },
  {
    role: "UX Designer",
    company: "Nayya · New York, NY (Remote)",
    period: "2020 – 2022",
    bullets: [
      "Designed AI-powered benefits recommendation flows for HR SaaS platform.",
      "Built and maintained a component library in Figma used across 2 product squads.",
      "Conducted 30+ user interviews to define MVP for a new employee onboarding experience.",
      "Collaborated closely with engineers to ensure pixel-accurate implementation.",
    ],
    tags: ["Product Design", "Figma", "User Research", "Prototyping"],
  },
  {
    role: "UX / UI Designer",
    company: "Easterseals · Chicago, IL (Remote)",
    period: "2018 – 2020",
    bullets: [
      "Redesigned the nonprofit's public-facing website and internal staff portal.",
      "Created accessible design solutions (WCAG 2.1 AA) for users with disabilities.",
      "Reduced task completion time for key donor flows by 40% through iterative testing.",
    ],
    tags: ["Accessibility", "Web Design", "Nonprofit"],
  },
  {
    role: "Head of Design",
    company: "Transport for Troops · Remote",
    period: "2016 – 2018",
    bullets: [
      "Established design practice from scratch for a veteran-focused logistics startup.",
      "Designed mobile app for ride coordination, reducing manual dispatcher workload by 60%.",
      "Created brand identity system including logo, typography, and marketing collateral.",
    ],
    tags: ["Brand Design", "Mobile", "Startup"],
  },
];

const SKILLS = [
  { category: "Design", items: ["UX Research", "Interaction Design", "Information Architecture", "Usability Testing", "Design Systems", "Prototyping", "Wireframing"] },
  { category: "Tools", items: ["Figma", "Framer", "Miro", "Jira", "Notion", "Zeplin", "Maze"] },
  { category: "Code", items: ["HTML / CSS", "Tailwind CSS", "React (basics)", "TypeScript (basics)"] },
  { category: "Soft Skills", items: ["Cross-functional collaboration", "Stakeholder communication", "Design critique", "Mentoring", "Agile / Scrum"] },
];

const EDUCATION = [
  {
    degree: "B.F.A. Graphic Design",
    school: "Universidad de las Artes · Guayaquil, Ecuador",
    year: "2013",
  },
  {
    degree: "UX Design Certificate",
    school: "Google / Coursera",
    year: "2020",
  },
];

const CERTIFICATIONS = [
  {
    name: "UX Certification – Interaction Design",
    issuer: "Nielsen Norman Group",
    year: "2023",
    color: "#1183D0",
  },
  {
    name: "Accessibility Specialist (WAS)",
    issuer: "IAAP",
    year: "2022",
    color: "#0e2951",
  },
  {
    name: "Google UX Design Professional Certificate",
    issuer: "Google / Coursera",
    year: "2020",
    color: "#34a853",
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#E0EEFB] text-[#1183D0]">
      {label}
    </span>
  );
}

export default function ResumePage() {
  return (
    <main className={`${playfair.variable} ${inter.variable} bg-[#F0F7FF] font-inter text-[#3c3e3f] overflow-x-hidden min-h-screen`}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[#bcd2ff]/60 h-16 px-12 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="font-playfair italic text-[#1183D0] text-xl font-medium">Logo</a>
          <ul className="flex items-center gap-1">
            {["Projects", "Resume", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase()}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${link === "Resume" ? "bg-[#1183D0]/10 text-[#1183D0]" : "text-[#1183D0] hover:bg-[#003d66]/5"}`}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a
          href="/contact"
          className="px-5 py-2 rounded-full bg-[#1183D0] text-white text-sm font-medium hover:bg-[#0e6fad] transition-colors"
        >
          Get in touch
        </a>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <a href="/" className="inline-flex items-center gap-2 text-[#5c7792] text-sm hover:text-[#1183D0] transition-colors mb-8">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Home
        </a>
        <div className="relative overflow-hidden px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
          <a
            href="#"
            className="absolute right-6 top-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-[#1183D0] bg-white/90 px-5 py-2.5 text-sm font-medium text-[#1183D0] shadow-sm transition-colors hover:bg-[#1183D0] hover:text-white sm:right-10 sm:top-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF
          </a>
          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0e2951]">Resume</span>
            <div className="mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#1183D0] to-[#0e2951] text-4xl font-playfair italic font-bold text-white shadow-[0_18px_45px_rgba(17,131,208,0.22)] ring-8 ring-white/70">
              G
            </div>
            <h1 className="mt-8 text-5xl font-playfair italic leading-[0.95] text-[#0e2951] sm:text-6xl lg:text-7xl">
              Greddys Martínez
            </h1>
            <p className="mt-5 text-xl font-medium text-[#1f2f3d] sm:text-2xl">
              Senior Product Designer | AI-Driven UX | Enterprise SaaS
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-[#24425d] sm:text-base">
              <span className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                greddysmartinez5@gmail.com
              </span>
              <span className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="2" aria-hidden="true"><path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z"/><circle cx="12" cy="11" r="2.5"/></svg>
                Malaga, Spain
              </span>
              <span className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9Z"/></svg>
                www.be.net/greddysmartinez
              </span>
              <span className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="2" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                linkedin.com/in/greddysmartinez
              </span>
            </div>
            <div className="mt-8 h-1 w-20 rounded-full bg-[#1183D0]" />
            <p className="mt-8 max-w-4xl text-lg leading-relaxed text-[#243746]">
              Senior Product Designer with 10+ years of experience certified in User Experience with recognition in interaction design by the NN/Group. Designing enterprise B2B experiences across FinTech, HR, and HealthTech. Strong focus on bridging strategy and execution, leading research, aligning cross-functional teams, and shipping high-impact solutions in Agile environments.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-playfair italic text-[#0e2951] mb-6">Experience</h2>
        <div className="flex flex-col gap-5">
          {EXPERIENCE.map((job) => (
            <div key={job.role} className="bg-white rounded-2xl p-7 shadow-sm border border-[#bcd2ff]/30">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-lg font-semibold text-[#0e2951]">{job.role}</h3>
                  <p className="text-sm text-[#5c7792] mt-0.5">{job.company}</p>
                </div>
                <span className="text-sm text-[#5c7792] shrink-0 bg-[#F0F7FF] px-3 py-1 rounded-full">{job.period}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {job.bullets.map((b) => (
                  <li key={b} className="text-sm text-[#3c3e3f] leading-relaxed flex gap-2">
                    <span className="text-[#1183D0] mt-1 shrink-0">›</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {job.tags.map((t) => <Tag key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Education */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          <div>
            <h2 className="text-2xl font-playfair italic text-[#0e2951] mb-6">Skills</h2>
            <div className="flex flex-col gap-4">
              {SKILLS.map((group) => (
                <div key={group.category} className="bg-white rounded-2xl p-5 shadow-sm border border-[#bcd2ff]/30">
                  <h3 className="text-xs font-semibold text-[#5c7792] uppercase tracking-wider mb-3">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="px-3 py-1 rounded-full text-sm bg-[#F0F7FF] text-[#3c3e3f]">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education + Certs */}
          <div>
            <h2 className="text-2xl font-playfair italic text-[#0e2951] mb-6">Education</h2>
            <div className="flex flex-col gap-4 mb-6">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="bg-white rounded-2xl p-5 shadow-sm border border-[#bcd2ff]/30">
                  <h3 className="font-semibold text-[#0e2951]">{edu.degree}</h3>
                  <p className="text-sm text-[#5c7792] mt-1">{edu.school}</p>
                  <p className="text-xs text-[#5c7792] mt-1">{edu.year}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-playfair italic text-[#0e2951] mb-4">Certifications</h2>
            <div className="flex flex-col gap-3">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.name} className="bg-white rounded-2xl p-5 shadow-sm border border-[#bcd2ff]/30 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{ background: cert.color }}>
                    {cert.issuer.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0e2951]">{cert.name}</h3>
                    <p className="text-xs text-[#5c7792] mt-0.5">{cert.issuer} · {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e2951] text-white/70 text-sm py-10 mt-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-playfair italic text-white text-lg">Greddys Martínez</span>
          <div className="flex gap-6">
            {["Home", "Projects", "Resume", "Contact"].map((l) => (
              <a key={l} href={l === "Home" ? "/" : `/${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <p>© 2025 · All rights reserved</p>
        </div>
      </footer>
    </main>
  );
}

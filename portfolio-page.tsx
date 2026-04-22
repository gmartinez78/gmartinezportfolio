import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Projects", "Resume", "Contact"];

const SOCIAL_PROOF_LOGOS = [
  { src: "/images/ibx.png", alt: "ibx" },
  { src: "/images/skill.png", alt: "Skill" },
  { src: "/images/nayya.png", alt: "Nayya" },
  { src: "/images/paychex.png", alt: "Paychex" },
];

const RECENT_WORK = [
  {
    dark: true,
    tag: "Nayya Integration",
    bullets: ["Desktop / Mobile / UX Design", "AI integration", "X improvement"],
    cta: "See all improvements ↗",
    img: "/images/nayya-preview.png",
  },
  {
    dark: false,
    tag: "Enhancing Benefits Enrollment",
    description:
      "Replaced a manual workflow with a centralized, self-managed platform; cutting processing time by 72%.",
    cta: "See all improvements ↗",
    img: "/images/benefits-preview.png",
  },
];

const PORTFOLIO_ITEMS = [
  { title: "Top Right App", tags: "UX · Mobile", col: "col-span-1" },
  { title: "Dashboard Redesign", tags: "Product · Web", col: "col-span-1" },
  { title: "Brandline App", tags: "Branding · UX", col: "col-span-1" },
  { title: "Analytics Platform", tags: "Data · Web", col: "col-span-1" },
  { title: "Transport for Gorge", tags: "Service Design", col: "col-span-1" },
  { title: "Marketplace App", tags: "iOS · UX", col: "col-span-1" },
  { title: "Studio Hub", tags: "Platform · UX", col: "col-span-1" },
  { title: "Enterprise Portal", tags: "B2B · SaaS", col: "col-span-1" },
];

const PORTFOLIO_GRADIENTS = [
  "from-[#0E2A50] to-[#1183D0]",
  "from-[#0A1628] to-[#0E2A50]",
  "from-[#1A3A6A] to-[#2E6BAE]",
  "from-[#0D2240] to-[#1565A0]",
  "from-[#0A1830] to-[#1183D0]",
  "from-[#1A3A6A] to-[#0E2A50]",
  "from-[#0A1628] to-[#1A3A6A]",
  "from-[#0D2240] to-[#2E6BAE]",
  "from-[#1565A0] to-[#0E2A50]",
  "from-[#0A1830] to-[#0E2A50]",
  "from-[#0E2A50] to-[#1183D0]",
];

const TOOLS_LEFT = [
  { label: "Figma", x: "left-[60px]", y: "top-[80px]", size: "lg" },
  { label: "Framer", x: "left-[170px]", y: "top-[40px]", size: "lg" },
  { label: "Miro", x: "left-[290px]", y: "top-[20px]", size: "lg" },
  { label: "React", x: "left-[100px]", y: "top-[230px]", size: "lg" },
  { label: "Node", x: "left-[60px]", y: "top-[332px]", size: "lg" },
  { label: "Python", x: "left-[190px]", y: "top-[346px]", size: "lg" },
  { label: "Swift", x: "left-[394px]", y: "top-[372px]", size: "lg" },
  { label: "TS", x: "left-[220px]", y: "top-[130px]", size: "sm" },
  { label: "Vue", x: "left-[350px]", y: "top-[120px]", size: "sm" },
  { label: "Go", x: "left-[282px]", y: "top-[234px]", size: "sm" },
  { label: "SQL", x: "left-[320px]", y: "top-[320px]", size: "sm" },
];

const TOOLS_RIGHT = [
  { label: "GitHub", x: "right-[300px]", y: "top-[20px]", size: "lg" },
  { label: "Slack", x: "right-[180px]", y: "top-[40px]", size: "lg" },
  { label: "AWS", x: "right-[70px]", y: "top-[80px]", size: "lg" },
  { label: "Vercel", x: "right-[50px]", y: "top-[230px]", size: "lg" },
  { label: "Docker", x: "right-[76px]", y: "top-[336px]", size: "lg" },
  { label: "Tailwind", x: "right-[194px]", y: "top-[372px]", size: "lg" },
  { label: "Next.js", x: "right-[386px]", y: "top-[384px]", size: "lg" },
  { label: "Rust", x: "right-[360px]", y: "top-[120px]", size: "sm" },
  { label: "Redis", x: "right-[168px]", y: "top-[256px]", size: "sm" },
  { label: "GPT", x: "right-[250px]", y: "top-[160px]", size: "sm" },
  { label: "GCP", x: "right-[270px]", y: "top-[340px]", size: "sm" },
];

const FOOTER_LINKS = ["Home", "Projects", "Resume", "Contact"];
const FOOTER_SOCIAL = ["LinkedIn", "Behance", "UpWork"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ToolBadge({
  label,
  x,
  y,
  size,
}: {
  label: string;
  x: string;
  y: string;
  size: "lg" | "sm";
}) {
  const base = size === "lg" ? "w-13 h-13 rounded-xl text-[9px]" : "w-11 h-11 rounded-[10px] opacity-70 text-[9px]";
  return (
    <div
      className={`absolute ${x} ${y} ${base} bg-[#E0EEFB] flex items-center justify-center shadow-sm text-[#3c3e3f] font-medium font-inter`}
    >
      {label}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  return (
    <main
      className={`${playfair.variable} ${inter.variable} bg-[#F0F7FF] font-inter text-[#3c3e3f] overflow-x-hidden`}
    >
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[#bcd2ff]/60 h-16 px-12 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="font-playfair italic text-[#1183D0] text-xl font-medium">
            Logo
          </span>
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="px-4 py-2 rounded-full text-[#1183D0] text-sm font-medium hover:bg-[#003d66]/5 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 text-[#1183D0]">
          <a href="#" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href="#" className="font-bold text-sm hover:opacity-70 transition-opacity">
            Bē
          </a>
          <a href="#" aria-label="Work" className="hover:opacity-70 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #D6ECFA 0%, #FFFFFF 100%)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-20 pt-16 pb-10 flex flex-col items-center gap-8">
          {/* Headline */}
          <div className="flex items-baseline gap-0">
            <span className="text-[52px] font-bold leading-[1.15] text-[#1183D0] font-inter">
              I am&nbsp;
            </span>
            <span className="text-[52px] font-semibold italic leading-[1.15] text-[#1183D0] font-playfair">
              Greddys
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-[17px] text-[#3c3e3f] leading-[1.6] text-center max-w-[681px]">
            a designer in AI Research &amp; Incubation.
          </p>

          {/* AI Search CTA */}
          <div
            className="flex items-center gap-4 rounded-full px-1.5 py-1.5 w-[380px]"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #E8F4FD 100%)",
              boxShadow: "0 4px 16px #1183D015",
              border: "1px solid",
              borderColor: "transparent",
              backgroundClip: "padding-box",
              outline: "1px solid #1183D020",
            }}
          >
            <div className="flex items-center gap-2.5 flex-1 bg-white rounded-full h-10 px-4 border border-gray-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1183D0" strokeWidth="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="text-[13px] text-gray-400">Ask AI anything about me...</span>
            </div>
            <button className="h-10 px-[18px] rounded-full text-[13px] font-semibold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #d60060, #a8004d)" }}>
              Ask
            </button>
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="border-t border-[#bcd2ff]/50 mx-0">
          <div className="max-w-[1440px] mx-auto px-20 h-[94px] flex items-center">
            <div className="w-[280px] shrink-0 flex items-center border-r border-[#00006e]/25 pr-10 h-full">
              <span className="text-[13px] font-semibold text-[#00006e]">
                Trusted by industry leaders
              </span>
            </div>
            <div className="flex items-center justify-between flex-1 px-10">
              {SOCIAL_PROOF_LOGOS.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 object-contain opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Recent Work ── */}
      <section id="projects" className="bg-[#F0F7FF] py-20 px-20">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
          {/* Section heading */}
          <div className="flex justify-center">
            <h2 className="font-playfair font-bold text-[36px] leading-[1.2] text-[#1183D0]">
              Recent Work
            </h2>
          </div>

          {/* Two case study cards */}
          <div className="flex gap-6">
            {/* Card 1 – Dark */}
            <div
              className="flex-1 rounded-[20px] p-7 flex flex-col gap-4 overflow-hidden shadow-[0_8px_24px_#00000018]"
              style={{ background: "linear-gradient(145deg, #091220 0%, #142840 50%, #1a3a5c 100%)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="font-playfair italic font-medium text-[18px] text-white">
                    Nayya Integration
                  </h3>
                  <ul className="text-[15px] leading-[1.3] text-white/90 space-y-0.5">
                    <li>- Desktop / Mobile / UX Design</li>
                    <li>- AI integration</li>
                    <li>- X improvement</li>
                  </ul>
                </div>
                <span className="text-[12px] text-white/80 shrink-0">See all improvements ↗</span>
              </div>
              <div className="rounded-xl overflow-hidden bg-white/5 flex items-center justify-center h-[239px]">
                <img
                  src="/images/nayya-preview.png"
                  alt="Nayya Integration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Card 2 – Light */}
            <div
              className="flex-1 rounded-[20px] p-7 flex flex-col gap-4 overflow-hidden shadow-[0_8px_24px_#00000018]"
              style={{ background: "radial-gradient(ellipse at 82% 50%, #b7daf1 11%, #e9f3fb 64%, #edf5fb 98%)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="font-playfair italic font-medium text-[18px] text-[#1183D0] max-w-[261px]">
                    Enhancing Benefits Enrollment
                  </h3>
                  <p className="text-[14px] leading-[1.3] text-[#3c3e3f] max-w-[352px]">
                    Replaced a manual workflow with a centralized, self-managed platform; cutting processing time by 72%.
                  </p>
                </div>
                <span className="text-[12px] text-[#3c3e3f] shrink-0">See all improvements ↗</span>
              </div>
              <div className="rounded-xl overflow-hidden flex items-center justify-center h-[264px]">
                <img
                  src="/images/benefits-preview.png"
                  alt="Benefits Enrollment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Full portfolio CTA row */}
          <div className="flex flex-col items-center gap-5 py-4">
            <h2 className="font-playfair font-bold text-[36px] leading-[1.2] text-[#1183D0] text-center">
              Full portfolio
            </h2>
            <p className="text-[16px] leading-[1.7] text-[#3c3e3f] text-center max-w-[680px]">
              Every component is engineered for performance from the start. Our architecture decisions ensure your product can grow seamlessly.
            </p>
            <button className="h-9 px-5 rounded-full bg-[#d60060] text-white text-[13px] font-medium hover:bg-[#b5004e] transition-colors">
              Case Study
            </button>
          </div>
        </div>
      </section>

      {/* ── Portfolio Mosaic ── */}
      <section
        className="w-full px-6 pb-6"
        style={{ background: "#F0F7FF" }}
      >
        <div
          className="rounded-[20px] p-6 flex gap-4 items-end"
          style={{ background: "#F0F7FF", maxWidth: 1440, margin: "0 auto" }}
        >
          {/* Col 1 */}
          <div className="flex flex-col gap-4" style={{ width: 420 }}>
            {[
              { title: "Top Right App", h: 280, g: "from-[#0E2A50] to-[#1183D0]" },
              { title: "Dashboard Redesign", h: 260, g: "from-[#0A1628] to-[#0E2A50]" },
              { title: "Brandline App", h: 200, g: "from-[#1A3A6A] to-[#2E6BAE]" },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-[10px] bg-gradient-to-br ${item.g} p-5 flex flex-col justify-end shadow-[0_8px_24px_#00000018] cursor-pointer hover:opacity-90 transition-opacity`}
                style={{ height: item.h }}
              >
                <span className="text-white/60 text-[11px] font-medium font-inter">Project</span>
                <span className="text-white text-[13px] font-semibold font-inter leading-snug">{item.title}</span>
              </div>
            ))}
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4 flex-1">
            {[
              { title: "Analytics Platform", h: 246, g: "from-[#0D2240] to-[#1565A0]" },
              { title: "Transport for Gorge", h: 236, g: "from-[#0A1830] to-[#1183D0]" },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-[10px] bg-gradient-to-br ${item.g} p-5 flex flex-col justify-end shadow-[0_8px_24px_#00000018] cursor-pointer hover:opacity-90 transition-opacity`}
                style={{ height: item.h }}
              >
                <span className="text-white/60 text-[11px] font-medium font-inter">Project</span>
                <span className="text-white text-[13px] font-semibold font-inter leading-snug">{item.title}</span>
              </div>
            ))}
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4 flex-1">
            {[
              { title: "Marketplace App", h: 319, g: "from-[#1A3A6A] to-[#0E2A50]" },
              { title: "Studio Hub", h: 200, g: "from-[#0A1628] to-[#1A3A6A]" },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-[10px] bg-gradient-to-br ${item.g} p-5 flex flex-col justify-end shadow-[0_8px_24px_#00000018] cursor-pointer hover:opacity-90 transition-opacity`}
                style={{ height: item.h }}
              >
                <span className="text-white/60 text-[11px] font-medium font-inter">Project</span>
                <span className="text-white text-[13px] font-semibold font-inter leading-snug">{item.title}</span>
              </div>
            ))}
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-4" style={{ width: 310 }}>
            {[
              { title: "Enterprise Portal", h: 214, g: "from-[#0D2240] to-[#2E6BAE]" },
              { title: "Design System", h: 211, g: "from-[#0A1830] to-[#0E2A50]" },
              { title: "AI Dashboard", h: 318, g: "from-[#0E2A50] to-[#1183D0]" },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-[10px] bg-gradient-to-br ${item.g} p-5 flex flex-col justify-end shadow-[0_8px_24px_#00000018] cursor-pointer hover:opacity-90 transition-opacity`}
                style={{ height: item.h }}
              >
                <span className="text-white/60 text-[11px] font-medium font-inter">Project</span>
                <span className="text-white text-[13px] font-semibold font-inter leading-snug">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Section ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #F0F7FF 0%, #DCEEFB 100%)",
          height: 453,
        }}
      >
        {/* Floating tool badges – left side */}
        {TOOLS_LEFT.map((t) => (
          <ToolBadge key={t.label} {...t} />
        ))}

        {/* Center block */}
        <div
          className="absolute flex flex-col items-center gap-3.5 text-center"
          style={{ left: "50%", transform: "translateX(-50%)", top: 80, width: 500 }}
        >
          <span className="text-[13px] font-medium tracking-[3px] text-[#0a1729] uppercase">
            Experience &amp; Skills
          </span>
          <h2
            className="font-playfair font-bold text-[48px] leading-[1.15] text-[#1183D0]"
            style={{ width: "100%" }}
          >
            Tools I Love
            <br />&amp; Work With
          </h2>
          <p className="text-[15px] leading-[1.6] text-[#3c3e3f] max-w-[409px]">
            I integrate seamlessly with the tools your team already uses, creating workflows that feel natural and efficient.
          </p>
          <button className="h-11 px-7 rounded-full bg-[#d60060] text-white text-[14px] font-medium flex items-center gap-2 hover:bg-[#b5004e] transition-colors">
            View My Resume <span>→</span>
          </button>
        </div>

        {/* Floating tool badges – right side */}
        {TOOLS_RIGHT.map((t) => (
          <ToolBadge key={t.label} {...t} />
        ))}
      </section>

      {/* ── CTA Section ── */}
      <section
        className="flex flex-col items-center justify-center gap-7 text-center px-30 py-25"
        style={{ background: "#0e2951" }}
      >
        <span className="text-[13px] font-medium tracking-[3px] text-[#7CB8E8] uppercase">
          Ready to Level Up?
        </span>
        <p className="text-[28px] leading-[1.5] text-[#A8C8E8] max-w-[800px]">
          Last quarter, my clients saw a 47% average increase in conversions.
        </p>
        <h2 className="font-playfair font-bold text-[40px] text-white">
          Your product deserves that too.
        </h2>
        <button className="h-13 px-9 rounded-full bg-white text-[#0b182c] text-[15px] font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors">
          Let&apos;s work together <span>→</span>
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#F0F7FF]">
        <div className="border-t border-[#C4DCF0]" />
        <div className="px-20 py-12 grid grid-cols-4 gap-15">
          {/* Col 1 – Brand */}
          <div className="flex flex-col gap-3">
            <span className="font-playfair font-bold text-[22px] text-[#1183D0]">Portfolio</span>
            <p className="text-[14px] leading-[1.6] text-[#3c3e3f] max-w-[280px]">
              Senior Product Designer crafting thoughtful digital experiences that make a difference.
            </p>
          </div>

          {/* Col 2 – Site Map */}
          <div className="flex flex-col gap-3.5">
            <span className="text-[14px] font-semibold text-[#1183D0]">Site Map</span>
            {FOOTER_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[14px] text-[#3c3e3f] hover:text-[#1183D0] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Col 3 – Connect */}
          <div className="flex flex-col gap-3.5">
            <span className="text-[14px] font-semibold text-[#1183D0]">Connect</span>
            {FOOTER_SOCIAL.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[14px] text-[#3c3e3f] hover:text-[#1183D0] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Col 4 – Newsletter */}
          <div className="flex flex-col gap-3.5">
            <span className="text-[14px] font-semibold text-[#1183D0]">Stay Up to Date</span>
            <p className="text-[14px] leading-[1.6] text-[#3c3e3f]">
              Get notifications about new case studies and design insights.
            </p>
            <a href="#" className="text-[14px] font-medium text-[#0e284b] hover:text-[#1183D0] transition-colors">
              Subscribe to newsletter →
            </a>
          </div>
        </div>

        <div className="border-t border-[#C4DCF0]" />

        {/* Bottom bar */}
        <div className="px-20 py-5 flex items-center justify-between">
          <span className="text-[13px] text-[#7A98B5]">© 2026 Portfolio. All rights reserved.</span>
          <div className="flex items-center gap-4 text-[#1183D0]">
            <a href="#" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" className="font-bold text-sm hover:opacity-70 transition-opacity">Bē</a>
            <a href="#" aria-label="Work" className="hover:opacity-70 transition-opacity">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

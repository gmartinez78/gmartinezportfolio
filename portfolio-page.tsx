import { Playfair_Display, Inter } from "next/font/google";
import Image from "next/image";
import { SiteFooter } from "./components/site-footer";
import { withBasePath } from "./lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const NAV_LINKS = ["Projects", "Resume", "Contact"];

const SOCIAL_PROOF_LOGOS = [
  { src: "/images/SNUZw.png", alt: "IBX", h: 41, w: 57 },
  { src: "/images/IbuV3.png", alt: "Skill", h: 59, w: 107 },
  { src: "/images/bBw3A.png", alt: "Nayya", h: 48, w: 127 },
  { src: "/images/c54fy.png", alt: "Paychex", h: 51, w: 142 },
];

const FILTER_PILLS = [
  { label: "Classic", active: true },
  { label: "Agile based", active: false },
  { label: "Product Prototype", active: false },
  { label: "Digital Prototype", active: false },
  { label: "Expert Reviews", active: false },
];

const TOOLS_LEFT = [
  { label: "Figma", x: "left-[60px]", y: "top-[80px]", size: "lg" as const, bg: "bg-white" },
  { label: "Framer", x: "left-[170px]", y: "top-[40px]", size: "lg" as const, bg: "bg-white" },
  { label: "Miro", x: "left-[290px]", y: "top-[20px]", size: "lg" as const, bg: "bg-white" },
  { label: "React", x: "left-[100px]", y: "top-[230px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Node", x: "left-[60px]", y: "top-[332px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Python", x: "left-[190px]", y: "top-[346px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Swift", x: "left-[394px]", y: "top-[372px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "TS", x: "left-[220px]", y: "top-[130px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "Vue", x: "left-[350px]", y: "top-[120px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "Go", x: "left-[282px]", y: "top-[234px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "SQL", x: "left-[320px]", y: "top-[320px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
];

const TOOLS_RIGHT = [
  { label: "GitHub", x: "right-[300px]", y: "top-[20px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Slack", x: "right-[180px]", y: "top-[40px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "AWS", x: "right-[70px]", y: "top-[80px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Vercel", x: "right-[50px]", y: "top-[230px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Docker", x: "right-[76px]", y: "top-[336px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Tailwind", x: "right-[194px]", y: "top-[372px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Next.js", x: "right-[386px]", y: "top-[384px]", size: "lg" as const, bg: "bg-[#E0EEFB]" },
  { label: "Rust", x: "right-[360px]", y: "top-[120px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "Redis", x: "right-[168px]", y: "top-[256px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "GPT", x: "right-[250px]", y: "top-[160px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
  { label: "GCP", x: "right-[270px]", y: "top-[340px]", size: "sm" as const, bg: "bg-[#E0EEFB]" },
];

function ToolBadge({
  label,
  x,
  y,
  size,
  bg,
}: {
  label: string;
  x: string;
  y: string;
  size: "lg" | "sm";
  bg: string;
}) {
  const base =
    size === "lg"
      ? "w-13 h-13 rounded-xl text-[9px]"
      : "w-11 h-11 rounded-[10px] opacity-70 text-[9px]";
  return (
    <div
      className={`absolute ${x} ${y} ${base} ${bg} flex items-center justify-center shadow-sm text-[#3c3e3f] font-medium font-inter`}
    >
      {label}
    </div>
  );
}

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
                  href={withBasePath(`/${link.toLowerCase()}`)}
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
        <div className="max-w-[1200px] mx-auto px-20 pt-16 pb-10 flex flex-col items-center gap-8 relative">
          {/* Certification badges */}
          <div className="absolute right-12 top-10 flex flex-col items-center gap-2">
            <span className="text-[12px] text-[#5c7792]">Certified by</span>
            <div className="flex items-center gap-4">
              <Image
                src="/images/iNSrn.png"
                alt="Upwork Certification"
                width={80}
                height={80}
                className="rounded-lg"
              />
              <Image
                src="/images/OiSjn.png"
                alt="NN/g UX Certification"
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Headline */}
          <div className="flex flex-col items-center gap-0">
            <span className="text-[52px] font-bold leading-[1.15] text-[#4a4a4a] font-inter">
              I am{" "}
            </span>
            <span className="text-[52px] font-semibold italic leading-[1.15] text-[#4a4a4a] font-playfair text-center">
              Greddys Martinez
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-[17px] text-[#3c3e3f] leading-[1.6] text-center max-w-[681px]">
            a designer in AI Research &amp; UX / UI.
          </p>

          {/* Filter pills */}
          <div className="flex items-center gap-2">
            {FILTER_PILLS.map((pill) => (
              <span
                key={pill.label}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  pill.active
                    ? "bg-[#1183D0] text-white"
                    : "bg-[#EBF5FF] text-[#1183D0] hover:bg-[#D6ECFA]"
                }`}
              >
                {pill.label}
              </span>
            ))}
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="border-t border-[#bcd2ff]/50 mx-0">
          <div className="max-w-[1200px] mx-auto px-20 h-[94px] flex items-center">
            <div className="w-[280px] shrink-0 flex items-center border-r border-[#00006e]/25 pr-10 h-full">
              <span className="text-[13px] font-semibold text-[#3c3e3f]">
                Trusted by industry leaders
              </span>
            </div>
            <div className="flex items-center justify-between flex-1 px-10">
              {SOCIAL_PROOF_LOGOS.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  className="object-contain opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Recent Work ── */}
      <section id="projects" className="bg-white py-12 px-20">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-12">
          <h2 className="font-playfair italic text-[36px] leading-[1.2] text-[#1183D0]">
            Recent Work
          </h2>

          {/* Three case study cards */}
          <div className="flex gap-6 justify-center">
            {/* Card 1 – Benefits (Light) */}
            <a
              href={withBasePath("/benefits")}
              className="w-[400px] rounded-[20px] p-7 flex flex-col gap-4 overflow-hidden shadow-[0_8px_24px_#00000018] group cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-[0_16px_40px_#00000025]"
              style={{
                background:
                  "radial-gradient(ellipse at 82% 50%, #b7daf1 11%, #e9f3fb 64%, #edf5fb 98%)",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="font-playfair italic font-medium text-[18px] text-[#1183D0] max-w-[154px]">
                    Enhancing Benefits Enrollment
                  </h3>
                  <p className="text-[14px] leading-[1.3] text-[#3c3e3f] max-w-[352px]">
                    Replaced a manual workflow with a centralized, self-managed
                    platform; cutting processing time by 72%.
                  </p>
                </div>
                <span className="text-[14px] text-[#3c3e3f] shrink-0 group-hover:text-[#1183D0] transition-colors">
                  See improvements →
                </span>
              </div>
              <div className="rounded-xl overflow-hidden flex items-center justify-center h-[172px]">
                <Image
                  src="/images/AxnrM.png"
                  alt="Benefits Enrollment"
                  width={402}
                  height={199}
                  className="w-full h-full object-cover"
                />
              </div>
            </a>

            {/* Card 2 – Nayya (Dark) */}
            <div
              className="w-[400px] rounded-[20px] p-7 flex flex-col gap-4 overflow-hidden shadow-[0_8px_24px_#00000018]"
              style={{
                background:
                  "linear-gradient(145deg, #091220 0%, #142840 50%, #1a3a5c 100%)",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="font-playfair italic font-medium text-[18px] text-white">
                    Nayya Integration
                  </h3>
                  <p className="text-[14px] leading-[1.3] text-white/90 whitespace-pre-line">
                    {`- Desktop / Mobile / UX Design\n- AI integration\n- X improvement`}
                  </p>
                </div>
                <span className="text-[14px] text-white/80 shrink-0">
                  See improvements →
                </span>
              </div>
              <div className="rounded-xl overflow-hidden flex items-center justify-center h-[187px]">
                <Image
                  src="/images/k58t4.png"
                  alt="Nayya Integration"
                  width={349}
                  height={173}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Card 3 – Benefits copy (Light) */}
            <div
              className="w-[400px] rounded-[20px] p-7 flex flex-col gap-4 overflow-hidden shadow-[0_8px_24px_#00000018]"
              style={{
                background:
                  "radial-gradient(ellipse at 82% 50%, #b7daf1 11%, #e9f3fb 64%, #edf5fb 98%)",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="font-playfair italic font-medium text-[18px] text-[#1183D0] max-w-[154px]">
                    Enhancing Benefits Enrollment
                  </h3>
                  <p className="text-[14px] leading-[1.3] text-[#3c3e3f] max-w-[352px]">
                    Replaced a manual workflow with a centralized, self-managed
                    platform; cutting processing time by 72%.
                  </p>
                </div>
                <span className="text-[14px] text-[#3c3e3f] shrink-0">
                  See improvements →
                </span>
              </div>
              <div className="rounded-xl overflow-hidden flex items-center justify-center h-[172px]">
                <Image
                  src="/images/AxnrM.png"
                  alt="Benefits Enrollment"
                  width={402}
                  height={199}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* View all work CTA */}
          <button className="h-9 px-5 rounded-full bg-[#d60060] text-white text-[13px] font-medium hover:bg-[#b5004e] transition-colors">
            View all work
          </button>
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
        {TOOLS_LEFT.map((t) => (
          <ToolBadge key={t.label} {...t} />
        ))}

        <div
          className="absolute flex flex-col items-center gap-3.5 text-center"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: 80,
            width: 500,
          }}
        >
          <span className="text-[13px] font-medium tracking-[3px] text-[#0a1729] uppercase">
            Experience &amp; Skills
          </span>
          <h2 className="font-playfair italic text-[48px] leading-[1.15] text-[#1183D0] w-full text-center">
            Tools I Love
            <br />
            &amp; Work With
          </h2>
          <p className="text-[15px] leading-[1.6] text-[#3c3e3f] max-w-[409px]">
            I integrate seamlessly with the tools your team already uses,
            creating workflows that feel natural and efficient.
          </p>
          <a
            href="#resume"
            className="h-11 px-7 rounded-full bg-[#d60060] text-white text-[14px] font-medium flex items-center gap-2 hover:bg-[#b5004e] transition-colors"
          >
            View My Resume <span>→</span>
          </a>
        </div>

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
        <a
          href="#contact"
          className="h-13 px-9 rounded-full bg-white text-[#0b182c] text-[15px] font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors"
        >
          Let&apos;s work together <span>→</span>
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}

import { withBasePath } from "../lib/site";

const FOOTER_LINKS = [
  { label: "Home", href: withBasePath("/") },
  { label: "Projects", href: withBasePath("/projects") },
  { label: "Resume", href: withBasePath("/resume") },
  { label: "Contact", href: withBasePath("/contact") },
];

const FOOTER_SOCIAL = [
  { label: "LinkedIn", href: "https://linkedin.com/in/greddysmartinez" },
  { label: "Behance", href: "https://www.behance.net/greddysmartinez" },
  { label: "UpWork", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#F0F7FF]">
      <div className="border-t border-[#C4DCF0]" />
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:px-10 lg:px-20 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex flex-col gap-3">
          <span className="font-playfair italic text-[22px] text-[#1183D0]">
            Greddys Martinez
          </span>
          <p className="max-w-[280px] text-[14px] leading-[1.6] text-[#3c3e3f]">
            Senior Product Designer crafting thoughtful digital experiences
            that make a difference.
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          <span className="text-[14px] font-semibold text-[#1183D0]">
            Site Map
          </span>
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] text-[#3c3e3f] transition-colors hover:text-[#1183D0]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3.5">
          <span className="text-[14px] font-semibold text-[#1183D0]">
            Connect
          </span>
          {FOOTER_SOCIAL.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-[14px] text-[#3c3e3f] transition-colors hover:text-[#1183D0]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3.5">
          <span className="text-[14px] font-semibold text-[#1183D0]">
            Let&apos;s Work Together
          </span>
          <p className="text-[14px] leading-[1.6] text-[#3c3e3f]">
            I&apos;m always open to new opportunities and collaborations.
          </p>
          <a
            href={withBasePath("/contact")}
            className="text-[14px] font-medium text-[#1183D0] transition-colors hover:text-[#0e284b]"
          >
            Get in touch →
          </a>
        </div>
      </div>

      <div className="border-t border-[#C4DCF0]" />

      <div className="max-w-[1200px] mx-auto px-6 py-5 md:px-10 lg:px-20 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[13px] text-[#7A98B5]">
          © 2026 Greddys Martinez. All rights reserved.
        </span>
        <div className="flex items-center gap-4 text-[#1183D0]">
          <a
            href="https://linkedin.com/in/greddysmartinez"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-opacity hover:opacity-70"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://www.behance.net/greddysmartinez"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold transition-opacity hover:opacity-70"
          >
            Bē
          </a>
          <a
            href="#"
            aria-label="Work"
            className="transition-opacity hover:opacity-70"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

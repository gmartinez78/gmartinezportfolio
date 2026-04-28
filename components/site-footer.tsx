import { withBasePath } from "../lib/site";
import { LogoMark } from "./site-header";

const FOOTER_LINKS = [
  { label: "Home", href: withBasePath("/") },
  { label: "Projects", href: withBasePath("/projects") },
  { label: "Resume", href: withBasePath("/resume") },
  { label: "Contact", href: withBasePath("/contact") },
];

const FOOTER_SOCIAL = [
  { label: "LinkedIn", href: "https://linkedin.com/in/greddysmartinez" },
  { label: "Behance", href: "https://www.behance.net/greddysmartinez" },
  { label: "UpWork", href: "https://www.upwork.com/freelancers/greddysmartinez" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#F0F7FF]">
      <div className="border-t border-[#C4DCF0]" />
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:px-10 lg:px-20 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex flex-col gap-3">
          <a href={withBasePath("/")} className="flex items-center gap-3">
            <LogoMark className="h-12 w-auto" />
            <span className="text-[18px] font-semibold leading-tight text-[#0e2951]">
              Greddys Martinez
            </span>
          </a>
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
            aria-label="Behance"
            className="transition-opacity hover:opacity-70"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zM15.971 13c-.17-1.883 1.269-2.354 2.758-2.354 1.486 0 2.93.771 2.789 2.354h-5.547zM8 11.979c.774.06 1.907-.044 2.86-.854.874-.739.938-1.804.938-1.867 0-2.63-2.154-3.258-3.76-3.258H1v14h7.648c2.041 0 4.126-1.169 4.126-4.035 0-2.521-2.246-3.871-4.774-3.986zM3.596 8.549h3.481c.743 0 2.08.186 2.08 1.508 0 1.326-1.053 1.508-2.082 1.508H3.596V8.549zm3.481 6.902H3.596v-3.014h3.481c.785 0 2.352.1 2.352 1.492 0 1.391-1.567 1.522-2.352 1.522z"/>
            </svg>
          </a>
          <a
            href="https://www.upwork.com/freelancers/greddysmartinez"
            target="_blank"
            rel="noreferrer"
            aria-label="Upwork"
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

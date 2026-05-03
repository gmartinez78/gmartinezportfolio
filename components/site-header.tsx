"use client";

import Link from "next/link";
import { withBasePath } from "../lib/site";
import { usePublicSiteContent } from "../lib/cms/public";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/greddysmartinez",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Behance",
    href: "https://www.behance.net/greddysmartinez",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zM15.971 13c-.17-1.883 1.269-2.354 2.758-2.354 1.486 0 2.93.771 2.789 2.354h-5.547zM8 11.979c.774.06 1.907-.044 2.86-.854.874-.739.938-1.804.938-1.867 0-2.63-2.154-3.258-3.76-3.258H1v14h7.648c2.041 0 4.126-1.169 4.126-4.035 0-2.521-2.246-3.871-4.774-3.986zM3.596 8.549h3.481c.743 0 2.08.186 2.08 1.508 0 1.326-1.053 1.508-2.082 1.508H3.596V8.549zm3.481 6.902H3.596v-3.014h3.481c.785 0 2.352.1 2.352 1.492 0 1.391-1.567 1.522-2.352 1.522z"/>
      </svg>
    ),
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/greddysmartinez",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={withBasePath("/images/logo-gj.svg")}
      alt=""
      aria-hidden="true"
      className={className}
      width="44"
      height="54"
    />
  );
}

export function SiteHeader({ active }: { active?: "Projects" | "Resume" | "Contact" }) {
  const { siteContent } = usePublicSiteContent();
  const navLinks = siteContent.nav.links;

  return (
    <header className="sticky top-0 z-50 border-b border-[#bcd2ff]/60 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-5 lg:gap-8">
          <Link href={withBasePath("/")} className="flex shrink-0 items-center gap-3" aria-label="Greddys Martinez home">
            <LogoMark className="h-10 w-auto" />
            <span className="hidden text-[15px] font-semibold leading-tight text-[#0e2951] sm:block">
              {siteContent.nav.logo_text}
            </span>
          </Link>
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={withBasePath(link.href)}
                  className={`rounded-[28px] px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                    active === link.label
                      ? "bg-[#E0EEFB] text-[#1183D0]"
                      : "text-[#5c7792] hover:bg-[#E0EEFB] hover:text-[#1183D0]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden items-center gap-4 text-[#1183D0] sm:flex">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#E0EEFB]"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

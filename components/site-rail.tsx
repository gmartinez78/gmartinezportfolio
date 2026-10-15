"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, FileText, FolderKanban, Home, Languages, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { withBasePath } from "../lib/site";
import { useLanguage } from "../lib/i18n/language-context";
import { usePublicSiteContent } from "../lib/cms/public";

type RailIcon = typeof Home;

const linkIcons: Record<string, RailIcon> = {
  projects: FolderKanban,
  resume: FileText,
  contact: Mail,
};

function isCurrentPath(pathname: string, href: string) {
  const target = href === "/" ? "/" : href.replace(/\/$/, "");
  const current = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  return target === "/" ? current === target : current === target || current.startsWith(`${target}/`);
}

function RailLink({
  href,
  label,
  icon: Icon,
  active,
  external = false,
}: {
  href: string;
  label: string;
  icon: RailIcon;
  active?: boolean;
  external?: boolean;
}) {
  const classes = `group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]/40 ${
    active
      ? "bg-[#E0EEFB] text-[#1183D0] shadow-[0_8px_22px_rgba(17,131,208,0.14)]"
      : "text-[#1183D0] hover:bg-[#E0EEFB] hover:text-[#0e75b8]"
  }`;
  const labelNode = (
    <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0e2951] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-[#1183D0]/30 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
      {label}
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" aria-label={label} className={classes}>
        <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
        {labelNode}
      </a>
    );
  }

  return (
    <Link href={withBasePath(href)} aria-label={label} className={classes}>
      <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
      {labelNode}
    </Link>
  );
}

const languageOptions = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
] as const;

function RailLanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsidePointer = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const selectedLanguage = languageOptions.find((option) => option.code === language)?.label ?? "English";

  return (
    <div ref={selectorRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`Select language. Current language: ${selectedLanguage}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`group relative flex h-9 min-w-9 items-center justify-center rounded-xl text-[#1183D0] transition-colors hover:bg-[#E0EEFB] hover:text-[#0e75b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]/40 ${
          isOpen ? "bg-[#E0EEFB] text-[#0e75b8]" : ""
        }`}
      >
        <Languages aria-hidden="true" size={18} strokeWidth={1.7} />
        <span className="sr-only">{selectedLanguage}</span>
        {!isOpen ? (
          <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0e2951] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-[#1183D0]/30 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
            Language: {selectedLanguage}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div
          role="menu"
          aria-label="Select language"
          className="absolute bottom-0 left-[calc(100%+12px)] z-[80] w-40 rounded-2xl border border-[#dbe9f7] bg-white p-1.5 shadow-[0_14px_36px_rgba(14,41,81,0.16)]"
        >
          {languageOptions.map((option) => {
            const selected = language === option.code;

            return (
              <button
                key={option.code}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => {
                  setLanguage(option.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                  selected
                    ? "bg-[#E0EEFB] text-[#1183D0]"
                    : "text-[#3c3e3f] hover:bg-[#f0f7ff] hover:text-[#1183D0]"
                }`}
              >
                <span>{option.label}</span>
                {selected ? <Check aria-hidden="true" size={15} strokeWidth={2.2} /> : <span className="w-[15px]" />}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function SiteRail() {
  const pathname = usePathname();
  const { siteContent } = usePublicSiteContent();

  return (
    <aside
      aria-label="Primary navigation"
      className="fixed inset-y-2 left-2 z-[70] hidden w-16 flex-col items-center rounded-[26px] border border-[#dbe9f7] bg-white py-4 shadow-[0_10px_28px_rgba(14,41,81,0.10)] lg:flex"
    >
      <Link
        href={withBasePath("/")}
        aria-label="Greddys Martinez home"
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[#bcd2ff]/70 bg-white p-2 shadow-[0_3px_10px_rgba(14,41,81,0.12)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]/40"
      >
        <img src={withBasePath("/images/logo-gj.svg")} alt="" aria-hidden="true" className="h-full w-full" />
        <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0e2951] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-[#1183D0]/30 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
          Greddys Martinez
        </span>
      </Link>

      <div className="my-5 h-px w-8 bg-[#bcd2ff]" />

      <nav className="flex flex-col items-center gap-2" aria-label="Main pages">
        <RailLink href="/" label="Home" icon={Home} active={isCurrentPath(pathname, "/")} />
        {siteContent.nav.links.map((link) => {
          const Icon = linkIcons[link.label.toLowerCase()] ?? FolderKanban;

          return (
            <RailLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={Icon}
              active={isCurrentPath(pathname, link.href)}
            />
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-3">
        <RailLanguageSelector />
        <a
          href="https://www.upwork.com/freelancers/greddysmartinez"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Upwork profile"
          className="group relative flex h-9 w-9 items-center justify-center rounded-xl text-[11px] font-bold tracking-[-0.08em] text-[#1183D0] transition-colors hover:bg-[#E0EEFB] hover:text-[#0e75b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]/40"
        >
          up
          <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0e2951] px-2.5 py-1.5 text-xs font-medium tracking-normal text-white opacity-0 shadow-lg ring-1 ring-[#1183D0]/30 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
            View Upwork profile
          </span>
        </a>
        <Link
          href={withBasePath("/resume")}
          aria-label="View profile"
          className="group relative h-9 w-9 overflow-visible rounded-full outline-offset-2 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]/40"
        >
          <img
            src={withBasePath("/images/profile-photo.png")}
            alt="Greddys Martinez"
            className="h-full w-full rounded-full border-2 border-[#1183D0] object-cover"
          />
          <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0e2951] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-[#1183D0]/30 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
            View profile
          </span>
        </Link>
      </div>
    </aside>
  );
}

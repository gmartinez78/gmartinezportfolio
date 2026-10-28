"use client";

import Link from "next/link";
import { FileText, FolderKanban, Home, Mail, Newspaper } from "lucide-react";
import { usePathname } from "next/navigation";
import { withBasePath } from "../lib/site";
import { useTranslate } from "../lib/i18n/use-translate";
import { usePublicSiteContent } from "../lib/cms/public";

type RailIcon = typeof Home;

// Navigation artwork is structural, so it is keyed by stable routes rather than
// translated labels. Language selection should never alter the menu's icons.
const linkIcons: Record<string, RailIcon> = {
  "/projects": FolderKanban,
  "/resume": FileText,
  "/contact": Mail,
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

function RailLanguageSelector() {
  // i18n selector hidden for now — only English is exposed.
  // To re-enable: restore body from git history (commit prior to this change).
  return null;
}

export function SiteRail() {
  const pathname = usePathname();
  const translate = useTranslate();
  const { siteContent } = usePublicSiteContent();

  return (
    <aside
      aria-label={translate("rail.primaryNavigation")}
      className="fixed inset-y-0 left-0 z-[70] hidden w-16 flex-col items-center bg-white py-4 shadow-[8px_0_24px_rgba(14,41,81,0.08)] lg:flex"
    >
      <Link
        href={withBasePath("/")}
        aria-label={translate("rail.homeAria")}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]/40"
      >
        <img src={withBasePath("/images/logo-gj.svg")} alt="" aria-hidden="true" className="h-full w-full" />
        <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0e2951] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-[#1183D0]/30 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
          Greddys Martinez
        </span>
      </Link>

      <div className="my-5 h-px w-8 bg-[#bcd2ff]" />

      <nav className="flex flex-col items-center gap-2" aria-label={translate("rail.mainPages")}>
        <RailLink href="/" label={translate("footer.home")} icon={Home} active={isCurrentPath(pathname, "/")} />
        {siteContent.nav.links.map((link) => {
          const Icon = linkIcons[link.href.replace(/\/$/, "")] ?? FolderKanban;

          return (
            <div key={link.href} className="contents">
              {link.href.replace(/\/$/, "") === "/contact" ? (
                <RailLink href="/blog" label="Blog" icon={Newspaper} active={isCurrentPath(pathname, "/blog")} />
              ) : null}
              <RailLink href={link.href} label={link.label} icon={Icon} active={isCurrentPath(pathname, link.href)} />
            </div>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-3">
        <RailLanguageSelector />
        <a
          href="https://linkedin.com/in/greddysmartinez"
          target="_blank"
          rel="noreferrer"
          aria-label={translate("rail.visitLinkedin")}
          className="group relative flex h-9 w-9 items-center justify-center rounded-xl text-[#1183D0] transition-colors hover:bg-[#E0EEFB] hover:text-[#0e75b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]/40"
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0e2951] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-[#1183D0]/30 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
            {translate("rail.viewLinkedin")}
          </span>
        </a>
        <a
          href="https://www.behance.net/greddysmartinez"
          target="_blank"
          rel="noreferrer"
          aria-label={translate("rail.visitBehance")}
          className="group relative flex h-9 w-9 items-center justify-center rounded-xl text-[#1183D0] transition-colors hover:bg-[#E0EEFB] hover:text-[#0e75b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]/40"
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zM15.971 13c-.17-1.883 1.269-2.354 2.758-2.354 1.486 0 2.93.771 2.789 2.354h-5.547zM8 11.979c.774.06 1.907-.044 2.86-.854.874-.739.938-1.804.938-1.867 0-2.63-2.154-3.258-3.76-3.258H1v14h7.648c2.041 0 4.126-1.169 4.126-4.035 0-2.521-2.246-3.871-4.774-3.986zM3.596 8.549h3.481c.743 0 2.08.186 2.08 1.508 0 1.326-1.053 1.508-2.082 1.508H3.596V8.549zm3.481 6.902H3.596v-3.014h3.481c.785 0 2.352.1 2.352 1.492 0 1.391-1.567 1.522-2.352 1.522z" />
          </svg>
          <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0e2951] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-[#1183D0]/30 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
            {translate("rail.viewBehance")}
          </span>
        </a>
        <a
          href="https://www.upwork.com/freelancers/greddysmartinez"
          target="_blank"
          rel="noreferrer"
          aria-label={translate("rail.visitUpwork")}
          className="group relative flex h-9 w-9 items-center justify-center rounded-xl text-[11px] font-bold tracking-[-0.08em] text-[#1183D0] transition-colors hover:bg-[#E0EEFB] hover:text-[#0e75b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]/40"
        >
          up
          <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0e2951] px-2.5 py-1.5 text-xs font-medium tracking-normal text-white opacity-0 shadow-lg ring-1 ring-[#1183D0]/30 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
            {translate("rail.viewUpwork")}
          </span>
        </a>
        <Link
          href={withBasePath("/resume")}
          aria-label={translate("rail.viewProfile")}
          className="group relative h-9 w-9 overflow-visible rounded-full outline-offset-2 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1183D0]/40"
        >
          <img
            src={withBasePath("/images/profile-photo.png")}
            alt="Greddys Martinez"
            className="h-full w-full rounded-full border-2 border-[#1183D0] object-cover"
          />
          <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[70] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#0e2951] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-[#1183D0]/30 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
            {translate("rail.viewProfile")}
          </span>
        </Link>
      </div>
    </aside>
  );
}

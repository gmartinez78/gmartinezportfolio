"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { withBasePath } from "../lib/site";
import { usePublicSiteContent } from "../lib/cms/public";

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

export function SiteHeader({
  active,
  variant = "default",
  behavior = "sticky",
}: {
  active?: "Projects" | "Resume" | "Contact";
  variant?: "default" | "transparent";
  behavior?: "sticky" | "reveal";
}) {
  const { siteContent } = usePublicSiteContent();
  const navLinks = siteContent.nav.links;
  const isTransparent = variant === "transparent";
  const [showStickyClone, setShowStickyClone] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (behavior !== "reveal" || isTransparent) {
      setShowStickyClone(false);
      return;
    }

    const updateStickyClone = () => {
      const header = headerRef.current;
      if (!header) {
        setShowStickyClone(false);
        return;
      }

      setShowStickyClone(header.getBoundingClientRect().bottom <= 0);
    };

    updateStickyClone();
    window.addEventListener("scroll", updateStickyClone, { passive: true });
    window.addEventListener("resize", updateStickyClone);

    return () => {
      window.removeEventListener("scroll", updateStickyClone);
      window.removeEventListener("resize", updateStickyClone);
    };
  }, [behavior, isTransparent]);

  const navContent = (
    <nav className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between gap-6 px-5 py-3 sm:px-8 lg:px-12">
      <Link href={withBasePath("/")} className="flex shrink-0 items-center gap-3 text-left" aria-label="Greddys Martinez home">
        <LogoMark className="h-10 w-auto" />
        <span className="text-[17px] font-semibold leading-tight text-[#0e2951]">
          Greddys
        </span>
      </Link>
      <div className="ml-auto flex min-w-0 items-center gap-5 lg:gap-8">
        <ul className="flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={withBasePath(link.href)}
                className={`inline-flex items-center rounded-full px-3.5 py-2 text-sm transition-all duration-200 sm:px-4 ${
                  active === link.label
                    ? isTransparent
                      ? "bg-white/70 text-[#0e2951] shadow-[0_10px_24px_rgba(14,41,81,0.08)]"
                      : "bg-[#E0EEFB] text-[#1183D0] shadow-[0_10px_24px_rgba(17,131,208,0.12)]"
                    : isTransparent
                      ? "text-[#0e2951] hover:-translate-y-0.5 hover:bg-white/70 hover:text-[#0e2951] hover:shadow-[0_10px_24px_rgba(14,41,81,0.08)]"
                      : "text-[#5c7792] hover:-translate-y-0.5 hover:bg-[#E0EEFB] hover:text-[#1183D0] hover:shadow-[0_10px_24px_rgba(17,131,208,0.10)]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );

  if (behavior === "reveal" && !isTransparent) {
    return (
      <>
        {showStickyClone ? (
          <header className="fixed inset-x-0 top-0 z-50 border-b border-[#bcd2ff]/60 bg-white/85 backdrop-blur">
            {navContent}
          </header>
        ) : null}
        <header ref={headerRef} className="border-b border-[#bcd2ff]/60 bg-white/85 backdrop-blur">
          {navContent}
        </header>
      </>
    );
  }

  return (
    <header
      ref={headerRef}
      className={
        isTransparent
          ? "absolute inset-x-0 top-0 z-50 border-b border-transparent bg-transparent"
          : "sticky top-0 z-50 border-b border-[#bcd2ff]/60 bg-white/85 backdrop-blur"
      }
    >
      {navContent}
    </header>
  );
}

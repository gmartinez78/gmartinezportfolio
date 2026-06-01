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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navContent = (
    <nav className="mx-auto max-w-[1200px] px-5 py-3 sm:px-8 lg:px-12">
      <div className="flex min-h-16 items-center justify-between gap-6">
        <Link href={withBasePath("/")} className="flex shrink-0 items-center gap-3 text-left" aria-label="Greddys Martinez home">
          <LogoMark className="h-10 w-auto" />
          <span className="text-[17px] font-semibold leading-tight text-[#0e2951]">
            Greddys
          </span>
        </Link>
        <div className="ml-auto flex min-w-0 items-center gap-5 lg:gap-8">
          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="site-mobile-nav"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-200 lg:hidden ${
              isMobileMenuOpen
                ? "bg-[#E0EEFB] text-[#1183D0] shadow-[0_10px_24px_rgba(17,131,208,0.12)]"
                : isTransparent
                  ? "bg-transparent text-[#0e2951]"
                  : "bg-transparent text-[#0e2951]"
            }`}
          >
            <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
            <span className="flex h-4 w-5 flex-col justify-between">
              <span
                className={`block h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                  isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                  isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
          <ul className="hidden items-center gap-1 lg:flex">
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
      </div>
      <div
        id="site-mobile-nav"
        className={`overflow-hidden transition-all duration-200 lg:hidden ${
          isMobileMenuOpen ? "max-h-96 pt-3 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex w-full flex-col gap-2 rounded-[28px] bg-white/95 p-3 shadow-[0_18px_40px_rgba(14,41,81,0.12)] backdrop-blur">
          {navLinks.map((link) => (
            <li key={link.label} className="w-full">
              <Link
                href={withBasePath(link.href)}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex w-full items-center justify-center rounded-full px-3.5 py-2 text-sm transition-all duration-200 sm:px-4 ${
                  active === link.label
                    ? isTransparent
                      ? "bg-white/70 text-[#0e2951] shadow-[0_10px_24px_rgba(14,41,81,0.08)]"
                      : "bg-[#E0EEFB] text-[#1183D0] shadow-[0_10px_24px_rgba(17,131,208,0.12)]"
                    : isTransparent
                      ? "text-[#0e2951] hover:bg-white/70 hover:text-[#0e2951] hover:shadow-[0_10px_24px_rgba(14,41,81,0.08)]"
                      : "text-[#5c7792] hover:bg-[#E0EEFB] hover:text-[#1183D0] hover:shadow-[0_10px_24px_rgba(17,131,208,0.10)]"
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

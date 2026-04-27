import { withBasePath } from "../lib/site";

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

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
    icon: <span className="text-sm font-bold leading-none">Bē</span>,
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
    <svg
      className={className}
      width="44"
      height="54"
      viewBox="0 0 154 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M118 18c0-10 8-18 18-18s18 8 18 18v116c0 47-29 82-77 82-33 0-57-14-65-40-4-11 4-23 16-25 10-2 18 3 23 13 5 10 13 15 27 15 25 0 40-17 40-46V18Z"
        fill="#0FB5BE"
      />
      <path
        d="M66 122c36 0 65-29 65-65S102 0 66 0 0 29 0 65s30 57 66 57Zm0-37c-15 0-28-12-28-28s13-28 28-28 28 12 28 28-13 28-28 28Z"
        fill="#F01978"
      />
      <path d="M118 14c-11 11-18 26-18 43v65h18c8 0 14-6 14-14V29c0-6-6-11-14-15Z" fill="#09236D" />
      <rect x="76" y="186" width="62" height="30" rx="15" fill="#4B367E" />
    </svg>
  );
}

export function SiteHeader({ active }: { active?: "Projects" | "Resume" | "Contact" }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#bcd2ff]/60 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex min-h-16 max-w-[1280px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-5 lg:gap-8">
          <a href={withBasePath("/")} className="flex shrink-0 items-center gap-3" aria-label="Greddys Martinez home">
            <LogoMark className="h-10 w-auto" />
            <span className="hidden text-[15px] font-semibold leading-tight text-[#0e2951] sm:block">
              Greddys Martinez
            </span>
          </a>
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={withBasePath(link.href)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                    active === link.label
                      ? "bg-[#1183D0]/10 text-[#1183D0]"
                      : "text-[#24425d] hover:bg-[#003d66]/5 hover:text-[#1183D0]"
                  }`}
                >
                  {link.label}
                </a>
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
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#1183D0]/10"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

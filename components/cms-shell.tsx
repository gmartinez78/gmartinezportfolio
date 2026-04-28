import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/cms", label: "Dashboard" },
  { href: "/cms/site", label: "Site Content" },
  { href: "/cms/case-studies", label: "Case Studies" },
];

export function CmsShell({
  title,
  description,
  activeHref,
  connected,
  children,
}: {
  title: string;
  description: string;
  activeHref: string;
  connected: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F0F7FF] text-[#3c3e3f]">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-[28px] border-2 border-[#CFE5F8] bg-white p-6 shadow-sm lg:sticky lg:top-6 lg:h-[calc(100vh-48px)]">
          <div className="border-b border-[#E0EEFB] pb-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#1183D0]">
              Portfolio CMS
            </p>
            <p className="mt-3 font-serif-display text-[32px] italic leading-none text-[#0e2951]">
              Greddys
            </p>
            <div className="mt-4">
              <Badge variant={connected ? "default" : "outline"}>
                {connected ? "Supabase connected" : "Fallback content mode"}
              </Badge>
            </div>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const active = activeHref === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-[22px] px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[#1183D0] text-white"
                      : "bg-[#F7FBFF] text-[#5c7792] hover:bg-[#E0EEFB] hover:text-[#1183D0]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[22px] bg-[#F7FBFF] p-4 text-sm leading-6 text-[#5c7792]">
            The CMS is modeled around the current site structure: global site sections plus case
            studies with overview, metrics, pain points, constraints, methodology, strategy, and
            reflections.
          </div>
        </aside>

        <section className="rounded-[32px] border-2 border-[#CFE5F8] bg-white p-6 shadow-sm lg:p-8">
          <div className="border-b border-[#E0EEFB] pb-6">
            <h1 className="font-serif-display text-[44px] italic leading-none text-[#0e2951]">
              {title}
            </h1>
            <p className="mt-4 max-w-[780px] text-base leading-7 text-[#5c7792]">{description}</p>
          </div>
          <div className="pt-8">{children}</div>
        </section>
      </div>
    </main>
  );
}

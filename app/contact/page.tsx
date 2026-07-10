"use client";

import { InfoCard } from "../../components/info-card";
import { ContactFormCard } from "../../components/contact-form-card";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { SectionHeading } from "../../components/ui/section-heading";
import { usePublicSiteContent } from "../../lib/cms/public";
import { withBasePath } from "../../lib/site";
import Link from "next/link";
import { useTranslate } from "../../lib/i18n/use-translate";


const INFO_CARDS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email",
    value: "greddysmartinez5@gmail.com",
    href: "mailto:greddysmartinez5@gmail.com",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/greddysmartinez",
    href: "#",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    label: "Behance",
    value: "behance.net/greddysmartinez",
    href: "#",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    label: "UpWork",
    value: "Available for freelance",
    href: "https://www.upwork.com/freelancers/greddysmartinez",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Location",
    value: "Málaga, Spain · Open to remote",
    href: undefined,
  },
];

export default function ContactPage() {
  const { siteContent } = usePublicSiteContent();
  const translate = useTranslate();
  const infoCards: Array<{ icon: (typeof INFO_CARDS)[number]["icon"]; label: string; value: string; href?: string | null }> =
    siteContent.contact.details.map((detail, index) => {
      const baseCard = INFO_CARDS[index] ?? INFO_CARDS[0];

      return {
        icon: baseCard.icon,
        label: detail.label,
        value: detail.value,
        href: detail.href,
      };
    });

  return (
    <main className="bg-white text-[#3c3e3f] overflow-x-hidden min-h-screen">
      <SiteHeader active="Contact" />

      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-10 text-center">
        <div className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
          <SectionHeading eyebrow={siteContent.contact.subheadline} title={siteContent.contact.headline} centered className="items-center" />
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#5c7792]">
            {siteContent.contact.intro}
          </p>
        </div>
      </section>

      {/* 2-col: Form + Info */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <Card className="mb-8 overflow-hidden rounded-[34px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(246,250,255,0.84)_100%)] shadow-[0_22px_56px_rgba(31,53,94,0.08)] backdrop-blur-xl">
          <CardContent className="flex flex-col gap-5 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-[680px]">
              <p className="text-[13px] font-semibold uppercase tracking-[0.32em] text-[#1183D0]">
                New Intake Link
              </p>
              <h2 className="mt-3 font-inter text-[28px] leading-[1.08] text-[#0e2951]">
                Diagnóstico inicial de redes sociales / Social media diagnostic
              </h2>
              <p className="mt-3 text-[15px] leading-[1.8] text-[#5c7792]">
                Use this bilingual form to collect client context, contact details, business goals, and marketing inputs before preparing a proposal.
              </p>
            </div>
            <Button asChild size="sm" className="h-12 rounded-full px-6 text-base">
              <Link href={withBasePath("/social-media-diagnostic")}>
                Open diagnostic
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <ContactFormCard
            title={translate("contactPage.sendAMessage")}
            submitLabel={translate("contactForm.sendMessage")}
            values={{ name: "", email: "", subject: "", message: "" }}
          />

          {/* Info Cards */}
          <div className="flex flex-col gap-4">
            <p className="text-[#5c7792] text-sm leading-relaxed">
              {siteContent.contact.availability}
            </p>
            {infoCards.map((card) => (
              <InfoCard
                key={card.label}
                icon={card.icon}
                label={card.label}
                value={card.value}
                href={card.href}
              />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

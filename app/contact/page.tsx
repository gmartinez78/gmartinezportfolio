"use client";

import Link from "next/link";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { SectionHeading } from "../../components/ui/section-heading";
import { Textarea } from "../../components/ui/textarea";
import { usePublicSiteContent } from "../../lib/cms/public";


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
  const infoCards: Array<{ icon: (typeof INFO_CARDS)[number]["icon"]; label: string; value: string; href?: string | null }> =
    siteContent.contact.details.map((detail) => {
      const baseCard = INFO_CARDS.find((card) => card.label.toLowerCase() === detail.label.toLowerCase()) ?? INFO_CARDS[0];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="overflow-hidden rounded-[34px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.84)_0%,rgba(247,251,255,0.74)_100%)] p-0 py-0 shadow-[0_22px_56px_rgba(31,53,94,0.08)] backdrop-blur-xl">
            <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-[#0e2951] mb-6">Send a message</h2>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input
                  id="contact-subject"
                  type="text"
                  placeholder="What's this about?"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="resize-none"
                />
              </div>
              <Button
                type="submit"
                className="mt-2"
              >
                Send Message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </Button>
            </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="flex flex-col gap-4">
            <p className="text-[#5c7792] text-sm leading-relaxed">
              {siteContent.contact.availability}
            </p>
            {infoCards.map((card) => (
              <Card
                key={card.label}
                className="overflow-hidden rounded-[30px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.84)_0%,rgba(247,251,255,0.74)_100%)] p-0 py-0 shadow-[0_18px_42px_rgba(31,53,94,0.08)]"
              >
                <CardContent className="flex items-center gap-6 p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/78 text-[#0e2951] shadow-[0_10px_24px_rgba(31,53,94,0.06)]">
                  {card.icon}
                </div>
                <div>
                  <p className="text-base font-semibold text-[#3c3e3f]">{card.label}</p>
                  {card.href?.startsWith("/") ? (
                    <Link href={card.href} className="text-sm text-[#0e2951] font-medium hover:text-[#1183D0] transition-colors">{card.value}</Link>
                  ) : card.href ? (
                    <a href={card.href} className="text-sm text-[#0e2951] font-medium hover:text-[#1183D0] transition-colors">{card.value}</a>
                  ) : (
                    <p className="text-sm text-[#0e2951] font-medium">{card.value}</p>
                  )}
                </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

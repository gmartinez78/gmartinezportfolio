"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { ContactFormCard } from "../../components/contact-form-card";
import { SiteHeader } from "../../components/site-header";
import { Container } from "../../components/ui/container";
import { usePublicSiteContent } from "../../lib/cms/public";
import type { DictionaryKey } from "../../lib/i18n/dictionary";
import { withBasePath } from "../../lib/site";
import { useTranslate } from "../../lib/i18n/use-translate";

const CONTACT_INTERESTS = ["website", "marketing", "brand", "support"];

export default function ContactPage() {
  const { siteContent } = usePublicSiteContent();
  const translate = useTranslate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const emailHref = siteContent.contact.details.find((detail) => detail.href?.startsWith("mailto:"))?.href
    ?? "mailto:greddysmartinez5@gmail.com";
  const emailAddress = emailHref.replace(/^mailto:/, "");
  const socialLinks = siteContent.contact.details.filter((detail) => (
    detail.href && !detail.href.startsWith("mailto:")
  ));

  function toggleInterest(interest: string) {
    setSelectedInterests((selected) => (
      selected.includes(interest)
        ? selected.filter((item) => item !== interest)
        : [...selected, interest]
    ));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const interestLabels = selectedInterests.map((interest) => (
      translate(`contactPage.interest.${interest}` as DictionaryKey)
    ));
    const subject = interestLabels.length > 0
      ? `Portfolio inquiry: ${interestLabels.join(", ")}`
      : "Portfolio inquiry";
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      ...(interestLabels.length > 0 ? [`Interested in: ${interestLabels.join(", ")}`] : []),
      "",
      message,
    ].join("\n");

    window.location.href = `${emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#3c3e3f]">
      <SiteHeader active="Contact" />

      <section className="relative overflow-hidden bg-[#1183D0] text-white">
        <Link
          href={withBasePath("/")}
          aria-label={translate("contactPage.close")}
          title={translate("contactPage.close")}
          className="absolute right-5 top-5 z-20 inline-flex size-11 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f8df36] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1183D0] sm:right-8 sm:top-8"
        >
          <X aria-hidden="true" className="size-5" />
        </Link>
        <Container as="div" size="wide" className="relative z-10 px-6 pb-20 pt-16 sm:pb-24 sm:pt-20">
          <div className="mx-auto max-w-[960px]">
            <header className="mx-auto max-w-[760px] pb-10 text-center sm:pb-14">
              <p className="text-sm font-semibold tracking-[0.12em] text-white/85">
                {translate("contactPage.eyebrow")}
              </p>
              <h1 className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.96] tracking-[-0.06em] text-white">
                {translate("contactPage.headlineLead")}
                <span className="mt-1 block text-[#f8df36]">
                  <span className="font-playfair font-normal italic tracking-[-0.04em]">
                    {translate("contactPage.headlineAccent")}
                  </span>{" "}
                  <span className="font-bold not-italic tracking-[-0.06em] text-white">
                    {translate("contactPage.headlineTogether")}
                  </span>
                </span>
              </h1>
            </header>

            <ContactFormCard
              title={translate("contactPage.interestPrompt")}
              submitLabel={translate("contactForm.sendMessage")}
              onSubmit={handleSubmit}
              values={{ name, email, message }}
              onNameChange={setName}
              onEmailChange={setEmail}
              onMessageChange={setMessage}
              showSubject={false}
              interestOptions={CONTACT_INTERESTS}
              selectedInterests={selectedInterests}
              onInterestToggle={toggleInterest}
              messageLabel={translate("contactPage.messageLabel")}
              messagePlaceholder={translate("contactPage.messagePlaceholder")}
              helperText={translate("contactPage.emailAppNote")}
              className="mx-auto max-w-[880px]"
              contentClassName="p-5 sm:p-8 md:p-10"
              submitClassName="w-full text-base font-semibold"
            />

            <div className="mx-auto mt-8 flex max-w-[880px] flex-col gap-5 border-t border-white/20 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-sm text-white/75">{translate("contactPage.preferEmail")}</p>
                <a
                  href={emailHref}
                  className="mt-1 inline-block font-medium text-white underline decoration-white/50 underline-offset-4 transition-colors hover:text-[#f8df36]"
                >
                  {emailAddress}
                </a>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                  {siteContent.contact.availability}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm sm:justify-end">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/75 underline decoration-white/30 underline-offset-4 transition-colors hover:text-[#f8df36]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

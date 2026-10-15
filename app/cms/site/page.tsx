"use client";

import { useEffect, useState } from "react";
import { CmsShell } from "@/components/cms-shell";
import { CmsAuthPanel } from "@/components/cms-auth-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getFallbackSiteContent } from "@/lib/cms/fallback";
import { SUPPORTED_LOCALES, type SupportedLocale } from "@/lib/i18n/locales";
import { useSupabaseConnection } from "@/lib/supabase/use-supabase-connection";
import { useCmsAuth } from "@/lib/supabase/use-cms-auth";

type SiteSection = {
  label: string;
  name: string;
};

type LocaleSectionValues = Record<string, string>;

const sectionDefinitions: SiteSection[] = [
  { label: "Navigation", name: "nav_json" },
  { label: "Home", name: "home_json" },
  { label: "Footer", name: "footer_json" },
  { label: "Contact", name: "contact_json" },
  { label: "Resume", name: "resume_json" },
];

const localeLabels: Record<SupportedLocale, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
};

function getSectionValues(locale: SupportedLocale): LocaleSectionValues {
  const content = getFallbackSiteContent(locale);

  return {
    nav_json: JSON.stringify(content.nav, null, 2),
    home_json: JSON.stringify(content.home, null, 2),
    footer_json: JSON.stringify(content.footer, null, 2),
    contact_json: JSON.stringify(content.contact, null, 2),
    resume_json: JSON.stringify(content.resume, null, 2),
  };
}

function getInitialSections() {
  return Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, getSectionValues(locale)]),
  ) as Record<SupportedLocale, LocaleSectionValues>;
}

function parsePayload(values: LocaleSectionValues) {
  return {
    nav: JSON.parse(values.nav_json),
    home: JSON.parse(values.home_json),
    footer: JSON.parse(values.footer_json),
    contact: JSON.parse(values.contact_json),
    resume: JSON.parse(values.resume_json),
  };
}

export default function CmsSiteContentPage() {
  const { canEdit, supabase } = useCmsAuth();
  const { checking, connected, error } = useSupabaseConnection();
  const [sectionsByLocale, setSectionsByLocale] = useState<Record<SupportedLocale, LocaleSectionValues>>(getInitialSections);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    void supabase
      .from("site_content_locales")
      .select("locale, payload")
      .eq("content_key", "site")
      .then(({ data }) => {
        if (!data?.length) {
          return;
        }

        setSectionsByLocale((current) => {
          const next = { ...current };

          for (const row of data as Array<{ locale: SupportedLocale; payload: Record<string, unknown> }>) {
            if (!SUPPORTED_LOCALES.includes(row.locale) || !row.payload) {
              continue;
            }

            next[row.locale] = {
              nav_json: JSON.stringify(row.payload.nav, null, 2),
              home_json: JSON.stringify(row.payload.home, null, 2),
              footer_json: JSON.stringify(row.payload.footer, null, 2),
              contact_json: JSON.stringify(row.payload.contact, null, 2),
              resume_json: JSON.stringify(row.payload.resume, null, 2),
            };
          }

          return next;
        });
      });
  }, [supabase]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase || !canEdit) {
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const payloads = Object.fromEntries(
        SUPPORTED_LOCALES.map((locale) => [locale, parsePayload(sectionsByLocale[locale])]),
      );

      const { error } = await supabase.rpc("upsert_site_content_locales", {
        p_content_key: "site",
        p_title: "Localized site content",
        p_payloads: payloads,
      });

      if (error) {
        throw error;
      }

      setMessage("English, Spanish, and German site content saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save site content.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <CmsShell
      title="Site Content"
      description="Every site update is saved together in English, Spanish, and German. The database rejects incomplete locale sets, so public content cannot drift into a one-language version."
      activeHref="/cms/site"
      connected={connected}
      checking={checking}
      connectionError={error}
    >
      <div className="space-y-6">
        <CmsAuthPanel />

        <form onSubmit={handleSubmit} className="space-y-6">
          {SUPPORTED_LOCALES.map((locale) => (
            <Card key={locale}>
              <CardHeader>
                <CardTitle>{localeLabels[locale]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {sectionDefinitions.map((section) => (
                  <div key={`${locale}-${section.name}`}>
                    <Label htmlFor={`${locale}-${section.name}`}>{section.label} JSON</Label>
                    <Textarea
                      id={`${locale}-${section.name}`}
                      name={`${locale}-${section.name}`}
                      className="mt-3 min-h-[220px] font-mono text-[13px] leading-6"
                      value={sectionsByLocale[locale][section.name]}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        setSectionsByLocale((current) => ({
                          ...current,
                          [locale]: {
                            ...current[locale],
                            [section.name]: nextValue,
                          },
                        }));
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[#5c7792]">{message}</p>
            <Button type="submit" disabled={!canEdit || saving}>
              {saving ? "Saving..." : "Save site content"}
            </Button>
          </div>
        </form>
      </div>
    </CmsShell>
  );
}

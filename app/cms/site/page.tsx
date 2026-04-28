"use client";

import { useEffect, useState } from "react";
import { CmsShell } from "@/components/cms-shell";
import { CmsAuthPanel } from "@/components/cms-auth-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fallbackSiteContent } from "@/lib/cms/fallback";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useCmsAuth } from "@/lib/supabase/use-cms-auth";

type SiteSection = {
  label: string;
  name: string;
  value: string;
};

export default function CmsSiteContentPage() {
  const { canEdit, supabase } = useCmsAuth();
  const [sections, setSections] = useState<SiteSection[]>([
    { label: "Navigation", name: "nav_json", value: JSON.stringify(fallbackSiteContent.nav, null, 2) },
    { label: "Home", name: "home_json", value: JSON.stringify(fallbackSiteContent.home, null, 2) },
    { label: "Footer", name: "footer_json", value: JSON.stringify(fallbackSiteContent.footer, null, 2) },
    { label: "Contact", name: "contact_json", value: JSON.stringify(fallbackSiteContent.contact, null, 2) },
    { label: "Resume", name: "resume_json", value: JSON.stringify(fallbackSiteContent.resume, null, 2) },
  ]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    void supabase
      .from("site_content")
      .select("payload")
      .eq("key", "site")
      .maybeSingle()
      .then(({ data }) => {
        if (!data?.payload) {
          return;
        }

        setSections([
          { label: "Navigation", name: "nav_json", value: JSON.stringify(data.payload.nav, null, 2) },
          { label: "Home", name: "home_json", value: JSON.stringify(data.payload.home, null, 2) },
          { label: "Footer", name: "footer_json", value: JSON.stringify(data.payload.footer, null, 2) },
          { label: "Contact", name: "contact_json", value: JSON.stringify(data.payload.contact, null, 2) },
          { label: "Resume", name: "resume_json", value: JSON.stringify(data.payload.resume, null, 2) },
        ]);
      });
  }, [supabase]);

  async function handleSubmit(formData: FormData) {
    if (!supabase || !canEdit) {
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const payload = {
        nav: JSON.parse(String(formData.get("nav_json"))),
        home: JSON.parse(String(formData.get("home_json"))),
        footer: JSON.parse(String(formData.get("footer_json"))),
        contact: JSON.parse(String(formData.get("contact_json"))),
        resume: JSON.parse(String(formData.get("resume_json"))),
      };

      const { error } = await supabase.from("site_content").upsert(
        {
          key: "site",
          title: "Primary site content",
          payload,
        },
        { onConflict: "key" },
      );

      if (error) {
        throw error;
      }

      setMessage("Site content saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save site content.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <CmsShell
      title="Site Content"
      description="This editor mirrors the singleton site document from the JSON you provided. The site sections are stored as JSONB so your current page structure can evolve without schema churn."
      activeHref="/cms/site"
      connected={Boolean(getSupabaseBrowserClient())}
    >
      <div className="space-y-6">
        <CmsAuthPanel />

        <form
          action={(formData) => {
            void handleSubmit(formData);
          }}
          className="space-y-6"
        >
          {sections.map((section) => (
            <Card key={section.name}>
              <CardHeader>
                <CardTitle>{section.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor={section.name}>{section.label} JSON</Label>
                <Textarea
                  id={section.name}
                  name={section.name}
                  className="mt-3 min-h-[260px] font-mono text-[13px] leading-6"
                  defaultValue={section.value}
                />
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

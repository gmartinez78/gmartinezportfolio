"use client";

import { useEffect, useState } from "react";
import { CmsShell } from "@/components/cms-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fallbackCaseStudies, fallbackSiteContent } from "@/lib/cms/fallback";
import type { CaseStudyRecord, SiteContent } from "@/lib/cms/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useSupabaseConnection } from "@/lib/supabase/use-supabase-connection";
import Link from "next/link";

const blockGroups = [
  {
    title: "Global Site",
    items: ["Navigation", "Home hero", "Trusted-by logos", "Stat banner", "Tools section", "Footer", "Contact", "Resume"],
  },
  {
    title: "Case Study Summary",
    items: ["Slug", "Status", "Featured", "Order", "Company", "Role", "Tags", "Filters", "Card summary"],
  },
  {
    title: "Detailed Case Study Blocks",
    items: ["Metrics", "Pain points", "Constraints", "Methodology", "Design strategy", "Reflections", "NDA/legal", "Media references"],
  },
];

export default function CmsDashboardPage() {
  const [siteContent, setSiteContent] = useState<SiteContent>(fallbackSiteContent);
  const [caseStudies, setCaseStudies] = useState<CaseStudyRecord[]>(fallbackCaseStudies);
  const { checking, connected, error } = useSupabaseConnection();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    void Promise.all([
      supabase.from("site_content").select("payload").eq("key", "site").maybeSingle(),
      supabase.from("case_studies").select("*").order("order", { ascending: true }),
    ]).then(([siteResult, studiesResult]) => {
      if (siteResult.data?.payload) {
        setSiteContent(siteResult.data.payload as SiteContent);
      }

      if (studiesResult.data) {
        setCaseStudies(studiesResult.data as CaseStudyRecord[]);
      }
    });
  }, []);

  const publishedCount = caseStudies.filter((study) => study.status === "published").length;
  const featuredCount = caseStudies.filter((study) => study.featured).length;

  return (
    <CmsShell
      title="CMS Dashboard"
      description="This CMS is aligned to the real content already present in the site and to the JSON models you provided. The schema is split between singleton site content and reusable case study posts."
      activeHref="/cms"
      connected={connected}
      checking={checking}
      connectionError={error}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1183D0]">Case studies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-semibold text-[#0e2951]">{caseStudies.length}</p>
            <p className="mt-2 text-sm text-[#5c7792]">Tracked posts available in the CMS.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1183D0]">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-semibold text-[#0e2951]">{publishedCount}</p>
            <p className="mt-2 text-sm text-[#5c7792]">Publicly readable project entries.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1183D0]">Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-semibold text-[#0e2951]">{featuredCount}</p>
            <p className="mt-2 text-sm text-[#5c7792]">Entries surfaced in hero or portfolio lists.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader>
            <CardTitle>Detected Content Blocks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {blockGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1183D0]">
                  {group.title}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} size="tag">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-[22px] bg-[#F7FBFF] p-5">
              <p className="text-sm font-semibold text-[#0e2951]">Site singleton</p>
              <p className="mt-2 text-sm leading-6 text-[#5c7792]">
                The current navigation, home, footer, contact, and resume content is loaded as one
                document.
              </p>
              <Button asChild size="xs" className="mt-4">
                <Link href="/cms/site">Edit site content</Link>
              </Button>
            </div>

            <div className="rounded-[22px] bg-[#F7FBFF] p-5">
              <p className="text-sm font-semibold text-[#0e2951]">Projects collection</p>
              <p className="mt-2 text-sm leading-6 text-[#5c7792]">
                Case studies are modeled as posts with flexible JSON blocks for media, metrics,
                methodology, and reflections.
              </p>
              <Button asChild size="xs" className="mt-4">
                <Link href="/cms/case-studies">Manage case studies</Link>
              </Button>
            </div>

            <div className="rounded-[22px] bg-[#F7FBFF] p-5">
              <p className="text-sm font-semibold text-[#0e2951]">Current home greeting</p>
              <p className="mt-2 text-sm text-[#5c7792]">{siteContent.home.hero.greeting}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CmsShell>
  );
}

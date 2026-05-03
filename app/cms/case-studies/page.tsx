"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CmsShell } from "@/components/cms-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fallbackCaseStudies } from "@/lib/cms/fallback";
import type { CaseStudyRecord } from "@/lib/cms/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useSupabaseConnection } from "@/lib/supabase/use-supabase-connection";

export default function CmsCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyRecord[]>(fallbackCaseStudies);
  const { checking, connected, error } = useSupabaseConnection();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    void supabase
      .from("case_studies")
      .select("*")
      .order("order", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setCaseStudies(data as CaseStudyRecord[]);
        }
      });
  }, []);

  return (
    <CmsShell
      title="Case Studies"
      description="These entries map to the portfolio projects in your site. The editor is structured around the reusable blocks detected in the existing project pages and the JSON case study model."
      activeHref="/cms/case-studies"
      connected={connected}
      checking={checking}
      connectionError={error}
    >
      <div className="mb-6 flex justify-end">
        <Button asChild size="xs">
          <Link href="/cms/case-studies/new">New case study</Link>
        </Button>
      </div>

      <div className="grid gap-5">
        {caseStudies.map((study) => (
          <Card key={study.slug}>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle>{study.title}</CardTitle>
                  <p className="mt-2 text-sm text-[#5c7792]">
                    {study.company} · {study.year ?? "No year"} · {study.role ?? "No role"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={study.status === "published" ? "default" : "outline"}>
                    {study.status}
                  </Badge>
                  {study.featured ? <Badge size="tag">Featured</Badge> : null}
                  <Button asChild variant="outline" size="xs">
                    <Link href={`/cms/case-studies/${study.slug}`}>Edit</Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-[#5c7792]">{study.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <Badge key={tag} size="tag">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </CmsShell>
  );
}

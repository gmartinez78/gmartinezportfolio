import { fallbackCaseStudies, fallbackSiteContent } from "@/lib/cms/fallback";
import type { CaseStudyRecord, SiteContent } from "@/lib/cms/types";
import { getSupabasePublicClient } from "@/lib/supabase/client";

function sortCaseStudies(studies: CaseStudyRecord[]) {
  return [...studies].sort((a, b) => a.order - b.order);
}

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = getSupabasePublicClient();

  if (!supabase) {
    return fallbackSiteContent;
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("payload")
    .eq("key", "site")
    .maybeSingle();

  if (error || !data?.payload) {
    return fallbackSiteContent;
  }

  return data.payload as SiteContent;
}

export async function getCaseStudies(): Promise<CaseStudyRecord[]> {
  const supabase = getSupabasePublicClient();

  if (!supabase) {
    return sortCaseStudies(fallbackCaseStudies);
  }

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("order", { ascending: true });

  if (error || !data) {
    return sortCaseStudies(fallbackCaseStudies);
  }

  return sortCaseStudies(data) as CaseStudyRecord[];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyRecord | null> {
  const supabase = getSupabasePublicClient();

  if (!supabase) {
    return fallbackCaseStudies.find((study) => study.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return fallbackCaseStudies.find((study) => study.slug === slug) ?? null;
  }

  return data as CaseStudyRecord;
}

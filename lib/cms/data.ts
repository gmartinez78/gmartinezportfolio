import { getFallbackCaseStudies, getFallbackSiteContent } from "@/lib/cms/fallback";
import type { CaseStudyRecord, SiteContent } from "@/lib/cms/types";
import type { SupportedLocale } from "@/lib/i18n/locales";
import { getSupabasePublicClient } from "@/lib/supabase/client";

const REVERSETECH_PROJECT_TITLE = "Reverse Health Funnel Optimization & A/B Testing";

function normalizeCaseStudy(study: CaseStudyRecord, locale: SupportedLocale = "en"): CaseStudyRecord {
  if (study.slug === "nayya-ai-benefits") {
    return {
      ...study,
      external_link: null,
    };
  }

  if (locale === "en" && study.slug === "reversetech") {
    return {
      ...study,
      title: REVERSETECH_PROJECT_TITLE,
    };
  }

  return study;
}

function sortCaseStudies(studies: CaseStudyRecord[]) {
  return [...studies].sort((a, b) => a.order - b.order);
}

export async function getSiteContent(locale: SupportedLocale = "en"): Promise<SiteContent> {
  const supabase = getSupabasePublicClient();

  if (!supabase) {
    return getFallbackSiteContent(locale);
  }

  const { data, error } = await supabase
    .from("site_content_locales")
    .select("payload")
    .eq("content_key", "site")
    .eq("locale", locale)
    .maybeSingle();

  if (error || !data?.payload) {
    return getFallbackSiteContent(locale);
  }

  return data.payload as SiteContent;
}

export async function getCaseStudies(locale: SupportedLocale = "en"): Promise<CaseStudyRecord[]> {
  const supabase = getSupabasePublicClient();

  if (!supabase) {
    return sortCaseStudies(getFallbackCaseStudies(locale));
  }

  if (locale !== "en") {
    const { data, error } = await supabase
      .from("case_study_locales")
      .select("payload")
      .eq("locale", locale);

    if (error || !data) {
      return sortCaseStudies(getFallbackCaseStudies(locale));
    }

    return sortCaseStudies(
      (data as Array<{ payload: CaseStudyRecord }>).map((entry) => normalizeCaseStudy(entry.payload, locale)),
    );
  }

  const { data, error } = await supabase.from("case_studies").select("*").order("order", { ascending: true });

  if (error || !data) {
    return sortCaseStudies(getFallbackCaseStudies(locale));
  }

  return sortCaseStudies((data as CaseStudyRecord[]).map((study) => normalizeCaseStudy(study, locale)));
}

export async function getCaseStudyBySlug(
  slug: string,
  locale: SupportedLocale = "en",
): Promise<CaseStudyRecord | null> {
  const supabase = getSupabasePublicClient();

  if (!supabase) {
    return getFallbackCaseStudies(locale).find((study) => study.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return getFallbackCaseStudies(locale).find((study) => study.slug === slug) ?? null;
  }

  if (locale === "en") {
    return normalizeCaseStudy(data as CaseStudyRecord, locale);
  }

  const { data: localizedData, error: localizedError } = await supabase
    .from("case_study_locales")
    .select("payload")
    .eq("case_study_id", (data as CaseStudyRecord).id ?? "")
    .eq("locale", locale)
    .maybeSingle();

  if (localizedError || !localizedData?.payload) {
    return getFallbackCaseStudies(locale).find((study) => study.slug === slug) ?? null;
  }

  return normalizeCaseStudy((localizedData as { payload: CaseStudyRecord }).payload, locale);
}

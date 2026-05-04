"use client";

import { useEffect, useMemo, useState } from "react";
import { fallbackCaseStudies, fallbackSiteContent } from "@/lib/cms/fallback";
import type { CaseStudyRecord, SiteContent } from "@/lib/cms/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { normalizeNavigableHref, withBasePath } from "@/lib/site";

const trustedLogoMap: Record<string, string> = {
  IBX: withBasePath("/images/SNUZw.png"),
  Skill: withBasePath("/images/IbuV3.png"),
  Nayya: withBasePath("/images/SNUZ.png"),
  Paychex: withBasePath("/images/c54fy.png"),
  "Paramount+": withBasePath("/images/paramount-plus.svg"),
  Flock: withBasePath("/images/flock-logo.svg"),
};

const certificationLogoMap: Record<string, string> = {
  "Upwork Certification": withBasePath("/images/iNSrn.png"),
  "NN/g UX Certification": withBasePath("/images/OiSjn.png"),
  "NN/Group UX Certification — Interaction Design": withBasePath("/images/OiSjn.png"),
  "Upwork Skill Certification — User Interface Design": withBasePath("/images/iNSrn.png"),
};

const toolIconMap: Record<string, string> = {
  Figma: withBasePath("/images/tools/figma.svg"),
  Jira: withBasePath("/images/tools/jira.svg"),
  Miro: withBasePath("/images/tools/miro.svg"),
  Copilot: withBasePath("/images/tools/githubcopilot.svg"),
  "GitHub Copilot": withBasePath("/images/tools/githubcopilot.svg"),
  Webex: withBasePath("/images/tools/webex.svg"),
  ClickUp: withBasePath("/images/tools/clickup.svg"),
  Confluence: withBasePath("/images/tools/confluence.svg"),
  Maze: withBasePath("/images/tools/maze.svg"),
  Notion: withBasePath("/images/tools/notion.svg"),
  Slack: withBasePath("/images/tools/slack.svg"),
  "HTML/CSS": withBasePath("/images/tools/html5.svg"),
  HTML: withBasePath("/images/tools/html5.svg"),
  CSS: withBasePath("/images/tools/html5.svg"),
  React: withBasePath("/images/tools/react.svg"),
  Claude: withBasePath("/images/tools/anthropic.svg"),
  ChatGPT: withBasePath("/images/tools/openai.svg"),
  OpenAI: withBasePath("/images/tools/openai.svg"),
  "VS Code": withBasePath("/images/tools/visualstudiocode.svg"),
  "Visual Studio Code": withBasePath("/images/tools/visualstudiocode.svg"),
  Angular: withBasePath("/images/tools/Angular_gradient_logo.png"),
  Anthropic: withBasePath("/images/tools/anthropic.svg"),
};

const projectImageMap: Record<string, string> = {
  "benefits-enrollment": withBasePath("/images/projects/EB.png"),
  "nayya-ai-benefits": withBasePath("/images/projects/nayya-cover.png"),
  "flock-accessibility-system": withBasePath("/images/FC4No.png"),
  "i9-everify-integration": withBasePath("/images/1x9VC.png"),
};

const projectHrefMap: Record<string, string> = {
  "benefits-enrollment": withBasePath("/benefits"),
};

export function resolveTrustedLogo(name: string, explicit?: string | null) {
  return trustedLogoMap[name] ?? (explicit ? withBasePath(explicit) : withBasePath("/images/SNUZw.png"));
}

export function resolveCertificationLogo(name: string, explicit?: string | null) {
  return certificationLogoMap[name] ?? (explicit ? withBasePath(explicit) : withBasePath("/images/OiSjn.png"));
}

export function resolveToolIcon(label: string) {
  return toolIconMap[label] ?? withBasePath("/images/tools/figma.svg");
}

export function resolveToolIconOptional(label: string) {
  return toolIconMap[label] ?? null;
}

export function resolveProjectImage(slug: string, explicit?: string | null) {
  return projectImageMap[slug] ?? (explicit ? withBasePath(explicit) : withBasePath("/images/AxnrM.png"));
}

export function resolveProjectHeroImage(slug: string, explicit?: string | null) {
  return explicit ? withBasePath(explicit) : resolveProjectImage(slug, explicit);
}

export function resolveProjectHref(study: CaseStudyRecord) {
  if (study.external_link) {
    return normalizeNavigableHref(study.external_link);
  }

  return projectHrefMap[study.slug] ?? withBasePath(`/projects/${study.slug}`);
}

export function usePublicSiteContent() {
  const [siteContent, setSiteContent] = useState<SiteContent>(fallbackSiteContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setLoading(false);
      return;
    }

    void (async () => {
      const { data } = await supabase
        .from("site_content")
        .select("payload")
        .eq("key", "site")
        .maybeSingle();

      if (data?.payload) {
        setSiteContent(data.payload as SiteContent);
      }
      setLoading(false);
    })();
  }, []);

  return { siteContent, loading };
}

export function usePublicCaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyRecord[]>(fallbackCaseStudies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setLoading(false);
      return;
    }

    void (async () => {
      const { data } = await supabase
        .from("case_studies")
        .select("*")
        .eq("status", "published")
        .order("order", { ascending: true });

      if (data) {
        setCaseStudies(data as CaseStudyRecord[]);
      }
      setLoading(false);
    })();
  }, []);

  return { caseStudies, loading };
}

export function usePublicCaseStudy(slug: string) {
  const supabase = getSupabaseBrowserClient();
  const fallbackStudy = useMemo(() => fallbackCaseStudies.find((study) => study.slug === slug) ?? null, [slug]);
  const [caseStudy, setCaseStudy] = useState<CaseStudyRecord | null>(fallbackStudy);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) {
      setCaseStudy(fallbackStudy);
      setLoading(false);
      return;
    }

    void (async () => {
      const { data } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      setCaseStudy((data as CaseStudyRecord | null) ?? fallbackStudy);
      setLoading(false);
    })();
  }, [fallbackStudy, slug, supabase]);

  return { caseStudy, loading };
}

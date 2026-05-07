"use client";

import { useEffect, useMemo, useState } from "react";
import { fallbackCaseStudies, fallbackSiteContent } from "@/lib/cms/fallback";
import type { CaseStudyRecord, SiteContent } from "@/lib/cms/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { normalizeNavigableHref, withBasePath } from "@/lib/site";

const trustedLogoMap: Record<string, string> = {
  IBX: withBasePath("/images/SNUZw.png"),
  Skill: withBasePath("/images/IbuV3.png"),
  Hakuna: withBasePath("/images/hakuna.avif"),
  Nayya: withBasePath("/images/bBw3A.png"),
  Paychex: withBasePath("/images/c54fy.png"),
  "Paramount+": withBasePath("/images/paramount-plus.svg"),
  Flock: withBasePath("/images/flock-logo.png"),
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
  "benefits-enrollment": withBasePath("/images/projects/benefits-enrollment/thumbnails/thumbnail-benefits.png"),
  "nayya-ai-benefits": withBasePath("/images/projects/nayya-ai-benefits/thumbnails/thumbnail-nayya-cover.png"),
  "flock-accessibility-system": withBasePath("/images/projects/flock-accessibility-system/thumbnails/flock.png"),
  "i9-everify-integration": withBasePath("/images/projects/i9-everify-integration/hero/user-management.png"),
};

const projectHeroImageMap: Record<string, string> = {
  "benefits-enrollment": withBasePath("/images/projects/benefits-enrollment/hero/benefits-hero.png"),
  "nayya-ai-benefits": withBasePath("/images/projects/nayya-ai-benefits/hero/nayya-hero.png"),
  "flock-accessibility-system": withBasePath("/images/projects/flock-accessibility-system/hero/flock-hero.png"),
  "i9-everify-integration": withBasePath("/images/projects/i9-everify-integration/hero/user-management.png"),
};

const projectHrefMap: Record<string, string> = {
  "benefits-enrollment": withBasePath("/benefits"),
};

const homeCardMediaMap: Record<string, { id: string; image: string }> = {
  "benefits-enrollment": {
    id: "home-card-benefits-enrollment",
    image: withBasePath("/images/projects/benefits-enrollment/thumbnails/thumbnail-benefits.png"),
  },
  "nayya-ai-benefits": {
    id: "home-card-nayya-ai-benefits",
    image: withBasePath("/images/projects/nayya-ai-benefits/thumbnails/thumbnail-nayya-cover.png"),
  },
  "flock-accessibility-system": {
    id: "home-card-flock-accessibility-system",
    image: withBasePath("/images/projects/flock-accessibility-system/thumbnails/flock.png"),
  },
  "i9-everify-integration": {
    id: "home-card-i9-everify-integration",
    image: withBasePath("/images/projects/i9-everify-integration/thumbnails/home-card-i9-everify-integration.png"),
  },
};

const projectListCardMediaMap: Record<string, { id: string; image: string }> = {
  "benefits-enrollment": {
    id: "project-list-card-benefits-enrollment",
    image: withBasePath("/images/projects/benefits-enrollment/thumbnails/thumbnail-benefits.png"),
  },
  "nayya-ai-benefits": {
    id: "project-list-card-nayya-ai-benefits",
    image: withBasePath("/images/projects/nayya-ai-benefits/thumbnails/thumbnail-nayya-cover.png"),
  },
  "flock-accessibility-system": {
    id: "project-list-card-flock-accessibility-system",
    image: withBasePath("/images/projects/flock-accessibility-system/thumbnails/flock.png"),
  },
  "i9-everify-integration": {
    id: "project-list-card-i9-everify-integration",
    image: withBasePath("/images/projects/i9-everify-integration/thumbnails/project-list-card-i9-everify-integration.png"),
  },
};

const legacyAssetMap: Record<string, string> = {
  "/images/hero-photo.jpg": "/images/projects/benefits-enrollment/hero/benefits-hero.png",
  "/images/logos/ibx.png": "/images/SNUZw.png",
  "/images/logos/skill.png": "/images/IbuV3.png",
  "/images/logos/nayya.png": "/images/bBw3A.png",
  "/images/logos/paychex.png": "/images/c54fy.png",
  "/images/certs/upwork-cert.png": "/images/iNSrn.png",
  "/images/certs/nng-cert.png": "/images/OiSjn.png",
};

function resolveLegacyAssetPath(path?: string | null) {
  if (!path) {
    return path ?? null;
  }

  return legacyAssetMap[path] ?? path;
}

function normalizeSiteContent(content: SiteContent): SiteContent {
  return {
    ...content,
    home: {
      ...content.home,
      hero: {
        ...content.home.hero,
        photo:
          resolveLegacyAssetPath(content.home.hero.photo) ??
          "/images/projects/benefits-enrollment/hero/benefits-hero.png",
      },
      trusted_by: {
        ...content.home.trusted_by,
        clients: content.home.trusted_by.clients.map((client) => ({
          ...client,
          logo: resolveLegacyAssetPath(client.logo) ?? client.logo,
        })),
      },
    },
    resume: {
      ...content.resume,
      certifications: content.resume.certifications.map((certification) => ({
        ...certification,
        logo: resolveLegacyAssetPath(certification.logo) ?? certification.logo,
      })),
    },
  };
}

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
  return projectImageMap[slug] ?? (explicit ? withBasePath(explicit) : withBasePath("/images/projects/EB.png"));
}

export function resolveProjectHeroImage(slug: string, explicit?: string | null) {
  return projectHeroImageMap[slug] ?? (explicit ? withBasePath(explicit) : resolveProjectImage(slug, explicit));
}

export function resolveProjectHref(study: CaseStudyRecord) {
  if (study.external_link) {
    return normalizeNavigableHref(study.external_link);
  }

  return projectHrefMap[study.slug] ?? withBasePath(`/projects/${study.slug}`);
}

export function resolveHomeCardId(slug: string) {
  return homeCardMediaMap[slug]?.id ?? `home-card-${slug}`;
}

export function resolveHomeCardImage(slug: string, explicit?: string | null) {
  return homeCardMediaMap[slug]?.image ?? resolveProjectImage(slug, explicit);
}

export function resolveProjectListCardId(slug: string) {
  return projectListCardMediaMap[slug]?.id ?? `project-list-card-${slug}`;
}

export function resolveProjectListCardImage(slug: string, explicit?: string | null) {
  return projectListCardMediaMap[slug]?.image ?? resolveProjectImage(slug, explicit);
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
        setSiteContent(normalizeSiteContent(data.payload as SiteContent));
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
  const [loading, setLoading] = useState(false);

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

export type SiteContent = {
  nav: {
    logo_text: string;
    links: Array<{ label: string; href: string }>;
    cta_label: string;
    cta_href: string;
  };
  home: {
    hero: {
      greeting: string;
      tagline: string;
      photo: string;
      methodology_chips: string[];
    };
    trusted_by: {
      label: string;
      clients: Array<{ name: string; logo: string }>;
    };
    certifications: Array<{ name: string; logo: string }>;
    stat_banner: {
      text: string;
      value: string;
      value_label: string;
      cta_headline: string;
      cta_label: string;
      cta_href: string;
    };
    tools_section: {
      headline: string;
      description: string;
      cta_label: string;
      cta_href: string;
      row_1: string[];
      row_2: string[];
    };
  };
  footer: {
    tagline: string;
    cta_headline: string;
    cta_body: string;
    cta_label: string;
    cta_href: string;
    copyright: string;
    social_links: Array<{ label: string; href: string }>;
  };
  contact: {
    headline: string;
    subheadline: string;
    intro: string;
    availability: string;
    details: Array<{ label: string; value: string; href: string | null }>;
  };
  resume: {
    name: string;
    title: string;
    email: string;
    location: string;
    website: string;
    linkedin: string;
    bio: string;
    pdf_link: string;
    experience: Array<{
      title: string;
      company: string;
      client: string;
      period: string;
      location: string;
      bullets: string[];
      tags: string[];
    }>;
    skills: Record<string, string[]>;
    tools: string[];
    education: Array<{ year: string; degree: string; institution: string }>;
    certifications: Array<{ name: string; level: string; year: string; logo: string }>;
  };
};

export type CaseStudyMetric = {
  value: string;
  label: string;
  context?: string | null;
};

export type CaseStudyLogo = {
  name: string;
  logo: string;
};

export type CaseStudyMethodStep = {
  step: number;
  label: string;
  description: string;
};

export type CaseStudyReflection = {
  title: string;
  body: string;
};

export type CaseStudyImages = {
  cover: string;
  hero: string;
  gallery: string[];
};

export type CaseStudyProblem = {
  admin_pain_points: string[];
  user_pain_points: string[];
};

export type CaseStudyMethodology = {
  name: string;
  steps: CaseStudyMethodStep[];
};

export type CaseStudyContentBlock = {
  id: string;
  type:
    | "hero"
    | "overview"
    | "pain_points"
    | "constraints"
    | "methodology"
    | "strategy"
    | "results"
    | "reflection"
    | "gallery"
    | "custom";
  title: string;
  body?: string | null;
  payload?: Record<string, unknown> | null;
};

export type CaseStudyRecord = {
  id?: string;
  slug: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  order: number;
  title: string;
  company: string;
  client_context: string | null;
  role: string | null;
  year: number | null;
  duration: string | null;
  industry: string | null;
  tagline: string | null;
  tags: string[];
  filters?: string[];
  tools: string[];
  images: CaseStudyImages;
  client_logos: CaseStudyLogo[];
  metrics: CaseStudyMetric[];
  team: string[];
  my_role: string[];
  problem: CaseStudyProblem;
  constraints: string[];
  methodology: CaseStudyMethodology;
  design_strategy: string[];
  reflections: CaseStudyReflection[];
  nda_notice: string | null;
  password: string | null;
  external_link: string | null;
  content_blocks?: CaseStudyContentBlock[];
  created_at?: string;
  updated_at?: string;
};

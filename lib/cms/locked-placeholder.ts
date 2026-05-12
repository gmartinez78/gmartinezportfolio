import type { CaseStudyRecord } from "@/lib/cms/types";

export const LOCKED_NAYYA_PLACEHOLDER_SLUG = "nayya-ai-benefits-private";

const LOCKED_NAYYA_SOURCE_SLUG = "nayya-ai-benefits";
const LOCKED_NAYYA_PLACEHOLDER_PASSWORD = "placeholder";
const LOCKED_NAYYA_PLACEHOLDER_MEDIA = "/images/projects/EB.png";

function createLockedPlaceholder(order: number): CaseStudyRecord {
  return {
    slug: LOCKED_NAYYA_PLACEHOLDER_SLUG,
    status: "published",
    featured: false,
    order,
    title: "Confidential Workflow Platform",
    company: "Stealth Client",
    client_context: "Private preview",
    role: "Sr. Product Designer",
    year: 2026,
    duration: "TBD",
    industry: "Confidential SaaS",
    tagline: "A temporary, password-protected placeholder used while the final case study is still being prepared.",
    tags: ["Confidential", "Product Design", "UX Strategy"],
    filters: ["Product Design"],
    tools: ["Figma", "Jira", "Miro"],
    images: {
      cover: LOCKED_NAYYA_PLACEHOLDER_MEDIA,
      hero: LOCKED_NAYYA_PLACEHOLDER_MEDIA,
      gallery: [],
    },
    client_logos: [],
    metrics: [
      {
        value: "Locked",
        label: "Private preview",
        context: "Temporary placeholder entry until the real content is ready.",
      },
    ],
    team: ["Confidential team"],
    my_role: ["Product Design", "UX Strategy"],
    problem: {
      admin_pain_points: ["Placeholder content only."],
      user_pain_points: ["Placeholder content only."],
    },
    constraints: ["This project is intentionally hidden until the final write-up is ready."],
    methodology: {
      name: "Placeholder",
      steps: [],
    },
    design_strategy: ["Replace this entry with the real project narrative once the case study is ready."],
    reflections: [
      {
        title: "Temporary placeholder",
        body: "This entry exists only to reserve placement in the projects list while content is still being assembled.",
      },
    ],
    nda_notice: "This case study is temporarily private while content is being added.",
    password: LOCKED_NAYYA_PLACEHOLDER_PASSWORD,
    external_link: null,
    content_blocks: [
      {
        id: "overview",
        type: "overview",
        title: "Overview",
        body: "This is intentionally fake placeholder content so the private project does not look like an existing published case study.",
      },
    ],
  };
}

export function buildLockedNayyaPlaceholder(source: CaseStudyRecord | null, order: number): CaseStudyRecord {
  if (!source) {
    return createLockedPlaceholder(order);
  }

  return {
    ...createLockedPlaceholder(order),
    status: source.status,
  };
}

export function appendLockedNayyaPlaceholder(studies: CaseStudyRecord[]) {
  if (studies.some((study) => study.slug === LOCKED_NAYYA_PLACEHOLDER_SLUG)) {
    return [...studies].sort((left, right) => left.order - right.order);
  }

  const sourceStudy = studies.find((study) => study.slug === LOCKED_NAYYA_SOURCE_SLUG) ?? null;
  const nextOrder = studies.reduce((maxOrder, study) => Math.max(maxOrder, study.order), 0) + 1;

  return [...studies, buildLockedNayyaPlaceholder(sourceStudy, nextOrder)].sort(
    (left, right) => left.order - right.order,
  );
}

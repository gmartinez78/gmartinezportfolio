export type BlogPostSummary = {
  slug: string;
  type: string;
  time: string;
  publishedAt: string;
  title: string;
  description: string;
};

export const BLOG_POSTS: BlogPostSummary[] = [
  { slug: "designing-ai-products", type: "Featured guide", time: "12 min", publishedAt: "2026-10-28", title: "Designing AI products people can actually trust.", description: "A practical field guide to turning uncertainty, explainability, and human judgment into useful product experiences." },
  { slug: "ai-discoverability", type: "Article", time: "8 min", publishedAt: "2026-10-21", title: "AI discoverability for portfolio websites", description: "How to make your work easier for people and AI systems to understand, cite, and remember." },
  { slug: "accessibility-checklist", type: "Checklist", time: "10 min", publishedAt: "2026-10-14", title: "Accessibility checks I run before handoff", description: "A repeatable review for keyboard access, content hierarchy, states, and assistive technology." },
  { slug: "product-strategy", type: "Guide", time: "10 min", publishedAt: "2026-10-07", title: "Product strategy that survives contact with reality", description: "A grounded approach to connecting customer evidence, constraints, and measurable outcomes." },
  { slug: "design-systems", type: "Essay", time: "9 min", publishedAt: "2026-09-30", title: "Design systems are a product, not a paint kit", description: "Why adoption, governance, and contribution matter as much as the component library." },
];

export const BLOG_POSTS_BY_RECENCY = [...BLOG_POSTS].sort(
  (left, right) => right.publishedAt.localeCompare(left.publishedAt),
);

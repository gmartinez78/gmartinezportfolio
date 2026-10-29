export type BlogPostSummary = {
  slug: string;
  type: string;
  time: string;
  publishedAt: string;
  title: string;
  description: string;
  /** Display date for published posts. */
  date?: string;
  /** Card cover image (shown on listing cards only, not on the post page). */
  cover?: { src: string; alt: string };
  published?: boolean;
};

export const BLOG_POSTS: BlogPostSummary[] = [
  { slug: "design-speed-faster-at-what", type: "Article", time: "3 min", publishedAt: "2026-10-29", date: "October 29, 2026", published: true, cover: { src: "/blog/design-speed-faster-at-what.jpg", alt: "A person working on a laptop showing a Figma canvas with app screens built from components and a 'Decide first' sticky note." }, title: "Revolut's Designers Got 3x Faster. Faster at What?", description: "AI made building screens 3x faster. But deciding was always the slow part, and that's where speed should count." },
  { slug: "ai-fail-design-problem", type: "Article", time: "3 min", publishedAt: "2026-10-28", date: "October 28, 2026", published: true, cover: { src: "/blog/ai-fail-design-problem.jpg", alt: "Hands holding a phone showing an AI-written comment with an Output error message." }, title: "The Funniest AI Fail on LinkedIn Is Actually a Design Problem", description: "An AI agent posted its own error message as a LinkedIn comment. We call it an AI problem. It is a design problem: unhappy paths, guardrails, and accessible failure states." },
  { slug: "designing-ai-products", type: "Featured guide", time: "12 min", publishedAt: "2026-10-28", title: "Designing AI products people can actually trust.", description: "A practical field guide to turning uncertainty, explainability, and human judgment into useful product experiences." },
  { slug: "ai-discoverability", type: "Article", time: "8 min", publishedAt: "2026-10-21", title: "AI discoverability for portfolio websites", description: "How to make your work easier for people and AI systems to understand, cite, and remember." },
  { slug: "accessibility-checklist", type: "Checklist", time: "10 min", publishedAt: "2026-10-14", title: "Accessibility checks I run before handoff", description: "A repeatable review for keyboard access, content hierarchy, states, and assistive technology." },
  { slug: "product-strategy", type: "Guide", time: "10 min", publishedAt: "2026-10-07", title: "Product strategy that survives contact with reality", description: "A grounded approach to connecting customer evidence, constraints, and measurable outcomes." },
  { slug: "design-systems", type: "Essay", time: "9 min", publishedAt: "2026-09-30", title: "Design systems are a product, not a paint kit", description: "Why adoption, governance, and contribution matter as much as the component library." },
];

export const BLOG_POSTS_BY_RECENCY = [...BLOG_POSTS].sort(
  (left, right) => right.publishedAt.localeCompare(left.publishedAt),
);

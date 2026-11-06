import { BLOG_POSTS } from "@/lib/blog-posts";
import { getAbsoluteUrl, siteName } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const posts = BLOG_POSTS.filter((post) => post.published);
  const items = posts
    .map((post) => {
      const url = getAbsoluteUrl(`/blog/${post.slug}/`);
      const pubDate = new Date(`${post.publishedAt}T12:00:00.000Z`).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteName)} Blog</title>
    <link>${getAbsoluteUrl("/blog/")}</link>
    <description>Practical notes on AI product design, accessibility, design systems, and product strategy.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

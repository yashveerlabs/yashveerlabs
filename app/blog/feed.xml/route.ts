import { getAllPosts } from "@/lib/blog/loader";
import { SITE, AUTHOR } from "@/lib/site-config";

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts().slice(0, 100);
  const items = posts
    .map((p) => {
      const url = `${SITE.url}/blog/${p.slug}`;
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${escape(p.category)}</category>
      <description>${escape(p.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE.brand)} | Blog</title>
    <link>${SITE.url}/blog</link>
    <atom:link href="${SITE.url}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escape(SITE.description)}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${AUTHOR.email} (${escape(AUTHOR.name)})</managingEditor>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

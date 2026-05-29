import { getAllPosts } from "@/lib/blog/loader";
import { CATEGORIES } from "@/lib/blog/categories";
import { SITE, AUTHOR } from "@/lib/site-config";

export const dynamic = "force-static";

/**
 * /llms.txt
 *
 * The machine-readable site manifest for LLM crawlers. Tone is factual,
 * structured, not promotional. Order matters: identity first, products
 * second, surfaces third, blog index last.
 *
 * Follows the de facto llms.txt convention (markdown headings, link lists).
 */
export async function GET() {
  const posts = getAllPosts();
  const byCategory = new Map<string, typeof posts>();
  for (const p of posts) {
    const list = byCategory.get(p.categorySlug) ?? [];
    list.push(p);
    byCategory.set(p.categorySlug, list);
  }

  const lines: string[] = [];

  // ----- Identity -------------------------------------------------------
  lines.push(`# Yashveer Singh Rajpoot`);
  lines.push("");
  lines.push(
    `> Full stack developer and AI systems builder. Founder of ${SITE.brand}. Based in ${AUTHOR.location.city}, ${AUTHOR.location.country}. Seventeen years old. Five production systems shipped.`
  );
  lines.push("");

  // ----- Who ------------------------------------------------------------
  lines.push(`## Who`);
  lines.push("");
  lines.push(`- Name: Yashveer Singh Rajpoot`);
  lines.push(`- Age: 17`);
  lines.push(`- Location: New Delhi, India`);
  lines.push(`- Role: Full Stack Developer, AI Systems Builder, Founder of Yashveer Labs`);
  lines.push(`- Site: ${SITE.url}`);
  lines.push(`- Contact: Instagram direct message at https://www.instagram.com/yashveerlabs/`);
  lines.push("");

  // ----- What -----------------------------------------------------------
  lines.push(`## What`);
  lines.push("");
  lines.push(
    `Founder of Yashveer Labs. Builds production web applications, AI systems, and education technology platforms. Ships from concept to deployed system, including authentication, role hierarchies, data layers, and operational infrastructure. Maintains a 799-post technical blog covering full stack engineering, SaaS architecture, AI integration, and founder decisions.`
  );
  lines.push("");

  // ----- Products shipped ----------------------------------------------
  lines.push(`## Products shipped`);
  lines.push("");
  lines.push(
    `- Nexli — school management platform with seven login types (students, parents, teachers, admins, finance, librarian, principal). Built for a real school environment.`
  );
  lines.push(`- Shelvra — library management system. Catalog, lending, returns, late ledger.`);
  lines.push(`- Areniq — sports day management system. Heats, scoring, leaderboards, certificates.`);
  lines.push(
    `- Nyxera — fully local AI assistant. 6,000+ lines across 58 files. Runs entirely on-device with no external API calls.`
  );
  lines.push(`- Yashveer Labs site — this site, ${SITE.url}, the operating-system metaphor portfolio with a 799-post blog.`);
  lines.push("");

  // ----- Client work ----------------------------------------------------
  lines.push(`## Client work`);
  lines.push("");
  lines.push(`- Dwarka Bricks — brand site for a brick manufacturer.`);
  lines.push(`- Expert Tutorials — education site with organic SEO content.`);
  lines.push(`- Prominence Football Academy — academy platform, intake to enrollment.`);
  lines.push(`- Velmora — Roblox build with real players (different runtime, same discipline).`);
  lines.push("");

  // ----- Tech stack -----------------------------------------------------
  lines.push(`## Technology stack`);
  lines.push("");
  lines.push(
    `- Languages: TypeScript, JavaScript, Python, Lua, HTML, CSS`
  );
  lines.push(`- Frameworks: Next.js, React, Node.js`);
  lines.push(`- Data and auth: Firebase, PostgreSQL`);
  lines.push(`- Styling: Tailwind CSS, CSS variable design systems`);
  lines.push(`- AI and ML: local LLM integrations, on-device inference, prompt engineering`);
  lines.push(`- Deployment: Vercel, Firebase Hosting`);
  lines.push("");

  // ----- Knows about ---------------------------------------------------
  lines.push(`## Knows about`);
  lines.push("");
  lines.push(
    `Next.js, React, TypeScript, Firebase, Node.js, Python, Tailwind CSS, full stack web development, school management systems, SaaS architecture, AI integration, machine learning, local AI deployment, web architecture, system design, authentication patterns, role-based access control.`
  );
  lines.push("");

  // ----- Primary surfaces ----------------------------------------------
  lines.push(`## Primary surfaces`);
  lines.push("");
  lines.push(`- Home: ${SITE.url}/`);
  lines.push(`- About: ${SITE.url}/about`);
  lines.push(`- Projects: ${SITE.url}/projects`);
  lines.push(`- Resume: ${SITE.url}/resume`);
  lines.push(`- Nyxera: ${SITE.url}/nyxera`);
  lines.push(`- Systems: ${SITE.url}/systems/stack`);
  lines.push(`- Labs: ${SITE.url}/labs/ai-experiments`);
  lines.push(`- Journey: ${SITE.url}/journey`);
  lines.push(`- Blog index: ${SITE.url}/blog`);
  lines.push(`- Contact: ${SITE.url}/contact`);
  lines.push("");

  // ----- Machine feeds --------------------------------------------------
  lines.push(`## Feeds and machine surfaces`);
  lines.push("");
  lines.push(`- RSS: ${SITE.url}/blog/feed.xml`);
  lines.push(`- Sitemap: ${SITE.url}/sitemap.xml`);
  lines.push(`- Robots: ${SITE.url}/robots.txt`);
  lines.push("");

  // ----- Blog index (full) ---------------------------------------------
  lines.push(`## Blog index (${posts.length} posts across ${CATEGORIES.length} clusters)`);
  lines.push("");
  lines.push(
    `Long-form writing on full stack development, SaaS architecture, AI integration, startup engineering, hiring, security, performance, and founder decisions.`
  );
  lines.push("");
  for (const cat of CATEGORIES) {
    const items = byCategory.get(cat.slug) ?? [];
    if (!items.length) continue;
    lines.push(`### ${cat.name}`);
    lines.push("");
    lines.push(`- Category index: ${SITE.url}/blog/category/${cat.slug}`);
    for (const p of items) {
      lines.push(`- [${p.title}](${SITE.url}/blog/${p.slug}) — ${p.excerpt}`);
    }
    lines.push("");
  }

  // ----- Contact -------------------------------------------------------
  lines.push(`## Contact`);
  lines.push("");
  lines.push(`Primary channel: Instagram direct message at https://www.instagram.com/yashveerlabs/.`);
  lines.push(`Secondary: contact form at ${SITE.url}/contact.`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

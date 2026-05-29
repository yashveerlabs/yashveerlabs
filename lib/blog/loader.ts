import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "./parse";
import { CATEGORY_BY_NAME, categorySlugFromName } from "./categories";

export type FAQEntry = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categorySlug: string;
  tags: string[];
  readingMinutes: number;
  ogImage: string;
  status: "draft" | "published";
  body: string;
  definition?: string;
  faq?: FAQEntry[];
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

let cache: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(CONTENT_DIR)) {
    cache = [];
    return cache;
  }
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const posts: BlogPost[] = [];
  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = parseFrontmatter(raw);
    const slug = (data.slug as string) ?? file.replace(/\.mdx$/, "");
    const category = (data.category as string) ?? "Uncategorized";
    posts.push({
      slug,
      title: (data.title as string) ?? slug,
      excerpt: (data.excerpt as string) ?? "",
      date: (data.date as string) ?? "2026-01-01",
      category,
      categorySlug:
        CATEGORY_BY_NAME[category]?.slug ?? categorySlugFromName(category),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      readingMinutes:
        typeof data.readingMinutes === "number" ? data.readingMinutes : 12,
      ogImage:
        (data.ogImage as string) ?? `/api/og/blog/${slug}`,
      status:
        data.status === "published" ? "published" : "draft",
      body: content,
      definition:
        typeof data.definition === "string" ? data.definition : undefined,
      faq: Array.isArray(data.faq) ? (data.faq as FAQEntry[]) : undefined,
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  cache = posts;
  return cache;
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategorySlug(categorySlug: string): BlogPost[] {
  return getAllPosts().filter((p) => p.categorySlug === categorySlug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function countByCategory(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const p of getAllPosts()) {
    out[p.categorySlug] = (out[p.categorySlug] ?? 0) + 1;
  }
  return out;
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/shared/PageShell";
import { PageHero } from "@/components/shared/PageHero";
import { buildMeta } from "@/lib/seo";
import { SITE, AUTHOR } from "@/lib/site-config";
import { breadcrumbSchema, jsonLdScriptProps } from "@/lib/schema";
import { CATEGORIES, CATEGORY_BY_SLUG } from "@/lib/blog/categories";
import { getPostsByCategorySlug } from "@/lib/blog/loader";

type Params = { category: string };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const cat = CATEGORY_BY_SLUG[category];
  if (!cat) {
    return buildMeta({
      title: "Category not found",
      description: "",
      path: `/blog/category/${category}`,
    });
  }
  return buildMeta({
    title: cat.name,
    description: cat.blurb,
    path: `/blog/category/${category}`,
    keywords: [cat.name, "Yashveer Labs", "engineering blog"],
  });
}

const PAGE_SIZE = 24;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;
  const sp = (await searchParams) ?? {};
  const cat = CATEGORY_BY_SLUG[category];
  if (!cat) notFound();

  const posts = getPostsByCategorySlug(category);
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visible = posts.slice(start, start + PAGE_SIZE);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.name} | Yashveer Labs Blog`,
    url: `${SITE.url}/blog/category/${cat.slug}`,
    description: cat.blurb,
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
    hasPart: visible.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE.url}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  };

  return (
    <PageShell>
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: cat.name, path: `/blog/category/${cat.slug}` },
          ])
        )}
      />
      <script {...jsonLdScriptProps(collectionSchema)} />

      <Link
        href="/blog"
        className="label-eyebrow-muted inline-flex items-center gap-2 text-[10px] hover:text-[var(--accent-gold)] md:text-[11px]"
      >
        <span>{"<-"}</span> All posts
      </Link>

      <PageHero
        eyebrow={`Category · ${cat.cluster}`}
        title={cat.name}
        intro={cat.blurb}
      />

      <p className="mt-10 text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {posts.length} posts · page {safePage} of {totalPages}
      </p>

      <ul className="mt-6 grid gap-5 md:mt-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--border-gold)] md:p-6"
            >
              <span className="label-eyebrow text-[10px]">{post.category}</span>
              <h2 className="mt-4 text-balance font-display text-[1.15rem] leading-[1.2] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-gold-hover)] md:text-[1.3rem]">
                {post.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-[14px] text-[var(--text-secondary)] md:text-[15px]">
                {post.excerpt}
              </p>
              <p className="mt-auto pt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {post.readingMinutes} min read
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {totalPages > 1 ? (
        <nav
          aria-label="Pagination"
          className="mt-12 flex flex-wrap items-center gap-2 md:mt-16"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
            const href =
              n === 1
                ? `/blog/category/${cat.slug}`
                : `/blog/category/${cat.slug}?page=${n}`;
            const active = n === safePage;
            return (
              <Link
                key={n}
                href={href}
                className={[
                  "rounded-full border px-3 py-1.5 text-[12px]",
                  active
                    ? "border-[var(--border-gold)] text-[var(--accent-gold)]"
                    : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]",
                ].join(" ")}
              >
                {n}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </PageShell>
  );
}

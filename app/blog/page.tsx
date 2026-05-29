import Link from "next/link";
import { PageShell } from "@/components/shared/PageShell";
import { PageHero } from "@/components/shared/PageHero";
import { FAQ, type FAQItem } from "@/components/sections/FAQ";
import { GoldLink } from "@/components/ui/GoldButton";
import { AmbientBackdrop } from "@/components/three/lazy";
import { AmbientImage } from "@/components/shared/AmbientImage";
import { buildMeta } from "@/lib/seo";
import { SITE, AUTHOR } from "@/lib/site-config";
import { breadcrumbSchema, faqSchema, jsonLdScriptProps } from "@/lib/schema";
import { getAllPosts, countByCategory } from "@/lib/blog/loader";
import { CATEGORIES, CATEGORY_BY_NAME } from "@/lib/blog/categories";

export const metadata = buildMeta({
  title: "Blog",
  description:
    "Long form notes on building production systems, scaling SaaS, hiring engineers, AI integration, and the engineering decisions behind Yashveer Labs. Eight hundred posts, indexed and growing.",
  path: "/blog",
  keywords: [
    "Yashveer Labs blog",
    "engineering blog",
    "SaaS architecture",
    "AI integration",
    "founders",
    "full stack developer blog",
  ],
});

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "How many posts are on this blog?",
    a: "Eight hundred topics are seeded across eighteen content clusters covering MVP development, SaaS architecture, AI integration, hiring, performance, security, and more. New full length posts are published in batches.",
  },
  {
    q: "Who writes these posts?",
    a: "Yashveer Singh Rajpoot, founder of Yashveer Labs. Every post is first person, written from the codebase, and tied to real production projects.",
  },
  {
    q: "Can I filter by topic?",
    a: "Yes. The category pages under /blog/category list every post inside that cluster, sorted by date. The search bar will land in the next release.",
  },
  {
    q: "Will you take guest posts?",
    a: "Not right now. This is a single voice surface. If you want to write with me, the contact page is the place.",
  },
  {
    q: "What is the editorial cadence?",
    a: "Quality over cadence. Posts ship when the thought is sharp enough to be worth your time. Drafts appear here as topics before they go long form.",
  },
];

const PAGE_SIZE = 24;

type Search = { page?: string; category?: string };

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = (await searchParams) ?? {};
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const activeCategorySlug = typeof sp.category === "string" ? sp.category : "";

  const all = getAllPosts();
  const counts = countByCategory();
  const filtered = activeCategorySlug
    ? all.filter((p) => p.categorySlug === activeCategorySlug)
    : all;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const activeCategory = activeCategorySlug
    ? CATEGORIES.find((c) => c.slug === activeCategorySlug)
    : null;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.brand} | Blog`,
    url: `${SITE.url}/blog`,
    description: SITE.description,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
    blogPost: visible.slice(0, 12).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      url: `${SITE.url}/blog/${p.slug}`,
      author: { "@type": "Person", name: AUTHOR.name },
    })),
  };

  const buildPageHref = (n: number) => {
    const params = new URLSearchParams();
    if (activeCategorySlug) params.set("category", activeCategorySlug);
    if (n > 1) params.set("page", String(n));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  return (
    <PageShell
      backdrop={
        <>
          <AmbientImage src="/images/blog-hero.webp" />
          <div className="absolute inset-0 opacity-25">
            <AmbientBackdrop variant="gold" />
          </div>
        </>
      }
    >
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ])
        )}
      />
      <script {...jsonLdScriptProps(blogSchema)} />
      <script {...jsonLdScriptProps(faqSchema(FAQ_ITEMS))} />

      <PageHero
        eyebrow={activeCategory ? activeCategory.name : "Blog"}
        title={
          activeCategory
            ? activeCategory.name
            : "The notes I would have wanted at fifteen."
        }
        intro={
          activeCategory
            ? activeCategory.blurb
            : "Long form pieces on shipping production systems, scaling SaaS, hiring engineers, AI integration, and the engineering decisions behind Yashveer Labs."
        }
      />

      <section
        aria-label="Browse by category"
        className="mt-12 flex flex-wrap gap-2 md:mt-16"
      >
        <Link
          href="/blog"
          className={[
            "rounded-full border px-3.5 py-1.5 text-[12px] uppercase tracking-[0.16em] transition-colors",
            !activeCategorySlug
              ? "border-[var(--border-gold)] text-[var(--accent-gold)]"
              : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]",
          ].join(" ")}
        >
          All <span className="ml-2 text-[var(--text-muted)]">{all.length}</span>
        </Link>
        {CATEGORIES.map((c) => {
          const isActive = c.slug === activeCategorySlug;
          const n = counts[c.slug] ?? 0;
          return (
            <Link
              key={c.slug}
              href={`/blog?category=${c.slug}`}
              className={[
                "rounded-full border px-3.5 py-1.5 text-[12px] uppercase tracking-[0.16em] transition-colors",
                isActive
                  ? "border-[var(--border-gold)] text-[var(--accent-gold)]"
                  : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]",
              ].join(" ")}
            >
              {c.name}
              <span className="ml-2 text-[var(--text-muted)]">{n}</span>
            </Link>
          );
        })}
      </section>

      <p className="mt-8 text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {filtered.length} posts · page {safePage} of {totalPages}
      </p>

      <ul className="mt-6 grid gap-5 md:mt-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--border-gold)] md:p-6"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="label-eyebrow text-[10px]">{post.category}</span>
                <time
                  className="text-[10px] text-[var(--text-muted)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                {post.status === "draft" ? (
                  <span className="rounded-full border border-[var(--border-gold)] px-1.5 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[var(--accent-gold)]">
                    Draft
                  </span>
                ) : null}
              </div>
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
          className="mt-12 flex flex-wrap items-center justify-between gap-3 md:mt-16"
        >
          <Pager
            page={safePage}
            totalPages={totalPages}
            buildPageHref={buildPageHref}
          />
        </nav>
      ) : null}

      <section className="mt-20 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:mt-24 md:p-10">
        <h2 className="font-display text-[clamp(1.5rem,4vw,2rem)] leading-[1.1] text-[var(--text-primary)]">
          More than blog posts.
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-secondary)] md:text-base">
          The Labs folder has the experiments themselves. The Systems folder
          has the stack and architecture. The Journey folder has the timeline.
          Pick whichever pulls you.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 md:mt-7">
          <GoldLink href="/labs/ai-experiments">Open Labs</GoldLink>
          <GoldLink href="/systems/stack" variant="ghost">
            See the stack
          </GoldLink>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </PageShell>
  );
}

function Pager({
  page,
  totalPages,
  buildPageHref,
}: {
  page: number;
  totalPages: number;
  buildPageHref: (n: number) => string;
}) {
  const window: number[] = [];
  const startN = Math.max(1, page - 2);
  const endN = Math.min(totalPages, page + 2);
  for (let i = startN; i <= endN; i += 1) window.push(i);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {page > 1 ? (
        <Link
          href={buildPageHref(page - 1)}
          className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-[12px] uppercase tracking-[0.16em] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
        >
          Prev
        </Link>
      ) : null}
      {startN > 1 ? (
        <>
          <Link
            href={buildPageHref(1)}
            className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-[12px] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
          >
            1
          </Link>
          {startN > 2 ? (
            <span className="px-2 text-[var(--text-muted)]">…</span>
          ) : null}
        </>
      ) : null}
      {window.map((n) => (
        <Link
          key={n}
          href={buildPageHref(n)}
          className={[
            "rounded-full border px-3 py-1.5 text-[12px]",
            n === page
              ? "border-[var(--border-gold)] text-[var(--accent-gold)]"
              : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]",
          ].join(" ")}
        >
          {n}
        </Link>
      ))}
      {endN < totalPages ? (
        <>
          {endN < totalPages - 1 ? (
            <span className="px-2 text-[var(--text-muted)]">…</span>
          ) : null}
          <Link
            href={buildPageHref(totalPages)}
            className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-[12px] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
          >
            {totalPages}
          </Link>
        </>
      ) : null}
      {page < totalPages ? (
        <Link
          href={buildPageHref(page + 1)}
          className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-[12px] uppercase tracking-[0.16em] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
        >
          Next
        </Link>
      ) : null}
    </div>
  );
}

import Link from "next/link";
import { PageShell } from "@/components/shared/PageShell";
import { AuthorBranding } from "./AuthorBranding";
import { RelatedPosts } from "./RelatedPosts";
import { PostBody } from "./PostBody";
import { FAQSection } from "./FAQSection";
import type { BlogPost } from "@/lib/blog/loader";
import { CATEGORY_BY_NAME } from "@/lib/blog/categories";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPostShell({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const categorySlug =
    CATEGORY_BY_NAME[post.category]?.slug ?? post.categorySlug;
  const isDraft = post.status === "draft";

  return (
    <PageShell>
      <Link
        href="/blog"
        className="label-eyebrow-muted inline-flex items-center gap-2 text-[10px] transition-colors hover:text-[var(--accent-gold)] md:text-[11px]"
      >
        <span>{"<-"}</span> All posts
      </Link>

      <article className="mt-8 max-w-3xl md:mt-10">
        <header>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link
              href={`/blog/category/${categorySlug}`}
              className="label-eyebrow text-[10px] text-[var(--accent-gold)] hover:underline"
            >
              {post.category}
            </Link>
            <time
              dateTime={post.date}
              className="text-[11px] text-[var(--text-muted)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {formatDate(post.date)}
            </time>
            <span
              className="text-[11px] text-[var(--text-muted)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {post.readingMinutes} min read
            </span>
            {isDraft ? (
              <span
                className="rounded-full border border-[var(--border-gold)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--accent-gold)]"
              >
                Draft
              </span>
            ) : null}
          </div>
          <h1 className="mt-5 text-balance font-display text-[clamp(2rem,7vw,4rem)] leading-[1.05] text-[var(--text-primary)] md:mt-6">
            {post.title}
          </h1>
          <p className="mt-5 text-pretty text-[17px] leading-[1.6] text-[var(--text-primary)] md:mt-6 md:text-xl">
            <strong>{post.definition ?? post.excerpt}</strong>
          </p>
          <p className="mt-5 text-[13px] text-[var(--text-muted)]">
            Written by{" "}
            <Link
              href="/about"
              className="text-[var(--accent-gold)] hover:underline"
            >
              Yashveer Singh Rajpoot
            </Link>
            , founder of Yashveer Labs.
          </p>
        </header>

        <div className="mt-12 md:mt-14">
          <PostBody source={post.body} />
        </div>

        {post.faq && post.faq.length ? (
          <FAQSection items={post.faq} />
        ) : null}

        <AuthorBranding slug={post.slug} />
        <RelatedPosts posts={related} />
      </article>
    </PageShell>
  );
}

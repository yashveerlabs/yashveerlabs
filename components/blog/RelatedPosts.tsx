import Link from "next/link";
import type { BlogPost } from "@/lib/blog/loader";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return (
    <section
      aria-labelledby="related-reading"
      className="mt-20 border-t border-[var(--border-subtle)] pt-12 md:mt-24 md:pt-16"
    >
      <header className="mb-6 flex flex-col gap-3 md:mb-8">
        <span className="label-eyebrow text-[10px]">Related reading</span>
        <h2
          id="related-reading"
          className="font-display text-[clamp(1.5rem,4vw,2.1rem)] leading-[1.1] text-[var(--text-primary)]"
        >
          Posts that line up with this one.
        </h2>
      </header>
      <ul className="grid gap-5 md:grid-cols-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--border-gold)] md:p-6"
            >
              <span className="label-eyebrow text-[10px]">{p.category}</span>
              <h3 className="mt-3 font-display text-[1.15rem] leading-[1.2] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-gold-hover)] md:text-[1.3rem]">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-[14px] text-[var(--text-secondary)]">
                {p.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { PageShell } from "./PageShell";
import { PageHero } from "./PageHero";
import { AmbientImage } from "./AmbientImage";
import { FAQ, type FAQItem } from "@/components/sections/FAQ";
import { GoldLink } from "@/components/ui/GoldButton";
import { AmbientBackdrop } from "@/components/three/lazy";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
} from "@/lib/schema";

export type Crumb = { name: string; path: string };

export type LongSection = {
  heading: string;
  paragraphs: string[];
  /** Optional pull quote rendered between paragraphs and the next section. */
  pullQuote?: string;
  /** Optional bulleted list rendered after paragraphs. */
  bullets?: string[];
};

export type SideStat = {
  label: string;
  value: string;
};

export type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  /** Used in the right-side stat block or replaced by `heroVisual`. */
  stats?: SideStat[];
  heroVisual?: React.ReactNode;
  backdropVariant?: "gold" | "cyan" | "violet";
  /** Optional ambient WebP layered behind the 3D backdrop. */
  backdropImage?: string;
  sections: LongSection[];
  related: RelatedLink[];
  faq: FAQItem[];
  crumbs: Crumb[];
};

/**
 * Standard long-form content page used by every Systems, Journey, and Labs
 * route. Wires the metadata-rendering JSON-LD, hero, sections, related
 * cross-links, and FAQ together with consistent voice and structure.
 */
export function LongFormPage({
  eyebrow,
  title,
  intro,
  stats,
  heroVisual,
  backdropVariant = "gold",
  backdropImage,
  sections,
  related,
  faq,
  crumbs,
}: Props) {
  return (
    <PageShell
      backdrop={
        <>
          {backdropImage ? (
            <AmbientImage src={backdropImage} />
          ) : null}
          <div className={`absolute inset-0 ${backdropImage ? "opacity-25" : "opacity-30"}`}>
            <AmbientBackdrop variant={backdropVariant} />
          </div>
        </>
      }
    >
      <script {...jsonLdScriptProps(breadcrumbSchema(crumbs))} />
      <script {...jsonLdScriptProps(faqSchema(faq))} />

      <PageHero
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        visual={
          heroVisual ??
          (stats ? (
            <div className="relative h-full w-full p-4 sm:p-6 md:p-8">
              <div className="grid h-full grid-cols-2 gap-2.5 sm:gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col justify-end rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 sm:p-5"
                  >
                    <span className="font-display text-[clamp(1.25rem,5vw,1.875rem)] leading-[1.05] text-[var(--text-primary)]">
                      {s.value}
                    </span>
                    <span className="label-eyebrow-muted mt-2 block text-[9px] sm:text-[10px]">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : undefined)
        }
      />

      <article className="mt-16 max-w-3xl space-y-10 text-[16px] text-[var(--text-secondary)] md:mt-20 md:space-y-14 md:text-lg">
        {sections.map((s, i) => (
          <section key={i} className="space-y-4 md:space-y-5">
            <h2 className="font-display text-[clamp(1.5rem,4.5vw,2.25rem)] leading-[1.1] text-[var(--text-primary)]">
              {s.heading}
            </h2>
            {s.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {s.bullets?.length ? (
              <ul className="mt-3 space-y-2 text-[15px] md:text-base">
                {s.bullets.map((b, k) => (
                  <li key={k} className="flex gap-3">
                    <span className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-gold)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {s.pullQuote ? (
              <blockquote className="border-l-2 border-[var(--accent-gold)] pl-5 font-display text-[1.25rem] leading-[1.2] text-[var(--text-primary)] md:pl-6 md:text-2xl">
                {s.pullQuote}
              </blockquote>
            ) : null}
          </section>
        ))}
      </article>

      <section className="mt-20 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:mt-24 md:p-10">
        <h2 className="font-display text-[clamp(1.5rem,4vw,2rem)] leading-[1.1] text-[var(--text-primary)]">
          Where to go next.
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 md:mt-7">
          {related.map((r) => (
            <a
              key={r.href}
              href={r.href}
              className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 transition-all hover:-translate-y-1 hover:border-[var(--border-gold)]"
            >
              <h3 className="font-display text-[1.125rem] leading-[1.15] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-gold-hover)] md:text-xl">
                {r.label}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{r.description}</p>
            </a>
          ))}
        </div>
        <div className="mt-6 md:mt-7">
          <GoldLink href="/projects" variant="ghost">
            Back to projects
          </GoldLink>
        </div>
      </section>

      <FAQ items={faq} />
    </PageShell>
  );
}

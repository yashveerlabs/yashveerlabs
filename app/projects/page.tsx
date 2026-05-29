import { PageShell } from "@/components/shared/PageShell";
import { PageHero } from "@/components/shared/PageHero";
import { ProjectImage } from "@/components/shared/ProjectImage";
import { FAQ, type FAQItem } from "@/components/sections/FAQ";
import { GoldLink } from "@/components/ui/GoldButton";
import { AmbientBackdrop } from "@/components/three/lazy";
import { AmbientImage } from "@/components/shared/AmbientImage";
import { buildMeta } from "@/lib/seo";
import { PROJECTS } from "@/lib/content/projects";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
} from "@/lib/schema";
import { SITE } from "@/lib/site-config";

export const metadata = buildMeta({
  title: "Projects",
  description:
    "Live systems built by Yashveer Singh Rajpoot: Dwarka Bricks, Expert Tutorials, Prominence Football Academy, Velmora, and Nexli.",
  path: "/projects",
  keywords: [
    "Dwarka Bricks",
    "Expert Tutorials",
    "Prominence Football Academy",
    "Velmora",
    "Nexli",
    "Yashveer Labs projects",
    "Next.js portfolio",
  ],
});

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "Are all of these projects actually live?",
    a: "Four of the five are. Dwarka Bricks, Expert Tutorials, Prominence Football Academy, and Velmora are on public URLs you can open right now. Nexli is in private testing inside one school. It is not publicly launched yet.",
  },
  {
    q: "Why is Nexli not public?",
    a: "Shipping software for a school is not the same as shipping a product page. Until the system has survived a full academic cycle with real teachers, real accountants, and real parents using it on the same day, it stays in private testing. The pressure inside one building is the best version control there is.",
  },
  {
    q: "What stack do you usually pick?",
    a: "TypeScript and Next.js for product surfaces, React for component-heavy UIs, Tailwind for design system speed, Firebase or SQL for data depending on what the system needs, Vercel for deployment. Lua for the Roblox work. Stack follows problem, not the other way around.",
  },
  {
    q: "Can I commission a site like Dwarka Bricks?",
    a: "Yes, but only if the brief is interesting and the operator behind it is serious about ownership. I do not run a template farm. The contact page has the direct line.",
  },
  {
    q: "Do you have case studies?",
    a: "Each project on this page is its own case study. The pattern is consistent: a clear problem, a structured response, real deployment, and an honest list of what the system does well versus what it is still learning to do.",
  },
  {
    q: "How do you decide what to build next?",
    a: "Two filters. Does it teach me something I do not already know how to do, and does it ship to real users at the end. If the answer to both is yes, it goes on the list.",
  },
];

const STATUS_LABEL: Record<string, string> = {
  live: "Live",
  "private-testing": "Private testing",
  shipped: "Shipped",
};

const STATUS_COLOR: Record<string, string> = {
  live: "text-[var(--accent-gold)] border-[var(--border-gold)]",
  "private-testing": "text-[var(--nyxera-cyan)] border-[color:var(--nyxera-cyan)]/40",
  shipped: "text-[var(--text-secondary)] border-[var(--border-subtle)]",
};

export default function ProjectsPage() {
  return (
    <PageShell
      backdrop={
        <>
          <AmbientImage src="/images/projects-hero.webp" />
          <div className="absolute inset-0 opacity-30">
            <AmbientBackdrop variant="gold" />
          </div>
        </>
      }
    >
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ])
        )}
      />
      <script {...jsonLdScriptProps(faqSchema(FAQ_ITEMS))} />

      {/* CreativeWork JSON-LD per project */}
      {PROJECTS.map((p) => (
        <script
          key={p.id}
          {...jsonLdScriptProps({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.name,
            description: p.summary,
            url: p.href ?? `${SITE.url}/projects#${p.id}`,
            author: {
              "@type": "Person",
              name: "Yashveer Singh Rajpoot",
              url: SITE.url,
            },
            dateCreated: p.year,
            keywords: p.stack.join(", "),
          })}
        />
      ))}

      <PageHero
        eyebrow="Projects"
        title="Every system on this page is a real deployment."
        intro="Four are on public URLs. One is inside a school in private testing. Each one taught me something I did not already know. Each one had to survive an audience that was not me."
      />

      <p className="mt-8 max-w-3xl text-[15px] text-[var(--text-secondary)] md:mt-12 md:text-base">
        I do not build for review screens. The work below is what happens when
        the rule is, finish it, deploy it, and let it meet someone who did not
        ask for it nicely. The set is small on purpose. I would rather ship
        five things that hold up than thirty that almost do.
      </p>

      <ol className="mt-16 space-y-20 md:mt-20 md:space-y-24">
        {PROJECTS.map((p, idx) => (
          <li id={p.id} key={p.id} className="scroll-mt-28">
            <article className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:gap-10">
              <header className="md:sticky md:top-28 md:self-start">
                <div className="flex items-center gap-3">
                  <span className="label-eyebrow-muted text-[10px] md:text-[11px]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-10 bg-[var(--border-subtle)]" />
                </div>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.05] text-[var(--text-primary)]">
                  {p.name}
                </h2>
                <p className="mt-3 text-[15px] text-[var(--text-secondary)] md:text-base">{p.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-[10px]">
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono uppercase tracking-[0.18em] ${
                      STATUS_COLOR[p.status] ?? STATUS_COLOR.shipped
                    }`}
                  >
                    {STATUS_LABEL[p.status]}
                  </span>
                  <span className="rounded-full border border-[var(--border-subtle)] px-2.5 py-1 font-mono uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                    {p.year}
                  </span>
                  <span className="rounded-full border border-[var(--border-subtle)] px-2.5 py-1 font-mono uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                    {p.category}
                  </span>
                </div>
                {p.href ? (
                  <div className="mt-6">
                    <GoldLink
                      href={p.href}
                      external={p.external}
                      variant={p.status === "private-testing" ? "cyan" : "primary"}
                    >
                      {p.status === "private-testing" ? "Watch it ship" : "Open the live site"}
                    </GoldLink>
                  </div>
                ) : null}
              </header>

              <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                <div className="relative aspect-[4/3] w-full md:aspect-[16/10]">
                  <ProjectImage slug={p.id} name={p.name} />
                </div>
                <div className="p-6 md:p-10">
                <p className="font-display text-lg leading-[1.3] text-[var(--text-primary)] md:text-xl">
                  {p.summary}
                </p>
                <div className="mt-6 space-y-4 text-[15px] text-[var(--text-secondary)] md:mt-8 md:space-y-5 md:text-base">
                  {p.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <div className="mt-6 md:mt-8">
                  <h3 className="label-eyebrow text-[10px] md:text-[11px]">What it does well</h3>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-gold)]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[var(--border-subtle)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>

      {/* Cross-link block */}
      <section className="mt-24 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:mt-32 md:p-10">
        <h2 className="font-display text-[clamp(1.5rem,4vw,2rem)] leading-[1.1] text-[var(--text-primary)]">
          Want to see the engine, not the output?
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-secondary)] md:text-base">
          The Systems folder breaks down the stack, the tools, the architecture
          patterns, and the engineering capabilities the work above is built on.
          The Journey folder traces how it all compounded year by year.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 md:mt-7">
          <GoldLink href="/systems/stack">Open the stack</GoldLink>
          <GoldLink href="/journey" variant="ghost">
            Read the journey
          </GoldLink>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </PageShell>
  );
}

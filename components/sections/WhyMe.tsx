import { cn } from "@/lib/utils";

/**
 * Six-card differentiator grid. One short claim per card, in the
 * editorial voice of the rest of the site.
 */

type Card = {
  index: string;
  title: string;
  body: string;
};

const CARDS: Card[] = [
  {
    index: "01",
    title: "Why I'm the call",
    body: "Most people in this space optimize for looking busy. I optimize for shipping things that work. The difference shows up the moment you check the URLs.",
  },
  {
    index: "02",
    title: "Earlier than expected",
    body: "Class 12, Commerce track, full stack developer. The categories do not line up, which is the point. The work runs in production. Everything else is paperwork.",
  },
  {
    index: "03",
    title: "Speed with structure",
    body: "Velocity without architecture is hacking. Architecture without velocity is talking. I do both, because production does not care about your excuses.",
  },
  {
    index: "04",
    title: "URLs, not screenshots",
    body: "Anyone can mock a dashboard in Figma. I run live sites, real databases, actual users hitting real endpoints. Every project on this page resolves in your browser right now. That changes the conversation.",
  },
  {
    index: "05",
    title: "Built for the next version",
    body: "Most systems break the moment they meet real traffic. I design for the version that ships in two years, not the one that demos next week. The work compounds. Anything else is rework with extra steps.",
  },
  {
    index: "06",
    title: "Where this is going",
    body: "Full stack is the entry point, not the address. The arc points at machine learning, AI engineering, and cybersecurity. Three years from now this portfolio reads differently because the work reads differently. That is the entire point.",
  },
];

export function WhyMe() {
  return (
    <section aria-labelledby="why-me-heading" className="mt-24 md:mt-32">
      <header className="mb-10 flex flex-col gap-4 md:mb-12">
        <span className="label-eyebrow text-[10px] md:text-[11px]">Why me</span>
        <h2
          id="why-me-heading"
          className="text-balance font-display text-[clamp(1.875rem,5vw,3rem)] leading-[1.05] text-[var(--text-primary)]"
        >
          Six reasons this is not the same pitch you have read all week.
        </h2>
        <p className="max-w-2xl text-[15px] text-[var(--text-secondary)] md:text-base">
          The work is the argument. These are the throughlines.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {CARDS.map((card) => (
          <li
            key={card.index}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:p-7",
              "transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-gold)] hover:shadow-[0_24px_50px_-30px_var(--accent-gold-glow)]"
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(120% 80% at 100% 0%, rgba(176,138,82,0.10), transparent 60%)",
              }}
            />
            <div className="relative flex items-center justify-between">
              <span className="label-eyebrow-muted text-[10px]">{card.index}</span>
              <span className="h-px w-12 bg-[var(--border-subtle)]" />
            </div>
            <h3 className="relative mt-5 font-display text-[1.5rem] leading-[1.1] text-[var(--text-primary)] md:text-2xl">
              {card.title}
            </h3>
            <p className="relative mt-3 text-[15px] leading-[1.6] text-[var(--text-secondary)]">
              {card.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

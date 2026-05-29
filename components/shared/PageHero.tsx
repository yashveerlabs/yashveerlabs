import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Right-side slot, usually a small 3D scene or stat block. */
  visual?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  visual,
  as = "h1",
  className,
}: Props) {
  const Title = as;
  return (
    <section
      className={cn(
        "relative grid items-center gap-8 pt-2 md:grid-cols-[1.4fr_1fr] md:gap-14 md:pt-6",
        className
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--accent-gold)] md:w-10" />
          <span className="label-eyebrow text-[10px] md:text-[11px]">{eyebrow}</span>
        </div>
        <Title className="mt-5 text-balance font-display text-[clamp(2.25rem,8vw,5.4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] md:mt-6">
          {title}
        </Title>
        {intro ? (
          <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-[1.7] text-[var(--text-secondary)] md:mt-7 md:text-lg lg:text-xl">
            {intro}
          </p>
        ) : null}
      </div>
      {visual ? (
        <div className="relative aspect-[4/5] h-auto w-full overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] md:aspect-auto md:h-[460px]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 30% 20%, rgba(176,138,82,0.15), transparent 60%), linear-gradient(180deg, rgba(23,17,28,0.4), rgba(15,10,18,0.8))",
            }}
          />
          {visual}
        </div>
      ) : null}
    </section>
  );
}

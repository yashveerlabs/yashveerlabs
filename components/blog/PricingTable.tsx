export type PricingTier = {
  name: string;
  price: string;
  cadence?: string;
  delivers: string[];
  highlight?: boolean;
};

export function PricingTable({ tiers }: { tiers: PricingTier[] }) {
  return (
    <div className="my-10 grid gap-5 md:grid-cols-3">
      {tiers.map((t, i) => (
        <article
          key={i}
          className={[
            "flex flex-col rounded-2xl border bg-[var(--bg-surface)] p-6",
            t.highlight
              ? "border-[var(--border-gold)] shadow-[0_18px_60px_-30px_var(--accent-gold-glow)]"
              : "border-[var(--border-subtle)]",
          ].join(" ")}
        >
          <p
            className="text-[11px] uppercase tracking-[0.18em]"
            style={{
              color: t.highlight
                ? "var(--accent-gold)"
                : "var(--text-muted)",
            }}
          >
            {t.name}
          </p>
          <p className="mt-3 font-display text-[1.85rem] leading-[1.05] text-[var(--text-primary)]">
            {t.price}
            {t.cadence ? (
              <span className="ml-2 text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t.cadence}
              </span>
            ) : null}
          </p>
          <ul className="mt-5 space-y-2 text-[14px] text-[var(--text-secondary)]">
            {t.delivers.map((line, j) => (
              <li key={j} className="flex gap-2">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-gold)]"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

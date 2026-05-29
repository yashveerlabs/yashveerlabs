export function ExpertQuote({
  quote,
  attribution,
  role,
}: {
  quote: string;
  attribution: string;
  role?: string;
}) {
  return (
    <figure className="my-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:p-8">
      <span className="label-eyebrow text-[10px]">Expert opinion</span>
      <blockquote className="mt-4 font-display text-[1.35rem] leading-[1.25] text-[var(--text-primary)] md:text-[1.6rem]">
        {quote}
      </blockquote>
      <figcaption className="mt-5 text-[13px] text-[var(--text-muted)]">
        <span className="text-[var(--accent-gold)]">{attribution}</span>
        {role ? <span> · {role}</span> : null}
      </figcaption>
    </figure>
  );
}

export type ComparisonRow = {
  option: string;
  price: string;
  pros: string;
  cons: string;
};

export function ComparisonTable({
  caption,
  rows,
}: {
  caption?: string;
  rows: ComparisonRow[];
}) {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      {caption ? (
        <figcaption className="border-b border-[var(--border-subtle)] px-5 py-4 text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {caption}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[14px]">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              <th className="px-5 py-4 font-medium">Option</th>
              <th className="px-5 py-4 font-medium">Price</th>
              <th className="px-5 py-4 font-medium">Pros</th>
              <th className="px-5 py-4 font-medium">Cons</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className="border-b border-[var(--border-subtle)] last:border-0 align-top"
              >
                <td className="px-5 py-4 font-display text-[16px] text-[var(--text-primary)]">
                  {r.option}
                </td>
                <td className="px-5 py-4 text-[var(--accent-gold)]">{r.price}</td>
                <td className="px-5 py-4 text-[var(--text-secondary)]">{r.pros}</td>
                <td className="px-5 py-4 text-[var(--text-secondary)]">{r.cons}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

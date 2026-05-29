import { PageShell } from "./PageShell";
import { SectionHeading } from "./SectionHeading";

/**
 * Temporary stub used by every route during Phase 1 so the dock
 * has somewhere to navigate to. Each page replaces this with its own
 * hero, sections, 3D scene, and long-form content in later phases.
 */
export function PhaseOneStub({
  eyebrow,
  title,
  description,
  phase,
}: {
  eyebrow: string;
  title: string;
  description: string;
  phase: number;
}) {
  return (
    <PageShell>
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
      <div className="glass rounded-3xl p-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-gold)]">
          Scheduled for Phase {phase}
        </p>
        <p className="mt-4 text-[var(--text-secondary)]">
          The route exists and the dock can reach it. The hero, 3D scene, content,
          and FAQ for this page ship in Phase {phase}.
        </p>
      </div>
    </PageShell>
  );
}

import Link from "next/link";
import { PROJECTS } from "@/lib/content/projects";
import { GoldLink } from "@/components/ui/GoldButton";
import { ProjectImage } from "@/components/shared/ProjectImage";
import { cn } from "@/lib/utils";

export function ProjectsPreview() {
  const preview = PROJECTS.slice(0, 4);
  return (
    <section aria-labelledby="projects-preview" className="mt-24 md:mt-32">
      <header className="mb-8 flex flex-col items-start justify-between gap-6 md:mb-10 md:flex-row md:items-end">
        <div className="flex flex-col gap-3">
          <span className="label-eyebrow text-[10px] md:text-[11px]">Built and shipped</span>
          <h2
            id="projects-preview"
            className="text-balance font-display text-[clamp(1.875rem,5vw,3rem)] leading-[1.05] text-[var(--text-primary)]"
          >
            Real systems, live URLs, no mockups.
          </h2>
        </div>
        <GoldLink href="/projects">All projects</GoldLink>
      </header>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {preview.map((p) => (
          <li key={p.id}>
            <Link
              href={`/projects#${p.id}`}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]",
                "transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-gold)] hover:shadow-[0_24px_50px_-30px_var(--accent-gold-glow)]"
              )}
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <ProjectImage slug={p.id} name={p.name} variant="thumb" />
              </div>
              <div className="relative flex flex-1 flex-col p-6 md:p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(140% 90% at 0% 0%, rgba(176,138,82,0.08), transparent 60%)",
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="label-eyebrow-muted text-[10px]">{p.category}</span>
                  <StatusBadge status={p.status} />
                </div>
                <h3 className="relative mt-5 font-display text-[1.5rem] leading-[1.05] text-[var(--text-primary)] md:text-[1.75rem]">
                  {p.name}
                </h3>
                <p className="relative mt-3 max-w-md text-sm text-[var(--text-secondary)]">
                  {p.tagline}
                </p>
                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[var(--border-subtle)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[var(--text-secondary)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StatusBadge({ status }: { status: "live" | "private-testing" | "shipped" }) {
  const label =
    status === "live" ? "Live" : status === "private-testing" ? "Private testing" : "Shipped";
  const color =
    status === "live"
      ? "text-[var(--accent-gold)] border-[var(--border-gold)]"
      : status === "private-testing"
      ? "text-[var(--nyxera-cyan)] border-[color:var(--nyxera-cyan)]/40"
      : "text-[var(--text-secondary)] border-[var(--border-subtle)]";
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em]",
        "label-eyebrow",
        color
      )}
      style={{ color: "inherit" }}
    >
      {label}
    </span>
  );
}

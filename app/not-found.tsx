import Link from "next/link";
import { PageShell } from "@/components/shared/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-gold)]">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl text-[var(--text-primary)] md:text-7xl">
          Off the map.
        </h1>
        <p className="mt-6 max-w-md text-[var(--text-secondary)]">
          This route is not part of the system. Head back to the home dock and try
          again.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-[var(--border-gold)] px-6 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-gold)] transition-colors hover:bg-[var(--accent-gold-glow)]"
        >
          Return home
        </Link>
      </div>
    </PageShell>
  );
}

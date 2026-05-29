import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type Variant = "card" | "thumb";

type Props = {
  slug: string;
  name: string;
  variant?: Variant;
  className?: string;
};

function publicExists(rel: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
}

/**
 * Project image slot. Loads `/images/projects/<slug>.webp` (or `<slug>-thumb.webp`
 * for the thumb variant) when present. Otherwise renders a graceful fallback
 * card: the project name in Bodoni Moda over a dark plum gradient with an
 * "image coming" caption in Cormorant SC. No broken image icons.
 *
 * Aspect ratios: 16:10 on desktop, 4:3 on mobile (set by the caller's wrapper).
 */
export function ProjectImage({ slug, name, variant = "card", className }: Props) {
  const fileRel = variant === "thumb" ? `images/projects/${slug}-thumb.webp` : `images/projects/${slug}.webp`;
  const present = publicExists(fileRel);

  return (
    <div className={"relative h-full w-full overflow-hidden " + (className ?? "")}>
      {present ? (
        <Image
          src={"/" + fileRel}
          alt={name}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      ) : (
        <ProjectFallback name={name} />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-1 ring-[color:var(--border-subtle)]"
      />
    </div>
  );
}

function ProjectFallback({ name }: { name: string }) {
  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 20% 10%, rgba(176,138,82,0.18), transparent 60%), linear-gradient(140deg, #1F1825 0%, #17111C 60%, #0F0A12 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <span className="font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.1] text-[var(--text-primary)]">
          {name}
        </span>
        <span className="label-eyebrow-muted text-[10px] md:text-[11px]">Image coming</span>
      </div>
    </div>
  );
}

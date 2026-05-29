import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const PORTRAIT_REL = "/images/portrait.webp";

function portraitExists() {
  try {
    const full = path.join(process.cwd(), "public", "images", "portrait.webp");
    return fs.existsSync(full);
  } catch {
    return false;
  }
}

/**
 * 800x1000 portrait slot for the About hero.
 * Loads /images/portrait.webp when present, falls back to a Y monogram
 * card so the layout never breaks while the asset is being prepared.
 */
export function Portrait() {
  const present = portraitExists();
  return (
    <div className="relative h-full w-full overflow-hidden">
      {present ? (
        <>
          <Image
            src={PORTRAIT_REL}
            alt="Yashveer Singh Rajpoot portrait"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            priority
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 80px rgba(15,10,18,0.4)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 ring-1 ring-[color:var(--border-subtle)]"
          />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 30% 20%, rgba(176,138,82,0.30), transparent 60%), radial-gradient(120% 90% at 80% 80%, rgba(0,217,255,0.10), transparent 60%), linear-gradient(180deg, rgba(23,17,28,0.5), rgba(23,17,28,0.85))",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 80px rgba(15,10,18,0.4)" }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3">
              <span className="font-display text-[clamp(80px,18vw,140px)] leading-none text-[var(--accent-gold)] opacity-90">
                Y
              </span>
              <span className="label-eyebrow text-[10px] md:text-[11px]" style={{ color: "var(--text-secondary)" }}>
                Yashveer Labs
              </span>
              <span className="label-eyebrow-muted text-[9px] md:text-[10px]">
                Portrait coming
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

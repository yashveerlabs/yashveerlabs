"use client";

import { useHideOnScroll } from "@/lib/useHideOnScroll";

const INSTAGRAM_HREF = "https://www.instagram.com/yashveerlabs/";

/**
 * Fixed editorial header. One unified layout at every breakpoint:
 *   LEFT:  monogram + name in Cormorant SC small caps
 *   RIGHT: single Connect button (gold pill, opens Instagram)
 *
 * Hides on scroll down past 200px, shows on scroll up. Animation is a
 * GPU transform with will-change so scrolling stays smooth.
 */
export function Header() {
  const visible = useHideOnScroll(200);
  return (
    <header
      aria-label="Site header"
      data-visible={visible ? "true" : "false"}
      className="header-shell fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4 md:top-5"
    >
      <div
        className="glass flex w-full max-w-[calc(100vw-1.5rem)] items-center gap-3 rounded-[20px] px-3 py-2 sm:px-4 sm:py-2.5 md:max-w-[1320px] md:gap-6 md:px-5 md:py-3"
        style={{ background: "rgba(23, 17, 28, 0.6)" }}
      >
        {/* LEFT: logo + name */}
        <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
          <Monogram />
          <span
            className="truncate text-[10px] uppercase text-[var(--text-primary)] sm:text-[11px] lg:text-[12px]"
            style={{ fontFamily: "var(--font-label)", letterSpacing: "0.15em" }}
          >
            {/* Full name shown from sm up. Initial form on the tightest screens. */}
            <span className="hidden sm:inline">Yashveer Singh Rajpoot</span>
            <span className="sm:hidden">Yashveer S. Rajpoot</span>
          </span>
        </div>

        {/* RIGHT: single Connect button */}
        <a
          href={INSTAGRAM_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on Instagram"
          className="btn-connect shrink-0 px-3.5 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-[12px] md:px-[22px] md:py-[10px] md:text-[13px]"
        >
          <span className="relative z-10">Connect</span>
        </a>
      </div>
    </header>
  );
}

function Monogram() {
  return (
    <span
      aria-hidden
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--border-gold)] bg-[var(--bg-surface)]/60 text-[var(--accent-gold)] sm:h-10 sm:w-10"
      style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 500, lineHeight: 1 }}
    >
      Y
    </span>
  );
}

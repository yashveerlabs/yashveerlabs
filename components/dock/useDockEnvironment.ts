"use client";

import { useEffect, useState } from "react";

/**
 * Two flags the dock branches on:
 *   - reduced:   user prefers reduced motion (kills magnification + morph)
 *   - compact:   viewport < 768px (no magnification, fullscreen folder panels)
 */
export function useDockEnvironment() {
  const [reduced, setReduced] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sizeMql = window.matchMedia("(max-width: 767px)");

    const sync = () => {
      setReduced(motionMql.matches);
      setCompact(sizeMql.matches);
    };
    sync();

    motionMql.addEventListener("change", sync);
    sizeMql.addEventListener("change", sync);
    return () => {
      motionMql.removeEventListener("change", sync);
      sizeMql.removeEventListener("change", sync);
    };
  }, []);

  return { reduced, compact };
}

/**
 * Dock hide-on-scroll-down, show-on-scroll-up, with a 150ms debounce
 * and a 200px threshold below which it is always visible.
 */
export function useDockVisibility(threshold = 200, debounce = 150) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      const y = window.scrollY;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (y < threshold) {
          setVisible(true);
        } else if (y > lastY + 4) {
          setVisible(false);
        } else if (y < lastY - 4) {
          setVisible(true);
        }
        lastY = y;
      }, debounce);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [threshold, debounce]);

  return visible;
}

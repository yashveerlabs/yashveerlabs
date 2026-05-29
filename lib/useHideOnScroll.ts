"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` when the element should be visible. Hides on scroll down
 * past `threshold` px, shows on scroll up. rAF-throttled, passive listener.
 * Transforms (and nothing else) should drive the animation in callers.
 */
export function useHideOnScroll(threshold = 200) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastVisible = true;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      let next = lastVisible;
      if (y < threshold) {
        next = true;
      } else if (dy > 4) {
        next = false;
      } else if (dy < -4) {
        next = true;
      }
      if (next !== lastVisible) {
        lastVisible = next;
        setVisible(next);
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
}

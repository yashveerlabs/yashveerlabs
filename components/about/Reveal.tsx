"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Cinematic fade-up reveal. Triggers once when the element scrolls into view,
 * respects `prefers-reduced-motion`, and uses an editorial easing curve.
 */
type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.9,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y },
    shown: { opacity: 1, y: 0 },
  };
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Count-up animation for the stat block. Uses a single requestAnimationFrame
 * tween started by an IntersectionObserver. No framer dependency.
 */
type CountProps = {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

export function Count({
  to,
  duration = 1.6,
  suffix = "",
  className,
}: CountProps) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = (now - start) / 1000;
              const t = Math.min(1, elapsed / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(to * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        }
      },
      { rootMargin: "-80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

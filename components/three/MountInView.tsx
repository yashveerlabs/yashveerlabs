"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** When true (default), nothing renders below 768px. */
  desktopOnly?: boolean;
  /** Intersection threshold rootMargin. */
  rootMargin?: string;
};

/**
 * Mount children only after the wrapper has intersected the viewport.
 * Used to defer 3D scenes until they're actually about to be seen, and
 * to skip them entirely on mobile.
 */
export function MountInView({
  children,
  desktopOnly = true,
  rootMargin = "200px",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (desktopOnly && window.matchMedia("(max-width: 767px)").matches) {
      setShow(false);
      return;
    }
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShow(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [desktopOnly, rootMargin]);

  return (
    <div ref={ref} className="absolute inset-0">
      {show ? children : null}
    </div>
  );
}

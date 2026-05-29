"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

type Props = Omit<CanvasProps, "children"> & {
  children: React.ReactNode;
  className?: string;
};

/**
 * Standard R3F canvas wrapper.
 *  - Caps DPR at [1, 2] for perf.
 *  - Pauses frame loop only when the document is hidden, never on visibility
 *    intersection (callers can opt-out by mounting on view).
 *  - Children are wrapped in <Suspense fallback={null}> so an asset load does
 *    not unmount the entire canvas.
 */
export function StageCanvas({ children, className, ...rest }: Props) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={hidden ? "demand" : "always"}
      className={className}
      {...rest}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}

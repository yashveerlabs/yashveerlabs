"use client";

import dynamic from "next/dynamic";
import { MountInView } from "./MountInView";

/**
 * 3D scenes are dynamically imported and never SSR. They are wrapped in a
 * <MountInView /> guard so heavy WebGL only runs when the host element is in
 * view, and never on mobile (<768px) where the lag cost outweighs the visual
 * gain. Callers receive the same component name.
 */

const HeroSigilRaw = dynamic(
  () => import("./HeroSigil").then((m) => m.HeroSigil),
  { ssr: false }
);

const AmbientBackdropRaw = dynamic(
  () => import("./AmbientBackdrop").then((m) => m.AmbientBackdrop),
  { ssr: false }
);

const NyxeraCoreRaw = dynamic(
  () => import("./NyxeraCore").then((m) => m.NyxeraCore),
  { ssr: false }
);

export function HeroSigil() {
  return (
    <>
      <SigilStaticFallback />
      <MountInView desktopOnly>
        <HeroSigilRaw />
      </MountInView>
    </>
  );
}

function SigilStaticFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center md:hidden">
      <svg viewBox="0 0 200 200" className="h-[60%] w-[60%]" aria-hidden>
        <defs>
          <radialGradient id="gold" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#D4B074" />
            <stop offset="50%" stopColor="#B08A52" />
            <stop offset="100%" stopColor="#7A5B57" />
          </radialGradient>
        </defs>
        <g transform="translate(100,100)">
          <circle r="58" fill="url(#gold)" opacity="0.85" />
          <circle r="72" fill="none" stroke="#B08A52" strokeWidth="1" opacity="0.6" />
          <circle r="86" fill="none" stroke="#B08A52" strokeWidth="0.5" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}

export function AmbientBackdrop({
  variant = "gold",
}: {
  variant?: "gold" | "cyan" | "violet";
}) {
  return (
    <MountInView desktopOnly>
      <AmbientBackdropRaw variant={variant} />
    </MountInView>
  );
}

export function NyxeraCore() {
  return (
    <MountInView desktopOnly>
      <NyxeraCoreRaw />
    </MountInView>
  );
}

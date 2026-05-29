"use client";

import {
  motion,
  type MotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SPRING = { mass: 0.12, stiffness: 220, damping: 18 } as const;
const TAP_SPRING = { type: "spring" as const, stiffness: 300, damping: 22 };
const MAGNIFY_RANGE = 150;
const BASE = 72;
const PEAK = 96;
const BASE_COMPACT = 48;

type Props = {
  icon: string;
  label: string;
  active?: boolean;
  accent?: "gold" | "nyxera";
  mouseX: MotionValue<number>;
  reduced: boolean;
  compact: boolean;
  /** Optional shared layoutId for folder icons that morph into panels. */
  layoutId?: string;
  /** When true, the icon is treated as the source of an in-progress morph. */
  hideForLayout?: boolean;
  onClick?: () => void;
};

export function DockIcon({
  icon,
  label,
  active = false,
  accent = "gold",
  mouseX,
  reduced,
  compact,
  layoutId,
  hideForLayout = false,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const base = compact ? BASE_COMPACT : BASE;
  const peak = compact ? BASE_COMPACT : PEAK;

  // Distance from the cursor to this icon's center, used for magnification.
  const distance = useTransform(mouseX, (val) => {
    if (val === Infinity || reduced || compact) return MAGNIFY_RANGE;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return MAGNIFY_RANGE;
    return Math.abs(val - rect.x - rect.width / 2);
  });

  const sizeRaw = useTransform(distance, [0, MAGNIFY_RANGE], [peak, base]);
  const size = useSpring(sizeRaw, SPRING);

  const accentRing =
    accent === "nyxera"
      ? "ring-[color:var(--nyxera-cyan)]/40"
      : "ring-[color:var(--accent-gold)]/40";
  const accentBorder =
    accent === "nyxera"
      ? "border-[color:var(--nyxera-cyan)]/55 shadow-[0_0_24px_-6px_var(--nyxera-glow)]"
      : "border-[color:var(--accent-gold)]/55 shadow-[0_0_24px_-6px_var(--accent-gold-glow)]";
  const accentBar =
    accent === "nyxera"
      ? "bg-[var(--nyxera-cyan)]"
      : "bg-[var(--accent-gold)]";

  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      style={
        reduced || compact
          ? { width: base, height: base }
          : { width: size, height: size }
      }
      animate={{ opacity: hideForLayout ? 0 : 1 }}
      transition={{ opacity: { duration: 0.15 } }}
      whileTap={reduced ? undefined : { scale: 0.94, transition: TAP_SPRING }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        "group relative flex shrink-0 cursor-pointer select-none items-center justify-center overflow-visible rounded-[14px]",
        "transition-shadow duration-200",
        active
          ? accent === "nyxera"
            ? "shadow-[0_0_28px_-6px_var(--nyxera-glow)]"
            : "shadow-[0_0_28px_-6px_var(--accent-gold-glow)]"
          : ""
      )}
    >
      <Image
        src={icon}
        alt=""
        width={128}
        height={128}
        sizes="128px"
        draggable={false}
        className="pointer-events-none h-full w-full select-none object-contain"
      />

      {active ? (
        <>
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 rounded-[14px] ring-2",
              accentRing
            )}
          />
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute -bottom-3 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full",
              accentBar
            )}
          />
        </>
      ) : null}

      <span
        className={cn(
          "pointer-events-none absolute -top-12 whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-medium tracking-wide",
          "border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]",
          "opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

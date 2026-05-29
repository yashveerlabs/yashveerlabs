import { cn } from "@/lib/utils";

/**
 * Standard page wrapper. Provides:
 *   - top spacing for the fixed header (~64px tall) plus breathing room
 *   - bottom spacing reserved for the always-visible dock
 *   - optional ambient backdrop slot (dropped behind everything at z-0)
 *   - subtle film grain layer
 *
 * Horizontal padding: 24px on mobile, scaling up to 40px on desktop. The
 * outer container caps at 1320px so wide screens get even gutter.
 */
export function PageShell({
  children,
  backdrop,
  className,
}: {
  children: React.ReactNode;
  backdrop?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative min-h-dvh w-full grain">
      {backdrop ? (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          {backdrop}
        </div>
      ) : null}

      <main
        className={cn(
          "relative z-20 mx-auto w-full max-w-[1320px] px-6 pb-36 pt-24 sm:px-7 sm:pt-28 md:px-10 md:pb-40 md:pt-32",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}

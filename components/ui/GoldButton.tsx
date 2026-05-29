import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "cyan";

type Common = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type LinkProps = Common & {
  href: string;
  external?: boolean;
};

type ButtonProps = Common & {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

function classes(variant: Variant = "primary") {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.15em] transition-all duration-200 md:px-6 md:py-3 md:text-[13px]";
  if (variant === "primary") {
    return cn(
      base,
      "border border-[var(--border-gold)] bg-[color:var(--accent-gold-glow)] text-[var(--accent-gold)]",
      "hover:bg-[color:rgba(176,138,82,0.28)] hover:text-[var(--accent-gold-hover)] hover:shadow-[0_18px_40px_-20px_var(--accent-gold-glow)]"
    );
  }
  if (variant === "cyan") {
    return cn(
      base,
      "border border-[color:var(--nyxera-cyan)]/45 bg-[color:var(--nyxera-glow)] text-[var(--nyxera-cyan)]",
      "hover:bg-[color:rgba(0,217,255,0.28)] hover:shadow-[0_18px_40px_-20px_var(--nyxera-glow)]"
    );
  }
  return cn(
    base,
    "border border-[var(--border-subtle)] text-[var(--text-secondary)]",
    "hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
  );
}

export function GoldLink({ href, external, variant, className, children }: LinkProps) {
  const cls = cn(classes(variant), className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ArrowOut />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      <ArrowIn />
    </Link>
  );
}

export function GoldButton({ onClick, type = "button", disabled, variant, className, children }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        classes(variant),
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

function ArrowIn() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden
      className="transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <path d="M1 5.5H10M10 5.5L6 1.5M10 5.5L6 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowOut() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M3 8L8 3M8 3H4M8 3V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: Props) {
  const Title = as;
  return (
    <header
      className={cn(
        "mb-12 flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--accent-gold)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
            {eyebrow}
          </span>
        </div>
      ) : null}
      <Title
        className={cn(
          "text-balance font-display text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1.05] text-[var(--text-primary)]"
        )}
      >
        {title}
      </Title>
      {description ? (
        <p className="max-w-2xl text-pretty text-base text-[var(--text-secondary)] md:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}

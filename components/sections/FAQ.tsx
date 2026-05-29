"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type FAQItem = { q: string; a: string };

export function FAQ({
  items,
  heading = "Questions worth answering",
  eyebrow = "FAQ",
}: {
  items: FAQItem[];
  heading?: string;
  eyebrow?: string;
}) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="mt-20 border-t border-[var(--border-subtle)] pt-12 md:mt-24 md:pt-16"
    >
      <header className="mb-8 flex flex-col gap-3 md:mb-10">
        <span className="label-eyebrow text-[10px] md:text-[11px]">{eyebrow}</span>
        <h2 id="faq-heading" className="font-display text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.1] text-[var(--text-primary)]">
          {heading}
        </h2>
      </header>
      <ul className="divide-y divide-[var(--border-subtle)]">
        {items.map((item, i) => (
          <FAQRow key={i} item={item} />
        ))}
      </ul>
    </section>
  );
}

function FAQRow({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-start justify-between gap-4 py-5 text-left md:gap-6 md:py-6"
      >
        <span
          className={cn(
            "text-pretty font-display text-[17px] leading-[1.25] text-[var(--text-primary)] md:text-xl",
            "transition-colors group-hover:text-[var(--accent-gold-hover)]"
          )}
        >
          {item.q}
        </span>
        <span
          aria-hidden
          className={cn(
            "mt-2 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-all",
            open
              ? "rotate-45 border-[var(--border-gold)] text-[var(--accent-gold)]"
              : "group-hover:border-[var(--border-gold)]"
          )}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-6 text-[var(--text-secondary)]">{item.a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

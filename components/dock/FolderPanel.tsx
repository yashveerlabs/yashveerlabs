"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { DockFolder, DockItem } from "./dock-config";
import { findFolder } from "./dock-utils";

const PANEL_TRANSITION = {
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
  mass: 0.8,
};

type Props = {
  /** Path of folder ids. path[0] is the root (anchors the layoutId morph). */
  path: string[];
  /** The dock-level tree, used to resolve ids. */
  tree: DockItem[];
  reduced: boolean;
  compact: boolean;
  onClose: () => void;
  onPush: (childFolderId: string) => void;
  onBack: () => void;
};

export function FolderPanel({
  path,
  tree,
  reduced,
  compact,
  onClose,
  onPush,
  onBack,
}: Props) {
  const rootId = path[0];
  const currentId = path[path.length - 1];
  const current = currentId ? findFolder(tree, currentId) : null;
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus the close button on open for keyboard users; restore focus on close.
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    return () => prev?.focus?.();
  }, [rootId]);

  // Esc handling. Back if nested, otherwise close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (path.length > 1) onBack();
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [path.length, onBack, onClose]);

  // Trap focus inside the panel while open.
  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = node.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !node.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [path.length]);

  if (!rootId || !current) return null;

  const layoutId = `dock-folder-${rootId}`;
  const canGoBack = path.length > 1;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={`${current.label} folder`}>
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Close folder"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0.15 : 0.4 }}
        className="absolute inset-0 cursor-default"
        style={{
          background: "rgba(15, 10, 18, 0.72)",
          backdropFilter: "blur(40px) saturate(120%)",
          WebkitBackdropFilter: "blur(40px) saturate(120%)",
        }}
      />

      {/* Panel that morphs from the folder icon */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-0 md:p-10">
        <motion.div
          ref={panelRef}
          layoutId={reduced ? undefined : layoutId}
          initial={reduced ? { opacity: 0, scale: 0.96 } : false}
          animate={reduced ? { opacity: 1, scale: 1 } : undefined}
          exit={reduced ? { opacity: 0, scale: 0.96 } : undefined}
          transition={reduced ? { duration: 0.2 } : PANEL_TRANSITION}
          className={cn(
            "glass-strong gold-glow pointer-events-auto relative overflow-hidden border border-[var(--border-subtle)]",
            compact
              ? "h-[100dvh] w-screen rounded-none"
              : "w-full max-w-[720px] rounded-[32px]"
          )}
          style={{ background: "rgba(23, 17, 28, 0.5)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 px-5 pt-6 md:px-10 md:pt-8">
            <div className="flex items-center gap-3">
              {canGoBack ? (
                <button
                  type="button"
                  onClick={onBack}
                  aria-label="Back to previous folder"
                  className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-gold)] hover:text-[var(--accent-gold)]"
                >
                  <BackIcon />
                </button>
              ) : null}
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  Folder
                </span>
                <h2 className="font-display text-2xl text-[var(--text-primary)] md:text-3xl">
                  {current.label}
                </h2>
              </div>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close folder"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-gold)] hover:text-[var(--accent-gold)]"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Crossfading content keyed by the current sub-folder id */}
          <div className="px-5 pb-8 pt-6 md:px-10 md:pb-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: reduced ? 0.1 : 0.22 }}
              >
                <ChildrenGrid
                  items={current.children}
                  onPushFolder={onPush}
                  onLinkPress={onClose}
                  reduced={reduced}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ChildrenGrid({
  items,
  onPushFolder,
  onLinkPress,
  reduced,
}: {
  items: DockItem[];
  onPushFolder: (id: string) => void;
  onLinkPress: () => void;
  reduced: boolean;
}) {
  return (
    <ul
      className={cn(
        "grid gap-3 md:gap-4",
        items.length > 4 ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"
      )}
    >
      {items.map((item, i) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reduced ? 0.12 : 0.32,
            delay: reduced ? 0 : 0.04 * i,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ChildTile
            item={item}
            onFolderClick={() => onPushFolder((item as DockFolder).id)}
            onLinkClick={onLinkPress}
          />
        </motion.li>
      ))}
    </ul>
  );
}

function ChildTile({
  item,
  onFolderClick,
  onLinkClick,
}: {
  item: DockItem;
  onFolderClick: () => void;
  onLinkClick: () => void;
}) {
  const tileClass = cn(
    "group flex flex-col items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 transition-all duration-200",
    "hover:-translate-y-1 hover:border-[var(--border-gold)] hover:bg-[var(--bg-surface)]"
  );

  const inner = (
    <>
      <div className="relative h-[88px] w-[88px] overflow-visible md:h-[104px] md:w-[104px]">
        <Image
          src={item.icon}
          alt=""
          width={128}
          height={128}
          sizes="128px"
          className="h-full w-full object-contain"
        />
      </div>
      <span className="text-center text-[13px] font-medium tracking-wide text-[var(--text-primary)] md:text-[14px]">
        {item.label}
      </span>
    </>
  );

  if (item.kind === "folder") {
    return (
      <button type="button" onClick={onFolderClick} className={cn(tileClass, "w-full")}>
        {inner}
      </button>
    );
  }
  if (item.kind === "external") {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onLinkClick}
        className={tileClass}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={item.href} onClick={onLinkClick} className={tileClass}>
      {inner}
    </Link>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M9 2 L3 7 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

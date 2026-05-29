"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DOCK_ITEMS, type DockItem } from "./dock-config";
import { isActivePath } from "./dock-utils";
import { DockIcon } from "./DockIcon";
import { FolderPanel } from "./FolderPanel";
import { useDockEnvironment } from "./useDockEnvironment";

export function Dock() {
  const pathname = usePathname();
  const { reduced, compact } = useDockEnvironment();
  const mouseX = useMotionValue(Infinity);

  // Folder path stack. Empty array = closed.
  // Example: ["why-not", "systems"] means Why Not opened, Systems pushed.
  const [folderPath, setFolderPath] = useState<string[]>([]);
  const openRootFolder = useCallback((id: string) => {
    setFolderPath([id]);
  }, []);
  const pushFolder = useCallback((id: string) => {
    setFolderPath((prev) => [...prev, id]);
  }, []);
  const backFolder = useCallback(() => {
    setFolderPath((prev) =>
      prev.length > 1 ? prev.slice(0, -1) : []
    );
  }, []);
  const closeFolder = useCallback(() => {
    setFolderPath([]);
  }, []);

  const isOpen = folderPath.length > 0;
  const openRootId = folderPath[0];

  // Lock body scroll while a folder panel is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // When navigating to a new route, close any open panel.
  useEffect(() => {
    setFolderPath([]);
  }, [pathname]);

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 md:bottom-6"
      >
        <motion.ul
          onMouseMove={(e) => {
            if (reduced || compact) return;
            mouseX.set(e.clientX);
          }}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(
            "glass gold-glow flex max-w-[calc(100vw-1.5rem)] items-end gap-1.5 overflow-x-auto rounded-[22px] px-2.5 py-2.5 sm:gap-2 sm:px-3 sm:py-3 md:gap-3 md:rounded-[26px] md:px-5 md:py-4",
            "[&::-webkit-scrollbar]:hidden",
            "[scrollbar-width:none]"
          )}
          style={{ background: "rgba(23, 17, 28, 0.6)" }}
        >
          {DOCK_ITEMS.map((item) => (
            <li key={item.id} className="flex items-end">
              <DockEntry
                item={item}
                pathname={pathname}
                mouseX={mouseX}
                reduced={reduced}
                compact={compact}
                openRootId={openRootId}
                onOpenFolder={openRootFolder}
              />
            </li>
          ))}
        </motion.ul>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <FolderPanel
            key={openRootId}
            path={folderPath}
            tree={DOCK_ITEMS}
            reduced={reduced}
            compact={compact}
            onClose={closeFolder}
            onPush={pushFolder}
            onBack={backFolder}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function DockEntry({
  item,
  pathname,
  mouseX,
  reduced,
  compact,
  openRootId,
  onOpenFolder,
}: {
  item: DockItem;
  pathname: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  reduced: boolean;
  compact: boolean;
  openRootId: string | undefined;
  onOpenFolder: (id: string) => void;
}) {
  if (item.kind === "link") {
    const active = isActivePath(pathname, item.href);
    return (
      <Link
        href={item.href}
        aria-label={item.label}
        aria-current={active ? "page" : undefined}
        className="outline-none"
      >
        <DockIcon
          icon={item.icon}
          label={item.label}
          accent={item.accent ?? "gold"}
          active={active}
          mouseX={mouseX}
          reduced={reduced}
          compact={compact}
        />
      </Link>
    );
  }

  if (item.kind === "external") {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.label}
        className="outline-none"
      >
        <DockIcon
          icon={item.icon}
          label={item.label}
          mouseX={mouseX}
          reduced={reduced}
          compact={compact}
        />
      </a>
    );
  }

  // Folder
  return (
    <DockIcon
      icon={item.icon}
      label={item.label}
      mouseX={mouseX}
      reduced={reduced}
      compact={compact}
      layoutId={`dock-folder-${item.id}`}
      hideForLayout={openRootId === item.id}
      onClick={() => onOpenFolder(item.id)}
    />
  );
}

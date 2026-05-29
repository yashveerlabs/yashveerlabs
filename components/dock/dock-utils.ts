import type { DockFolder, DockItem } from "./dock-config";

/**
 * Walk the (possibly nested) dock tree to find a folder by id.
 */
export function findFolder(items: DockItem[], id: string): DockFolder | null {
  for (const item of items) {
    if (item.kind === "folder") {
      if (item.id === id) return item;
      const nested = findFolder(item.children, id);
      if (nested) return nested;
    }
  }
  return null;
}

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

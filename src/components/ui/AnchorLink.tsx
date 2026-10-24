"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { scrollToHash } from "@/lib/scroll";

type Props = ComponentPropsWithoutRef<typeof Link> & { href: string };

/**
 * Link to a section on the home page ("/#mirisi"). On the home page it scrolls
 * smoothly (through Lenis when active); elsewhere it navigates normally.
 */
export function AnchorLink({ href, onClick, ...props }: Props) {
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const path = href.slice(0, hashIndex) || "/";
    if (path !== pathname) return;

    const hash = href.slice(hashIndex);
    e.preventDefault();
    // Let overlays unlock scroll before scrolling
    requestAnimationFrame(() => {
      if (scrollToHash(hash)) history.replaceState(null, "", hash);
    });
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToHash } from "@/lib/scroll-offset";

function scrollAfterLayout(hash: string): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => scrollToHash(hash));
  });
}

/**
 * Next.js client navigation does not always scroll to the hash after pathname
 * changes (e.g. from 404 to /#about). Native anchors on the same page are
 * handled via scroll-padding-top in CSS.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) scrollAfterLayout(hash);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) scrollAfterLayout(window.location.hash);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}

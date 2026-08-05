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
 * Next.js client navigation не всегда прокручивает к hash после смены
 * pathname (например, с 404 на /#about). Нативные якоря на той же странице
 * обрабатываются через scroll-padding-top в CSS.
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

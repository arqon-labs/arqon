"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToHash } from "@/lib/scroll-offset";

function jumpToHash(): boolean {
  const hash = window.location.hash;
  if (!hash) return true;

  const id = hash.replace(/^#/, "");
  if (id && !document.getElementById(id)) return false;

  scrollToHash(hash, "instant");
  return true;
}

/**
 * Cross-page hash landings (e.g. /services → /#cases) jump instantly before
 * paint so the homepage never flashes the services block. Same-page header
 * clicks smooth-scroll in HeaderNav. Native anchors still use scroll-padding-top.
 */
export function HashScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    jumpToHash();
  }, [pathname]);

  useEffect(() => {
    const expected = window.location.hash;
    if (!expected) return;

    let attempts = 0;
    let frame = 0;
    const retry = () => {
      if (window.location.hash !== expected) return;
      jumpToHash();
      if (attempts++ >= 4) return;
      frame = window.requestAnimationFrame(retry);
    };
    retry();
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) scrollToHash(window.location.hash);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}

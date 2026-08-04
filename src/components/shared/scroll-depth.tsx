"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function ScrollDepth() {
  useEffect(() => {
    const fired = new Set<string>();

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const depth = (window.scrollY / scrollable) * 100;

      if (depth >= 50 && !fired.has("scroll_50")) {
        fired.add("scroll_50");
        track("scroll_50");
      }
      if (depth >= 90 && !fired.has("scroll_90")) {
        fired.add("scroll_90");
        track("scroll_90");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const cases = document.getElementById("cases");
    const observer = cases
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                track("cases_reached");
                observer?.disconnect();
              }
            }
          },
          { threshold: 0.25 },
        )
      : null;

    if (cases && observer) observer.observe(cases);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  return null;
}

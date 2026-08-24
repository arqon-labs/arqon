"use client";

import { useEffect, useState, type ReactNode } from "react";

export function HeaderChrome({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className="sticky top-0 z-50 border-b border-line/50 bg-bg/65 pt-[env(safe-area-inset-top)] backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 data-[scrolled=true]:border-line/90 data-[scrolled=true]:bg-bg/92 data-[scrolled=true]:shadow-[0_16px_48px_-28px_rgb(0_0_0/0.85)]"
    >
      {children}
    </header>
  );
}

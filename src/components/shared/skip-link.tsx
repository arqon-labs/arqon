"use client";

import { usePathname } from "next/navigation";
import { enChrome, localeFromPath, ruChrome } from "@/lib/locale";

export function SkipLink() {
  const copy = localeFromPath(usePathname()) === "en" ? enChrome : ruChrome();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-[max(1rem,env(safe-area-inset-top))] focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
    >
      {copy.skip}
    </a>
  );
}

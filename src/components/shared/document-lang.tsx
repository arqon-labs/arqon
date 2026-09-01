"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/lib/locale";

export function DocumentLang() {
  const pathname = usePathname();
  const lang = localeFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}

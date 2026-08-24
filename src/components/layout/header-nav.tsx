"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ru } from "@/content/ru";
import { cn } from "@/lib/cn";
import { scrollOffsetPx } from "@/lib/scroll-offset";

const items = ru.nav.map((item) => ({
  ...item,
  id: item.href.split("#")[1] ?? "",
}));

function isServicesPath(pathname: string): boolean {
  return pathname === "/uslugi" || pathname.startsWith("/uslugi/");
}

function sectionFromPath(pathname: string): string | null {
  return isServicesPath(pathname) ? "services" : null;
}

const linkClass =
  "relative inline-flex min-h-11 items-center py-1 text-[0.9375rem] text-fg-muted transition-colors duration-150 hover:text-fg md:min-h-0 md:py-0 after:pointer-events-none after:absolute after:right-0 after:bottom-1 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 md:after:bottom-0";

export function HeaderNav({
  className,
  listClassName,
}: {
  className?: string;
  listClassName?: string;
}) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(() =>
    sectionFromPath(pathname),
  );
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setActiveId(sectionFromPath(pathname));
  }

  useEffect(() => {
    const ids = items.map((item) => item.id).filter(Boolean);
    let frame = 0;

    const measure = () => {
      const line = scrollOffsetPx() + 20;
      let next = sectionFromPath(pathname);

      for (const id of ids) {
        const section = document.getElementById(id);
        if (!section) continue;
        if (section.getBoundingClientRect().top <= line) next = id;
      }

      setActiveId(next);
    };

    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <nav aria-label="Разделы страницы" className={className}>
      <ul
        className={cn(
          "flex min-w-max items-center gap-5 md:min-w-0 md:justify-center md:gap-7",
          listClassName,
        )}
      >
        {items.map((item) => {
          const isActive = Boolean(item.id) && item.id === activeId;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(linkClass, isActive && "text-fg after:scale-x-100")}
                aria-current={
                  isActive
                    ? item.id === "services" && isServicesPath(pathname)
                      ? "page"
                      : true
                    : undefined
                }
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

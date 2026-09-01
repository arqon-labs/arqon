"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { ru } from "@/content/ru";
import { cn } from "@/lib/cn";
import { enChrome, localeFromPath, ruChrome } from "@/lib/locale";
import { scrollOffsetPx, scrollToHash } from "@/lib/scroll-offset";

function sectionId(href: string): string {
  if (href.includes("#")) return href.split("#")[1] ?? "";
  if (href === ru.services.path) return "services";
  return "";
}

function parseHashHref(href: string): { path: string; hash: string } | null {
  const index = href.indexOf("#");
  if (index === -1) return null;
  return { path: href.slice(0, index) || "/", hash: href.slice(index + 1) };
}

function resolveHref(href: string, pathname: string): string {
  if (href === ru.services.path) {
    return pathname === "/" ? "#services" : href;
  }
  const parsed = parseHashHref(href);
  if (!parsed) return href;
  return pathname === parsed.path ? `#${parsed.hash}` : href;
}

function isServicesPath(pathname: string): boolean {
  const base = ru.services.path;
  return pathname === base || pathname.startsWith(`${base}/`);
}

function sectionFromPath(pathname: string): string | null {
  return isServicesPath(pathname) ? "services" : null;
}

function sectionFromLocation(pathname: string): string | null {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || sectionFromPath(pathname);
}

function isUnmodifiedLeftClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

const items = ru.nav.map((item) => ({
  ...item,
  id: sectionId(item.href),
}));

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

  if (localeFromPath(pathname) === "en") {
    return (
      <EnglishNav
        pathname={pathname}
        className={className}
        listClassName={listClassName}
      />
    );
  }

  return (
    <RussianNav
      pathname={pathname}
      className={className}
      listClassName={listClassName}
    />
  );
}

function EnglishNav({
  pathname,
  className,
  listClassName,
}: {
  pathname: string;
  className?: string;
  listClassName?: string;
}) {
  return (
    <nav aria-label={enChrome.navAria} className={className}>
      <ul
        className={cn(
          "flex min-w-max items-center gap-5 md:min-w-0 md:justify-center md:gap-7",
          listClassName,
        )}
      >
        {enChrome.nav.map((item) => {
          const isActive =
            item.href === "/audit"
              ? pathname === "/audit" || pathname.startsWith("/audit/")
              : pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(linkClass, isActive && "text-fg after:scale-x-100")}
                aria-current={isActive ? "page" : undefined}
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

function RussianNav({
  pathname,
  className,
  listClassName,
}: {
  pathname: string;
  className?: string;
  listClassName?: string;
}) {
  const lockedId = useRef<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(() =>
    sectionFromPath(pathname),
  );
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setActiveId(sectionFromLocation(pathname));
  }

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (lockedId.current && lockedId.current !== hash) {
      lockedId.current = null;
    }
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

      const locked = lockedId.current;
      if (locked) {
        if (next === locked) lockedId.current = null;
        else next = locked;
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

  function onItemClick(
    event: MouseEvent<HTMLAnchorElement>,
    item: (typeof items)[number],
  ) {
    if (item.id) {
      lockedId.current = item.id;
      setActiveId(item.id);
    } else {
      lockedId.current = null;
    }

    const href = resolveHref(item.href, pathname);
    const parsed = parseHashHref(href);
    if (!parsed || pathname !== parsed.path) return;
    if (!isUnmodifiedLeftClick(event)) return;

    event.preventDefault();
    const nextHash = `#${parsed.hash}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
    scrollToHash(nextHash);
  }

  return (
    <nav aria-label={ruChrome().navAria} className={className}>
      <ul
        className={cn(
          "flex min-w-max items-center gap-5 md:min-w-0 md:justify-center md:gap-7",
          listClassName,
        )}
      >
        {items.map((item) => {
          const href = resolveHref(item.href, pathname);
          const isActive = Boolean(item.id) && item.id === activeId;
          const hashLink = Boolean(parseHashHref(href));

          return (
            <li key={item.href}>
              <Link
                href={href}
                scroll={!hashLink}
                onClick={(event) => onItemClick(event, item)}
                className={cn(linkClass, isActive && "text-fg after:scale-x-100")}
                aria-current={
                  isActive
                    ? item.id === "services" && pathname === ru.services.path
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

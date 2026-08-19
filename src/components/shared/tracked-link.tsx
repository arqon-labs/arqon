"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { buttonClass, type ButtonSize, type ButtonVariant } from "@/components/ui/button";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEvent;
  children: ReactNode;
};

function isInternalHref(href: Props["href"]): href is string {
  return typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
}

function trackedClick(event: AnalyticsEvent, onClick: Props["onClick"]) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    track(event);
    onClick?.(e);
  };
}

export function TrackedLink({ event, children, onClick, href, ...props }: Props) {
  const handleClick = trackedClick(event, onClick);

  if (isInternalHref(href)) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function TrackedButtonLink({
  event,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  href,
  ...props
}: Props & { variant?: ButtonVariant; size?: ButtonSize }) {
  const handleClick = trackedClick(event, onClick);
  const classes = buttonClass(variant, size, className);

  if (isInternalHref(href)) {
    return (
      <Link href={href} className={classes} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

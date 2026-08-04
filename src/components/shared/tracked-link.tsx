"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { buttonClass, type ButtonSize, type ButtonVariant } from "@/components/ui/button";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEvent;
  children: ReactNode;
};

export function TrackedLink({ event, children, ...props }: Props) {
  return (
    <a {...props} onClick={() => track(event)}>
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
  ...props
}: Props & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <a
      className={buttonClass(variant, size, className)}
      onClick={() => track(event)}
      {...props}
    >
      {children}
    </a>
  );
}

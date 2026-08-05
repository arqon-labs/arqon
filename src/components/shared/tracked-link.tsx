"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { buttonClass, type ButtonSize, type ButtonVariant } from "@/components/ui/button";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEvent;
  children: ReactNode;
};

export function TrackedLink({ event, children, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event);
        onClick?.(e);
      }}
    >
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
  ...props
}: Props & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <a
      className={buttonClass(variant, size, className)}
      {...props}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        track(event);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

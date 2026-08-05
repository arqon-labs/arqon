import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

export function Section({
  id,
  children,
  className,
  bordered = true,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 sm:py-32 lg:py-40",
        bordered && "border-t border-line",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="font-mono text-meta uppercase text-fg-subtle">{eyebrow}</p>
      <h2 className="mt-5 text-h2 font-medium text-fg">{title}</h2>
      {lead ? <p className="mt-5 text-lead text-fg-muted">{lead}</p> : null}
    </div>
  );
}

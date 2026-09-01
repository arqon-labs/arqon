import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

export function Section({
  id,
  children,
  className,
  bordered = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        bordered && "section-rule",
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
      <p className="flex items-center gap-2.5 font-mono text-meta uppercase text-fg-subtle">
        <span
          className="h-px w-5 bg-gradient-to-r from-accent to-transparent"
          aria-hidden
        />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-h2 font-medium text-fg">{title}</h2>
      {lead ? <p className="mt-5 text-lead text-fg-muted">{lead}</p> : null}
    </div>
  );
}

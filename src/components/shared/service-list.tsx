import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/types";
import { servicePath } from "@/lib/services";
import { cn } from "@/lib/cn";

export function ServiceList({
  items,
  heading: Heading = "h3",
  className,
}: {
  items: Service[];
  heading?: "h2" | "h3";
  className?: string;
}) {
  return (
    <ul className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((service, index) => (
        <li key={service.slug}>
          <Link
            href={servicePath(service.slug)}
            className="group grid gap-4 py-8 sm:py-10 lg:grid-cols-12 lg:items-baseline lg:gap-8"
          >
            <span className="font-mono text-meta text-fg-subtle tabular-nums lg:col-span-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="lg:col-span-7">
              <Heading className="text-h2 font-medium transition-colors duration-150 group-hover:text-accent">
                {service.title}
              </Heading>
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">
                {service.description}
              </p>
            </div>
            <p className="flex items-start gap-2 text-[0.9375rem] text-fg lg:col-span-4 lg:justify-end">
              <ArrowUpRight
                className="mt-0.5 size-4 shrink-0 text-accent transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
              <span>{service.outcome}</span>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}


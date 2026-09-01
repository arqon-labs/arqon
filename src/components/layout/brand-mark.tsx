import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function BrandMark({
  className,
  homeLabel,
}: {
  className?: string;
  homeLabel?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5 text-fg", className)}
      aria-label={homeLabel ?? `${site.name} — на главную`}
    >
      <span className="flex size-6 items-center justify-center rounded-[5px] bg-accent/12 font-mono text-[10px] font-semibold tracking-wider text-accent ring-1 ring-accent/30">
        A
      </span>
      <span className="text-base font-semibold tracking-[0.14em]">{site.name}</span>
    </Link>
  );
}

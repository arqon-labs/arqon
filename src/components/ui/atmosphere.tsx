import { cn } from "@/lib/cn";

export function Atmosphere({
  className,
  glowClassName = "h-[560px]",
}: {
  className?: string;
  glowClassName?: string;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className={cn("hero-glow absolute inset-x-0 top-0", glowClassName)} />
      <div className="hero-grid absolute inset-0" />
    </div>
  );
}

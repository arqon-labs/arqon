import { cn } from "@/lib/cn";

export function Atmosphere({
  className,
  glowClassName = "h-[420px]",
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
      <div className="hero-caustic">
        <span className="hero-caustic-bloom" />
        <span className="hero-caustic-edge" />
      </div>
    </div>
  );
}

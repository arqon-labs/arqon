import type { ProcessStep } from "@/content/types";

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative mt-14">
      <div
        className="pointer-events-none absolute top-[15px] right-[8%] left-[8%] hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent lg:block"
        aria-hidden
      />
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title}>
            <p className="relative z-10 flex size-8 items-center justify-center rounded-full border border-accent/30 bg-bg font-mono text-meta text-accent tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 text-h3 font-medium">{step.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

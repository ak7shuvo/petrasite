import { cn } from "@/lib/utils";

/** "How it works" strip: numbered steps joined by a rule. Horizontal on desktop, vertical on phones. */
export function Workflow({ name, steps, className }: { name: string; steps: string[]; className?: string }) {
  return (
    <div className={cn("border-t border-line pt-6", className)}>
      <h4 className="text-[11px] uppercase tracking-[0.22em] text-teal-glow">How {name} works</h4>
      <ol
        className="mt-5 grid gap-y-0 md:gap-x-2 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
        style={{ "--n": steps.length } as React.CSSProperties}
      >
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={s} className="relative flex items-center gap-3 md:flex-col md:items-start md:gap-3 max-md:pb-3">
              {/* connector */}
              {!last && (
                <span
                  aria-hidden
                  className="absolute bg-cream/20 max-md:bottom-0 max-md:left-[13px] max-md:top-7 max-md:w-px md:left-8 md:right-0 md:top-[13px] md:h-px"
                />
              )}
              <span
                className={cn(
                  "relative z-10 grid h-7 w-7 shrink-0 place-items-center border text-[10px] font-bold",
                  last ? "border-teal bg-teal text-ink" : "border-cream/30 bg-ink-2 text-cream",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] font-semibold leading-tight text-cream md:pr-2">{s}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

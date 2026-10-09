import { cn } from "@/lib/utils";
import type { Status } from "@/types/content";

const label: Record<Status, string> = { available: "Available", preview: "Preview", planned: "Planned" };

/** Release status chip. The only place status wording and styling are defined. */
export function StatusChip({ status, tone = "dark", className }: { status: Status; tone?: "dark" | "light"; className?: string }) {
  const dark = tone === "dark";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 px-1.5 py-[3px] text-[10px] font-bold uppercase leading-none tracking-[0.16em]",
        status === "available" && "bg-teal text-ink",
        status === "preview" && (dark ? "border border-cream/40 text-cream" : "border border-ink/40 text-ink"),
        status === "planned" && (dark ? "border border-dashed border-cream/35 text-cream-dim" : "border border-dashed border-ink/40 text-ink/70"),
        className,
      )}
    >
      {status === "preview" && <i aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />}
      {label[status]}
    </span>
  );
}

/** Small legend explaining the three statuses. */
export function StatusLegend({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const text = tone === "dark" ? "text-cream-dim" : "text-ink/70";
  return (
    <dl className={cn("flex flex-wrap gap-x-6 gap-y-2 text-[11px]", text, className)}>
      <div className="flex items-center gap-2"><dt><StatusChip status="preview" tone={tone} /></dt><dd>Working software or interface, shown in demos</dd></div>
      <div className="flex items-center gap-2"><dt><StatusChip status="planned" tone={tone} /></dt><dd>On the roadmap, not built yet</dd></div>
    </dl>
  );
}

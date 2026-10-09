import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** v2.4: buttons are small cards: rounded, bordered, layered surface, soft shadow, lift on hover. */
const base =
  "group inline-flex items-center justify-center gap-3 h-12 max-md:h-11 px-6 rounded-xl border text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer select-none hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const variants = {
  primary:
    "border-teal-glow/50 bg-gradient-to-b from-teal-glow to-teal text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_28px_-10px_rgba(20,184,166,0.75)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_18px_34px_-10px_rgba(45,212,191,0.85)]",
  outline:
    "border-cream/15 bg-gradient-to-b from-cream/10 to-cream/[0.03] text-cream backdrop-blur-md shadow-[inset_0_1px_0_rgba(241,245,249,0.14),0_10px_24px_-14px_rgba(0,0,0,0.85)] hover:border-teal/60 hover:from-cream/15 hover:shadow-[inset_0_1px_0_rgba(241,245,249,0.2),0_16px_30px_-14px_rgba(20,184,166,0.45)]",
  ghost:
    "border-line bg-ink-2 text-cream-dim shadow-[0_8px_20px_-14px_rgba(0,0,0,0.9)] hover:border-cream/30 hover:text-cream",
} as const;

type Variant = keyof typeof variants;

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }>(
  ({ className, variant = "primary", ...p }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], className)} {...p} />
  ),
);
Button.displayName = "Button";

export function ButtonLink({
  className,
  variant = "primary",
  ...p
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={cn(base, variants[variant], className)} {...p} />;
}

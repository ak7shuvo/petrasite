import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("text-[11px] uppercase tracking-[0.22em] text-teal-glow", className)}>{children}</span>
  );
}

type SectionProps = {
  id?: string;
  index?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  tone?: "dark" | "cream";
  children?: ReactNode;
  className?: string;
};

/** Reusable section shell: numbered eyebrow, display heading, lede, then composed children. */
export function Section({ id, index, eyebrow, title, lede, tone = "dark", children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={cn(
        "relative py-28 max-md:py-14 sm:py-40",
        tone === "cream" ? "bg-cream text-ink" : "bg-ink text-cream",
        className,
      )}
    >
      <Container>
        <div className={cn("mb-16 grid gap-8 max-md:mb-8 max-md:gap-4 lg:items-end", lede && "lg:grid-cols-[1fr_420px]")}>
          <div>
            <Reveal y={8}>
              <Label className={tone === "cream" ? "text-teal" : undefined}>
                {index ? `${index} / ` : ""}
                {eyebrow}
              </Label>
            </Reveal>
            <SplitText
              id={id ? `${id}-title` : undefined}
              text={title}
              className="mt-6 max-w-[22ch] text-[clamp(2rem,4.4vw,4.2rem)] max-md:mt-4 max-md:text-[1.75rem] font-bold leading-[1] tracking-[-0.05em]"
            />
          </div>
          {lede && (
            <Reveal delay={0.15}>
              <p className={cn("font-sans text-[17px] leading-relaxed max-md:text-base", tone === "cream" ? "text-ink/75" : "text-cream-dim")}>
                {lede}
              </p>
            </Reveal>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}

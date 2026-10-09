import { Section } from "@/shared/section";
import { Reveal } from "@/components/motion/reveal";
import { implementation } from "@/content/company";

/** What happens after someone contacts Petra. */
export function Process() {
  return (
    <Section
      id="process"
      index="07"
      eyebrow="Implementation"
      title="What happens after you contact Petra."
      lede="Four steps from first call to a running system, handled by the same team throughout."
    >
      <ol className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
        {implementation.map((s, i) => (
          <li key={s.n} className="bg-ink">
            <Reveal delay={i * 0.04} className="h-full p-7 max-md:p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center border border-teal text-[11px] font-bold text-teal-glow">{s.n}</span>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mt-6 text-xl font-bold uppercase tracking-[0.06em] max-md:mt-4">{s.title}</h3>
              <p className="mt-2 text-[14px] font-semibold text-cream">{s.line}</p>
              <p className="mt-2 font-sans text-[14px] leading-relaxed text-cream-dim">{s.detail}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

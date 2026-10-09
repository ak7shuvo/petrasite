"use client";

import { MotionConfig, motion } from "framer-motion";
import { Section } from "@/shared/section";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/shared/icons";
import { StatusChip } from "@/shared/status";
import { industries, type Industry } from "@/content/industries";
import { productByCode } from "@/content/products";
import { ease } from "@/lib/motion";

/** Desktop: 6-column grid so five cards fill two rows (3 + 2 wider) with no empty cell. */
const desktopSpan = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "sm:col-span-2 lg:col-span-3"];

function IndustryCard({ ind, i }: { ind: Industry; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: Math.min(i * 0.08, 0.4) }}
      className={desktopSpan[i % desktopSpan.length]}
    >
      <article className="industry-card group relative flex h-full flex-col overflow-hidden rounded-xl p-7 max-md:p-5">
        {/* thin teal line that draws across the top on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-teal to-teal-glow transition-transform duration-300 ease-out group-hover:scale-x-100"
        />

        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden
            className="grid h-14 w-14 place-items-center rounded-xl border border-ink/10 bg-ink/[0.04] text-ink/80 shadow-[inset_0_1px_0_var(--color-surface)] transition-colors duration-300 group-hover:border-teal group-hover:bg-teal group-hover:text-ink max-md:h-12 max-md:w-12"
          >
            <Icon name={ind.icon} size={26} />
          </span>
          <span className="text-[44px] font-extrabold leading-none tracking-[-0.06em] text-ink/15 transition-colors duration-300 group-hover:text-teal max-md:text-[34px]">
            0{i + 1}
          </span>
        </div>

        <h3 className="whitespace-nowrap pt-10 text-2xl font-extrabold leading-tight tracking-[-0.05em] text-ink max-md:pt-5 xl:text-[26px]">
          {ind.name}
        </h3>
        <p className="mt-2 min-h-[3.2em] font-sans text-[14px] leading-snug text-ink/75 max-md:min-h-0">{ind.line}</p>

        <ul className="mt-auto flex flex-col gap-2 border-t border-ink/10 pt-5 max-md:pt-4" aria-label={`Petra products for ${ind.name}`}>
          {ind.products.map((c) => (
            <li key={c} className="flex items-center justify-between gap-2 text-[12px]">
              <span className="flex items-center gap-2">
                <span className="rounded-full bg-teal px-2.5 py-[4px] text-[10px] font-bold leading-none tracking-[0.14em] text-ink">{c}</span>
                <span className="text-ink/75">{productByCode[c].name}</span>
              </span>
              <StatusChip status={productByCode[c].status} tone="light" className="rounded-full px-2" />
            </li>
          ))}
          {ind.planned && (
            <li className="flex items-center justify-between gap-2 text-[12px]">
              <span className="text-ink/75">{ind.planned}</span>
              <StatusChip status="planned" tone="light" className="rounded-full px-2" />
            </li>
          )}
        </ul>
      </article>
    </motion.li>
  );
}

export function Industries() {
  return (
    <Section
      id="industries"
      index="05"
      eyebrow="Industries we serve"
      title="Built for the people who host, serve and move guests."
      tone="cream"
      className="section-mist"
    >
      {/* reducedMotion="user": transforms are skipped for reduced-motion visitors, opacity still fades; no SSR/client branch */}
      <MotionConfig reducedMotion="user">
      <ul className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        {industries.map((ind, i) => (
          <IndustryCard key={ind.name} ind={ind} i={i} />
        ))}
      </ul>
      </MotionConfig>
      <Reveal delay={0.1}>
        <p className="mt-8 font-sans text-[13px] text-ink/70">
          Product fit for each industry today. Planned modules are on the roadmap and not yet available.
        </p>
      </Reveal>
    </Section>
  );
}

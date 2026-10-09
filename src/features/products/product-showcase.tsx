"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DeviceFrame } from "@/components/ui/device-frame";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/shared/icons";
import { ProductBadge } from "@/shared/product-badge";
import { StatusChip } from "@/shared/status";
import { ButtonLink } from "@/components/ui/button";
import { screenLabel } from "@/content/products";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import type { Product } from "@/types/content";
import { Workflow } from "./workflow";

export function ProductShowcase({ product: p, index }: { product: Product; index: number }) {
  const [active, setActive] = useState(0);
  const flip = index % 2 === 1;
  const label = screenLabel[p.screenSource];
  const tabId = (i: number) => `${p.code}-tab-${i}`;
  const panelId = `${p.code}-panel`;

  return (
    <Reveal id={p.name.toLowerCase()} className="scroll-mt-24">
      <article
        aria-labelledby={`${p.code}-title`}
        className="group relative overflow-hidden border border-line bg-ink-2 transition-colors duration-500 hover:border-cream/25"
      >
        {/* ghost code */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -bottom-10 select-none text-[clamp(8rem,22vw,20rem)] font-extrabold leading-none tracking-[-0.08em] text-cream/[0.03]",
            flip ? "left-4" : "right-4",
          )}
        >
          {p.code}
        </span>

        <div className="relative grid gap-10 p-6 max-md:gap-6 max-md:p-4 sm:p-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-14 lg:p-14">
          <div className={cn(flip && "lg:order-2")}>
            <ProductBadge code={p.code} size="lg" />
            <h3 id={`${p.code}-title`} className="mt-8 text-[clamp(2.4rem,5.6vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.06em] max-md:mt-5">
              Petra<span className="text-teal">{p.code}</span>
              <span className="sr-only"> — {p.category}</span>
            </h3>
            <p className="mt-3 text-[12px] uppercase tracking-[0.22em] text-cream-mute">{p.category}</p>
            <p className="mt-4 flex flex-wrap items-center gap-3">
              <StatusChip status={p.status} />
              <span className="text-[11px] uppercase tracking-[0.14em] text-cream-dim">{p.statusNote}</span>
            </p>

            <dl className="mt-7 space-y-5 max-md:mt-5">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-teal-glow">Problem it solves</dt>
                <dd className="mt-2 max-w-[52ch] font-sans text-[16px] leading-relaxed text-cream">{p.problem}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-teal-glow">What it does</dt>
                <dd className="mt-2 max-w-[52ch] font-sans text-[15px] leading-relaxed text-cream-dim">{p.description}</dd>
              </div>
            </dl>

            <h4 className="mt-7 text-[11px] uppercase tracking-[0.2em] text-teal-glow max-md:mt-5">Key capabilities</h4>
            <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f.title} className={cn("flex items-center gap-3 text-[13px]", f.planned ? "text-cream-dim" : "text-cream/90")}>
                  <Icon name={f.icon} size={16} className={cn("shrink-0", f.planned ? "text-cream-mute" : "text-teal-glow")} />
                  <span>{f.title}</span>
                  {f.planned && <StatusChip status="planned" />}
                </li>
              ))}
            </ul>

            <ButtonLink href="#contact" variant="outline" className="mt-9 max-md:mt-6">
              Request a {p.name} demo <ArrowUpRight size={14} aria-hidden />
            </ButtonLink>
          </div>

          <div className={cn("min-w-0", flip && "lg:order-1")}>
            <div id={panelId} role="tabpanel" aria-labelledby={tabId(active)}>
              <DeviceFrame variant={p.device} title={`${p.name} · ${p.full}`}>
                {p.screens.map((s, i) => (
                  <Image
                    key={s.id}
                    src={s.src}
                    alt={i === active ? s.alt : ""}
                    fill
                    loading={i === 0 ? undefined : "lazy"}
                    sizes="(min-width:1024px) 700px, 100vw"
                    className={cn("object-cover object-top transition-opacity duration-300", i === active ? "opacity-100" : "opacity-0")}
                    aria-hidden={i !== active}
                  />
                ))}
              </DeviceFrame>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 max-md:mt-4">
              <div
                role="tablist"
                aria-label={`${p.name} screens`}
                className="flex flex-wrap gap-1.5 max-md:-mx-4 max-md:w-[calc(100%+2rem)] max-md:flex-nowrap max-md:overflow-x-auto max-md:px-4 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden"
              >
                {p.screens.map((s, i) => (
                  <button
                    key={s.id}
                    id={tabId(i)}
                    role="tab"
                    aria-selected={i === active}
                    aria-controls={panelId}
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                      const n = (active + (e.key === "ArrowRight" ? 1 : -1) + p.screens.length) % p.screens.length;
                      setActive(n);
                      document.getElementById(tabId(n))?.focus();
                    }}
                    className="relative rounded-lg px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-cream max-md:shrink-0 max-md:whitespace-nowrap max-md:py-2.5"
                  >
                    {i === active && (
                      <motion.span layoutId={`tab-${p.code}`} className="absolute inset-0 rounded-lg border border-teal bg-teal/10 shadow-[0_8px_20px_-10px_rgba(20,184,166,0.6)]" transition={{ duration: 0.3, ease }} />
                    )}
                    <span className={cn("relative", i === active ? "text-cream" : "text-cream-mute")}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.18em]">
              <b className="font-bold text-cream">{label.tag}</b>
              <span className="text-cream-mute">{label.note(p.name)}</span>
            </p>
          </div>
        </div>

        <div className="relative px-6 pb-8 max-md:px-4 max-md:pb-6 sm:px-10 lg:px-14 lg:pb-12">
          <Workflow name={p.name} steps={p.workflow} />
        </div>
      </article>
    </Reveal>
  );
}

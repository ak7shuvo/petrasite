import { ArrowDown, ArrowRight, Monitor, Server } from "lucide-react";
import { Section } from "@/shared/section";
import { Reveal } from "@/components/motion/reveal";
import { StatusChip } from "@/shared/status";
import { productIcon } from "@/shared/icons";
import { deployment } from "@/content/company";
import { productByCode } from "@/content/products";

/** Local-first deployment model, drawn with plain boxes so it reflows on every screen size. */
export function Deployment() {
  const { site, server, apps, traits } = deployment;
  return (
    <Section
      id="deployment"
      index="04"
      eyebrow="Deployment"
      title="Local-first when reliability matters."
      lede="PetraPMS is designed to run on the property's own network: terminals talk to a Petra server on site, and the data stays on hardware you control."
      tone="cream"
    >
      <Reveal>
        <div className="grid grid-cols-[minmax(0,1fr)] items-stretch border border-ink/20 bg-cream lg:grid-cols-[1fr_auto_1fr_auto_1.15fr]">
          {/* 1. property */}
          <Tier step="01" title={site.label}>
            <ul className="mt-4 space-y-2">
              {site.items.map((i) => (
                <li key={i} className="flex items-center gap-3 border border-ink/15 bg-ink/[0.03] px-3 py-2.5 text-[13px]">
                  <Monitor size={15} aria-hidden className="text-teal" />
                  {i}
                </li>
              ))}
            </ul>
          </Tier>
          <Link label="Local network (LAN)" />
          {/* 2. server */}
          <Tier step="02" title={server.label} highlight>
            <div className="mt-4 flex items-center gap-4 border border-ink bg-ink px-4 py-4 text-cream">
              <Server size={26} aria-hidden className="shrink-0 text-teal-glow" />
              <div className="text-[12px] leading-relaxed text-cream-dim">
                {server.items.map((i) => <div key={i}>{i}</div>)}
              </div>
            </div>
          </Tier>
          <Link label="Serves" />
          {/* 3. products */}
          <Tier step="03" title="Petra products">
            <ul className="mt-4 space-y-2">
              {apps.map((c) => {
                const Icon = productIcon[c];
                const p = productByCode[c];
                return (
                  <li key={c} className="flex items-center gap-3 border border-ink/15 bg-ink/[0.03] px-3 py-2.5">
                    <Icon size={15} aria-hidden className="text-teal" />
                    <span className="text-[13px] font-bold tracking-[0.1em]">{c}</span>
                    <span className="min-w-0 truncate text-[12px] text-ink/65">{p.full}</span>
                  </li>
                );
              })}
            </ul>
          </Tier>
        </div>
      </Reveal>

      <ul className="mt-px grid gap-px border border-ink/20 bg-ink/20 sm:grid-cols-2 lg:grid-cols-5">
        {traits.map((t) => (
          <li key={t.title} className="bg-cream p-6 max-md:p-5 sm:max-lg:last:col-span-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[14px] font-bold tracking-[-0.01em]">{t.title}</h3>
              {"planned" in t && t.planned && <StatusChip status="planned" tone="light" />}
            </div>
            <p className="mt-2 font-sans text-[14px] leading-snug text-ink/75">{t.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 max-w-[80ch] font-sans text-[13px] text-ink/70">
        The model above is PetraPMS&apos;s design. Deployment for PetraPOS and PetraDMS, backups and remote access are agreed per project during Discover.
      </p>
    </Section>
  );
}

function Tier({ step, title, highlight, children }: { step: string; title: string; highlight?: boolean; children: React.ReactNode }) {
  return (
    <div className={highlight ? "bg-ink/[0.04] p-6 max-md:p-5" : "p-6 max-md:p-5"}>
      <div className="flex items-baseline gap-3">
        <span className="text-[11px] text-teal">{step}</span>
        <h3 className="text-[13px] font-bold uppercase tracking-[0.14em]">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Link({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 border-ink/20 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-ink/65 max-lg:border-y lg:flex-col lg:border-x lg:px-3">
      <ArrowDown size={14} aria-hidden className="text-teal lg:hidden" />
      <ArrowRight size={14} aria-hidden className="hidden text-teal lg:block" />
      <span className="lg:[writing-mode:vertical-rl] lg:rotate-180">{label}</span>
    </div>
  );
}

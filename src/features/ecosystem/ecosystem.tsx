"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/shared/section";
import { Reveal } from "@/components/motion/reveal";
import { StatusChip } from "@/shared/status";
import { productIcon } from "@/shared/icons";
import { products, productByCode } from "@/content/products";
import { core, plannedModules, relations } from "@/content/ecosystem";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import type { ProductCode, Relation } from "@/types/content";

type NodeId = "core" | "pms" | "pos" | "dms";
const CODES: Record<Exclude<NodeId, "core">, ProductCode> = { pms: "PMS", pos: "POS", dms: "DMS" };
const ROLE: Record<NodeId, string> = {
  core: core.role,
  pms: "Reservations, rooms, guests, housekeeping status and billing.",
  pos: "Orders, kitchen tickets, payments, stock and sales reports.",
  dms: "Purchase, stock, sales, dues, collection and profit.",
};

const touches = (r: Relation, id: NodeId) => r.from === id || r.to === id || r.to === "all";
const nameOf = (id: string) => (id === "core" ? core.name : id === "all" ? "All products" : productByCode[CODES[id as keyof typeof CODES]].name);

/* ---------- desktop diagram geometry (viewBox 1200 × 600) ---------- */
const PX = { pms: 200, pos: 600, dms: 1000 } as const;
const PY = 318, PH = 132, PW = 290;
const CORE = { x: 420, y: 28, w: 360, h: 112 };
const BUS = 236;

const wire: Record<string, string> = {
  reports: `M600 ${CORE.y + CORE.h} V${BUS}`,
  "ops-data": `M600 ${BUS} H${PX.pms} V${PY}`,
  sales: `M600 ${BUS} V${PY}`,
  dues: `M600 ${BUS} H${PX.dms} V${PY}`,
  "guest-charges": `M${PX.pos - 60} ${PY + PH} V${PY + PH + 70} H${PX.pms + 60} V${PY + PH}`,
  inventory: `M${PX.dms - 60} ${PY + PH} V${PY + PH + 70} H${PX.pos + 60} V${PY + PH}`,
};
const tag: Record<string, { x: number; y: number }> = {
  reports: { x: 600, y: 188 },
  "ops-data": { x: PX.pms, y: 280 },
  sales: { x: 600, y: 280 },
  dues: { x: PX.dms, y: 280 },
  "guest-charges": { x: 400, y: PY + PH + 70 },
  inventory: { x: 800, y: PY + PH + 70 },
};

export function Ecosystem() {
  const [selected, setSelected] = useState<NodeId>("pms");
  const [hover, setHover] = useState<NodeId | null>(null);
  const active = hover ?? selected;
  const activeRelations = relations.filter((r) => touches(r, active));
  const lit = (r: Relation) => touches(r, active);
  const product = active === "core" ? null : productByCode[CODES[active]];

  return (
    <Section
      id="ecosystem"
      index="03"
      eyebrow="Petra ecosystem"
      title="Three products today. One shared core next."
      lede="PetraPMS, PetraPOS and PetraDMS run independently today. Petra Core is the planned layer that connects them; every dashed link below is planned, not shipped."
    >
      {/* desktop: signature diagram */}
      <Reveal className="hidden lg:block">
        <div className="relative border border-line bg-ink">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <svg viewBox="0 0 1200 600" className="relative block h-auto w-full" role="group" aria-label="Petra ecosystem diagram. Select a product or Petra Core to see its planned connections.">
            {/* wires */}
            {relations.map((r) => (
              <path
                key={r.id}
                d={wire[r.id]}
                fill="none"
                stroke={lit(r) ? "#2DD4BF" : "rgba(241,245,249,0.28)"}
                strokeWidth={lit(r) ? 2 : 1.2}
                strokeDasharray="6 7"
                className={lit(r) ? "eco-flow" : undefined}
                style={{ transition: "stroke .25s ease" }}
              />
            ))}
            {/* junction */}
            <rect x={594} y={BUS - 6} width="12" height="12" fill="#0F172A" stroke="rgba(241,245,249,0.5)" />

            {/* relation tags */}
            {relations.map((r) => {
              const t = tag[r.id];
              const w = r.label.length * 7.4 + 26;
              return (
                <g key={r.id} transform={`translate(${t.x - w / 2} ${t.y - 13})`}>
                  <rect width={w} height="26" fill="#0F172A" stroke={lit(r) ? "#14B8A6" : "#2F3C5A"} style={{ transition: "stroke .25s ease" }} />
                  <text x={w / 2} y="17" textAnchor="middle" fontSize="12" fill={lit(r) ? "#F1F5F9" : "#AEB8C8"} fontWeight="600" style={{ transition: "fill .25s ease" }}>{r.label}</text>
                </g>
              );
            })}

            {/* core */}
            <Node id="core" active={active === "core"} onPick={setSelected} onHover={setHover} label={`${core.name}, ${core.sub}, planned`}>
              <rect x={CORE.x} y={CORE.y} width={CORE.w} height={CORE.h} fill="#111A2E" stroke={active === "core" ? "#14B8A6" : "rgba(241,245,249,0.5)"} strokeDasharray="7 5" strokeWidth={active === "core" ? 1.8 : 1} />
              <text x={CORE.x + 26} y={CORE.y + 40} fontSize="11" fill="#2DD4BF" letterSpacing="3">PETRA CORE / DATA</text>
              <text x={CORE.x + 26} y={CORE.y + 72} fontSize="24" fontWeight="800" fill="#F1F5F9" letterSpacing="1">{core.name}</text>
              <text x={CORE.x + 26} y={CORE.y + 94} fontSize="12" fill="#AEB8C8">{core.sub}</text>
              <SvgChip x={CORE.x + CORE.w - 92} y={CORE.y + 22} text="PLANNED" dashed />
            </Node>

            {/* products */}
            {(["pms", "pos", "dms"] as const).map((id) => {
              const p = productByCode[CODES[id]];
              const x = PX[id] - PW / 2;
              const on = active === id;
              return (
                <Node key={id} id={id} active={on} onPick={setSelected} onHover={setHover} label={`${p.name}, ${p.full}, ${p.status}`}>
                  {on && <rect x={x - 6} y={PY - 6} width={PW + 12} height={PH + 12} fill="none" stroke="#14B8A6" strokeOpacity="0.35" />}
                  <rect x={x} y={PY} width={PW} height={PH} fill="#16213A" stroke={on ? "#14B8A6" : "rgba(241,245,249,0.55)"} strokeWidth={on ? 1.8 : 1} />
                  <rect x={x} y={PY} width="4" height={PH} fill="#14B8A6" />
                  <text x={x + 24} y={PY + 46} fontSize="30" fontWeight="800" fill="#F1F5F9" letterSpacing="3">{p.code}</text>
                  <text x={x + 24} y={PY + 76} fontSize="14" fontWeight="700" fill="#2DD4BF">{p.name}</text>
                  <text x={x + 24} y={PY + 100} fontSize="11.5" fill="#AEB8C8">{p.full}</text>
                  <SvgChip x={x + PW - 92} y={PY + 20} text={p.status.toUpperCase()} />
                </Node>
              );
            })}
            {/* legend */}
            <g transform="translate(28 572)" fontSize="11" fill="#AEB8C8">
              <rect width="18" height="12" y="-10" fill="#16213A" stroke="rgba(241,245,249,0.55)" />
              <rect width="3" height="12" y="-10" fill="#14B8A6" />
              <text x="28">Product (preview)</text>
              <path d="M178 -4 H214" stroke="rgba(241,245,249,0.6)" strokeDasharray="6 5" />
              <text x="224">Planned connection</text>
            </g>
          </svg>
        </div>
      </Reveal>

      {/* phones and tablets: stacked version of the same model */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setSelected("core")}
          aria-pressed={selected === "core"}
          className={cn("w-full border border-dashed p-4 text-left transition-colors", selected === "core" ? "border-teal bg-teal/10" : "border-cream/40 bg-ink-2")}
        >
          <span className="flex items-center justify-between gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-teal-glow">Petra core / data</span>
            <StatusChip status="planned" />
          </span>
          <span className="mt-2 block text-xl font-extrabold tracking-[-0.03em]">{core.name}</span>
          <span className="mt-1 block text-[12px] text-cream-dim">{core.sub}</span>
        </button>
        <div className="flex justify-center py-1.5 text-cream-mute" aria-hidden><ArrowDown size={14} /></div>
        <div className="grid gap-2 md:grid-cols-3">
          {products.map((p) => {
            const id = p.code.toLowerCase() as NodeId;
            const Icon = productIcon[p.code];
            return (
              <button
                key={p.code}
                type="button"
                onClick={() => setSelected(id)}
                aria-pressed={selected === id}
                className={cn("flex items-center gap-4 border p-4 text-left transition-colors md:flex-col md:items-start", selected === id ? "border-teal bg-teal/10" : "border-line bg-ink-2")}
              >
                <Icon size={20} aria-hidden className="shrink-0 text-teal-glow" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-bold">{p.name}</span>
                  <span className="block text-[11px] text-cream-dim">{p.full}</span>
                </span>
                <StatusChip status={p.status} />
              </button>
            );
          })}
        </div>
      </div>

      {/* detail panel */}
      <div className="mt-px grid gap-8 border border-line bg-ink-2 p-6 max-md:mt-3 max-md:gap-5 max-md:p-4 sm:p-8 lg:grid-cols-[1fr_1.4fr]" aria-live="polite">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-teal-glow">{active === "core" ? "Shared layer" : "Product"}</span>
            <StatusChip status={product ? product.status : core.status} />
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-[-0.05em] max-md:text-2xl">{product ? product.name : core.name}</div>
          {product && <div className="mt-1 text-[13px] text-cream-dim">{product.code} = {product.full}</div>}
          <p className="mt-4 max-w-[46ch] font-sans text-[15px] leading-relaxed text-cream/85">{ROLE[active]}</p>
          <ButtonLink href="#contact" variant="outline" className="mt-5">
            See it in a demo <ArrowUpRight size={14} aria-hidden />
          </ButtonLink>
        </div>
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.22em] text-cream-mute">Connections</h3>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {activeRelations.map((r) => (
              <li key={r.id} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-cream-dim">
                    <span>{nameOf(r.from)}</span>
                    <ArrowRight size={12} aria-label="to" />
                    <span>{nameOf(r.to)}</span>
                  </div>
                  <div className="mt-1 text-[14px] font-semibold">{r.label}</div>
                  <p className="mt-0.5 font-sans text-[13px] text-cream-dim">{r.detail}</p>
                </div>
                <StatusChip status={r.status} className="justify-self-start sm:justify-self-end" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* roadmap modules */}
      <div className="mt-10 max-md:mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-cream-dim">Coming modules</h3>
          <StatusChip status="planned" />
        </div>
        <ul className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {plannedModules.map((m) => (
            <li key={m.name} className="bg-ink p-4">
              <div className="text-[10px] uppercase tracking-[0.18em] text-cream-mute">{m.group}</div>
              <div className="mt-1 text-[14px] font-semibold">{m.name}</div>
              <div className="font-sans text-[13px] text-cream-dim">{m.role}</div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Node({
  id, active, onPick, onHover, label, children,
}: {
  id: NodeId; active: boolean; label: string; children: React.ReactNode;
  onPick: (id: NodeId) => void; onHover: (id: NodeId | null) => void;
}) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={active}
      onClick={() => onPick(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(id); } }}
      className="eco-node cursor-pointer outline-none"
    >
      {children}
    </g>
  );
}

function SvgChip({ x, y, text, dashed }: { x: number; y: number; text: string; dashed?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="72" height="20" fill="none" stroke={dashed ? "rgba(241,245,249,0.45)" : "rgba(241,245,249,0.55)"} strokeDasharray={dashed ? "3 3" : undefined} />
      {!dashed && <circle cx="10" cy="10" r="3" fill="#2DD4BF" />}
      <text x={dashed ? 36 : 41} y="14" fontSize="9.5" fontWeight="700" letterSpacing="1.5" fill="#F1F5F9" textAnchor="middle">{text}</text>
    </g>
  );
}

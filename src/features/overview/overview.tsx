import { ArrowRight } from "lucide-react";
import { Container, Label } from "@/shared/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ProductBadge } from "@/shared/product-badge";
import { StatusChip } from "@/shared/status";
import { products } from "@/content/products";

export function Overview() {
  return (
    <section id="overview" aria-labelledby="overview-title" className="bg-cream py-28 text-ink max-md:py-14 sm:py-36">
      <Container>
        <Label className="text-teal">01 / Company overview</Label>
        <div className="mt-6 grid gap-12 max-md:mt-4 max-md:gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <SplitText
            id="overview-title"
            text="Petra builds the software hospitality runs on."
            className="max-w-[18ch] text-[clamp(2.2rem,4.4vw,4.2rem)] font-extrabold leading-[0.97] tracking-[-0.06em] max-md:max-w-[18ch] max-md:text-[2rem]"
          />
          <Reveal>
            <p className="max-w-[46ch] font-sans text-[17px] leading-relaxed text-ink/75 max-md:text-base">
              PETRA Software Solutions is a Bangladesh-based software company. We design, build and support our own products for
              hospitality operations: one for the property, one for its outlets and one for distribution.
            </p>
          </Reveal>
        </div>

        {/* product index: what each product is and where it stands */}
        <ul className="mt-16 border-t border-ink/15 max-md:mt-10">
          {products.map((p) => (
            <li key={p.code} className="border-b border-ink/15">
              <a
                href={`#${p.name.toLowerCase()}`}
                className="group grid items-center gap-x-8 gap-y-3 py-6 transition-colors hover:bg-ink/[0.03] max-md:py-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto_auto]"
              >
                <ProductBadge code={p.code} size="md" tone="light" />
                <span className="font-sans text-[15px] text-ink/75">
                  <b className="font-mono text-[15px] font-bold text-ink">{p.name}</b> · {p.category}
                </span>
                <span className="flex items-center gap-3">
                  <StatusChip status={p.status} tone="light" />
                  <span className="text-[11px] text-ink/65">{p.statusNote}</span>
                </span>
                <ArrowRight size={18} aria-hidden className="text-ink/45 transition-transform group-hover:translate-x-1 group-hover:text-teal max-md:hidden" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

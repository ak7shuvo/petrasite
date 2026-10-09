"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { DeviceFrame } from "@/components/ui/device-frame";
import { Container, Label } from "@/shared/section";
import { productIcon } from "@/shared/icons";
import { products } from "@/content/products";
import { ease } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <section id="top" ref={ref} aria-labelledby="hero-title" className="noise relative flex min-h-[100svh] items-center overflow-hidden bg-ink max-md:min-h-0">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_70%_45%,#000_15%,transparent_72%)]" />
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[560px] w-[560px] rounded-full bg-teal/15 blur-[150px]" />

      <Container className="relative grid items-center gap-14 pb-28 pt-32 max-md:gap-10 max-md:pb-20 max-md:pt-24 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
        <motion.div style={{ opacity: fade }}>
          <motion.div {...enter(0.1)} className="flex items-center gap-3">
            <span aria-hidden className="h-2 w-2 bg-gold" />
            <Label className="text-cream-dim">PETRA · Hospitality software</Label>
          </motion.div>

          <h1 id="hero-title" className="mt-8 text-[clamp(2.5rem,5vw,5rem)] font-extrabold leading-[0.96] tracking-[-0.06em] max-md:mt-5">
            {["Software", "that runs", "hospitality."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span
                  className={i === 2 ? "block text-teal" : "block"}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.08 }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...enter(0.55)} className="mt-8 max-w-[46ch] font-sans text-[17px] leading-relaxed text-cream-dim max-md:mt-5 max-md:text-base">
            Hospitality software for properties, outlets and distribution operations, built around real-world workflows.
          </motion.p>

          <motion.ul {...enter(0.7)} className="mt-9 max-w-[480px] divide-y divide-line border-y border-line max-md:mt-6" aria-label="Petra products">
            {products.map((p) => {
              const Icon = productIcon[p.code];
              return (
                <li key={p.code}>
                  <a href={`#${p.name.toLowerCase()}`} className="group flex min-h-11 items-center gap-3 py-2.5 transition-colors hover:text-cream">
                    <Icon size={16} aria-hidden className="shrink-0 text-teal-glow" />
                    <span className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:gap-3">
                      <span className="shrink-0 text-[14px] font-bold sm:w-[6.5rem]">{p.name}</span>
                      <span className="text-[12px] text-cream-dim max-sm:text-[11px]">{p.full}</span>
                    </span>
                    <ArrowRight size={14} aria-hidden className="shrink-0 text-cream-mute transition-transform group-hover:translate-x-0.5 group-hover:text-teal-glow" />
                  </a>
                </li>
              );
            })}
          </motion.ul>

          <motion.div {...enter(0.8)} className="mt-10 flex flex-wrap items-center gap-3 max-md:mt-7">
            <ButtonLink href="#products">
              Explore Products <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline">Book a Demo</ButtonLink>
          </motion.div>
        </motion.div>

        {/* product composition: static layers, no pointer parallax */}
        <motion.div style={{ opacity: fade }} className="relative mx-auto aspect-[1.12/1] w-full max-w-[720px] lg:max-w-none">
          <motion.div {...enter(0.35)} className="absolute right-0 top-0 w-[64%]">
            <DeviceFrame title="PetraDMS" chrome={false}>
              <Image src="/products/dms-dashboard.webp" alt="PetraDMS distribution dashboard" fill priority sizes="(min-width:1024px) 460px, 64vw" className="object-cover object-top" />
            </DeviceFrame>
          </motion.div>
          <motion.div {...enter(0.45)} className="absolute left-0 top-[16%] z-10 w-[68%]">
            <DeviceFrame title="PetraPMS">
              <Image src="/products/pms-dashboard.webp" alt="PetraPMS property dashboard" fill priority sizes="(min-width:1024px) 480px, 68vw" className="object-cover object-top" />
            </DeviceFrame>
          </motion.div>
          <motion.div {...enter(0.55)} className="absolute bottom-0 right-[3%] z-20 w-[50%]">
            <DeviceFrame variant="tablet" title="PetraPOS">
              <Image src="/products/pos-terminal.webp" alt="PetraPOS order terminal" fill sizes="(min-width:1024px) 360px, 50vw" className="object-cover object-top" />
            </DeviceFrame>
          </motion.div>
          <p className="absolute -bottom-7 left-0 text-[10px] uppercase tracking-[0.18em] text-cream-mute max-md:-bottom-6">
            Product previews · sample data
          </p>
        </motion.div>
      </Container>

      <div className="absolute inset-x-0 bottom-0 border-t border-line/70">
        <Container className="flex items-center justify-between py-4 text-[10px] uppercase tracking-[0.22em] text-cream-mute">
          <span>For hotels · Resorts · Restaurants · Tour operators · DMOs</span>
          <span className="hidden sm:inline" aria-hidden>Scroll ▍</span>
        </Container>
      </div>
    </section>
  );
}

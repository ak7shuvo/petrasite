"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/button";

function Logo({ home, compact }: { home: boolean; compact: boolean }) {
  return (
    <a href={home ? "#top" : "/"} aria-label="PETRA home" className="flex items-center gap-3 rounded-lg">
      <Image
        src="/logo-mark.png"
        alt=""
        width={30}
        height={30}
        priority
        className={cn("transition-all duration-300", compact ? "h-7 w-7" : "h-[30px] w-[30px]")}
      />
      <span className="text-[15px] font-bold leading-none tracking-[0.3em]">{site.name}</span>
    </a>
  );
}

/** Scroll-spy: which section sits in a thin band near the top third of the viewport. Null outside nav sections. */
function useScrollSpy(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") return;
    const navIds = new Set(nav.map((n) => n.href.slice(1)));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    if (!sections.length) return;
    const inBand = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        const current = sections.find((s) => inBand.has(s.id));
        setActive(current && navIds.has(current.id) ? current.id : null);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

function MenuIcon({ open, instant }: { open: boolean; instant: boolean }) {
  const t = { duration: instant ? 0 : 0.28, ease };
  return (
    <span aria-hidden className="relative block h-3.5 w-[18px]">
      <motion.span className="absolute left-0 top-0 h-[2px] w-full rounded-full bg-current" animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }} transition={t} />
      <motion.span className="absolute left-0 top-[6px] h-[2px] w-full rounded-full bg-current" animate={open ? { opacity: 0, scaleX: 0.3 } : { opacity: 1, scaleX: 1 }} transition={t} />
      <motion.span className="absolute left-0 top-[12px] h-[2px] w-full rounded-full bg-current" animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }} transition={t} />
    </span>
  );
}

export function Navbar({ home = true }: { home?: boolean }) {
  const h = (hash: string) => (home ? hash : `/${hash}`);
  const reduce = useReducedMotion() ?? false;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);
  const travel = useRef(0);
  const lockUntil = useRef(0);
  const active = useScrollSpy(home);

  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    setScrolled(window.scrollY > 24);
    lastY.current = window.scrollY;
    const t = window.setTimeout(() => setReady(true), 1300);
    return () => window.clearTimeout(t);
  }, []);

  // Shrink after 24px; hide after ~120px of continuous downward travel, show after ~24px upward.
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    const dy = y - lastY.current;
    lastY.current = y;
    if (y < 160) {
      travel.current = 0;
      setHidden(false);
      return;
    }
    if (performance.now() < lockUntil.current) return;
    if (Math.sign(dy) !== Math.sign(travel.current)) travel.current = 0;
    travel.current += dy;
    if (travel.current > 120) setHidden(true);
    else if (travel.current < -24) setHidden(false);
  });

  // Escape closes the menu and returns focus to the toggle; leaving the mobile breakpoint closes it too.
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", esc);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", esc);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const hide = hidden && !reduce && !open;
  const compact = scrolled || open;
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 520, damping: 40 };

  const onNavClick = () => {
    // a nav click triggers a programmatic scroll; keep the bar visible while it runs
    lockUntil.current = performance.now() + 1200;
    travel.current = 0;
    setHidden(false);
  };

  const mobileLinks = [...nav, { label: "Book a demo", href: "#contact" }];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-backdrop"
            aria-hidden
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hide ? "-130%" : 0, opacity: 1 }}
        transition={ready ? { duration: reduce ? 0 : 0.35, ease } : { duration: 1, ease, delay: 0.2 }}
        onFocusCapture={() => setHidden(false)}
        className={cn("pointer-events-none fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-300 sm:px-5", compact ? "pt-2" : "pt-3")}
      >
        <div className="relative mx-auto max-w-[1320px]">
          <div className={cn("glass pointer-events-auto relative overflow-hidden rounded-2xl transition-all duration-300", compact && "glass-strong")}>
            <div
              className={cn(
                "flex items-center justify-between px-4 transition-[height] duration-300 sm:px-6",
                compact ? "h-14 max-md:h-[52px]" : "h-16 max-md:h-14",
              )}
            >
              <Logo home={home} compact={compact} />

              <LayoutGroup id="primary-nav">
                <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
                  {nav.map((n) => {
                    const id = n.href.slice(1);
                    const isActive = active === id;
                    return (
                      <a
                        key={n.href}
                        href={h(n.href)}
                        aria-current={isActive ? "location" : undefined}
                        onClick={onNavClick}
                        onMouseEnter={() => setHovered(n.href)}
                        onFocus={() => setHovered(n.href)}
                        onBlur={() => setHovered(null)}
                        className={cn(
                          "relative rounded-lg px-3.5 py-2 text-[12px] uppercase tracking-[0.16em] transition-colors duration-200 xl:px-4",
                          isActive ? "text-cream" : "text-cream-dim hover:text-cream focus-visible:text-cream",
                        )}
                      >
                        {hovered === n.href && (
                          <motion.span layoutId="nav-hover" transition={spring} className="absolute inset-0 rounded-lg bg-cream/10" />
                        )}
                        <span className="relative z-10">{n.label}</span>
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            transition={spring}
                            className="absolute inset-x-4 bottom-[3px] z-10 h-[2px] rounded-full bg-gradient-to-r from-teal to-teal-glow shadow-[0_0_10px_var(--color-teal)]"
                          />
                        )}
                      </a>
                    );
                  })}
                </nav>
              </LayoutGroup>

              <div className="flex items-center gap-3">
                <ButtonLink href={h("#contact")} onClick={onNavClick} className="relative hidden h-10 gap-2 overflow-hidden px-5 text-[12px] sm:inline-flex">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[320%]"
                  />
                  <span className="relative">Book a demo</span>
                  <ArrowRight aria-hidden size={14} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>
                <button
                  ref={toggleRef}
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-cream/15 bg-cream/5 transition-colors hover:border-teal/60 max-md:h-11 max-md:w-11 lg:hidden"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="mobile-nav"
                  onClick={() => setOpen((o) => !o)}
                >
                  <MenuIcon open={open} instant={reduce} />
                </button>
              </div>
            </div>

            {/* scroll progress line */}
            <motion.span
              aria-hidden
              style={{ scaleX: scrollYProgress }}
              className={cn(
                "absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-teal to-teal-glow transition-opacity duration-300",
                scrolled ? "opacity-100" : "opacity-0",
              )}
            />
          </div>

          <AnimatePresence>
            {open && (
              <motion.nav
                id="mobile-nav"
                aria-label="Mobile"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: reduce ? 0 : 0.3, ease }}
                className="glass glass-strong pointer-events-auto absolute inset-x-0 top-full mt-2 max-h-[calc(100svh-5.5rem)] origin-top overflow-y-auto rounded-2xl lg:hidden"
              >
                <motion.div
                  className="flex flex-col px-5 py-3"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.055, delayChildren: reduce ? 0 : 0.08 } } }}
                >
                  {mobileLinks.map((n) => {
                    const cta = n.label === "Book a demo";
                    const isActive = active === n.href.slice(1);
                    return (
                      <motion.a
                        key={n.href + n.label}
                        href={h(n.href)}
                        aria-current={isActive ? "location" : undefined}
                        onClick={() => {
                          onNavClick();
                          setOpen(false);
                        }}
                        variants={{ hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.35, ease } } }}
                        className={cn(
                          "flex items-center justify-between rounded-lg text-[13px] uppercase tracking-[0.16em]",
                          cta
                            ? "mt-3 h-11 justify-center gap-2 rounded-xl border border-teal-glow/50 bg-gradient-to-b from-teal-glow to-teal font-semibold text-ink"
                            : cn("border-b border-cream/10 py-3.5", isActive ? "text-teal-glow" : "text-cream"),
                        )}
                      >
                        {n.label}
                        {cta ? <ArrowRight aria-hidden size={14} /> : isActive && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal-glow" />}
                      </motion.a>
                    );
                  })}
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}

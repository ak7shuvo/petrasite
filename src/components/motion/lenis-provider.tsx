"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Smooth wheel scrolling on desktop pointers only. Touch devices keep native scrolling,
 * and the whole thing is skipped when the visitor prefers reduced motion.
 * v2.1: Lenis drives its own requestAnimationFrame loop, so GSAP is no longer needed.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1, smoothWheel: true, autoRaf: true });

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute("href");
      if (!a || !id || id === "#") return;
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -64 });
      history.replaceState(null, "", id);
      // move keyboard focus with the scroll so screen reader and keyboard users land in the section
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };
    document.addEventListener("click", onAnchor);

    return () => {
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

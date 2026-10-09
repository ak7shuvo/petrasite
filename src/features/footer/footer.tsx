import { Container } from "@/shared/section";
import { site } from "@/lib/site";
import { products } from "@/content/products";
import { Reveal } from "@/components/motion/reveal";

const col = "text-[11px] uppercase tracking-[0.22em] text-cream-mute";
const list = "mt-4 flex flex-col gap-1 text-[13px] max-md:mt-3";
const link = "inline-flex min-h-8 items-center text-cream-dim transition-colors hover:text-cream";

/** Only links that resolve: on-page sections, the privacy page, email and phone. */
export function Footer({ home = true }: { home?: boolean }) {
  const h = (hash: string) => (home ? hash : `/${hash}`);
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink pt-20 max-md:pt-12">
      <Container>
        <div className="grid gap-10 max-md:grid-cols-2 max-md:gap-x-6 max-md:gap-y-8 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
          <div className="max-md:col-span-2">
            <div className="text-[15px] font-bold tracking-[0.3em]">{site.name}</div>
            <p className="mt-4 max-w-[36ch] font-sans text-[14px] leading-relaxed text-cream-dim">
              {site.legalName} builds hospitality software in Bangladesh: {site.tagline.toLowerCase()}
            </p>
          </div>
          <nav aria-label="Products">
            <h2 className={col}>Products</h2>
            <ul className={list}>
              {products.map((p) => (
                <li key={p.code}><a href={h(`#${p.name.toLowerCase()}`)} className={link}>{p.name}</a></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2 className={col}>Company</h2>
            <ul className={list}>
              <li><a href={h("#why")} className={link}>Why Petra</a></li>
              <li><a href={h("#industries")} className={link}>Industries</a></li>
              <li><a href={h("#process")} className={link}>Implementation</a></li>
              <li><a href={h("#contact")} className={link}>Contact</a></li>
            </ul>
          </nav>
          <nav aria-label="Resources and legal">
            <h2 className={col}>Resources</h2>
            <ul className={list}>
              <li><a href={`mailto:${site.email}?subject=${encodeURIComponent("Support request")}`} className={link}>Support</a></li>
              <li><a href={h("#deployment")} className={link}>Deployment</a></li>
              <li><a href="/privacy" className={link}>Privacy</a></li>
            </ul>
          </nav>
          <div className="max-md:col-span-2">
            <h2 className={col}>Contact</h2>
            <ul className={list}>
              <li><a href={`mailto:${site.email}`} className={`${link} break-all`}>{site.email}</a></li>
              <li><a href={`tel:${site.phoneHref}`} className={link}>{site.phone}</a></li>
              <li className="inline-flex min-h-8 items-center text-cream-dim">{site.country}</li>
            </ul>
          </div>
        </div>
        {/* motto: PETRA spelled out, initials highlighted */}
        <div className="mt-16 border-t border-line pt-12 max-md:mt-10 max-md:pt-8">
          <div className="flex flex-wrap items-baseline gap-x-[0.35em] gap-y-1 text-[clamp(1.5rem,3.4vw,3rem)] font-bold leading-[1.1] tracking-[-0.05em] text-cream/90">
            {site.motto.map((w, i) => (
              <Reveal key={w} delay={i * 0.05} y={10} className="inline-block">
                <span className="text-teal-glow">{w[0]}</span>
                {w.slice(1)}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
      {/* decorative wordmark, drawn as SVG so it scales with the viewport and is ignored by assistive tech */}
      <svg aria-hidden="true" focusable="false" viewBox="0 0 1000 200" className="mx-auto mt-16 block w-full max-w-[1600px] select-none max-md:mt-8">
        <text x="500" y="196" textAnchor="middle" fontSize="292" fontWeight="800" letterSpacing="-8" fill="rgba(241,245,249,0.05)">PETRA</text>
      </svg>
      <div className="border-t border-line">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-6 text-[12px] text-cream-mute max-md:py-4">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <span className="flex items-center gap-2"><i aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />Build version {site.version}</span>
        </Container>
      </div>
    </footer>
  );
}

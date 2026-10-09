import { Container } from "@/shared/section";
import { Icon } from "@/shared/icons";
import { trust } from "@/content/company";

/** Compact positioning band right after the hero: what Petra is, in five facts. */
export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="border-y border-line bg-ink-2">
      <Container>
        <h2 id="trust-title" className="sr-only">Petra at a glance</h2>
        <ul className="grid divide-line sm:grid-cols-2 lg:grid-cols-5 lg:divide-x max-lg:divide-y">
          {trust.map((t) => (
            <li key={t.title} className="flex gap-4 py-7 lg:flex-col lg:gap-3 lg:px-6 lg:py-9 lg:first:pl-0 lg:last:pr-0 max-md:py-5 sm:max-lg:odd:pr-6 sm:max-lg:even:pl-6">
              <Icon name={t.icon} size={18} className="mt-0.5 shrink-0 text-teal-glow" />
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.08em]">{t.title}</h3>
                <p className="mt-1.5 font-sans text-[14px] leading-snug text-cream-dim">{t.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

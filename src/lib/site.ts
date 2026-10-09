/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in production (see .env.example).
 * Without it, local builds fall back to localhost and a build warning is printed by next.config.ts.
 */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export const site = {
  name: "PETRA",
  legalName: "PETRA Software Solutions",
  tagline: "Software that runs hospitality.",
  description:
    "PETRA builds hospitality software in Bangladesh: PetraPMS for hotel property management, PetraPOS for restaurant and outlet point of sale, and PetraDMS for distribution management.",
  email: "letterbox5509@gmail.com",
  phone: "01609347600",
  phoneHref: "+8801609347600",
  country: "Bangladesh",
  url: siteUrl,
  urlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  version: "v2.6",
  /** PETRA, spelled out: one word per letter. */
  motto: ["Property", "Excellence", "Through", "Reliable", "Automation"],
};

export const nav = [
  { label: "Products", href: "#products" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Deployment", href: "#deployment" },
  { label: "Industries", href: "#industries" },
  { label: "Why Petra", href: "#why" },
];

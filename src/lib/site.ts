
/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in production (see .env.example).
 * Without it, local builds fall back to the production domain.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://petrait.site"
).replace(/\/+$/, "");

export const site = {
  name: "PETRA",
  legalName: "PETRA Software Solutions",
  tagline: "Technology Built Around You.",
  subtitle: "From Ideas to Intelligent Solutions.",
  description:
    "We build custom software, mobile and desktop applications, AI/ML models, websites, and business systems—tailored to individuals, startups, and enterprises.",
  email: "petraitbd@gmail.com",
  phone: "01616154320",
  phoneHref: "+8801616154320",
  country: "Bangladesh",
  url: siteUrl,
  urlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  version: "v2.6",
  /** PETRA's brand motto. */
  motto: ["Built on Trust"],
};

export const nav = [
  { label: "Products", href: "#products" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Deployment", href: "#deployment" },
  { label: "Industries", href: "#industries" },
  { label: "Why Petra", href: "#why" },
];

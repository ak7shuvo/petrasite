import type { NextConfig } from "next";

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    "\n⚠  NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, sitemap and Open Graph will point to http://localhost:3000.\n" +
      "   Set it before deploying (see .env.example).\n",
  );
}

const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Product screenshots are pre-optimised WebP files in /public/products.
  images: { unoptimized: true },
  async headers() {
    return [
      { source: "/:path*", headers: security },
      { source: "/products/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default config;

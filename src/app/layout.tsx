
import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat/wght.css";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { site } from "@/lib/site";
import { products } from "@/content/products";
import "./globals.css";

const title = `${site.name} — Technology Built Around You`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  title: {
    default: title,
    template: `%s · ${site.legalName}`,
  },

  description: site.description,

  applicationName: site.legalName,

  keywords: [
    "custom software development Bangladesh",
    "software development company Bangladesh",
    "desktop application development",
    "Windows desktop applications",
    "Android app development",
    "iOS app development",
    "Linux application development",
    "AI and machine learning solutions",
    "website development",
    "business management software",
    "custom business systems",
    "PETRA Software Solutions",
    "PetraPMS",
    "PetraPOS",
    "PetraDMS",
  ],

  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: site.legalName,
    locale: "en_US",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name}. ${site.tagline}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og.png"],
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  colorScheme: "dark",
};

const org = {
  "@id": `${site.url}/#organization`,
};

const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "Organization",
      ...org,
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      logo: `${site.url}/logo.png`,
      email: site.email,
      telephone: site.phoneHref,
      description: site.description,

      address: {
        "@type": "PostalAddress",
        addressCountry: "BD",
      },

      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: site.phoneHref,
        areaServed: "BD",
        availableLanguage: ["en", "bn"],
      },
    },

    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.legalName,
      description: site.description,
      publisher: org,
      inLanguage: "en",
    },

    // Product information is generated from the existing products data.
    // No fabricated pricing, ratings, or reviews are added.
    ...products.map((p) => ({
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#${p.name.toLowerCase()}`,
      name: p.name,
      alternateName: `${p.name} — ${p.full}`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: p.category,
      description: p.description,
      featureList: p.features
        .filter((f) => !f.planned)
        .map((f) => f.title),
      url: `${site.url}/#${p.name.toLowerCase()}`,
      image: `${site.url}${p.screens[0].src}`,
      publisher: org,
      creator: org,
    })),
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-teal focus:text-ink focus:px-4 focus:py-2"
        >
          Skip to content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

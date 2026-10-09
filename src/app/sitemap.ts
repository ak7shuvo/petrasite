import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const updated = new Date("2026-10-08");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/privacy`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
  ];
}

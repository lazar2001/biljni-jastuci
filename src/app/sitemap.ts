import type { MetadataRoute } from "next";
import { brand, legalLinks } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${brand.siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...legalLinks.map((link) => ({
      url: `${brand.siteUrl}${link.href}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

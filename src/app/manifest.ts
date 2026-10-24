import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.name} · Biljni jastuci`,
    short_name: brand.name,
    description: brand.tagline,
    lang: "sr-Latn",
    start_url: "/",
    display: "standalone",
    background_color: "#EDE8E0",
    theme_color: "#EDE8E0",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}

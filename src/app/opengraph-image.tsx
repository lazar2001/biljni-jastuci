import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand, hero } from "@/content/site";

export const alt = `${brand.name} · Biljni jastuci sa prirodnim mirisom`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand fonts as WOFF (Satori does not read WOFF2); latin + latin-ext for č ć š ž đ
const fontFile = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

// Brand-style share image: linen background, serif headline, pillow line art.
export default async function OpengraphImage() {
  const headline = hero.headline.join(" ").replace(/\*/g, "");
  const [serif, serifExt, sans, sansExt] = await Promise.all([
    fontFile("fraunces", "fraunces-latin-400-normal.woff"),
    fontFile("fraunces", "fraunces-latin-ext-400-normal.woff"),
    fontFile("manrope", "manrope-latin-500-normal.woff"),
    fontFile("manrope", "manrope-latin-ext-500-normal.woff"),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#EDE8E0",
          color: "#2B2A27",
          padding: "72px 80px",
          fontFamily: "Fraunces",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30 }}>
            <div style={{ width: 28, height: 2, background: "#7D8B74" }} />
            {brand.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 80, lineHeight: 1.04, letterSpacing: -1.5 }}>
            <span>{headline.split(",")[0]},</span>
            {/* Upright on purpose: Satori falls back to the upright cut for latin-ext glyphs in italic */}
            <span>{headline.split(",").slice(1).join(",").trim()}</span>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5E5A54", fontFamily: "Manrope" }}>
            Mirisne note za svako godišnje doba · ručna izrada
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 40,
            borderRadius: 18,
            background: "#CBC5BA",
          }}
        >
          <svg width="300" height="206" viewBox="0 0 320 220" fill="none" stroke="#2B2A27" strokeOpacity="0.4" strokeWidth="2">
            <path d="M22 30 C 90 22, 230 22, 298 30 C 304 80, 304 140, 298 190 C 230 198, 90 198, 22 190 C 16 140, 16 80, 22 30 Z" />
            <path
              d="M40 46 C 100 40, 220 40, 280 46 C 285 90, 285 130, 280 174 C 220 180, 100 180, 40 174 C 35 130, 35 90, 40 46 Z"
              strokeDasharray="4 7"
            />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: serif, style: "normal", weight: 400 },
        { name: "Fraunces", data: serifExt, style: "normal", weight: 400 },
        { name: "Manrope", data: sans, style: "normal", weight: 500 },
        { name: "Manrope", data: sansExt, style: "normal", weight: 500 },
      ],
    },
  );
}

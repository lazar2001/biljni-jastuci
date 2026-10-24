import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { brand } from "@/content/site";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AccentSync } from "@/components/layout/AccentSync";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  // Static 400 instead of the variable font: headings use a single weight,
  // and this cuts the preloaded font payload by more than half.
  weight: "400",
  variable: "--font-fraunces",
  // "optional" instead of "swap" for the display face: a late swap re-wraps the
  // hero headline and shifts the layout (CLS). The font is preloaded, so on
  // normal connections it is used right away; it is always used on later visits.
  display: "optional",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const siteDescription =
  "Ručno punjeni biljni jastuci sa prirodnim mirisnim notama, u tri veličine ili po vašoj meri, za mirniji odmor i prijatniju atmosferu u domu.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} · Biljni jastuci sa prirodnim mirisom`,
    template: `%s · ${brand.name}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    siteName: brand.name,
    title: `${brand.name} · Biljni jastuci sa prirodnim mirisom`,
    description: siteDescription,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#EDE8E0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr-Latn" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#sadrzaj"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-soft focus:bg-paper focus:px-4 focus:py-3"
        >
          Preskoči na sadržaj
        </a>
        <SmoothScroll />
        <AccentSync />
        <MotionProvider>
          <Header />
          <main id="sadrzaj">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileCTA />
        </MotionProvider>
        <CookieConsent />
        <GrainOverlay />
      </body>
    </html>
  );
}

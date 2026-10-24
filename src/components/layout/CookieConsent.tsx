"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { analytics } from "@/content/site";

const KEY = "consent-v1";
type Consent = "granted" | "denied";

/**
 * Rendered only when analytics.metaPixelId is set. The Meta Pixel is loaded
 * only after the visitor accepts; declining is as easy as accepting.
 */
export function CookieConsent() {
  const pixelId = analytics.metaPixelId;
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    if (!pixelId) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      stored = null;
    }
    setConsent(stored === "granted" || stored === "denied" ? stored : null);
  }, [pixelId]);

  useEffect(() => {
    if (consent === "granted" && pixelId) loadMetaPixel(pixelId);
  }, [consent, pixelId]);

  if (!pixelId || consent !== null) return null;

  const choose = (value: Consent) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      // Storage blocked: the choice applies to this visit only
    }
    setConsent(value);
  };

  return (
    <div
      role="region"
      aria-label="Obaveštenje o kolačićima"
      className="fixed inset-x-3 bottom-3 z-[85] rounded-card border border-line bg-paper p-5 shadow-[0_10px_40px_rgba(43,42,39,0.12)] sm:left-auto sm:right-6 sm:max-w-sm"
    >
      <p className="text-[0.9375rem]">
        Koristimo marketinške kolačiće (Meta Pixel) samo uz vaš pristanak, da bismo merili uspešnost oglasa.{" "}
        <Link href="/politika-privatnosti" className="underline underline-offset-4">
          Više o tome
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="min-h-11 rounded-soft border border-charcoal/25 font-semibold hover:border-charcoal"
        >
          Odbij
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="min-h-11 rounded-soft bg-eucalyptus font-semibold text-paper hover:bg-charcoal"
        >
          Prihvati
        </button>
      </div>
    </div>
  );
}

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...args: unknown[]) => void; push?: unknown };

function loadMetaPixel(id: string) {
  const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
  if (w.fbq) return;
  const fbq: Fbq = (...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;
  w.fbq = fbq;
  w._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("init", id);
  fbq("track", "PageView");
}

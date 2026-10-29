import { shipping, sizes, type SizeId } from "@/content/site";
import { scents } from "@/content/scents";

import { isCustomSize, type LineItem } from "./items";

/**
 * Demo prices let you test the full order flow before real prices exist.
 * Active ONLY in development and only with NEXT_PUBLIC_DEMO_PRICES=1 in .env.local.
 * They are never used in a production build.
 */
const DEMO =
  process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_DEMO_PRICES === "1"
    ? { small: 1000, medium: 2000, large: 3000, shipping: 400, freeAbove: 5000 }
    : null;

export const isDemoPricing = DEMO !== null;

/** Unit price in RSD. Always null for a custom size — its price is agreed by phone. */
export function unitPrice(sizeId: SizeId): number | null {
  const size = sizes.find((s) => s.id === sizeId);
  if (!size || size.custom) return null;
  return size.price ?? (DEMO?.[sizeId as "small" | "medium" | "large"] ?? null);
}

export const shippingPrice = (): number | null => shipping.price ?? DEMO?.shipping ?? null;
export const freeShippingAbove = (): number | null => shipping.freeAbove ?? DEMO?.freeAbove ?? null;

export type LineInput = LineItem;

export const isKnownLine = (line: { scentId: string; sizeId: string }) =>
  scents.some((s) => s.id === line.scentId) && sizes.some((s) => s.id === line.sizeId);

export type Totals = {
  /** Sum of priced lines only (custom sizes excluded) */
  subtotal: number;
  /** null when the shipping price is not configured yet */
  shipping: number | null;
  total: number;
  /** RSD missing to free shipping; null when there is no threshold */
  freeShippingRemaining: number | null;
  /** True when a standard size has no price yet — ordering must be blocked */
  hasUnpriced: boolean;
  /** True when the order contains a custom size (price agreed by phone) */
  hasCustom: boolean;
};

/** Same calculation on client and server; the server never trusts client prices. */
export function calculateTotals(lines: LineItem[]): Totals {
  let subtotal = 0;
  let hasUnpriced = false;
  let hasCustom = false;
  for (const line of lines) {
    if (isCustomSize(line.sizeId)) {
      hasCustom = true;
      continue;
    }
    const price = unitPrice(line.sizeId);
    if (price === null) hasUnpriced = true;
    else subtotal += price * line.quantity;
  }

  const threshold = freeShippingAbove();
  const free = threshold !== null && subtotal >= threshold;
  const baseShipping = shippingPrice();
  const ship = lines.length === 0 ? 0 : free ? 0 : baseShipping;

  return {
    subtotal,
    shipping: ship,
    total: subtotal + (ship ?? 0),
    freeShippingRemaining: threshold === null ? null : Math.max(0, threshold - subtotal),
    hasUnpriced,
    hasCustom,
  };
}

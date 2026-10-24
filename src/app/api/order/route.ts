import { NextResponse } from "next/server";
import { createOrderId } from "@/lib/order-id";
import { normalizePhone } from "@/lib/format";
import { lineKey } from "@/lib/items";
import { calculateTotals, unitPrice } from "@/lib/pricing";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { orderSchema } from "@/lib/validation";
import { sendCustomerConfirmation, sendOwnerOrderEmail, type OrderRecord } from "@/lib/email";

export const runtime = "nodejs";

const error = (message: string, status: number) => NextResponse.json({ ok: false, message }, { status });

export async function POST(request: Request) {
  if (!rateLimit(`order:${clientIp(request.headers)}`, { limit: 5, windowMs: 10 * 60_000 })) {
    return error("Previše pokušaja za kratko vreme. Sačekajte nekoliko minuta ili nas pozovite.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error("Neispravan zahtev.", 400);
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Proverite podatke u formularu.", issues: parsed.error.issues.map((i) => i.message) },
      { status: 400 },
    );
  }

  const { customer, items } = parsed.data;

  // Honeypot filled → pretend success, do nothing
  if (customer.website) {
    return NextResponse.json({ ok: true, orderId: createOrderId() });
  }

  // Merge duplicate lines and price them from config — client prices are never trusted
  const merged = new Map<string, (typeof items)[number]>();
  for (const item of items) {
    const key = lineKey(item);
    const prev = merged.get(key);
    merged.set(key, prev ? { ...prev, quantity: Math.min(20, prev.quantity + item.quantity) } : item);
  }
  const lines = [...merged.values()];
  const totals = calculateTotals(lines);
  if (totals.hasUnpriced) {
    return error("Cene još nisu postavljene. Pozovite nas da poručite telefonom.", 409);
  }

  const order: OrderRecord = {
    orderId: createOrderId(),
    createdAt: new Date().toISOString(),
    customer: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: normalizePhone(customer.phone)!,
      street: customer.street,
      city: customer.city,
      postalCode: customer.postalCode,
      email: customer.email,
      note: customer.note,
    },
    items: lines.map((l) => ({ ...l, unitPrice: unitPrice(l.sizeId) })),
    totals,
  };

  // The owner email is the order of record: if it fails, the order fails
  try {
    await sendOwnerOrderEmail(order);
  } catch (e) {
    console.error("[order] owner email failed", order.orderId, e);
    return error("Porudžbinu trenutno ne možemo da primimo.", 502);
  }

  // Best effort: customer confirmation and webhook must not fail the order
  await Promise.allSettled([
    sendCustomerConfirmation(order).catch((e) => console.error("[order] customer email failed", e)),
    postWebhook(order),
  ]);

  return NextResponse.json({ ok: true, orderId: order.orderId });
}

async function postWebhook(order: OrderRecord) {
  const url = process.env.ORDER_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      signal: AbortSignal.timeout(5000),
    });
  } catch (e) {
    console.error("[order] webhook failed", order.orderId, e);
  }
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { contact, isPlaceholder } from "@/content/site";
import { Eucalyptus } from "@/components/illustrations";
import { Text } from "@/components/ui/Text";
import { LAST_ORDER_KEY } from "@/lib/checkout";
import { calculateTotals, isKnownLine, type LineInput } from "@/lib/pricing";
import { OrderReview } from "./OrderReview";
import type { LastOrder } from "./OrderForm";

export function ThankYou() {
  const [order, setOrder] = useState<LastOrder | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Read after mount: sessionStorage and the URL are client-only
    const fromUrl = new URLSearchParams(window.location.search).get("broj");
    let stored: LastOrder | null = null;
    try {
      const raw = sessionStorage.getItem(LAST_ORDER_KEY);
      stored = raw ? (JSON.parse(raw) as LastOrder) : null;
    } catch {
      stored = null;
    }
    const matching = stored && (!fromUrl || stored.orderId === fromUrl) ? stored : null;
    setOrder(matching);
    setOrderId(matching?.orderId ?? (fromUrl && /^BJ-\d{6}-[A-Z0-9]{4}$/.test(fromUrl) ? fromUrl : null));
  }, []);

  const items = (order?.items.filter(isKnownLine) ?? []) as LineInput[];

  return (
    <div>
      <Eucalyptus className="h-28 w-auto text-sage" />
      <h1 className="mt-8 text-h2">
        Hvala{order ? `, ${order.firstName}` : ""}. <em>Porudžbina je primljena.</em>
      </h1>
      {orderId && (
        <p className="mt-6 text-lead">
          Broj porudžbine: <strong className="font-semibold tabular-nums">{orderId}</strong>
        </p>
      )}
      <p className="measure mt-4 text-lead text-muted">
        Pozvaćemo vas radi potvrde porudžbine. Paket zatim stiže kurirskom službom za 1–3 radna dana, a plaćate
        pouzećem, prilikom preuzimanja.
      </p>

      {items.length > 0 && (
        <div className="mt-10">
          <p className="mb-3 text-sm font-semibold">Sažetak</p>
          <OrderReview items={items} totals={calculateTotals(items)} />
        </div>
      )}

      <p className="mt-10 text-muted">
        Imate pitanje?{" "}
        {isPlaceholder(contact.phoneIntl) ? (
          <Text>{contact.phone}</Text>
        ) : (
          <a href={`tel:+${contact.phoneIntl}`} className="text-charcoal underline underline-offset-4">
            Pozovite {contact.phone}
          </a>
        )}
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex min-h-12 items-center rounded-soft border border-charcoal/25 px-6 font-semibold transition-colors duration-500 ease-calm hover:border-charcoal"
      >
        Nazad na početnu
      </Link>
    </div>
  );
}

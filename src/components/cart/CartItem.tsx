"use client";

import { X } from "lucide-react";
import { customSize, getSize, isPlaceholder } from "@/content/site";
import { getScent,  } from "@/content/scents";

import { PillowArt } from "@/components/illustrations";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Text } from "@/components/ui/Text";
import { formatRSD } from "@/lib/format";
import { lineLabel, scentLabel } from "@/lib/items";
import { unitPrice } from "@/lib/pricing";
import { useCart, type CartItem as Item } from "@/store/cart";

export function CartItem({ item }: { item: Item }) {
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const scent = getScent(item.scentId);
  const size = getSize(item.sizeId);
  const price = unitPrice(item.sizeId);
  const label = lineLabel(item);

  return (
    <li className="flex gap-4 border-b border-line py-5">
      <div
        aria-hidden="true"
        className="flex size-20 shrink-0 items-center justify-center rounded-soft"
        style={{ backgroundColor: scent.tint }}
      >
        <PillowArt className="w-14" style={{ color: scent.accent }} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-serif text-[1.1875rem] leading-tight">{scentLabel(item)}</p>
            <p className="text-sm text-muted">
              {size.custom ? (
                `Po meri · ${item.width} × ${item.height} cm`
              ) : (
                <>
                  {/* {size.name} · <Text>{size.dimensionsCm}</Text> */}
                  {!isPlaceholder(size.dimensionsCm) && " cm"}
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => remove(item.key)}
            aria-label={`Ukloni ${label} iz korpe`}
            className="tap -mr-3 -mt-2.5 inline-flex items-center justify-center rounded-soft text-muted hover:text-charcoal"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-4" />
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <QuantityStepper
            size="sm"
            value={item.quantity}
            onChange={(n) => setQuantity(item.key, n)}
            label={`Količina, ${label}`}
          />
          <p className="whitespace-nowrap font-semibold tabular-nums">{size.custom ? (
              <span className="text-sm font-normal text-muted">{customSize.priceLabel}</span>
            ) : price !== null ? (
              formatRSD(price * item.quantity)
            ) : (
              "—"
            )}</p>
        </div>
      </div>
    </li>
  );
}

import { customSize, getScent } from "@/content/site";
import { CartSummary } from "@/components/cart/CartSummary";
import { formatRSD } from "@/lib/format";
import { isCustomSize, lineKey, scentLabel, sizeLabel } from "@/lib/items";
import { unitPrice, type LineInput, type Totals } from "@/lib/pricing";

/** Read-only order overview used under the form and on the thank-you page. */
export function OrderReview({ items, totals }: { items: LineInput[]; totals: Totals }) {
  return (
    <div className="rounded-card border border-line bg-linen/60 p-5 md:p-6">
      <ul className="space-y-3">
        {items.map((item) => {
          const price = unitPrice(item.sizeId);
          return (
            <li key={lineKey(item)} className="flex justify-between gap-4 text-[0.9375rem]">
              <span className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: getScent(item.scentId).accent }}
                />
                {scentLabel(item)}, {sizeLabel(item).toLowerCase()} × {item.quantity}
              </span>
              <span className="shrink-0 tabular-nums">
                {isCustomSize(item.sizeId) ? customSize.priceLabel : price !== null ? formatRSD(price * item.quantity) : "—"}
              </span>
            </li>
          );
        })}
      </ul>
      <CartSummary totals={totals} className="mt-5 border-t border-line pt-4" />
    </div>
  );
}

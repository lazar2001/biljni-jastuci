import { formatRSD } from "@/lib/format";
import { freeShippingAbove, type Totals } from "@/lib/pricing";

export function FreeShippingBar({ totals }: { totals: Totals }) {
  const threshold = freeShippingAbove();
  if (threshold === null || totals.freeShippingRemaining === null) return null;
  // Custom-only carts have no priced subtotal yet, so progress would be misleading
  if (totals.hasCustom && totals.subtotal === 0) return null;

  const progress = Math.min(1, totals.subtotal / threshold);
  const done = totals.freeShippingRemaining === 0;

  return (
    <div>
      <p className="text-sm" aria-live="polite">
        {done ? (
          "Dostava je besplatna."
        ) : (
          <>
            Još <strong className="font-semibold">{formatRSD(totals.freeShippingRemaining)}</strong> do besplatne dostave
          </>
        )}
      </p>
      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-charcoal/10" aria-hidden="true">
        <div
          className="h-full origin-left rounded-full bg-eucalyptus transition-transform duration-700 ease-calm"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}

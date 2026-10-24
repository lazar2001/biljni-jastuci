import { customSize } from "@/content/site";
import { formatRSD } from "@/lib/format";
import type { Totals } from "@/lib/pricing";

export function CartSummary({ totals, className }: { totals: Totals; className?: string }) {
  const shipping =
    totals.shipping === null ? "po cenovniku kurira" : totals.shipping === 0 ? "Besplatna" : formatRSD(totals.shipping);
  // Only custom pillows: there is no priced subtotal to show yet
  const onlyCustom = totals.hasCustom && totals.subtotal === 0;

  return (
    <div className={className}>
      <dl className="space-y-2 text-[0.9375rem]">
        {!onlyCustom && (
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Međuzbir</dt>
            <dd className="tabular-nums">{formatRSD(totals.subtotal)}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Dostava</dt>
          <dd className="tabular-nums">{shipping}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
          <dt className="font-semibold">
            Ukupno
            {totals.hasCustom && <span className="block text-sm font-normal text-muted">bez jastuka po meri</span>}
          </dt>
          <dd className="font-serif text-[1.75rem] leading-none tabular-nums">{formatRSD(totals.total)}</dd>
        </div>
      </dl>
      {totals.hasCustom && <p className="mt-2 text-sm text-muted">{customSize.note}</p>}
    </div>
  );
}

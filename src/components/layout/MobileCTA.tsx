"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { customSize, getScent, getSize, orderAnchor, sizesSection } from "@/content/site";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { formatRSD } from "@/lib/format";
import { unitPrice } from "@/lib/pricing";
import { useUI } from "@/store/cart";
import { useSelection } from "@/store/selection";

/**
 * Mobile-only bottom bar with the current choice and an order button.
 * Hidden while the hero, any form ([data-cta-hide]) or the footer is on screen.
 */
export function MobileCTA() {
  const pathname = usePathname();
  const cartOpen = useUI((s) => s.cartOpen);
  const scent = getScent(useSelection((s) => s.scentId));
  const sizeId = useSelection((s) => s.sizeId);
  const quantity = useSelection((s) => s.quantity);
  const [blocked, setBlocked] = useState(true);

  useEffect(() => {
    if (pathname !== "/") return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-cta-hide], footer"));
    if (targets.length === 0) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setBlocked(visible.size > 0);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname !== "/") return null;

  const price = unitPrice(sizeId);
  const shown = !blocked && !cartOpen;

  return (
    <div
      aria-hidden={!shown}
      inert={!shown}
      className={clsx(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-700 ease-calm lg:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="flex items-center gap-2 truncate text-sm">
            <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: scent.accent }} />
            {scent.custom ? "Vaša nota" : scent.name} · {getSize(sizeId).custom ? "Po meri" : getSize(sizeId).name}
            {quantity > 1 && ` × ${quantity}`}
          </p>
          <p className="font-semibold tabular-nums">
            {getSize(sizeId).custom
              ? customSize.priceLabel
              : price !== null
                ? formatRSD(price * quantity)
                : sizesSection.noPriceLabel}
          </p>
        </div>
        <AnchorLink
          href={orderAnchor}
          className="inline-flex min-h-12 shrink-0 items-center rounded-soft bg-eucalyptus px-7 font-semibold text-paper"
        >
          Poruči
        </AnchorLink>
      </div>
    </div>
  );
}

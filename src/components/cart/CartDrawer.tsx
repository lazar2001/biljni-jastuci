"use client";

import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { X } from "lucide-react";
import { EmptyBasket } from "@/components/illustrations";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Button } from "@/components/ui/Button";
import { plural } from "@/lib/format";
import { goToOrderForm } from "@/lib/checkout";
import { useFocusTrap, useHydrated } from "@/lib/hooks";
import { ease } from "@/lib/motion";
import { calculateTotals, isKnownLine } from "@/lib/pricing";
import { lockScroll } from "@/lib/scroll";
import { useCart, useUI } from "@/store/cart";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { FreeShippingBar } from "./FreeShippingBar";

export function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const close = useUI((s) => s.closeCart);
  const hydrated = useHydrated();
  const rawItems = useCart((s) => s.items);
  const items = useMemo(() => (hydrated ? rawItems.filter(isKnownLine) : []), [hydrated, rawItems]);
  const totals = useMemo(() => calculateTotals(items), [items]);
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const ref = useRef<HTMLDivElement>(null);

  useFocusTrap(ref, open, close);

  useEffect(() => {
    if (!open) return;
    return lockScroll();
  }, [open]);

  const checkout = () => {
    close();
    goToOrderForm();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]">
          <m.div
            aria-hidden="true"
            className="absolute inset-0 bg-charcoal/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            onClick={close}
          />
          <m.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[28rem] flex-col bg-paper shadow-[0_0_60px_rgba(43,42,39,0.12)]"
          >
            <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line px-6">
              <h2 id="cart-title" className="font-serif text-[1.5rem]">
                Korpa
                {count > 0 && (
                  <span className="ml-2 font-sans text-sm text-muted">
                    {count} {plural(count, "komad", "komada", "komada")}
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Zatvori korpu"
                className="tap -mr-2 inline-flex items-center justify-center rounded-soft"
              >
                <X aria-hidden="true" strokeWidth={1.25} className="size-6" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <EmptyBasket className="w-32 text-stone" />
                <p className="mt-6 font-serif text-h3">Korpa je još prazna.</p>
                <p className="mt-2 max-w-[28ch] text-muted">Izaberite miris i dimenziju koji vam odgovaraju.</p>
                <AnchorLink
                  href="/#poruci"
                  onClick={close}
                  className="mt-8 inline-flex min-h-12 items-center rounded-soft bg-eucalyptus px-6 font-semibold text-paper transition-colors duration-500 ease-calm hover:bg-charcoal"
                >
                  Izaberite jastuk
                </AnchorLink>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto overscroll-contain px-6" data-lenis-prevent>
                  <div className="pt-5">
                    <FreeShippingBar totals={totals} />
                  </div>
                  <ul className="mt-2">
                    {items.map((item) => (
                      <CartItem key={item.key} item={item} />
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 border-t border-line px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
                  <CartSummary totals={totals} />
                  <Button onClick={checkout} arrow className="mt-5 w-full min-h-14" disabled={totals.hasUnpriced}>
                    Nastavi na porudžbinu
                  </Button>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-2 min-h-11 w-full text-sm text-muted underline-offset-4 hover:underline"
                  >
                    Nastavi kupovinu
                  </button>
                </div>
              </>
            )}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

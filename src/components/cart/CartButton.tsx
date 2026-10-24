"use client";

import * as m from "motion/react-m";
import { ShoppingBag } from "lucide-react";
import { selectCount, useCart, useUI } from "@/store/cart";
import { useHydrated } from "@/lib/hooks";
import { plural } from "@/lib/format";

export function CartButton() {
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  const openCart = useUI((s) => s.openCart);
  const shown = hydrated ? count : 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={
        shown > 0
          ? `Korpa, ${shown} ${plural(shown, "artikal", "artikla", "artikala")}`
          : "Korpa je prazna"
      }
      className="tap relative inline-flex items-center justify-center rounded-soft text-charcoal transition-colors duration-500 ease-calm hover:bg-charcoal/[0.05]"
    >
      <ShoppingBag aria-hidden="true" strokeWidth={1.4} className="size-[22px]" />
      {shown > 0 && (
        <m.span
          key={shown}
          initial={{ scale: 1.45 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 14 }}
          className="absolute right-0.5 top-1 flex min-w-[18px] items-center justify-center rounded-full bg-eucalyptus px-1 text-[0.6875rem] font-semibold leading-[18px] text-paper"
        >
          {shown}
        </m.span>
      )}
    </button>
  );
}

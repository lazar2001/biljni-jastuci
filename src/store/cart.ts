import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { quantity as qtyLimits } from "@/content/site";
import { lineKey, type LineItem } from "@/lib/items";

export type CartItem = LineItem & {
  /** Same scent + size (+ same custom text / measurements) merge into one line */
  key: string;
};

type CartState = {
  items: CartItem[];
  add: (line: Omit<LineItem, "quantity">, quantity: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const clamp = (n: number) => Math.min(qtyLimits.max, Math.max(qtyLimits.min, Math.round(n)));

// Prices are intentionally not stored: they are always derived from site.ts,
// so a price change in config is reflected in carts saved earlier.
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (line, quantity) =>
        set((state) => {
          const key = lineKey(line);
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: clamp(i.quantity + quantity) } : i,
              ),
            };
          }
          return { items: [...state.items, { ...line, key, quantity: clamp(quantity) }] };
        }),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.key === key ? { ...i, quantity: clamp(quantity) } : i)),
        })),
      remove: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      clear: () => set({ items: [] }),
    }),
    {
      // v2: scent ids changed and custom lines were added, so older carts are dropped
      name: "cart-v2",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const selectCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

type UIState = {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

export const useUI = create<UIState>()((set) => ({
  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
}));

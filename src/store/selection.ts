import { create } from "zustand";
import { defaultScentId, defaultSizeId, quantity, type ScentId, type SizeId } from "@/content/site";

/**
 * Current product choice, shared by the Scents and Sizes sections,
 * the order configurator and the mobile CTA bar.
 */
type SelectionState = {
  scentId: ScentId;
  sizeId: SizeId;
  quantity: number;
  /** Free text for the "Izaberite vašu" note */
  customScent: string;
  /** Raw cm inputs for "Po vašoj meri" */
  customWidth: string;
  customHeight: string;
  setScent: (id: ScentId) => void;
  setSize: (id: SizeId) => void;
  setQuantity: (n: number) => void;
  setCustomScent: (text: string) => void;
  setCustomWidth: (value: string) => void;
  setCustomHeight: (value: string) => void;
};

export const useSelection = create<SelectionState>()((set) => ({
  scentId: defaultScentId,
  sizeId: defaultSizeId,
  quantity: quantity.min,
  customScent: "",
  customWidth: "",
  customHeight: "",
  setScent: (scentId) => set({ scentId }),
  setSize: (sizeId) => set({ sizeId }),
  setQuantity: (n) => set({ quantity: Math.min(quantity.max, Math.max(quantity.min, Math.round(n))) }),
  setCustomScent: (customScent) => set({ customScent }),
  setCustomWidth: (customWidth) => set({ customWidth: customWidth.replace(/[^\d]/g, "").slice(0, 3) }),
  setCustomHeight: (customHeight) => set({ customHeight: customHeight.replace(/[^\d]/g, "").slice(0, 3) }),
}));

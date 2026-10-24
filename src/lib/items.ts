import { customScent, customSize, getScent, getSize, type ScentId, type SizeId } from "@/content/site";

/** One order line. Custom scent / size carry the customer's own text and measurements. */
export type LineItem = {
  scentId: ScentId;
  sizeId: SizeId;
  quantity: number;
  /** Required when scentId is "custom" */
  customScent?: string;
  /** Required (cm) when sizeId is "custom" */
  width?: number;
  height?: number;
};

export const isCustomScent = (id: ScentId) => getScent(id).custom === true;
export const isCustomSize = (id: SizeId) => getSize(id).custom === true;

/** Same scent + size (+ same custom text / measurements) merge into one cart line. */
export function lineKey(line: Omit<LineItem, "quantity">): string {
  const scentPart = isCustomScent(line.scentId)
    ? `custom:${(line.customScent ?? "").trim().toLowerCase()}`
    : line.scentId;
  const sizePart = isCustomSize(line.sizeId) ? `custom:${line.width}x${line.height}` : line.sizeId;
  return `${scentPart}|${sizePart}`;
}

export function scentLabel(line: Pick<LineItem, "scentId" | "customScent">): string {
  return isCustomScent(line.scentId) ? `Po želji: „${line.customScent ?? ""}“` : getScent(line.scentId).name;
}

export function sizeLabel(line: Pick<LineItem, "sizeId" | "width" | "height">): string {
  return isCustomSize(line.sizeId) ? `Po meri ${line.width} × ${line.height} cm` : getSize(line.sizeId).name;
}

export const lineLabel = (line: LineItem) => `${scentLabel(line)}, ${sizeLabel(line)}`;

/** Parses a cm field; returns null when empty or out of range. */
export function parseCm(value: string): number | null {
  const n = Number(value.replace(",", "."));
  if (!Number.isFinite(n) || value.trim() === "") return null;
  const rounded = Math.round(n);
  return rounded >= customSize.min && rounded <= customSize.max ? rounded : null;
}

/** Validates the custom parts of a selection; returns a message in Serbian or null when valid. */
export function customSelectionError(sel: {
  scentId: ScentId;
  sizeId: SizeId;
  customScent: string;
  customWidth: string;
  customHeight: string;
}): string | null {
  if (isCustomScent(sel.scentId)) {
    const text = sel.customScent.trim();
    if (text.length < customScent.minLength) return "Upišite koju mirisnu notu želite.";
    if (text.length > customScent.maxLength) return `Opis note može imati najviše ${customScent.maxLength} karaktera.`;
  }
  if (isCustomSize(sel.sizeId)) {
    if (parseCm(sel.customWidth) === null || parseCm(sel.customHeight) === null) {
      return `Unesite širinu i visinu između ${customSize.min} i ${customSize.max} cm.`;
    }
  }
  return null;
}

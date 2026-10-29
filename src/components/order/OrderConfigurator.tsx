"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import {
  contact,
  customScent,
  customSize,
  getSize,
  isPlaceholder,
  sizes,
  sizesSection,
  type SizeId,
} from "@/content/site";
import { type ScentId, scents, getScent } from "@/content/scents";
import { AnimatedPrice } from "@/components/ui/AnimatedPrice";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Text } from "@/components/ui/Text";
import { formatRSD } from "@/lib/format";
import { goToOrderForm } from "@/lib/checkout";
import { customSelectionError, parseCm } from "@/lib/items";
import { unitPrice } from "@/lib/pricing";
import { useCart, useUI } from "@/store/cart";
import { useSelection } from "@/store/selection";
import { CustomSizeFields } from "./CustomSizeFields";

const stepLabel = "flex items-baseline gap-3 text-sm font-semibold";
const stepNum = "font-sans text-xs tracking-[0.14em] text-muted";
const optionBase =
  "cursor-pointer rounded-soft border transition-[border-color,background-color] duration-500 ease-calm has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-eucalyptus";

export function OrderConfigurator() {
  const selection = useSelection();
  const { scentId, sizeId, quantity, setScent, setSize, setQuantity } =
    selection;
  const add = useCart((s) => s.add);
  const openCart = useUI((s) => s.openCart);
  const [added, setAdded] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const scent = getScent(scentId);
  const size = getSize(sizeId);
  const price = unitPrice(sizeId);
  const customError = customSelectionError(selection);
  // Standard sizes need a price; custom sizes are priced by phone
  const canOrder = size.custom || price !== null;

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 4000);
    return () => window.clearTimeout(t);
  }, [added]);

  // Hide the validation hint once the problem is fixed
  useEffect(() => {
    if (!customError) setShowErrors(false);
  }, [customError]);

  const addSelection = () => {
    if (customError) {
      setShowErrors(true);
      return false;
    }
    add(
      {
        scentId,
        sizeId,
        customScent: scent.custom ? selection.customScent.trim() : undefined,
        width: size.custom ? parseCm(selection.customWidth)! : undefined,
        height: size.custom ? parseCm(selection.customHeight)! : undefined,
      },
      quantity,
    );
    return true;
  };

  const addToCart = () => {
    if (addSelection()) setAdded(true);
  };

  const orderNow = () => {
    if (addSelection()) goToOrderForm();
  };

  return (
    <div className="mt-10 space-y-10">
      {/* 1. Scent */}
      <fieldset>
        <legend className={stepLabel}>
          Mirisna nota: <span className="font-normal">{scent.name}</span>
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {scents.map((s) => (
            <label
              key={s.id}
              className={clsx(
                optionBase,
                "flex min-h-12 items-center gap-2.5 px-4",
                s.id === scentId
                  ? "border-charcoal bg-linen"
                  : "border-charcoal/20 hover:border-charcoal/50",
              )}
            >
              <input
                type="radio"
                name="cfg-scent"
                value={s.id}
                checked={s.id === scentId}
                onChange={() => setScent(s.id as ScentId)}
                className="sr-only"
              />
              {s.custom ? (
                <span
                  aria-hidden="true"
                  className="size-4 rounded-full border border-dashed border-charcoal/60"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="size-4 rounded-full"
                  style={{ backgroundColor: s.accent }}
                />
              )}
              {s.name}
            </label>
          ))}
        </div>

        {scent.custom && (
          <div className="mt-4">
            <label htmlFor="cfg-custom-scent" className="text-sm font-semibold">
              {customScent.label}
            </label>
            <input
              id="cfg-custom-scent"
              type="text"
              value={selection.customScent}
              maxLength={customScent.maxLength}
              placeholder={customScent.placeholder}
              onChange={(e) => selection.setCustomScent(e.target.value)}
              aria-invalid={
                showErrors && customError?.includes("notu") ? true : undefined
              }
              className="mt-2 h-13 min-h-[52px] w-full rounded-soft border border-charcoal/25 bg-paper px-4 text-base outline-none transition-colors duration-300 placeholder:text-charcoal/40 focus:border-charcoal focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-eucalyptus"
            />
          </div>
        )}
      </fieldset>

      {/* 2. Size */}
      <fieldset>
        <legend className={stepLabel}>Dimenzija</legend>
        <div className="mt-4 grid gap-2">
          {sizes.map((s) => {
            const p = unitPrice(s.id);
            const selected = s.id === sizeId;
            return (
              <label
                key={s.id}
                className={clsx(
                  optionBase,
                  "flex min-h-14 items-center gap-4 px-4 py-3",
                  selected
                    ? "border-charcoal bg-linen"
                    : "border-charcoal/20 hover:border-charcoal/50",
                )}
              >
                <input
                  type="radio"
                  name="cfg-size"
                  value={s.id}
                  checked={selected}
                  onChange={() => setSize(s.id as SizeId)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={clsx(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                    selected
                      ? "border-eucalyptus bg-eucalyptus text-paper"
                      : "border-charcoal/30",
                  )}
                >
                  {selected && <Check strokeWidth={2.5} className="size-3" />}
                </span>
                <span className="flex-1">
                  <span className="font-semibold">{s.name}</span>
                  {s.bestseller && (
                    <span className="ml-2 rounded-[5px] bg-citrus/25 px-1.5 py-0.5 text-[0.6875rem] font-semibold">
                      {sizesSection.bestsellerLabel}
                    </span>
                  )}
                  <span className="block text-sm text-muted">
                    <Text>{s.dimensionsCm}</Text>
                    {!s.custom && !isPlaceholder(s.dimensionsCm) && " cm"}
                  </span>
                </span>
                <span className="text-right text-sm tabular-nums">
                  {s.custom ? (
                    <span className="text-muted">Po dogovoru</span>
                  ) : p !== null ? (
                    <span className="text-base">{formatRSD(p)}</span>
                  ) : (
                    <span className="text-muted">
                      {sizesSection.noPriceLabel}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>

        {size.custom && (
          <div className="mt-4">
            <CustomSizeFields />
          </div>
        )}
      </fieldset>

      {/* 3. Quantity + live price */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-8">
        <div>
          <div className="mt-4">
            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>
        </div>
        <div className="text-right">
          {size.custom ? (
            <>
              <p className="text-sm text-muted">Jastuk po meri</p>
              <p className="mt-1 font-serif text-[1.75rem] leading-none">
                {customSize.priceLabel}
              </p>
            </>
          ) : price !== null ? (
            <>
              <p className="text-sm text-muted">
                {formatRSD(price)} × {quantity}
              </p>
              <AnimatedPrice
                value={price * quantity}
                className="mt-1 block font-serif text-[2.25rem] leading-none"
              />
            </>
          ) : (
            <p className="text-muted">{sizesSection.noPriceLabel}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="secondary"
            onClick={addToCart}
            disabled={!canOrder}
            className="min-h-14"
          >
            Dodaj u korpu
          </Button>
          <Button
            onClick={orderNow}
            disabled={!canOrder}
            arrow
            className="min-h-14"
          >
            Poruči odmah
          </Button>
        </div>

        <p aria-live="polite" className="mt-4 min-h-6 text-sm">
          {showErrors && customError && (
            <span className="text-[#A4472F]">{customError}</span>
          )}
          {!showErrors && added && (
            <span className="inline-flex items-center gap-2">
              <Check
                aria-hidden="true"
                strokeWidth={2}
                className="size-4 text-eucalyptus"
              />
              Dodato u korpu.
              <button
                type="button"
                onClick={openCart}
                className="min-h-11 underline underline-offset-4"
              >
                Otvori korpu
              </button>
            </span>
          )}
          {!canOrder && (
            <span className="text-muted">
              Cene uskoro objavljujemo. Do tada poručite telefonom:{" "}
              <Text>065 3053662</Text>
              {isPlaceholder(contact.phone) ? "" : "."}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

"use client";

import clsx from "clsx";
import { customSize, fill, isPlaceholder, sizes, sizesSection, type SizeId } from "@/content/site";
import { CustomSizeFields } from "@/components/order/CustomSizeFields";
import { PillowSilhouette } from "@/components/illustrations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { formatRSD } from "@/lib/format";
import { useSelection } from "@/store/selection";

// Relative scale of the silhouettes. Uses real cm when known, otherwise a
// neutral progression so the difference in size is still visible.
const isDev = process.env.NODE_ENV !== "production";
const FALLBACK_SCALE = [0.62, 0.8, 1];
const FALLBACK_RATIO = 1.45;
const maxWidth = Math.max(...sizes.filter((s) => !s.custom).map((s) => s.widthCm ?? 0));

function silhouette(index: number) {
  const s = sizes[index];
  if (s.widthCm && s.heightCm && maxWidth > 0) {
    return { scale: s.widthCm / maxWidth, ratio: s.widthCm / s.heightCm };
  }
  return { scale: FALLBACK_SCALE[index] ?? 1, ratio: FALLBACK_RATIO };
}

export function Sizes() {
  const sizeId = useSelection((s) => s.sizeId);
  const setSize = useSelection((s) => s.setSize);

  return (
    <section id="velicine" aria-labelledby="sizes-title" className="section-y bg-linen">
      <div className="container-site">
        <SectionHeading id="sizes-title" eyebrow={sizesSection.eyebrow} title={sizesSection.title} />

        <fieldset className="mt-14 lg:mt-20">
          <legend className="sr-only">Izaberite dimenziju</legend>
          <Stagger stagger={0.12} className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {sizes.map((size, i) => {
              const { scale, ratio } = silhouette(i);
              const selected = size.id === sizeId;
              return (
                <StaggerItem key={size.id} className="flex">
                <label
                  className={clsx(
                    "group relative flex w-full cursor-pointer flex-col rounded-card border p-6 transition-[border-color,background-color] duration-700 ease-calm md:p-8",
                    "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-eucalyptus",
                    selected ? "border-charcoal/70 bg-paper" : "border-line bg-paper/40 hover:border-charcoal/40",
                  )}
                >
                  <input
                    type="radio"
                    name="size"
                    value={size.id}
                    checked={selected}
                    onChange={() => setSize(size.id as SizeId)}
                    className="sr-only"
                  />

                  {size.bestseller && (
                    <span className="absolute right-5 top-5 rounded-[6px] bg-citrus/25 px-2.5 py-1 text-xs font-semibold tracking-[0.04em] text-charcoal">
                      {sizesSection.bestsellerLabel}
                    </span>
                  )}

                  {/* Silhouettes share a baseline so the size difference reads at a glance */}
                  <div className="flex h-20 items-end md:h-44">
                    <PillowSilhouette
                      ratio={ratio}
                      className={clsx(
                        "transition-colors duration-700 ease-calm",
                        selected ? "text-accent" : "text-stone",
                        size.custom && "[&_rect]:[stroke-dasharray:6_6]",
                      )}
                      style={{ width: `${(size.custom ? 0.9 : scale) * 100}%`, maxHeight: "100%" }}
                    />
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-5 md:mt-8">
                    <div>
                      <p className="font-serif text-h3">{size.name}</p>
                      <p className="mt-1 text-sm text-muted">
                        <Text>{size.dimensionsCm}</Text>
                        {!size.custom && !isPlaceholder(size.dimensionsCm) && " cm"}
                      </p>
                    </div>
                    <p className="text-right font-semibold tabular-nums">
                      {size.custom ? (
                        <span className="text-sm font-normal text-muted">{customSize.priceLabel}</span>
                      ) : size.price !== null ? (
                        formatRSD(size.price)
                      ) : (
                        <span className="text-sm font-normal text-muted">
                          {isDev ? <Text>{fill("cena u RSD")}</Text> : sizesSection.noPriceLabel}
                        </span>
                      )}
                    </p>
                  </div>
                </label>
                </StaggerItem>
              );
            })}
          </Stagger>
        </fieldset>

        {sizes.find((s) => s.id === sizeId)?.custom && (
          <div className="mt-8 max-w-md">
            <CustomSizeFields />
          </div>
        )}
      </div>
    </section>
  );
}

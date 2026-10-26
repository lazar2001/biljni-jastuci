"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/content/site";
import { Lightbox } from "@/components/ui/Lightbox";
import { Placeholder } from "@/components/ui/Placeholder";

export type RailImage = GalleryImage & { exists: boolean };

// Varying shapes give the rail an editorial rhythm instead of a uniform strip
const shapes = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[1/1]", "aspect-[4/5]", "aspect-[5/6]"];
const widths = [
  "w-[78vw] sm:w-[46vw] lg:w-[32vw]",
  "w-[70vw] sm:w-[40vw] lg:w-[28vw]",
  "w-[82vw] sm:w-[50vw] lg:w-[34vw]",
];

export function GalleryRail({ images, heading }: { images: RailImage[]; heading: React.ReactNode }) {
  const [open, setOpen] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const trackRef = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [updateArrows, images.length]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const arrowClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-linen/90 text-charcoal transition-colors duration-500 ease-calm hover:bg-charcoal hover:text-paper disabled:pointer-events-none disabled:opacity-40";

  return (
    <>
      <div className="section-y overflow-hidden">
        {heading}

        <ul
          ref={trackRef}
          aria-label="Fotografije"
          className="mt-12 flex snap-x snap-mandatory items-end gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <li key={img.src} className={clsx("shrink-0 snap-start", widths[i % widths.length])}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Uvećaj fotografiju: ${img.alt}`}
                className={clsx(
                  "group relative block w-full overflow-hidden rounded-card focus-visible:outline-paper",
                  shapes[i % shapes.length],
                )}
              >
                {img.exists ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 82vw"
                    className="object-cover transition-transform duration-[1200ms] ease-calm group-hover:scale-[1.03]"
                  />
                ) : (
                  <Placeholder alt={img.alt} tone={img.tone} file={img.src} className="absolute inset-0" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="container-site mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            aria-label="Prethodne fotografije"
            className={arrowClass}
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            aria-label="Sledeće fotografije"
            className={arrowClass}
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Lightbox images={images} index={open} onChange={setOpen} />
    </>
  );
}
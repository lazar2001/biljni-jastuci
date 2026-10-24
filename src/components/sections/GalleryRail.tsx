"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import type { GalleryImage } from "@/content/site";
import { Lightbox } from "@/components/ui/Lightbox";
import { Placeholder } from "@/components/ui/Placeholder";

export type RailImage = GalleryImage & { exists: boolean };

// Varying shapes give the rail an editorial rhythm instead of a uniform strip
const shapes = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[1/1]", "aspect-[4/5]", "aspect-[5/6]"];
const widths = [
  "w-[78vw] sm:w-[46vw]",
  "w-[70vw] sm:w-[40vw]",
  "w-[82vw] sm:w-[50vw]",
];
// On desktop items size by height so the whole strip fits the pinned viewport
const pinnedHeights = ["h-[min(58vh,36rem)]", "h-[min(50vh,31rem)]", "h-[min(54vh,34rem)]"];

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Pinned horizontal scroll on desktop is enabled for wide, fine-pointer screens without reduced motion. */
function usePinned() {
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return wide && !reduced;
}

export function GalleryRail({ images, heading }: { images: RailImage[]; heading: React.ReactNode }) {
  const [open, setOpen] = useState<number | null>(null);
  const pinned = usePinned();
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);

  // Horizontal distance to travel = track width beyond the viewport
  useIsomorphicLayoutEffect(() => {
    if (!pinned || !trackRef.current) return;
    const track = trackRef.current;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distance);

  // Keyboard focus on an off-screen photo: scroll the page so the track brings it into view
  const revealFocused = (button: HTMLElement) => {
    const outer = outerRef.current;
    const li = button.parentElement;
    if (!outer || !li) return;
    (outer.firstElementChild as HTMLElement).scrollLeft = 0;
    const target = Math.min(distance, Math.max(0, li.offsetLeft - window.innerWidth * 0.3));
    window.scrollTo({ top: outer.getBoundingClientRect().top + window.scrollY + target });
  };

  const items = images.map((img, i) => (
    <li
      key={img.src}
      className={clsx(
        "shrink-0",
        pinned ? pinnedHeights[i % pinnedHeights.length] : clsx("snap-start", widths[i % widths.length]),
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(i)}
        onFocus={pinned ? (e) => revealFocused(e.currentTarget) : undefined}
        aria-label={`Uvećaj fotografiju: ${img.alt}`}
        className={clsx(
          "group relative block overflow-hidden rounded-card focus-visible:outline-paper",
          pinned ? "h-full w-auto" : "w-full",
          shapes[i % shapes.length],
        )}
      >
        {img.exists ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 36vw, (min-width: 640px) 50vw, 82vw"
            className="object-cover transition-transform duration-[1200ms] ease-calm group-hover:scale-[1.03]"
          />
        ) : (
          <Placeholder alt={img.alt} tone={img.tone} file={img.src} className="absolute inset-0" />
        )}
      </button>
    </li>
  ));

  return (
    <>
      {pinned ? (
        <div ref={outerRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
          <div className="sticky top-0 flex h-screen flex-col justify-center gap-12 overflow-hidden pt-[var(--header-h)]">
            {heading}
            <m.ul
              ref={trackRef}
              style={{ x }}
              className="flex w-max items-end gap-6 pl-site pr-[var(--gutter)] will-change-transform"
              aria-label="Fotografije"
            >
              {items}
            </m.ul>
          </div>
        </div>
      ) : (
        <div ref={outerRef} className="section-y overflow-hidden">
          {heading}
          <ul className="rail mt-12 items-end gap-4" aria-label="Fotografije">
            {items}
            <li aria-hidden="true" className="w-px shrink-0" />
          </ul>
        </div>
      )}

      <Lightbox images={images} index={open} onChange={setOpen} />
    </>
  );
}

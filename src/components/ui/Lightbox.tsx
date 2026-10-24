"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useFocusTrap } from "@/lib/hooks";
import { lockScroll } from "@/lib/scroll";
import { ease } from "@/lib/motion";
import { Placeholder } from "./Placeholder";

type LightboxImage = { src: string; alt: string; tone: string; exists: boolean };

const SWIPE_THRESHOLD = 50;

export function Lightbox({
  images,
  index,
  onChange,
}: {
  images: LightboxImage[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const open = index !== null;
  const count = images.length;

  const close = useCallback(() => onChange(null), [onChange]);
  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + count) % count);
    },
    [index, count, onChange],
  );

  useFocusTrap(ref, open, close);

  useEffect(() => {
    if (!open) return;
    return lockScroll();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const image = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {open && image && (
        <m.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Galerija fotografija"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-0 z-[70] flex flex-col bg-charcoal/95 text-paper backdrop-blur-sm"
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
            <p className="text-sm tabular-nums text-paper/70" aria-live="polite">
              {index! + 1} / {count}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Zatvori galeriju"
              className="tap inline-flex items-center justify-center rounded-soft hover:bg-paper/10"
            >
              <X aria-hidden="true" strokeWidth={1.25} className="size-7" />
            </button>
          </div>

          <div
            className="relative flex flex-1 touch-pan-y items-center justify-center px-4 pb-6 sm:px-20"
            onPointerDown={(e) => {
              startX.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (startX.current === null) return;
              const dx = e.clientX - startX.current;
              startX.current = null;
              if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.figure
                key={image.src}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="relative h-full max-h-[80svh] w-full max-w-5xl"
              >
                {image.exists ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 64rem, 100vw"
                    className="object-contain"
                    draggable={false}
                  />
                ) : (
                  <Placeholder
                    alt={image.alt}
                    tone={image.tone}
                    file={image.src}
                    className="absolute inset-0 rounded-card"
                  />
                )}
                <figcaption className="sr-only">{image.alt}</figcaption>
              </m.figure>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Prethodna fotografija"
              className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-paper/20 hover:bg-paper/10 sm:inline-flex"
            >
              <ChevronLeft aria-hidden="true" strokeWidth={1.25} className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Sledeća fotografija"
              className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-paper/20 hover:bg-paper/10 sm:inline-flex"
            >
              <ChevronRight aria-hidden="true" strokeWidth={1.25} className="size-6" />
            </button>
          </div>

          {/* Mobile controls in thumb reach */}
          <div className="flex shrink-0 justify-center gap-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:hidden">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Prethodna fotografija"
              className="inline-flex size-12 items-center justify-center rounded-full border border-paper/20"
            >
              <ChevronLeft aria-hidden="true" strokeWidth={1.25} className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Sledeća fotografija"
              className="inline-flex size-12 items-center justify-center rounded-full border border-paper/20"
            >
              <ChevronRight aria-hidden="true" strokeWidth={1.25} className="size-6" />
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

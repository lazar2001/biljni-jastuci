"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Horizontally scrollable strip (swipe on touch, arrow buttons for mouse and
 * keyboard). Children should be snap items (e.g. <li className="snap-start">).
 */
export function ScrollRail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const btn =
    "inline-flex size-12 items-center justify-center rounded-full border border-charcoal/20 transition-[border-color,opacity] duration-500 ease-calm hover:border-charcoal disabled:opacity-30 disabled:hover:border-charcoal/20";

  return (
    <div>
      <div className="container-site flex justify-end gap-2">
        <button type="button" onClick={() => scrollBy(-1)} disabled={edges.start} aria-label="Prethodne biljke" className={btn}>
          <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} disabled={edges.end} aria-label="Sledeće biljke" className={btn}>
          <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
        </button>
      </div>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        data-lenis-prevent-wheel
        className="rail mt-6 focus-visible:outline-offset-[-2px]"
      >
        {children}
      </div>
    </div>
  );
}

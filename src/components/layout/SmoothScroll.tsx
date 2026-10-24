"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/scroll";

/** Loads Lenis after first paint; skipped entirely for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let destroyed = false;
    let destroy: (() => void) | undefined;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      setLenis(lenis);

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      destroy = () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
        setLenis(null);
      };
    });

    return () => {
      destroyed = true;
      destroy?.();
    };
  }, []);

  return null;
}

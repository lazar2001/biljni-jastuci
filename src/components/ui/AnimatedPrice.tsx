"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion";
import { formatRSD } from "@/lib/format";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";

/**
 * Counts up/down to the new price. The visible number is aria-hidden while it
 * animates; screen readers get only the final value via a polite live region.
 */
export function AnimatedPrice({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced || shown.current === value) {
      el.textContent = formatRSD(value);
      shown.current = value;
      return;
    }
    const controls = animate(shown.current, value, {
      duration: 0.7,
      ease,
      onUpdate: (v) => {
        shown.current = v;
        el.textContent = formatRSD(v);
      },
    });
    return () => controls.stop();
  }, [value, reduced]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {formatRSD(value)}
      </span>
      <span className="sr-only" aria-live="polite">
        {formatRSD(value)}
      </span>
    </span>
  );
}

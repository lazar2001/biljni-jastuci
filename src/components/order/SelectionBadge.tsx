"use client";

import {  getSize } from "@/content/site";
import { getScent,  } from "@/content/scents";
import { useSelection } from "@/store/selection";

/** Small label over the product image reflecting the current choice. */
export function SelectionBadge() {
  const scent = getScent(useSelection((s) => s.scentId));
  const size = getSize(useSelection((s) => s.sizeId));

  return (
    <p className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-soft bg-paper/85 px-3.5 py-2 text-sm backdrop-blur-sm">
      <span
        aria-hidden="true"
        className="size-3 rounded-full transition-colors duration-700 ease-calm"
        style={{ backgroundColor: scent.accent }}
      />
      { size.id}
    </p>
  );
}

"use client";

import { useId } from "react";
import { customSize } from "@/content/site";
import { useSelection } from "@/store/selection";

const input =
  "h-13 min-h-[52px] w-full rounded-soft border border-charcoal/25 bg-paper px-4 pr-12 text-base tabular-nums outline-none transition-colors duration-300 placeholder:text-charcoal/40 focus:border-charcoal focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-eucalyptus";

/** Width × height inputs for "Po vašoj meri", bound to the shared selection. */
export function CustomSizeFields() {
  const id = useId();
  const width = useSelection((s) => s.customWidth);
  const height = useSelection((s) => s.customHeight);
  const setWidth = useSelection((s) => s.setCustomWidth);
  const setHeight = useSelection((s) => s.setCustomHeight);

  const field = (label: string, value: string, onChange: (v: string) => void, key: string) => (
    <div>
      <label htmlFor={`${id}-${key}`} className="text-sm font-semibold">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={`${id}-${key}`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          placeholder={key === "w" ? "npr. 45" : "npr. 30"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={`${id}-hint`}
          className={input}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted">
          cm
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {field("Širina", width, setWidth, "w")}
        {field("Visina", height, setHeight, "h")}
      </div>
      <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
        Od {customSize.min} do {customSize.max} cm. {customSize.note}
      </p>
    </div>
  );
}

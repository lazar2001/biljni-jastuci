"use client";

import { useState } from "react";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import { quantity as limits } from "@/content/site";

export function QuantityStepper({
  value,
  onChange,
  label = "Količina",
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  label?: string;
  size?: "sm" | "md";
}) {
  // Local draft so the field can be empty while typing
  const [draft, setDraft] = useState<string | null>(null);
  const btn = clsx(
    "inline-flex items-center justify-center rounded-soft transition-colors duration-300 ease-calm hover:bg-charcoal/[0.06] disabled:opacity-30 disabled:hover:bg-transparent",
    size === "md" ? "size-12" : "size-11",
  );

  const commit = (raw: string) => {
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n)) onChange(Math.min(limits.max, Math.max(limits.min, n)));
    setDraft(null);
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={clsx("inline-flex items-center rounded-card border border-charcoal/20", size === "md" ? "p-1" : "p-0")}
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= limits.min}
        aria-label="Smanji količinu"
      >
        <Minus aria-hidden="true" strokeWidth={1.5} className="size-4" />
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={label}
        value={draft ?? String(value)}
        onChange={(e) => setDraft(e.target.value.replace(/\D/g, "").slice(0, 2))}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit(e.currentTarget.value);
          }
        }}
        className={clsx(
          "w-10 bg-transparent text-center font-semibold tabular-nums outline-none focus-visible:rounded-[4px] focus-visible:outline-2 focus-visible:outline-eucalyptus",
          size === "md" ? "text-lg" : "text-base",
        )}
      />
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= limits.max}
        aria-label="Povećaj količinu"
      >
        <Plus aria-hidden="true" strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  );
}

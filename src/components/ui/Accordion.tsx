"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/site";
import { AnchorLink } from "./AnchorLink";
import { Text } from "./Text";

/** One panel open at a time. Height animates via grid-template-rows (0fr -> 1fr). */
export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="border-t border-line">
      {items.map((item, i) => {
        const expanded = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <li key={item.question} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left font-serif text-[1.25rem] leading-snug md:text-[1.5rem]"
              >
                {item.question}
                <Plus
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className={clsx(
                    "size-6 shrink-0 transition-transform duration-700 ease-calm",
                    expanded && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={clsx(
                "grid transition-[grid-template-rows] duration-700 ease-calm",
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
              inert={!expanded}
            >
              <div className="overflow-hidden">
                <div
                  className={clsx(
                    "measure pb-7 pr-10 text-muted transition-opacity duration-700 ease-calm",
                    expanded ? "opacity-100" : "opacity-0",
                  )}
                >
                  <p>
                    <Text>{item.answer}</Text>
                  </p>
                  {item.link && (
                    <AnchorLink
                      href={item.link.href}
                      className="mt-3 inline-flex min-h-11 items-center border-b border-charcoal/30 text-charcoal hover:border-charcoal"
                    >
                      {item.link.label}
                    </AnchorLink>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

import { Fragment } from "react";
import { PLACEHOLDER_PREFIX } from "@/content/site";

const PLACEHOLDER_RE = /(\[POPUNITI:[^\]]*\])/g;

/**
 * Renders config text:
 *   - *word* becomes an italic <em>
 *   - [POPUNITI: …] placeholders are highlighted so they are easy to spot
 */
export function Text({ children }: { children: string }) {
  const parts = children.split(PLACEHOLDER_RE);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith(PLACEHOLDER_PREFIX) ? (
          <mark
            key={i}
            className="rounded-[4px] bg-[#F1DDAF] px-1 font-sans text-[0.85em] not-italic text-charcoal"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{renderEmphasis(part)}</Fragment>
        ),
      )}
    </>
  );
}

function renderEmphasis(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((chunk, i) =>
    chunk.startsWith("*") && chunk.endsWith("*") ? (
      <em key={i} className="italic">
        {chunk.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{chunk}</Fragment>
    ),
  );
}

/** Strips formatting markers, for aria labels and metadata. */
export const plainText = (text: string) => text.replace(/\*/g, "");

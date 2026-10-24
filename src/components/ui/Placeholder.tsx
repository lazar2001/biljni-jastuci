import clsx from "clsx";
import { PillowArt } from "@/components/illustrations";

/**
 * Neutral palette placeholder shown until a real photo exists at `file`.
 * Exposes `alt` as an accessible image label.
 */
export function Placeholder({
  alt,
  tone = "#CFC8BC",
  file,
  className,
}: {
  alt: string;
  tone?: string;
  file?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={clsx(
        "flex items-center justify-center overflow-hidden",
        !className?.includes("absolute") && "relative",
        className,
      )}
      style={{ backgroundColor: tone }}
    >
      {/* Soft daylight falloff */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 12%, rgba(255,255,255,0.38), transparent 60%), radial-gradient(90% 70% at 10% 100%, rgba(43,42,39,0.10), transparent 70%)",
        }}
      />
      <PillowArt className="relative w-[46%] max-w-[22rem] text-charcoal/30" />
      {file && process.env.NODE_ENV !== "production" && (
        <span className="absolute bottom-3 left-3 rounded-[4px] bg-paper/70 px-2 py-1 font-sans text-[0.6875rem] text-charcoal/70">
          {file}
        </span>
      )}
    </div>
  );
}

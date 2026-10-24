import { forwardRef, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type Props = {
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  multiline?: boolean;
  tone?: "light" | "dark";
} & ComponentPropsWithoutRef<"input"> &
  ComponentPropsWithoutRef<"textarea">;

/** Labeled input with an error message linked via aria-describedby. */
export const Field = forwardRef<HTMLInputElement & HTMLTextAreaElement, Props>(function Field(
  { label, error, optional, hint, multiline, tone = "light", id, name, className, ...props },
  ref,
) {
  const fieldId = id ?? `f-${name}`;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(" ") || undefined;
  const dark = tone === "dark";

  const control = clsx(
    "w-full rounded-soft border px-4 text-base transition-[border-color,background-color] duration-300 ease-calm outline-none",
    "focus-visible:outline-2 focus-visible:outline-offset-1",
    dark
      ? "border-paper/30 bg-paper/[0.06] text-paper placeholder:text-paper/60 focus:border-paper focus-visible:outline-paper"
      : "border-charcoal/20 bg-paper text-charcoal placeholder:text-charcoal/40 focus:border-charcoal focus-visible:outline-eucalyptus",
    error && (dark ? "border-[#F1C9B8]" : "border-[#A4472F]"),
    multiline ? "min-h-28 py-3" : "h-13 min-h-[52px]",
  );

  return (
    <div className={className}>
      <label htmlFor={fieldId} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-semibold">
        <span>
          {label}
          {!optional && (
            <span aria-hidden="true" className={dark ? "text-paper/90" : "text-muted"}>
              {" "}
              *
            </span>
          )}
        </span>
        {optional && <span className={clsx("font-normal", dark ? "text-paper/90" : "text-muted")}>opciono</span>}
      </label>
      {multiline ? (
        <textarea
          ref={ref}
          id={fieldId}
          name={name}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={!optional}
          className={control}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          id={fieldId}
          name={name}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={!optional}
          className={control}
          {...props}
        />
      )}
      {hint && !error && (
        <p id={hintId} className={clsx("mt-1.5 text-sm", dark ? "text-paper/90" : "text-muted")}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={clsx("mt-1.5 text-sm", dark ? "text-[#FBE8E0]" : "text-[#A4472F]")}>
          {error}
        </p>
      )}
    </div>
  );
});

/** Visually hidden honeypot field — bots fill it, people never see it. */
export function Honeypot(props: ComponentPropsWithoutRef<"input">) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Ne popunjavajte ovo polje
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}

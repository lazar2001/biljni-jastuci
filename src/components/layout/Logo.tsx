import Link from "next/link";
import clsx from "clsx";
import { brand } from "@/content/site";

/** Wordmark with a small hand-drawn sprig. Replace with the real logo SVG when available. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${brand.name}, početna`}
      className={clsx("inline-flex min-h-11 items-center gap-2 text-charcoal", className)}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5 text-sage"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
      >
        <path d="M12 22c0-7 .5-12 4-19" />
        <path d="M12.6 15.5c-2.8-.3-4.9-2-5.6-4.9 2.8.1 4.9 1.7 5.6 4.9Z" />
        <path d="M13.6 10.4c2.4-.6 4.6.2 6 2.4-2.4.6-4.6-.2-6-2.4Z" />
        <path d="M14.8 6.3c-2.2-.6-3.6-2.1-3.9-4.3 2.2.5 3.6 2 3.9 4.3Z" />
      </svg>
      <span className="whitespace-nowrap font-serif text-[1.125rem] leading-none tracking-[-0.01em] sm:text-[1.3125rem]">
        {brand.name}
      </span>
    </Link>
  );
}

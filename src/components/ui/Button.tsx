import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-soft px-6 text-[0.9375rem] font-semibold tracking-[0.01em] transition-[background-color,color,border-color] duration-500 ease-calm disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-eucalyptus text-paper hover:bg-charcoal",
  secondary: "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal/[0.04]",
  ghost: "px-0 text-charcoal underline-offset-[6px] hover:underline",
};

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      strokeWidth={1.5}
      className="size-4 transition-transform duration-500 ease-calm group-hover:translate-x-1"
    />
  );
}

type Common = { variant?: Variant; arrow?: boolean; className?: string };

export function Button({
  variant = "primary",
  arrow,
  className,
  children,
  ...props
}: Common & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  arrow,
  className,
  children,
  href,
  ...props
}: Common & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link href={href} className={clsx(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

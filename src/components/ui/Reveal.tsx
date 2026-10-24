"use client";

import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import { duration, ease, inViewOnce, revealVariants, staggerParent } from "@/lib/motion";

type Tag = "div" | "section" | "ul" | "ol" | "li" | "p" | "span" | "figure";

type BaseProps = {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
};

/** Fades and lifts its content into view once. */
export function Reveal({ as = "div", delay = 0, className, children, ...rest }: BaseProps & { delay?: number }) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      variants={revealVariants}
      transition={{ duration: duration.base, ease, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({
  as = "div",
  stagger,
  delay,
  amount,
  className,
  children,
  ...rest
}: BaseProps & {
  stagger?: number;
  delay?: number;
  /** Visible share needed to trigger; lower it for wide, mostly off-screen strips */
  amount?: number;
}) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={amount === undefined ? inViewOnce : { ...inViewOnce, amount }}
      variants={staggerParent(stagger, delay)}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  as = "div",
  variants = revealVariants,
  className,
  children,
  ...rest
}: BaseProps & { variants?: Variants }) {
  const Component = m[as];
  return (
    <Component className={className} variants={variants} {...rest}>
      {children}
    </Component>
  );
}

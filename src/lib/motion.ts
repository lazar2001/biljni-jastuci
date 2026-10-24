import type { Variants } from "motion/react";

/** Brand easing: cubic-bezier(0.22, 1, 0.36, 1) */
export const ease = [0.22, 1, 0.36, 1] as const;

export const duration = { base: 0.9, slow: 1.2, fast: 0.6 };

/** Scroll reveal: fade + translateY(24px). Under reduced motion only the fade remains. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease } },
};

export const staggerParent = (stagger = 0.09, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const inViewOnce = { once: true, amount: 0.2, margin: "0px 0px -8% 0px" } as const;

/** Ingredients: a plant drifting down into the pillow. Reduced motion keeps the fade only. */
export const fallVariants: Variants = {
  hidden: { opacity: 0, y: -56, rotate: -5 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 1.2, ease, delay: 0.15 } },
};

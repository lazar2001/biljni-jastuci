"use client";

import { LazyMotion, MotionConfig } from "motion/react";

// Animation features load in a separate chunk after first paint.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

/**
 * reducedMotion="user": with prefers-reduced-motion, Motion skips transform
 * animations and keeps only opacity — fades without movement.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

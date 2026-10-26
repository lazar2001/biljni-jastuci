"use client";

import { Children, useEffect, useState } from "react";
import clsx from "clsx";
import { useReducedMotion } from "motion/react";

export function HeroCarousel({
  children,
  interval = 5000,
}: {
  children: React.ReactNode;
  interval?: number;
}) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (count < 2 || paused || reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, interval, paused, reduced]);

  return (
    <div
      className="absolute inset-0"
      role="group"
      aria-roledescription="carousel"
      aria-label="Fotografije proizvoda"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={clsx(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-calm",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          {slide}
        </div>
      ))}

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Prikaži fotografiju ${i + 1}`}
              aria-current={i === index}
              className="group p-2"
            >
              <span
                className={clsx(
                  "block h-1.5 rounded-full transition-all duration-500 ease-calm",
                  i === index ? "w-6 bg-paper" : "w-1.5 bg-paper/60 group-hover:bg-paper",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
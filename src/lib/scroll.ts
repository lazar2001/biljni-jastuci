import type Lenis from "lenis";

// Shared Lenis instance so overlays (menu, cart drawer, lightbox) can pause
// smooth scrolling while open. Null when reduced motion is preferred.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

/** Locks page scroll for overlays; returns an unlock function. */
export function lockScroll(): () => void {
  const { body, documentElement } = document;
  const scrollbar = window.innerWidth - documentElement.clientWidth;
  const prevOverflow = body.style.overflow;
  const prevPadding = body.style.paddingRight;

  instance?.stop();
  body.style.overflow = "hidden";
  if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

  return () => {
    body.style.overflow = prevOverflow;
    body.style.paddingRight = prevPadding;
    instance?.start();
  };
}

/** Scrolls to an in-page anchor, through Lenis when active. */
export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return false;
  if (instance) instance.scrollTo(target, { offset: -72 });
  else target.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

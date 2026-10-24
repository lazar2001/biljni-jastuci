"use client";

import { scrollToHash } from "./scroll";

export const ORDER_FORM_ID = "porudzbina";
export const LAST_ORDER_KEY = "last-order";

/**
 * Scrolls to the order form and focuses its first field. Navigates to the
 * home page first when called from another page.
 */
export function goToOrderForm() {
  if (window.location.pathname !== "/") {
    window.location.href = `/#${ORDER_FORM_ID}`;
    return;
  }
  requestAnimationFrame(() => {
    scrollToHash(`#${ORDER_FORM_ID}`);
    window.setTimeout(() => {
      document.querySelector<HTMLInputElement>(`#${ORDER_FORM_ID} input:not([tabindex="-1"])`)?.focus({
        preventScroll: true,
      });
    }, 900);
  });
}

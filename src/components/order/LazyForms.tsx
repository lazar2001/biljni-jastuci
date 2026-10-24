"use client";

import dynamic from "next/dynamic";

// Forms pull in react-hook-form + zod; load them as separate chunks after
// hydration so they never block the first render.
export const LazyOrderForm = dynamic(() => import("./OrderForm").then((m) => m.OrderForm), {
  ssr: false,
  loading: () => <div className="min-h-[60rem]" aria-busy="true" />,
});

export const LazyContactForm = dynamic(() => import("./ContactForm").then((m) => m.ContactForm), {
  ssr: false,
  loading: () => <div className="min-h-[24rem]" aria-busy="true" />,
});

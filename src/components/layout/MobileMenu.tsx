"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { X } from "lucide-react";
import { contact, orderAnchor } from "@/content/site";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Text } from "@/components/ui/Text";
import { useFocusTrap } from "@/lib/hooks";
import { lockScroll } from "@/lib/scroll";
import { ease } from "@/lib/motion";
import { navItems } from "./nav";
import { Logo } from "./Logo";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);

  useEffect(() => {
    if (!open) return;
    return lockScroll();
  }, [open]);

  // Close if the viewport grows to desktop while open
  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => query.matches && onClose();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Meni"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease } }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-linen lg:hidden"
        >
          <div className="container-site flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Logo onClick={onClose} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Zatvori meni"
              className="tap inline-flex items-center justify-center rounded-soft"
            >
              <X aria-hidden="true" strokeWidth={1.25} className="size-7" />
            </button>
          </div>

          <nav aria-label="Mobilna navigacija" className="container-site flex flex-1 flex-col pt-8">
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <m.li
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.08 + i * 0.05 }}
                  className="border-b border-line"
                >
                  <AnchorLink
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-16 items-center justify-between font-serif text-[2.25rem] leading-none tracking-[-0.01em]"
                  >
                    {item.label}
                    <span aria-hidden="true" className="font-sans text-xs tracking-[0.18em] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </AnchorLink>
                </m.li>
              ))}
            </ul>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
              className="mt-auto flex flex-col gap-6 pb-10 pt-12"
            >
              <AnchorLink
                href={orderAnchor}
                onClick={onClose}
                className="inline-flex min-h-14 items-center justify-center rounded-soft bg-eucalyptus text-base font-semibold text-paper"
              >
                Poruči
              </AnchorLink>
              <p className="text-sm text-muted">
                Pozovite nas: <Text>{contact.phone}</Text>
              </p>
            </m.div>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}

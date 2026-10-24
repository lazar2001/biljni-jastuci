"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { orderAnchor } from "@/content/site";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { CartButton } from "@/components/cart/CartButton";
import { InstagramLink } from "@/components/ui/InstagramLink";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { navItems } from "./nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)]">
        {/* Background layer fades in on scroll (opacity only, no layout work) */}
        <div
          aria-hidden="true"
          className={clsx(
            "absolute inset-0 border-b border-line bg-linen/90 backdrop-blur-md transition-opacity duration-700 ease-calm",
            scrolled || menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="container-site relative flex h-full items-center justify-between gap-6">
          <Logo onClick={() => setMenuOpen(false)} />

          <nav aria-label="Glavna navigacija" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <AnchorLink
                    href={item.href}
                    className="relative inline-flex min-h-11 items-center text-[0.9375rem] text-charcoal/80 transition-colors duration-500 ease-calm after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-charcoal after:transition-transform after:duration-500 after:ease-calm hover:text-charcoal hover:after:scale-x-100"
                  >
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <InstagramLink />
            <CartButton />
            <AnchorLink
              href={orderAnchor}
              className="hidden min-h-11 items-center rounded-soft bg-eucalyptus px-5 text-[0.9375rem] font-semibold text-paper transition-colors duration-500 ease-calm hover:bg-charcoal sm:inline-flex"
            >
              Poruči
            </AnchorLink>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
              className="tap relative inline-flex items-center justify-center rounded-soft lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={clsx(
                    "absolute left-0 top-0 h-px w-full bg-charcoal transition-transform duration-500 ease-calm",
                    menuOpen && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={clsx(
                    "absolute bottom-0 left-0 h-px w-full bg-charcoal transition-transform duration-500 ease-calm",
                    menuOpen && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

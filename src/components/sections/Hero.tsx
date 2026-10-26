import { ArrowRight } from "lucide-react";
import { hero, orderAnchor } from "@/content/site";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Photo } from "@/components/ui/Photo";
import { Text } from "@/components/ui/Text";
import { HeroParallax, Magnetic } from "./HeroMotion";
import { HeroCarousel } from "../ui/HeroCarousel";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-cta-hide
      className="relative bg-linen"
    >
      <div className="grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,11fr)_minmax(0,13fr)]">
        {/* Image: on top on mobile, right and bleeding off the edge on desktop */}
        <HeroParallax className="relative aspect-square max-h-[64svh] w-full overflow-hidden sm:aspect-[3/2] lg:order-2 lg:mb-12 lg:mt-[calc(var(--header-h)+1.5rem)] lg:aspect-auto lg:max-h-none lg:rounded-l-card">
          {/* <Photo
            src={hero.image.src}
            alt={hero.image.alt}
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            tone="#CBC5BA"
          /> */}
          <HeroCarousel>
            {hero.images.map((img, i) => (
              <Photo
                key={img.src}
                src={img.src}
                alt={img.alt}
                sizes="(min-width: 1024px) 55vw, 100vw"
                priority={i === 0}
                tone="#CBC5BA"
              />
            ))}
          </HeroCarousel>
        </HeroParallax>

        <div className="flex flex-col justify-center px-[var(--gutter)] pb-14 pt-10 lg:order-1 lg:pb-24 lg:pl-site lg:pr-14 lg:pt-[calc(var(--header-h)+2rem)]">
          <h1 id="hero-title" className="text-display">
            {/* CSS-driven mask reveal: runs on first paint, no JS needed (keeps LCP fast) */}
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span
                  className="hero-line block"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Text>{line}</Text>
                </span>
              </span>
            ))}
          </h1>

          <div
            className="hero-rise"
            style={{ "--d": "0.35s" } as React.CSSProperties}
          >
            <p className="measure mt-7 max-w-[34rem] text-lead text-muted">
              {hero.subheadline}
            </p>
          </div>

          <div
            className="hero-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ "--d": "0.45s" } as React.CSSProperties}
          >
            <Magnetic>
              <AnchorLink
                href={orderAnchor}
                className="group inline-flex min-h-14 items-center gap-3 rounded-soft bg-eucalyptus px-8 text-base font-semibold text-paper transition-colors duration-500 ease-calm hover:bg-charcoal"
              >
                {hero.primaryCta}
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-4 transition-transform duration-500 ease-calm group-hover:translate-x-1"
                />
              </AnchorLink>
            </Magnetic>
            <AnchorLink
              href="/#mirisi"
              className="inline-flex min-h-11 items-center border-b border-charcoal/30 text-base transition-colors duration-500 ease-calm hover:border-charcoal"
            >
              {hero.secondaryCta}
            </AnchorLink>
          </div>

          <div
            className="hero-rise"
            style={{ "--d": "0.55s" } as React.CSSProperties}
          >
            <ul className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 text-sm text-muted">
              {hero.trust.map((item, i) => (
                <li key={item} className="flex items-center gap-5">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="size-1 rounded-full bg-accent"
                    />
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

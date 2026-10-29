"use client";

import clsx from "clsx";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ease } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import { getScent, scents, type ScentId } from "@/content/scents";
import { customScent, orderAnchor, scentsSection } from "@/content/site";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import { useSelection } from "@/store/selection";

import Image from "next/image";

export function Scents() {
  const scentId = useSelection((s) => s.scentId);
  const setScent = useSelection((s) => s.setScent);
  const customText = useSelection((s) => s.customScent);
  const setCustomText = useSelection((s) => s.setCustomScent);
  const active = getScent(scentId);

  return (
    <section
      id="mirisi"
      aria-labelledby="scents-title"
      className="relative isolate overflow-hidden bg-linen section-y lg:flex lg:min-h-[100svh] lg:items-center"
    >
      {/* One tint layer per scent, crossfaded with opacity */}
      {scents.map((s) => (
        <div
          key={s.id}
          aria-hidden="true"
          className={clsx(
            "absolute inset-0 -z-10 transition-opacity duration-[1200ms] ease-calm",
            s.id === scentId ? "opacity-100" : "opacity-0",
          )}
          style={{ backgroundColor: s.tint }}
        />
      ))}

      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-6">
          <Eyebrow>{scentsSection.eyebrow}</Eyebrow>
          <h2 id="scents-title" className="mt-5 text-h2">
            <Text>{scentsSection.title}</Text>
          </h2>

          <fieldset className="mt-12">
            <legend className="sr-only">Izaberite mirisnu notu</legend>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
              {scents.map((s) => (
                <label
                  key={s.id}
                  className={clsx(
                    "relative flex min-h-16 cursor-pointer items-center gap-2 rounded-card border px-3 py-3 sm:gap-3 transition-[border-color,background-color] duration-700 ease-calm sm:px-4",
                    "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-eucalyptus",
                    s.id === scentId
                      ? "border-charcoal/70 bg-paper/80"
                      : "border-charcoal/15 hover:border-charcoal/40 hover:bg-paper/40",
                  )}
                >
                  <input
                    type="radio"
                    name="scent"
                    value={s.id}
                    checked={s.id === scentId}
                    onChange={() => setScent(s.id as ScentId)}
                    className="sr-only"
                  />
                  {s.custom ? (
                    <span
                      aria-hidden="true"
                      className="flex size-5 shrink-0 items-center justify-center rounded-full border border-dashed border-charcoal/50 text-sm leading-none min-[400px]:size-7 sm:size-8"
                    >
                      +
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="size-5 shrink-0 rounded-full border border-charcoal/10 min-[400px]:size-7 sm:size-8"
                      style={{ backgroundColor: s.accent }}
                    />
                  )}
                  <span className="min-w-0">
                    <span className="block font-serif text-[0.9688rem] leading-tight min-[400px]:text-[1.125rem] sm:text-[1.25rem]">
                      {s.name}
                    </span>
                    <span className="block text-[0.8125rem] leading-snug text-muted">
                      {s.short}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {active.custom && (
            <div className="mt-6">
              <label htmlFor="scent-custom" className="text-sm font-semibold">
                {customScent.label}
              </label>
              <input
                id="scent-custom"
                type="text"
                value={customText}
                maxLength={customScent.maxLength}
                placeholder={customScent.placeholder}
                onChange={(e) => setCustomText(e.target.value)}
                className="mt-2 h-13 min-h-[52px] w-full rounded-soft border border-charcoal/25 bg-paper px-4 text-base outline-none transition-colors duration-300 placeholder:text-charcoal/40 focus:border-charcoal focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-eucalyptus"
              />
              <p className="mt-2 text-sm text-muted">
                {scentsSection.customHint}
              </p>
            </div>
          )}

          <div
            aria-live="polite"
            className="mt-10 min-h-[6.5rem] border-t border-charcoal/15 pt-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={active.id}
                className="measure text-lead"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease }}
              >
                {active.description}
              </m.p>
            </AnimatePresence>
          </div>

          <AnchorLink
            href={orderAnchor}
            className="group mt-4 inline-flex min-h-11 items-center gap-2 border-b border-charcoal/30 text-base transition-colors duration-500 ease-calm hover:border-charcoal"
          >
            {active.custom
              ? "Poruči svoju notu"
              : `Poruči notu ${active.name.toLowerCase()}`}
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4 transition-transform duration-500 ease-calm group-hover:translate-x-1"
            />
          </AnchorLink>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] lg:col-span-5 lg:col-start-8 lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-charcoal/10 bg-paper/50 shadow-[0_24px_60px_-28px_rgba(60,45,30,0.35)]">
            {scents.map((s) => (
              <div
                key={s.id}
                aria-hidden="true"
                className={clsx(
                  "absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-calm",
                  s.id === scentId
                    ? "scale-100 opacity-100"
                    : "scale-[1.04] opacity-0",
                )}
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 22rem"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <p
            aria-hidden="true"
            className="mt-4 text-right font-['Georgia',serif] text-[clamp(3rem,2rem+5vw,7rem)] italic leading-none text-charcoal/[0.15]"
          >
            {active.custom ? "Vaša nota" : active.name}
          </p>
        </div>
      </div>
    </section>
  );
}

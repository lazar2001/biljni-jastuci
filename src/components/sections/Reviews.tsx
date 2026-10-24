import { getScent, reviews, reviewsSection } from "@/content/site";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Only reviews marked isReal are shown in production. In development the
 * placeholders are visible (and clearly labeled) to preview the layout.
 * No average rating or review count is shown until real reviews exist.
 */
export function Reviews() {
  const visible = reviews.filter((r) => r.isReal || isDev);
  if (visible.length === 0) return null;

  return (
    <section id="recenzije" aria-labelledby="reviews-title" className="section-y overflow-hidden bg-[color-mix(in_srgb,var(--sage)_14%,var(--linen))]">
      <div className="container-site">
        <SectionHeading id="reviews-title" eyebrow={reviewsSection.eyebrow} title={reviewsSection.title} />
      </div>

      <Stagger as="ul" className="rail mt-12 gap-4 lg:mt-16 lg:gap-6">
        {visible.map((review, i) => (
          <StaggerItem
            as="li"
            key={i}
            className="flex w-[82vw] shrink-0 snap-start flex-col justify-between rounded-card border border-line bg-paper/70 p-7 sm:w-[26rem] md:p-9"
          >
            {!review.isReal && (
              <p className="mb-4 self-start rounded-[4px] bg-[#F1DDAF] px-2 py-1 text-xs">
                PLACEHOLDER — vidljivo samo u razvoju
              </p>
            )}
            <blockquote className="font-serif text-[1.375rem] leading-snug">“{review.text}”</blockquote>
            <footer className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5 text-sm">
              <span>
                <span className="font-semibold">{review.name}</span>
                <span className="text-muted"> · {review.city}</span>
              </span>
              <span className="flex items-center gap-2 text-muted">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: getScent(review.scentId).accent }}
                />
                {getScent(review.scentId).name}
              </span>
            </footer>
          </StaggerItem>
        ))}
        <li aria-hidden="true" className="w-px shrink-0" />
      </Stagger>
    </section>
  );
}

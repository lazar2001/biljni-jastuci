import { hero } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrderConfigurator } from "@/components/order/OrderConfigurator";
import { LazyOrderForm } from "@/components/order/LazyForms";
import { SelectionBadge } from "@/components/order/SelectionBadge";

/** "Poruči" section: sticky product image left; configurator and order form right. */
export function OrderSection() {
  return (
    <section id="poruci" aria-labelledby="order-title" data-cta-hide className="section-y bg-paper">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card sm:aspect-[4/5] lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Photo
              src={hero.image.src}
              alt={hero.image.alt}
              sizes="(min-width: 1024px) 45vw, 100vw"
              tone="#C9C3B8"
            />
            <SelectionBadge />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading id="order-title" eyebrow="Porudžbina" title="Sastavite *svoj* jastuk." />
          <OrderConfigurator />
          <div id="porudzbina" data-cta-hide className="mt-16 scroll-mt-[calc(var(--header-h)+1rem)]">
            <LazyOrderForm />
          </div>
        </div>
      </div>
    </section>
  );
}

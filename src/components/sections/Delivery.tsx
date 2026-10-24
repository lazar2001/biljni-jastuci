import { Banknote, Clock, Truck } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { fill, payment, shipping } from "@/content/site";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import { formatRSD } from "@/lib/format";

export function Delivery() {
  const shippingPrice = shipping.price !== null ? formatRSD(shipping.price) : fill("cena dostave u RSD");
  const freeAbove =
    shipping.freeAbove !== null ? `Besplatna dostava za porudžbine iznad ${formatRSD(shipping.freeAbove)}.` : fill("prag za besplatnu dostavu");

  const columns = [
    {
      icon: Banknote,
      title: "Plaćanje",
      lines: [...payment.methods, payment.extra],
    },
    {
      icon: Truck,
      title: "Cena dostave",
      lines: [shippingPrice, freeAbove],
    },
    {
      icon: Clock,
      title: "Rok isporuke",
      lines: [shipping.deliveryTime, `Kurirska služba: ${shipping.courier}`],
    },
  ];

  return (
    <section id="dostava" aria-labelledby="delivery-title" className="bg-linen py-20 md:py-28">
      <div className="container-site">
        <Eyebrow>Plaćanje i dostava</Eyebrow>
        <h2 id="delivery-title" className="sr-only">
          Plaćanje i dostava
        </h2>
        <Stagger className="mt-10 grid border-t border-line md:grid-cols-3">
          {columns.map(({ icon: Icon, title, lines }, i) => (
            <StaggerItem
              key={title}
              className={
                i > 0
                  ? "border-t border-line py-8 md:border-l md:border-t-0 md:py-10 md:pl-10"
                  : "py-8 md:py-10 md:pr-10"
              }
            >
              <Icon aria-hidden="true" strokeWidth={1.25} className="size-6 text-eucalyptus" />
              <h3 className="mt-5 text-h3">{title}</h3>
              <ul className="mt-3 space-y-1.5 text-muted">
                {lines.map((line) => (
                  <li key={line}>
                    <Text>{line}</Text>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

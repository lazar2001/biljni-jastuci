import Image from "next/image";
import { benefits } from "@/content/site";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import clsx from "clsx";

type BenefitItem = (typeof benefits.items)[number];

function BenefitList({
  items,
  className,
}: {
  items: BenefitItem[];
  className?: string;
}) {
  return (
    <Stagger
      as="ol"
      stagger={0.15}
      className={clsx("border-t border-line", className)}
    >
      {items.map((item) => (
        <StaggerItem
          as="li"
          key={item.text}
          className="grid grid-cols-[3rem_1fr] items-center gap-x-5 border-b border-line py-5 md:py-6"
        >
          <Image
            src={item.icon}
            alt=""
            aria-hidden="true"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <p className="max-w-[40ch] text-muted">{item.text}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function Benefits() {
  const split = Math.ceil(benefits.items.length / 2);
  const left = benefits.items.slice(0, split);
  const right = benefits.items.slice(split);

  return (
    <section aria-labelledby="benefits-title" className="section-y bg-linen">
      <div className="container-site">
        <Reveal>
          <Eyebrow>{benefits.eyebrow}</Eyebrow>
          <h2 id="benefits-title" className="mt-6 text-h2">
            <Text>{benefits.quote}</Text>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-16 lg:grid-cols-2">
          <BenefitList items={left} />
          <BenefitList items={right} className="max-lg:border-t-0" />
        </div>
      </div>
    </section>
  );
}
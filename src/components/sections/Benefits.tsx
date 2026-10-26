import { benefits } from "@/content/site";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";

export function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="section-y bg-linen">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <Eyebrow>{benefits.eyebrow}</Eyebrow>
            <h2 id="benefits-title" className="mt-6 text-h2">
              <Text>{benefits.quote}</Text>
            </h2>
          </Reveal>
        </div>

        <Stagger as="ol" stagger={0.15} className="border-t border-line lg:col-span-5 lg:col-start-8">
          {benefits.items.map((item, i) => (
            <StaggerItem as="li" key={item.title} className="grid grid-cols-[3.5rem_1fr] border-b border-line py-9 md:py-12">
              <span aria-hidden="true" className="pt-1.5 text-sm font-semibold tracking-[0.12em] text-muted">
                {/* {String(i + 1).padStart(2, "0")} */}
              </span>
              <div>
                <h3 className="text-h3">{item.title}</h3>
                <p className="mt-3 max-w-[40ch] text-muted">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

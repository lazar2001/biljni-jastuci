import { ingredients } from "@/content/site";
import { HerbSpecimen } from "@/components/illustrations";
import { Photo } from "@/components/ui/Photo";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import { fallVariants } from "@/lib/motion";

export function Ingredients() {
  return (
    <section id="sastav" aria-labelledby="ingredients-title" className="section-y overflow-hidden bg-paper">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="ingredients-title"
            eyebrow={ingredients.eyebrow}
            title={ingredients.title}
            className="lg:col-span-7"
          />
          <p className="measure text-lead text-muted lg:col-span-4 lg:col-start-9">{ingredients.intro}</p>
        </div>
      </div>

      {/* Herbarium sheets in a horizontal strip — swipe or use the arrows */}
      <div className="mt-12 lg:mt-16">
        <ScrollRail label="Biljke u jastuku">
          <Stagger as="ul" stagger={0.12} amount={0.01} className="flex gap-5 lg:gap-6">
            {ingredients.items.map((item, i) => (
              <StaggerItem as="li" key={i} className="w-[72vw] shrink-0 snap-start sm:w-[19rem]">
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line bg-linen">
                    {item.image ? (
                      <Photo src={item.image} alt={item.name} sizes="(min-width: 640px) 19rem, 72vw" />
                    ) : (
                      // Each plant drops softly into its sheet, one after another
                      <StaggerItem variants={fallVariants} className="absolute inset-0 flex items-center justify-center">
                        <HerbSpecimen variant={i} className="h-[70%] text-eucalyptus/70" />
                      </StaggerItem>
                    )}
                    <span className="absolute left-4 top-4 font-sans text-xs tracking-[0.16em] text-muted">
                      No. {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <figcaption className="mt-5 border-t border-line pt-5">
                    <h3 className="text-h3">
                      <Text>{item.name}</Text>
                    </h3>
                    <p className="mt-1 font-serif italic text-muted">
                      <Text>{item.latin}</Text>
                    </p>
                    <p className="mt-3">
                      <Text>{item.note}</Text>
                    </p>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
          <span aria-hidden="true" className="w-px shrink-0" />
        </ScrollRail>
      </div>

      <div className="container-site">
        <p className="mt-16 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:gap-6">
          <span className="eyebrow pt-1">Jastučnica</span>
          <span>
            <Text>{ingredients.fabricNote}</Text>
          </span>
        </p>
      </div>
    </section>
  );
}

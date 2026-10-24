import { about } from "@/content/site";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="proizvod" aria-labelledby="about-title" className="section-y bg-paper">
      <div className="container-site">
        {/* Intro: asymmetric title + text */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <SectionHeading
            id="about-title"
            eyebrow={about.eyebrow}
            title={about.title}
            className="lg:col-span-6"
          />
          <Reveal delay={0.15} className="space-y-6 text-lead lg:col-span-5 lg:col-start-8 lg:pt-14">
            <p className="measure">{about.what}</p>
            <p className="measure text-muted">{about.purpose}</p>
          </Reveal>
        </div>

        {/* Where it is used */}
        <div className="mt-20 grid gap-6 border-t border-line pt-10 lg:mt-28 lg:grid-cols-12 lg:items-baseline">
          <h3 className="eyebrow lg:col-span-3">{about.usesTitle}</h3>
          <Stagger as="ul" stagger={0.07} className="flex flex-wrap items-baseline gap-x-4 gap-y-2 font-serif text-[clamp(1.5rem,1.2rem+1.4vw,2.5rem)] leading-tight lg:col-span-9">
            {about.uses.map((use, i) => (
              <StaggerItem as="li" key={use} className="flex items-baseline gap-4">
                {i > 0 && (
                  <span aria-hidden="true" className="text-[0.6em] text-stone">
                    /
                  </span>
                )}
                <span className={i % 2 === 1 ? "italic" : undefined}>{use}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

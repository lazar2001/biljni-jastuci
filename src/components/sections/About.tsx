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
      </div>
    </section>
  );
}

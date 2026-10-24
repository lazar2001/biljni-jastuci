import { faq, faqSection } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  return (
    <section id="pitanja" aria-labelledby="faq-title" className="section-y bg-paper">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <SectionHeading
          id="faq-title"
          eyebrow={faqSection.eyebrow}
          title={faqSection.title}
          className="lg:col-span-4"
        />
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion items={faq} />
        </Reveal>
      </div>
    </section>
  );
}

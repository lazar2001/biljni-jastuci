import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { contact, isPlaceholder } from "@/content/site";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import { LazyContactForm } from "@/components/order/LazyForms";

type Channel = { label: string; value: string; href: string | null; external?: boolean };

export function Contact() {
  const phoneReady = !isPlaceholder(contact.phoneIntl);
  const channels: Channel[] = [
    { label: "Telefon", value: contact.phone, href: phoneReady ? `tel:+${contact.phoneIntl}` : null },
    {
      label: "Viber",
      value: "Pišite nam na Viber",
      href: phoneReady ? `viber://chat?number=%2B${contact.phoneIntl}` : null,
    },
    {
      label: "WhatsApp",
      value: "Pišite nam na WhatsApp",
      href: phoneReady ? `https://wa.me/${contact.phoneIntl}` : null,
      external: true,
    },
    {
      label: "Email",
      value: contact.email,
      href: isPlaceholder(contact.email) ? null : `mailto:${contact.email}`,
    },
    {
      label: "Instagram",
      value: contact.instagram.handle,
      href: isPlaceholder(contact.instagram.url) ? null : contact.instagram.url,
      external: true,
    },
  ];

  return (
    <section id="kontakt" aria-labelledby="contact-title" className="section-y bg-eucalyptus text-paper">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Eyebrow className="!text-paper">{contact.eyebrow}</Eyebrow>
          <h2 id="contact-title" className="mt-5 text-h2">
            <Text>{contact.title}</Text>
          </h2>

          <Stagger as="ul" stagger={0.07} className="mt-12 border-t border-paper/20">
            {channels.map((c) => {
              const content = (
                <>
                  <span className="w-20 shrink-0 text-sm sm:w-28 text-paper">{c.label}</span>
                  <span className="flex-1 font-serif text-[1.25rem] leading-snug">
                    <Text>{c.value}</Text>
                  </span>
                  {c.href && (
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="size-5 shrink-0 transition-transform duration-500 ease-calm group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  )}
                </>
              );
              const rowClass = "group flex min-h-16 items-center gap-4 py-3";
              return (
                <StaggerItem as="li" key={c.label} className="border-b border-paper/20">
                  {c.href ? (
                    <a
                      href={c.href}
                      className={`${rowClass} focus-visible:outline-paper`}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className={rowClass}>{content}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>

          <p className="mt-6 text-sm text-paper">
            Pozivi: <Text>{contact.hours}</Text>
          </p>
        </div>

        <div data-cta-hide className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.15} className="rounded-card border border-paper/20 p-7 md:p-9">
            <h3 className="text-h3">Pošaljite poruku</h3>
            <p className="mb-7 mt-2 text-paper">Ostavite telefon ili email i javićemo vam se.</p>
            <LazyContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

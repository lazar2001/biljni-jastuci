import Link from "next/link";
import { legalLinks, type LegalDoc } from "@/content/site";
import { Text } from "@/components/ui/Text";

/** Typographic layout shared by the legal pages: narrow column, numbered sections. */
export function LegalPage({ doc, path, children }: { doc: LegalDoc; path: string; children?: React.ReactNode }) {
  return (
    <article className="bg-paper pb-24 pt-[calc(var(--header-h)+4rem)] md:pb-32 md:pt-[calc(var(--header-h)+6rem)]">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <aside className="lg:col-span-3">
          <nav aria-label="Pravne stranice" className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <ul className="flex flex-wrap gap-x-6 gap-y-1 lg:flex-col">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={link.href === path ? "page" : undefined}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-muted transition-colors duration-500 ease-calm hover:text-charcoal aria-[current=page]:font-semibold aria-[current=page]:text-charcoal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="lg:col-span-7 lg:col-start-5">
          <h1 className="text-h2">{doc.title}</h1>
          <p className="mt-4 text-sm text-muted">
            Poslednja izmena: <Text>{doc.updated}</Text>
          </p>

          <ol className="mt-14 space-y-12">
            {doc.sections.map((section, i) => (
              <li key={section.heading} className="border-t border-line pt-8">
                <h2 className="flex items-baseline gap-4 font-serif text-h3">
                  <span aria-hidden="true" className="font-sans text-xs font-semibold tracking-[0.14em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className="measure mt-4 space-y-4">
                  {section.body.map((block, j) =>
                    typeof block === "string" ? (
                      <p key={j}>
                        <Text>{block}</Text>
                      </p>
                    ) : (
                      <ul key={j} className="list-disc space-y-2 pl-5 marker:text-stone">
                        {block.list.map((item) => (
                          <li key={item}>
                            <Text>{item}</Text>
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </li>
            ))}
          </ol>

          {children}
        </div>
      </div>
    </article>
  );
}

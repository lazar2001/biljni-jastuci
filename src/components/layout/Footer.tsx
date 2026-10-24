import Link from "next/link";
import { brand, contact, isPlaceholder, legalLinks, seller } from "@/content/site";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Text } from "@/components/ui/Text";
import { navItems } from "./nav";

const linkClass =
  "inline-flex min-h-11 items-center text-paper/75 transition-colors duration-500 ease-calm hover:text-paper";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-paper">
      <div className="container-site pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-serif text-[2rem] leading-none tracking-[-0.01em]">{brand.name}</p>
            <p className="mt-5 max-w-[34ch] text-paper/70">{brand.footerNote}</p>
          </div>

          <nav aria-label="Navigacija u podnožju" className="md:col-span-2">
            <p className="eyebrow !text-paper/60">Sajt</p>
            <ul className="mt-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <AnchorLink href={item.href} className={linkClass}>
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="eyebrow !text-paper/60">Kontakt</p>
            <ul className="mt-4">
              <li>
                {isPlaceholder(contact.phoneIntl) ? (
                  <span className={linkClass}>
                    <Text>{contact.phone}</Text>
                  </span>
                ) : (
                  <a href={`tel:+${contact.phoneIntl}`} className={linkClass}>
                    {contact.phone}
                  </a>
                )}
              </li>
              <li>
                {isPlaceholder(contact.email) ? (
                  <span className={linkClass}>
                    <Text>{contact.email}</Text>
                  </span>
                ) : (
                  <a href={`mailto:${contact.email}`} className={linkClass}>
                    {contact.email}
                  </a>
                )}
              </li>
              <li>
                {isPlaceholder(contact.instagram.url) ? (
                  <span className={linkClass}>
                    <Text>{contact.instagram.handle}</Text>
                  </span>
                ) : (
                  <a href={contact.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Instagram
                  </a>
                )}
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow !text-paper/60">Kupovina</p>
            <ul className="mt-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Seller details — required by the Serbian e-commerce law (Zakon o elektronskoj trgovini) */}
        <div className="mt-16 border-t border-paper/15 pt-8 text-sm text-paper/60">
          <p className="eyebrow !text-paper/60">Podaci o prodavcu</p>
          <dl className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Prodavac", seller.name],
              ["Adresa", seller.address],
              ["PIB", seller.pib],
              ["Matični broj", seller.mb],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="inline">{label}: </dt>
                <dd className="inline text-paper/80">
                  <Text>{value}</Text>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-10 text-sm text-paper/60">
          © {year} {brand.name}
        </p>
      </div>
    </footer>
  );
}

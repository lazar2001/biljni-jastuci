import { brand, contact, hero, isPlaceholder, scents, seller, sizes } from "@/content/site";
import { imageExists } from "@/lib/images";

/**
 * JSON-LD for Product (one offer per priced size) and Organization.
 * Uses only real config prices — never demo prices — and no aggregateRating
 * until real reviews exist. Sizes without a price are left out.
 */
export function StructuredData() {
  const url = brand.siteUrl;
  const image = imageExists(hero.image.src) ? `${url}${hero.image.src}` : `${url}/opengraph-image`;
  const offers = sizes
    .filter((s) => !s.custom && s.price !== null)
    .map((s) => ({
      "@type": "Offer",
      name: isPlaceholder(s.dimensionsCm) ? s.name : `${s.name}, ${s.dimensionsCm} cm`,
      price: s.price,
      priceCurrency: "RSD",
      availability: "https://schema.org/InStock",
      url: `${url}/#poruci`,
      seller: { "@type": "Organization", name: brand.name },
    }));

  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url,
    logo: `${url}/icon.svg`,
  };
  if (!isPlaceholder(seller.name)) organization.legalName = seller.name;
  if (!isPlaceholder(contact.email)) organization.email = contact.email;
  if (!isPlaceholder(contact.phoneIntl)) organization.telephone = `+${contact.phoneIntl}`;
  if (!isPlaceholder(contact.instagram.url)) organization.sameAs = [contact.instagram.url];

  const data: Record<string, unknown>[] = [organization];
  if (offers.length > 0) {
    data.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${brand.name} biljni jastuk`,
      description: brand.tagline,
      image: [image],
      brand: { "@type": "Brand", name: brand.name },
      additionalProperty: scents.filter((s) => !s.custom).map((s) => ({ "@type": "PropertyValue", name: "Miris", value: s.name })),
      offers,
    });
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped to avoid closing the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

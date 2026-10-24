// NOTE: The text on this page is a TEMPLATE (see `legal.returns` and `withdrawalForm`
// in src/content/site.ts). Have it reviewed by a lawyer or accountant before launch.
import type { Metadata } from "next";
import { legal, withdrawalForm } from "@/content/site";
import { LegalPage } from "@/components/layout/LegalPage";
import { Text } from "@/components/ui/Text";

const path = "/reklamacije-i-povracaj";

export const metadata: Metadata = {
  title: legal.returns.title,
  description: legal.returns.description,
  alternates: { canonical: path },
};

export default function ReturnsPage() {
  return (
    <LegalPage doc={legal.returns} path={path}>
      <section
        id="obrazac"
        aria-labelledby="form-title"
        className="mt-16 rounded-card border border-line bg-linen/60 p-6 md:p-10"
      >
        <h2 id="form-title" className="font-serif text-h3">
          {withdrawalForm.title}
        </h2>
        <p className="mt-5 text-sm">
          <Text>{withdrawalForm.addressee}</Text>
        </p>
        <p className="mt-5">{withdrawalForm.statement}</p>
        <div aria-hidden="true" className="mt-4 h-16 border-b border-dashed border-charcoal/30" />
        <dl className="mt-8 space-y-6">
          {withdrawalForm.fields.map((field) => (
            <div key={field}>
              <dt className="text-sm text-muted">{field}</dt>
              <dd aria-hidden="true" className="mt-6 border-b border-dashed border-charcoal/30" />
            </div>
          ))}
        </dl>
        <p className="mt-8 text-sm text-muted">
          Obrazac možete odštampati i poslati poštom, ili isti sadržaj poslati emailom.
        </p>
      </section>
    </LegalPage>
  );
}

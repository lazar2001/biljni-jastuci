// NOTE: The text on this page is a TEMPLATE (see `legal.terms` in src/content/site.ts).
// Have it reviewed by a lawyer or accountant before launch.
import type { Metadata } from "next";
import { legal } from "@/content/site";
import { LegalPage } from "@/components/layout/LegalPage";

const path = "/uslovi-kupovine";

export const metadata: Metadata = {
  title: legal.terms.title,
  description: legal.terms.description,
  alternates: { canonical: path },
};

export default function TermsPage() {
  return <LegalPage doc={legal.terms} path={path} />;
}

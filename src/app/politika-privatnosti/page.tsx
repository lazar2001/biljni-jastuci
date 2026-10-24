// NOTE: The text on this page is a TEMPLATE (see `legal.privacy` in src/content/site.ts).
// Have it reviewed by a lawyer before launch, especially retention periods and processors.
import type { Metadata } from "next";
import { legal } from "@/content/site";
import { LegalPage } from "@/components/layout/LegalPage";

const path = "/politika-privatnosti";

export const metadata: Metadata = {
  title: legal.privacy.title,
  description: legal.privacy.description,
  alternates: { canonical: path },
};

export default function PrivacyPage() {
  return <LegalPage doc={legal.privacy} path={path} />;
}

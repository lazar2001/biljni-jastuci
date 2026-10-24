import type { Metadata } from "next";
import { ThankYou } from "@/components/order/ThankYou";

export const metadata: Metadata = {
  title: "Hvala na porudžbini",
  description: "Vaša porudžbina je primljena. Pozvaćemo vas radi potvrde.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="bg-linen pb-24 pt-[calc(var(--header-h)+4rem)] md:pb-32 md:pt-[calc(var(--header-h)+6rem)]">
      <div className="container-site max-w-3xl">
        <ThankYou />
      </div>
    </section>
  );
}

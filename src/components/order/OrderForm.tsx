"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { contact, isPlaceholder } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot } from "@/components/ui/Field";
import { Text } from "@/components/ui/Text";
import { LAST_ORDER_KEY } from "@/lib/checkout";
import { useHydrated } from "@/lib/hooks";
import type { LineItem } from "@/lib/items";
import { calculateTotals, isKnownLine } from "@/lib/pricing";
import { customerSchema, type CustomerInput } from "@/lib/validation";
import { useCart } from "@/store/cart";
import { OrderReview } from "./OrderReview";

/** Cart item without its client-side merge key, as sent to the API. */
const toLine = ({ scentId, sizeId, quantity, customScent, width, height }: LineItem): LineItem => ({
  scentId,
  sizeId,
  quantity,
  customScent,
  width,
  height,
});

export type LastOrder = {
  orderId: string;
  firstName: string;
  items: LineItem[];
};

const defaults: CustomerInput = {
  firstName: "",
  lastName: "",
  phone: "",
  street: "",
  city: "",
  postalCode: "",
  email: "",
  note: "",
  consent: false,
  website: "",
};

export function OrderForm() {
  const router = useRouter();
  const hydrated = useHydrated();
  const rawItems = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const items = useMemo(() => (hydrated ? rawItems.filter(isKnownLine) : []), [hydrated, rawItems]);
  const totals = useMemo(() => calculateTotals(items), [items]);
  const [serverError, setServerError] = useState<string | null>(null);
  const inFlight = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: defaults,
  });

  const empty = items.length === 0;

  const onSubmit = async (customer: CustomerInput) => {
    if (inFlight.current || empty) return;
    inFlight.current = true;
    setServerError(null);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: items.map(toLine),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; orderId?: string; message?: string };
      if (!res.ok || !data.ok || !data.orderId) {
        throw new Error(data.message || "Porudžbinu trenutno ne možemo da primimo.");
      }
      const last: LastOrder = {
        orderId: data.orderId,
        firstName: customer.firstName,
        items: items.map(toLine),
      };
      try {
        sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(last));
      } catch {
        // Storage unavailable — the thank-you page still shows a generic message
      }
      clear();
      router.push(`/hvala?broj=${encodeURIComponent(data.orderId)}`);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Porudžbinu trenutno ne možemo da primimo.");
      inFlight.current = false;
    }
  };

  const busy = isSubmitting || inFlight.current;
  const phoneReady = !isPlaceholder(contact.phoneIntl);

  return (
    <div className="border-t border-line pt-12">
      <h3 className="text-h3">Podaci za dostavu</h3>
      <p className="mt-2 text-muted">Plaćate pouzećem. Pozvaćemo vas radi potvrde pre slanja.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative mt-8">
        <Honeypot {...register("website")} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Ime"
            autoComplete="given-name"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <Field
            label="Prezime"
            autoComplete="family-name"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
          <Field
            label="Telefon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06x xxx xxxx"
            error={errors.phone?.message}
            className="sm:col-span-2"
            {...register("phone")}
          />
          <Field
            label="Ulica i broj"
            autoComplete="street-address"
            error={errors.street?.message}
            className="sm:col-span-2"
            {...register("street")}
          />
          <Field
            label="Grad"
            autoComplete="address-level2"
            error={errors.city?.message}
            {...register("city")}
          />
          <Field
            label="Poštanski broj"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            error={errors.postalCode?.message}
            {...register("postalCode")}
          />
          <Field
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            optional
            hint="Na email šaljemo potvrdu porudžbine."
            error={errors.email?.message}
            className="sm:col-span-2"
            {...register("email")}
          />
          <Field
            label="Napomena za dostavu"
            multiline
            optional
            rows={3}
            error={errors.note?.message}
            className="sm:col-span-2"
            {...register("note")}
          />
        </div>

        <div className="mt-6">
          <label className="flex cursor-pointer items-start gap-3 py-1">
            <input
              type="checkbox"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-eucalyptus"
              {...register("consent")}
            />
            <span className="text-[0.9375rem]">
              Saglasan/na sam sa{" "}
              <Link href="/uslovi-kupovine" target="_blank" className="underline underline-offset-4">
                Uslovima kupovine
              </Link>{" "}
              i{" "}
              <Link href="/politika-privatnosti" target="_blank" className="underline underline-offset-4">
                Politikom privatnosti
              </Link>
              . <span className="text-muted">*</span>
            </span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="mt-1.5 text-sm text-[#A4472F]">
              {errors.consent.message}
            </p>
          )}
        </div>

        <div className="mt-10">
          <p className="mb-3 text-sm font-semibold">Pregled porudžbine</p>
          {empty ? (
            <p className="rounded-card border border-dashed border-charcoal/25 p-5 text-muted">
              Korpa je prazna. Izaberite miris i dimenziju iznad, pa dodajte jastuk u korpu.
            </p>
          ) : (
            <OrderReview items={items} totals={totals} />
          )}
        </div>

        {serverError && (
          <div role="alert" className="mt-6 flex gap-3 rounded-card border border-[#A4472F]/40 bg-[#A4472F]/[0.06] p-5">
            <AlertCircle aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-[#A4472F]" />
            <div className="text-[0.9375rem]">
              <p className="font-semibold">{serverError}</p>
              <p className="mt-1 text-muted">
                Pokušajte ponovo za minut ili poručite direktno:{" "}
                {phoneReady ? (
                  <>
                    <a href={`tel:+${contact.phoneIntl}`} className="underline underline-offset-4">
                      pozovite {contact.phone}
                    </a>{" "}
                    ili{" "}
                    <a href={`viber://chat?number=%2B${contact.phoneIntl}`} className="underline underline-offset-4">
                      pišite na Viber
                    </a>
                    .
                  </>
                ) : (
                  <Text>{contact.phone}</Text>
                )}
              </p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          disabled={busy || empty || totals.hasUnpriced}
          aria-busy={busy}
          className="mt-8 w-full min-h-14 text-base"
        >
          {busy ? (
            <>
              <Loader2 aria-hidden="true" strokeWidth={1.5} className="size-5 animate-spin" />
              Šaljemo porudžbinu…
            </>
          ) : (
            "Potvrdi porudžbinu"
          )}
        </Button>
        <p className="mt-3 text-center text-sm text-muted">Polja označena sa * su obavezna.</p>
      </form>
    </div>
  );
}

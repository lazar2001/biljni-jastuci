"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { Field, Honeypot } from "@/components/ui/Field";
import { contactSchema, type ContactInput } from "@/lib/validation";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const inFlight = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", reach: "", message: "", website: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) throw new Error(data.message || "Poruku trenutno ne možemo da pošaljemo.");
      reset();
      setStatus("sent");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Poruku trenutno ne možemo da pošaljemo.");
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="py-6">
        <Check aria-hidden="true" strokeWidth={1.5} className="size-8" />
        <p className="mt-4 font-serif text-h3">Poruka je poslata.</p>
        <p className="mt-2 text-paper">Javljamo vam se u najkraćem roku.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 min-h-11 underline underline-offset-4"
        >
          Pošaljite novu poruku
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      <Honeypot {...register("website")} />
      <Field
        tone="dark"
        id="c-name"
        label="Ime"
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />
      <Field
        tone="dark"
        id="c-reach"
        label="Telefon ili email"
        autoComplete="email"
        error={errors.reach?.message}
        {...register("reach")}
      />
      <Field
        tone="dark"
        id="c-message"
        label="Poruka"
        multiline
        rows={4}
        error={errors.message?.message}
        {...register("message")}
      />
      {status === "error" && message && (
        <p role="alert" className="text-sm text-[#FBE8E0]">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="inline-flex min-h-13 min-h-[52px] w-full items-center justify-center gap-2 rounded-soft bg-paper px-6 font-semibold text-charcoal transition-colors duration-500 ease-calm hover:bg-linen disabled:opacity-60 focus-visible:outline-paper"
      >
        {isSubmitting && <Loader2 aria-hidden="true" strokeWidth={1.5} className="size-5 animate-spin" />}
        {isSubmitting ? "Šaljemo…" : "Pošalji poruku"}
      </button>
    </form>
  );
}

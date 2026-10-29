import { z } from "zod";
import { customScent, customSize, quantity,  sizes, type SizeId } from "@/content/site";
import {  scents,  type ScentId } from "@/content/scents";

import { normalizePhone } from "./format";

const required = (label: string) => z.string().trim().min(1, `Unesite ${label}.`);

const scentIds = scents.map((s) => s.id) as [ScentId, ...ScentId[]];
const sizeIds = sizes.map((s) => s.id) as [SizeId, ...SizeId[]];

export const phoneField = z
  .string()
  .trim()
  .min(1, "Unesite broj telefona.")
  .refine((v) => normalizePhone(v) !== null, "Unesite ispravan broj, npr. 064 123 4567 ili +381 64 123 4567.");

const optionalEmail = z
  .string()
  .trim()
  .max(120)
  .refine((v) => v === "" || z.email().safeParse(v).success, "Email adresa nije ispravna.");

/** Fields filled in by the customer (shared by the form and the API). */
export const customerSchema = z.object({
  firstName: required("ime").max(60, "Ime je predugačko."),
  lastName: required("prezime").max(60, "Prezime je predugačko."),
  phone: phoneField,
  street: required("ulicu i broj").max(120, "Adresa je predugačka."),
  city: required("grad").max(60, "Naziv grada je predugačak."),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Poštanski broj ima 5 cifara, npr. 11000."),
  email: optionalEmail,
  note: z.string().trim().max(500, "Napomena može imati najviše 500 karaktera."),
  consent: z.boolean().refine((v) => v, "Potrebna je vaša saglasnost da bismo obradili porudžbinu."),
  /** Honeypot — must stay empty */
  website: z.string().max(200).optional(),
});

export type CustomerInput = z.infer<typeof customerSchema>;

const cm = z.number().int().min(customSize.min).max(customSize.max);

export const orderLineSchema = z
  .object({
    scentId: z.enum(scentIds),
    sizeId: z.enum(sizeIds),
    quantity: z.number().int().min(quantity.min).max(quantity.max),
    customScent: z.string().trim().max(customScent.maxLength).optional(),
    width: cm.optional(),
    height: cm.optional(),
  })
  .superRefine((line, ctx) => {
    const scent = scents.find((s) => s.id === line.scentId);
    const size = sizes.find((s) => s.id === line.sizeId);
    if (scent?.custom && (line.customScent ?? "").length < customScent.minLength) {
      ctx.addIssue({ code: "custom", path: ["customScent"], message: "Upišite željenu mirisnu notu." });
    }
    if (size?.custom && (line.width === undefined || line.height === undefined)) {
      ctx.addIssue({ code: "custom", path: ["width"], message: "Unesite dimenzije jastuka po meri." });
    }
  })
  // Drop custom fields that don't belong to the chosen option
  .transform((line) => ({
    ...line,
    customScent: scents.find((s) => s.id === line.scentId)?.custom ? line.customScent : undefined,
    width: sizes.find((s) => s.id === line.sizeId)?.custom ? line.width : undefined,
    height: sizes.find((s) => s.id === line.sizeId)?.custom ? line.height : undefined,
  }));

export const orderSchema = z.object({
  customer: customerSchema,
  items: z.array(orderLineSchema).min(1, "Korpa je prazna.").max(20),
});

export type OrderInput = z.infer<typeof orderSchema>;

export const contactSchema = z
  .object({
    name: required("ime").max(80, "Ime je predugačko."),
    reach: required("telefon ili email").max(120),
    message: z
      .string()
      .trim()
      .min(5, "Poruka je prekratka.")
      .max(2000, "Poruka može imati najviše 2000 karaktera."),
    website: z.string().max(200).optional(),
  })
  .refine(
    (v) => normalizePhone(v.reach) !== null || z.email().safeParse(v.reach.trim()).success,
    { path: ["reach"], message: "Unesite ispravan telefon ili email." },
  );

export type ContactInput = z.infer<typeof contactSchema>;

import { Resend } from "resend";
import { brand, contact, customSize } from "@/content/site";
import { formatRSD } from "./format";
import { lineLabel, type LineItem } from "./items";
import type { Totals } from "./pricing";
import type { ContactInput, CustomerInput } from "./validation";

/** unitPrice is null for a custom size (price agreed by phone). */
export type PricedLine = LineItem & { unitPrice: number | null };

const linePrice = (l: PricedLine) => (l.unitPrice === null ? customSize.priceLabel : formatRSD(l.unitPrice * l.quantity));

export type OrderRecord = {
  orderId: string;
  createdAt: string;
  customer: Omit<CustomerInput, "website" | "consent"> & { phone: string };
  items: PricedLine[];
  totals: Totals;
};

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const isDev = process.env.NODE_ENV !== "production";

type Mail = { to: string; subject: string; html: string; text: string; replyTo?: string };

/**
 * Sends through Resend. Without RESEND_API_KEY in development the email is
 * printed to the console instead, so the flow can be tested locally.
 */
async function send(mail: Mail): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM_EMAIL;
  if (!key || !from) {
    if (isDev) {
      console.info(`\n[email:dev] To: ${mail.to}\nSubject: ${mail.subject}\n${mail.text}\n`);
      return;
    }
    throw new Error("RESEND_API_KEY or ORDER_FROM_EMAIL is not configured");
  }
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: mail.to,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    replyTo: mail.replyTo,
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}

function ownerAddress(): string {
  const to = process.env.ORDER_OWNER_EMAIL;
  if (to) return to;
  if (isDev) return "vlasnik@localhost";
  throw new Error("ORDER_OWNER_EMAIL is not configured");
}

function linesText(order: OrderRecord) {
  return order.items
    .map((l) => `- ${lineLabel(l)} × ${l.quantity} = ${linePrice(l)}`)
    .join("\n");
}

function totalsText(t: Totals) {
  return [
    `Međuzbir: ${formatRSD(t.subtotal)}`,
    `Dostava: ${t.shipping === null ? "po cenovniku kurirske službe" : t.shipping === 0 ? "besplatna" : formatRSD(t.shipping)}`,
    `Ukupno: ${formatRSD(t.total)}${t.hasCustom ? " + jastuci po meri (cena po dogovoru)" : ""}`,
  ].join("\n");
}

function layout(title: string, body: string) {
  return `<!doctype html><html lang="sr-Latn"><body style="margin:0;background:#EDE8E0;font-family:Arial,Helvetica,sans-serif;color:#2B2A27">
<div style="max-width:560px;margin:0 auto;padding:32px 24px">
<p style="font-family:Georgia,serif;font-size:20px;margin:0 0 24px">${escape(brand.name)}</p>
<div style="background:#F7F4EF;border-radius:12px;padding:28px">
<h1 style="font-family:Georgia,serif;font-weight:400;font-size:24px;margin:0 0 16px">${escape(title)}</h1>
${body}
</div></div></body></html>`;
}

function itemsTable(order: OrderRecord) {
  const rows = order.items
    .map(
      (l) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #DDD7CE">${escape(lineLabel(l))} × ${l.quantity}</td><td style="padding:8px 0;border-bottom:1px solid #DDD7CE;text-align:right;white-space:nowrap">${linePrice(l)}</td></tr>`,
    )
    .join("");
  const t = order.totals;
  const ship = t.shipping === null ? "po cenovniku kurira" : t.shipping === 0 ? "besplatna" : formatRSD(t.shipping);
  return `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows}
<tr><td style="padding:8px 0">Međuzbir</td><td style="padding:8px 0;text-align:right">${formatRSD(t.subtotal)}</td></tr>
<tr><td style="padding:4px 0">Dostava</td><td style="padding:4px 0;text-align:right">${ship}</td></tr>
<tr><td style="padding:8px 0;font-weight:bold">Ukupno</td><td style="padding:8px 0;text-align:right;font-weight:bold">${formatRSD(t.total)}</td></tr></table>${
    t.hasCustom ? `<p style="font-size:13px;color:#5E5A54;margin:12px 0 0">${escape(customSize.note)}</p>` : ""
  }`;
}

export async function sendOwnerOrderEmail(order: OrderRecord) {
  const c = order.customer;
  const details: [string, string][] = [
    ["Ime i prezime", `${c.firstName} ${c.lastName}`],
    ["Telefon", c.phone],
    ["Adresa", `${c.street}, ${c.postalCode} ${c.city}`],
    ["Email", c.email || "—"],
    ["Napomena", c.note || "—"],
  ];
  const html = layout(
    `Nova porudžbina ${order.orderId}`,
    `<table style="width:100%;font-size:14px;margin-bottom:20px">${details
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5E5A54;vertical-align:top">${k}</td><td style="padding:4px 0">${escape(v)}</td></tr>`)
      .join("")}</table>${itemsTable(order)}`,
  );
  const text = [
    `Nova porudžbina ${order.orderId}`,
    ...details.map(([k, v]) => `${k}: ${v}`),
    "",
    linesText(order),
    "",
    totalsText(order.totals),
  ].join("\n");

  await send({
    to: ownerAddress(),
    subject: `Nova porudžbina ${order.orderId} · ${c.firstName} ${c.lastName}`,
    html,
    text,
    replyTo: c.email || undefined,
  });
}

export async function sendCustomerConfirmation(order: OrderRecord) {
  const to = order.customer.email;
  if (!to) return;
  const intro = `Hvala, ${order.customer.firstName}. Primili smo vašu porudžbinu broj ${order.orderId}. Pozvaćemo vas radi potvrde, a zatim šaljemo paket. Plaćate pouzećem, kuriru prilikom preuzimanja.`;
  const html = layout(
    "Porudžbina je primljena",
    `<p style="font-size:15px;line-height:1.6;margin:0 0 20px">${escape(intro)}</p>${itemsTable(order)}
<p style="font-size:13px;color:#5E5A54;margin:20px 0 0">Pitanja? Pozovite nas: ${escape(contact.phone)}</p>`,
  );
  const text = [intro, "", linesText(order), "", totalsText(order.totals)].join("\n");
  await send({ to, subject: `Vaša porudžbina ${order.orderId} je primljena`, html, text });
}

export async function sendContactEmail(input: ContactInput) {
  const text = `Poruka sa sajta\nIme: ${input.name}\nKontakt: ${input.reach}\n\n${input.message}`;
  const html = layout(
    "Poruka sa sajta",
    `<p style="font-size:14px;margin:0 0 4px"><b>${escape(input.name)}</b> · ${escape(input.reach)}</p>
<p style="font-size:15px;line-height:1.6;white-space:pre-wrap">${escape(input.message)}</p>`,
  );
  const replyTo = input.reach.includes("@") ? input.reach.trim() : undefined;
  await send({ to: ownerAddress(), subject: `Poruka sa sajta · ${input.name}`, html, text, replyTo });
}

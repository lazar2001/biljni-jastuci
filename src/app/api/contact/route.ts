import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";

const error = (message: string, status: number) => NextResponse.json({ ok: false, message }, { status });

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientIp(request.headers)}`, { limit: 5, windowMs: 10 * 60_000 })) {
    return error("Previše poruka za kratko vreme. Pokušajte ponovo za nekoliko minuta.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error("Neispravan zahtev.", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return error("Proverite podatke u formularu.", 400);
  if (parsed.data.website) return NextResponse.json({ ok: true });

  try {
    await sendContactEmail(parsed.data);
  } catch (e) {
    console.error("[contact] email failed", e);
    return error("Poruku trenutno ne možemo da pošaljemo.", 502);
  }
  return NextResponse.json({ ok: true });
}

import { randomInt } from "node:crypto";

// No 0/O/1/I to keep numbers easy to read over the phone
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** e.g. "BJ-261019-K4F2" (date in Belgrade time + 4 random chars) */
export function createOrderId(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Belgrade",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  const suffix = Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  return `BJ-${get("year")}${get("month")}${get("day")}-${suffix}`;
}

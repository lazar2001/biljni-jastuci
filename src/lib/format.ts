/** 2490 -> "2.490 RSD" */
export function formatRSD(amount: number): string {
  const grouped = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${grouped} RSD`;
}

/**
 * Normalizes a Serbian mobile/landline number to +381 format.
 * Accepts "064 123 4567", "064/123-4567", "+381 64 1234567", "00381641234567".
 * Returns null when the input cannot be a valid Serbian number.
 */
export function normalizePhone(input: string): string | null {
  let digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith("00")) digits = `+${digits.slice(2)}`;
  if (digits.startsWith("+381")) digits = digits.slice(4);
  else if (digits.startsWith("381") && digits.length >= 11) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  else return null;

  if (digits.startsWith("0")) digits = digits.slice(1);
  if (!/^\d{8,10}$/.test(digits)) return null;
  return `+381${digits}`;
}

/** Pluralizes Serbian nouns: 1 komad, 2 komada, 5 komada, 21 komad */
export function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

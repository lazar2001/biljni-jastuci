import fs from "node:fs";
import path from "node:path";

/**
 * Server-only: true when a file exists under /public. Used to fall back to
 * palette placeholders until real photos are added. Evaluated at build time,
 * so rebuild after adding images.
 */
export function imageExists(src: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

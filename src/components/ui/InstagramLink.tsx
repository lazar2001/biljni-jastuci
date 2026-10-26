import clsx from "clsx";
import { contact, isPlaceholder } from "@/content/site";

const isDev = process.env.NODE_ENV !== "production";

/** Line-style Instagram glyph (drawn here; brand icons are not part of Lucide). */
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Opens the Instagram profile from site.ts in a new tab. Hidden in production
 * until contact.instagram.url is filled in; in development it points to the
 * contact section so the icon stays visible while the link is a placeholder.
 */
export function InstagramLink({ className }: { className?: string }) {
  const ready = !isPlaceholder(contact.instagram.url);
  if (!ready && !isDev) return null;

  return (
    <a
      href="https://www.instagram.com/biljni_jastuci?cplk=bTU5b3lydW1sNHox"
      {...(ready ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label="Instagram profil (otvara se u novoj kartici)"
      title={ready ? undefined : "https://www.instagram.com/biljni_jastuci?cplk=bTU5b3lydW1sNHox"}
      className={clsx(
        "tap inline-flex items-center justify-center rounded-soft transition-colors duration-500 ease-calm hover:bg-charcoal/[0.05]",
        className,
      )}
    >
      <InstagramIcon className="size-[22px]" />
    </a>
  );
}

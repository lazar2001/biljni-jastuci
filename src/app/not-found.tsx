import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-linen pb-28 pt-[calc(var(--header-h)+6rem)]">
      <div className="container-site max-w-2xl">
        <p className="eyebrow">Greška 404</p>
        <h1 className="mt-5 text-h2">
          Ova stranica <em>ne postoji.</em>
        </h1>
        <p className="mt-5 text-lead text-muted">Možda je link zastareo. Vratite se na početnu i izaberite svoj miris.</p>
        <Link
          href="/"
          className="mt-10 inline-flex min-h-12 items-center rounded-soft bg-eucalyptus px-6 font-semibold text-paper transition-colors duration-500 ease-calm hover:bg-charcoal"
        >
          Na početnu
        </Link>
      </div>
    </section>
  );
}

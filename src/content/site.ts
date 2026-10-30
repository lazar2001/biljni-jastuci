import { ingredients as ings } from "./ingredients";
import eukaliptus from "../app/assets/eukaliptus.png";
import vranilovka from "../app/assets/origano.jpg";
import { ScentId } from "./scents";
export const PLACEHOLDER_PREFIX = "[POPUNITI";
export const fill = (what: string) => `[POPUNITI: ${what}]`;
export const isPlaceholder = (value: unknown): boolean =>
  value === null ||
  (typeof value === "string" && value.startsWith(PLACEHOLDER_PREFIX));

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type SizeId = "40x40" | "40x50" | "50x50" | "40x60" | "50x70";
export type Size = {
  id: SizeId;
  dimensionsCm: string;
  /** Width/height in cm, used to draw the silhouette to scale. null until known. */
  widthCm: number | null;
  heightCm: number | null;
  /** Price in RSD, VAT included if applicable. null until known. */
  price: number | null;
  bestseller?: boolean;
  /** "Po vašoj meri": the customer enters width × height; price is agreed by phone */
  custom?: boolean;
};

export type Review = {
  name: string;
  city: string;
  scentId: ScentId;
  text: string;
  photo?: string;
  /** Only reviews with isReal: true are rendered in production. */
  isReal: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
  link?: { label: string; href: string };
};

export type Ingredient = {
  name: string;
  latin: string;
  note: string;
  image?: string;
};

export type GalleryImage = { src: string; alt: string; tone: string };

/* ------------------------------------------------------------------ */
/* Brand                                                               */
/* ------------------------------------------------------------------ */

export const brand = {
  name: "Biljni Jastuci",
  tagline: "Ručno punjeni biljni jastuci sa prirodnim mirisnim notama.",
  footerNote:
    "Šijemo i punimo svaki jastuk ručno, od sušenog bilja i lanenog platna, za tiši i mirisniji dom.",
  locale: "sr-Latn",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const nav = [
  { label: "Proizvod", href: "/#proizvod" },
  { label: "Mirisi", href: "/#mirisi" },
  { label: "Sastav", href: "/#sastav" },
  { label: "Recenzije", href: "/#recenzije", requiresReviews: true },
  { label: "Pitanja", href: "/#pitanja" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

export const orderAnchor = "/#poruci";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  // Alternatives:
  //   "Jastuk koji miriše na more, eukaliptus i sunce."
  //   "Udahnite prirodu. Svaki dan, u svom prostoru."
  /** Each array item is one line of the headline. Wrap a word in *asterisks* for italic. */
  headline: ["Mirisi prirode,", "pretočeni *u odmor.*"],
  subheadline:
    "Ručno punjeni biljni jastuci sa prirodnim mirisnim notama, za mirniji odmor i prijatniju atmosferu u domu.",
  primaryCta: "Poruči",
  secondaryCta: "Upoznaj mirise",
  trust: ["Plaćanje pouzećem", "Dostava 1–3 radna dana", "Ručna izrada"],
  image: {
    src: "/images/hero/hero.jpg",
    alt: "Laneno sivi pravougaoni biljni jastuk na krevetu, obasjan mekim dnevnim svetlom",
  },
  images: [
    {
      src: "/assets/eukaliptus.png",
      alt: "Laneno sivi pravougaoni biljni jastuk na krevetu, obasjan mekim dnevnim svetlom",
    },
    {
      src: "/assets/kamilica.jpg",
      alt: "Laneno sivi pravougaoni biljni jastuk na krevetu, obasjan mekim dnevnim svetlom",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  eyebrow: "O proizvodu",
  title: "Jastuk *punjen biljem*, ne veštačkim mirisom.",
  what: "Biljni jastuk je jastučnica punjena sušenim aromatičnim biljem. Stoji u prostoru i nenametljivo ispušta prirodni miris, bez sprejeva, sveća i struje.",
  purpose:
    "Tu je da osveži prostor prirodnim mirisom i stvori prijatniju, mirniju atmosferu za odmor.",
  usesTitle: "Gde ga ljudi drže",
  uses: [
    "Spavaća soba",
    "Dnevni boravak",
    "Dečija soba",
    "Bašte kafića i ugostiteljski prostori",
  ],
};

/* ------------------------------------------------------------------ */
/* Benefits                                                            */
/* ------------------------------------------------------------------ */

export const benefits = {
  eyebrow: "Zašto biljni jastuk",
  quote: "PREDNOSTI BILJNOG JASTUKA",
  items: [
  {
    icon: "/assets/ikonice/Prirodni Inhalator.png",
    text: "SLUŽI KAO PRIRODNI INHALATOR",
  },
  {
    icon: "/assets/ikonice/Prirodne arome.png",
    text: "PRUŽA PRIRODNE AROME",
  },
  {
    icon: "/assets/ikonice/Prijatnija atmosfera.png",
    text: "STVARA PRIJATNIJU ATMOSFERU",
  },
  {
    icon: "/assets/ikonice/Osvezenje prostora.png",
    text: "OSVEŽAVA PROSTOR",
  },
  {
    icon: "/assets/ikonice/kvalitetniji san.png",
    text: "ZA PRIJATNIJU RUTINU PRED SPAVANJE I KVALITETNIJI SAN",
  },
  {
    icon: "/assets/ikonice/Manje stresa.png",
    text: "ZA PREDAH OD SVAKODNEVNOG STRESA",
  },
  {
    icon: "/assets/ikonice/Osecaj opustanja.png",
    text: "ZA TRENUTKE OPUŠTANJA",
  },
  {
    icon: "/assets/ikonice/Bronhitis.png",
    text: "POMAŽE KOD BRONHITISA",
  },
  {
    icon: "/assets/ikonice/Astma.png",
    text: "POMAŽE KOD ASTME",
  },
  {
    icon: "/assets/ikonice/Alergija.png",
    text: "POMAŽE KOD ALERGIJA NA AMBROZIJU",
  },
  {
    icon: "/assets/ikonice/Grip.png",
    text: "POMAŽE KOD GRIPA",
  },
  {
    icon: "/assets/ikonice/Kasalj.png",
    text: "POMAŽE KOD KAŠALJA",
  },
  {
    icon: "/assets/ikonice/Lucenje sluzi.png",
    text: "POMAŽE KOD POJAČANOG LUČENJA SLUZI",
  },
  {
    icon: "/assets/ikonice/Imunitet.png",
    text: "ZA JAČI IMUNITET",
  },
]
};

/* ------------------------------------------------------------------ */
/* Ingredients                                                         */
/* ------------------------------------------------------------------ */

export const ingredients = {
  eyebrow: "Sastav",
  title: "Mali *herbarijum* u svakom jastuku.",
  intro: "Punimo ručno, biljku po biljku. Ovo je ono što se nalazi unutra.",
  /** Up to 14 plants, shown in a horizontally scrollable herbarium. Add `image` for a photo. */
  items: ings,
  fabricNote: fill("materijal jastučnice, npr. 100% laneno platno"),
};

/* ------------------------------------------------------------------ */
/* Scents                                                              */
/* ------------------------------------------------------------------ */

// Descriptions are suggestions describing mood only — no health claims. Edit freely.

/** Text field shown when the customer picks "Izaberite vašu". */
export const customScent = {
  label: "Koju mirisnu notu želite?",
  placeholder: "npr. lavanda i malo citrusa",
  minLength: 2,
  maxLength: 80,
};

export const scentsSection = {
  eyebrow: "Mirisne note",
  title: "Izaberite *miris* svog prostora.",
  customHint:
    "Upišite željenu notu. Pre slanja vas zovemo da je zajedno potvrdimo.",
};

/* ------------------------------------------------------------------ */
/* Sizes and pricing                                                   */
/* ------------------------------------------------------------------ */

// 40 x 40 cm = 3000 rsd
// 40 x 50 cm = 4000 rsd
// 50 x 50 cm = 5000 rsd
// 40 x 60 cm = 5000 rsd 
// 50 x 70 cm = 6000 rsd
export const sizes: Size[] = [
  {
    id: "40x40",
    dimensionsCm: fill("dimenzije, npr. 30 × 20"),
    widthCm: null,
    heightCm: null,
    price: 2999,
  },
  {
    id: "40x50",
    dimensionsCm: fill("dimenzije, npr. 40 × 30"),
    widthCm: null,
    heightCm: null,
    price: 3999,
    bestseller: true,
  },
  {
    id: "50x50",
    dimensionsCm: fill("dimenzije, npr. 50 × 35"),
    widthCm: null,
    heightCm: null,
    price: 4999,
  },
  {
    id: "40x60",
    dimensionsCm: fill("dimenzije, npr. 50 × 35"),
    widthCm: null,
    heightCm: null,
    price: 5999,
  },
  {
    id: "50x70",
    dimensionsCm: "Unesite širinu i visinu",
    widthCm: null,
    heightCm: null,
    price: 6999
  },
];

/** Limits for customer-entered dimensions (cm). Price is agreed by phone. */
export const customSize = {
  min: 10,
  max: 150,
  priceLabel: "Cena po dogovoru",
  note: "Cenu jastuka po meri potvrđujemo telefonom pre slanja.",
};

export const sizesSection = {
  eyebrow: "Dimenzije",
  title: "Dostupne veličine",
  bestsellerLabel: "Najprodavanije",
  noPriceLabel: "Cena uskoro",
};

export const defaultSizeId: SizeId = "40x50";

export const quantity = { min: 1, max: 20 };

export const shipping = {
  /** Shipping price in RSD. null until known. */
  price: null as number | null,
  /** Free shipping threshold in RSD. null disables free shipping. */
  freeAbove: null as number | null,
  courier: fill("naziv kurirske službe"),
  deliveryTime: "1–3 radna dana na teritoriji Srbije",
};

export const payment = {
  methods: ["Pouzećem, gotovinom kuriru prilikom preuzimanja"],
  extra: fill("i/ili uplata na račun — obrišite ako ne postoji"),
  /** Set to false if the seller is not in the VAT system. */
  vatIncluded: null as boolean | null,
};

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export const gallery = {
  eyebrow: "Galerija",
  title: "Iz blizine i *u prostoru*.",
  images: [
    {
      src: "/images/gallery/gallery-01.jpg",
      alt: "Biljni jastuk na lanenoj posteljini u spavaćoj sobi",
      tone: "#CFC8BC",
    },
    {
      src: "/images/gallery/gallery-02.jpg",
      alt: "Detalj lanenog platna i ravnog ruba jastuka",
      tone: "#BDB6AB",
    },
    {
      src: "/images/gallery/gallery-03.jpg",
      alt: "Sušeno bilje kojim se puni jastuk",
      tone: "#A9AF9F",
    },
    {
      src: "/images/gallery/gallery-04.jpg",
      alt: "Jastuk na kauču u dnevnom boravku",
      tone: "#D6CFC3",
    },
    {
      src: "/images/gallery/gallery-05.jpg",
      alt: "Detalj ručnih šavova na jastučnici",
      tone: "#B4AEA4",
    },
    {
      src: "/images/gallery/gallery-06.jpg",
      alt: "Jastuk u dečijoj sobi",
      tone: "#DCD5CA",
    },
    {
      src: "/images/gallery/gallery-07.jpg",
      alt: "Jastuk na stolici u bašti kafića",
      tone: "#9FAA9A",
    },
    {
      src: "/images/gallery/gallery-08.jpg",
      alt: "Ruke koje pune jastuk biljem",
      tone: "#C3BCB0",
    },
    {
      src: "/images/gallery/gallery-09.jpg",
      alt: "Tri dimenzije jastuka jedna pored druge",
      tone: "#CAC4B9",
    },
    {
      src: "/images/gallery/gallery-10.jpg",
      alt: "Jastuk na fotelji pored prozora",
      tone: "#B0B8B2",
    },
  ] satisfies GalleryImage[],
};

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

export const reviewsSection = {
  eyebrow: "Recenzije",
  title: "Šta kažu *kupci*.",
};

export const reviews: Review[] = [
  // PLACEHOLDER — zameniti stvarnim recenzijama. Ne prikazuju se u produkciji dok je isReal: false.
  {
    name: "Primer K.",
    city: "Beograd",
    scentId: "fresh",
    text: "PLACEHOLDER — zameniti stvarnom recenzijom.",
    isReal: false,
  },
  {
    name: "Primer M.",
    city: "Novi Sad",
    scentId: "sea",
    text: "PLACEHOLDER — zameniti stvarnom recenzijom.",
    isReal: false,
  },
  {
    name: "Primer J.",
    city: "Niš",
    scentId: "summer",
    text: "PLACEHOLDER — zameniti stvarnom recenzijom.",
    isReal: false,
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqSection = {
  eyebrow: "Česta pitanja",
  title: "Pitanja koja *često dobijamo*.",
};

export const faq: FaqItem[] = [
  {
    question: "Kako se koristi biljni jastuk?",
    answer:
      "Postavite ga tamo gde provodite vreme: uz krevet, na fotelju, kauč ili u baštu. Kada poželite jači miris, lagano ga protresite ili pritisnite.",
  },
  {
    question: "Koliko dugo traje miris?",
    answer: fill("koliko meseci miris traje uz normalnu upotrebu"),
  },
  {
    question: "Kako da osvežim miris kada oslabi?",
    answer: `Protresite i pritisnite jastuk nekoliko puta, da se bilje unutra pomeri. ${fill("da li nudite dopunu bilja ili ulje za osvežavanje")}`,
  },
  {
    question: "Kako se jastuk čuva?",
    answer:
      "Na suvom mestu, dalje od vlage i dugog direktnog sunca, koje brže troši miris bilja.",
  },
  {
    question: "Da li jastuk sme da se pere?",
    answer: fill("uputstvo za održavanje i pranje jastučnice"),
  },
  {
    question: "Da li je pogodan za dečiju sobu?",
    answer:
      "Da, kao dekorativni mirisni dodatak u prostoru. Miris je blag i nenametljiv. Ne ostavljajte ga u krevecu beba i držite ga van domašaja najmlađih.",
  },
  {
    question: "Koje biljke se nalaze unutra?",
    answer: "Spisak svih biljaka nalazi se u sekciji Sastav.",
    link: { label: "Pogledajte sastav", href: "/#sastav" },
  },
  {
    question: "Kako funkcioniše dostava i plaćanje?",
    answer:
      "Porudžbinu šaljete preko formulara, a mi vas pozivamo radi potvrde. Paket stiže kurirskom službom za 1–3 radna dana, a plaćate pouzećem, gotovinom kuriru.",
  },
  {
    question: "Šta ako proizvod nije odgovarajući?",
    answer:
      "Imate pravo da odustanete od kupovine u roku od 14 dana od prijema, bez navođenja razloga. Sve o postupku pročitajte na stranici o reklamacijama.",
    link: { label: "Reklamacije i povraćaj", href: "/reklamacije-i-povracaj" },
  },
];

/* ------------------------------------------------------------------ */
/* Contact and seller                                                  */
/* ------------------------------------------------------------------ */

export const contact = {
  eyebrow: "Kontakt",
  title: "Tu smo ako želite *da pitate*.",
  /** Display format */
  phone: fill("telefon, npr. 064 123 4567"),
  /** International format without + or spaces, used for deep links, e.g. 381641234567 */
  phoneIntl: fill("telefon u formatu 3816..."),
  email: fill("email za kontakt"),
  instagram: {
    handle: fill("@instagram"),
    url: fill("https://instagram.com/..."),
  },
  hours: fill("radno vreme za pozive, npr. radnim danima 9–18h"),
};

export const seller = {
  name: fill("naziv firme ili radnje"),
  address: fill("adresa sedišta"),
  pib: fill("PIB"),
  mb: fill("matični broj"),
  email: fill("email prodavca"),
  phone: fill("telefon prodavca"),
};

export const legalLinks = [
  { label: "Uslovi kupovine", href: "/uslovi-kupovine" },
  { label: "Reklamacije i povraćaj", href: "/reklamacije-i-povracaj" },
  { label: "Politika privatnosti", href: "/politika-privatnosti" },
];

/* ------------------------------------------------------------------ */
/* Legal pages                                                         */
/*                                                                     */
/* NOTE: these texts are TEMPLATES. Have them reviewed by a lawyer or  */
/* accountant before going live (Zakon o zaštiti potrošača, Zakon o    */
/* elektronskoj trgovini, ZZPL).                                       */
/* ------------------------------------------------------------------ */

export type LegalBlock = string | { list: string[] };
export type LegalSection = { heading: string; body: LegalBlock[] };
export type LegalDoc = {
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

const sellerLine = `${seller.name}, ${seller.address}, PIB ${seller.pib}, matični broj ${seller.mb}`;
const vatLine =
  payment.vatIncluded === true
    ? "Sve cene su iskazane u dinarima (RSD) sa uračunatim PDV-om."
    : payment.vatIncluded === false
      ? "Sve cene su iskazane u dinarima (RSD). Prodavac nije u sistemu PDV-a, pa PDV nije obračunat."
      : `Sve cene su iskazane u dinarima (RSD). ${fill("da li je prodavac u sistemu PDV-a — podesite payment.vatIncluded")}`;
const shippingLine =
  shipping.price !== null
    ? `Cena dostave je ${shipping.price.toLocaleString("sr-RS")} RSD${
        shipping.freeAbove !== null
          ? `, a za porudžbine iznad ${shipping.freeAbove.toLocaleString("sr-RS")} RSD dostava je besplatna`
          : ""
      }.`
    : `Cena dostave: ${fill("cena dostave i prag za besplatnu dostavu")}.`;

export const legal: Record<"terms" | "returns" | "privacy", LegalDoc> = {
  terms: {
    title: "Uslovi kupovine",
    description:
      "Uslovi kupovine biljnih jastuka putem internet prodavnice: prodavac, poručivanje, cene, plaćanje i dostava.",
    updated: fill("datum poslednje izmene"),
    sections: [
      {
        heading: "Prodavac",
        body: [
          `Prodavac je ${sellerLine}.`,
          `Kontakt: telefon ${seller.phone}, email ${seller.email}.`,
        ],
      },
      {
        heading: "Poručivanje",
        body: [
          "Porudžbinu šaljete preko formulara na sajtu. Pre slanja birate miris, dimenziju i količinu i unosite podatke za dostavu.",
          "Nakon slanja dobijate broj porudžbine, a ako ste ostavili email i potvrdu prijema. Prodavac vas zatim kontaktira telefonom radi potvrde porudžbine.",
          "Ugovor o kupovini je zaključen kada prodavac potvrdi porudžbinu. Prodavac može odbiti porudžbinu ako podaci nisu potpuni ili proizvod nije dostupan, o čemu vas obaveštava bez odlaganja.",
        ],
      },
      {
        heading: "Cene",
        body: [
          vatLine,
          "Cena važi u trenutku slanja porudžbine. Prodavac zadržava pravo izmene cena, što ne utiče na već potvrđene porudžbine.",
        ],
      },
      {
        heading: "Plaćanje",
        body: [
          "Plaćanje se vrši pouzećem, gotovinom kuriru prilikom preuzimanja paketa.",
          payment.extra,
        ],
      },
      {
        heading: "Dostava",
        body: [
          `Dostava se vrši na teritoriji Republike Srbije, kurirskom službom ${shipping.courier}, u roku od 1–3 radna dana od potvrde porudžbine.`,
          shippingLine,
          "Prilikom preuzimanja proverite da paket nije oštećen. Ako jeste, sačinite zapisnik sa kurirom i javite nam se.",
        ],
      },
      {
        heading: "Odustanak i reklamacije",
        body: [
          "Imate pravo da odustanete od ugovora u roku od 14 dana od prijema proizvoda, kao i pravo na reklamaciju zbog nesaobraznosti. Postupak je opisan na stranici Reklamacije i povraćaj.",
        ],
      },
      {
        heading: "Zaštita podataka",
        body: [
          "Podatke koje unesete koristimo isključivo za obradu i isporuku porudžbine, kako je opisano u Politici privatnosti.",
        ],
      },
      {
        heading: "Rešavanje sporova",
        body: [
          "Eventualne nesporazume nastojimo da rešimo dogovorom. Potrošač može pokrenuti i vansudsko rešavanje potrošačkog spora pred telom upisanim na listu Ministarstva nadležnog za trgovinu, u skladu sa Zakonom o zaštiti potrošača.",
        ],
      },
    ],
  },

  returns: {
    title: "Reklamacije i povraćaj",
    description:
      "Pravo na odustanak u roku od 14 dana, postupak reklamacije, rokovi i obrazac za odustanak od ugovora.",
    updated: fill("datum poslednje izmene"),
    sections: [
      {
        heading: "Pravo na odustanak od ugovora",
        body: [
          "Kod kupovine na daljinu imate pravo da odustanete od ugovora u roku od 14 dana od dana kada ste primili proizvod, bez navođenja razloga, u skladu sa Zakonom o zaštiti potrošača.",
          "Odustanak izjavljujete popunjavanjem obrasca ispod ili drugom nedvosmislenom izjavom poslatom na email ili adresu prodavca. Rok je ispoštovan ako izjavu pošaljete pre isteka 14 dana.",
        ],
      },
      {
        heading: "Vraćanje proizvoda i novca",
        body: [
          "Proizvod vraćate bez odlaganja, a najkasnije u roku od 14 dana od dana slanja izjave o odustanku, na adresu prodavca.",
          `Troškove vraćanja proizvoda snosi kupac. ${fill("ili navedite da ih snosi prodavac")}`,
          "Prodavac vraća primljeni iznos, uključujući troškove isporuke, bez odlaganja, a najkasnije u roku od 14 dana od prijema izjave o odustanku. Prodavac može da odloži povraćaj dok ne primi vraćeni proizvod.",
          "Odgovarate za umanjenu vrednost proizvoda koja je posledica rukovanja koje nije neophodno da biste ustanovili njegovu prirodu i karakteristike.",
        ],
      },
      {
        heading: "Reklamacija",
        body: [
          "Ako proizvod nije saobrazan ugovoru (na primer oštećen je ili nije ono što ste poručili), možete izjaviti reklamaciju u roku od dve godine od prijema.",
          "Reklamaciju šaljete na email ili adresu prodavca, uz opis problema, fotografije i dokaz o kupovini (broj porudžbine ili račun).",
          "Prodavac potvrđuje prijem reklamacije, odgovara u roku od 8 dana od prijema i rešava je u roku od 15 dana, u skladu sa Zakonom o zaštiti potrošača. Prodavac vodi evidenciju primljenih reklamacija.",
        ],
      },
      {
        heading: "Kontakt za reklamacije",
        body: [
          `${sellerLine}. Email: ${seller.email}, telefon: ${seller.phone}.`,
        ],
      },
    ],
  },

  privacy: {
    title: "Politika privatnosti",
    description:
      "Koje podatke prikupljamo, u koju svrhu, koliko ih čuvamo i koja su vaša prava po Zakonu o zaštiti podataka o ličnosti.",
    updated: fill("datum poslednje izmene"),
    sections: [
      {
        heading: "Rukovalac podacima",
        body: [
          `Rukovalac podacima o ličnosti je ${sellerLine}. Kontakt: ${seller.email}, ${seller.phone}.`,
        ],
      },
      {
        heading: "Koje podatke prikupljamo",
        body: [
          {
            list: [
              "Pri porudžbini: ime, prezime, broj telefona, adresa dostave (ulica i broj, grad, poštanski broj), email adresa ako je unesete i napomena za dostavu.",
              "Pri slanju poruke: ime, telefon ili email i sadržaj poruke.",
              "Tehnički podaci: IP adresa se kratkotrajno koristi radi zaštite od zloupotrebe formulara i ne čuva se trajno.",
            ],
          },
          "Sadržaj korpe čuva se samo u vašem pregledaču (localStorage) i ne šalje se nama dok ne pošaljete porudžbinu.",
        ],
      },
      {
        heading: "Svrha i pravni osnov",
        body: [
          "Podatke koristimo da bismo obradili i isporučili porudžbinu, kontaktirali vas radi potvrde i odgovorili na vaše poruke. Pravni osnov je izvršenje ugovora i preduzimanje radnji pre zaključenja ugovora na vaš zahtev, kao i ispunjenje zakonskih obaveza (npr. knjigovodstvenih).",
          "Podatke ne koristimo za marketing bez vašeg posebnog pristanka i ne prodajemo ih trećim licima.",
        ],
      },
      {
        heading: "Ko još ima pristup podacima",
        body: [
          {
            list: [
              `Kurirska služba (${shipping.courier}), radi isporuke paketa.`,
              "Pružalac usluge slanja emaila (Resend) i pružalac hostinga sajta (Vercel). Ovi pružaoci mogu obrađivati podatke van Republike Srbije, uz odgovarajuće mere zaštite.",
              fill(
                "ako koristite Google Sheets ili Telegram za prijem porudžbina, navedite ih ovde",
              ),
            ],
          },
        ],
      },
      {
        heading: "Koliko dugo čuvamo podatke",
        body: [
          `Podatke iz porudžbina čuvamo ${fill("rok čuvanja, npr. koliko propisi o računovodstvu zahtevaju")}. Poruke sa kontakt forme čuvamo dok je potrebno da odgovorimo na upit, a najduže ${fill("rok")}.`,
        ],
      },
      {
        heading: "Kolačići",
        body: [
          "Sajt ne koristi kolačiće za praćenje niti analitiku. Koristi se samo lokalno skladište pregledača za pamćenje korpe, što je neophodno za rad prodavnice.",
          "Ako u budućnosti uvedemo analitičke ili marketinške kolačiće, učitavaćemo ih tek uz vaš izričit pristanak.",
        ],
      },
      {
        heading: "Vaša prava",
        body: [
          "U skladu sa Zakonom o zaštiti podataka o ličnosti imate pravo da:",
          {
            list: [
              "zatražite pristup svojim podacima i kopiju podataka,",
              "zatražite ispravku netačnih ili dopunu nepotpunih podataka,",
              "zatražite brisanje podataka, kada za njihovu obradu ne postoji zakonski osnov,",
              "zatražite ograničenje obrade i prenosivost podataka,",
              "uložite prigovor na obradu,",
              "povučete pristanak, ako je obrada zasnovana na pristanku,",
              "podnesete pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti (www.poverenik.rs).",
            ],
          },
          `Zahtev nam pošaljite na ${seller.email}. Odgovaramo bez odlaganja, a najkasnije u roku od 30 dana.`,
        ],
      },
    ],
  },
};

/** Model withdrawal form (obrazac za odustanak od ugovora zaključenog na daljinu). */
export const withdrawalForm = {
  title: "Obrazac za odustanak od ugovora zaključenog na daljinu",
  addressee: `Prodavcu: ${sellerLine}, email ${seller.email}`,
  statement:
    "Izjavljujem da odustajem od ugovora o prodaji sledećeg proizvoda (navedite proizvod, miris, dimenziju i količinu):",
  fields: [
    "Broj porudžbine",
    "Datum zaključenja ugovora / datum prijema proizvoda",
    "Ime i prezime potrošača",
    "Adresa potrošača",
    "Broj tekućeg računa za povraćaj novca",
    "Potpis potrošača (samo ako se obrazac šalje u papirnom obliku)",
    "Datum",
  ],
};

/* ------------------------------------------------------------------ */
/* Analytics                                                           */
/* ------------------------------------------------------------------ */

export const analytics = {
  /** When set, a cookie consent banner is shown and the Pixel loads only after consent. */
  metaPixelId: null as string | null,
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const hasRealReviews = reviews.some((r) => r.isReal);
export const getSize = (id: SizeId) =>
  sizes.find((s) => s.id === id) ?? sizes[0];

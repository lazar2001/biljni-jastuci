export type ScentId =
  | "fresh"
  | "summer"
  | "winter"
  | "autumn"
  | "spring"
  | "sea"
  | "garden"
  | "forest"
  | "custom";

export type Scent = {
  id: ScentId;
  name: string;
  short: string;
  description: string;
  /** Accent color used for buttons, lines and highlights when selected */
  accent: string;
  /** Very light background tint for the scent section */
  tint: string;
  /** "Izaberite vašu": the customer describes the note in a text field */
  custom?: boolean;
  image: string;
};

export const scents: Scent[] = [
  {
    id: "fresh",
    name: "Osvežavajuća",
    short: "Čista i lagana",
    description: "Čista i lagana, kao otvoren prozor u rano jutro.",
    accent: "#5E8C7E",
    tint: "#E0E8E2",
    image: "/assets/Osvezavajuca.png",
  },
  {
    id: "summer",
    name: "Letnja",
    short: "Sunčana i vedra",
    description: "Sunčana i vedra, sa toplinom dugih letnjih popodneva.",
    accent: "#D9A441",
    tint: "#F2E9D6",
    image: "/assets/Letnja.png",
  },
  {
    id: "winter",
    name: "Zimska",
    short: "Topla i ušuškana",
    description: "Topla i ušuškana, za duže večeri i mirne vikende kod kuće.",
    accent: "#6B7F8E",
    tint: "#E3E6E8",
    image: "/assets/Zimska.png",
  },
  {
    id: "autumn",
    name: "Jesenja",
    short: "Zemljana i meka",
    description: "Zemljana i meka, kao šetnja kroz opalo lišće.",
    accent: "#B07A4A",
    tint: "#EFE4D8",
    image: "/assets/Jesenja.png",
  },
  {
    id: "spring",
    name: "Prolećna",
    short: "Nežna i cvetna",
    description: "Nežna i cvetna, sa svežinom prvih toplih dana.",
    accent: "#B98A9E",
    tint: "#F0E4E7",
    image: "/assets/Prolecna.png",
  },
  {
    id: "sea",
    name: "More",
    short: "Slano i prozračno",
    description: "Lagano, slano i prozračno, kao vetar sa obale.",
    accent: "#6F8FA0",
    tint: "#E2E7E8",
    image: "/assets/More.png",
  },
  {
    id: "garden",
    name: "Bašta",
    short: "Zelena i biljna",
    description: "Zelena i biljna, kao jutro među lejama posle zalivanja.",
    accent: "#7D8B74",
    tint: "#E4E7DD",
    image: "/assets/Basta.png",
  },
  {
    id: "custom",
    name: "Izaberite vašu",
    short: "Po vašoj želji",
    description:
      "Napišite koju mirisnu notu želite, a mi je sastavljamo za vas.",
    accent: "#A39E96",
    tint: "#ECE8E1",
    custom: true,
    image: "/assets/Vasa kombinacija.png",
  },
];

export const getScent = (id: ScentId) =>
  scents.find((s) => s.id === id) ?? scents[0];
export const defaultScentId: ScentId = "fresh";

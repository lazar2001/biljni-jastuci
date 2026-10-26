export type Ingredient = {
  name: string;
  latin: string;
  note: string;
  image?: string;
};

export const ingredients: Ingredient[] = [
  {
    name: "Eukaliptus",
    latin: "Eucalyptus globulus",
    note: "Oslobađa osvežavajuću aromu koja daje osećaj svežine pri svakom udahu i unosi prijatan miris u prostor za odmor. Mirisna nota: Sveža, prodorna i blago kamforasta.",
    image: "/assets/eukaliptus.png",
  },
  {
    name: "Vranilovka",
    latin: "Origanum vulgare",
    note: "Otpušta toplu biljnu aromu koja podseća na miris prirode i daje punoću mirisnoj mešavini jastuka. Mirisna nota: Topla, začinska, nalik origanu.",
    image: "/assets/origano.jpg",
  },
  {
    name: "Žalfija",
    latin: "Salvia officinalis",
    note: "Izraženim biljnim mirisom pruža aromatičnu svežinu i uravnotežuje slatke i cvetne note u jastuku. Mirisna nota: Zeljasta, suva i blago kamforasta.",
    image: "/assets/zalfija.jpg",
  },
  {
    name: "Kamilica",
    latin: "Matricaria chamomilla",
    note: "Blagom cvetnom aromom stvara nežnu, prijatnu atmosferu za opuštanje i večernji odmor. Mirisna nota: Nežna, cvetna i blago slatkasta.",
    image: "/assets/kamilica.jpg",
  },
  {
    name: "Borove iglice",
    latin: "Pinus sylvestris",
    note: "Oslobađaju svežu šumsku aromu koja podseća na šetnju kroz borovu šumu i unosi miris prirode u dom. Mirisna nota: Šumska, smolasta i sveža.",
    image: "/assets/borove iglice.jpg",
  },
  {
    name: "Majčina dušica",
    latin: "Thymus serpyllum",
    note: "Toplim mirisom livadskog bilja doprinosi prijatnoj atmosferi za predah i povezuje sveže i cvetne arome jastuka. Mirisna nota: Topla, biljna i blago začinska.",
    image: "/assets/majcina dusica.jpg",
  },
  {
    name: "Matičnjak",
    latin: "Melissa officinalis",
    note: "Nežnom limunastom aromom pruža laganu svežinu i upotpunjuje opuštajući večernji ambijent. Mirisna nota: Blaga, citrusna i sveža.",
    image: "/assets/maticnjak.jpg",
  },
  {
    name: "Morač",
    latin: "Foeniculum vulgare",
    note: "Slatkastom aromom omekšava intenzivnije biljne mirise i daje mešavini prijatnu toplinu. Mirisna nota: Topla, slatkasta, nalik anisu.",
    image: "/assets/morac.jpg",
  },
  {
    name: "Nana",
    latin: "Mentha piperita",
    note: "Pruža izražen osećaj mirisne svežine i daje jastuku osvežavajući, mentolasti karakter. Mirisna nota: Sveža, mentolasta i hladna.",
    image: "/assets/menta.jpg",
  },
  {
    name: "Ruzmarin",
    latin: "Salvia rosmarinus",
    note: "Oslobađa prodornu mediteransku aromu koja osvežava mirisnu mešavinu i daje joj snažan biljni karakter. Mirisna nota: Drvenasta, smolasta i blago kamforasta.",
    image: "/assets/ruzmarin.jpg",
  },
  {
    name: "Smilje",
    latin: "Helichrysum italicum",
    note: "Toplom aromom suvog mediteranskog bilja daje jastuku bogat, zaokružen miris, prijatan za trenutke odmora. Mirisna nota: Topla, biljna, blago medna i začinska.",
    image: "/assets/smilje.jpg",
  },
  {
    name: "Timijan",
    latin: "Thymus vulgaris",
    note: "Naglašenom biljnom aromom obogaćuje miris jastuka i daje mu toplu, začinsku svežinu. Mirisna nota: Intenzivna, topla i začinska.",
    image: "/assets/timjan.jpg",
  },
  {
    name: "Trava iva",
    latin: "Teucrium montanum",
    note: "Diskretnom zeljastom aromom dopunjuje mirisnu mešavinu i daje joj blag, prirodan ton bez prejakog mirisa. Mirisna nota: Blaga, suva i zemljano biljna.",
    image: "/assets/trava iva.jpg",
  },
  {
    name: "Hajdučka trava",
    latin: "Achillea millefolium",
    note: "Blagim mirisom suvog livadskog bilja uravnotežuje intenzivnije arome i doprinosi skladnom mirisu jastuka. Mirisna nota: Zeljasta, blago začinska i zemljana.",
    image: "/assets/hajducka trava.jpg",
  },
];
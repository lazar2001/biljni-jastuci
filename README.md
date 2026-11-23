# Biljni jastuci — Next.js sajt

Prodajni sajt za biljne jastuke: 7 mirisnih nota, 5 veličina, korpa i poručivanje pouzećem.

## Pokretanje na računaru

Potreban je Node.js 18.18 ili noviji (https://nodejs.org).

```bash
npm install
npm run dev
```

Otvori http://localhost:3000

## Objavljivanje

**Vercel (najlakše):** napravi nalog na vercel.com, ubaci ovaj folder na GitHub i klikni „Import“. Vercel sam prepozna Next.js.

**Bilo koji hosting:** `npm run build` napravi folder `out/` sa gotovim sajtom. Sadržaj tog foldera se samo prebaci na hosting.

## Gde se šta menja

| Šta | Gde |
|---|---|
| Cene i dimenzije jastuka | `public/sajt.js` → `SIZES` |
| Mirisne note i bilje | `public/sajt.js` → `NOTES`, `HERBS` |
| Telefon, Instagram, dostava | `public/sajt.js` → `CONFIG` |
| Prijem porudžbina na e-mail (npr. Formspree) | `public/sajt.js` → `CONFIG.orderEndpoint` |
| Tekstovi i sekcije | `app/markup.ts` |
| Boje, fontovi, izgled | `app/globals.css` |
| Slike | `public/slike/` (isti naziv fajla = zamena slike) |

Napomena: dok `orderEndpoint` nije podešen, kupac posle poručivanja dobija porudžbinu kao tekst i šalje je u Instagram poruke ili SMS-om.

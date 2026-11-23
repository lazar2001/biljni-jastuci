import Script from 'next/script';
import markup from './markup';

/*
  Cela stranica: HTML je u app/markup.ts, izgled u app/globals.css,
  a sva logika (mirisne note, veličine, cene, korpa, poručivanje) u public/sajt.js.
  Cene, telefon i dostavu menjate na vrhu fajla public/sajt.js (CONFIG, SIZES, NOTES).
*/
export default function Page() {
  return (
    <>
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: markup }} />
      <Script src="/sajt.js" strategy="afterInteractive" />
    </>
  );
}

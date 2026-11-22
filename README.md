# Magnus Food Industry — web aplikacija

Jednostranična aplikacija za Magnus Food Industry: asortiman sa specifikacijama, kvalitet i proces,
B2B forma, zahtev za katalog, Instagram, česta pitanja i kontakt. Interfejs je na srpskom i engleskom.

Next.js (App Router) · React · TypeScript · Tailwind CSS · Framer Motion · Lenis

## Pokretanje

```bash
npm install
npm run dev        # razvoj, http://localhost:3000
npm run build      # produkciona verzija
npm run start      # pokretanje produkcione verzije
npm run typecheck  # provera tipova
```

Potreban je Node.js 20.9 ili noviji.

## Dizajn

Treći prolaz je „unslop“: uklonjeni su efekti koji su sajt činili generičkim, a ostali su brend,
sadržaj i redosled sekcija. Kao proveru koristi pravila iz UI UX Pro Max (dodir, kontrast,
fokus, smanjeno kretanje) i skill „unslop“ (Damir Sokolovsky, CC BY 4.0).

- **Pravac:** domaće, precizno, toplo. Svet brenda je Pešter i lanac hladnoće: pašnjak, natron
  papir sa ambalaže, roštilj, −18 °C.
- **Jedan bogat element po ekranu:** prave fotografije proizvoda i Peštera. Sve oko njih je tiho.
- **Potpis:** oznaka kao na deklaraciji, „500 g · −18 °C“, na svakoj kartici proizvoda.
- **Boje:** zelena iz logoa (`#74ca00`) samo na glavnom dugmetu, aktivnoj stavci menija i
  potvrdi ispravnog polja. Površine su crne i boje papira, tekst u tri nivoa, ivice tanke.
- **Tipografija:** jedna porodica (Archivo). Naslovi u suženom rezu kao na ambalaži, težina 680;
  ostatak 400 do 600. Oznake sekcija su obična slova, bez verzala i razmaknutih slova.
- **Oblici:** dugmad i polja 10 px, kartice 16 px; okrugle su samo ikonice-dugmad.
- **Kretanje:** jedan ulaz pri učitavanju (redovi naslova izlaze iz maske), kratko pojavljivanje
  naslova i kartica pri skrolu, brojke koje se odbrojavaju. Bez petlji, paralakse, opruga i
  uvećavanja na hover. Jedna kriva (`power4.out`), trajanja 150 do 600 ms.
- **Telefon:** fotografija proizvoda je već na prvom ekranu; jedna glavna i jedna sporedna akcija;
  asortiman u dve kolone sa celim redom „Detalji“ za dodir; traka sa akcijama u zoni palca.
- **Izostavljeno namerno:** uvodna zavesa, pratilac kursora, pokretna traka sa sloganima, zrno,
  magnetna dugmad, odsjaj na karticama, pečat koji se okreće, ogroman znak u podnožju i WebGL.

## Gde se šta menja

| Šta | Gde |
| --- | --- |
| Proizvodi, specifikacije, kontakt, linkovi, FAQ, B2B sadržaj | `data/magnusData.ts` |
| Tekstovi interfejsa (dugmad, poruke, naslovi), SR i EN | `data/dictionary.ts` |
| Originalne slike (logo, ambalaža, fotografije) | `public/originals` + spisak u `data/magnusData.ts` |
| Boje i tipografija | `app/globals.css` (blok `@theme`) |
| SEO metapodaci i JSON-LD | `app/layout.tsx` |

## Slike

Sve slike su originali koje je dostavio klijent i nalaze se u `public/originals`: logo „Magnus Food“,
znak „Magnus Food Industry“, znak „Magnus HoReCa“, oznake kvaliteta, deset fotografija ambalaže
(providna pozadina) i fotografije proizvoda, Peštera i proizvodnje. Spisak fajlova i gde se koji
koristi je u `data/magnusData.ts` (`IMAGE_FILES`, `SECTION_MEDIA`).

Boje sajta su preuzete iz tih fajlova: zelena `#74ca00` i crna `#1d1d1b` iz logoa, bronza `#8c734b`
iz znaka kompanije i natron papir sa ambalaže.

Neto količine, broj komada i vreme pečenja u specifikacijama pročitani su sa ambalaže na slikama.

## Forme

B2B upit i zahtev za katalog šalju se na `/api/inquiry`, koji podatke proverava i prosleđuje kao
JSON na adresu iz promenljive `INQUIRY_WEBHOOK_URL` (vidi `.env.example`).

- U razvoju, bez te promenljive, upit se ispisuje u konzoli servera i forma prikazuje potvrdu.
- U produkciji, bez te promenljive, forma prikazuje grešku i nudi slanje email-a, da posetilac
  ne dobije potvrdu za upit koji nikome nije stigao.

## Šta treba dopuniti

- **Specifikacije.** Transportna pakovanja i rok trajanja nisu navedeni ni na sajtu ni na ambalaži
  sa slika. Ta polja su `null` u `data/magnusData.ts` i prikazuju se kao „U specifikaciji na upit“.
- **Instagram.** Pločice koriste fotografije sa sajta i vode na profil. Za konkretne objave
  upišite `imageSrc` i `href` u `INSTAGRAM_ITEMS`.

## Struktura

```
app/
  layout.tsx            font, metapodaci, JSON-LD, provajderi
  page.tsx              početna: sekcije i tokovi konverzije
  globals.css           dizajn tokeni (Tailwind v4 @theme)
  not-found.tsx         stranica 404
  api/inquiry/route.ts  prijem upita i zahteva za katalog
  opengraph-image.tsx   slika za deljenje
  robots.ts, sitemap.ts, icon.svg
components/
  Navbar, HeroSection, ProductCatalogSection, ProductSpecModal,
  QualityAndProcessSection, B2BFunnelSection, InstagramShowcaseSection,
  FaqSection, Footer, CatalogModal, ProductVisual, Providers,
  SmoothScroll, MobileActionBar
  ui/                   dijalog, polja, ikone, brojač, fotografija, znak brenda…
data/                   sadržaj i tekstovi
lib/                    jezik, validacija, slanje forme, pretraga, skrol
public/originals/       originalne slike brenda
```

## Pristupačnost i performanse

- Tastatura: preskakanje na sadržaj, vidljiv fokus, zamka za fokus u dijalozima, Escape zatvara.
- `prefers-reduced-motion`: pomeranja se gase i glatki skrol se ne pokreće, a sadržaj ostaje isti.
- Bez JavaScript-a (`<noscript>`) sadržaj i slike su odmah vidljivi.
- Bez pomeranja rasporeda: slike imaju zadat odnos stranica, font je lokalni, a poruke o greškama
  imaju rezervisan prostor.

## Font

Archivo (Omnibus-Type), SIL Open Font License 1.1. Tekst licence je u `app/fonts/Archivo-OFL.txt`.

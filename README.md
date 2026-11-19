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

Kreativni pravac prati `awwwards` skill (github.com/tponscr-debug/claude-skill-awwwards):

- **Emocija i arhetip:** poverenje i apetit; crna scena kao na ambalaži za početak i kvalitet,
  tople površine boje papira za asortiman i saradnju, Magnus zelena kao jedina boja akcije.
- **Tipografija:** jedna porodica (Archivo, promenljiva širina). Naslovi u suženom rezu, fluidne
  veličine kroz `clamp()`, oznake sekcija u verzalu sa razmaknutim slovima.
- **Boje:** `oklch()` tokeni, bez čiste bele i crne, četiri nivoa teksta, ivice niske providnosti.
- **Ritam:** sekcije imaju različite razmake; pokretna traka sa sloganima i traka sa slikama idu
  od ivice do ivice, a kvalitet je složen u bento mrežu.
- **Kretanje:** jedna kriva (`power4.out`), otkrivanje jednom pri skrolu, glatki skrol (Lenis),
  traka čija brzina prati skrol, linija napretka, pratilac kursora i zaglavlje koje se sklanja pri
  skrolu naniže. Jedna biblioteka za animacije: Framer Motion.
- **Telefon:** kompaktne kartice proizvoda i traka sa glavnim akcijama u zoni palca.
- **Izostavljeno namerno:** uvodna animacija učitavanja (odlaže sadržaj na stranici čiji je cilj
  upit) i WebGL (nema koncept koji bi ga opravdao).

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
  KineticMarquee, SmoothScroll, CursorFollower, MobileActionBar
  ui/                   dijalog, polja, ikone, brojač, fotografija, znak brenda…
data/                   sadržaj i tekstovi
lib/                    jezik, validacija, slanje forme, pretraga, skrol
public/originals/       originalne slike brenda
```

## Pristupačnost i performanse

- Tastatura: preskakanje na sadržaj, vidljiv fokus, zamka za fokus u dijalozima, Escape zatvara.
- `prefers-reduced-motion`: pomeranja i skaliranja se gase, glatki skrol, pokretna traka i
  pratilac kursora se ne pokreću, a sadržaj ostaje isti.
- Bez pomeranja rasporeda: slike imaju zadat odnos stranica, font je lokalni, a poruke o greškama
  imaju rezervisan prostor.

## Font

Archivo (Omnibus-Type), SIL Open Font License 1.1. Tekst licence je u `app/fonts/Archivo-OFL.txt`.

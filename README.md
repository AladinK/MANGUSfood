# Magnus Food Industry — sajt

Sajt za Magnus Food Industry sa istim stranicama kao magnusfood.rs: Početna, O nama, Pešter,
Proizvodi (sa stranicom za svaki proizvod), Blog i Kontakt, plus politika privatnosti.
Interfejs je na srpskom i engleskom.

Next.js (App Router) · React · TypeScript · Tailwind CSS · Framer Motion

## Pokretanje

```bash
npm install
npm run dev        # razvoj, http://localhost:3000
npm run build      # produkciona verzija
npm run start      # pokretanje produkcione verzije
npm run typecheck  # provera tipova
```

Potreban je Node.js 20.9 ili noviji.

## Stranice

| Adresa | Sadržaj |
| --- | --- |
| `/` | Prvi ekran sa paralaksom, asortiman sa filmom, kvalitet i Pešter, B2B sa formom, Instagram, novosti, česta pitanja |
| `/o-nama` | Kompanija, procesi i oznake kvaliteta, proizvodnja u pet faza, tradicija, grupacija |
| `/pester` | Pešterska visoravan: uslovi, klima, razlika u osnovi, od izvora do proizvoda |
| `/proizvodi` | Ceo asortiman sa filterom i pretragom, i opis obe linije |
| `/proizvodi/[proizvod]` | Ambalaža, opis, specifikacija, upit za taj proizvod, proizvodi iz iste linije |
| `/blog`, `/blog/[članak]` | Četiri članka sa magnusfood.rs |
| `/kontakt` | Kontakt podaci, saradnja i forma za upit, česta pitanja |
| `/politika-privatnosti` | Nacrt politike privatnosti (ne indeksira se dok se ne potvrdi) |

Dugme „Zatraži ponudu“ na stranici proizvoda vodi na `/kontakt?proizvod=…#upit`, gde je forma
već popunjena tim proizvodom. „Zatraži katalog“ otvara isti dijalog sa svake stranice.

### Stare adrese

Adrese sa starog WordPress sajta trajno (308) vode na nove, da linkovi i pozicije u pretrazi ne
propadnu: `/home-agriculture` → `/pester`, `/magnus-proizvodi` → `/proizvodi`,
`/privacy-policy` → `/politika-privatnosti`, `/category/novosti` → `/blog`, a stare adrese
članaka na nove (`legacyPath` u `data/blog.ts`). Spisak je u `next.config.ts`.

## Početna: paralaksa i film sa proizvodima

Početna nosi redizajn iz PR #1: scena sa paralaksom, brojke koje se odbrojavaju, asortiman sa
filmom i karticama sa oznakom „500 g · −18 °C“ (vode na stranice proizvoda), kvalitet sa
fotografijama Peštera i fazama proizvodnje, B2B sa formom za upit, Instagram, novosti i česta
pitanja. Unutrašnje stranice dele iste stilove (tipografija, dugmad, kartice). Zaglavlje je
providno preko tamnog početka stranice (scena na početnoj, tamna zaglavlja unutrašnjih
stranica), tamno staklo dok je taj deo ispod njega, a svetla traka posle.

**Prvi ekran** je scena u tri sloja („od Peštera do trpeze“): pejzaž Pešterske visoravni preko
celog ekrana, naslov sa akcijama i prava pakovanja (providne fotografije) u prvom planu. Pri
skrolu svaki sloj ima svoju brzinu (pejzaž najsporiji, pakovanja najbrža), a na računaru se
slojevi blago pomeraju i za mišem. Na telefonu su pakovanja ispod teksta, u toku stranice.
Velike fotografije (Pešter, HoReCa, katalog) imaju blagu paralaksu unutar okvira (`Photo` sa `parallax`).
Sve je `transform`, bez promene rasporeda; uz `prefers-reduced-motion` slojevi miruju.

**Film „Asortiman na traci“** stoji u asortimanu, iznad filtera. Deset pakovanja prolazi kroz kadar
kao na pokretnoj traci; uz svako stoje naziv, masa, „−18 °C“ i dve osobine iz kataloga. Traje
20 s, vrti se u petlji bez šava i nema zvuk.

- Izvor je u `video/` (Remotion) i čita `data/magnusData.ts`, pa nov proizvod ili promenjen
  naziv ulazi u film posle novog rendera.
- Dve verzije, široka (1920 × 880) za računar i uspravna (1080 × 1350) za telefon, na srpskom i
  engleskom; gotovi MP4 i posteri su u `public/video/`.
- Na sajtu se video ne preuzima dok se sekcija ne približi ekranu, pušta se samo dok je vidljiv,
  uz smanjeno kretanje ne kreće sam, a dugme ga pušta ili pauzira.

```bash
cd video
npm install
npm run dev          # Remotion Studio za pregled
npm run render:web   # renderuje sve četiri verzije i kopira ih u ../public/video
```

**Licenca:** Remotion je besplatan za timove do 3 osobe. Firma sa 4 ili više zaposlenih treba
Remotion Company License za pravljenje i renderovanje filma (remotion.dev/docs/license). Sajt
pušta gotov MP4, a ne Remotion Player.

## Gde se šta menja

| Šta | Gde |
| --- | --- |
| Proizvodi, specifikacije, kontakt, linkovi, navigacija, FAQ, B2B | `data/magnusData.ts` |
| Tekst stranica O nama, Pešter, Proizvodi, Kontakt, blokovi početne, politika privatnosti | `data/pages.ts` |
| Članci bloga (SR i EN) | `data/blog.ts` |
| Tekstovi interfejsa (dugmad, poruke, oznake) | `data/dictionary.ts` |
| Originalne slike | `public/originals` + spisak u `data/magnusData.ts` (`IMAGE_FILES`) |
| Boje i tipografija | `app/globals.css` (blok `@theme`) |
| Film sa asortimanom | `video/src/ProductReel.tsx`, render u `public/video/` |
| Metapodaci i JSON-LD po stranici | `lib/seo.ts` i `page.tsx` svake stranice |

## Sadržaj

Srpski tekst stranica i članaka preuzet je sa magnusfood.rs; naslovi su skraćeni, a rečenice
članaka spojene u pasuse. Engleski prevod je urađen za ovaj sajt.

Sve slike su originali koje je dostavio klijent. Neto količine, broj komada i vreme pečenja u
specifikacijama pročitani su sa ambalaže na slikama.

## Forme

Upit za saradnju i zahtev za katalog šalju se na `/api/inquiry`, koji podatke proverava i
prosleđuje kao JSON na adresu iz promenljive `INQUIRY_WEBHOOK_URL` (vidi `.env.example`).

- U razvoju, bez te promenljive, upit se ispisuje u konzoli servera i forma prikazuje potvrdu.
- U produkciji, bez te promenljive, forma prikazuje grešku i nudi slanje email-a, da posetilac
  ne dobije potvrdu za upit koji nikome nije stigao.

## Šta treba dopuniti

- **Politika privatnosti.** Tekst na starom sajtu je politika proizvođača WordPress teme
  (ThemeREX), ne Magnusova. Na novom sajtu je nacrt koji opisuje kako ovaj sajt obrađuje podatke;
  Magnus treba da ga potvrdi uz pravni savet, pa da ukloni oznaku nacrta (`PRIVACY.draft` u
  `data/pages.ts`) i `noindex` u `app/politika-privatnosti/page.tsx`.
- **Specifikacije.** Transportna pakovanja i rok trajanja nisu navedeni ni na sajtu ni na
  ambalaži. Ta polja su `null` i prikazuju se kao „U specifikaciji na upit“.
- **Instagram.** Sajt vodi na @magnus.food.industry, a stari sajt na @magnus.pester; potvrditi
  zvanični profil (`LINKS` u `data/magnusData.ts`).
- **Brojke sa Peštera.** Stari sajt ima brojače (nadmorska visina, prirodna ishrana, dani na
  otvorenom) čije se vrednosti ne vide u kodu stranice, pa nisu prenete.

## Struktura

```
app/
  layout.tsx              font, metapodaci sajta, Organization i WebSite JSON-LD, okvir
  page.tsx                početna
  o-nama/, pester/, proizvodi/, proizvodi/[slug]/, blog/, blog/[slug]/, kontakt/,
  politika-privatnosti/   stranice (metapodaci i JSON-LD u page.tsx)
  api/inquiry/route.ts    prijem upita i zahteva za katalog
  not-found.tsx, opengraph-image.tsx, robots.ts, sitemap.ts, icon.svg
components/
  SiteShell               zaglavlje, podnožje, traka na telefonu, dijalog za katalog
  pages/                  sadržaj unutrašnjih stranica
  home/                   blokovi početne
  Navbar, Footer, HeroSection, ProductReelVideo, QualitySection, ProductCatalogSection, ProductCard,
  PostCard, B2BFunnelSection, FaqSection, InstagramShowcaseSection, CatalogModal …
  ui/                     dijalog, polja, ikone, putanja, zaglavlje stranice, fotografija …
data/                     sadržaj i tekstovi
lib/                      jezik, validacija, slanje forme, pretraga, SEO
public/originals/         originalne slike brenda
public/video/             film sa asortimanom (MP4 i posteri)
video/                    Remotion projekat za film
```

## Pristupačnost i performanse

- Tastatura: preskakanje na sadržaj, vidljiv fokus, zamka za fokus u dijalozima, Escape zatvara,
  trenutna stranica označena u navigaciji i putanji (`aria-current`).
- `prefers-reduced-motion`: ulazna animacija prvog ekrana se ne pomera, a sadržaj ostaje isti.
- Bez pomeranja rasporeda: slike imaju zadat odnos stranica, font je lokalni, a poruke o greškama
  imaju rezervisan prostor.

## Font

Archivo (Omnibus-Type), SIL Open Font License 1.1. Tekst licence je u `app/fonts/Archivo-OFL.txt`.

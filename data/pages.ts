/**
 * Sadržaj stranica O nama, Pešter, Proizvodi i Kontakt i blokova na početnoj.
 *
 * Srpski tekst je preuzet sa odgovarajućih stranica na magnusfood.rs; naslovi
 * su skraćeni i bez tačke na kraju. Engleski prevod je urađen za ovaj sajt.
 * Politika privatnosti je nacrt: tekst sa starog sajta pripada proizvođaču
 * WordPress teme (ThemeREX), pa ga nismo preuzeli.
 */

import type { Localized } from "./magnusData";

const l = (sr: string, en: string): Localized => ({ sr, en });

export interface TitledText {
  title: Localized;
  body: Localized;
}

/* ------------------------------------------------------------------ */
/* Početna                                                             */
/* ------------------------------------------------------------------ */

export const HOME = {
  quality: {
    label: l("Pažljivo birane sirovine", "Carefully selected raw materials"),
    title: l("Kvalitet počinje pre proizvodnje", "Quality starts before production"),
    body: [
      l(
        "U Magnus Food-u verujemo da vrhunski proizvod ne nastaje u završnoj fazi, već na samom početku. Izbor sirovine predstavlja ključnu tačku koja određuje sve što dolazi nakon toga.",
        "At Magnus Food we believe a great product is not made at the final stage, but at the very beginning. The choice of raw material is the key point that decides everything that follows.",
      ),
      l(
        "Zato razvijamo proizvode polazeći od kvaliteta mesa i ostalih sastojaka, uz primenu strogo kontrolisanih proizvodnih procesa koji garantuju sigurnost, stabilnost i vrhunski ukus.",
        "That is why we develop products starting from the quality of the meat and the other ingredients, using strictly controlled production processes that guarantee safety, stability and great taste.",
      ),
    ],
    cta: l("Više o nama", "More about us"),
  },
  products: {
    label: l("Dve kategorije, jedan standard", "Two categories, one standard"),
    title: l("Deset proizvoda od mesa i testa", "Ten products, meat and dough"),
    intro: l(
      "Magnus Food portfolio razvijen je kroz dve ključne linije: brzo zamrznuto meso i brzo zamrznute proizvode od testa. Iako različite po karakteru, obe dele isti pristup: kvalitet sirovina, standardizovanu proizvodnju i dosledan rezultat u finalnom proizvodu.",
      "The Magnus Food range is built on two key lines: quick-frozen meat and quick-frozen dough products. Different in character, both share the same approach: quality raw materials, standardised production and a consistent result in the finished product.",
    ),
    cta: l("Svi proizvodi", "All products"),
  },
  pester: {
    title: l("Pešter, gde kvalitet počinje", "Pešter, where quality begins"),
    body: l(
      "Prirodni uslovi koji oblikuju kvalitet sirovine: klima, nadmorska visina i prirodna ishrana",
      "The natural conditions that shape the raw material: climate, altitude and natural feed",
    ),
    cta: l("Više o Pešteru", "More about Pešter"),
    alt: l("Pešterska visoravan u predvečerje, stado na pašnjaku", "The Pešter plateau at dusk, with cattle on the pasture"),
  },
  horeca: {
    label: l("HoReCa", "HoReCa"),
    title: l(
      "Konzistentan kvalitet i pouzdana isporuka za profesionalnu kuhinju",
      "Consistent quality and reliable delivery for the professional kitchen",
    ),
    body: [
      l(
        "U HoReCa sektoru, kvalitet proizvoda nije dovoljan ako nije stabilan i predvidiv. Zato Magnus Food razvija proizvode koji obezbeđuju isti rezultat svaki put, bez odstupanja u strukturi, ukusu ili performansama u pripremi.",
        "In the HoReCa sector, product quality is not enough unless it is stable and predictable. That is why Magnus Food develops products that give the same result every time, with no change in texture, taste or cooking performance.",
      ),
      l(
        "Standardizovana forma proizvoda omogućava jednostavnu pripremu, kontrolu porcija i optimalno upravljanje vremenom u kuhinji. Fokus na kvalitet sirovina, precizno definisani procesi i stroga kontrola standarda čine Magnus Food pouzdanim partnerom za restorane, hotele i catering sisteme.",
        "The standardised product format makes preparation simple, portions easy to control and kitchen time easier to plan. A focus on quality raw materials, precisely defined processes and strict control of standards make Magnus Food a dependable partner for restaurants, hotels and catering.",
      ),
    ],
    cta: l("Pošaljite upit", "Send an inquiry"),
    alt: l("Magnus juneća pljeskavica na roštilju", "Magnus beef pljeskavica on the grill"),
  },
  news: {
    label: l("Blog", "Blog"),
    title: l("Novosti", "News"),
    cta: l("Svi članci", "All articles"),
  },
} as const;

/* ------------------------------------------------------------------ */
/* O nama                                                              */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  title: l("Savremena tehnologija, tradicionalni rezultat", "Modern technology, traditional results"),
  intro: [
    l(
      "Magnus Food Industry je kompanija fokusirana na razvoj i proizvodnju premium prehrambenih proizvoda, zasnovanih na pažljivo odabranim sirovinama i strogo kontrolisanim proizvodnim procesima.",
      "Magnus Food Industry is a company focused on developing and producing premium food products, based on carefully selected raw materials and strictly controlled production processes.",
    ),
    l(
      "Naš pristup polazi od jednostavne ideje: kvalitet se ne stvara u završnoj fazi, već počinje izborom sirovine i dosledno se gradi kroz svaki korak proizvodnje.",
      "Our approach starts from a simple idea: quality is not created at the final stage. It begins with the choice of raw material and is built consistently through every step of production.",
    ),
  ],
  headerAlt: l(
    "Pakovanje Magnus pazarskih mantija i pečene mantije na drvenom stolu",
    "A pack of Magnus Pazar mantije and baked mantije on a wooden table",
  ),
  processes: {
    title: l(
      "Strogo definisani procesi za maksimalnu sigurnost i stabilnost",
      "Strictly defined processes for maximum safety and stability",
    ),
    body: [
      l(
        "Kombinovanjem tradicionalnih receptura i savremenih tehnologija razvijamo proizvode koji odgovaraju savremenim potrebama tržišta: autentičan ukus, pouzdan kvalitet i jednostavnu pripremu. Naš portfolio obuhvata linije brzo zamrznutog mesa i proizvoda od testa, za široku primenu, od svakodnevne upotrebe u domaćinstvima do profesionalnih zahteva HoReCa sektora.",
        "By combining traditional recipes with modern technology, we develop products that meet today's market: authentic taste, dependable quality and simple preparation. Our range covers quick-frozen meat and dough products for wide use, from everyday cooking at home to the professional demands of the HoReCa sector.",
      ),
      l(
        "Poslujući u skladu sa najvišim standardima bezbednosti i kvaliteta, uključujući HACCP i HALAL sisteme, Magnus Food Industry gradi poverenje kroz doslednost, kontrolu i dugoročnu posvećenost kvalitetu. Naš cilj nije samo da isporučimo proizvod, već da postavimo standard koji se prepoznaje i kojem se veruje.",
        "Working to the highest safety and quality standards, including the HACCP and HALAL systems, Magnus Food Industry builds trust through consistency, control and a long-term commitment to quality. Our goal is not only to deliver a product, but to set a standard that people recognise and trust.",
      ),
    ],
  },
  production: {
    label: l("Kontrola na svakom koraku", "Control at every step"),
    title: l("Proizvodnja", "Production"),
    body: [
      l(
        "Naša proizvodnja zasniva se na jasno definisanim standardima i procedurama koje obezbeđuju visok nivo kontrole u svim fazama procesa.",
        "Our production rests on clearly defined standards and procedures that keep every stage of the process under close control.",
      ),
      l(
        "Od prijema sirovina, preko obrade i formiranja proizvoda, do finalnog pakovanja, svaki korak je pod stalnim nadzorom i usklađen sa savremenim tehnološkim i bezbednosnim zahtevima.",
        "From receiving raw materials, through processing and forming, to final packaging, every step is under constant supervision and in line with modern technological and safety requirements.",
      ),
    ],
    burgersAlt: l("Juneći burgeri u pakovanju, iz proizvodnje", "Beef patties in their packaging, on the production line"),
    piesAlt: l("Pite u tepsijama pre pečenja", "Pies in baking trays before baking"),
  },
  tradition: {
    label: l("Tehnologija i tradicija", "Technology and tradition"),
    title: l(
      "Proverene recepture i savremeni proizvodni sistemi",
      "Proven recipes and modern production systems",
    ),
    items: [
      {
        title: l("Balans između kvaliteta i inovacije", "A balance of quality and innovation"),
        body: l(
          "Naši proizvodi nastaju kroz balans između tradicije i inovacije.",
          "Our products come from a balance between tradition and innovation.",
        ),
      },
      {
        title: l("Autentične recepture", "Authentic recipes"),
        body: l(
          "Oslanjamo se na autentične recepture koje čuvaju prepoznatljiv ukus domaće kuhinje, a koristimo savremene procese koji omogućavaju preciznost, efikasnost i potpunu kontrolu kvaliteta.",
          "We rely on authentic recipes that keep the familiar taste of home cooking, and we use modern processes that give precision, efficiency and full quality control.",
        ),
      },
      {
        title: l("Industrijski standardi", "Industrial standards"),
        body: l(
          "Ovaj spoj omogućava da svaki proizvod zadrži svoj karakter, uz istovremeno ispunjavanje visokih industrijskih standarda.",
          "This combination lets every product keep its character while meeting high industrial standards.",
        ),
      },
    ] satisfies ReadonlyArray<TitledText>,
    strengthsLabel: l("Šta to znači u praksi", "What that means in practice"),
    posterAlt: l(
      "Magnus plakat: 100% čista junetina u svakom zalogaju. Nije trik. Nije marketing. Samo stvarno dobro meso.",
      "Magnus poster: 100% pure beef in every bite. Not a trick. Not marketing. Just really good meat.",
    ),
    strengths: [
      l("Standardizovan kvalitet i forma proizvoda", "Standardised quality and product format"),
      l("100% juneće meso premium kvaliteta", "100% premium-quality beef"),
      l("Brza i jednostavna priprema", "Quick and simple preparation"),
      l("Stabilna isporuka i pouzdan lanac snabdevanja", "Steady delivery and a reliable supply chain"),
      l("Prilagođeno HoReCa operacijama", "Suited to HoReCa operations"),
    ],
  },
  consistency: {
    title: l("Konzistentnost kao standard", "Consistency as the standard"),
    lead: l(
      "Svaki proizvod je razvijen da isporuči isti kvalitet, bez odstupanja",
      "Every product is developed to deliver the same quality, without deviation",
    ),
    body: [
      l(
        "Kvalitet bez konzistentnosti nema realnu vrednost na tržištu. Zato su naši proizvodi razvijeni kroz procese koji obezbeđuju ujednačenost u strukturi, ukusu i performansama prilikom pripreme.",
        "Quality without consistency has no real value on the market. That is why our products are developed through processes that keep texture, taste and cooking performance uniform.",
      ),
      l(
        "Ovakav pristup omogućava pouzdanost, što je posebno važno za profesionalne kupce u HoReCa sektoru, ali i za krajnje potrošače koji očekuju isti kvalitet pri svakoj kupovini.",
        "This makes our products dependable, which matters especially to professional buyers in the HoReCa sector, and to customers who expect the same quality with every purchase.",
      ),
    ],
    photos: {
      burger: l(
        "Pakovanje Magnus Premium Burgera na stolu, u pozadini roštilj u dvorištu",
        "A Magnus Premium Burger pack on a table, with a garden barbecue behind",
      ),
      dough: l("Testo za mantije, posuto brašnom", "Dough for mantije, dusted with flour"),
      cevapi: l("Magnus pazarski ćevapi na tanjiru, uz pakovanje", "Magnus Pazar ćevapi on a plate, next to the pack"),
    },
  },
  market: {
    title: l("Razvijeno za realne potrebe tržišta", "Developed for what the market really needs"),
    lead: l(
      "Brza priprema uz zadržavanje punog ukusa i kvaliteta",
      "Quick preparation that keeps full taste and quality",
    ),
    body: [
      l(
        "Savremeni način života zahteva proizvode koji su praktični, ali i dalje visokog kvaliteta. Zato razvijamo proizvode koji omogućavaju jednostavnu i brzu pripremu, bez dodatnih koraka i bez kompromisa u finalnom rezultatu.",
        "Modern life calls for products that are practical but still of high quality. That is why we develop products that are quick and simple to prepare, with no extra steps and no compromise in the final result.",
      ),
      l(
        "„Ready-to-bake“ i „ready-to-cook“ koncepti omogućavaju korisnicima da u kratkom vremenu dobiju kvalitetan obrok, bez gubitka autentičnog ukusa.",
        "Our ready-to-bake and ready-to-cook products give people a good meal in a short time, without losing the authentic taste.",
      ),
    ],
    cta: l("Pogledajte proizvode", "See the products"),
    alt: l(
      "Pakovanje Magnus pazarske pite sa sirom i pečena pita",
      "A pack of Magnus Pazar cheese pie next to a baked pie",
    ),
  },
} as const;

/* ------------------------------------------------------------------ */
/* Pešter                                                              */
/* ------------------------------------------------------------------ */

export const PESTER = {
  title: l("Pešterska visoravan", "The Pešter plateau"),
  lead: l("Gde kvalitet počinje", "Where quality begins"),
  sub: l("Prirodan, stabilan i prepoznatljiv", "Natural, stable and recognisable"),
  headerAlt: l(
    "Pešterska visoravan u predvečerje, stado na pašnjaku",
    "The Pešter plateau at dusk, with cattle on the pasture",
  ),
  conditions: {
    title: l(
      "Jedinstveni prirodni uslovi koji oblikuju svaku sirovinu",
      "Unique natural conditions that shape every raw material",
    ),
    body: [
      l(
        "Pešterska visoravan predstavlja jedno od najočuvanijih i najautentičnijih prirodnih područja regiona. Prostrane livade, čist vazduh i specifična klima stvaraju uslove koji direktno utiču na kvalitet života i ishrane stoke.",
        "The Pešter plateau is one of the best-preserved and most authentic natural areas in the region. Wide meadows, clean air and a distinctive climate create conditions that directly shape how the cattle live and feed.",
      ),
      l(
        "U takvom okruženju nastaje sirovina koja nosi karakter: prirodan, stabilan i prepoznatljiv. Za Magnus Food, Pešter nije samo geografsko poreklo, već temelj na kojem gradimo kvalitet svakog proizvoda.",
        "In that environment the raw material gains its character: natural, stable and recognisable. For Magnus Food, Pešter is not just a place of origin, but the foundation on which we build the quality of every product.",
      ),
    ],
    streamAlt: l("Krave pored potoka na Pešterskoj visoravni", "Cattle by a stream on the Pešter plateau"),
    pastureAlt: l("Stado na pašnjaku Pešterske visoravni", "Cattle grazing on the Pešter plateau"),
  },
  climate: {
    label: l("Priroda koja se ne može replicirati", "Nature that can't be replicated"),
    title: l(
      "Kombinacija klime, nadmorske visine i prirodne ishrane",
      "Climate, altitude and natural feed together",
    ),
    body: [
      l(
        "Pešterska visoravan odlikuje se specifičnim klimatskim uslovima: hladnim zimama, svežim letima i velikim temperaturnim razlikama. Ovi faktori, u kombinaciji sa otvorenim prostorima i prirodnom ishranom, utiču na razvoj mesa koje se razlikuje po strukturi i ukusu.",
        "The Pešter plateau has a distinctive climate: cold winters, fresh summers and wide swings in temperature. Together with open land and natural feed, these factors produce meat that stands apart in texture and taste.",
      ),
      l(
        "Ovakvi uslovi ne mogu se veštački stvoriti niti industrijski imitirati. Upravo zato Pešter predstavlja prirodnu prednost koja daje realnu vrednost svakom proizvodu koji iz njega potiče.",
        "Conditions like these cannot be created artificially or imitated industrially. That is exactly why Pešter is a natural advantage that gives real value to every product that comes from it.",
      ),
    ],
    alt: l("Krave na pašnjacima Pešterske visoravni", "Cattle on the pastures of the Pešter plateau"),
  },
  core: {
    title: l("Razlika je u osnovi", "The difference is in the foundation"),
    items: [
      {
        title: l("Prirodno poreklo", "Natural origin"),
        body: l(
          "Kvalitet počinje tamo gde nastaje sirovina, u okruženju koje omogućava prirodan razvoj i autentične karakteristike mesa.",
          "Quality begins where the raw material comes from, in an environment that allows natural growth and gives the meat its authentic character.",
        ),
      },
      {
        title: l("Struktura i balans", "Texture and balance"),
        body: l(
          "Juneće meso karakteriše uravnotežen odnos masti i proteina, čvrsta ali sočna struktura i pun, prirodan ukus.",
          "The beef has a balanced ratio of fat to protein, a firm yet juicy texture and a full, natural taste.",
        ),
      },
      {
        title: l("Finalni proizvod", "The final product"),
        body: l(
          "Zato Magnus Food ne dodaje kvalitet, već ga prenosi kroz kontrolisan proces i standardizovanu proizvodnju.",
          "That is why Magnus Food does not add quality, it carries it through a controlled process and standardised production.",
        ),
      },
    ] satisfies ReadonlyArray<TitledText>,
  },
  source: {
    label: l("Od prirode do proizvoda", "From nature to product"),
    title: l(
      "Od izvora do proizvoda, bez gubitka kvaliteta",
      "From source to product, without losing quality",
    ),
    lead: l(
      "Magnus Food povezuje prirodno poreklo sa savremenom proizvodnjom kroz jasno definisan i kontrolisan proces.",
      "Magnus Food connects natural origin with modern production through a clearly defined, controlled process.",
    ),
    body: [
      l(
        "Naš cilj nije da menjamo sirovinu, već da očuvamo njen integritet i prenesemo njene prirodne karakteristike u finalni proizvod. Svaka faza proizvodnje, od selekcije, preko obrade, do pakovanja, razvijena je tako da minimizira gubitke i maksimalno zadrži kvalitet.",
        "Our aim is not to change the raw material, but to protect its integrity and carry its natural qualities into the final product. Every stage of production, from selection through processing to packaging, is designed to keep losses to a minimum and preserve as much quality as possible.",
      ),
      l(
        "U industriji gde se kvalitet često „koriguje“, naš pristup je drugačiji: mi ga čuvamo. Standardizacija kod nas ne znači uniformnost bez karaktera, već doslednost u isporuci vrhunskog rezultata.",
        "In an industry where quality is often “corrected”, our approach is different: we preserve it. For us, standardisation does not mean uniformity without character, but consistency in delivering a top result.",
      ),
      l(
        "Na taj način, kvalitet Peštera ne ostaje samo na početku lanca, već postaje sastavni deo svakog proizvoda koji izlazi iz naše proizvodnje.",
        "That way, the quality of Pešter does not stay at the start of the chain: it becomes part of every product that leaves our production.",
      ),
    ],
    alt: l("Magnus pazarski ćevapi na tanjiru, uz pakovanje", "Magnus Pazar ćevapi on a plate, next to the pack"),
    cta: l("Pogledajte proizvode", "See the products"),
    article: l("Pročitajte: Zašto poreklo mesa pravi razliku", "Read: Why the origin of meat makes a difference"),
  },
} as const;

/* ------------------------------------------------------------------ */
/* Proizvodi                                                           */
/* ------------------------------------------------------------------ */

export const PRODUCTS_PAGE = {
  title: l("Brzo zamrznuti proizvodi od mesa i testa", "Quick-frozen meat and dough products"),
  intro: l(
    "Obe linije nastaju po istom sistemu, pa svaki proizvod isporučuje ono što tržište očekuje: pouzdan kvalitet, jednostavnu pripremu i autentičan ukus.",
    "Both lines are made under the same system, so every product delivers what the market expects: dependable quality, simple preparation and authentic taste.",
  ),
  linesLabel: l("Dve kategorije, jedan standard", "Two categories, one standard"),
  linesTitle: l("Od sirovine do proizvoda, bez kompromisa", "From raw material to product, without compromise"),
  meatAlt: l("Magnus pazarski ćevapi na dasci, uz lepinju i crveni luk", "Magnus Pazar ćevapi on a board with flatbread and red onion"),
  doughAlt: l(
    "Pakovanje Magnus pazarskih mantija sa mesom, u pozadini krušna peć",
    "A pack of Magnus Pazar meat mantije, with a bread oven behind",
  ),
} as const;

/* ------------------------------------------------------------------ */
/* Kontakt                                                             */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  title: l("Razgovarajmo o saradnji", "Let's talk about working together"),
  intro: l(
    "Pozovite nas, pišite nam ili pošaljite upit preko forme. Odgovaramo radnim danima, od 9 do 17 časova.",
    "Call us, write to us or send an inquiry through the form. We reply on working days, 9:00 to 17:00.",
  ),
  detailsLabel: l("Kontakt podaci", "Contact details"),
  company: l("Kompanija", "Company"),
  social: l("Društvene mreže", "Social media"),
} as const;

/* ------------------------------------------------------------------ */
/* Politika privatnosti (nacrt)                                        */
/* ------------------------------------------------------------------ */

export interface PolicySection {
  title: Localized;
  body: ReadonlyArray<Localized>;
  list?: ReadonlyArray<Localized>;
}

export const PRIVACY = {
  title: l("Politika privatnosti", "Privacy policy"),
  draft: {
    title: l("Nacrt za proveru", "Draft for review"),
    body: l(
      "Tekst opisuje kako ovaj sajt obrađuje podatke. Pre objave ga potvrđuje Magnus Food Industry, uz pravni savet.",
      "This text describes how this site handles data. Magnus Food Industry confirms it, with legal advice, before publication.",
    ),
  },
  sections: [
    {
      title: l("Ko obrađuje podatke", "Who processes your data"),
      body: [
        l(
          "Rukovalac podacima je DOOHA International Group doo, Varevo br. 18, 36300 Novi Pazar, Republika Srbija, koja posluje pod brendom Magnus Food Industry. Za pitanja o podacima pišite na office@magnusfood.rs ili pozovite +381 20 510 20 30.",
          "The data controller is DOOHA International Group doo, Varevo br. 18, 36300 Novi Pazar, Republic of Serbia, trading as Magnus Food Industry. For questions about your data, write to office@magnusfood.rs or call +381 20 510 20 30.",
        ),
      ],
    },
    {
      title: l("Koje podatke prikupljamo", "What data we collect"),
      body: [
        l(
          "Podatke prikupljamo samo kada ih sami pošaljete preko formi na sajtu:",
          "We only collect data when you send it to us through the forms on this site:",
        ),
      ],
      list: [
        l(
          "Upit za saradnju: ime i prezime, naziv kompanije ili objekta, email, telefon, tip saradnje, poruka i proizvod na koji se upit odnosi.",
          "Cooperation inquiry: full name, company or venue name, email, phone, type of cooperation, message and the product the inquiry is about.",
        ),
        l(
          "Zahtev za katalog: ime i prezime, email, naziv kompanije ako ga navedete, način kupovine i linije proizvoda koje vas zanimaju.",
          "Catalog request: full name, email, company name if you give it, how you buy and the product lines you are interested in.",
        ),
      ],
    },
    {
      title: l("Kolačići i memorija pregledača", "Cookies and browser storage"),
      body: [
        l(
          "Sajt ne koristi kolačiće za praćenje ni alate za analitiku. Izabrani jezik, srpski ili engleski, pamti se samo u vašem pregledaču i ne šalje se nama.",
          "This site uses no tracking cookies or analytics tools. Your choice of language, Serbian or English, is stored only in your browser and is not sent to us.",
        ),
      ],
    },
    {
      title: l("Zašto obrađujemo podatke", "Why we process your data"),
      body: [
        l(
          "Podatke koristimo da odgovorimo na vaš upit, pošaljemo katalog i cenovnik i dogovorimo saradnju. Ne prodajemo ih i ne koristimo ih za oglašavanje.",
          "We use your data to answer your inquiry, send the catalog and price list and arrange cooperation. We do not sell it or use it for advertising.",
        ),
        l(
          "Obrada se zasniva na vašem zahtevu da pre zaključenja ugovora preduzmemo radnje koje ste tražili, u skladu sa Zakonom o zaštiti podataka o ličnosti („Službeni glasnik RS“, br. 87/2018).",
          "Processing is based on your request that we take the steps you asked for before entering into a contract, in line with the Serbian Law on Personal Data Protection (Official Gazette of the Republic of Serbia, No. 87/2018).",
        ),
      ],
    },
    {
      title: l("Ko ima pristup i koliko dugo čuvamo podatke", "Who has access and how long we keep data"),
      body: [
        l(
          "Podacima pristupaju zaposleni koji odgovaraju na upite. Poruke sa formi stižu preko pružaoca usluga email-a i hostinga sajta, koji ih obrađuje samo po našem nalogu.",
          "Your data is accessed by the staff who answer inquiries. Form messages reach us through our email and website hosting providers, who process them only on our instructions.",
        ),
        l(
          "Podatke čuvamo onoliko koliko je potrebno da odgovorimo na upit, a ako sarađujemo, za vreme trajanja saradnje i rokova koje propisuje zakon.",
          "We keep your data as long as we need it to answer your inquiry and, if we work together, for the duration of our cooperation and any period required by law.",
        ),
      ],
    },
    {
      title: l("Vaša prava", "Your rights"),
      body: [
        l("U vezi sa svojim podacima imate pravo na:", "You have the right to:"),
      ],
      list: [
        l("pristup podacima i kopiju podataka", "access your data and receive a copy"),
        l("ispravku netačnih podataka", "have inaccurate data corrected"),
        l("brisanje podataka", "have your data erased"),
        l("ograničenje obrade", "restrict processing"),
        l("prigovor na obradu", "object to processing"),
        l("prenosivost podataka", "data portability"),
      ],
    },
    {
      title: l("Kako da ostvarite prava", "How to exercise your rights"),
      body: [
        l(
          "Zahtev pošaljite na office@magnusfood.rs. Ako smatrate da su vaša prava povređena, možete podneti pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti, www.poverenik.rs.",
          "Send your request to office@magnusfood.rs. If you believe your rights have been breached, you can complain to the Commissioner for Information of Public Importance and Personal Data Protection, www.poverenik.rs.",
        ),
      ],
    },
  ] satisfies ReadonlyArray<PolicySection>,
} as const;

/**
 * Magnus Food Industry — sloj podataka.
 *
 * Sav sadržaj stranice (zvanični linkovi, kontakt, kategorije, proizvodi,
 * specifikacije, kvalitet, B2B, slike, FAQ) nalazi se u ovom fajlu.
 *
 * Izvori: https://magnusfood.rs i originalne slike i ambalaža koje je
 * dostavio klijent (neto količine, broj komada i tvrdnje sa pakovanja).
 *
 * Polja `packaging` i `shelfLife` su `null` jer ih ni sajt ni ambalaža na
 * slikama ne navode. Tada stranica prikazuje „U specifikaciji na upit“.
 */

/** Jezici sajta, redom kojim stoje u izboru jezika. Srpski je podrazumevani. */
export const LANGS = ["sr", "en", "de"] as const;
export type Lang = (typeof LANGS)[number];
export const isLang = (value: unknown): value is Lang =>
  typeof value === "string" && (LANGS as ReadonlyArray<string>).includes(value);
export type Localized = Readonly<Record<Lang, string>>;

/* ------------------------------------------------------------------ */
/* Zvanični kanali i podaci o kompaniji                                */
/* ------------------------------------------------------------------ */

export const LINKS = {
  site: "https://magnusfood.rs",
  siteLabel: "magnusfood.rs",
  instagram: "https://www.instagram.com/magnus.food.industry?hvrq=ZGI4YTh4dTVwc3N0",
  instagramHandle: "@magnus.food.industry",
  facebook: "https://www.facebook.com/magnus.food.industry",
  maps: "https://maps.app.goo.gl/rtiLdWTWZuQQwh87A",
} as const;

export const COMPANY = {
  brand: "Magnus Food Industry",
  shortBrand: "Magnus",
  legalName: "DOOHA International Group doo",
  tagline: {
    sr: "Moć tradicije u svakom zalogaju",
    en: "The power of tradition in every bite",
    de: "Die Kraft der Tradition in jedem Bissen",
  },
  summary: {
    sr: "Magnus Food Industry razvija i proizvodi brzo zamrznute proizvode od mesa i testa u Novom Pazaru, od pažljivo biranih sirovina i u strogo kontrolisanom procesu.",
    en: "Magnus Food Industry develops and produces quick-frozen meat and dough products in Novi Pazar, from carefully selected ingredients and under a strictly controlled process.",
    de: "Magnus Food Industry entwickelt und produziert in Novi Pazar schockgefrostete Fleisch- und Teigprodukte, aus sorgfältig ausgewählten Rohstoffen und in einem streng kontrollierten Prozess.",
  },
  address: {
    street: "Varevo br. 18",
    postalCode: "36300",
    city: "Novi Pazar",
    country: { sr: "Republika Srbija", en: "Republic of Serbia", de: "Republik Serbien" },
    countryCode: "RS",
  },
  phone: { display: "+381 20 510 20 30", href: "tel:+381205102030" },
  email: "office@magnusfood.rs",
  hours: {
    sr: "Ponedeljak–petak, 9–17 h",
    en: "Monday–Friday, 9:00–17:00",
    de: "Montag–Freitag, 9–17 Uhr",
  },
} as const satisfies Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* Originalne slike brenda                                             */
/* ------------------------------------------------------------------ */

/**
 * Sve slike su originali koje je dostavio klijent; nalaze se u
 * /public/originals. Fotografije ambalaže su PNG/WebP sa providnom pozadinom.
 */
const IMAGE_FILES = {
  logoGreen: "magnus-logo-green.svg",
  logoDark: "magnus-logo.svg",
  logoCompany: "magnus-food-industry-logo.svg",
  logoHoreca: "magnus-horeca.svg",
  qualityBadges: "oznake-kvaliteta.svg",

  packCevapi: "pack-pazarski-cevapi.webp",
  packBurger: "pack-premium-burger.webp",
  packPljeskavica: "pack-juneca-pljeskavica.webp",
  packKobasicaBela: "pack-bela-kobasica.webp",
  packKobasicaLjuta: "pack-ljuta-kobasica.webp",
  packMantije: "pack-pazarske-mantije.webp",
  packPitaMeso: "pack-pita-meso.webp",
  packPitaSir: "pack-pita-sir.webp",
  packPitaKrompir: "pack-pita-krompir.webp",
  packPitaSpanac: "pack-pita-spanac.webp",

  heroProducts: "hero-proizvodi.webp",
  burgerDark: "scena-burger-tamna.webp",
  pesterCows: "pester-krave.webp",
  pesterLandscape: "pester-pejzaz.webp",
  pesterHills: "pester-brda.webp",
  mantijeMaking: "mantije-priprema.webp",
  horecaGrill: "horeca-rostilj.webp",
  sceneBurger: "scena-burger.webp",
  sceneCevapi: "scena-cevapi.webp",
  sceneMantije: "scena-mantije.webp",
  sceneKobasica: "scena-kobasica.webp",
  production: "proizvodnja-burgeri.webp",
  productionPies: "proizvodnja-pite.webp",
  aboutPie: "o-nama-pita-sir.webp",
  aboutPoster: "o-nama-plakat.webp",
  dough: "testo-za-mantije.webp",
  pesterPasture: "pester-pasnjak.webp",
  pesterSunset: "pester-zalazak.webp",
  pesterStream: "pester-potok.webp",
  freezer: "zamrzivac-proizvodi.webp",
  cevapiBoard: "cevapi-tabla.webp",
  productsTable: "proizvodi-pester-sto.webp",
  mantijeTable: "mantije-sto.webp",
  burgerEvening: "burger-vece.webp",

  logoDohaGroup: "doha-group.svg",
  logoDohaInvest: "doha-invest.svg",
} as const;

export type MediaKey = keyof typeof IMAGE_FILES;

export const media = (key: MediaKey): string => `/originals/${IMAGE_FILES[key]}`;

/**
 * Logo „Magnus Food“ (zeleni oval) čita se i na svetloj i na tamnoj podlozi.
 * Ako se fajl ne učita, prikazuje se tipografski znak.
 */
export const BRAND_ASSETS: { logoOnLight: string | null; logoOnDark: string | null } = {
  logoOnLight: media("logoGreen"),
  logoOnDark: media("logoGreen"),
};

/** Fotografije i znakovi uz sekcije */
export const SECTION_MEDIA = {
  /** Pozadina početnog ekrana: pejzaž Peštera preko cele širine */
  hero: media("pesterLandscape"),
  sourcingA: media("pesterHills"),
  sourcingB: media("mantijeMaking"),
  pester: media("pesterCows"),
  horeca: media("horecaGrill"),
  catalogCta: media("burgerDark"),
  logoCompany: media("logoCompany"),
  logoHoreca: media("logoHoreca"),
  qualityBadges: media("qualityBadges"),
} as const;

/** Grupacija kojoj Magnus pripada (tekst sa početne stranice magnusfood.rs) */
export const GROUP = {
  label: { sr: "Naša grupacija", en: "Our group", de: "Unsere Gruppe" },
  name: "Doha Group",
  body: {
    sr: "Doha Group je poslovna grupacija iz Novog Pazara, aktivna u ugostiteljstvu, prehrambenoj industriji, investicijama i nekretninama. Obuhvata Doha Restoran, Magnus Food i Doha Invest, fokusiranu na razvoj poslovnih i stambenih objekata. Kroz podršku sportskim klubovima i lokalnim manifestacijama, Doha Group pokazuje svoju posvećenost zajednici.",
    en: "Doha Group is a business group from Novi Pazar, active in hospitality, the food industry, investment and real estate. It includes Doha Restoran, Magnus Food and Doha Invest, which focuses on developing commercial and residential buildings. Through its support for sports clubs and local events, Doha Group shows its commitment to the community.",
    de: "Die Doha Group ist eine Unternehmensgruppe aus Novi Pazar, tätig in Gastronomie, Lebensmittelindustrie, Investitionen und Immobilien. Zu ihr gehören das Doha Restoran, Magnus Food und Doha Invest, das Geschäfts- und Wohngebäude entwickelt. Mit der Unterstützung von Sportvereinen und lokalen Veranstaltungen zeigt die Doha Group ihr Engagement für die Gemeinschaft.",
  },
  logo: media("logoDohaGroup"),
  members: [
    { name: "Doha Restoran", href: "https://doharestoran.rs/", logo: null },
    { name: "Doha Invest", href: "https://www.dohainvest.rs/", logo: media("logoDohaInvest") },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Navigacija                                                          */
/* ------------------------------------------------------------------ */

export type PageId = "pocetna" | "o-nama" | "pester" | "proizvodi" | "blog" | "kontakt";

export interface NavItem {
  id: PageId;
  href: string;
  label: Localized;
}

/** Iste stranice i isti redosled kao na magnusfood.rs */
export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { id: "pocetna", href: "/", label: { sr: "Početna", en: "Home", de: "Start" } },
  { id: "o-nama", href: "/o-nama", label: { sr: "O nama", en: "About us", de: "Über uns" } },
  { id: "pester", href: "/pester", label: { sr: "Pešter", en: "Pešter", de: "Pešter" } },
  {
    id: "proizvodi",
    href: "/proizvodi",
    label: { sr: "Proizvodi", en: "Products", de: "Produkte" },
  },
  { id: "blog", href: "/blog", label: { sr: "Blog", en: "Blog", de: "Blog" } },
  { id: "kontakt", href: "/kontakt", label: { sr: "Kontakt", en: "Contact", de: "Kontakt" } },
];

export const navLabel = (id: PageId): Localized =>
  NAV_ITEMS.find((item) => item.id === id)?.label ?? NAV_ITEMS[0].label;

export const ROUTES = {
  home: "/",
  about: "/o-nama",
  pester: "/pester",
  products: "/proizvodi",
  blog: "/blog",
  contact: "/kontakt",
  privacy: "/politika-privatnosti",
} as const;

/** Sidro forme za upit na stranici Kontakt */
export const INQUIRY_ANCHOR = "upit";

export const productHref = (id: string): string => `${ROUTES.products}/${id}`;

/** Link ka formi za upit; sa proizvodom, forma se popunjava tim proizvodom */
export const inquiryHref = (productId?: string): string =>
  productId
    ? `${ROUTES.contact}?proizvod=${encodeURIComponent(productId)}#${INQUIRY_ANCHOR}`
    : `${ROUTES.contact}#${INQUIRY_ANCHOR}`;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export interface Metric {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: Localized;
}

export const HERO_METRICS: ReadonlyArray<Metric> = [
  {
    id: "junetina",
    value: 100,
    suffix: "%",
    label: {
      sr: "junetina u svakom proizvodu od mesa",
      en: "beef in every meat product",
      de: "Rindfleisch in jedem Fleischprodukt",
    },
  },
  {
    id: "asortiman",
    value: 10,
    label: {
      sr: "proizvoda u dve linije",
      en: "products across two lines",
      de: "Produkte in zwei Linien",
    },
  },
  {
    id: "standardi",
    value: 2,
    label: {
      sr: "standarda: HACCP i HALAL",
      en: "standards: HACCP and HALAL",
      de: "Standards: HACCP und HALAL",
    },
  },
  {
    id: "zamrzavanje",
    value: 18,
    prefix: "−",
    suffix: " °C",
    label: {
      sr: "brzo zamrzavanje odmah posle proizvodnje",
      en: "quick-freezing right after production",
      de: "Schockfrosten direkt nach der Produktion",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Kategorije i proizvodi                                              */
/* ------------------------------------------------------------------ */

export type CategoryId = "meso" | "testo";

export interface Category {
  id: CategoryId;
  name: Localized;
  short: Localized;
  lead: Localized;
  /** Naslov linije na stranici Proizvodi */
  heading: Localized;
  /** Opis linije sa stranice Proizvodi na magnusfood.rs */
  story: ReadonlyArray<Localized>;
}

export const CATEGORIES: ReadonlyArray<Category> = [
  {
    id: "meso",
    name: { sr: "Brzo zamrznuto meso", en: "Quick-frozen meat", de: "Schockgefrostetes Fleisch" },
    short: { sr: "Meso", en: "Meat", de: "Fleisch" },
    lead: {
      sr: "100% junetina, spremna za roštilj.",
      en: "100% beef, ready for the grill.",
      de: "100 % Rindfleisch, bereit für den Grill.",
    },
    heading: { sr: "Proizvodi od mesa", en: "Meat products", de: "Fleischprodukte" },
    story: [
      {
        sr: "Linija mesnih proizvoda zasniva se na 100% junećem mesu vrhunskog kvaliteta, uz kontrolisanu proizvodnju i autentične recepte koji obezbeđuju pun ukus i konzistentan kvalitet.",
        en: "The meat line is built on 100% top-quality beef, with controlled production and authentic recipes that deliver full flavour and consistent quality.",
        de: "Die Fleischlinie basiert auf 100 % Rindfleisch bester Qualität, mit kontrollierter Produktion und authentischen Rezepturen, die vollen Geschmack und gleichbleibende Qualität sichern.",
      },
      {
        sr: "Pazarski ćevapi donose tradicionalan, prepoznatljiv ukus, pljeskavice nude sočnost i bogatu strukturu, burgeri su izrađeni isključivo od mesa, soli i bibera, dok su juneće kobasice dostupne u ljutoj i neljutoj varijanti.",
        en: "Pazar ćevapi bring a traditional, recognisable taste, the pljeskavica offers juiciness and a rich texture, the burgers are made only from meat, salt and pepper, and the beef sausages come in hot and mild varieties.",
        de: "Pazar-Ćevapi bringen einen traditionellen, unverwechselbaren Geschmack, die Pljeskavica bietet Saftigkeit und eine reiche Struktur, die Burger bestehen ausschließlich aus Fleisch, Salz und Pfeffer, und die Rinderwürste gibt es in einer scharfen und einer milden Variante.",
      },
      {
        sr: "Proizvodi se brzo zamrzavaju na −18 °C odmah nakon proizvodnje, čime se čuvaju nutritivne vrednosti i prirodan ukus mesa, uz kvalitet u skladu sa HACCP i HALAL standardima.",
        en: "The products are quick-frozen at −18 °C right after production, which preserves the nutritional value and natural taste of the meat, with quality in line with HACCP and HALAL standards.",
        de: "Die Produkte werden direkt nach der Produktion bei −18 °C schockgefrostet. So bleiben die Nährwerte und der natürliche Geschmack des Fleisches erhalten, bei einer Qualität nach den Standards HACCP und HALAL.",
      },
    ],
  },
  {
    id: "testo",
    name: { sr: "Brzo zamrznuto testo", en: "Quick-frozen dough", de: "Schockgefrosteter Teig" },
    short: { sr: "Testo", en: "Dough", de: "Teig" },
    lead: {
      sr: "Pite i mantije u ready-to-bake pakovanju.",
      en: "Pies and mantije in ready-to-bake packs.",
      de: "Pitas und Mantije in backfertiger Verpackung.",
    },
    heading: { sr: "Zamrznuto testo", en: "Frozen dough", de: "Tiefgekühlter Teig" },
    story: [
      {
        sr: "Naša linija proizvoda od testa spaja tradicionalne recepte i savremeni način života, nudeći autentičan ukus domaće kuhinje uz maksimalnu praktičnost pripreme.",
        en: "Our dough line brings together traditional recipes and modern life, offering the authentic taste of home cooking with the most practical preparation.",
        de: "Unsere Teiglinie verbindet traditionelle Rezepte mit dem modernen Alltag und bietet den authentischen Geschmack der Hausmannskost bei besonders einfacher Zubereitung.",
      },
      {
        sr: "Mantije sa mesom odlikuju se bogatim i sočnim punjenjem, pita sa mesom punim i autentičnim ukusom, pita sa sirom kremastom teksturom, dok pita sa spanaćem i krompirom donose laganije i tradicionalne varijante.",
        en: "The meat mantije have a rich, juicy filling, the meat pie a full and authentic taste and the cheese pie a creamy texture, while the spinach and potato pies are the lighter, traditional options.",
        de: "Die Mantije mit Fleisch zeichnen sich durch eine reichhaltige, saftige Füllung aus, die Pita mit Fleisch durch vollen, authentischen Geschmack und die Pita mit Käse durch eine cremige Textur, während die Pitas mit Spinat und mit Kartoffeln die leichteren, traditionellen Varianten sind.",
      },
      {
        sr: "Svi proizvodi dolaze u „ready-to-bake“ pakovanju, omogućavajući brzu i jednostavnu pripremu bez kompromisa u kvalitetu.",
        en: "Every product comes in a ready-to-bake pack, for quick and simple preparation with no compromise on quality.",
        de: "Alle Produkte kommen in einer backfertigen Verpackung und lassen sich schnell und einfach zubereiten, ohne Kompromisse bei der Qualität.",
      },
    ],
  },
];

export type GlyphKind = "cevapi" | "burger" | "pljeskavica" | "kobasica" | "mantije" | "pita";

export interface ProductSpecs {
  /** Osnova proizvoda */
  base: Localized;
  /** Način pripreme */
  preparation: Localized;
  /** Zamrzavanje i čuvanje */
  storage: Localized;
  /** Format pakovanja — null: na upit */
  packaging: Localized | null;
  /** Neto masa i broj komada — null: na upit */
  netWeight: Localized | null;
  /** Rok trajanja — null: na upit */
  shelfLife: Localized | null;
  /** Kome je proizvod dostupan */
  availability: Localized;
  standards: ReadonlyArray<string>;
}

export interface Product {
  id: string;
  category: CategoryId;
  name: Localized;
  description: Localized;
  /** Opis sa stranice Proizvodi na magnusfood.rs, za stranicu proizvoda */
  story: Localized;
  highlights: ReadonlyArray<Localized>;
  glyph: GlyphKind;
  /** Boja akcenta na ilustraciji (nadev, začin) */
  accent: string;
  imageSrc: string | null;
  specs: ProductSpecs;
}

const STANDARDS = ["HACCP", "HALAL"] as const;

const MEAT_PREPARATION: Localized = {
  sr: "Ready-to-cook: spremno za roštilj.",
  en: "Ready to cook: made for the grill.",
  de: "Ready-to-cook: bereit für den Grill.",
};
const MEAT_WEIGHT: Localized = { sr: "500 g", en: "500 g", de: "500 g" };
const PIE_WEIGHT: Localized = { sr: "600 g", en: "600 g", de: "600 g" };
const MEAT_STORAGE: Localized = {
  sr: "Brzo zamrznuto na −18 °C odmah posle proizvodnje. Čuvati zamrznuto do pripreme.",
  en: "Quick-frozen at −18 °C right after production. Keep frozen until preparation.",
  de: "Direkt nach der Produktion bei −18 °C schockgefrostet. Bis zur Zubereitung tiefgekühlt lagern.",
};
const DOUGH_PREPARATION: Localized = {
  sr: "Ready-to-bake: 25–30 minuta u rerni. Temperatura je navedena na pakovanju.",
  en: "Ready to bake: 25–30 minutes in the oven. The temperature is stated on the pack.",
  de: "Backfertig: 25–30 Minuten im Backofen. Die Temperatur steht auf der Verpackung.",
};
const DOUGH_STORAGE: Localized = {
  sr: "Brzo zamrznuto. Čuvati zamrznuto do pečenja, prema uputstvu na deklaraciji.",
  en: "Quick-frozen. Keep frozen until baking, following the instructions on the label.",
  de: "Schockgefrostet. Bis zum Backen tiefgekühlt lagern, gemäß den Angaben auf dem Etikett.",
};
const DOUGH_PACKAGING: Localized = {
  sr: "Ready-to-bake pakovanje",
  en: "Ready-to-bake pack",
  de: "Backfertige Verpackung",
};
const AVAILABILITY: Localized = {
  sr: "Za domaćinstva i HoReCa. Ponuda za maloprodaju, veleprodaju i distribuciju na upit.",
  en: "For households and HoReCa. Quotes for retail, wholesale and distribution on request.",
  de: "Für Haushalte und HoReCa. Angebote für Einzelhandel, Großhandel und Distribution auf Anfrage.",
};
const BEEF_BASE: Localized = {
  sr: "100% čisto juneće meso sa Pešterske visoravni",
  en: "100% pure beef from the Pešter plateau",
  de: "100 % reines Rindfleisch von der Pešter-Hochebene",
};

const meatSpecs = (overrides: Partial<ProductSpecs> = {}): ProductSpecs => ({
  base: BEEF_BASE,
  preparation: MEAT_PREPARATION,
  storage: MEAT_STORAGE,
  packaging: null,
  netWeight: MEAT_WEIGHT,
  shelfLife: null,
  availability: AVAILABILITY,
  standards: STANDARDS,
  ...overrides,
});

const doughSpecs = (base: Localized, overrides: Partial<ProductSpecs> = {}): ProductSpecs => ({
  base,
  preparation: DOUGH_PREPARATION,
  storage: DOUGH_STORAGE,
  packaging: DOUGH_PACKAGING,
  netWeight: PIE_WEIGHT,
  shelfLife: null,
  availability: AVAILABILITY,
  standards: STANDARDS,
  ...overrides,
});

export const PRODUCTS: ReadonlyArray<Product> = [
  {
    id: "pazarski-cevapi",
    category: "meso",
    name: { sr: "Magnus pazarski ćevapi", en: "Magnus Pazar ćevapi", de: "Magnus Pazar-Ćevapi" },
    description: {
      sr: "Autentičan pazarski specijalitet od 100% junetine, po tradicionalnoj recepturi prepoznatljivog ukusa.",
      en: "An authentic Novi Pazar specialty made from 100% beef, to a traditional recipe with an unmistakable taste.",
      de: "Eine authentische Spezialität aus Novi Pazar aus 100 % Rindfleisch, nach traditioneller Rezeptur mit unverwechselbarem Geschmack.",
    },
    story: {
      sr: "Autentičan specijalitet vrhunskog kvaliteta. Pazarski ćevapi izrađeni su od 100% junećeg mesa najvišeg kvaliteta, po tradicionalnoj recepturi koja garantuje prepoznatljiv ukus i vrhunski gastronomski doživljaj.",
      en: "An authentic specialty of the highest quality. Pazar ćevapi are made from 100% top-quality beef, to a traditional recipe that guarantees a recognisable taste and a first-class meal.",
      de: "Eine authentische Spezialität von höchster Qualität. Pazar-Ćevapi werden aus 100 % Rindfleisch bester Qualität hergestellt, nach einer traditionellen Rezeptur, die unverwechselbaren Geschmack und ein erstklassiges Geschmackserlebnis garantiert.",
    },
    highlights: [
      { sr: "100% junetina", en: "100% beef", de: "100 % Rindfleisch" },
      { sr: "Tradicionalna receptura", en: "Traditional recipe", de: "Traditionelle Rezeptur" },
      { sr: "500 g", en: "500 g", de: "500 g" },
    ],
    glyph: "cevapi",
    accent: "#8f3b2e",
    imageSrc: media("packCevapi"),
    specs: meatSpecs(),
  },
  {
    id: "premium-burger",
    category: "meso",
    name: { sr: "Magnus Premium Burger", en: "Magnus Premium Burger", de: "Magnus Premium Burger" },
    description: {
      sr: "Burger od 100% junetine po posebnoj recepturi. U njemu su samo meso, so i biber.",
      en: "A burger made from 100% beef to its own recipe. It contains only meat, salt and pepper.",
      de: "Ein Burger aus 100 % Rindfleisch nach eigener Rezeptur. Er enthält nur Fleisch, Salz und Pfeffer.",
    },
    story: {
      sr: "Čisto meso, vrhunski ukus, bez kompromisa. Burgeri su izrađeni od 100% junećeg mesa najvišeg kvaliteta, po posebnoj recepturi koja garantuje autentičan, prirodan ukus mesa.",
      en: "Pure meat, superb taste, no compromise. The burgers are made from 100% top-quality beef, to a special recipe that guarantees the authentic, natural taste of the meat.",
      de: "Reines Fleisch, erstklassiger Geschmack, keine Kompromisse. Die Burger werden aus 100 % Rindfleisch bester Qualität hergestellt, nach einer besonderen Rezeptur, die den authentischen, natürlichen Fleischgeschmack garantiert.",
    },
    highlights: [
      { sr: "100% junetina", en: "100% beef", de: "100 % Rindfleisch" },
      {
        sr: "Samo meso, so i biber",
        en: "Only meat, salt and pepper",
        de: "Nur Fleisch, Salz und Pfeffer",
      },
      { sr: "500 g, 3 komada", en: "500 g, 3 patties", de: "500 g, 3 Stück" },
    ],
    glyph: "burger",
    accent: "#8f3b2e",
    imageSrc: media("packBurger"),
    specs: meatSpecs({
      base: {
        sr: "100% čisto juneće meso sa Pešterske visoravni, so i biber",
        en: "100% pure beef from the Pešter plateau, salt and pepper",
        de: "100 % reines Rindfleisch von der Pešter-Hochebene, Salz und Pfeffer",
      },
      netWeight: { sr: "500 g, 3 komada", en: "500 g, 3 patties", de: "500 g, 3 Stück" },
    }),
  },
  {
    id: "juneca-pljeskavica",
    category: "meso",
    name: {
      sr: "Magnus juneća pljeskavica",
      en: "Magnus beef pljeskavica",
      de: "Magnus Rindfleisch-Pljeskavica",
    },
    description: {
      sr: "Sočna pljeskavica punog ukusa od 100% junetine, sa pažljivo izbalansiranim odnosom sastojaka.",
      en: "A juicy, full-flavoured pljeskavica made from 100% beef, with a carefully balanced ratio of ingredients.",
      de: "Eine saftige, vollmundige Pljeskavica aus 100 % Rindfleisch, mit sorgfältig abgestimmtem Verhältnis der Zutaten.",
    },
    story: {
      sr: "Savršen izbor za sve koji traže vrhunski ukus bez kompromisa. Pljeskavice su izrađene od 100% junećeg mesa najvišeg kvaliteta, uz pažljivo odabran odnos sastojaka koji obezbeđuje sočnost, bogat ukus i vrhunski kvalitet u svakom zalogaju.",
      en: "The right choice for anyone who wants great taste without compromise. The pljeskavica is made from 100% top-quality beef, with a carefully chosen balance of ingredients that gives juiciness, rich flavour and top quality in every bite.",
      de: "Die richtige Wahl für alle, die erstklassigen Geschmack ohne Kompromisse suchen. Die Pljeskavica wird aus 100 % Rindfleisch bester Qualität hergestellt, mit einem sorgfältig gewählten Verhältnis der Zutaten, das Saftigkeit, reichen Geschmack und höchste Qualität in jedem Bissen sichert.",
    },
    highlights: [
      { sr: "100% junetina", en: "100% beef", de: "100 % Rindfleisch" },
      { sr: "Sočna, punog ukusa", en: "Juicy and full-flavoured", de: "Saftig und vollmundig" },
      { sr: "500 g", en: "500 g", de: "500 g" },
    ],
    glyph: "pljeskavica",
    accent: "#8f3b2e",
    imageSrc: media("packPljeskavica"),
    specs: meatSpecs(),
  },
  {
    id: "bela-rostiljska-kobasica",
    category: "meso",
    name: {
      sr: "Magnus bela roštiljska kobasica",
      en: "Magnus mild grill sausage",
      de: "Magnus Milde Grillwurst",
    },
    description: {
      sr: "Roštiljska kobasica od 100% junetine, u blagoj varijanti.",
      en: "A grill sausage made from 100% beef, in the mild variety.",
      de: "Eine Grillwurst aus 100 % Rindfleisch, in der milden Variante.",
    },
    story: {
      sr: "Pun ukus, vrhunski kvalitet i izbor po meri svakog potrošača. Juneće roštiljske kobasice izrađene su od 100% junećeg mesa najvišeg kvaliteta, prema posebnoj recepturi koja garantuje intenzivan ukus, sočnost i vrhunski kvalitet u svakom zalogaju.",
      en: "Full flavour, top quality and a choice to suit every customer. The beef grill sausages are made from 100% top-quality beef, to a special recipe that guarantees an intense taste, juiciness and top quality in every bite.",
      de: "Voller Geschmack, höchste Qualität und eine Auswahl für jeden Geschmack. Die Rinder-Grillwürste werden aus 100 % Rindfleisch bester Qualität hergestellt, nach einer besonderen Rezeptur, die intensiven Geschmack, Saftigkeit und höchste Qualität in jedem Bissen garantiert.",
    },
    highlights: [
      { sr: "100% junetina", en: "100% beef", de: "100 % Rindfleisch" },
      { sr: "Blaga", en: "Mild", de: "Mild" },
      { sr: "500 g", en: "500 g", de: "500 g" },
    ],
    glyph: "kobasica",
    accent: "#c98f6b",
    imageSrc: media("packKobasicaBela"),
    specs: meatSpecs(),
  },
  {
    id: "ljuta-rostiljska-kobasica",
    category: "meso",
    name: {
      sr: "Magnus ljuta roštiljska kobasica",
      en: "Magnus hot grill sausage",
      de: "Magnus Scharfe Grillwurst",
    },
    description: {
      sr: "Roštiljska kobasica od 100% junetine, u ljutoj varijanti.",
      en: "A grill sausage made from 100% beef, in the hot variety.",
      de: "Eine Grillwurst aus 100 % Rindfleisch, in der scharfen Variante.",
    },
    story: {
      sr: "Pun ukus, vrhunski kvalitet i izbor po meri svakog potrošača. Juneće roštiljske kobasice izrađene su od 100% junećeg mesa najvišeg kvaliteta, prema posebnoj recepturi koja garantuje intenzivan ukus, sočnost i vrhunski kvalitet u svakom zalogaju.",
      en: "Full flavour, top quality and a choice to suit every customer. The beef grill sausages are made from 100% top-quality beef, to a special recipe that guarantees an intense taste, juiciness and top quality in every bite.",
      de: "Voller Geschmack, höchste Qualität und eine Auswahl für jeden Geschmack. Die Rinder-Grillwürste werden aus 100 % Rindfleisch bester Qualität hergestellt, nach einer besonderen Rezeptur, die intensiven Geschmack, Saftigkeit und höchste Qualität in jedem Bissen garantiert.",
    },
    highlights: [
      { sr: "100% junetina", en: "100% beef", de: "100 % Rindfleisch" },
      { sr: "Ljuta", en: "Hot", de: "Scharf" },
      { sr: "500 g", en: "500 g", de: "500 g" },
    ],
    glyph: "kobasica",
    accent: "#b8321f",
    imageSrc: media("packKobasicaLjuta"),
    specs: meatSpecs(),
  },
  {
    id: "pazarske-mantije",
    category: "testo",
    name: { sr: "Magnus pazarske mantije", en: "Magnus Pazar mantije", de: "Magnus Pazar-Mantije" },
    description: {
      sr: "Mantije sa mesom, bogatog i sočnog nadeva, u pakovanju spremnom za pečenje.",
      en: "Meat-filled mantije with a rich, juicy filling, packed ready to bake.",
      de: "Mantije mit Fleisch, mit reichhaltiger, saftiger Füllung, in backfertiger Verpackung.",
    },
    story: {
      sr: "Mantije sa mesom predstavljaju spoj tradicije i savremenog načina života, idealne za sve koji žele kvalitetan, ukusan i brzo pripremljen obrok. Naše mantije sa mesom izrađene su od pažljivo odabranih sastojaka, sa bogatim i sočnim punjenjem koje garantuje vrhunski gastronomski doživljaj.",
      en: "Meat mantije bring tradition together with modern life, made for anyone who wants a good, tasty meal that is quick to prepare. Our meat mantije are made from carefully selected ingredients, with a rich, juicy filling that guarantees a first-class meal.",
      de: "Mantije mit Fleisch verbinden Tradition und modernen Alltag, ideal für alle, die eine hochwertige, schmackhafte und schnell zubereitete Mahlzeit möchten. Unsere Mantije mit Fleisch werden aus sorgfältig ausgewählten Zutaten hergestellt, mit einer reichhaltigen, saftigen Füllung, die ein erstklassiges Geschmackserlebnis garantiert.",
    },
    highlights: [
      { sr: "Nadev od mesa", en: "Meat filling", de: "Fleischfüllung" },
      { sr: "600 g, 20 komada", en: "600 g, 20 pieces", de: "600 g, 20 Stück" },
      { sr: "Ready-to-bake", en: "Ready to bake", de: "Backfertig" },
    ],
    glyph: "mantije",
    accent: "#8f3b2e",
    imageSrc: media("packMantije"),
    specs: doughSpecs(
      {
        sr: "Testo sa nadevom od mesa",
        en: "Dough with a meat filling",
        de: "Teig mit Fleischfüllung",
      },
      { netWeight: { sr: "600 g, 20 komada", en: "600 g, 20 pieces", de: "600 g, 20 Stück" } },
    ),
  },
  {
    id: "pita-sa-mesom",
    category: "testo",
    name: {
      sr: "Magnus pazarska pita sa mesom",
      en: "Magnus Pazar pie with meat",
      de: "Magnus Pazar-Pita mit Fleisch",
    },
    description: {
      sr: "Pita sa mesom punog, autentičnog ukusa.",
      en: "A meat pie with a full, authentic flavour.",
      de: "Eine Pita mit Fleisch, mit vollem, authentischem Geschmack.",
    },
    story: {
      sr: "Pita sa mesom predstavlja vrhunski proizvod tradicionalne kuhinje, izrađen od pažljivo odabranih, najkvalitetnijih sirovina. Bogato i sočno punjenje obezbeđuje pun ukus i visok nivo zadovoljstva potrošača, što ovaj proizvod čini izuzetno traženim na tržištu.",
      en: "The meat pie is a top product of traditional cooking, made from carefully selected, top-quality ingredients. The rich, juicy filling gives a full taste and keeps customers satisfied, which makes this one of the most sought-after products on the market.",
      de: "Die Pita mit Fleisch ist ein Spitzenprodukt der traditionellen Küche, hergestellt aus sorgfältig ausgewählten Rohstoffen bester Qualität. Die reichhaltige, saftige Füllung sorgt für vollen Geschmack und hohe Zufriedenheit der Verbraucher, was dieses Produkt am Markt besonders gefragt macht.",
    },
    highlights: [
      { sr: "Nadev od mesa", en: "Meat filling", de: "Fleischfüllung" },
      { sr: "Autentičan ukus", en: "Authentic flavour", de: "Authentischer Geschmack" },
      { sr: "600 g", en: "600 g", de: "600 g" },
    ],
    glyph: "pita",
    accent: "#8f3b2e",
    imageSrc: media("packPitaMeso"),
    specs: doughSpecs({
      sr: "Testo sa nadevom od mesa",
      en: "Dough with a meat filling",
      de: "Teig mit Fleischfüllung",
    }),
  },
  {
    id: "pita-sa-sirom",
    category: "testo",
    name: {
      sr: "Magnus pazarska pita sa sirom",
      en: "Magnus Pazar pie with cheese",
      de: "Magnus Pazar-Pita mit Käse",
    },
    description: {
      sr: "Pita sa sirom kremaste teksture, za one koji žele laganiji obrok.",
      en: "A cheese pie with a creamy texture, for anyone after a lighter meal.",
      de: "Eine Pita mit Käse mit cremiger Textur, für alle, die eine leichtere Mahlzeit möchten.",
    },
    story: {
      sr: "Pita sa sirom izrađena je od visokokvalitetnog sira i pažljivo odabranih sastojaka, što joj daje prepoznatljivu kremastu strukturu i bogat ukus. Namenjena je potrošačima koji traže lagan, ali kvalitetan i ukusan obrok.",
      en: "The cheese pie is made from high-quality cheese and carefully selected ingredients, which give it a recognisable creamy texture and a rich taste. It is meant for anyone who wants a light but good and tasty meal.",
      de: "Die Pita mit Käse wird aus hochwertigem Käse und sorgfältig ausgewählten Zutaten hergestellt, die ihr die typische cremige Struktur und einen reichen Geschmack geben. Sie richtet sich an Verbraucher, die eine leichte, aber hochwertige und schmackhafte Mahlzeit suchen.",
    },
    highlights: [
      { sr: "Nadev od sira", en: "Cheese filling", de: "Käsefüllung" },
      { sr: "Kremasta tekstura", en: "Creamy texture", de: "Cremige Textur" },
      { sr: "600 g", en: "600 g", de: "600 g" },
    ],
    glyph: "pita",
    accent: "#f4ecd6",
    imageSrc: media("packPitaSir"),
    specs: doughSpecs({
      sr: "Testo sa nadevom od sira",
      en: "Dough with a cheese filling",
      de: "Teig mit Käsefüllung",
    }),
  },
  {
    id: "pita-sa-krompirom",
    category: "testo",
    name: {
      sr: "Magnus pazarska pita sa krompirom",
      en: "Magnus Pazar pie with potato",
      de: "Magnus Pazar-Pita mit Kartoffeln",
    },
    description: {
      sr: "Pita sa krompirom meke teksture i dobro poznatog ukusa.",
      en: "A potato pie with a soft texture and a familiar flavour.",
      de: "Eine Pita mit Kartoffeln mit weicher Textur und vertrautem Geschmack.",
    },
    story: {
      sr: "Pita sa krompirom donosi poznat i omiljen ukus tradicionalne kuhinje, unapređen korišćenjem najkvalitetnijih sastojaka i kontrolisanim proizvodnim procesom. Mekana tekstura i pun ukus čine je univerzalnim izborom za širok krug potrošača.",
      en: "The potato pie brings the familiar, well-loved taste of traditional cooking, improved by top-quality ingredients and a controlled production process. Its soft texture and full taste make it a choice for almost everyone.",
      de: "Die Pita mit Kartoffeln bringt den vertrauten, beliebten Geschmack der traditionellen Küche, verfeinert durch beste Zutaten und einen kontrollierten Produktionsprozess. Die weiche Textur und der volle Geschmack machen sie zur universellen Wahl für einen breiten Kreis von Verbrauchern.",
    },
    highlights: [
      { sr: "Nadev od krompira", en: "Potato filling", de: "Kartoffelfüllung" },
      { sr: "Meka tekstura", en: "Soft texture", de: "Weiche Textur" },
      { sr: "600 g", en: "600 g", de: "600 g" },
    ],
    glyph: "pita",
    accent: "#e2b54a",
    imageSrc: media("packPitaKrompir"),
    specs: doughSpecs({
      sr: "Testo sa nadevom od krompira",
      en: "Dough with a potato filling",
      de: "Teig mit Kartoffelfüllung",
    }),
  },
  {
    id: "pita-sa-spanacem",
    category: "testo",
    name: {
      sr: "Magnus pazarska pita sa spanaćem",
      en: "Magnus Pazar pie with spinach",
      de: "Magnus Pazar-Pita mit Spinat",
    },
    description: {
      sr: "Pita sa spanaćem: laganija, nutritivno bogata opcija.",
      en: "A spinach pie: the lighter, nutrient-rich option.",
      de: "Pita mit Spinat: die leichtere, nährstoffreiche Option.",
    },
    story: {
      sr: "Pita sa spanaćem kombinuje pažljivo odabran spanać i visokokvalitetne sastojke, pružajući uravnotežen i osvežavajući ukus. Ovaj proizvod je idealan za potrošače koji preferiraju laganije, ali nutritivno bogate obroke.",
      en: "The spinach pie combines carefully selected spinach with high-quality ingredients for a balanced, fresh taste. It is ideal for anyone who prefers lighter but nutrient-rich meals.",
      de: "Die Pita mit Spinat kombiniert sorgfältig ausgewählten Spinat mit hochwertigen Zutaten und bietet einen ausgewogenen, frischen Geschmack. Dieses Produkt ist ideal für Verbraucher, die leichtere, aber nährstoffreiche Mahlzeiten bevorzugen.",
    },
    highlights: [
      { sr: "Nadev od spanaća", en: "Spinach filling", de: "Spinatfüllung" },
      { sr: "Laganija opcija", en: "A lighter option", de: "Leichtere Option" },
      { sr: "600 g", en: "600 g", de: "600 g" },
    ],
    glyph: "pita",
    accent: "#3f8a55",
    imageSrc: media("packPitaSpanac"),
    specs: doughSpecs({
      sr: "Testo sa nadevom od spanaća",
      en: "Dough with a spinach filling",
      de: "Teig mit Spinatfüllung",
    }),
  },
];

export const getProduct = (id: string): Product | undefined =>
  PRODUCTS.find((product) => product.id === id);

export const getCategory = (id: CategoryId): Category =>
  CATEGORIES.find((category) => category.id === id) ?? CATEGORIES[0];

/* ------------------------------------------------------------------ */
/* Kvalitet i proces                                                   */
/* ------------------------------------------------------------------ */

export type QualityIcon = "origin" | "control" | "standards" | "consistency";

export interface QualityPillar {
  id: string;
  icon: QualityIcon;
  title: Localized;
  body: Localized;
}

export const QUALITY_PILLARS: ReadonlyArray<QualityPillar> = [
  {
    id: "poreklo",
    icon: "origin",
    title: { sr: "Sirovina sa Peštera", en: "Raw material from Pešter", de: "Rohstoff vom Pešter" },
    body: {
      sr: "Otvoreni pašnjaci, čist vazduh i prirodna ishrana daju junetinu čvrste, a sočne strukture i punog, prirodnog ukusa.",
      en: "Open pastures, clean air and natural feed give the beef a firm yet juicy texture and a full, natural taste.",
      de: "Offene Weiden, saubere Luft und natürliche Fütterung geben dem Rindfleisch eine feste und zugleich saftige Struktur und einen vollen, natürlichen Geschmack.",
    },
  },
  {
    id: "kontrola",
    icon: "control",
    title: {
      sr: "Sirovina se bira prva",
      en: "The raw material comes first",
      de: "Der Rohstoff wird zuerst gewählt",
    },
    body: {
      sr: "Proizvod razvijamo od sirovine: prvo biramo meso i ostale sastojke, a zatim ih vodimo kroz strogo kontrolisan proces.",
      en: "We build each product from the raw material up: first we select the meat and other ingredients, then take them through a strictly controlled process.",
      de: "Wir entwickeln das Produkt vom Rohstoff aus: Zuerst wählen wir das Fleisch und die übrigen Zutaten, dann führen wir sie durch einen streng kontrollierten Prozess.",
    },
  },
  {
    id: "standardi",
    icon: "standards",
    title: { sr: "HACCP i HALAL", en: "HACCP and HALAL", de: "HACCP und HALAL" },
    body: {
      sr: "Proizvodnja je usklađena sa sistemima HACCP i HALAL, a svaka faza je pod stalnim nadzorom.",
      en: "Production follows the HACCP and HALAL systems, and every stage is under constant supervision.",
      de: "Die Produktion entspricht den Systemen HACCP und HALAL, und jede Phase steht unter ständiger Kontrolle.",
    },
  },
  {
    id: "konzistentnost",
    icon: "consistency",
    title: {
      sr: "Isti rezultat u svakoj seriji",
      en: "The same result in every batch",
      de: "Dasselbe Ergebnis in jeder Charge",
    },
    body: {
      sr: "Struktura, ukus i ponašanje pri pripremi ostaju isti iz serije u seriju. Standardizacija za nas znači doslednost.",
      en: "Texture, taste and cooking behaviour stay the same from batch to batch. To us, standardisation means consistency.",
      de: "Struktur, Geschmack und Verhalten bei der Zubereitung bleiben von Charge zu Charge gleich. Standardisierung bedeutet für uns Konstanz.",
    },
  },
];

export interface ProcessStep {
  id: string;
  title: Localized;
  body: Localized;
}

export const PROCESS_STEPS: ReadonlyArray<ProcessStep> = [
  {
    id: "izbor",
    title: { sr: "Izbor sirovine", en: "Selecting the raw material", de: "Auswahl des Rohstoffs" },
    body: {
      sr: "Meso i ostale sastojke biramo po poreklu i svojstvima. Kvalitet se ne dodaje na kraju, on se bira na početku.",
      en: "We choose meat and other ingredients by origin and properties. Quality isn't added at the end; it is chosen at the start.",
      de: "Fleisch und weitere Zutaten wählen wir nach Herkunft und Eigenschaften aus. Qualität wird nicht am Ende hinzugefügt, sie wird am Anfang gewählt.",
    },
  },
  {
    id: "prijem",
    title: { sr: "Prijem", en: "Receiving", de: "Wareneingang" },
    body: {
      sr: "Sirovina ulazi u pogon pod nadzorom, u skladu sa tehnološkim i bezbednosnim zahtevima.",
      en: "Raw material enters the plant under supervision, in line with technological and safety requirements.",
      de: "Der Rohstoff kommt unter Kontrolle in den Betrieb, gemäß den technologischen und sicherheitstechnischen Anforderungen.",
    },
  },
  {
    id: "obrada",
    title: {
      sr: "Obrada i oblikovanje",
      en: "Processing and forming",
      de: "Verarbeitung und Formgebung",
    },
    body: {
      sr: "Standardizovani oblici olakšavaju porcionisanje i daju isto vreme pripreme, u kući i u profesionalnoj kuhinji.",
      en: "Standardised shapes make portioning easier and give the same cooking time, at home and in a professional kitchen.",
      de: "Standardisierte Formen erleichtern das Portionieren und ergeben dieselbe Zubereitungszeit, zu Hause und in der Profiküche.",
    },
  },
  {
    id: "zamrzavanje",
    title: { sr: "Brzo zamrzavanje", en: "Quick-freezing", de: "Schockfrosten" },
    body: {
      sr: "Proizvodi od mesa zamrzavaju se na −18 °C odmah posle proizvodnje.",
      en: "Meat products are frozen at −18 °C right after production.",
      de: "Fleischprodukte werden direkt nach der Produktion bei −18 °C gefrostet.",
    },
  },
  {
    id: "pakovanje",
    title: { sr: "Pakovanje", en: "Packaging", de: "Verpackung" },
    body: {
      sr: "Završna faza pod istim nadzorom. Proizvodi od testa stižu u ready-to-bake pakovanju.",
      en: "The final stage, under the same supervision. Dough products arrive in ready-to-bake packs.",
      de: "Die letzte Phase, unter derselben Kontrolle. Teigprodukte kommen in backfertiger Verpackung.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* B2B                                                                 */
/* ------------------------------------------------------------------ */

export type SegmentIcon = "retail" | "wholesale" | "horeca" | "export";

export interface B2BSegment {
  id: string;
  icon: SegmentIcon;
  title: Localized;
  body: Localized;
}

export const B2B_SEGMENTS: ReadonlyArray<B2BSegment> = [
  {
    id: "maloprodaja",
    icon: "retail",
    title: { sr: "Maloprodajni lanci", en: "Retail chains", de: "Einzelhandelsketten" },
    body: {
      sr: "Dve linije zamrznutih proizvoda jasnog porekla: 100% junetina i pite i mantije spremne za pečenje.",
      en: "Two frozen lines with a clear origin: 100% beef, plus pies and mantije that are ready to bake.",
      de: "Zwei Linien tiefgekühlter Produkte mit klarer Herkunft: 100 % Rindfleisch sowie backfertige Pitas und Mantije.",
    },
  },
  {
    id: "veleprodaja",
    icon: "wholesale",
    title: { sr: "Veleprodaja", en: "Wholesale", de: "Großhandel" },
    body: {
      sr: "Deset proizvoda u dve kategorije, iz standardizovane proizvodnje i ujednačenog kvaliteta po serijama.",
      en: "Ten products in two categories, from standardised production with even quality across batches.",
      de: "Zehn Produkte in zwei Kategorien, aus standardisierter Produktion und mit gleichbleibender Qualität in jeder Charge.",
    },
  },
  {
    id: "horeca",
    icon: "horeca",
    title: { sr: "HoReCa", en: "HoReCa", de: "HoReCa" },
    body: {
      sr: "Za restorane, hotele i ketering: lako porcionisanje, kraća priprema i isti tanjir svakog dana.",
      en: "For restaurants, hotels and catering: easy portioning, shorter prep and the same plate every day.",
      de: "Für Restaurants, Hotels und Catering: einfaches Portionieren, kürzere Zubereitung und jeden Tag derselbe Teller.",
    },
  },
  {
    id: "izvoz",
    icon: "export",
    title: {
      sr: "Izvoz i distribucija",
      en: "Export and distribution",
      de: "Export und Distribution",
    },
    body: {
      sr: "Proizvodnja po sistemima HACCP i HALAL. Otvoreni smo za razgovor o distribuciji na novim tržištima.",
      en: "Production under the HACCP and HALAL systems. We are open to talking about distribution in new markets.",
      de: "Produktion nach den Systemen HACCP und HALAL. Wir sind offen für Gespräche über die Distribution in neuen Märkten.",
    },
  },
];

export interface B2BBenefit {
  id: string;
  title: Localized;
  body: Localized;
}

export const B2B_BENEFITS: ReadonlyArray<B2BBenefit> = [
  {
    id: "isporuke",
    title: { sr: "Stabilne isporuke", en: "Steady deliveries", de: "Stabile Lieferungen" },
    body: {
      sr: "Dinamiku i količine dogovaramo unapred, prema vašim potrebama.",
      en: "We agree schedules and volumes in advance, around your needs.",
      de: "Rhythmus und Mengen vereinbaren wir im Voraus, nach Ihrem Bedarf.",
    },
  },
  {
    id: "uslovi",
    title: { sr: "Komercijalni uslovi", en: "Commercial terms", de: "Konditionen" },
    body: {
      sr: "Cenovnik i uslove dobijate uz katalog, prema tipu saradnje.",
      en: "You receive the price list and terms with the catalog, by type of cooperation.",
      de: "Preisliste und Konditionen erhalten Sie mit dem Katalog, je nach Art der Zusammenarbeit.",
    },
  },
  {
    id: "prilagodjeno",
    title: {
      sr: "Prilagođena saradnja",
      en: "Tailored cooperation",
      de: "Zusammenarbeit nach Maß",
    },
    body: {
      sr: "Izbor proizvoda usklađujemo sa vašim formatom prodaje ili jelovnikom.",
      en: "We match the product selection to your sales format or menu.",
      de: "Die Produktauswahl stimmen wir auf Ihr Verkaufsformat oder Ihre Speisekarte ab.",
    },
  },
  {
    id: "komunikacija",
    title: { sr: "Brza komunikacija", en: "Fast communication", de: "Schnelle Kommunikation" },
    body: {
      sr: "Na upite odgovaramo radnim danima, od 9 do 17 časova.",
      en: "We answer inquiries on working days, from 9:00 to 17:00.",
      de: "Auf Anfragen antworten wir werktags von 9 bis 17 Uhr.",
    },
  },
];

export type CooperationType = "veleprodaja" | "maloprodaja" | "horeca" | "izvoz" | "ostalo";

export const COOPERATION_TYPES: ReadonlyArray<{ id: CooperationType; label: Localized }> = [
  { id: "veleprodaja", label: { sr: "Veleprodaja", en: "Wholesale", de: "Großhandel" } },
  {
    id: "maloprodaja",
    label: { sr: "Maloprodajni lanac", en: "Retail chain", de: "Einzelhandelskette" },
  },
  { id: "horeca", label: { sr: "HoReCa", en: "HoReCa", de: "HoReCa" } },
  {
    id: "izvoz",
    label: { sr: "Izvoz / Distribucija", en: "Export / Distribution", de: "Export / Distribution" },
  },
  { id: "ostalo", label: { sr: "Ostalo", en: "Other", de: "Sonstiges" } },
];

/* ------------------------------------------------------------------ */
/* Instagram                                                           */
/* ------------------------------------------------------------------ */

export interface InstagramItem {
  id: string;
  title: Localized;
  caption: Localized;
  tags: ReadonlyArray<string>;
  glyph: GlyphKind | "pester" | "horeca";
  accent: string;
  tone: "brand" | "frost" | "wheat" | "zar";
  /** Fotografija: original sa magnusfood.rs ili fotografija objave */
  imageSrc: string | null;
  /** Link ka objavi; ako ga nema, vodi na profil */
  href: string | null;
}

export const INSTAGRAM_ITEMS: ReadonlyArray<InstagramItem> = [
  {
    id: "ig-burger",
    title: { sr: "Premium Burger", en: "Premium Burger", de: "Premium Burger" },
    caption: {
      sr: "Samo meso, so i biber.",
      en: "Only meat, salt and pepper.",
      de: "Nur Fleisch, Salz und Pfeffer.",
    },
    tags: ["#magnusfood", "#premiumburger"],
    glyph: "burger",
    accent: "#8f3b2e",
    tone: "brand",
    imageSrc: media("sceneBurger"),
    href: null,
  },
  {
    id: "ig-cevapi",
    title: { sr: "Pazarski ćevapi", en: "Pazar ćevapi", de: "Pazar-Ćevapi" },
    caption: {
      sr: "Tradicionalna receptura, 100% junetina.",
      en: "A traditional recipe, 100% beef.",
      de: "Traditionelle Rezeptur, 100 % Rindfleisch.",
    },
    tags: ["#pazarskicevapi", "#100junetina"],
    glyph: "cevapi",
    accent: "#8f3b2e",
    tone: "frost",
    imageSrc: media("sceneCevapi"),
    href: null,
  },
  {
    id: "ig-pester",
    title: { sr: "Pešter", en: "Pešter", de: "Pešter" },
    caption: {
      sr: "Gde kvalitet počinje.",
      en: "Where quality begins.",
      de: "Wo Qualität beginnt.",
    },
    tags: ["#pešter", "#100pester"],
    glyph: "pester",
    accent: "#8fc4a7",
    tone: "zar",
    imageSrc: media("pesterHills"),
    href: null,
  },
  {
    id: "ig-mantije",
    title: { sr: "Pazarske mantije", en: "Pazar mantije", de: "Pazar-Mantije" },
    caption: { sr: "Spremne za pečenje.", en: "Ready to bake.", de: "Backfertig." },
    tags: ["#mantije", "#readytobake"],
    glyph: "mantije",
    accent: "#8f3b2e",
    tone: "wheat",
    imageSrc: media("sceneMantije"),
    href: null,
  },
  {
    id: "ig-proizvodnja",
    title: { sr: "Iz proizvodnje", en: "From production", de: "Aus der Produktion" },
    caption: {
      sr: "Svaka faza pod stalnim nadzorom.",
      en: "Every stage under constant supervision.",
      de: "Jede Phase unter ständiger Kontrolle.",
    },
    tags: ["#haccp", "#halal"],
    glyph: "horeca",
    accent: "#f26b21",
    tone: "frost",
    imageSrc: media("production"),
    href: null,
  },
  {
    id: "ig-kobasica",
    title: { sr: "Roštiljska kobasica", en: "Grill sausage", de: "Grillwurst" },
    caption: {
      sr: "Bela ili ljuta, 100% junetina.",
      en: "Mild or hot, 100% beef.",
      de: "Mild oder scharf, 100 % Rindfleisch.",
    },
    tags: ["#roštilj", "#brzozamrznuto"],
    glyph: "kobasica",
    accent: "#b8321f",
    tone: "brand",
    imageSrc: media("sceneKobasica"),
    href: null,
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
  /** Prikazati dugmad ka zvaničnim kanalima ispod odgovora */
  showChannels?: boolean;
}

export const FAQ_ITEMS: ReadonlyArray<FaqItem> = [
  {
    id: "proizvodi",
    question: {
      sr: "Koje proizvode pravi Magnus Food Industry?",
      en: "What does Magnus Food Industry make?",
      de: "Welche Produkte stellt Magnus Food Industry her?",
    },
    answer: {
      sr: "Magnus Food Industry proizvodi brzo zamrznute proizvode u dve linije. Liniju mesa čine pazarski ćevapi, Premium Burger, juneća pljeskavica i bela i ljuta roštiljska kobasica. Liniju testa čine pazarske mantije i pite sa mesom, sirom, krompirom i spanaćem.",
      en: "Magnus Food Industry makes quick-frozen products in two lines. The meat line includes Pazar ćevapi, the Premium Burger, a beef pljeskavica, and mild and hot grill sausages. The dough line includes Pazar mantije and pies with meat, cheese, potato and spinach.",
      de: "Magnus Food Industry stellt schockgefrostete Produkte in zwei Linien her. Zur Fleischlinie gehören Pazar-Ćevapi, der Premium Burger, die Rindfleisch-Pljeskavica sowie die milde und die scharfe Grillwurst. Zur Teiglinie gehören Pazar-Mantije und Pitas mit Fleisch, Käse, Kartoffeln und Spinat.",
    },
  },
  {
    id: "meso",
    question: {
      sr: "Od kog mesa su Magnus proizvodi?",
      en: "What meat goes into Magnus products?",
      de: "Aus welchem Fleisch bestehen die Magnus-Produkte?",
    },
    answer: {
      sr: "Svi proizvodi iz linije mesa prave se od 100% junetine. Premium Burger sadrži samo meso, so i biber. Standard za sirovinu je Pešterska visoravan, gde klima, nadmorska visina i prirodna ispaša daju meso čvrste, a sočne strukture.",
      en: "Every product in the meat line is made from 100% beef. The Premium Burger contains only meat, salt and pepper. The sourcing standard is the Pešter plateau, where the climate, altitude and natural pasture give the meat a firm yet juicy texture.",
      de: "Alle Produkte der Fleischlinie werden aus 100 % Rindfleisch hergestellt. Der Premium Burger enthält nur Fleisch, Salz und Pfeffer. Maßstab für den Rohstoff ist die Pešter-Hochebene, wo Klima, Höhenlage und natürliche Weide dem Fleisch eine feste und zugleich saftige Struktur geben.",
    },
  },
  {
    id: "standardi",
    question: {
      sr: "Koje standarde kvaliteta i bezbednosti hrane primenjujete?",
      en: "Which quality and food safety standards do you follow?",
      de: "Welche Standards für Qualität und Lebensmittelsicherheit wenden Sie an?",
    },
    answer: {
      sr: "Proizvodnja je usklađena sa sistemima HACCP i HALAL. Svaka faza, od prijema sirovine, preko obrade i oblikovanja, do pakovanja, odvija se pod stalnim nadzorom.",
      en: "Production follows the HACCP and HALAL systems. Every stage, from receiving raw material through processing and forming to packaging, runs under constant supervision.",
      de: "Die Produktion entspricht den Systemen HACCP und HALAL. Jede Phase, vom Wareneingang über Verarbeitung und Formgebung bis zur Verpackung, läuft unter ständiger Kontrolle.",
    },
  },
  {
    id: "cuvanje",
    question: {
      sr: "Kako se čuvaju i pripremaju proizvodi?",
      en: "How are the products stored and prepared?",
      de: "Wie werden die Produkte gelagert und zubereitet?",
    },
    answer: {
      sr: "Proizvodi od mesa brzo se zamrzavaju na −18 °C odmah posle proizvodnje i spremni su za roštilj; pakovanja su od 500 g. Pite i mantije su u pakovanju od 600 g, spremne za pečenje: 25–30 minuta u rerni. Uslovi čuvanja i rok trajanja navedeni su na deklaraciji.",
      en: "Meat products are quick-frozen at −18 °C right after production and are ready for the grill; packs are 500 g. Pies and mantije come in 600 g packs, ready to bake: 25–30 minutes in the oven. Storage conditions and shelf life are stated on the label.",
      de: "Fleischprodukte werden direkt nach der Produktion bei −18 °C schockgefrostet und sind bereit für den Grill; die Packungen enthalten 500 g. Pitas und Mantije kommen in 600-g-Packungen, backfertig: 25–30 Minuten im Backofen. Lagerbedingungen und Haltbarkeit stehen auf dem Etikett.",
    },
  },
  {
    id: "katalog",
    question: {
      sr: "Kako da zatražim katalog i cenovnik?",
      en: "How do I request the catalog and price list?",
      de: "Wie fordere ich Katalog und Preisliste an?",
    },
    answer: {
      sr: "Izaberite „Zatraži katalog“ u zaglavlju sajta, ostavite ime i email adresu i označite liniju koja vas zanima. Katalog sa specifikacijama i cenovnik šaljemo na email.",
      en: "Choose “Request catalog” in the site header, leave your name and email address and mark the line you are interested in. We send the catalog with specifications and the price list by email.",
      de: "Wählen Sie „Katalog anfordern“ in der Kopfzeile der Website, geben Sie Ihren Namen und Ihre E-Mail-Adresse an und markieren Sie die Linie, die Sie interessiert. Den Katalog mit Spezifikationen und die Preisliste senden wir per E-Mail.",
    },
  },
  {
    id: "b2b",
    question: {
      sr: "Kako da postanem B2B partner?",
      en: "How do I become a B2B partner?",
      de: "Wie werde ich B2B-Partner?",
    },
    answer: {
      sr: "Popunite formu za upit na ovoj stranici: navedite kompaniju ili objekat, tip saradnje i proizvode koji vas zanimaju. Snabdevamo restorane, hotele i ketering sisteme, a upite primamo i od maloprodajnih lanaca, veleprodaja i distributera.",
      en: "Fill in the inquiry form on this page: tell us your company or venue, the type of cooperation and the products you are interested in. We supply restaurants, hotels and catering operations, and we welcome inquiries from retail chains, wholesalers and distributors.",
      de: "Füllen Sie das Anfrageformular auf dieser Seite aus: Nennen Sie Ihr Unternehmen oder Ihren Betrieb, die Art der Zusammenarbeit und die Produkte, die Sie interessieren. Wir beliefern Restaurants, Hotels und Cateringbetriebe und nehmen auch Anfragen von Einzelhandelsketten, Großhändlern und Distributoren entgegen.",
    },
  },
  {
    id: "horeca",
    question: {
      sr: "Da li su proizvodi namenjeni i ugostiteljstvu?",
      en: "Are the products suitable for food service?",
      de: "Sind die Produkte auch für die Gastronomie gedacht?",
    },
    answer: {
      sr: "Da. Obe linije su razvijene i za profesionalnu kuhinju: standardizovani oblici olakšavaju porcionisanje i planiranje pripreme, a proizvod se ponaša isto u svakoj seriji.",
      en: "Yes. Both lines are also built for professional kitchens: standardised shapes make portioning and prep planning easier, and the product behaves the same in every batch.",
      de: "Ja. Beide Linien wurden auch für die Profiküche entwickelt: Standardisierte Formen erleichtern das Portionieren und die Planung der Zubereitung, und das Produkt verhält sich in jeder Charge gleich.",
    },
  },
  {
    id: "kupovina",
    question: {
      sr: "Gde mogu da kupim Magnus proizvode?",
      en: "Where can I buy Magnus products?",
      de: "Wo kann ich Magnus-Produkte kaufen?",
    },
    answer: {
      sr: "Za informacije o prodajnim mestima u vašem gradu pozovite +381 20 510 20 30 ili pišite na office@magnusfood.rs, radnim danima od 9 do 17 časova.",
      en: "For points of sale in your city, call +381 20 510 20 30 or write to office@magnusfood.rs on working days from 9:00 to 17:00.",
      de: "Für Informationen zu Verkaufsstellen in Ihrer Stadt rufen Sie +381 20 510 20 30 an oder schreiben Sie an office@magnusfood.rs, werktags von 9 bis 17 Uhr.",
    },
  },
  {
    id: "kanali",
    question: {
      sr: "Koji su zvanični kanali Magnus Food Industry?",
      en: "What are the official Magnus Food Industry channels?",
      de: "Welche sind die offiziellen Kanäle von Magnus Food Industry?",
    },
    answer: {
      sr: `Zvanični sajt je ${LINKS.site}, a zvanični Instagram profil je ${LINKS.instagram}. Upite primamo i na office@magnusfood.rs.`,
      en: `The official website is ${LINKS.site} and the official Instagram profile is ${LINKS.instagram}. We also take inquiries at office@magnusfood.rs.`,
      de: `Die offizielle Website ist ${LINKS.site}, das offizielle Instagram-Profil ist ${LINKS.instagram}. Anfragen nehmen wir auch unter office@magnusfood.rs entgegen.`,
    },
    showChannels: true,
  },
  {
    id: "lokacija",
    question: {
      sr: "Gde se nalazi Magnus Food Industry?",
      en: "Where is Magnus Food Industry based?",
      de: "Wo befindet sich Magnus Food Industry?",
    },
    answer: {
      sr: "Sedište je u Novom Pazaru: Varevo br. 18, 36300 Novi Pazar, Republika Srbija. Radno vreme je od ponedeljka do petka, od 9 do 17 časova.",
      en: "The company is based in Novi Pazar: Varevo br. 18, 36300 Novi Pazar, Republic of Serbia. Working hours are Monday to Friday, 9:00 to 17:00.",
      de: "Der Sitz ist in Novi Pazar: Varevo br. 18, 36300 Novi Pazar, Republik Serbien. Die Geschäftszeiten sind Montag bis Freitag, 9 bis 17 Uhr.",
    },
  },
];

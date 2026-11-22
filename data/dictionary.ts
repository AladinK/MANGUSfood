import type { Localized } from "./magnusData";

/**
 * Tekstovi interfejsa (SR / EN). Sadržaj o proizvodima i kompaniji je u
 * magnusData.ts, tekst stranica u pages.ts, a blog u blog.ts; ovde su
 * nazivi kontrola, poruke i naslovi sekcija.
 */

/** Zamenjuje {ključ} vrednostima: fill("Zdravo, {ime}", { ime: "Ana" }) */
export const fill = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );

const l = (sr: string, en: string): Localized => ({ sr, en });

export const UI = {
  common: {
    officialSite: l("Zvanični sajt", "Official website"),
    skipToContent: l("Preskoči na sadržaj", "Skip to content"),
    openMenu: l("Otvori meni", "Open menu"),
    closeMenu: l("Zatvori meni", "Close menu"),
    close: l("Zatvori", "Close"),
    menu: l("Meni", "Menu"),
    mainNav: l("Glavna navigacija", "Main navigation"),
    language: l("Jezik", "Language"),
    instagram: l("Instagram", "Instagram"),
    facebook: l("Facebook", "Facebook"),
    newTab: l("otvara se u novoj kartici", "opens in a new tab"),
    requestCatalog: l("Zatraži katalog", "Request catalog"),
    b2bInquiry: l("B2B upit", "B2B inquiry"),
    onRequest: l("U specifikaciji na upit", "In the spec sheet, on request"),
    optional: l("opciono", "optional"),
    home: l("Magnus Food Industry, početna stranica", "Magnus Food Industry, home page"),
    breadcrumb: l("Putanja", "Breadcrumb"),
    privacy: l("Politika privatnosti", "Privacy policy"),
  },

  /** Male oznake iznad naslova sekcija */
  sections: {
    b2b: l("Saradnja", "Cooperation"),
    instagram: l("Instagram", "Instagram"),
    contact: l("Kontakt", "Contact"),
    faq: l("FAQ", "FAQ"),
  },

  product: {
    allProducts: l("Svi proizvodi", "All products"),
    related: l("Iz iste linije", "From the same line"),
  },

  blog: {
    heading: l("Novosti iz Magnusa", "News from Magnus"),
    intro: l(
      "Tekstovi o kvalitetu, poreklu mesa i pripremi",
      "Articles on quality, the origin of meat and preparation",
    ),
    more: l("Još iz bloga", "More from the blog"),
    all: l("Svi članci", "All articles"),
    listLabel: l("Članci", "Articles"),
  },

  notFound: {
    label: l("Greška 404", "Error 404"),
    title: l("Ova stranica ne postoji", "This page does not exist"),
    body: l(
      "Adresa je pogrešno upisana ili je stranica premeštena. Vratite se na početnu ili pogledajte proizvode.",
      "The address is mistyped or the page has moved. Go back to the home page or browse the products.",
    ),
    home: l("Nazad na početnu", "Back to home"),
    products: l("Pogledajte proizvode", "Browse the products"),
  },

  /** Kratke oznake za uske ekrane */
  cursor: {
    details: l("Detalji", "Details"),
  },

  hero: {
    lead: l(
      "Brzo zamrznuti ready-to-cook i grill proizvodi",
      "Quick-frozen ready-to-cook and grill products",
    ),
    photoCaption: l("100% čisto juneće meso", "100% pure beef"),
    photoSub: l("sa Pešterske visoravni", "from the Pešter plateau"),
    chipFrozen: l("Brzo zamrznuto", "Quick-frozen"),
    channels: l("Zvanični kanali", "Official channels"),
    titleLines: [l("Pravo meso.", "Real meat."), l("Pravi ukus.", "Real taste.")],
    sub: l(
      "100% juneće meso i pažljivo odabrane sirovine. Brzo zamrznuti proizvodi od mesa i testa iz Novog Pazara, za kućnu trpezu i profesionalnu kuhinju.",
      "100% beef and carefully selected ingredients. Quick-frozen meat and dough products from Novi Pazar, for the family table and the professional kitchen.",
    ),
    ctaPrimary: l("Istraži proizvode", "Explore products"),
    ctaSecondary: l("Postani B2B partner", "Become a B2B partner"),
    metricsLabel: l("Magnus u brojkama", "Magnus in numbers"),
    photoAlt: l(
      "Krave na pašnjaku pored potoka, Pešterska visoravan",
      "Cattle grazing by a stream on the Pešter plateau",
    ),
    packsLabel: l("Magnus Premium Burger i pazarski ćevapi", "Magnus Premium Burger and Pazar ćevapi"),
  },

  /** Film „Asortiman na traci“ na početnoj */
  reel: {
    label: l(
      "Kratak film: deset Magnus proizvoda, jedan za drugim, sa masom i temperaturom čuvanja",
      "Short film: ten Magnus products one after another, with weight and storage temperature",
    ),
    play: l("Pusti film", "Play film"),
    pause: l("Pauziraj film", "Pause film"),
  },

  catalog: {
    label: l("Asortiman", "Products"),
    title: l("Dve kategorije. Jedan standard.", "Two categories. One standard."),
    lead: l(
      "Jedinstven pristup kvalitetu kroz sve proizvodne linije.",
      "One approach to quality across every production line.",
    ),
    intro: l(
      "Meso i testo nastaju po istim pravilima: birana sirovina, standardizovana proizvodnja i isti rezultat pri svakoj pripremi.",
      "Meat and dough are made by the same rules: selected raw material, standardised production and the same result every time you cook.",
    ),
    tabsLabel: l("Kategorije proizvoda", "Product categories"),
    tabAll: l("Svi proizvodi", "All products"),
    tabAllShort: l("Svi", "All"),
    searchLabel: l("Pretraga proizvoda", "Search products"),
    searchPlaceholder: l("Pretraži: ćevapi, pita, burger…", "Search: ćevapi, pie, burger…"),
    clearSearch: l("Obriši pretragu", "Clear search"),
    count: l("Prikazano {shown} od {total} proizvoda", "Showing {shown} of {total} products"),
    emptyTitle: l("Nema proizvoda za „{query}“", "No products match “{query}”"),
    emptyBody: l(
      "Proverite kako je upit napisan ili prikažite ceo asortiman.",
      "Check the spelling or show the full range.",
    ),
    reset: l("Prikaži sve proizvode", "Show all products"),
    details: l("Detalji i specifikacije", "Details and specifications"),
    specHeading: l("Specifikacija", "Specification"),
    spec: {
      line: l("Linija", "Line"),
      base: l("Osnova", "Base"),
      preparation: l("Priprema", "Preparation"),
      storage: l("Zamrzavanje i čuvanje", "Freezing and storage"),
      packaging: l("Format pakovanja", "Packaging format"),
      netWeight: l("Neto masa i broj komada", "Net weight and units"),
      shelfLife: l("Rok trajanja", "Shelf life"),
      availability: l("Dostupnost", "Availability"),
      standards: l("Standardi", "Standards"),
    },
    specNote: l(
      "Transportna pakovanja i rok trajanja šaljemo u specifikaciji uz ponudu",
      "Transport packs and shelf life come in the spec sheet with your quote",
    ),
    quoteCta: l("Zatraži ponudu za ovaj proizvod", "Request a quote for this product"),
    ctaTitle: l("Sve specifikacije na jednom mestu", "Every specification in one place"),
    ctaPoints: [
      l("Specifikacije za svih deset proizvoda", "Specifications for all ten products"),
      l("Cenovnik i komercijalni uslovi", "Price list and commercial terms"),
      l("Odgovor radnim danima, od 9 do 17 časova", "A reply on working days, 9:00 to 17:00"),
    ],
    ctaBody: l(
      "Katalog sa specifikacijama, transportnim pakovanjima i cenovnikom šaljemo na vaš email",
      "We send the catalog with specifications, transport packs and the price list to your email",
    ),
  },

  quality: {
    label: l("Kvalitet", "Quality"),
    title: l("Kvalitet se ne dodaje. On se bira.", "Quality isn't added. It's chosen."),
    intro: l(
      "Na Pešterskoj visoravni klima, nadmorska visina i prirodna ispaša oblikuju sirovinu pre nego što stigne u pogon. Naš posao je da taj kvalitet sačuvamo do vašeg tanjira.",
      "On the Pešter plateau, climate, altitude and natural pasture shape the raw material before it reaches the plant. Our job is to carry that quality through to your plate.",
    ),
    pesterTitle: l("Pešter. Gde kvalitet počinje.", "Pešter. Where quality begins."),
    pesterBody: l(
      "Jedinstveni prirodni uslovi koji oblikuju svaku sirovinu: klima, nadmorska visina i prirodna ishrana.",
      "Unique natural conditions that shape every raw material: climate, altitude and natural feed.",
    ),
    pesterAlt: l("Krave na pašnjacima Pešterske visoravni", "Cattle on the pastures of the Pešter plateau"),
    processTitle: l("Pet faza proizvodnje", "Five stages of production"),
    processIntro: l("Svaka faza je pod stalnim nadzorom", "Every stage is under constant supervision"),
    processLabel: l("Faze proizvodnje", "Production stages"),
    cowsAlt: l("Brda Pešterske visoravni u predvečerje, krave na pašnjaku", "The hills of the Pešter plateau at dusk, cattle on the pasture"),
    mantijeAlt: l("Ručna priprema pazarskih mantija", "Pazar mantije being made by hand"),
    badgesAlt: l(
      "Oznake: 100% čisto juneće meso, Halal, HACCP, brzo zamrznuto",
      "Marks: 100% pure beef, Halal, HACCP, quick-frozen",
    ),
    step: l("Faza {n} od {total}", "Stage {n} of {total}"),
    closing: l("Oznake kvaliteta sa ambalaže", "Quality marks from the packaging"),
  },

  b2b: {
    title: l(
      "Pouzdan dobavljač za prodaju i profesionalnu kuhinju",
      "A dependable supplier for retail and professional kitchens",
    ),
    intro: l(
      "Snabdevamo restorane, hotele i ketering sisteme, a otvoreni smo za saradnju sa maloprodajnim lancima, veleprodajama i distributerima. Pošaljite upit i dobićete katalog, cenovnik i uslove saradnje.",
      "We supply restaurants, hotels and catering operations, and we are open to working with retail chains, wholesalers and distributors. Send an inquiry and you will receive the catalog, price list and terms.",
    ),
    segmentsLabel: l("Kome je saradnja namenjena", "Who we work with"),
    benefitsTitle: l("Šta dobijate", "What you get"),
    form: {
      title: l("Kontaktirajte nas za saradnju", "Contact us about working together"),
      lead: l(
        "Pet polja i poruka. Odgovaramo radnim danima, od 9 do 17 časova.",
        "Five fields and a message. We reply on working days, 9:00 to 17:00.",
      ),
      name: l("Ime i prezime", "Full name"),
      company: l("Naziv kompanije / objekta", "Company / venue name"),
      email: l("Email", "Email"),
      phone: l("Telefon", "Phone"),
      type: l("Tip saradnje", "Type of cooperation"),
      message: l("Poruka / interesovanje za proizvode", "Message / products of interest"),
      messagePlaceholder: l(
        "Koji proizvodi vas zanimaju i u kojim okvirnim količinama?",
        "Which products are you interested in, and in roughly what volumes?",
      ),
      productTag: l("Upit za proizvod", "Inquiry about"),
      removeProduct: l("Ukloni proizvod iz upita", "Remove product from inquiry"),
      prefillMessage: l(
        "Zanima me ponuda za proizvod: {product}.",
        "I would like a quote for: {product}.",
      ),
      privacy: l(
        "Podatke koristimo samo da odgovorimo na vaš upit.",
        "We use your details only to answer your inquiry.",
      ),
      privacyLink: l("Politika privatnosti", "Privacy policy"),
      submit: l("Pošalji upit", "Send inquiry"),
      submitting: l("Šaljemo upit…", "Sending inquiry…"),
      fixErrors: l(
        "Ispravite označena polja pa pošaljite upit.",
        "Fix the marked fields, then send the inquiry.",
      ),
      successTitle: l("Upit je poslat", "Inquiry sent"),
      successBody: l(
        "Hvala, {name}. Javljamo se na {email} radnim danima, od 9 do 17 časova.",
        "Thank you, {name}. We will reply to {email} on working days, 9:00 to 17:00.",
      ),
      summaryTitle: l("Šta ste poslali", "What you sent"),
      again: l("Pošalji novi upit", "Send another inquiry"),
      errorTitle: l("Upit nije poslat", "Inquiry not sent"),
      errorBody: l(
        "Veza sa serverom nije uspela, a vaši podaci su ostali u formi. Pošaljite ponovo ili pišite na {email}.",
        "The connection to the server failed and your details are still in the form. Send again or write to {email}.",
      ),
      sendEmail: l("Pošalji email", "Send an email"),
      errors: {
        name: l("Unesite ime i prezime.", "Enter your full name."),
        company: l("Unesite naziv kompanije ili objekta.", "Enter your company or venue name."),
        email: l(
          "Unesite ispravnu email adresu, npr. ime@firma.rs.",
          "Enter a valid email address, e.g. name@company.com.",
        ),
        phone: l(
          "Unesite broj telefona sa najmanje 6 cifara.",
          "Enter a phone number with at least 6 digits.",
        ),
        type: l("Izaberite tip saradnje.", "Choose a type of cooperation."),
        message: l(
          "Napišite bar 10 karaktera o tome šta vas zanima.",
          "Write at least 10 characters about what you need.",
        ),
        lines: l("Označite bar jednu liniju.", "Select at least one line."),
      },
    },
  },

  catalogModal: {
    title: l("Zatražite katalog i cenovnik", "Request the catalog and price list"),
    body: l(
      "Katalog sa specifikacijama proizvoda i cenovnik šaljemo na vaš email",
      "We send the catalog with product specifications and the price list to your email",
    ),
    name: l("Ime i prezime", "Full name"),
    email: l("Email", "Email"),
    company: l("Kompanija / objekat", "Company / venue"),
    lines: l("Šta vas zanima", "What you are interested in"),
    buyer: l("Kupujem kao", "I am buying as"),
    buyerTypes: {
      licno: l("Fizičko lice", "Individual"),
      maloprodaja: l("Maloprodaja", "Retail"),
      veleprodaja: l("Veleprodaja", "Wholesale"),
      horeca: l("HoReCa", "HoReCa"),
      distribucija: l("Distribucija / izvoz", "Distribution / export"),
    },
    submit: l("Pošalji zahtev", "Send request"),
    submitting: l("Šaljemo zahtev…", "Sending request…"),
    successTitle: l("Zahtev je poslat", "Request sent"),
    successBody: l(
      "Katalog i cenovnik šaljemo na {email}, radnim danima od 9 do 17 časova.",
      "We will send the catalog and price list to {email} on working days, 9:00 to 17:00.",
    ),
    toForm: l("Imate konkretan upit? Otvorite formu za upit", "Have a specific inquiry? Open the inquiry form"),
    errorTitle: l("Zahtev nije poslat", "Request not sent"),
    errorBody: l(
      "Veza sa serverom nije uspela. Pošaljite ponovo ili pišite na {email}.",
      "The connection to the server failed. Send again or write to {email}.",
    ),
  },

  instagram: {
    tileCta: l("Pogledaj na Instagramu", "View on Instagram"),
    title: l("Magnus na Instagramu", "Magnus on Instagram"),
    intro: l(
      "Proizvodi, priprema i novosti iz Magnusa. Zapratite {handle}.",
      "Products, preparation and news from Magnus. Follow {handle}.",
    ),
    cta: l("Otvori Instagram profil", "Open the Instagram profile"),
    feedLabel: l("Magnus u slikama", "Magnus in pictures"),
    previous: l("Prethodne slike", "Previous pictures"),
    next: l("Sledeće slike", "Next pictures"),
  },

  faq: {
    title: l("Česta pitanja", "Frequently asked questions"),
    intro: l(
      "Kratki odgovori o proizvodima, kvalitetu, katalogu i saradnji. Ako ne nađete svoj, pišite nam.",
      "Short answers about products, quality, the catalog and cooperation. If yours is missing, write to us.",
    ),
    contactCta: l("Pošalji pitanje", "Ask a question"),
  },

  footer: {
    navTitle: l("Navigacija", "Navigation"),
    channelsTitle: l("Zvanični kanali", "Official channels"),
    contactLead: l("Razgovarajmo o saradnji", "Let's talk about working together"),
    address: l("Adresa", "Address"),
    phone: l("Telefon", "Phone"),
    email: l("Email", "Email"),
    hours: l("Radno vreme", "Working hours"),
    map: l("Prikaži na mapi", "Show on the map"),
    catalogTitle: l("Katalog i cenovnik", "Catalog and price list"),
    catalogBody: l(
      "Specifikacije svih deset proizvoda i komercijalni uslovi, na vaš email",
      "Specifications for all ten products and commercial terms, sent to your email",
    ),
    rights: l("Sva prava zadržana.", "All rights reserved."),
    backToTop: l("Na vrh stranice", "Back to top"),
    privacy: l("Politika privatnosti", "Privacy policy"),
  },
} as const;

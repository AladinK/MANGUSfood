import type { Localized } from "./magnusData";

/**
 * Tekstovi interfejsa (SR / EN / DE). Sadržaj o proizvodima i kompaniji je u
 * magnusData.ts, tekst stranica u pages.ts, a blog u blog.ts; ovde su
 * nazivi kontrola, poruke i naslovi sekcija.
 */

/** Zamenjuje {ključ} vrednostima: fill("Zdravo, {ime}", { ime: "Ana" }) */
export const fill = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );

const l = (sr: string, en: string, de: string): Localized => ({ sr, en, de });

export const UI = {
  common: {
    officialSite: l("Zvanični sajt", "Official website", "Offizielle Website"),
    skipToContent: l("Preskoči na sadržaj", "Skip to content", "Zum Inhalt springen"),
    openMenu: l("Otvori meni", "Open menu", "Menü öffnen"),
    closeMenu: l("Zatvori meni", "Close menu", "Menü schließen"),
    close: l("Zatvori", "Close", "Schließen"),
    menu: l("Meni", "Menu", "Menü"),
    mainNav: l("Glavna navigacija", "Main navigation", "Hauptnavigation"),
    language: l("Jezik", "Language", "Sprache"),
    instagram: l("Instagram", "Instagram", "Instagram"),
    facebook: l("Facebook", "Facebook", "Facebook"),
    newTab: l("otvara se u novoj kartici", "opens in a new tab", "öffnet in einem neuen Tab"),
    requestCatalog: l("Zatraži katalog", "Request catalog", "Katalog anfordern"),
    b2bInquiry: l("B2B upit", "B2B inquiry", "B2B-Anfrage"),
    onRequest: l(
      "U specifikaciji na upit",
      "In the spec sheet, on request",
      "In der Spezifikation, auf Anfrage",
    ),
    optional: l("opciono", "optional", "optional"),
    home: l(
      "Magnus Food Industry, početna stranica",
      "Magnus Food Industry, home page",
      "Magnus Food Industry, Startseite",
    ),
    breadcrumb: l("Putanja", "Breadcrumb", "Pfad"),
    privacy: l("Politika privatnosti", "Privacy policy", "Datenschutzerklärung"),
  },

  /** Male oznake iznad naslova sekcija */
  sections: {
    b2b: l("Saradnja", "Cooperation", "Zusammenarbeit"),
    instagram: l("Instagram", "Instagram", "Instagram"),
    contact: l("Kontakt", "Contact", "Kontakt"),
    faq: l("FAQ", "FAQ", "FAQ"),
  },

  product: {
    allProducts: l("Svi proizvodi", "All products", "Alle Produkte"),
    related: l("Iz iste linije", "From the same line", "Aus derselben Linie"),
  },

  blog: {
    heading: l("Novosti iz Magnusa", "News from Magnus", "Neues von Magnus"),
    intro: l(
      "Tekstovi o kvalitetu, poreklu mesa i pripremi",
      "Articles on quality, the origin of meat and preparation",
      "Beiträge über Qualität, Herkunft des Fleisches und Zubereitung",
    ),
    more: l("Još iz bloga", "More from the blog", "Mehr aus dem Blog"),
    all: l("Svi članci", "All articles", "Alle Beiträge"),
    listLabel: l("Članci", "Articles", "Beiträge"),
  },

  notFound: {
    label: l("Greška 404", "Error 404", "Fehler 404"),
    title: l("Ova stranica ne postoji", "This page does not exist", "Diese Seite gibt es nicht"),
    body: l(
      "Adresa je pogrešno upisana ili je stranica premeštena. Vratite se na početnu ili pogledajte proizvode.",
      "The address is mistyped or the page has moved. Go back to the home page or browse the products.",
      "Die Adresse ist falsch geschrieben oder die Seite wurde verschoben. Gehen Sie zurück zur Startseite oder sehen Sie sich die Produkte an.",
    ),
    home: l("Nazad na početnu", "Back to home", "Zur Startseite"),
    products: l("Pogledajte proizvode", "Browse the products", "Produkte ansehen"),
  },

  /** Kratke oznake za uske ekrane */
  cursor: {
    details: l("Detalji", "Details", "Details"),
  },

  hero: {
    lead: l(
      "Brzo zamrznuti ready-to-cook i grill proizvodi",
      "Quick-frozen ready-to-cook and grill products",
      "Tiefgekühlte Ready-to-cook- und Grillprodukte",
    ),
    photoCaption: l("100% čisto juneće meso", "100% pure beef", "100 % reines Rindfleisch"),
    photoSub: l("sa Pešterske visoravni", "from the Pešter plateau", "von der Pešter-Hochebene"),
    chipFrozen: l("Brzo zamrznuto", "Quick-frozen", "Schockgefrostet"),
    channels: l("Zvanični kanali", "Official channels", "Offizielle Kanäle"),
    // Red naslova ne sme biti širi od 4,2 em: na širokim ekranima okvir je 640 px pri
    // slovima od 152 px, pa se duži red odseca („Echtes Fleisch.“ ima 5 em i ne staje).
    titleLines: [
      l("Pravo meso.", "Real meat.", "Fleisch pur."),
      l("Pravi ukus.", "Real taste.", "Genuss pur."),
    ],
    sub: l(
      "100% juneće meso i pažljivo odabrane sirovine. Brzo zamrznuti proizvodi od mesa i testa iz Novog Pazara, za kućnu trpezu i profesionalnu kuhinju.",
      "100% beef and carefully selected ingredients. Quick-frozen meat and dough products from Novi Pazar, for the family table and the professional kitchen.",
      "100 % Rindfleisch und sorgfältig ausgewählte Zutaten. Schockgefrostete Fleisch- und Teigprodukte aus Novi Pazar, für den Familientisch und die Profiküche.",
    ),
    ctaPrimary: l("Istraži proizvode", "Explore products", "Produkte entdecken"),
    ctaSecondary: l("Postani B2B partner", "Become a B2B partner", "B2B-Partner werden"),
    metricsLabel: l("Magnus u brojkama", "Magnus in numbers", "Magnus in Zahlen"),
    photoAlt: l(
      "Krave na pašnjaku pored potoka, Pešterska visoravan",
      "Cattle grazing by a stream on the Pešter plateau",
      "Kühe auf der Weide an einem Bach, Pešter-Hochebene",
    ),
    packsLabel: l(
      "Magnus Premium Burger i pazarski ćevapi",
      "Magnus Premium Burger and Pazar ćevapi",
      "Magnus Premium Burger und Pazar-Ćevapi",
    ),
  },

  /** Film „Asortiman na traci“ na početnoj */
  reel: {
    label: l(
      "Kratak film: deset Magnus proizvoda, jedan za drugim, sa masom i temperaturom čuvanja",
      "Short film: ten Magnus products one after another, with weight and storage temperature",
      "Kurzfilm: zehn Magnus-Produkte nacheinander, mit Gewicht und Lagertemperatur",
    ),
    play: l("Pusti film", "Play film", "Film abspielen"),
    pause: l("Pauziraj film", "Pause film", "Film anhalten"),
  },

  catalog: {
    label: l("Asortiman", "Products", "Sortiment"),
    title: l(
      "Dve kategorije. Jedan standard.",
      "Two categories. One standard.",
      "Zwei Kategorien. Ein Standard.",
    ),
    lead: l(
      "Jedinstven pristup kvalitetu kroz sve proizvodne linije.",
      "One approach to quality across every production line.",
      "Ein einheitlicher Qualitätsanspruch über alle Produktionslinien.",
    ),
    intro: l(
      "Meso i testo nastaju po istim pravilima: birana sirovina, standardizovana proizvodnja i isti rezultat pri svakoj pripremi.",
      "Meat and dough are made by the same rules: selected raw material, standardised production and the same result every time you cook.",
      "Fleisch und Teig entstehen nach denselben Regeln: ausgewählte Rohstoffe, standardisierte Produktion und bei jeder Zubereitung dasselbe Ergebnis.",
    ),
    tabsLabel: l("Kategorije proizvoda", "Product categories", "Produktkategorien"),
    tabAll: l("Svi proizvodi", "All products", "Alle Produkte"),
    tabAllShort: l("Svi", "All", "Alle"),
    searchLabel: l("Pretraga proizvoda", "Search products", "Produktsuche"),
    searchPlaceholder: l(
      "Pretraži: ćevapi, pita, burger…",
      "Search: ćevapi, pie, burger…",
      "Suchen: Ćevapi, Pita, Burger …",
    ),
    clearSearch: l("Obriši pretragu", "Clear search", "Suche löschen"),
    count: l(
      "Prikazano {shown} od {total} proizvoda",
      "Showing {shown} of {total} products",
      "{shown} von {total} Produkten angezeigt",
    ),
    emptyTitle: l(
      "Nema proizvoda za „{query}“",
      "No products match “{query}”",
      "Keine Produkte für „{query}“",
    ),
    emptyBody: l(
      "Proverite kako je upit napisan ili prikažite ceo asortiman.",
      "Check the spelling or show the full range.",
      "Prüfen Sie die Schreibweise oder zeigen Sie das gesamte Sortiment an.",
    ),
    reset: l("Prikaži sve proizvode", "Show all products", "Alle Produkte anzeigen"),
    details: l(
      "Detalji i specifikacije",
      "Details and specifications",
      "Details und Spezifikationen",
    ),
    specHeading: l("Specifikacija", "Specification", "Spezifikation"),
    spec: {
      line: l("Linija", "Line", "Linie"),
      base: l("Osnova", "Base", "Basis"),
      preparation: l("Priprema", "Preparation", "Zubereitung"),
      storage: l("Zamrzavanje i čuvanje", "Freezing and storage", "Gefrieren und Lagerung"),
      packaging: l("Format pakovanja", "Packaging format", "Verpackungsformat"),
      netWeight: l("Neto masa i broj komada", "Net weight and units", "Nettogewicht und Stückzahl"),
      shelfLife: l("Rok trajanja", "Shelf life", "Haltbarkeit"),
      availability: l("Dostupnost", "Availability", "Verfügbarkeit"),
      standards: l("Standardi", "Standards", "Standards"),
    },
    specNote: l(
      "Transportna pakovanja i rok trajanja šaljemo u specifikaciji uz ponudu",
      "Transport packs and shelf life come in the spec sheet with your quote",
      "Transportverpackungen und Haltbarkeit erhalten Sie in der Spezifikation mit dem Angebot",
    ),
    quoteCta: l(
      "Zatraži ponudu za ovaj proizvod",
      "Request a quote for this product",
      "Angebot für dieses Produkt anfordern",
    ),
    ctaTitle: l(
      "Sve specifikacije na jednom mestu",
      "Every specification in one place",
      "Alle Spezifikationen an einem Ort",
    ),
    ctaPoints: [
      l(
        "Specifikacije za svih deset proizvoda",
        "Specifications for all ten products",
        "Spezifikationen für alle zehn Produkte",
      ),
      l(
        "Cenovnik i komercijalni uslovi",
        "Price list and commercial terms",
        "Preisliste und Konditionen",
      ),
      l(
        "Odgovor radnim danima, od 9 do 17 časova",
        "A reply on working days, 9:00 to 17:00",
        "Antwort an Werktagen von 9 bis 17 Uhr",
      ),
    ],
    ctaBody: l(
      "Katalog sa specifikacijama, transportnim pakovanjima i cenovnikom šaljemo na vaš email",
      "We send the catalog with specifications, transport packs and the price list to your email",
      "Den Katalog mit Spezifikationen, Transportverpackungen und Preisliste senden wir an Ihre E-Mail-Adresse",
    ),
  },

  quality: {
    label: l("Kvalitet", "Quality", "Qualität"),
    title: l(
      "Kvalitet se ne dodaje. On se bira.",
      "Quality isn't added. It's chosen.",
      "Qualität fügt man nicht hinzu. Man wählt sie.",
    ),
    intro: l(
      "Na Pešterskoj visoravni klima, nadmorska visina i prirodna ispaša oblikuju sirovinu pre nego što stigne u pogon. Naš posao je da taj kvalitet sačuvamo do vašeg tanjira.",
      "On the Pešter plateau, climate, altitude and natural pasture shape the raw material before it reaches the plant. Our job is to carry that quality through to your plate.",
      "Auf der Pešter-Hochebene prägen Klima, Höhenlage und natürliche Weide den Rohstoff, noch bevor er im Betrieb ankommt. Unsere Aufgabe ist es, diese Qualität bis auf Ihren Teller zu bewahren.",
    ),
    pesterTitle: l(
      "Pešter. Gde kvalitet počinje.",
      "Pešter. Where quality begins.",
      "Pešter. Wo Qualität beginnt.",
    ),
    pesterBody: l(
      "Jedinstveni prirodni uslovi koji oblikuju svaku sirovinu: klima, nadmorska visina i prirodna ishrana.",
      "Unique natural conditions that shape every raw material: climate, altitude and natural feed.",
      "Einzigartige natürliche Bedingungen, die jeden Rohstoff prägen: Klima, Höhenlage und natürliche Fütterung.",
    ),
    pesterAlt: l(
      "Krave na pašnjacima Pešterske visoravni",
      "Cattle on the pastures of the Pešter plateau",
      "Kühe auf den Weiden der Pešter-Hochebene",
    ),
    processTitle: l(
      "Pet faza proizvodnje",
      "Five stages of production",
      "Fünf Phasen der Produktion",
    ),
    processIntro: l(
      "Svaka faza je pod stalnim nadzorom",
      "Every stage is under constant supervision",
      "Jede Phase steht unter ständiger Kontrolle",
    ),
    processLabel: l("Faze proizvodnje", "Production stages", "Produktionsphasen"),
    cowsAlt: l(
      "Brda Pešterske visoravni u predvečerje, krave na pašnjaku",
      "The hills of the Pešter plateau at dusk, cattle on the pasture",
      "Die Hügel der Pešter-Hochebene in der Abenddämmerung, Kühe auf der Weide",
    ),
    mantijeAlt: l(
      "Ručna priprema pazarskih mantija",
      "Pazar mantije being made by hand",
      "Pazar-Mantije werden von Hand zubereitet",
    ),
    badgesAlt: l(
      "Oznake: 100% čisto juneće meso, Halal, HACCP, brzo zamrznuto",
      "Marks: 100% pure beef, Halal, HACCP, quick-frozen",
      "Kennzeichen: 100 % reines Rindfleisch, Halal, HACCP, schockgefrostet",
    ),
    step: l("Faza {n} od {total}", "Stage {n} of {total}", "Phase {n} von {total}"),
    closing: l(
      "Oznake kvaliteta sa ambalaže",
      "Quality marks from the packaging",
      "Qualitätskennzeichen von der Verpackung",
    ),
  },

  b2b: {
    title: l(
      "Pouzdan dobavljač za prodaju i profesionalnu kuhinju",
      "A dependable supplier for retail and professional kitchens",
      "Ein zuverlässiger Lieferant für Handel und Profiküche",
    ),
    intro: l(
      "Snabdevamo restorane, hotele i ketering sisteme, a otvoreni smo za saradnju sa maloprodajnim lancima, veleprodajama i distributerima. Pošaljite upit i dobićete katalog, cenovnik i uslove saradnje.",
      "We supply restaurants, hotels and catering operations, and we are open to working with retail chains, wholesalers and distributors. Send an inquiry and you will receive the catalog, price list and terms.",
      "Wir beliefern Restaurants, Hotels und Cateringbetriebe und sind offen für die Zusammenarbeit mit Einzelhandelsketten, Großhändlern und Distributoren. Senden Sie eine Anfrage und Sie erhalten Katalog, Preisliste und Konditionen.",
    ),
    segmentsLabel: l(
      "Kome je saradnja namenjena",
      "Who we work with",
      "Für wen die Zusammenarbeit gedacht ist",
    ),
    benefitsTitle: l("Šta dobijate", "What you get", "Was Sie erhalten"),
    form: {
      title: l(
        "Kontaktirajte nas za saradnju",
        "Contact us about working together",
        "Kontaktieren Sie uns für eine Zusammenarbeit",
      ),
      lead: l(
        "Pet polja i poruka. Odgovaramo radnim danima, od 9 do 17 časova.",
        "Five fields and a message. We reply on working days, 9:00 to 17:00.",
        "Fünf Felder und eine Nachricht. Wir antworten werktags von 9 bis 17 Uhr.",
      ),
      name: l("Ime i prezime", "Full name", "Vor- und Nachname"),
      company: l(
        "Naziv kompanije / objekta",
        "Company / venue name",
        "Name des Unternehmens / Betriebs",
      ),
      email: l("Email", "Email", "E-Mail"),
      phone: l("Telefon", "Phone", "Telefon"),
      type: l("Tip saradnje", "Type of cooperation", "Art der Zusammenarbeit"),
      message: l(
        "Poruka / interesovanje za proizvode",
        "Message / products of interest",
        "Nachricht / Interesse an Produkten",
      ),
      messagePlaceholder: l(
        "Koji proizvodi vas zanimaju i u kojim okvirnim količinama?",
        "Which products are you interested in, and in roughly what volumes?",
        "Welche Produkte interessieren Sie und in welchen ungefähren Mengen?",
      ),
      productTag: l("Upit za proizvod", "Inquiry about", "Anfrage zum Produkt"),
      removeProduct: l(
        "Ukloni proizvod iz upita",
        "Remove product from inquiry",
        "Produkt aus der Anfrage entfernen",
      ),
      prefillMessage: l(
        "Zanima me ponuda za proizvod: {product}.",
        "I would like a quote for: {product}.",
        "Ich interessiere mich für ein Angebot für das Produkt: {product}.",
      ),
      privacy: l(
        "Podatke koristimo samo da odgovorimo na vaš upit.",
        "We use your details only to answer your inquiry.",
        "Wir verwenden Ihre Daten nur, um Ihre Anfrage zu beantworten.",
      ),
      privacyLink: l("Politika privatnosti", "Privacy policy", "Datenschutzerklärung"),
      submit: l("Pošalji upit", "Send inquiry", "Anfrage senden"),
      submitting: l("Šaljemo upit…", "Sending inquiry…", "Anfrage wird gesendet …"),
      fixErrors: l(
        "Ispravite označena polja pa pošaljite upit.",
        "Fix the marked fields, then send the inquiry.",
        "Korrigieren Sie die markierten Felder und senden Sie dann die Anfrage.",
      ),
      successTitle: l("Upit je poslat", "Inquiry sent", "Anfrage gesendet"),
      successBody: l(
        "Hvala, {name}. Javljamo se na {email} radnim danima, od 9 do 17 časova.",
        "Thank you, {name}. We will reply to {email} on working days, 9:00 to 17:00.",
        "Vielen Dank, {name}. Wir melden uns unter {email}, werktags von 9 bis 17 Uhr.",
      ),
      summaryTitle: l("Šta ste poslali", "What you sent", "Das haben Sie gesendet"),
      again: l("Pošalji novi upit", "Send another inquiry", "Neue Anfrage senden"),
      errorTitle: l("Upit nije poslat", "Inquiry not sent", "Anfrage nicht gesendet"),
      errorBody: l(
        "Veza sa serverom nije uspela, a vaši podaci su ostali u formi. Pošaljite ponovo ili pišite na {email}.",
        "The connection to the server failed and your details are still in the form. Send again or write to {email}.",
        "Die Verbindung zum Server ist fehlgeschlagen, Ihre Angaben sind im Formular geblieben. Senden Sie erneut oder schreiben Sie an {email}.",
      ),
      sendEmail: l("Pošalji email", "Send an email", "E-Mail senden"),
      errors: {
        name: l(
          "Unesite ime i prezime.",
          "Enter your full name.",
          "Geben Sie Ihren Vor- und Nachnamen ein.",
        ),
        company: l(
          "Unesite naziv kompanije ili objekta.",
          "Enter your company or venue name.",
          "Geben Sie den Namen des Unternehmens oder Betriebs ein.",
        ),
        email: l(
          "Unesite ispravnu email adresu, npr. ime@firma.rs.",
          "Enter a valid email address, e.g. name@company.com.",
          "Geben Sie eine gültige E-Mail-Adresse ein, z. B. name@firma.de.",
        ),
        phone: l(
          "Unesite broj telefona sa najmanje 6 cifara.",
          "Enter a phone number with at least 6 digits.",
          "Geben Sie eine Telefonnummer mit mindestens 6 Ziffern ein.",
        ),
        type: l(
          "Izaberite tip saradnje.",
          "Choose a type of cooperation.",
          "Wählen Sie die Art der Zusammenarbeit.",
        ),
        message: l(
          "Napišite bar 10 karaktera o tome šta vas zanima.",
          "Write at least 10 characters about what you need.",
          "Schreiben Sie mindestens 10 Zeichen dazu, was Sie interessiert.",
        ),
        lines: l(
          "Označite bar jednu liniju.",
          "Select at least one line.",
          "Wählen Sie mindestens eine Linie.",
        ),
      },
    },
  },

  catalogModal: {
    title: l(
      "Zatražite katalog i cenovnik",
      "Request the catalog and price list",
      "Katalog und Preisliste anfordern",
    ),
    body: l(
      "Katalog sa specifikacijama proizvoda i cenovnik šaljemo na vaš email",
      "We send the catalog with product specifications and the price list to your email",
      "Den Katalog mit Produktspezifikationen und die Preisliste senden wir an Ihre E-Mail-Adresse",
    ),
    name: l("Ime i prezime", "Full name", "Vor- und Nachname"),
    email: l("Email", "Email", "E-Mail"),
    company: l("Kompanija / objekat", "Company / venue", "Unternehmen / Betrieb"),
    lines: l("Šta vas zanima", "What you are interested in", "Was Sie interessiert"),
    buyer: l("Kupujem kao", "I am buying as", "Ich kaufe als"),
    buyerTypes: {
      licno: l("Fizičko lice", "Individual", "Privatperson"),
      maloprodaja: l("Maloprodaja", "Retail", "Einzelhandel"),
      veleprodaja: l("Veleprodaja", "Wholesale", "Großhandel"),
      horeca: l("HoReCa", "HoReCa", "HoReCa"),
      distribucija: l("Distribucija / izvoz", "Distribution / export", "Distribution / Export"),
    },
    submit: l("Pošalji zahtev", "Send request", "Anforderung senden"),
    submitting: l("Šaljemo zahtev…", "Sending request…", "Anforderung wird gesendet …"),
    successTitle: l("Zahtev je poslat", "Request sent", "Anforderung gesendet"),
    successBody: l(
      "Katalog i cenovnik šaljemo na {email}, radnim danima od 9 do 17 časova.",
      "We will send the catalog and price list to {email} on working days, 9:00 to 17:00.",
      "Katalog und Preisliste senden wir an {email}, werktags von 9 bis 17 Uhr.",
    ),
    toForm: l(
      "Imate konkretan upit? Otvorite formu za upit",
      "Have a specific inquiry? Open the inquiry form",
      "Sie haben eine konkrete Anfrage? Öffnen Sie das Anfrageformular",
    ),
    errorTitle: l("Zahtev nije poslat", "Request not sent", "Anforderung nicht gesendet"),
    errorBody: l(
      "Veza sa serverom nije uspela. Pošaljite ponovo ili pišite na {email}.",
      "The connection to the server failed. Send again or write to {email}.",
      "Die Verbindung zum Server ist fehlgeschlagen. Senden Sie erneut oder schreiben Sie an {email}.",
    ),
  },

  instagram: {
    tileCta: l("Pogledaj na Instagramu", "View on Instagram", "Auf Instagram ansehen"),
    title: l("Magnus na Instagramu", "Magnus on Instagram", "Magnus auf Instagram"),
    intro: l(
      "Proizvodi, priprema i novosti iz Magnusa. Zapratite {handle}.",
      "Products, preparation and news from Magnus. Follow {handle}.",
      "Produkte, Zubereitung und Neues von Magnus. Folgen Sie {handle}.",
    ),
    cta: l("Otvori Instagram profil", "Open the Instagram profile", "Instagram-Profil öffnen"),
    feedLabel: l("Magnus u slikama", "Magnus in pictures", "Magnus in Bildern"),
    previous: l("Prethodne slike", "Previous pictures", "Vorherige Bilder"),
    next: l("Sledeće slike", "Next pictures", "Nächste Bilder"),
  },

  faq: {
    title: l("Česta pitanja", "Frequently asked questions", "Häufige Fragen"),
    intro: l(
      "Kratki odgovori o proizvodima, kvalitetu, katalogu i saradnji. Ako ne nađete svoj, pišite nam.",
      "Short answers about products, quality, the catalog and cooperation. If yours is missing, write to us.",
      "Kurze Antworten zu Produkten, Qualität, Katalog und Zusammenarbeit. Wenn Ihre Frage fehlt, schreiben Sie uns.",
    ),
    contactCta: l("Pošalji pitanje", "Ask a question", "Frage senden"),
  },

  footer: {
    navTitle: l("Navigacija", "Navigation", "Navigation"),
    channelsTitle: l("Zvanični kanali", "Official channels", "Offizielle Kanäle"),
    // Najduža reč ne sme biti šira od 4,7 em: na ekranu od 1024 px kolona je 367 px pri slovima
    // od 77 px, pa duža reč („Zusammenarbeit“, 5,7 em) prelazi preko kolone sa adresom.
    contactLead: l(
      "Razgovarajmo o saradnji",
      "Let's talk about working together",
      "Kommen wir ins Gespräch",
    ),
    address: l("Adresa", "Address", "Adresse"),
    phone: l("Telefon", "Phone", "Telefon"),
    email: l("Email", "Email", "E-Mail"),
    hours: l("Radno vreme", "Working hours", "Geschäftszeiten"),
    map: l("Prikaži na mapi", "Show on the map", "Auf der Karte anzeigen"),
    catalogTitle: l("Katalog i cenovnik", "Catalog and price list", "Katalog und Preisliste"),
    catalogBody: l(
      "Specifikacije svih deset proizvoda i komercijalni uslovi, na vaš email",
      "Specifications for all ten products and commercial terms, sent to your email",
      "Spezifikationen aller zehn Produkte und Konditionen, an Ihre E-Mail-Adresse",
    ),
    rights: l("Sva prava zadržana.", "All rights reserved.", "Alle Rechte vorbehalten."),
    backToTop: l("Na vrh stranice", "Back to top", "Zum Seitenanfang"),
    privacy: l("Politika privatnosti", "Privacy policy", "Datenschutzerklärung"),
  },
} as const;

/**
 * Sadržaj stranica O nama, Pešter, Proizvodi i Kontakt i blokova na početnoj.
 *
 * Srpski tekst je preuzet sa odgovarajućih stranica na magnusfood.rs; naslovi
 * su skraćeni i bez tačke na kraju. Engleski i nemački prevod urađeni su za ovaj sajt.
 * Politika privatnosti je nacrt: tekst sa starog sajta pripada proizvođaču
 * WordPress teme (ThemeREX), pa ga nismo preuzeli.
 */

import type { Localized } from "./magnusData";

const l = (sr: string, en: string, de: string): Localized => ({ sr, en, de });

export interface TitledText {
  title: Localized;
  body: Localized;
}

/* ------------------------------------------------------------------ */
/* Početna                                                             */
/* ------------------------------------------------------------------ */

export const HOME = {
  quality: {
    label: l(
      "Pažljivo birane sirovine",
      "Carefully selected raw materials",
      "Sorgfältig ausgewählte Rohstoffe",
    ),
    title: l(
      "Kvalitet počinje pre proizvodnje",
      "Quality starts before production",
      "Qualität beginnt vor der Produktion",
    ),
    body: [
      l(
        "U Magnus Food-u verujemo da vrhunski proizvod ne nastaje u završnoj fazi, već na samom početku. Izbor sirovine predstavlja ključnu tačku koja određuje sve što dolazi nakon toga.",
        "At Magnus Food we believe a great product is not made at the final stage, but at the very beginning. The choice of raw material is the key point that decides everything that follows.",
        "Bei Magnus Food sind wir überzeugt, dass ein Spitzenprodukt nicht in der letzten Phase entsteht, sondern ganz am Anfang. Die Wahl des Rohstoffs ist der entscheidende Punkt, der alles Weitere bestimmt.",
      ),
      l(
        "Zato razvijamo proizvode polazeći od kvaliteta mesa i ostalih sastojaka, uz primenu strogo kontrolisanih proizvodnih procesa koji garantuju sigurnost, stabilnost i vrhunski ukus.",
        "That is why we develop products starting from the quality of the meat and the other ingredients, using strictly controlled production processes that guarantee safety, stability and great taste.",
        "Deshalb entwickeln wir Produkte ausgehend von der Qualität des Fleisches und der übrigen Zutaten und setzen streng kontrollierte Produktionsprozesse ein, die Sicherheit, Stabilität und erstklassigen Geschmack garantieren.",
      ),
    ],
    cta: l("Više o nama", "More about us", "Mehr über uns"),
  },
  products: {
    label: l(
      "Dve kategorije, jedan standard",
      "Two categories, one standard",
      "Zwei Kategorien, ein Standard",
    ),
    title: l(
      "Deset proizvoda od mesa i testa",
      "Ten products, meat and dough",
      "Zehn Produkte aus Fleisch und Teig",
    ),
    intro: l(
      "Magnus Food portfolio razvijen je kroz dve ključne linije: brzo zamrznuto meso i brzo zamrznute proizvode od testa. Iako različite po karakteru, obe dele isti pristup: kvalitet sirovina, standardizovanu proizvodnju i dosledan rezultat u finalnom proizvodu.",
      "The Magnus Food range is built on two key lines: quick-frozen meat and quick-frozen dough products. Different in character, both share the same approach: quality raw materials, standardised production and a consistent result in the finished product.",
      "Das Portfolio von Magnus Food ist in zwei zentralen Linien aufgebaut: schockgefrostetes Fleisch und schockgefrostete Teigprodukte. So unterschiedlich sie im Charakter sind, beide teilen denselben Ansatz: Qualität der Rohstoffe, standardisierte Produktion und ein gleichbleibendes Ergebnis im fertigen Produkt.",
    ),
    cta: l("Svi proizvodi", "All products", "Alle Produkte"),
  },
  pester: {
    title: l(
      "Pešter, gde kvalitet počinje",
      "Pešter, where quality begins",
      "Pešter, wo Qualität beginnt",
    ),
    body: l(
      "Prirodni uslovi koji oblikuju kvalitet sirovine: klima, nadmorska visina i prirodna ishrana",
      "The natural conditions that shape the raw material: climate, altitude and natural feed",
      "Natürliche Bedingungen, die die Qualität des Rohstoffs prägen: Klima, Höhenlage und natürliche Fütterung",
    ),
    cta: l("Više o Pešteru", "More about Pešter", "Mehr über Pešter"),
    alt: l(
      "Pešterska visoravan u predvečerje, stado na pašnjaku",
      "The Pešter plateau at dusk, with cattle on the pasture",
      "Die Pešter-Hochebene in der Abenddämmerung, eine Herde auf der Weide",
    ),
  },
  horeca: {
    label: l("HoReCa", "HoReCa", "HoReCa"),
    title: l(
      "Konzistentan kvalitet i pouzdana isporuka za profesionalnu kuhinju",
      "Consistent quality and reliable delivery for the professional kitchen",
      "Gleichbleibende Qualität und zuverlässige Lieferung für die Profiküche",
    ),
    body: [
      l(
        "U HoReCa sektoru, kvalitet proizvoda nije dovoljan ako nije stabilan i predvidiv. Zato Magnus Food razvija proizvode koji obezbeđuju isti rezultat svaki put, bez odstupanja u strukturi, ukusu ili performansama u pripremi.",
        "In the HoReCa sector, product quality is not enough unless it is stable and predictable. That is why Magnus Food develops products that give the same result every time, with no change in texture, taste or cooking performance.",
        "Im HoReCa-Sektor reicht Produktqualität nicht aus, wenn sie nicht stabil und vorhersehbar ist. Deshalb entwickelt Magnus Food Produkte, die jedes Mal dasselbe Ergebnis liefern, ohne Abweichungen in Struktur, Geschmack oder Verhalten bei der Zubereitung.",
      ),
      l(
        "Standardizovana forma proizvoda omogućava jednostavnu pripremu, kontrolu porcija i optimalno upravljanje vremenom u kuhinji. Fokus na kvalitet sirovina, precizno definisani procesi i stroga kontrola standarda čine Magnus Food pouzdanim partnerom za restorane, hotele i catering sisteme.",
        "The standardised product format makes preparation simple, portions easy to control and kitchen time easier to plan. A focus on quality raw materials, precisely defined processes and strict control of standards make Magnus Food a dependable partner for restaurants, hotels and catering.",
        "Die standardisierte Produktform ermöglicht einfache Zubereitung, Portionskontrolle und optimales Zeitmanagement in der Küche. Der Fokus auf die Qualität der Rohstoffe, präzise definierte Prozesse und die strenge Kontrolle der Standards machen Magnus Food zu einem zuverlässigen Partner für Restaurants, Hotels und Cateringbetriebe.",
      ),
    ],
    cta: l("Pošaljite upit", "Send an inquiry", "Anfrage senden"),
    alt: l(
      "Magnus juneća pljeskavica na roštilju",
      "Magnus beef pljeskavica on the grill",
      "Magnus Rindfleisch-Pljeskavica auf dem Grill",
    ),
  },
  news: {
    label: l("Blog", "Blog", "Blog"),
    title: l("Novosti", "News", "Neuigkeiten"),
    cta: l("Svi članci", "All articles", "Alle Beiträge"),
  },
} as const;

/* ------------------------------------------------------------------ */
/* O nama                                                              */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  title: l(
    "Savremena tehnologija, tradicionalni rezultat",
    "Modern technology, traditional results",
    "Moderne Technologie, traditionelles Ergebnis",
  ),
  intro: [
    l(
      "Magnus Food Industry je kompanija fokusirana na razvoj i proizvodnju premium prehrambenih proizvoda, zasnovanih na pažljivo odabranim sirovinama i strogo kontrolisanim proizvodnim procesima.",
      "Magnus Food Industry is a company focused on developing and producing premium food products, based on carefully selected raw materials and strictly controlled production processes.",
      "Magnus Food Industry ist ein Unternehmen, das sich auf die Entwicklung und Produktion von Premium-Lebensmitteln konzentriert, auf der Grundlage sorgfältig ausgewählter Rohstoffe und streng kontrollierter Produktionsprozesse.",
    ),
    l(
      "Naš pristup polazi od jednostavne ideje: kvalitet se ne stvara u završnoj fazi, već počinje izborom sirovine i dosledno se gradi kroz svaki korak proizvodnje.",
      "Our approach starts from a simple idea: quality is not created at the final stage. It begins with the choice of raw material and is built consistently through every step of production.",
      "Unser Ansatz geht von einer einfachen Idee aus: Qualität entsteht nicht in der letzten Phase, sondern beginnt mit der Wahl des Rohstoffs und wird in jedem Produktionsschritt konsequent aufgebaut.",
    ),
  ],
  headerAlt: l(
    "Pakovanje Magnus pazarskih mantija i pečene mantije na drvenom stolu",
    "A pack of Magnus Pazar mantije and baked mantije on a wooden table",
    "Eine Packung Magnus Pazar-Mantije und gebackene Mantije auf einem Holztisch",
  ),
  processes: {
    title: l(
      "Strogo definisani procesi za maksimalnu sigurnost i stabilnost",
      "Strictly defined processes for maximum safety and stability",
      "Streng definierte Prozesse für maximale Sicherheit und Stabilität",
    ),
    body: [
      l(
        "Kombinovanjem tradicionalnih receptura i savremenih tehnologija razvijamo proizvode koji odgovaraju savremenim potrebama tržišta: autentičan ukus, pouzdan kvalitet i jednostavnu pripremu. Naš portfolio obuhvata linije brzo zamrznutog mesa i proizvoda od testa, za široku primenu, od svakodnevne upotrebe u domaćinstvima do profesionalnih zahteva HoReCa sektora.",
        "By combining traditional recipes with modern technology, we develop products that meet today's market: authentic taste, dependable quality and simple preparation. Our range covers quick-frozen meat and dough products for wide use, from everyday cooking at home to the professional demands of the HoReCa sector.",
        "Durch die Verbindung traditioneller Rezepturen mit modernen Technologien entwickeln wir Produkte, die den heutigen Anforderungen des Marktes entsprechen: authentischer Geschmack, verlässliche Qualität und einfache Zubereitung. Unser Portfolio umfasst Linien mit schockgefrostetem Fleisch und Teigprodukten für einen breiten Einsatz, vom täglichen Gebrauch im Haushalt bis zu den professionellen Anforderungen des HoReCa-Sektors.",
      ),
      l(
        "Poslujući u skladu sa najvišim standardima bezbednosti i kvaliteta, uključujući HACCP i HALAL sisteme, Magnus Food Industry gradi poverenje kroz doslednost, kontrolu i dugoročnu posvećenost kvalitetu. Naš cilj nije samo da isporučimo proizvod, već da postavimo standard koji se prepoznaje i kojem se veruje.",
        "Working to the highest safety and quality standards, including the HACCP and HALAL systems, Magnus Food Industry builds trust through consistency, control and a long-term commitment to quality. Our goal is not only to deliver a product, but to set a standard that people recognise and trust.",
        "Magnus Food Industry arbeitet nach den höchsten Sicherheits- und Qualitätsstandards, einschließlich der Systeme HACCP und HALAL, und schafft Vertrauen durch Konstanz, Kontrolle und langfristiges Engagement für Qualität. Unser Ziel ist nicht nur, ein Produkt zu liefern, sondern einen Standard zu setzen, den man erkennt und dem man vertraut.",
      ),
    ],
  },
  production: {
    label: l("Kontrola na svakom koraku", "Control at every step", "Kontrolle bei jedem Schritt"),
    title: l("Proizvodnja", "Production", "Produktion"),
    body: [
      l(
        "Naša proizvodnja zasniva se na jasno definisanim standardima i procedurama koje obezbeđuju visok nivo kontrole u svim fazama procesa.",
        "Our production rests on clearly defined standards and procedures that keep every stage of the process under close control.",
        "Unsere Produktion beruht auf klar definierten Standards und Verfahren, die in allen Phasen des Prozesses ein hohes Maß an Kontrolle sichern.",
      ),
      l(
        "Od prijema sirovina, preko obrade i formiranja proizvoda, do finalnog pakovanja, svaki korak je pod stalnim nadzorom i usklađen sa savremenim tehnološkim i bezbednosnim zahtevima.",
        "From receiving raw materials, through processing and forming, to final packaging, every step is under constant supervision and in line with modern technological and safety requirements.",
        "Vom Wareneingang über die Verarbeitung und Formgebung bis zur Endverpackung steht jeder Schritt unter ständiger Kontrolle und entspricht den aktuellen technologischen und sicherheitstechnischen Anforderungen.",
      ),
    ],
    burgersAlt: l(
      "Juneći burgeri u pakovanju, iz proizvodnje",
      "Beef patties in their packaging, on the production line",
      "Rindfleisch-Burger in der Verpackung, aus der Produktion",
    ),
    piesAlt: l(
      "Pite u tepsijama pre pečenja",
      "Pies in baking trays before baking",
      "Pitas in Backformen vor dem Backen",
    ),
  },
  tradition: {
    label: l("Tehnologija i tradicija", "Technology and tradition", "Technologie und Tradition"),
    title: l(
      "Proverene recepture i savremeni proizvodni sistemi",
      "Proven recipes and modern production systems",
      "Bewährte Rezepturen und moderne Produktionssysteme",
    ),
    items: [
      {
        title: l(
          "Balans između kvaliteta i inovacije",
          "A balance of quality and innovation",
          "Balance zwischen Qualität und Innovation",
        ),
        body: l(
          "Naši proizvodi nastaju kroz balans između tradicije i inovacije.",
          "Our products come from a balance between tradition and innovation.",
          "Unsere Produkte entstehen aus der Balance zwischen Tradition und Innovation.",
        ),
      },
      {
        title: l("Autentične recepture", "Authentic recipes", "Authentische Rezepturen"),
        body: l(
          "Oslanjamo se na autentične recepture koje čuvaju prepoznatljiv ukus domaće kuhinje, a koristimo savremene procese koji omogućavaju preciznost, efikasnost i potpunu kontrolu kvaliteta.",
          "We rely on authentic recipes that keep the familiar taste of home cooking, and we use modern processes that give precision, efficiency and full quality control.",
          "Wir stützen uns auf authentische Rezepturen, die den unverwechselbaren Geschmack der Hausmannskost bewahren, und nutzen moderne Prozesse, die Präzision, Effizienz und vollständige Qualitätskontrolle ermöglichen.",
        ),
      },
      {
        title: l("Industrijski standardi", "Industrial standards", "Industriestandards"),
        body: l(
          "Ovaj spoj omogućava da svaki proizvod zadrži svoj karakter, uz istovremeno ispunjavanje visokih industrijskih standarda.",
          "This combination lets every product keep its character while meeting high industrial standards.",
          "Diese Verbindung sorgt dafür, dass jedes Produkt seinen Charakter behält und zugleich hohe Industriestandards erfüllt.",
        ),
      },
    ] satisfies ReadonlyArray<TitledText>,
    strengthsLabel: l(
      "Šta to znači u praksi",
      "What that means in practice",
      "Was das in der Praxis bedeutet",
    ),
    posterAlt: l(
      "Magnus plakat: 100% čista junetina u svakom zalogaju. Nije trik. Nije marketing. Samo stvarno dobro meso.",
      "Magnus poster: 100% pure beef in every bite. Not a trick. Not marketing. Just really good meat.",
      "Magnus-Plakat: 100 % reines Rindfleisch in jedem Bissen. Kein Trick. Kein Marketing. Einfach richtig gutes Fleisch.",
    ),
    strengths: [
      l(
        "Standardizovan kvalitet i forma proizvoda",
        "Standardised quality and product format",
        "Standardisierte Qualität und Produktform",
      ),
      l(
        "100% juneće meso premium kvaliteta",
        "100% premium-quality beef",
        "100 % Rindfleisch in Premiumqualität",
      ),
      l(
        "Brza i jednostavna priprema",
        "Quick and simple preparation",
        "Schnelle und einfache Zubereitung",
      ),
      l(
        "Stabilna isporuka i pouzdan lanac snabdevanja",
        "Steady delivery and a reliable supply chain",
        "Stabile Lieferung und zuverlässige Lieferkette",
      ),
      l(
        "Prilagođeno HoReCa operacijama",
        "Suited to HoReCa operations",
        "Abgestimmt auf HoReCa-Abläufe",
      ),
    ],
  },
  consistency: {
    title: l("Konzistentnost kao standard", "Consistency as the standard", "Konstanz als Standard"),
    lead: l(
      "Svaki proizvod je razvijen da isporuči isti kvalitet, bez odstupanja",
      "Every product is developed to deliver the same quality, without deviation",
      "Jedes Produkt ist darauf ausgelegt, dieselbe Qualität zu liefern, ohne Abweichungen",
    ),
    body: [
      l(
        "Kvalitet bez konzistentnosti nema realnu vrednost na tržištu. Zato su naši proizvodi razvijeni kroz procese koji obezbeđuju ujednačenost u strukturi, ukusu i performansama prilikom pripreme.",
        "Quality without consistency has no real value on the market. That is why our products are developed through processes that keep texture, taste and cooking performance uniform.",
        "Qualität ohne Konstanz hat am Markt keinen echten Wert. Deshalb entstehen unsere Produkte in Prozessen, die Gleichmäßigkeit in Struktur, Geschmack und Verhalten bei der Zubereitung sichern.",
      ),
      l(
        "Ovakav pristup omogućava pouzdanost, što je posebno važno za profesionalne kupce u HoReCa sektoru, ali i za krajnje potrošače koji očekuju isti kvalitet pri svakoj kupovini.",
        "This makes our products dependable, which matters especially to professional buyers in the HoReCa sector, and to customers who expect the same quality with every purchase.",
        "Dieser Ansatz schafft Verlässlichkeit, was besonders für professionelle Kunden im HoReCa-Sektor wichtig ist, aber auch für Endverbraucher, die bei jedem Kauf dieselbe Qualität erwarten.",
      ),
    ],
    photos: {
      burger: l(
        "Pakovanje Magnus Premium Burgera na stolu, u pozadini roštilj u dvorištu",
        "A Magnus Premium Burger pack on a table, with a garden barbecue behind",
        "Eine Packung Magnus Premium Burger auf einem Tisch, im Hintergrund ein Grill im Garten",
      ),
      dough: l(
        "Testo za mantije, posuto brašnom",
        "Dough for mantije, dusted with flour",
        "Teig für Mantije, mit Mehl bestäubt",
      ),
      cevapi: l(
        "Magnus pazarski ćevapi na tanjiru, uz pakovanje",
        "Magnus Pazar ćevapi on a plate, next to the pack",
        "Magnus Pazar-Ćevapi auf einem Teller, neben der Packung",
      ),
    },
  },
  market: {
    title: l(
      "Razvijeno za realne potrebe tržišta",
      "Developed for what the market really needs",
      "Entwickelt für den echten Bedarf des Marktes",
    ),
    lead: l(
      "Brza priprema uz zadržavanje punog ukusa i kvaliteta",
      "Quick preparation that keeps full taste and quality",
      "Schnelle Zubereitung bei vollem Geschmack und voller Qualität",
    ),
    body: [
      l(
        "Savremeni način života zahteva proizvode koji su praktični, ali i dalje visokog kvaliteta. Zato razvijamo proizvode koji omogućavaju jednostavnu i brzu pripremu, bez dodatnih koraka i bez kompromisa u finalnom rezultatu.",
        "Modern life calls for products that are practical but still of high quality. That is why we develop products that are quick and simple to prepare, with no extra steps and no compromise in the final result.",
        "Der moderne Alltag verlangt Produkte, die praktisch sind und trotzdem hohe Qualität bieten. Deshalb entwickeln wir Produkte, die sich einfach und schnell zubereiten lassen, ohne zusätzliche Schritte und ohne Kompromisse beim Ergebnis.",
      ),
      l(
        "„Ready-to-bake“ i „ready-to-cook“ koncepti omogućavaju korisnicima da u kratkom vremenu dobiju kvalitetan obrok, bez gubitka autentičnog ukusa.",
        "Our ready-to-bake and ready-to-cook products give people a good meal in a short time, without losing the authentic taste.",
        "Die Konzepte „Ready-to-bake“ und „Ready-to-cook“ ermöglichen in kurzer Zeit eine hochwertige Mahlzeit, ohne den authentischen Geschmack zu verlieren.",
      ),
    ],
    cta: l("Pogledajte proizvode", "See the products", "Produkte ansehen"),
    alt: l(
      "Pakovanje Magnus pazarske pite sa sirom i pečena pita",
      "A pack of Magnus Pazar cheese pie next to a baked pie",
      "Eine Packung Magnus Pazar-Pita mit Käse und eine gebackene Pita",
    ),
  },
} as const;

/* ------------------------------------------------------------------ */
/* Pešter                                                              */
/* ------------------------------------------------------------------ */

export const PESTER = {
  title: l("Pešterska visoravan", "The Pešter plateau", "Die Pešter-Hochebene"),
  lead: l("Gde kvalitet počinje", "Where quality begins", "Wo Qualität beginnt"),
  sub: l(
    "Prirodan, stabilan i prepoznatljiv",
    "Natural, stable and recognisable",
    "Natürlich, stabil und unverwechselbar",
  ),
  headerAlt: l(
    "Pešterska visoravan u predvečerje, stado na pašnjaku",
    "The Pešter plateau at dusk, with cattle on the pasture",
    "Die Pešter-Hochebene in der Abenddämmerung, eine Herde auf der Weide",
  ),
  conditions: {
    title: l(
      "Jedinstveni prirodni uslovi koji oblikuju svaku sirovinu",
      "Unique natural conditions that shape every raw material",
      "Einzigartige natürliche Bedingungen, die jeden Rohstoff prägen",
    ),
    body: [
      l(
        "Pešterska visoravan predstavlja jedno od najočuvanijih i najautentičnijih prirodnih područja regiona. Prostrane livade, čist vazduh i specifična klima stvaraju uslove koji direktno utiču na kvalitet života i ishrane stoke.",
        "The Pešter plateau is one of the best-preserved and most authentic natural areas in the region. Wide meadows, clean air and a distinctive climate create conditions that directly shape how the cattle live and feed.",
        "Die Pešter-Hochebene ist eines der am besten erhaltenen und ursprünglichsten Naturgebiete der Region. Weite Wiesen, saubere Luft und ein besonderes Klima schaffen Bedingungen, die das Leben und die Ernährung der Tiere unmittelbar prägen.",
      ),
      l(
        "U takvom okruženju nastaje sirovina koja nosi karakter: prirodan, stabilan i prepoznatljiv. Za Magnus Food, Pešter nije samo geografsko poreklo, već temelj na kojem gradimo kvalitet svakog proizvoda.",
        "In that environment the raw material gains its character: natural, stable and recognisable. For Magnus Food, Pešter is not just a place of origin, but the foundation on which we build the quality of every product.",
        "In dieser Umgebung entsteht ein Rohstoff mit Charakter: natürlich, stabil und unverwechselbar. Für Magnus Food ist Pešter nicht nur eine geografische Herkunft, sondern das Fundament, auf dem wir die Qualität jedes Produkts aufbauen.",
      ),
    ],
    streamAlt: l(
      "Krave pored potoka na Pešterskoj visoravni",
      "Cattle by a stream on the Pešter plateau",
      "Kühe an einem Bach auf der Pešter-Hochebene",
    ),
    pastureAlt: l(
      "Stado na pašnjaku Pešterske visoravni",
      "Cattle grazing on the Pešter plateau",
      "Herde auf einer Weide der Pešter-Hochebene",
    ),
  },
  climate: {
    label: l(
      "Priroda koja se ne može replicirati",
      "Nature that can't be replicated",
      "Natur, die sich nicht kopieren lässt",
    ),
    title: l(
      "Kombinacija klime, nadmorske visine i prirodne ishrane",
      "Climate, altitude and natural feed together",
      "Die Kombination aus Klima, Höhenlage und natürlicher Fütterung",
    ),
    body: [
      l(
        "Pešterska visoravan odlikuje se specifičnim klimatskim uslovima: hladnim zimama, svežim letima i velikim temperaturnim razlikama. Ovi faktori, u kombinaciji sa otvorenim prostorima i prirodnom ishranom, utiču na razvoj mesa koje se razlikuje po strukturi i ukusu.",
        "The Pešter plateau has a distinctive climate: cold winters, fresh summers and wide swings in temperature. Together with open land and natural feed, these factors produce meat that stands apart in texture and taste.",
        "Die Pešter-Hochebene zeichnet sich durch besondere klimatische Bedingungen aus: kalte Winter, frische Sommer und große Temperaturunterschiede. Zusammen mit den offenen Flächen und der natürlichen Fütterung führen diese Faktoren zu Fleisch, das sich in Struktur und Geschmack unterscheidet.",
      ),
      l(
        "Ovakvi uslovi ne mogu se veštački stvoriti niti industrijski imitirati. Upravo zato Pešter predstavlja prirodnu prednost koja daje realnu vrednost svakom proizvodu koji iz njega potiče.",
        "Conditions like these cannot be created artificially or imitated industrially. That is exactly why Pešter is a natural advantage that gives real value to every product that comes from it.",
        "Solche Bedingungen lassen sich weder künstlich schaffen noch industriell nachahmen. Genau deshalb ist Pešter ein natürlicher Vorteil, der jedem Produkt, das von dort stammt, echten Wert verleiht.",
      ),
    ],
    alt: l(
      "Krave na pašnjacima Pešterske visoravni",
      "Cattle on the pastures of the Pešter plateau",
      "Kühe auf den Weiden der Pešter-Hochebene",
    ),
  },
  core: {
    title: l(
      "Razlika je u osnovi",
      "The difference is in the foundation",
      "Der Unterschied liegt in der Grundlage",
    ),
    items: [
      {
        title: l("Prirodno poreklo", "Natural origin", "Natürliche Herkunft"),
        body: l(
          "Kvalitet počinje tamo gde nastaje sirovina, u okruženju koje omogućava prirodan razvoj i autentične karakteristike mesa.",
          "Quality begins where the raw material comes from, in an environment that allows natural growth and gives the meat its authentic character.",
          "Qualität beginnt dort, wo der Rohstoff entsteht, in einer Umgebung, die eine natürliche Entwicklung und authentische Eigenschaften des Fleisches ermöglicht.",
        ),
      },
      {
        title: l("Struktura i balans", "Texture and balance", "Struktur und Balance"),
        body: l(
          "Juneće meso karakteriše uravnotežen odnos masti i proteina, čvrsta ali sočna struktura i pun, prirodan ukus.",
          "The beef has a balanced ratio of fat to protein, a firm yet juicy texture and a full, natural taste.",
          "Das Rindfleisch zeichnet sich durch ein ausgewogenes Verhältnis von Fett und Eiweiß, eine feste und zugleich saftige Struktur und einen vollen, natürlichen Geschmack aus.",
        ),
      },
      {
        title: l("Finalni proizvod", "The final product", "Das fertige Produkt"),
        body: l(
          "Zato Magnus Food ne dodaje kvalitet, već ga prenosi kroz kontrolisan proces i standardizovanu proizvodnju.",
          "That is why Magnus Food does not add quality, it carries it through a controlled process and standardised production.",
          "Deshalb fügt Magnus Food Qualität nicht hinzu, sondern bewahrt sie durch einen kontrollierten Prozess und standardisierte Produktion.",
        ),
      },
    ] satisfies ReadonlyArray<TitledText>,
  },
  source: {
    label: l("Od prirode do proizvoda", "From nature to product", "Von der Natur zum Produkt"),
    title: l(
      "Od izvora do proizvoda, bez gubitka kvaliteta",
      "From source to product, without losing quality",
      "Von der Quelle bis zum Produkt, ohne Qualitätsverlust",
    ),
    lead: l(
      "Magnus Food povezuje prirodno poreklo sa savremenom proizvodnjom kroz jasno definisan i kontrolisan proces.",
      "Magnus Food connects natural origin with modern production through a clearly defined, controlled process.",
      "Magnus Food verbindet natürliche Herkunft mit moderner Produktion durch einen klar definierten und kontrollierten Prozess.",
    ),
    body: [
      l(
        "Naš cilj nije da menjamo sirovinu, već da očuvamo njen integritet i prenesemo njene prirodne karakteristike u finalni proizvod. Svaka faza proizvodnje, od selekcije, preko obrade, do pakovanja, razvijena je tako da minimizira gubitke i maksimalno zadrži kvalitet.",
        "Our aim is not to change the raw material, but to protect its integrity and carry its natural qualities into the final product. Every stage of production, from selection through processing to packaging, is designed to keep losses to a minimum and preserve as much quality as possible.",
        "Unser Ziel ist nicht, den Rohstoff zu verändern, sondern seine Integrität zu bewahren und seine natürlichen Eigenschaften in das fertige Produkt zu übertragen. Jede Produktionsphase, von der Auswahl über die Verarbeitung bis zur Verpackung, ist so ausgelegt, dass Verluste minimiert werden und möglichst viel Qualität erhalten bleibt.",
      ),
      l(
        "U industriji gde se kvalitet često „koriguje“, naš pristup je drugačiji: mi ga čuvamo. Standardizacija kod nas ne znači uniformnost bez karaktera, već doslednost u isporuci vrhunskog rezultata.",
        "In an industry where quality is often “corrected”, our approach is different: we preserve it. For us, standardisation does not mean uniformity without character, but consistency in delivering a top result.",
        "In einer Branche, in der Qualität oft „korrigiert“ wird, ist unser Ansatz ein anderer: Wir bewahren sie. Standardisierung bedeutet bei uns nicht Einheitlichkeit ohne Charakter, sondern Konstanz bei der Lieferung eines erstklassigen Ergebnisses.",
      ),
      l(
        "Na taj način, kvalitet Peštera ne ostaje samo na početku lanca, već postaje sastavni deo svakog proizvoda koji izlazi iz naše proizvodnje.",
        "That way, the quality of Pešter does not stay at the start of the chain: it becomes part of every product that leaves our production.",
        "So bleibt die Qualität des Pešter nicht nur am Anfang der Kette, sondern wird Teil jedes Produkts, das unsere Produktion verlässt.",
      ),
    ],
    alt: l(
      "Magnus pazarski ćevapi na tanjiru, uz pakovanje",
      "Magnus Pazar ćevapi on a plate, next to the pack",
      "Magnus Pazar-Ćevapi auf einem Teller, neben der Packung",
    ),
    cta: l("Pogledajte proizvode", "See the products", "Produkte ansehen"),
    article: l(
      "Pročitajte: Zašto poreklo mesa pravi razliku",
      "Read: Why the origin of meat makes a difference",
      "Lesen Sie: Warum die Herkunft zählt",
    ),
  },
} as const;

/* ------------------------------------------------------------------ */
/* Proizvodi                                                           */
/* ------------------------------------------------------------------ */

export const PRODUCTS_PAGE = {
  title: l(
    "Brzo zamrznuti proizvodi od mesa i testa",
    "Quick-frozen meat and dough products",
    "Schockgefrostete Fleisch- und Teigprodukte",
  ),
  intro: l(
    "Obe linije nastaju po istom sistemu, pa svaki proizvod isporučuje ono što tržište očekuje: pouzdan kvalitet, jednostavnu pripremu i autentičan ukus.",
    "Both lines are made under the same system, so every product delivers what the market expects: dependable quality, simple preparation and authentic taste.",
    "Beide Linien entstehen nach demselben System, sodass jedes Produkt liefert, was der Markt erwartet: verlässliche Qualität, einfache Zubereitung und authentischen Geschmack.",
  ),
  linesLabel: l(
    "Dve kategorije, jedan standard",
    "Two categories, one standard",
    "Zwei Kategorien, ein Standard",
  ),
  linesTitle: l(
    "Od sirovine do proizvoda, bez kompromisa",
    "From raw material to product, without compromise",
    "Vom Rohstoff zum Produkt, ohne Kompromisse",
  ),
  meatAlt: l(
    "Magnus pazarski ćevapi na dasci, uz lepinju i crveni luk",
    "Magnus Pazar ćevapi on a board with flatbread and red onion",
    "Magnus Pazar-Ćevapi auf einem Brett, mit Fladenbrot und roten Zwiebeln",
  ),
  doughAlt: l(
    "Pakovanje Magnus pazarskih mantija sa mesom, u pozadini krušna peć",
    "A pack of Magnus Pazar meat mantije, with a bread oven behind",
    "Eine Packung Magnus Pazar-Mantije mit Fleisch, im Hintergrund ein Brotbackofen",
  ),
} as const;

/* ------------------------------------------------------------------ */
/* Kontakt                                                             */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  title: l(
    "Razgovarajmo o saradnji",
    "Let's talk about working together",
    "Sprechen wir über eine Zusammenarbeit",
  ),
  intro: l(
    "Pozovite nas, pišite nam ili pošaljite upit preko forme. Odgovaramo radnim danima, od 9 do 17 časova.",
    "Call us, write to us or send an inquiry through the form. We reply on working days, 9:00 to 17:00.",
    "Rufen Sie uns an, schreiben Sie uns oder senden Sie eine Anfrage über das Formular. Wir antworten werktags von 9 bis 17 Uhr.",
  ),
  detailsLabel: l("Kontakt podaci", "Contact details", "Kontaktdaten"),
  company: l("Kompanija", "Company", "Unternehmen"),
  social: l("Društvene mreže", "Social media", "Soziale Netzwerke"),
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
  // ­ je meka crtica: na uskom ekranu (320 px) naslov se lomi kao „Datenschutz-erklärung“
  // umesto da izađe iz ekrana; na širim ekranima se ne vidi.
  title: l("Politika privatnosti", "Privacy policy", "Datenschutz­erklärung"),
  draft: {
    title: l("Nacrt za proveru", "Draft for review", "Entwurf zur Prüfung"),
    body: l(
      "Tekst opisuje kako ovaj sajt obrađuje podatke. Pre objave ga potvrđuje Magnus Food Industry, uz pravni savet.",
      "This text describes how this site handles data. Magnus Food Industry confirms it, with legal advice, before publication.",
      "Der Text beschreibt, wie diese Website Daten verarbeitet. Vor der Veröffentlichung wird er von Magnus Food Industry mit rechtlicher Beratung bestätigt.",
    ),
  },
  sections: [
    {
      title: l("Ko obrađuje podatke", "Who processes your data", "Wer die Daten verarbeitet"),
      body: [
        l(
          "Rukovalac podacima je DOOHA International Group doo, Varevo br. 18, 36300 Novi Pazar, Republika Srbija, koja posluje pod brendom Magnus Food Industry. Za pitanja o podacima pišite na office@magnusfood.rs ili pozovite +381 20 510 20 30.",
          "The data controller is DOOHA International Group doo, Varevo br. 18, 36300 Novi Pazar, Republic of Serbia, trading as Magnus Food Industry. For questions about your data, write to office@magnusfood.rs or call +381 20 510 20 30.",
          "Verantwortlicher ist die DOOHA International Group doo, Varevo br. 18, 36300 Novi Pazar, Republik Serbien, die unter der Marke Magnus Food Industry tätig ist. Bei Fragen zu Ihren Daten schreiben Sie an office@magnusfood.rs oder rufen Sie +381 20 510 20 30 an.",
        ),
      ],
    },
    {
      title: l("Koje podatke prikupljamo", "What data we collect", "Welche Daten wir erheben"),
      body: [
        l(
          "Podatke prikupljamo samo kada ih sami pošaljete preko formi na sajtu:",
          "We only collect data when you send it to us through the forms on this site:",
          "Wir erheben Daten nur, wenn Sie sie selbst über die Formulare der Website senden:",
        ),
      ],
      list: [
        l(
          "Upit za saradnju: ime i prezime, naziv kompanije ili objekta, email, telefon, tip saradnje, poruka i proizvod na koji se upit odnosi.",
          "Cooperation inquiry: full name, company or venue name, email, phone, type of cooperation, message and the product the inquiry is about.",
          "Anfrage zur Zusammenarbeit: Vor- und Nachname, Name des Unternehmens oder Betriebs, E-Mail, Telefon, Art der Zusammenarbeit, Nachricht und das Produkt, auf das sich die Anfrage bezieht.",
        ),
        l(
          "Zahtev za katalog: ime i prezime, email, naziv kompanije ako ga navedete, način kupovine i linije proizvoda koje vas zanimaju.",
          "Catalog request: full name, email, company name if you give it, how you buy and the product lines you are interested in.",
          "Kataloganforderung: Vor- und Nachname, E-Mail, Name des Unternehmens, falls Sie ihn angeben, Art des Einkaufs und die Produktlinien, die Sie interessieren.",
        ),
      ],
    },
    {
      title: l(
        "Kolačići i memorija pregledača",
        "Cookies and browser storage",
        "Cookies und Browserspeicher",
      ),
      body: [
        l(
          "Sajt ne koristi kolačiće za praćenje ni alate za analitiku. Izabrani jezik, srpski, engleski ili nemački, pamti se samo u vašem pregledaču i ne šalje se nama.",
          "This site uses no tracking cookies or analytics tools. Your choice of language, Serbian, English or German, is stored only in your browser and is not sent to us.",
          "Die Website verwendet keine Tracking-Cookies und keine Analysetools. Die gewählte Sprache, Serbisch, Englisch oder Deutsch, wird nur in Ihrem Browser gespeichert und nicht an uns übermittelt.",
        ),
      ],
    },
    {
      title: l(
        "Zašto obrađujemo podatke",
        "Why we process your data",
        "Warum wir Daten verarbeiten",
      ),
      body: [
        l(
          "Podatke koristimo da odgovorimo na vaš upit, pošaljemo katalog i cenovnik i dogovorimo saradnju. Ne prodajemo ih i ne koristimo ih za oglašavanje.",
          "We use your data to answer your inquiry, send the catalog and price list and arrange cooperation. We do not sell it or use it for advertising.",
          "Wir verwenden die Daten, um Ihre Anfrage zu beantworten, Katalog und Preisliste zu senden und die Zusammenarbeit zu vereinbaren. Wir verkaufen sie nicht und nutzen sie nicht für Werbung.",
        ),
        l(
          "Obrada se zasniva na vašem zahtevu da pre zaključenja ugovora preduzmemo radnje koje ste tražili, u skladu sa Zakonom o zaštiti podataka o ličnosti („Službeni glasnik RS“, br. 87/2018).",
          "Processing is based on your request that we take the steps you asked for before entering into a contract, in line with the Serbian Law on Personal Data Protection (Official Gazette of the Republic of Serbia, No. 87/2018).",
          "Die Verarbeitung beruht auf Ihrer Anfrage, vor Abschluss eines Vertrags die von Ihnen gewünschten Schritte durchzuführen, gemäß dem serbischen Gesetz über den Schutz personenbezogener Daten („Službeni glasnik RS“, Nr. 87/2018).",
        ),
      ],
    },
    {
      title: l(
        "Ko ima pristup i koliko dugo čuvamo podatke",
        "Who has access and how long we keep data",
        "Wer Zugriff hat und wie lange wir Daten speichern",
      ),
      body: [
        l(
          "Podacima pristupaju zaposleni koji odgovaraju na upite. Poruke sa formi stižu preko pružaoca usluga email-a i hostinga sajta, koji ih obrađuje samo po našem nalogu.",
          "Your data is accessed by the staff who answer inquiries. Form messages reach us through our email and website hosting providers, who process them only on our instructions.",
          "Zugriff auf die Daten haben die Mitarbeiter, die Anfragen beantworten. Nachrichten aus den Formularen erreichen uns über die Anbieter von E-Mail-Dienst und Website-Hosting, die sie nur in unserem Auftrag verarbeiten.",
        ),
        l(
          "Podatke čuvamo onoliko koliko je potrebno da odgovorimo na upit, a ako sarađujemo, za vreme trajanja saradnje i rokova koje propisuje zakon.",
          "We keep your data as long as we need it to answer your inquiry and, if we work together, for the duration of our cooperation and any period required by law.",
          "Wir speichern die Daten so lange, wie es für die Beantwortung der Anfrage nötig ist, und bei einer Zusammenarbeit für deren Dauer sowie für die gesetzlich vorgeschriebenen Fristen.",
        ),
      ],
    },
    {
      title: l("Vaša prava", "Your rights", "Ihre Rechte"),
      body: [
        l(
          "U vezi sa svojim podacima imate pravo na:",
          "You have the right to:",
          "In Bezug auf Ihre Daten haben Sie das Recht auf:",
        ),
      ],
      list: [
        l(
          "pristup podacima i kopiju podataka",
          "access your data and receive a copy",
          "Auskunft über die Daten und eine Kopie der Daten",
        ),
        l(
          "ispravku netačnih podataka",
          "have inaccurate data corrected",
          "Berichtigung unrichtiger Daten",
        ),
        l("brisanje podataka", "have your data erased", "Löschung der Daten"),
        l("ograničenje obrade", "restrict processing", "Einschränkung der Verarbeitung"),
        l("prigovor na obradu", "object to processing", "Widerspruch gegen die Verarbeitung"),
        l("prenosivost podataka", "data portability", "Datenübertragbarkeit"),
      ],
    },
    {
      title: l(
        "Kako da ostvarite prava",
        "How to exercise your rights",
        "So üben Sie Ihre Rechte aus",
      ),
      body: [
        l(
          "Zahtev pošaljite na office@magnusfood.rs. Ako smatrate da su vaša prava povređena, možete podneti pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti, www.poverenik.rs.",
          "Send your request to office@magnusfood.rs. If you believe your rights have been breached, you can complain to the Commissioner for Information of Public Importance and Personal Data Protection, www.poverenik.rs.",
          "Senden Sie Ihren Antrag an office@magnusfood.rs. Wenn Sie der Ansicht sind, dass Ihre Rechte verletzt wurden, können Sie Beschwerde beim Beauftragten für Informationen von öffentlicher Bedeutung und den Schutz personenbezogener Daten einlegen, www.poverenik.rs.",
        ),
      ],
    },
  ] satisfies ReadonlyArray<PolicySection>,
} as const;

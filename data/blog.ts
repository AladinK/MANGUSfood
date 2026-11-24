/**
 * Blog: četiri članka sa magnusfood.rs/blog (kategorija „Novosti“).
 *
 * Srpski tekst je preuzet sa sajta; rečenice koje su tamo stajale svaka u
 * svom redu ovde su spojene u pasuse. Engleski i nemački prevod urađeni su za ovaj sajt.
 * `legacyPath` je stara adresa članka (sa WordPress teme), sa koje
 * next.config.ts trajno preusmerava na novu.
 */

import { media, type Lang, type Localized } from "./magnusData";

export type BlogBlock =
  | { kind: "p"; text: Localized }
  | { kind: "h"; text: Localized };

export interface BlogPost {
  slug: string;
  legacyPath: string;
  /** Datum objave (ISO) */
  date: string;
  title: Localized;
  excerpt: Localized;
  image: string;
  imageAlt: Localized;
  body: ReadonlyArray<BlogBlock>;
  /** Završni potpis članka */
  signoff: Localized;
}

const p = (sr: string, en: string, de: string): BlogBlock => ({
  kind: "p",
  text: { sr, en, de },
});
const h = (sr: string, en: string, de: string): BlogBlock => ({
  kind: "h",
  text: { sr, en, de },
});

export const BLOG_CATEGORY: Localized = { sr: "Novosti", en: "News", de: "Neuigkeiten" };

export const BLOG_POSTS: ReadonlyArray<BlogPost> = [
  {
    slug: "kvalitet-bez-kompromisa",
    legacyPath: "/how-to-organize-your-bakery-for-efficient-and-joyful-baking",
    date: "2026-02-23",
    title: {
      sr: "Zašto kvalitet ne sme da ima kompromis (i kako to utiče na krajnji proizvod)",
      en: "Why quality can't compromise (and how it shapes the final product)",
      de: "Warum Qualität keine Kompromisse verträgt (und wie sich das auf das Endprodukt auswirkt)",
    },
    excerpt: {
      sr: "Kvalitet nije nešto što se dodaje na kraju. On se gradi od samog početka, a svaki kompromis u procesu ostavlja trag.",
      en: "Quality is not something added at the end. It is built from the very start, and every compromise along the way leaves a mark.",
      de: "Qualität ist nichts, was man am Ende hinzufügt. Sie wird von Anfang an aufgebaut, und jeder Kompromiss im Prozess hinterlässt Spuren.",
    },
    image: media("cevapiBoard"),
    imageAlt: {
      sr: "Magnus pazarski ćevapi na dasci, uz lepinju i crveni luk",
      en: "Magnus Pazar ćevapi on a board with flatbread and red onion",
      de: "Magnus Pazar-Ćevapi auf einem Brett, mit Fladenbrot und roten Zwiebeln",
    },
    body: [
      p(
        "Kvalitet nije nešto što se dodaje na kraju. On se gradi — od samog početka.",
        "Quality is not something added at the end. It is built — from the very start.",
        "Qualität ist nichts, was man am Ende hinzufügt. Sie wird aufgebaut – von Anfang an.",
      ),
      p(
        "Svaki kompromis napravljen u procesu ostavlja trag. Ne uvek vidljiv, ali uvek prisutan.",
        "Every compromise made along the way leaves a mark. Not always visible, but always there.",
        "Jeder Kompromiss im Prozess hinterlässt Spuren. Nicht immer sichtbar, aber immer vorhanden.",
      ),
      h("Gde kompromis počinje", "Where compromise begins", "Wo der Kompromiss beginnt"),
      p(
        "Kompromis retko dolazi kao velika odluka. Najčešće počinje sitno — u izboru sirovine, u skraćivanju procesa, u odstupanju od standarda.",
        "Compromise rarely arrives as one big decision. It usually starts small — in the choice of raw material, in a shortened process, in a step away from the standard.",
        "Ein Kompromiss kommt selten als große Entscheidung. Meist beginnt er im Kleinen – bei der Wahl des Rohstoffs, bei der Verkürzung des Prozesses, bei der Abweichung vom Standard.",
      ),
      p(
        "Na prvi pogled, razlika može delovati zanemarljivo. Ali u finalnom proizvodu, ona postaje jasna.",
        "At first glance the difference can seem negligible. But in the finished product it becomes clear.",
        "Auf den ersten Blick kann der Unterschied unbedeutend wirken. Im fertigen Produkt wird er jedoch deutlich.",
      ),
      h(
        "Kako kompromis utiče na proizvod",
        "How compromise changes the product",
        "Wie sich ein Kompromiss auf das Produkt auswirkt",
      ),
      p(
        "Kada se napravi kompromis, menja se ono što je najvažnije. Ukus postaje neujednačen. Tekstura gubi stabilnost. Kvalitet prestaje da bude dosledan.",
        "When a compromise is made, what matters most changes. The taste becomes uneven. The texture loses its stability. Quality stops being consistent.",
        "Wenn ein Kompromiss gemacht wird, verändert sich das Wichtigste. Der Geschmack wird ungleichmäßig. Die Textur verliert ihre Stabilität. Die Qualität ist nicht mehr konstant.",
      ),
      p(
        "Proizvod više ne zavisi od standarda — već od slučaja.",
        "The product no longer depends on the standard — it depends on chance.",
        "Das Produkt hängt nicht mehr vom Standard ab – sondern vom Zufall.",
      ),
      h(
        "Zašto doslednost pravi razliku",
        "Why consistency makes the difference",
        "Warum Konstanz den Unterschied macht",
      ),
      p(
        "Kvalitet se ne meri jednim dobrim proizvodom. Meri se time da svaki sledeći bude isti.",
        "Quality is not measured by one good product. It is measured by every next one being the same.",
        "Qualität misst man nicht an einem guten Produkt. Man misst sie daran, dass jedes weitere genauso ist.",
      ),
      p(
        "To je moguće samo kada nema odstupanja — kada se svaki korak prati i kada standard ostaje isti, bez obzira na okolnosti.",
        "That is only possible when there are no deviations — when every step is monitored and the standard stays the same, whatever the circumstances.",
        "Das ist nur möglich, wenn es keine Abweichungen gibt – wenn jeder Schritt überwacht wird und der Standard gleich bleibt, unabhängig von den Umständen.",
      ),
      p(
        "Doslednost nije dodatna vrednost. Ona je osnova poverenja.",
        "Consistency is not an added value. It is the basis of trust.",
        "Konstanz ist kein Zusatznutzen. Sie ist die Grundlage des Vertrauens.",
      ),
      h(
        "Bez kompromisa kao princip",
        "No compromise as a principle",
        "Ohne Kompromisse als Prinzip",
      ),
      p(
        "Odluka da nema kompromisa znači da se ništa ne prepušta slučaju. Izbor sirovine, način obrade i svaki korak procesa imaju jasan standard koji se ne spušta.",
        "Deciding on no compromise means leaving nothing to chance. The choice of raw material, the processing and every step of the process have a clear standard that is never lowered.",
        "Die Entscheidung gegen Kompromisse bedeutet, nichts dem Zufall zu überlassen. Die Wahl des Rohstoffs, die Art der Verarbeitung und jeder Schritt des Prozesses haben einen klaren Standard, der nicht gesenkt wird.",
      ),
      p(
        "Ne zbog imidža, već zbog rezultata. Jer samo tako kvalitet ostaje ono što treba da bude — siguran.",
        "Not for the image, but for the result. Because that is the only way quality stays what it should be — certain.",
        "Nicht wegen des Images, sondern wegen des Ergebnisses. Denn nur so bleibt Qualität das, was sie sein soll – verlässlich.",
      ),
      h("Zaključak", "Conclusion", "Fazit"),
      p(
        "Kvalitet bez kompromisa nije marketinška poruka. To je način rada. On se vidi u svakom detalju i oseća u svakom zalogaju.",
        "Quality without compromise is not a marketing message. It is a way of working. You can see it in every detail and taste it in every bite.",
        "Qualität ohne Kompromisse ist keine Marketingbotschaft. Sie ist eine Arbeitsweise. Man sieht sie in jedem Detail und schmeckt sie in jedem Bissen.",
      ),
      p(
        "Zato Magnus ne pravi izuzetke. Jer kada se standard jednom spusti — više nije standard.",
        "That is why Magnus makes no exceptions. Because once a standard is lowered — it is no longer a standard.",
        "Deshalb macht Magnus keine Ausnahmen. Denn wenn ein Standard einmal gesenkt wird – ist er kein Standard mehr.",
      ),
    ],
    signoff: {
      sr: "Magnus. Bez kompromisa.",
      en: "Magnus. No compromise.",
      de: "Magnus. Ohne Kompromisse.",
    },
  },
  {
    slug: "savrsen-rostilj-kod-kuce",
    legacyPath: "/tips-for-turning-your-small-kitchen-into-a-bakery-haven",
    date: "2026-02-23",
    title: {
      sr: "Kako napraviti savršen roštilj kod kuće (uz pravi izbor mesa)",
      en: "How to make a perfect barbecue at home (with the right choice of meat)",
      de: "So gelingt das perfekte Grillen zu Hause (mit der richtigen Wahl des Fleisches)",
    },
    excerpt: {
      sr: "Dobar roštilj ne počinje vatrom, nego izborom mesa. Kada je osnova kvalitetna, sve ostalo dolazi prirodno.",
      en: "A good barbecue doesn't start with fire, but with the choice of meat. When the base is good, everything else follows naturally.",
      de: "Gutes Grillen beginnt nicht mit dem Feuer, sondern mit der Wahl des Fleisches. Wenn die Grundlage stimmt, ergibt sich alles andere von selbst.",
    },
    image: media("sceneBurger"),
    imageAlt: {
      sr: "Pakovanje Magnus Premium Burgera i sirovi burgeri na stolu, u pozadini roštilj u predvečerje",
      en: "A Magnus Premium Burger pack and raw patties on a table, with a barbecue in the background at dusk",
      de: "Eine Packung Magnus Premium Burger und rohe Burger auf einem Tisch, im Hintergrund ein Grill in der Abenddämmerung",
    },
    body: [
      p(
        "Dobar roštilj ne počinje vatrom. Počinje izborom mesa.",
        "A good barbecue does not start with fire. It starts with the choice of meat.",
        "Gutes Grillen beginnt nicht mit dem Feuer. Es beginnt mit der Wahl des Fleisches.",
      ),
      p(
        "Bez obzira na tehniku ili začine, krajnji rezultat uvek zavisi od onoga što je na roštilju. Kada je osnova kvalitetna, sve ostalo dolazi prirodno.",
        "Whatever the technique or seasoning, the result always depends on what is on the grill. When the base is good, everything else follows naturally.",
        "Unabhängig von Technik oder Gewürzen hängt das Ergebnis immer davon ab, was auf dem Grill liegt. Wenn die Grundlage stimmt, ergibt sich alles andere von selbst.",
      ),
      h(
        "Izbor mesa kao ključna odluka",
        "Choosing the meat is the key decision",
        "Die Wahl des Fleisches als wichtigste Entscheidung",
      ),
      p(
        "Najvažniji korak pravi se pre nego što roštilj uopšte počne.",
        "The most important step is taken before the grill is even lit.",
        "Der wichtigste Schritt erfolgt, bevor das Grillen überhaupt beginnt.",
      ),
      p(
        "Meso od 100% junećeg sastava, sa jasnim poreklom i kontrolisanim procesom, daje stabilan rezultat — u ukusu, teksturi i sočnosti. Takvo meso ne zahteva dodatne intervencije, jer već ima ono što je potrebno.",
        "Meat that is 100% beef, with a clear origin and a controlled process, gives a steady result — in taste, texture and juiciness. Meat like that needs no extra help, because it already has what it needs.",
        "Fleisch aus 100 % Rind, mit klarer Herkunft und kontrolliertem Prozess, liefert ein stabiles Ergebnis – in Geschmack, Textur und Saftigkeit. Solches Fleisch braucht keine zusätzlichen Eingriffe, denn es hat bereits alles, was nötig ist.",
      ),
      p(
        "Zato izbor nije samo pitanje vrste proizvoda, već i njegovog kvaliteta.",
        "So the choice is not only about the type of product, but also about its quality.",
        "Deshalb ist die Wahl nicht nur eine Frage der Produktart, sondern auch der Qualität.",
      ),
      h(
        "Priprema bez komplikacija",
        "Preparation without complications",
        "Zubereitung ohne Umstände",
      ),
      p(
        "Kod kvalitetnog mesa, priprema treba da bude jednostavna.",
        "With good meat, preparation should be simple.",
        "Bei gutem Fleisch sollte die Zubereitung einfach sein.",
      ),
      p(
        "Nema potrebe za složenim marinadama ili velikim količinama začina. Dovoljno je osnovno — malo soli, pravilna temperatura i dovoljno vremena.",
        "There is no need for complicated marinades or lots of seasoning. The basics are enough — a little salt, the right temperature and enough time.",
        "Aufwendige Marinaden oder große Mengen an Gewürzen sind nicht nötig. Das Wesentliche genügt – etwas Salz, die richtige Temperatur und genug Zeit.",
      ),
      p(
        "Cilj nije da se ukus promeni, već da se istakne ono što već postoji.",
        "The aim is not to change the taste, but to bring out what is already there.",
        "Ziel ist nicht, den Geschmack zu verändern, sondern das hervorzuheben, was bereits da ist.",
      ),
      h("Kontrola temperature", "Temperature control", "Temperaturkontrolle"),
      p(
        "Jedna od najčešćih grešaka je previsoka temperatura.",
        "One of the most common mistakes is too much heat.",
        "Einer der häufigsten Fehler ist eine zu hohe Temperatur.",
      ),
      p(
        "Prejak plamen može brzo zapeći spolja, dok unutrašnjost ostaje nedovoljno pripremljena. Srednje jaka, stabilna temperatura omogućava ravnomerno pečenje i očuvanje sočnosti.",
        "A fierce flame can quickly char the outside while the inside stays underdone. Medium, steady heat cooks the meat evenly and keeps it juicy.",
        "Eine zu starke Flamme kann das Fleisch außen schnell anbrennen lassen, während das Innere nicht gar wird. Eine mittlere, stabile Temperatur sorgt für gleichmäßiges Garen und erhält die Saftigkeit.",
      ),
      p(
        "Roštilj traži kontrolu, ne brzinu.",
        "A grill asks for control, not speed.",
        "Grillen verlangt Kontrolle, nicht Tempo.",
      ),
      h("Vreme i strpljenje", "Time and patience", "Zeit und Geduld"),
      p(
        "Savršen roštilj ne pravi se na brzinu.",
        "A perfect barbecue is not made in a hurry.",
        "Perfektes Grillen gelingt nicht in Eile.",
      ),
      p(
        "Meso treba okretati u pravom trenutku i ostaviti mu dovoljno vremena da se pripremi kako treba. Prečesto okretanje ili stalno pritiskanje mesa dovodi do gubitka sokova i teksture.",
        "Turn the meat at the right moment and give it enough time to cook properly. Turning it too often or pressing it down squeezes out the juices and spoils the texture.",
        "Das Fleisch sollte im richtigen Moment gewendet werden und genug Zeit bekommen, um richtig zu garen. Zu häufiges Wenden oder ständiges Andrücken führt zum Verlust von Saft und Textur.",
      ),
      p(
        "Manje intervencije — bolji rezultat.",
        "Less handling — a better result.",
        "Weniger Eingriffe – besseres Ergebnis.",
      ),
      h("Kada je sve kako treba", "When everything is right", "Wenn alles stimmt"),
      p(
        "Kada su meso, temperatura i priprema usklađeni, razlika je jasna.",
        "When the meat, the temperature and the preparation work together, the difference is clear.",
        "Wenn Fleisch, Temperatur und Zubereitung zusammenpassen, ist der Unterschied deutlich.",
      ),
      p(
        "Ukus je pun, tekstura ujednačena, a rezultat dosledan — bez potrebe za dodatnim koracima ili korekcijama.",
        "The taste is full, the texture even and the result consistent — with no need for extra steps or corrections.",
        "Der Geschmack ist voll, die Textur gleichmäßig und das Ergebnis konstant – ohne zusätzliche Schritte oder Korrekturen.",
      ),
      h("Zaključak", "Conclusion", "Fazit"),
      p(
        "Savršen roštilj nije rezultat trikova. On je rezultat pravih odluka.",
        "A perfect barbecue is not the result of tricks. It is the result of the right decisions.",
        "Perfektes Grillen ist nicht das Ergebnis von Tricks. Es ist das Ergebnis richtiger Entscheidungen.",
      ),
      p(
        "Počinje izborom kvalitetnog mesa i završava se jednostavnom pripremom koja to poštuje. Jer kada je osnova prava — sve ostalo dolazi na svoje mesto.",
        "It starts with choosing good meat and ends with simple preparation that respects it. Because when the base is right — everything else falls into place.",
        "Es beginnt mit der Wahl von gutem Fleisch und endet mit einer einfachen Zubereitung, die das respektiert. Denn wenn die Grundlage stimmt – findet alles andere seinen Platz.",
      ),
    ],
    signoff: {
      sr: "Magnus. Samo pravo meso.",
      en: "Magnus. Only real meat.",
      de: "Magnus. Nur echtes Fleisch.",
    },
  },
  {
    slug: "mitovi-o-zamrznutom-mesu",
    legacyPath: "/understanding-the-science-of-yeast-in-artisanal-baking",
    date: "2026-02-23",
    title: {
      sr: "Mitovi o zamrznutom mesu: da li je kvalitet očuvan?",
      en: "Myths about frozen meat: is quality preserved?",
      de: "Mythen über Tiefkühlfleisch: Bleibt die Qualität erhalten?",
    },
    excerpt: {
      sr: "Zamrznuto meso često prati loša reputacija. Koliko je tačno da zamrzavanje znači slabiji ukus i manju nutritivnu vrednost?",
      en: "Frozen meat often has a bad reputation. How true is it that freezing means weaker taste and lower nutritional value?",
      de: "Tiefkühlfleisch hat oft einen schlechten Ruf. Wie viel Wahrheit steckt in der Annahme, dass Einfrieren schwächeren Geschmack und geringeren Nährwert bedeutet?",
    },
    image: media("freezer"),
    imageAlt: {
      sr: "Pakovanja Magnus ćevapa, ljute kobasice i Premium Burgera u zamrzivaču",
      en: "Packs of Magnus ćevapi, hot sausage and the Premium Burger in a freezer",
      de: "Packungen mit Magnus Ćevapi, scharfer Wurst und Premium Burger in einer Gefriertruhe",
    },
    body: [
      p(
        "Zamrznuto meso često prati loša reputacija. Mnogi ga povezuju sa gubitkom kvaliteta, slabijim ukusom ili manjom nutritivnom vrednošću.",
        "Frozen meat often has a bad reputation. Many people link it with a loss of quality, weaker taste or lower nutritional value.",
        "Tiefkühlfleisch hat oft einen schlechten Ruf. Viele verbinden es mit Qualitätsverlust, schwächerem Geschmack oder geringerem Nährwert.",
      ),
      p(
        "Ali koliko je to zaista tačno?",
        "But how true is that really?",
        "Aber wie viel davon stimmt wirklich?",
      ),
      h(
        "Šta se zapravo dešava pri zamrzavanju",
        "What actually happens during freezing",
        "Was beim Einfrieren tatsächlich passiert",
      ),
      p(
        "Proces zamrzavanja ima jednostavnu funkciju — da očuva svežinu mesa u trenutku kada je ono u svom najboljem stanju.",
        "Freezing has one simple job — to keep the meat fresh at the moment it is at its best.",
        "Das Einfrieren hat eine einfache Aufgabe – die Frische des Fleisches in dem Moment zu bewahren, in dem es in bestem Zustand ist.",
      ),
      p(
        "Kada se meso brzo zamrzne na odgovarajućoj temperaturi, zaustavljaju se procesi koji utiču na kvarenje. Time se „zaključavaju“ ukus, tekstura i nutritivne vrednosti.",
        "When meat is quick-frozen at the right temperature, the processes that cause spoilage stop. That “locks in” the taste, texture and nutritional value.",
        "Wenn Fleisch bei der richtigen Temperatur schnell eingefroren wird, stoppen die Prozesse, die zum Verderb führen. So werden Geschmack, Textur und Nährwerte „eingeschlossen“.",
      ),
      p(
        "Drugim rečima, kvalitet se ne gubi — on se čuva.",
        "In other words, quality is not lost — it is kept.",
        "Mit anderen Worten: Die Qualität geht nicht verloren – sie wird bewahrt.",
      ),
      h(
        "Mit: zamrznuto meso je manje kvalitetno",
        "Myth: frozen meat is lower quality",
        "Mythos: Tiefkühlfleisch ist von geringerer Qualität",
      ),
      p(
        "Jedna od najčešćih zabluda jeste da zamrznuto meso automatski znači niži kvalitet.",
        "One of the most common misconceptions is that frozen meat automatically means lower quality.",
        "Einer der häufigsten Irrtümer ist, dass Tiefkühlfleisch automatisch geringere Qualität bedeutet.",
      ),
      p(
        "U praksi, kvalitet zavisi od dva ključna faktora: porekla i procesa.",
        "In practice, quality depends on two key factors: origin and process.",
        "In der Praxis hängt die Qualität von zwei entscheidenden Faktoren ab: Herkunft und Prozess.",
      ),
      p(
        "Ako je meso kvalitetno na početku i ako se zamrzavanje vrši pravilno, razlika u odnosu na sveže meso je minimalna — često i neprimetna.",
        "If the meat is good to begin with and it is frozen properly, the difference from fresh meat is minimal — often unnoticeable.",
        "Wenn das Fleisch von Anfang an hochwertig ist und richtig eingefroren wird, ist der Unterschied zu frischem Fleisch minimal – oft gar nicht wahrnehmbar.",
      ),
      h(
        "Mit: zamrzavanje uništava nutritivne vrednosti",
        "Myth: freezing destroys nutrients",
        "Mythos: Einfrieren zerstört die Nährwerte",
      ),
      p(
        "Zamrzavanje ne uklanja proteine, minerale ili druge važne nutritivne elemente.",
        "Freezing does not remove proteins, minerals or other important nutrients.",
        "Einfrieren entfernt weder Eiweiß noch Mineralstoffe oder andere wichtige Nährstoffe.",
      ),
      p(
        "Naprotiv, pravilno zamrznuto meso zadržava svoju nutritivnu vrednost, jer se procesi razgradnje zaustavljaju na niskim temperaturama.",
        "On the contrary, properly frozen meat keeps its nutritional value, because the processes of breakdown stop at low temperatures.",
        "Im Gegenteil: Richtig eingefrorenes Fleisch behält seinen Nährwert, weil die Abbauprozesse bei niedrigen Temperaturen stoppen.",
      ),
      h("Gde nastaje razlika", "Where the difference comes from", "Wo der Unterschied entsteht"),
      p(
        "Razlika ne nastaje zbog samog zamrzavanja, već zbog načina na koji se ono sprovodi.",
        "The difference does not come from freezing itself, but from how it is done.",
        "Der Unterschied entsteht nicht durch das Einfrieren selbst, sondern durch die Art, wie es durchgeführt wird.",
      ),
      p(
        "Sporo ili nepravilno zamrzavanje može uticati na strukturu mesa. Sa druge strane, brzo zamrzavanje na niskim temperaturama čuva teksturu, sočnost i ukus.",
        "Slow or improper freezing can affect the structure of the meat. Quick freezing at low temperatures, on the other hand, keeps the texture, juiciness and taste.",
        "Langsames oder unsachgemäßes Einfrieren kann die Struktur des Fleisches beeinträchtigen. Schnelles Einfrieren bei niedrigen Temperaturen bewahrt dagegen Textur, Saftigkeit und Geschmack.",
      ),
      p(
        "Zato je kontrolisan proces ključan.",
        "That is why a controlled process is key.",
        "Deshalb ist ein kontrollierter Prozess entscheidend.",
      ),
      h("Zašto je zamrzavanje važno", "Why freezing matters", "Warum das Einfrieren wichtig ist"),
      p(
        "Zamrzavanje omogućava da kvalitet mesa ostane stabilan kroz vreme.",
        "Freezing keeps the quality of the meat stable over time.",
        "Das Einfrieren sorgt dafür, dass die Qualität des Fleisches über die Zeit stabil bleibt.",
      ),
      p(
        "To znači da proizvod koji dolazi do potrošača zadržava ista svojstva kao u trenutku kada je meso bilo sveže — bez potrebe za dodatnim intervencijama.",
        "It means the product that reaches the customer keeps the same properties it had when the meat was fresh — with no need for further intervention.",
        "Das bedeutet, dass das Produkt, das beim Verbraucher ankommt, dieselben Eigenschaften behält wie in dem Moment, als das Fleisch frisch war – ohne zusätzliche Eingriffe.",
      ),
      h("Zaključak", "Conclusion", "Fazit"),
      p(
        "Zamrznuto meso nije kompromis — ako je proces pravilno sproveden.",
        "Frozen meat is not a compromise — if the process is done properly.",
        "Tiefkühlfleisch ist kein Kompromiss – wenn der Prozess richtig durchgeführt wird.",
      ),
      p(
        "Kada se spoje kvalitetno poreklo i kontrolisano zamrzavanje, rezultat ostaje isti: čist ukus, stabilan kvalitet i sigurnost u svakom zalogaju.",
        "When good origin and controlled freezing come together, the result stays the same: clean taste, steady quality and confidence in every bite.",
        "Wenn hochwertige Herkunft und kontrolliertes Einfrieren zusammenkommen, bleibt das Ergebnis gleich: reiner Geschmack, stabile Qualität und Sicherheit in jedem Bissen.",
      ),
    ],
    signoff: {
      sr: "Magnus. Bez kompromisa.",
      en: "Magnus. No compromise.",
      de: "Magnus. Ohne Kompromisse.",
    },
  },
  {
    slug: "poreklo-mesa-pester",
    legacyPath: "/creative-ways-to-decorate-cupcakes-like-a-professional-baker",
    date: "2026-02-23",
    title: {
      sr: "Zašto poreklo mesa pravi razliku? (Pešterska visoravan kao standard)",
      en: "Why does the origin of meat make a difference? (The Pešter plateau as the standard)",
      de: "Warum macht die Herkunft des Fleisches den Unterschied? (Die Pešter-Hochebene als Standard)",
    },
    excerpt: {
      sr: "Kvalitet mesa ne počinje u proizvodnji, nego mnogo ranije, tamo gde se ono uzgaja. Poreklo određuje ukus, teksturu i sigurnost.",
      en: "The quality of meat does not start in production, but much earlier, where the animals are raised. Origin decides taste, texture and safety.",
      de: "Die Qualität des Fleisches beginnt nicht in der Produktion, sondern viel früher, dort, wo die Tiere aufwachsen. Die Herkunft bestimmt Geschmack, Textur und Sicherheit.",
    },
    image: media("pesterSunset"),
    imageAlt: {
      sr: "Pešterska visoravan u predvečerje, stado na pašnjaku",
      en: "The Pešter plateau at dusk, with cattle on the pasture",
      de: "Die Pešter-Hochebene in der Abenddämmerung, eine Herde auf der Weide",
    },
    body: [
      p(
        "Kvalitet mesa ne počinje u proizvodnji. Počinje mnogo ranije — tamo gde se ono uzgaja.",
        "The quality of meat does not start in production. It starts much earlier — where the animals are raised.",
        "Die Qualität des Fleisches beginnt nicht in der Produktion. Sie beginnt viel früher – dort, wo die Tiere aufwachsen.",
      ),
      p(
        "Poreklo nije detalj koji se dodaje na kraju priče. Ono određuje sve: ukus, teksturu i sigurnost proizvoda koji dolazi do potrošača.",
        "Origin is not a detail added at the end of the story. It determines everything: the taste, the texture and the safety of the product that reaches the customer.",
        "Die Herkunft ist kein Detail, das am Ende der Geschichte hinzugefügt wird. Sie bestimmt alles: Geschmack, Textur und Sicherheit des Produkts, das beim Verbraucher ankommt.",
      ),
      h(
        "Priroda kao osnova kvaliteta",
        "Nature as the basis of quality",
        "Die Natur als Grundlage der Qualität",
      ),
      p(
        "Pešterska visoravan je specifična po svojim prirodnim uslovima — nadmorskoj visini, čistom vazduhu i načinu ishrane stoke. U takvom okruženju meso razvija ono što je najvažnije: prirodan, pun ukus i stabilan kvalitet.",
        "The Pešter plateau is set apart by its natural conditions — its altitude, clean air and the way the cattle are fed. In that environment the meat develops what matters most: a natural, full taste and steady quality.",
        "Die Pešter-Hochebene ist durch ihre natürlichen Bedingungen besonders – die Höhenlage, die saubere Luft und die Art der Fütterung der Tiere. In dieser Umgebung entwickelt das Fleisch das Wichtigste: einen natürlichen, vollen Geschmack und stabile Qualität.",
      ),
      p(
        "To nije rezultat naknadne obrade ili dodataka. To je rezultat okruženja u kojem sve počinje.",
        "It is not the result of later processing or additives. It is the result of the place where everything begins.",
        "Das ist nicht das Ergebnis nachträglicher Verarbeitung oder von Zusätzen. Es ist das Ergebnis der Umgebung, in der alles beginnt.",
      ),
      h(
        "Kako poreklo utiče na ukus",
        "How origin affects taste",
        "Wie die Herkunft den Geschmack beeinflusst",
      ),
      p(
        "Kada meso dolazi iz kontrolisanog i prirodnog izvora, razlika se oseća već pri prvom zalogaju. Tekstura je ujednačena, sočnost prirodna, a ukus jasan i izražen.",
        "When meat comes from a controlled, natural source, you can taste the difference from the first bite. The texture is even, the juiciness natural and the taste clear and pronounced.",
        "Wenn Fleisch aus einer kontrollierten und natürlichen Quelle stammt, spürt man den Unterschied schon beim ersten Bissen. Die Textur ist gleichmäßig, die Saftigkeit natürlich und der Geschmack klar und ausgeprägt.",
      ),
      p(
        "Takvo meso ne traži korekcije. Ne zavisi od dodataka. Ono već ima ono što je potrebno.",
        "Meat like that needs no corrections. It does not depend on additives. It already has what it needs.",
        "Solches Fleisch braucht keine Korrekturen. Es hängt nicht von Zusätzen ab. Es hat bereits, was nötig ist.",
      ),
      h(
        "Zašto poreklo znači i sigurnost?",
        "Why does origin also mean safety?",
        "Warum bedeutet Herkunft auch Sicherheit?",
      ),
      p(
        "Jasno poreklo znači jasnu kontrolu. Kada se zna odakle meso dolazi, moguće je pratiti svaki korak — od uzgoja do finalnog proizvoda.",
        "A clear origin means clear control. When you know where the meat comes from, you can follow every step — from raising to the finished product.",
        "Klare Herkunft bedeutet klare Kontrolle. Wenn man weiß, woher das Fleisch kommt, lässt sich jeder Schritt nachverfolgen – von der Aufzucht bis zum fertigen Produkt.",
      ),
      p(
        "To donosi sigurnost da kvalitet nije slučajan, već dosledan. I da ostaje isti — svaki put.",
        "That gives the certainty that quality is not a matter of chance, but consistent. And that it stays the same — every time.",
        "Das gibt die Sicherheit, dass Qualität kein Zufall ist, sondern konstant. Und dass sie gleich bleibt – jedes Mal.",
      ),
      h("Pešter kao standard", "Pešter as the standard", "Pešter als Standard"),
      p(
        "Za Magnus, izbor Pešterske visoravni nije pitanje imidža. To je pitanje osnove.",
        "For Magnus, choosing the Pešter plateau is not a question of image. It is a question of foundations.",
        "Für Magnus ist die Wahl der Pešter-Hochebene keine Frage des Images. Sie ist eine Frage der Grundlage.",
      ),
      p(
        "Jer kada kvalitet postoji na početku, nema potrebe za kompromisima kasnije. Sve što sledi oslanja se na isti princip — zadržati ono što je već kako treba.",
        "Because when quality is there at the start, there is no need for compromise later. Everything that follows rests on the same principle — keep what is already right.",
        "Denn wenn die Qualität von Anfang an da ist, braucht es später keine Kompromisse. Alles Weitere stützt sich auf dasselbe Prinzip – zu bewahren, was bereits stimmt.",
      ),
      h("Zaključak", "Conclusion", "Fazit"),
      p(
        "Poreklo mesa određuje više nego što se vidi na prvi pogled. Ono definiše ukus, kvalitet i poverenje.",
        "The origin of meat decides more than meets the eye. It defines taste, quality and trust.",
        "Die Herkunft des Fleisches bestimmt mehr, als man auf den ersten Blick sieht. Sie definiert Geschmack, Qualität und Vertrauen.",
      ),
      p(
        "Zato Magnus počinje tamo gde sve ima smisla — na izvoru.",
        "That is why Magnus starts where everything makes sense — at the source.",
        "Deshalb beginnt Magnus dort, wo alles Sinn ergibt – an der Quelle.",
      ),
    ],
    signoff: {
      sr: "Magnus. Samo pravo meso.",
      en: "Magnus. Only real meat.",
      de: "Magnus. Nur echtes Fleisch.",
    },
  },
];

export const getPost = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((post) => post.slug === slug);

export const postHref = (slug: string): string => `/blog/${slug}`;

/** Datum u formatu sajta: 23. 2. 2026. / 23 February 2026 / 23. Februar 2026 */
export const formatPostDate = (iso: string, lang: Lang): string => {
  const date = new Date(`${iso}T12:00:00Z`);
  if (lang === "sr") {
    return `${date.getUTCDate()}. ${date.getUTCMonth() + 1}. ${date.getUTCFullYear()}.`;
  }
  return date.toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

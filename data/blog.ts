/**
 * Blog: četiri članka sa magnusfood.rs/blog (kategorija „Novosti“).
 *
 * Srpski tekst je preuzet sa sajta; rečenice koje su tamo stajale svaka u
 * svom redu ovde su spojene u pasuse. Engleski prevod je urađen za ovaj sajt.
 * `legacyPath` je stara adresa članka (sa WordPress teme), sa koje
 * next.config.ts trajno preusmerava na novu.
 */

import { media, type Localized } from "./magnusData";

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

const p = (sr: string, en: string): BlogBlock => ({ kind: "p", text: { sr, en } });
const h = (sr: string, en: string): BlogBlock => ({ kind: "h", text: { sr, en } });

export const BLOG_CATEGORY: Localized = { sr: "Novosti", en: "News" };

export const BLOG_POSTS: ReadonlyArray<BlogPost> = [
  {
    slug: "kvalitet-bez-kompromisa",
    legacyPath: "/how-to-organize-your-bakery-for-efficient-and-joyful-baking",
    date: "2026-02-23",
    title: {
      sr: "Zašto kvalitet ne sme da ima kompromis (i kako to utiče na krajnji proizvod)",
      en: "Why quality can't compromise (and how it shapes the final product)",
    },
    excerpt: {
      sr: "Kvalitet nije nešto što se dodaje na kraju. On se gradi od samog početka, a svaki kompromis u procesu ostavlja trag.",
      en: "Quality is not something added at the end. It is built from the very start, and every compromise along the way leaves a mark.",
    },
    image: media("cevapiBoard"),
    imageAlt: {
      sr: "Magnus pazarski ćevapi na dasci, uz lepinju i crveni luk",
      en: "Magnus Pazar ćevapi on a board with flatbread and red onion",
    },
    body: [
      p(
        "Kvalitet nije nešto što se dodaje na kraju. On se gradi — od samog početka.",
        "Quality is not something added at the end. It is built — from the very start.",
      ),
      p(
        "Svaki kompromis napravljen u procesu ostavlja trag. Ne uvek vidljiv, ali uvek prisutan.",
        "Every compromise made along the way leaves a mark. Not always visible, but always there.",
      ),
      h("Gde kompromis počinje", "Where compromise begins"),
      p(
        "Kompromis retko dolazi kao velika odluka. Najčešće počinje sitno — u izboru sirovine, u skraćivanju procesa, u odstupanju od standarda.",
        "Compromise rarely arrives as one big decision. It usually starts small — in the choice of raw material, in a shortened process, in a step away from the standard.",
      ),
      p(
        "Na prvi pogled, razlika može delovati zanemarljivo. Ali u finalnom proizvodu, ona postaje jasna.",
        "At first glance the difference can seem negligible. But in the finished product it becomes clear.",
      ),
      h("Kako kompromis utiče na proizvod", "How compromise changes the product"),
      p(
        "Kada se napravi kompromis, menja se ono što je najvažnije. Ukus postaje neujednačen. Tekstura gubi stabilnost. Kvalitet prestaje da bude dosledan.",
        "When a compromise is made, what matters most changes. The taste becomes uneven. The texture loses its stability. Quality stops being consistent.",
      ),
      p(
        "Proizvod više ne zavisi od standarda — već od slučaja.",
        "The product no longer depends on the standard — it depends on chance.",
      ),
      h("Zašto doslednost pravi razliku", "Why consistency makes the difference"),
      p(
        "Kvalitet se ne meri jednim dobrim proizvodom. Meri se time da svaki sledeći bude isti.",
        "Quality is not measured by one good product. It is measured by every next one being the same.",
      ),
      p(
        "To je moguće samo kada nema odstupanja — kada se svaki korak prati i kada standard ostaje isti, bez obzira na okolnosti.",
        "That is only possible when there are no deviations — when every step is monitored and the standard stays the same, whatever the circumstances.",
      ),
      p(
        "Doslednost nije dodatna vrednost. Ona je osnova poverenja.",
        "Consistency is not an added value. It is the basis of trust.",
      ),
      h("Bez kompromisa kao princip", "No compromise as a principle"),
      p(
        "Odluka da nema kompromisa znači da se ništa ne prepušta slučaju. Izbor sirovine, način obrade i svaki korak procesa imaju jasan standard koji se ne spušta.",
        "Deciding on no compromise means leaving nothing to chance. The choice of raw material, the processing and every step of the process have a clear standard that is never lowered.",
      ),
      p(
        "Ne zbog imidža, već zbog rezultata. Jer samo tako kvalitet ostaje ono što treba da bude — siguran.",
        "Not for the image, but for the result. Because that is the only way quality stays what it should be — certain.",
      ),
      h("Zaključak", "Conclusion"),
      p(
        "Kvalitet bez kompromisa nije marketinška poruka. To je način rada. On se vidi u svakom detalju i oseća u svakom zalogaju.",
        "Quality without compromise is not a marketing message. It is a way of working. You can see it in every detail and taste it in every bite.",
      ),
      p(
        "Zato Magnus ne pravi izuzetke. Jer kada se standard jednom spusti — više nije standard.",
        "That is why Magnus makes no exceptions. Because once a standard is lowered — it is no longer a standard.",
      ),
    ],
    signoff: { sr: "Magnus. Bez kompromisa.", en: "Magnus. No compromise." },
  },
  {
    slug: "savrsen-rostilj-kod-kuce",
    legacyPath: "/tips-for-turning-your-small-kitchen-into-a-bakery-haven",
    date: "2026-02-23",
    title: {
      sr: "Kako napraviti savršen roštilj kod kuće (uz pravi izbor mesa)",
      en: "How to make a perfect barbecue at home (with the right choice of meat)",
    },
    excerpt: {
      sr: "Dobar roštilj ne počinje vatrom, nego izborom mesa. Kada je osnova kvalitetna, sve ostalo dolazi prirodno.",
      en: "A good barbecue doesn't start with fire, but with the choice of meat. When the base is good, everything else follows naturally.",
    },
    image: media("sceneBurger"),
    imageAlt: {
      sr: "Pakovanje Magnus Premium Burgera i sirovi burgeri na stolu, u pozadini roštilj u predvečerje",
      en: "A Magnus Premium Burger pack and raw patties on a table, with a barbecue in the background at dusk",
    },
    body: [
      p(
        "Dobar roštilj ne počinje vatrom. Počinje izborom mesa.",
        "A good barbecue does not start with fire. It starts with the choice of meat.",
      ),
      p(
        "Bez obzira na tehniku ili začine, krajnji rezultat uvek zavisi od onoga što je na roštilju. Kada je osnova kvalitetna, sve ostalo dolazi prirodno.",
        "Whatever the technique or seasoning, the result always depends on what is on the grill. When the base is good, everything else follows naturally.",
      ),
      h("Izbor mesa kao ključna odluka", "Choosing the meat is the key decision"),
      p(
        "Najvažniji korak pravi se pre nego što roštilj uopšte počne.",
        "The most important step is taken before the grill is even lit.",
      ),
      p(
        "Meso od 100% junećeg sastava, sa jasnim poreklom i kontrolisanim procesom, daje stabilan rezultat — u ukusu, teksturi i sočnosti. Takvo meso ne zahteva dodatne intervencije, jer već ima ono što je potrebno.",
        "Meat that is 100% beef, with a clear origin and a controlled process, gives a steady result — in taste, texture and juiciness. Meat like that needs no extra help, because it already has what it needs.",
      ),
      p(
        "Zato izbor nije samo pitanje vrste proizvoda, već i njegovog kvaliteta.",
        "So the choice is not only about the type of product, but also about its quality.",
      ),
      h("Priprema bez komplikacija", "Preparation without complications"),
      p(
        "Kod kvalitetnog mesa, priprema treba da bude jednostavna.",
        "With good meat, preparation should be simple.",
      ),
      p(
        "Nema potrebe za složenim marinadama ili velikim količinama začina. Dovoljno je osnovno — malo soli, pravilna temperatura i dovoljno vremena.",
        "There is no need for complicated marinades or lots of seasoning. The basics are enough — a little salt, the right temperature and enough time.",
      ),
      p(
        "Cilj nije da se ukus promeni, već da se istakne ono što već postoji.",
        "The aim is not to change the taste, but to bring out what is already there.",
      ),
      h("Kontrola temperature", "Temperature control"),
      p(
        "Jedna od najčešćih grešaka je previsoka temperatura.",
        "One of the most common mistakes is too much heat.",
      ),
      p(
        "Prejak plamen može brzo zapeći spolja, dok unutrašnjost ostaje nedovoljno pripremljena. Srednje jaka, stabilna temperatura omogućava ravnomerno pečenje i očuvanje sočnosti.",
        "A fierce flame can quickly char the outside while the inside stays underdone. Medium, steady heat cooks the meat evenly and keeps it juicy.",
      ),
      p("Roštilj traži kontrolu, ne brzinu.", "A grill asks for control, not speed."),
      h("Vreme i strpljenje", "Time and patience"),
      p(
        "Savršen roštilj ne pravi se na brzinu.",
        "A perfect barbecue is not made in a hurry.",
      ),
      p(
        "Meso treba okretati u pravom trenutku i ostaviti mu dovoljno vremena da se pripremi kako treba. Prečesto okretanje ili stalno pritiskanje mesa dovodi do gubitka sokova i teksture.",
        "Turn the meat at the right moment and give it enough time to cook properly. Turning it too often or pressing it down squeezes out the juices and spoils the texture.",
      ),
      p("Manje intervencije — bolji rezultat.", "Less handling — a better result."),
      h("Kada je sve kako treba", "When everything is right"),
      p(
        "Kada su meso, temperatura i priprema usklađeni, razlika je jasna.",
        "When the meat, the temperature and the preparation work together, the difference is clear.",
      ),
      p(
        "Ukus je pun, tekstura ujednačena, a rezultat dosledan — bez potrebe za dodatnim koracima ili korekcijama.",
        "The taste is full, the texture even and the result consistent — with no need for extra steps or corrections.",
      ),
      h("Zaključak", "Conclusion"),
      p(
        "Savršen roštilj nije rezultat trikova. On je rezultat pravih odluka.",
        "A perfect barbecue is not the result of tricks. It is the result of the right decisions.",
      ),
      p(
        "Počinje izborom kvalitetnog mesa i završava se jednostavnom pripremom koja to poštuje. Jer kada je osnova prava — sve ostalo dolazi na svoje mesto.",
        "It starts with choosing good meat and ends with simple preparation that respects it. Because when the base is right — everything else falls into place.",
      ),
    ],
    signoff: { sr: "Magnus. Samo pravo meso.", en: "Magnus. Only real meat." },
  },
  {
    slug: "mitovi-o-zamrznutom-mesu",
    legacyPath: "/understanding-the-science-of-yeast-in-artisanal-baking",
    date: "2026-02-23",
    title: {
      sr: "Mitovi o zamrznutom mesu: da li je kvalitet očuvan?",
      en: "Myths about frozen meat: is quality preserved?",
    },
    excerpt: {
      sr: "Zamrznuto meso često prati loša reputacija. Koliko je tačno da zamrzavanje znači slabiji ukus i manju nutritivnu vrednost?",
      en: "Frozen meat often has a bad reputation. How true is it that freezing means weaker taste and lower nutritional value?",
    },
    image: media("freezer"),
    imageAlt: {
      sr: "Pakovanja Magnus ćevapa, ljute kobasice i Premium Burgera u zamrzivaču",
      en: "Packs of Magnus ćevapi, hot sausage and the Premium Burger in a freezer",
    },
    body: [
      p(
        "Zamrznuto meso često prati loša reputacija. Mnogi ga povezuju sa gubitkom kvaliteta, slabijim ukusom ili manjom nutritivnom vrednošću.",
        "Frozen meat often has a bad reputation. Many people link it with a loss of quality, weaker taste or lower nutritional value.",
      ),
      p("Ali koliko je to zaista tačno?", "But how true is that really?"),
      h("Šta se zapravo dešava pri zamrzavanju", "What actually happens during freezing"),
      p(
        "Proces zamrzavanja ima jednostavnu funkciju — da očuva svežinu mesa u trenutku kada je ono u svom najboljem stanju.",
        "Freezing has one simple job — to keep the meat fresh at the moment it is at its best.",
      ),
      p(
        "Kada se meso brzo zamrzne na odgovarajućoj temperaturi, zaustavljaju se procesi koji utiču na kvarenje. Time se „zaključavaju“ ukus, tekstura i nutritivne vrednosti.",
        "When meat is quick-frozen at the right temperature, the processes that cause spoilage stop. That “locks in” the taste, texture and nutritional value.",
      ),
      p(
        "Drugim rečima, kvalitet se ne gubi — on se čuva.",
        "In other words, quality is not lost — it is kept.",
      ),
      h("Mit: zamrznuto meso je manje kvalitetno", "Myth: frozen meat is lower quality"),
      p(
        "Jedna od najčešćih zabluda jeste da zamrznuto meso automatski znači niži kvalitet.",
        "One of the most common misconceptions is that frozen meat automatically means lower quality.",
      ),
      p(
        "U praksi, kvalitet zavisi od dva ključna faktora: porekla i procesa.",
        "In practice, quality depends on two key factors: origin and process.",
      ),
      p(
        "Ako je meso kvalitetno na početku i ako se zamrzavanje vrši pravilno, razlika u odnosu na sveže meso je minimalna — često i neprimetna.",
        "If the meat is good to begin with and it is frozen properly, the difference from fresh meat is minimal — often unnoticeable.",
      ),
      h("Mit: zamrzavanje uništava nutritivne vrednosti", "Myth: freezing destroys nutrients"),
      p(
        "Zamrzavanje ne uklanja proteine, minerale ili druge važne nutritivne elemente.",
        "Freezing does not remove proteins, minerals or other important nutrients.",
      ),
      p(
        "Naprotiv, pravilno zamrznuto meso zadržava svoju nutritivnu vrednost, jer se procesi razgradnje zaustavljaju na niskim temperaturama.",
        "On the contrary, properly frozen meat keeps its nutritional value, because the processes of breakdown stop at low temperatures.",
      ),
      h("Gde nastaje razlika", "Where the difference comes from"),
      p(
        "Razlika ne nastaje zbog samog zamrzavanja, već zbog načina na koji se ono sprovodi.",
        "The difference does not come from freezing itself, but from how it is done.",
      ),
      p(
        "Sporo ili nepravilno zamrzavanje može uticati na strukturu mesa. Sa druge strane, brzo zamrzavanje na niskim temperaturama čuva teksturu, sočnost i ukus.",
        "Slow or improper freezing can affect the structure of the meat. Quick freezing at low temperatures, on the other hand, keeps the texture, juiciness and taste.",
      ),
      p("Zato je kontrolisan proces ključan.", "That is why a controlled process is key."),
      h("Zašto je zamrzavanje važno", "Why freezing matters"),
      p(
        "Zamrzavanje omogućava da kvalitet mesa ostane stabilan kroz vreme.",
        "Freezing keeps the quality of the meat stable over time.",
      ),
      p(
        "To znači da proizvod koji dolazi do potrošača zadržava ista svojstva kao u trenutku kada je meso bilo sveže — bez potrebe za dodatnim intervencijama.",
        "It means the product that reaches the customer keeps the same properties it had when the meat was fresh — with no need for further intervention.",
      ),
      h("Zaključak", "Conclusion"),
      p(
        "Zamrznuto meso nije kompromis — ako je proces pravilno sproveden.",
        "Frozen meat is not a compromise — if the process is done properly.",
      ),
      p(
        "Kada se spoje kvalitetno poreklo i kontrolisano zamrzavanje, rezultat ostaje isti: čist ukus, stabilan kvalitet i sigurnost u svakom zalogaju.",
        "When good origin and controlled freezing come together, the result stays the same: clean taste, steady quality and confidence in every bite.",
      ),
    ],
    signoff: { sr: "Magnus. Bez kompromisa.", en: "Magnus. No compromise." },
  },
  {
    slug: "poreklo-mesa-pester",
    legacyPath: "/creative-ways-to-decorate-cupcakes-like-a-professional-baker",
    date: "2026-02-23",
    title: {
      sr: "Zašto poreklo mesa pravi razliku? (Pešterska visoravan kao standard)",
      en: "Why does the origin of meat make a difference? (The Pešter plateau as the standard)",
    },
    excerpt: {
      sr: "Kvalitet mesa ne počinje u proizvodnji, nego mnogo ranije, tamo gde se ono uzgaja. Poreklo određuje ukus, teksturu i sigurnost.",
      en: "The quality of meat does not start in production, but much earlier, where the animals are raised. Origin decides taste, texture and safety.",
    },
    image: media("pesterSunset"),
    imageAlt: {
      sr: "Pešterska visoravan u predvečerje, stado na pašnjaku",
      en: "The Pešter plateau at dusk, with cattle on the pasture",
    },
    body: [
      p(
        "Kvalitet mesa ne počinje u proizvodnji. Počinje mnogo ranije — tamo gde se ono uzgaja.",
        "The quality of meat does not start in production. It starts much earlier — where the animals are raised.",
      ),
      p(
        "Poreklo nije detalj koji se dodaje na kraju priče. Ono određuje sve: ukus, teksturu i sigurnost proizvoda koji dolazi do potrošača.",
        "Origin is not a detail added at the end of the story. It determines everything: the taste, the texture and the safety of the product that reaches the customer.",
      ),
      h("Priroda kao osnova kvaliteta", "Nature as the basis of quality"),
      p(
        "Pešterska visoravan je specifična po svojim prirodnim uslovima — nadmorskoj visini, čistom vazduhu i načinu ishrane stoke. U takvom okruženju meso razvija ono što je najvažnije: prirodan, pun ukus i stabilan kvalitet.",
        "The Pešter plateau is set apart by its natural conditions — its altitude, clean air and the way the cattle are fed. In that environment the meat develops what matters most: a natural, full taste and steady quality.",
      ),
      p(
        "To nije rezultat naknadne obrade ili dodataka. To je rezultat okruženja u kojem sve počinje.",
        "It is not the result of later processing or additives. It is the result of the place where everything begins.",
      ),
      h("Kako poreklo utiče na ukus", "How origin affects taste"),
      p(
        "Kada meso dolazi iz kontrolisanog i prirodnog izvora, razlika se oseća već pri prvom zalogaju. Tekstura je ujednačena, sočnost prirodna, a ukus jasan i izražen.",
        "When meat comes from a controlled, natural source, you can taste the difference from the first bite. The texture is even, the juiciness natural and the taste clear and pronounced.",
      ),
      p(
        "Takvo meso ne traži korekcije. Ne zavisi od dodataka. Ono već ima ono što je potrebno.",
        "Meat like that needs no corrections. It does not depend on additives. It already has what it needs.",
      ),
      h("Zašto poreklo znači i sigurnost?", "Why does origin also mean safety?"),
      p(
        "Jasno poreklo znači jasnu kontrolu. Kada se zna odakle meso dolazi, moguće je pratiti svaki korak — od uzgoja do finalnog proizvoda.",
        "A clear origin means clear control. When you know where the meat comes from, you can follow every step — from raising to the finished product.",
      ),
      p(
        "To donosi sigurnost da kvalitet nije slučajan, već dosledan. I da ostaje isti — svaki put.",
        "That gives the certainty that quality is not a matter of chance, but consistent. And that it stays the same — every time.",
      ),
      h("Pešter kao standard", "Pešter as the standard"),
      p(
        "Za Magnus, izbor Pešterske visoravni nije pitanje imidža. To je pitanje osnove.",
        "For Magnus, choosing the Pešter plateau is not a question of image. It is a question of foundations.",
      ),
      p(
        "Jer kada kvalitet postoji na početku, nema potrebe za kompromisima kasnije. Sve što sledi oslanja se na isti princip — zadržati ono što je već kako treba.",
        "Because when quality is there at the start, there is no need for compromise later. Everything that follows rests on the same principle — keep what is already right.",
      ),
      h("Zaključak", "Conclusion"),
      p(
        "Poreklo mesa određuje više nego što se vidi na prvi pogled. Ono definiše ukus, kvalitet i poverenje.",
        "The origin of meat decides more than meets the eye. It defines taste, quality and trust.",
      ),
      p(
        "Zato Magnus počinje tamo gde sve ima smisla — na izvoru.",
        "That is why Magnus starts where everything makes sense — at the source.",
      ),
    ],
    signoff: { sr: "Magnus. Samo pravo meso.", en: "Magnus. Only real meat." },
  },
];

export const getPost = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((post) => post.slug === slug);

export const postHref = (slug: string): string => `/blog/${slug}`;

/** Datum u formatu sajta: 23. 2. 2026. / 23 February 2026 */
export const formatPostDate = (iso: string, lang: "sr" | "en"): string => {
  const date = new Date(`${iso}T12:00:00Z`);
  return lang === "sr"
    ? `${date.getUTCDate()}. ${date.getUTCMonth() + 1}. ${date.getUTCFullYear()}.`
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
};

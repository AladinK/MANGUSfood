"use client";

import { CATEGORIES, ROUTES, media, navLabel } from "@/data/magnusData";
import { PRODUCTS_PAGE } from "@/data/pages";
import { useLang } from "@/lib/i18n";
import { ProductCatalogSection } from "../ProductCatalogSection";
import { PageHeader } from "../ui/PageHeader";
import { Photo } from "../ui/Photo";
import { SectionLabel } from "../ui/SectionLabel";

const LINE_MEDIA = {
  meso: { src: media("cevapiBoard"), alt: PRODUCTS_PAGE.meatAlt },
  testo: { src: media("sceneMantije"), alt: PRODUCTS_PAGE.doughAlt },
} as const;

export function ProductsPage() {
  const { t } = useLang();

  return (
    <>
      <PageHeader
        crumbs={[{ label: t(navLabel("pocetna")), href: ROUTES.home }, { label: t(navLabel("proizvodi")) }]}
        title={t(PRODUCTS_PAGE.title)}
        intro={[t(PRODUCTS_PAGE.intro)]}
        image={{
          src: media("productsTable"),
          alt: t({
            sr: "Magnus proizvodi na drvenom stolu: ćevapi, burger, kobasice i pljeskavica, planine u pozadini",
            en: "Magnus products on a wooden table: ćevapi, burger, sausages and pljeskavica, with mountains behind",
          }),
          position: "object-[50%_72%]",
        }}
      />

      <ProductCatalogSection />

      {/* Dve linije: tekst sa stranice Proizvodi na magnusfood.rs */}
      <section
        aria-labelledby="linije-naslov"
        className="bg-paper-100 pb-[var(--space-3xl)] pt-[var(--space-2xl)]"
      >
        <div className="container-page">
          <SectionLabel>{t(PRODUCTS_PAGE.linesLabel)}</SectionLabel>
          <h2
            id="linije-naslov"
            className="font-display mt-4 max-w-[20ch] text-[clamp(2.4rem,6vw,4.5rem)] text-coal-900"
          >
            {t(PRODUCTS_PAGE.linesTitle)}
          </h2>

          <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {CATEGORIES.map((category) => (
              <article key={category.id}>
                <Photo
                  src={LINE_MEDIA[category.id].src}
                  alt={t(LINE_MEDIA[category.id].alt)}
                  sizes="(min-width: 768px) 46vw, 92vw"
                  className="aspect-[4/3] rounded-2xl bg-coal-800"
                  imgClassName={category.id === "testo" ? "object-[50%_70%]" : ""}
                />
                <h3 className="font-display mt-7 text-[clamp(1.9rem,3.4vw,2.6rem)] text-coal-900">
                  {t(category.heading)}
                </h3>
                <div className="mt-4 grid gap-4 text-[1.02rem] leading-relaxed text-muted">
                  {category.story.map((paragraph) => (
                    <p key={paragraph.sr.slice(0, 24)}>{t(paragraph)}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

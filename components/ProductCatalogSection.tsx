"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useDeferredValue, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { UI, fill } from "@/data/dictionary";
import {
  CATEGORIES,
  LANGS,
  PRODUCTS,
  SECTION_MEDIA,
  getCategory,
  INQUIRY_ANCHOR,
  inquiryHref,
  productHref,
  type CategoryId,
  type Localized,
  type Product,
} from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { normalizeForSearch } from "@/lib/text";
import { ProductReelVideo } from "./ProductReelVideo";
import { ProductVisual } from "./ProductVisual";
import { useCatalog } from "./SiteShell";
import { ArrowIcon, CheckIcon, CloseIcon, SearchIcon } from "./ui/Icons";
import { EASE_OUT, VIEWPORT, riseItem, staggerParent } from "./ui/motion";
import { Photo } from "./ui/Photo";
import { RevealText } from "./ui/RevealText";
import { SectionLabel } from "./ui/SectionLabel";
import { buttonDark, buttonOutlineLight, buttonPrimary } from "./ui/styles";

type Filter = "sve" | CategoryId;

interface ProductCatalogSectionProps {
  /**
   * `home`: naslov sekcije i film „Asortiman na traci“ iznad filtera.
   * `page`: samo filteri i kartice (stranica Proizvodi ima svoje zaglavlje).
   */
  variant?: "home" | "page";
}

/** Pločica sa pozivom popunjava ostatak reda, pa mreža nema prazninu */
const CTA_SPAN_SM = ["sm:col-span-2", "sm:col-span-1"] as const;
const CTA_SPAN_LG = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"] as const;

const inAllLangs = (value: Localized): string[] => LANGS.map((lang) => value[lang]);

/** Tekst po kome se pretražuje: naziv, opis i istaknute osobine, na svim jezicima */
const SEARCH_INDEX: ReadonlyMap<string, string> = new Map(
  PRODUCTS.map((product) => {
    const category = getCategory(product.category);
    const parts = [
      ...inAllLangs(product.name),
      ...inAllLangs(product.description),
      ...inAllLangs(category.name),
      ...inAllLangs(category.short),
      ...product.highlights.flatMap(inAllLangs),
    ];
    return [product.id, normalizeForSearch(parts.join(" "))];
  }),
);

/**
 * Oznaka kao na deklaraciji: neto masa (bez broja komada) i temperatura
 * čuvanja. Ista oznaka stoji na svakoj kartici proizvoda.
 */
const specLine = (
  product: Product,
  lang: (value: Localized) => string,
): string => {
  const weight = product.specs.netWeight
    ? lang(product.specs.netWeight).split(",")[0].trim()
    : null;
  return weight ? `${weight} · −18 °C` : "−18 °C";
};

const countFor = (filter: Filter): number =>
  filter === "sve"
    ? PRODUCTS.length
    : PRODUCTS.filter((product) => product.category === filter).length;

export function CategoryBadge({
  category,
  compactOnMobile = false,
}: {
  category: CategoryId;
  /** Na telefonu prikazuje kratak naziv linije (Meso / Testo) */
  compactOnMobile?: boolean;
}) {
  const { t } = useLang();
  const info = getCategory(category);
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium leading-none text-muted">
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${category === "meso" ? "bg-leaf-600" : "bg-kraft-500"}`}
      />
      {compactOnMobile ? (
        <>
          <span className="sm:hidden">{t(info.short)}</span>
          <span className="hidden sm:inline">{t(info.name)}</span>
        </>
      ) : (
        t(info.name)
      )}
    </span>
  );
}

export function ProductCatalogSection({ variant = "page" }: ProductCatalogSectionProps) {
  const { t } = useLang();
  const { openCatalog } = useCatalog();
  const home = variant === "home";
  // Na početnoj je forma za upit odmah ispod; sa stranice Proizvodi vodi na Kontakt.
  const inquiryLink = home ? `#${INQUIRY_ANCHOR}` : inquiryHref();
  const [filter, setFilter] = useState<Filter>("sve");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const tabs: ReadonlyArray<{ id: Filter; label: string; shortLabel?: string }> = [
    { id: "sve", label: t(UI.catalog.tabAll), shortLabel: t(UI.catalog.tabAllShort) },
    ...CATEGORIES.map((category) => ({ id: category.id as Filter, label: t(category.short) })),
  ];

  const results = useMemo(() => {
    const needle = normalizeForSearch(deferredQuery);
    return PRODUCTS.filter((product) => {
      if (filter !== "sve" && product.category !== filter) return false;
      if (!needle) return true;
      const haystack = SEARCH_INDEX.get(product.id) ?? "";
      return needle.split(" ").every((word) => haystack.includes(word));
    });
  }, [filter, deferredQuery]);

  const total = countFor(filter);
  const activeCategory = filter === "sve" ? null : getCategory(filter);

  const reset = () => {
    setFilter("sve");
    setQuery("");
    searchRef.current?.focus();
  };

  // Strelice levo/desno, Home i End pomeraju izbor između kartica.
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;

    event.preventDefault();
    setFilter(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="asortiman"
      aria-labelledby="asortiman-naslov"
      className={`bg-paper-50 pb-[var(--space-2xl)] ${home ? "pt-[var(--space-xl)]" : "pt-12 sm:pt-16"}`}
    >
      <div className="container-page">
        {home ? (
          <>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={staggerParent}
              className="grid gap-x-12 gap-y-5 lg:grid-cols-12 lg:items-end"
            >
              <div className="lg:col-span-7">
                <motion.div variants={riseItem}>
                  <SectionLabel>{t(UI.catalog.label)}</SectionLabel>
                </motion.div>
                <h2
                  id="asortiman-naslov"
                  className="font-display mt-4 text-[clamp(2.75rem,8vw,6.75rem)] text-coal-900"
                >
                  <RevealText text={t(UI.catalog.title)} />
                </h2>
              </div>
              <motion.p
                variants={riseItem}
                className="max-w-[36rem] text-[1.06rem] leading-relaxed text-muted lg:col-span-5 lg:pb-2"
              >
                <strong className="font-condensed block text-[1.2rem] font-semibold leading-snug text-coal-900">
                  {t(UI.catalog.lead)}
                </strong>
                <span className="mt-2 block">{t(UI.catalog.intro)}</span>
              </motion.p>
            </motion.div>

            {/* Film „Asortiman na traci“ (Remotion) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="mt-10 lg:mt-14"
            >
              <ProductReelVideo />
            </motion.div>
          </>
        ) : (
          <h2 id="asortiman-naslov" className="sr-only">
            {t(UI.catalog.tabAll)}
          </h2>
        )}

        {/* Filteri */}
        <div
          className={`${home ? "mt-10" : ""} flex flex-col gap-4 md:flex-row md:items-center md:justify-between`}
        >
          <div
            role="tablist"
            aria-label={t(UI.catalog.tabsLabel)}
            className="flex w-full gap-1 rounded-xl border border-paper-200 bg-surface p-1 md:w-auto"
          >
            {tabs.map((tab, index) => {
              const selected = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`asortiman-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls="asortiman-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setFilter(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  aria-label={tab.label}
                  className={`relative flex min-h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 text-[0.9375rem] font-medium transition-colors duration-150 min-[400px]:gap-2 min-[400px]:px-3 sm:px-5 md:flex-none ${
                    selected ? "bg-coal-800 text-paper-50" : "text-coal-800 hover:bg-paper-100"
                  }`}
                >
                  {tab.shortLabel ? (
                    <>
                      <span className="relative min-[400px]:hidden">{tab.shortLabel}</span>
                      <span className="relative hidden min-[400px]:inline">{tab.label}</span>
                    </>
                  ) : (
                    <span className="relative">{tab.label}</span>
                  )}
                  <span
                    className={`relative text-[0.8125rem] tabular-nums ${
                      selected ? "text-paper-50/60" : "text-subtle"
                    }`}
                  >
                    {countFor(tab.id)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:max-w-xs">
            <label htmlFor="asortiman-pretraga" className="sr-only">
              {t(UI.catalog.searchLabel)}
            </label>
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              ref={searchRef}
              id="asortiman-pretraga"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t(UI.catalog.searchPlaceholder)}
              autoComplete="off"
              enterKeyHint="search"
              className="block min-h-12 w-full rounded-[10px] border border-paper-200 bg-surface pl-11 pr-11 text-base text-ink transition-colors placeholder:text-muted/75 hover:border-coal-700/40 focus-visible:border-coal-700 focus-visible:outline-offset-0 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                aria-label={t(UI.catalog.clearSearch)}
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-muted transition-colors hover:bg-paper-100 hover:text-ink"
              >
                <CloseIcon width={18} height={18} />
              </button>
            ) : null}
          </div>
        </div>

        <p className="mt-4 min-h-6 text-sm text-muted" aria-live="polite">
          {fill(t(UI.catalog.count), { shown: results.length, total })}
          {activeCategory ? <span className="text-ink"> · {t(activeCategory.lead)}</span> : null}
        </p>

        {/* Proizvodi */}
        <div
          id="asortiman-panel"
          role="tabpanel"
          aria-labelledby={`asortiman-tab-${filter}`}
          tabIndex={-1}
          className="mt-6"
        >
          {results.length > 0 ? (
            <ul className="relative grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:gap-6">
              <AnimatePresence mode="popLayout">
                {results.map((product, index) => {
                  // Telefon: dve kolone. Kod neparnog broja prvi proizvod je
                  // istaknut preko cele širine, pa mreža nema prazno mesto.
                  const featured = index === 0 && results.length % 2 === 1;
                  return (
                    <motion.li
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{
                        duration: 0.5,
                        ease: EASE_OUT,
                        delay: (index % 3) * 0.05,
                        layout: { duration: 0.3, ease: EASE_OUT },
                      }}
                      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-paper-200 bg-surface transition-colors duration-150 hover:border-paper-300 ${
                        featured ? "max-sm:col-span-2" : ""
                      }`}
                    >
                      <Link
                        href={productHref(product.id)}
                        tabIndex={-1}
                        aria-hidden="true"
                        className="block"
                      >
                        <ProductVisual
                          product={product}
                          sizes={
                            featured
                              ? "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                              : "(min-width: 1024px) 30vw, 46vw"
                          }
                          className={`sm:aspect-[4/3] ${featured ? "aspect-[16/10]" : "aspect-square"}`}
                        />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col border-t border-paper-200 p-3 pb-0 sm:p-5 sm:pb-0">
                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                          <CategoryBadge category={product.category} compactOnMobile={!featured} />
                          <span className="font-condensed text-[0.8125rem] font-medium tabular-nums leading-none text-subtle">
                            {specLine(product, t)}
                          </span>
                        </div>
                        <h3
                          className={`font-display mt-2.5 text-coal-900 sm:mt-3 sm:text-[1.75rem] ${
                            featured ? "text-[1.6rem]" : "text-[1.3rem]"
                          }`}
                        >
                          {t(product.name)}
                        </h3>
                        {/* Telefon: opis stoji samo na istaknutoj kartici; ostali su u specifikaciji */}
                        <p
                          className={`mt-1.5 text-[0.92rem] leading-relaxed text-muted sm:mt-2 sm:line-clamp-none sm:text-[0.97rem] ${
                            featured ? "line-clamp-2" : "hidden sm:block"
                          }`}
                        >
                          {t(product.description)}
                        </p>
                        <ul className="mt-4 hidden flex-wrap gap-1.5 sm:flex">
                          {product.highlights.map((highlight) => (
                            <li
                              key={highlight.sr}
                              className="rounded-md border border-paper-200 bg-paper-50 px-2 py-1 text-[0.8rem] font-medium leading-none text-ink"
                            >
                              {t(highlight)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-auto pt-3 sm:pt-5">
                        <Link
                          href={productHref(product.id)}
                          className="flex min-h-12 w-full items-center justify-between gap-2 border-t border-paper-200 px-3 text-left text-[0.9375rem] font-medium text-coal-800 transition-colors duration-150 hover:bg-paper-50 sm:px-5"
                        >
                          <span>
                            <span className="sm:hidden">{t(UI.cursor.details)}</span>
                            <span className="hidden sm:inline">{t(UI.catalog.details)}</span>
                            <span className="sr-only">: {t(product.name)}</span>
                          </span>
                          <ArrowIcon
                            aria-hidden="true"
                            width={16}
                            height={16}
                            className="shrink-0 text-subtle transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-coal-800"
                          />
                        </Link>
                      </div>
                    </motion.li>
                  );
                })}

                <motion.li
                  key="katalog-poziv"
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{
                    duration: 0.5,
                    ease: EASE_OUT,
                    layout: { duration: 0.3, ease: EASE_OUT },
                  }}
                  className={`relative isolate col-span-2 flex min-h-[20rem] flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-coal-900 p-6 text-paper-50 sm:p-8 ${
                    CTA_SPAN_SM[results.length % 2]
                  } ${CTA_SPAN_LG[results.length % 3]}`}
                >
                  <div className="absolute inset-0 -z-10">
                    <Photo
                      src={SECTION_MEDIA.catalogCta}
                      alt=""
                      sizes="(min-width: 1024px) 62vw, 92vw"
                      parallax={8}
                      className="h-full w-full"
                      imgClassName="object-[82%_50%]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(18_18_17/0.95)_28%,rgb(18_18_17/0.62)_62%,rgb(18_18_17/0.2))]" />
                  </div>
                  <div>
                    <h3 className="font-display text-[1.9rem] sm:text-[2.3rem]">
                      {t(UI.catalog.ctaTitle)}
                    </h3>
                    <p className="mt-2 max-w-[32rem] leading-relaxed text-mist">
                      {t(UI.catalog.ctaBody)}
                    </p>
                    <ul className="mt-5 grid gap-2.5">
                      {UI.catalog.ctaPoints.map((point) => (
                        <li key={point.sr} className="flex items-start gap-2.5 text-[0.97rem]">
                          <CheckIcon
                            width={18}
                            height={18}
                            strokeWidth={2.4}
                            className="mt-0.5 shrink-0 text-mist"
                          />
                          {t(point)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      onClick={openCatalog}
                      aria-haspopup="dialog"
                      className={buttonPrimary}
                    >
                      {t(UI.common.requestCatalog)}
                    </button>
                    <Link href={inquiryLink} className={buttonOutlineLight}>
                      {t(UI.common.b2bInquiry)}
                    </Link>
                  </div>
                </motion.li>
              </AnimatePresence>
            </ul>
          ) : (
            <motion.div
              role="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-dashed border-paper-300 bg-surface px-6 py-14 text-center"
            >
              <SearchIcon width={28} height={28} className="mx-auto text-subtle" />
              <h3 className="font-display mx-auto mt-4 max-w-xl break-words text-[1.9rem] text-coal-900">
                {fill(t(UI.catalog.emptyTitle), { query: query.trim() })}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-muted">{t(UI.catalog.emptyBody)}</p>
              <button type="button" onClick={reset} className={`${buttonDark} mt-6`}>
                {t(UI.catalog.reset)}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

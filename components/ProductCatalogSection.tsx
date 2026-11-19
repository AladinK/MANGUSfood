"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useDeferredValue, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { UI, fill } from "@/data/dictionary";
import {
  CATEGORIES,
  PRODUCTS,
  SECTION_MEDIA,
  getCategory,
  navLabel,
  type CategoryId,
  type Product,
} from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { normalizeForSearch } from "@/lib/text";
import { ProductVisual } from "./ProductVisual";
import { CheckIcon, CloseIcon, SearchIcon } from "./ui/Icons";
import { EASE_OUT, VIEWPORT, riseItem, staggerParent } from "./ui/motion";
import { Photo } from "./ui/Photo";
import { SectionLabel } from "./ui/SectionLabel";
import {
  buttonDark,
  buttonOutlineDark,
  buttonOutlineLight,
  buttonPrimary,
} from "./ui/styles";

type Filter = "sve" | CategoryId;

interface ProductCatalogSectionProps {
  onOpenSpec: (product: Product) => void;
  onRequestCatalog: () => void;
}

/** Pločica sa pozivom popunjava ostatak reda, pa mreža nema prazninu */
const CTA_SPAN_SM = ["sm:col-span-2", "sm:col-span-1"] as const;
const CTA_SPAN_LG = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"] as const;

/** Tekst po kome se pretražuje: naziv, opis i istaknute osobine, na oba jezika */
const SEARCH_INDEX: ReadonlyMap<string, string> = new Map(
  PRODUCTS.map((product) => {
    const category = getCategory(product.category);
    const parts = [
      product.name.sr,
      product.name.en,
      product.description.sr,
      product.description.en,
      category.name.sr,
      category.name.en,
      category.short.sr,
      category.short.en,
      ...product.highlights.flatMap((highlight) => [highlight.sr, highlight.en]),
    ];
    return [product.id, normalizeForSearch(parts.join(" "))];
  }),
);

const countFor = (filter: Filter): number =>
  filter === "sve"
    ? PRODUCTS.length
    : PRODUCTS.filter((product) => product.category === filter).length;

export function CategoryBadge({ category }: { category: CategoryId }) {
  const { t } = useLang();
  return (
    <span
      className={`font-condensed inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.8rem] font-bold leading-none ${
        category === "meso" ? "bg-leaf-100 text-coal-800" : "bg-kraft-100 text-[#6b4a0c]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${category === "meso" ? "bg-leaf-600" : "bg-kraft-500"}`}
      />
      {t(getCategory(category).name)}
    </span>
  );
}

export function ProductCatalogSection({
  onOpenSpec,
  onRequestCatalog,
}: ProductCatalogSectionProps) {
  const { t } = useLang();
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
      className="bg-paper-50 pb-[var(--space-2xl)] pt-[var(--space-3xl)]"
    >
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerParent}
          className="grid gap-x-12 gap-y-5 lg:grid-cols-12 lg:items-end"
        >
          <motion.div variants={riseItem} className="lg:col-span-7">
            <SectionLabel>{t(navLabel("asortiman"))}</SectionLabel>
            <h2
              id="asortiman-naslov"
              className="font-display mt-4 text-[clamp(2.75rem,7.5vw,5.75rem)] text-coal-900"
            >
              {t(UI.catalog.title)}
            </h2>
          </motion.div>
          <motion.p
            variants={riseItem}
            className="max-w-[36rem] text-[1.06rem] leading-relaxed text-muted lg:col-span-5 lg:pb-2"
          >
            <strong className="font-condensed block text-[1.2rem] font-bold leading-snug text-coal-900">
              {t(UI.catalog.lead)}
            </strong>
            <span className="mt-2 block">{t(UI.catalog.intro)}</span>
          </motion.p>
        </motion.div>

        {/* Filteri */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div
            role="tablist"
            aria-label={t(UI.catalog.tabsLabel)}
            className="flex w-full gap-1 rounded-full border border-paper-200 bg-surface p-1 md:w-auto"
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
                  className={`relative flex min-h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 text-[0.92rem] font-semibold transition-colors duration-200 min-[400px]:gap-2 min-[400px]:px-3 sm:px-5 md:flex-none ${
                    selected ? "text-paper-50" : "text-coal-800 hover:bg-paper-100"
                  }`}
                >
                  {selected ? (
                    <motion.span
                      layoutId="asortiman-tab-pill"
                      className="absolute inset-0 rounded-full bg-coal-800"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                  {tab.shortLabel ? (
                    <>
                      <span className="relative min-[400px]:hidden">{tab.shortLabel}</span>
                      <span className="relative hidden min-[400px]:inline">{tab.label}</span>
                    </>
                  ) : (
                    <span className="relative">{tab.label}</span>
                  )}
                  <span
                    className={`relative rounded-full px-1.5 py-0.5 text-[0.72rem] font-bold tabular-nums leading-none ${
                      selected ? "bg-paper-50/20" : "bg-paper-100 text-muted"
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
              className="block min-h-12 w-full rounded-full border border-paper-200 bg-surface pl-11 pr-11 text-base text-ink transition-colors placeholder:text-muted/75 hover:border-leaf-500 focus-visible:border-coal-700 focus-visible:outline-offset-0 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                aria-label={t(UI.catalog.clearSearch)}
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-paper-100 hover:text-ink"
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
            <ul className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
              <AnimatePresence mode="popLayout">
                {results.map((product, index) => (
                  <motion.li
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_OUT,
                      delay: (index % 3) * 0.07,
                      layout: { type: "spring", stiffness: 380, damping: 36 },
                    }}
                    className="group grid grid-cols-[6.75rem_minmax(0,1fr)] overflow-hidden rounded-2xl border border-paper-200 bg-surface shadow-card transition-shadow duration-300 hover:shadow-lift sm:flex sm:flex-col"
                  >
                    {/* Telefon: kompaktna kartica sa slikom levo. Širi ekrani: slika gore. */}
                    <ProductVisual
                      product={product}
                      cursorLabel={t(UI.cursor.details)}
                      onActivate={() => onOpenSpec(product)}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 108px"
                      className="m-3 mr-0 aspect-square self-start rounded-xl sm:m-0 sm:aspect-[4/3] sm:self-auto sm:rounded-none"
                      innerClassName="transition-transform duration-500 ease-out-expo group-hover:scale-[1.06] group-hover:-rotate-[1.5deg]"
                    />
                    <div className="flex min-w-0 flex-col p-3.5 sm:flex-1 sm:border-t sm:border-paper-200 sm:p-5 sm:pb-0">
                      <div>
                        <CategoryBadge category={product.category} />
                      </div>
                      <h3 className="font-display mt-2 text-[1.45rem] text-coal-900 sm:mt-3 sm:text-[1.75rem]">
                        {t(product.name)}
                      </h3>
                      <p className="mt-1.5 line-clamp-3 text-[0.92rem] leading-relaxed text-muted sm:mt-2 sm:line-clamp-none sm:text-[0.97rem]">
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
                    <div className="col-span-2 px-3 pb-3 sm:mt-auto sm:p-5">
                      <button
                        type="button"
                        onClick={() => onOpenSpec(product)}
                        aria-haspopup="dialog"
                        className={`${buttonOutlineDark} w-full`}
                      >
                        {t(UI.catalog.details)}
                        <span className="sr-only">: {t(product.name)}</span>
                      </button>
                    </div>
                  </motion.li>
                ))}

                <motion.li
                  key="katalog-poziv"
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                  transition={{
                    duration: 0.5,
                    ease: EASE_OUT,
                    layout: { type: "spring", stiffness: 380, damping: 36 },
                  }}
                  className={`relative isolate flex min-h-[20rem] flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-coal-900 p-6 text-paper-50 sm:p-8 ${
                    CTA_SPAN_SM[results.length % 2]
                  } ${CTA_SPAN_LG[results.length % 3]}`}
                >
                  <div className="absolute inset-0 -z-10">
                    <Photo
                      src={SECTION_MEDIA.catalogCta}
                      alt=""
                      sizes="(min-width: 1024px) 62vw, 92vw"
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
                            className="mt-0.5 shrink-0 text-magnus-500"
                          />
                          {t(point)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      onClick={onRequestCatalog}
                      aria-haspopup="dialog"
                      className={buttonPrimary}
                    >
                      {t(UI.common.requestCatalog)}
                    </button>
                    <a href="#b2b" className={buttonOutlineLight}>
                      {t(UI.common.b2bInquiry)}
                    </a>
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
              <SearchIcon width={28} height={28} className="mx-auto text-leaf-500" />
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

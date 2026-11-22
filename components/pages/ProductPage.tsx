"use client";

import Link from "next/link";
import { UI } from "@/data/dictionary";
import {
  PRODUCTS,
  ROUTES,
  getCategory,
  getProduct,
  inquiryHref,
  navLabel,
  type Localized,
} from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { CategoryBadge, ProductCard } from "../ProductCard";
import { ProductVisual } from "../ProductVisual";
import { useCatalog } from "../SiteShell";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { buttonDark, buttonOutlineDark, buttonPrimary } from "../ui/styles";

interface SpecRow {
  label: Localized;
  value: Localized | null;
}

/** Stranica jednog proizvoda: ambalaža, opis sa magnusfood.rs i specifikacija. */
export function ProductPage({ productId }: { productId: string }) {
  const { t } = useLang();
  const { openCatalog } = useCatalog();
  const product = getProduct(productId);
  if (!product) return null;

  const category = getCategory(product.category);
  const related = PRODUCTS.filter(
    (candidate) => candidate.category === product.category && candidate.id !== product.id,
  ).slice(0, 3);

  const rows: SpecRow[] = [
    { label: UI.catalog.spec.line, value: category.name },
    { label: UI.catalog.spec.base, value: product.specs.base },
    { label: UI.catalog.spec.preparation, value: product.specs.preparation },
    { label: UI.catalog.spec.storage, value: product.specs.storage },
    { label: UI.catalog.spec.packaging, value: product.specs.packaging },
    { label: UI.catalog.spec.netWeight, value: product.specs.netWeight },
    { label: UI.catalog.spec.shelfLife, value: product.specs.shelfLife },
    { label: UI.catalog.spec.availability, value: product.specs.availability },
  ];

  return (
    <>
      <section className="bg-paper-50 pb-[var(--space-2xl)] pt-24 sm:pt-28 lg:pt-32">
        <div className="container-page">
          <Breadcrumbs
            items={[
              { label: t(navLabel("pocetna")), href: ROUTES.home },
              { label: t(navLabel("proizvodi")), href: ROUTES.products },
              { label: t(product.name) },
            ]}
          />

          <div className="mt-8 grid gap-x-14 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="lg:sticky lg:top-28">
                <ProductVisual
                  product={product}
                  eager
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="aspect-square rounded-2xl border border-paper-200"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <CategoryBadge category={product.category} />
              <h1 className="font-display mt-4 text-[clamp(2.75rem,6vw,4.75rem)] text-coal-900">
                {t(product.name)}
              </h1>
              <p className="mt-5 max-w-[38rem] text-[1.1rem] leading-relaxed text-muted">
                {t(product.story)}
              </p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {product.highlights.map((highlight) => (
                  <li
                    key={highlight.sr}
                    className="rounded-md border border-paper-200 bg-surface px-2.5 py-1.5 text-[0.86rem] font-medium leading-none text-ink"
                  >
                    {t(highlight)}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={inquiryHref(product.id)} className={`${buttonPrimary} px-7`}>
                  {t(UI.catalog.quoteCta)}
                </Link>
                <button
                  type="button"
                  onClick={openCatalog}
                  aria-haspopup="dialog"
                  className={`${buttonOutlineDark} px-7`}
                >
                  {t(UI.common.requestCatalog)}
                </button>
              </div>

              <h2 className="font-condensed mt-12 text-[1.2rem] font-semibold text-coal-900">
                {t(UI.catalog.specHeading)}
              </h2>
              <dl className="mt-3 border-t border-paper-200">
                {rows.map((row) => (
                  <div
                    key={row.label.sr}
                    className="grid gap-x-6 gap-y-0.5 border-b border-paper-200 py-3 sm:grid-cols-[12rem_minmax(0,1fr)]"
                  >
                    <dt className="text-sm text-muted">{t(row.label)}</dt>
                    <dd
                      className={`text-[0.97rem] leading-snug ${
                        row.value ? "font-medium text-ink" : "text-muted"
                      }`}
                    >
                      {t(row.value ?? UI.common.onRequest)}
                    </dd>
                  </div>
                ))}
                <div className="grid gap-x-6 gap-y-1 border-b border-paper-200 py-3 sm:grid-cols-[12rem_minmax(0,1fr)]">
                  <dt className="text-sm text-muted">{t(UI.catalog.spec.standards)}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {product.specs.standards.map((standard) => (
                      <span
                        key={standard}
                        className="font-condensed rounded-md bg-coal-800 px-2 py-1 text-[0.8rem] font-semibold leading-none text-paper-50"
                      >
                        {standard}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 max-w-[34rem] text-[0.9rem] leading-snug text-muted">
                {t(UI.catalog.specNote)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section
          aria-labelledby="slicni-naslov"
          className="border-t border-paper-200 bg-paper-100 pb-[var(--space-3xl)] pt-[var(--space-2xl)]"
        >
          <div className="container-page">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="slicni-naslov"
                className="font-display text-[clamp(2.2rem,5vw,3.5rem)] text-coal-900"
              >
                {t(UI.product.related)}
              </h2>
              <div>
                <Link href={ROUTES.products} className={buttonDark}>
                  {t(UI.product.allProducts)}
                </Link>
              </div>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
              {related.map((item) => (
                <li key={item.id} className="h-full">
                  <ProductCard
                    product={item}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 108px"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}

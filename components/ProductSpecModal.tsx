"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { UI } from "@/data/dictionary";
import { getCategory, type Localized, type Product } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { CategoryBadge } from "./ProductCatalogSection";
import { ProductVisual } from "./ProductVisual";
import { Dialog } from "./ui/Dialog";
import { CloseIcon } from "./ui/Icons";
import { EASE_OUT } from "./ui/motion";
import { buttonPrimary } from "./ui/styles";

interface ProductSpecModalProps {
  /** Proizvod čija se specifikacija prikazuje; null zatvara dijalog */
  product: Product | null;
  onClose: () => void;
  /** Zatvara dijalog i popunjava B2B formu ovim proizvodom */
  onRequestQuote: (product: Product) => void;
}

interface SpecRow {
  label: Localized;
  value: Localized | null;
}

export function ProductSpecModal({ product, onClose, onRequestQuote }: ProductSpecModalProps) {
  const { t } = useLang();

  // Poslednji proizvod ostaje prikazan dok traje animacija zatvaranja.
  const [shown, setShown] = useState<Product | null>(product);
  useEffect(() => {
    if (product) setShown(product);
  }, [product]);

  const current = product ?? shown;

  const rows: SpecRow[] = current
    ? [
        { label: UI.catalog.spec.line, value: getCategory(current.category).name },
        { label: UI.catalog.spec.base, value: current.specs.base },
        { label: UI.catalog.spec.preparation, value: current.specs.preparation },
        { label: UI.catalog.spec.storage, value: current.specs.storage },
        { label: UI.catalog.spec.packaging, value: current.specs.packaging },
        { label: UI.catalog.spec.netWeight, value: current.specs.netWeight },
        { label: UI.catalog.spec.shelfLife, value: current.specs.shelfLife },
        { label: UI.catalog.spec.availability, value: current.specs.availability },
      ]
    : [];

  return (
    <Dialog
      open={product !== null}
      onClose={onClose}
      labelledBy="specifikacija-naslov"
      describedBy="specifikacija-opis"
      panelClassName="sm:max-w-3xl"
    >
      {current ? (
        <div className="relative">
          <button
            type="button"
            aria-label={t(UI.common.close)}
            onClick={onClose}
            className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-surface/90 text-ink shadow-card transition-colors hover:bg-surface"
          >
            <CloseIcon />
          </button>

          <div className="grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <ProductVisual
              key={current.id}
              product={current}
              sizes="(min-width: 640px) 300px, 100vw"
              eager
              className="aspect-[16/10] sm:aspect-auto sm:min-h-full"
            />

            <div className="p-5 sm:p-7">
              <CategoryBadge category={current.category} />
              <h2
                id="specifikacija-naslov"
                className="font-display mt-3 pr-10 text-[2.1rem] text-coal-900 sm:text-[2.4rem]"
              >
                {t(current.name)}
              </h2>
              <p id="specifikacija-opis" className="mt-2 leading-relaxed text-muted">
                {t(current.description)}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {current.highlights.map((highlight) => (
                  <li
                    key={highlight.sr}
                    className="rounded-md border border-paper-200 bg-surface px-2 py-1 text-[0.8rem] font-medium leading-none"
                  >
                    {t(highlight)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-paper-200 px-5 pb-2 pt-5 sm:px-7">
            <h3 className="font-condensed text-[1.05rem] font-bold text-coal-900">
              {t(UI.catalog.specHeading)}
            </h3>
            <dl className="mt-2">
              {rows.map((row, index) => (
                <motion.div
                  key={row.label.sr}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.12 + index * 0.035, ease: EASE_OUT }}
                  className="grid gap-x-6 gap-y-0.5 border-b border-paper-200 py-2.5 last:border-b-0 sm:grid-cols-[13rem_minmax(0,1fr)]"
                >
                  <dt className="text-sm text-muted">{t(row.label)}</dt>
                  <dd
                    className={`text-[0.95rem] leading-snug ${
                      row.value ? "font-medium text-ink" : "text-muted"
                    }`}
                  >
                    {t(row.value ?? UI.common.onRequest)}
                  </dd>
                </motion.div>
              ))}
              <div className="grid gap-x-6 gap-y-1 py-2.5 sm:grid-cols-[13rem_minmax(0,1fr)]">
                <dt className="text-sm text-muted">{t(UI.catalog.spec.standards)}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {current.specs.standards.map((standard) => (
                    <span
                      key={standard}
                      className="font-condensed rounded-md bg-coal-800 px-2 py-1 text-[0.8rem] font-bold leading-none tracking-wide text-paper-50"
                    >
                      {standard}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="sticky bottom-0 border-t border-paper-200 bg-paper-50/95 px-5 py-4 backdrop-blur-sm sm:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.85rem] leading-snug text-muted sm:max-w-[19rem]">
                {t(UI.catalog.specNote)}
              </p>
              <button
                type="button"
                onClick={() => onRequestQuote(current)}
                className={`${buttonPrimary} shrink-0`}
              >
                {t(UI.catalog.quoteCta)}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Dialog>
  );
}

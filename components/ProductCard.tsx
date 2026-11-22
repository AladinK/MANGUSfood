"use client";

import Link from "next/link";
import { UI } from "@/data/dictionary";
import { getCategory, productHref, type CategoryId, type Product } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { ProductVisual } from "./ProductVisual";
import { buttonOutlineDark } from "./ui/styles";

export function CategoryBadge({ category }: { category: CategoryId }) {
  const { t } = useLang();
  return (
    <span className="inline-flex items-center gap-2 text-[0.84rem] font-medium leading-none text-muted">
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${category === "meso" ? "bg-leaf-600" : "bg-kraft-500"}`}
      />
      {t(getCategory(category).name)}
    </span>
  );
}

interface ProductCardProps {
  product: Product;
  /** `sizes` za fotografiju ambalaže, prema širini kolone */
  sizes: string;
}

/**
 * Kartica proizvoda. Naziv je link ka stranici proizvoda i pokriva celu
 * karticu, pa je klik bilo gde na kartici isti kao klik na naziv; tastatura
 * ima jednu stanicu po kartici.
 */
export function ProductCard({ product, sizes }: ProductCardProps) {
  const { t } = useLang();

  return (
    <article className="group relative grid h-full grid-cols-[6.75rem_minmax(0,1fr)] overflow-hidden rounded-2xl border border-paper-200 bg-surface shadow-card transition-shadow duration-300 hover:shadow-lift sm:flex sm:flex-col">
      {/* Telefon: kompaktna kartica sa slikom levo. Širi ekrani: slika gore. */}
      <ProductVisual
        product={product}
        sizes={sizes}
        className="m-3 mr-0 aspect-square self-start rounded sm:m-0 sm:aspect-[4/3] sm:self-auto sm:rounded-none"
      />
      <div className="flex min-w-0 flex-col p-3.5 sm:flex-1 sm:border-t sm:border-paper-200 sm:p-5 sm:pb-0">
        <div>
          <CategoryBadge category={product.category} />
        </div>
        <h3 className="font-display mt-2 text-[1.45rem] text-coal-900 sm:mt-3 sm:text-[1.75rem]">
          <Link
            href={productHref(product.id)}
            className="after:absolute after:inset-0 after:z-10 after:content-['']"
          >
            {t(product.name)}
          </Link>
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
        {/* Vizuelni poziv; link je naziv iznad, pa ovaj element ne prima fokus */}
        <span
          aria-hidden="true"
          className={`${buttonOutlineDark} w-full group-hover:border-coal-800 group-hover:bg-coal-800/5`}
        >
          {t(UI.catalog.details)}
        </span>
      </div>
    </article>
  );
}

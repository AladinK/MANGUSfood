"use client";

import Image from "next/image";
import { useState } from "react";
import { getCategory, type Product } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { ProductGlyph } from "./ui/ProductGlyph";

interface ProductVisualProps {
  product: Product;
  /** `sizes` za next/image, prema širini u rasporedu */
  sizes: string;
  className?: string;
  /** Klase za sloj koji se pomera na hover (skaliranje, nagib) */
  innerClassName?: string;
  eager?: boolean;
  /**
   * Klik mišem na vizual (prečica; ista akcija postoji i kao dugme na kartici,
   * pa tastatura i čitači ekrana koriste dugme).
   */
  onActivate?: () => void;
  /** Bez podloge i okvira: ambalaža „lebdi“ na pozadini sekcije */
  bare?: boolean;
}

/**
 * Originalna fotografija ambalaže (providna pozadina) na obojenoj podlozi.
 * Okvir ima zadat odnos stranica, pa učitavanje ne pomera raspored; ako
 * fotografija nije dostupna, na njenom mestu ostaje ilustracija.
 */
export function ProductVisual({
  product,
  sizes,
  className = "",
  innerClassName = "",
  eager = false,
  onActivate,
  bare = false,
}: ProductVisualProps) {
  const { t } = useLang();
  const [status, setStatus] = useState<"pending" | "loaded" | "failed">("pending");

  const loaded = status === "loaded";
  const showPhoto = product.imageSrc !== null && status !== "failed";
  const tint = bare ? "" : product.category === "meso" ? "bg-paper-100" : "bg-kraft-100";

  return (
    <div
      onClick={onActivate}
      className={`relative isolate ${bare ? "" : "overflow-hidden"} ${tint} ${
        onActivate ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div className={`absolute inset-0 ${innerClassName}`}>
        <ProductGlyph
          kind={product.glyph}
          accent={product.accent}
          className={`absolute inset-0 h-full w-full p-[6%] transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
        {showPhoto && product.imageSrc ? (
          <Image
            src={product.imageSrc}
            alt={`${t(product.name)} — ${t(getCategory(product.category).name)}`}
            fill
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            className={`object-contain transition-opacity duration-500 ${bare ? "" : "p-[5%]"} ${
              loaded ? "opacity-100" : "opacity-0"
            } ${bare ? "drop-shadow-[0_22px_26px_rgb(0_0_0/0.5)]" : "drop-shadow-[0_14px_16px_rgb(29_29_27/0.22)]"}`}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("failed")}
          />
        ) : null}
      </div>
    </div>
  );
}

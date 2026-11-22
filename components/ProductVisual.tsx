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
  eager?: boolean;
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
  eager = false,
}: ProductVisualProps) {
  const { t } = useLang();
  const [status, setStatus] = useState<"pending" | "loaded" | "failed">("pending");

  const loaded = status === "loaded";
  const showPhoto = product.imageSrc !== null && status !== "failed";
  const tint = product.category === "meso" ? "bg-paper-100" : "bg-kraft-100";

  return (
    <div className={`relative isolate overflow-hidden ${tint} ${className}`}>
      <div className="absolute inset-0">
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
            fetchPriority={eager ? "high" : undefined}
            className={`object-contain p-[5%] drop-shadow-[0_14px_16px_rgb(29_29_27/0.22)] transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("failed")}
          />
        ) : null}
      </div>
    </div>
  );
}

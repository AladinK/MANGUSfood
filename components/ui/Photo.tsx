"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

interface PhotoProps {
  /** Adresa slike; null prikazuje samo rezervni sadržaj */
  src: string | null;
  alt: string;
  /** `sizes` za next/image, prema širini u rasporedu */
  sizes: string;
  /** Klase okvira. Okvir mora da ima zadat odnos stranica ili visinu. */
  className?: string;
  imgClassName?: string;
  fit?: "cover" | "contain";
  eager?: boolean;
  /** Rezervni sadržaj: vidi se dok se slika učitava i ako se ne učita */
  children?: ReactNode;
}

/**
 * Originalna fotografija u okviru unapred zadatih mera (bez pomeranja
 * rasporeda). Rezervni sadržaj se vidi odmah, a fotografija ga prekrije
 * kada se učita; ako nije dostupna, rezervni sadržaj ostaje.
 */
export function Photo({
  src,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  fit = "cover",
  eager = false,
  children,
}: PhotoProps) {
  const [status, setStatus] = useState<"pending" | "loaded" | "failed">("pending");
  const loaded = status === "loaded";

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
      {src && status !== "failed" ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className={`${fit === "cover" ? "object-cover" : "object-contain"} transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
        />
      ) : null}
    </div>
  );
}

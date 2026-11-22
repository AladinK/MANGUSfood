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

type MediaProps = Pick<PhotoProps, "src" | "alt" | "sizes" | "imgClassName" | "fit" | "eager" | "children">;

/** Rezervni sadržaj i fotografija koja ga prekrije kada se učita */
function Media({ src, alt, sizes, imgClassName = "", fit = "cover", eager = false, children }: MediaProps) {
  const [status, setStatus] = useState<"pending" | "loaded" | "failed">("pending");
  const loaded = status === "loaded";

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-500 ${
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
          className={`${fit === "cover" ? "object-cover" : "object-contain"} transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
        />
      ) : null}
    </>
  );
}

/**
 * Originalna fotografija u okviru unapred zadatih mera (bez pomeranja
 * rasporeda). Rezervni sadržaj se vidi odmah, a fotografija ga prekrije
 * kada se učita (kratko pretapanje); ako nije dostupna, rezervni sadržaj ostaje.
 */
export function Photo(props: PhotoProps) {
  const { className = "", ...media } = props;

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <Media {...media} />
    </div>
  );
}

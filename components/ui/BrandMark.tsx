"use client";

import Image from "next/image";
import { useState } from "react";
import { BRAND_ASSETS, COMPANY } from "@/data/magnusData";

interface BrandMarkProps {
  /** Podloga na kojoj znak stoji: svetla (zaglavlje) ili tamna (podnožje, meni) */
  surface: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
}

/**
 * Znak brenda. Prikazuje zvanični logo iz BRAND_ASSETS za datu podlogu.
 * Ako logo za tu podlogu nije zadat ili se ne učita, prikazuje se
 * tipografski znak „Magnus Food Industry“ u istom okviru, pa se zaglavlje
 * ne pomera ni u jednom slučaju.
 */
export function BrandMark({ surface, size = "md", className = "" }: BrandMarkProps) {
  const src = surface === "light" ? BRAND_ASSETS.logoOnLight : BRAND_ASSETS.logoOnDark;
  const [status, setStatus] = useState<"pending" | "loaded" | "failed">("pending");

  // Logo „Magnus Food“ je oval razmere 224 : 135; okvir ima istu razmeru.
  const logoBox = size === "lg" ? "h-16 w-[6.625rem]" : "h-11 w-[4.5625rem]";
  const wordmarkBox = size === "lg" ? "h-12 w-[12.5rem]" : "h-10 w-[9.5rem]";
  const showLogo = src !== null && status !== "failed";
  const box = showLogo ? logoBox : wordmarkBox;

  return (
    <span className={`relative flex items-center ${box} ${className}`}>
      {showLogo && src ? (
        <Image
          src={src}
          alt={COMPANY.brand}
          fill
          sizes={size === "lg" ? "106px" : "73px"}
          // SVG se ne obrađuje kroz optimizator slika; učitava se kao fajl.
          unoptimized={src.endsWith(".svg")}
          loading="eager"
          className={`object-contain object-left transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
        />
      ) : (
        // Tipografski znak: kada logo nije zadat ili se nije učitao
        <span className="inline-flex items-center gap-2">
          <span
            className={`font-display uppercase tracking-[0.03em] ${
              size === "lg" ? "text-[2.6rem]" : "text-[1.85rem]"
            }`}
          >
            Magnus
          </span>
          <span
            className={`font-condensed border-l border-current/30 pl-2 font-semibold leading-[1.05] ${
              size === "lg" ? "text-[0.95rem]" : "text-[0.7rem]"
            }`}
          >
            Food
            <br />
            Industry
          </span>
        </span>
      )}
    </span>
  );
}

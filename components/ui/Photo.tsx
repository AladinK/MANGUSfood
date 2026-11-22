"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";

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
  /**
   * Paralaksa unutar okvira: slika se pri skrolu pomera sporije od stranice.
   * Vrednost je pomak u procentima visine okvira (preporuka: 8–14).
   */
  parallax?: number;
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

/** Okvir u kome slika klizi sporije od stranice (samo transform, bez promene rasporeda) */
function ParallaxFrame({ className = "", parallax = 0, ...media }: PhotoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const shift = reduceMotion ? 0 : parallax;
  const y = useTransform(scrollYProgress, [0, 1], [`${-shift}%`, `${shift}%`]);

  return (
    <div ref={frameRef} className={`relative isolate overflow-hidden ${className}`}>
      {/* Sloj je viši od okvira tačno za dvostruki pomak, pa se ivica nikada ne vidi */}
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `${-parallax}%`, bottom: `${-parallax}%`, y }}
      >
        <Media {...media} />
      </motion.div>
    </div>
  );
}

/**
 * Originalna fotografija u okviru unapred zadatih mera (bez pomeranja
 * rasporeda). Rezervni sadržaj se vidi odmah, a fotografija ga prekrije
 * kada se učita (kratko pretapanje); ako nije dostupna, rezervni sadržaj ostaje.
 */
export function Photo(props: PhotoProps) {
  const { className = "", parallax = 0, ...media } = props;

  if (parallax > 0) return <ParallaxFrame {...props} />;

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <Media {...media} />
    </div>
  );
}

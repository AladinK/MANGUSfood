"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { EASE_IN_OUT, EASE_OUT, VIEWPORT_DEEP } from "./motion";

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
  /** Otkrivanje iz maske kada okvir uđe u prikaz (odozdo naviše) */
  reveal?: boolean;
  /**
   * Paralaksa unutar okvira: slika se pri skrolu pomera sporije od stranice.
   * Vrednost je pomak u procentima visine okvira (preporuka: 6–10).
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
    </>
  );
}

/** Okvir sa kretanjem: maska koja se otvara i sloj koji klizi pri skrolu */
function MotionFrame({
  className = "",
  reveal = false,
  parallax = 0,
  ...media
}: PhotoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });

  // Sloj je viši od okvira tačno za dvostruki pomak, pa se ivica nikada ne vidi.
  const shift = reduceMotion ? 0 : parallax;
  const y = useTransform(scrollYProgress, [0, 1], [`${-shift}%`, `${shift}%`]);
  // Stanja su ista i uz smanjeno kretanje, samo bez trajanja: HTML sa servera
  // nosi početno (zatvoreno) stanje, pa ga pregledač uvek mora otvoriti.
  const instant = reduceMotion ? { duration: 0 } : null;

  return (
    <div ref={frameRef} className={`relative isolate overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={reveal ? { clipPath: "inset(100% 0% 0% 0%)" } : false}
        whileInView={reveal ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        viewport={VIEWPORT_DEEP}
        transition={instant ?? { duration: 1.15, ease: EASE_IN_OUT }}
      >
        <motion.div
          className="absolute inset-x-0 will-change-transform"
          style={{ top: `${-parallax}%`, bottom: `${-parallax}%`, y }}
          initial={reveal ? { scale: 1.22 } : false}
          whileInView={reveal ? { scale: 1 } : undefined}
          viewport={VIEWPORT_DEEP}
          transition={instant ?? { duration: 1.6, ease: EASE_OUT }}
        >
          <Media {...media} />
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * Originalna fotografija u okviru unapred zadatih mera (bez pomeranja
 * rasporeda). Rezervni sadržaj se vidi odmah, a fotografija ga prekrije
 * kada se učita; ako nije dostupna, rezervni sadržaj ostaje.
 */
export function Photo(props: PhotoProps) {
  const { className = "", reveal = false, parallax = 0, ...media } = props;

  if (reveal || parallax > 0) return <MotionFrame {...props} />;

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <Media {...media} />
    </div>
  );
}

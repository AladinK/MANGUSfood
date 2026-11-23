"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type MotionStyle,
  type TargetAndTransition,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { EASE_OUT, VIEWPORT_DEEP } from "./motion";

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
  /**
   * Ulaz okvira: `view` kada uđe u prikaz, `load` odmah (vrh stranice).
   * Okvir se podigne i pojača, a slika se u njemu smiri sa 110 % na 100 %.
   */
  reveal?: "view" | "load";
  /** Kašnjenje ulaza u sekundama (npr. druga slika u nizu) */
  revealDelay?: number;
  /** Rezervni sadržaj: vidi se dok se slika učitava i ako se ne učita */
  children?: ReactNode;
}

type MediaProps = Omit<PhotoProps, "className" | "parallax" | "reveal" | "revealDelay">;

interface RevealParts {
  frame: HTMLMotionProps<"div">;
  zoom: HTMLMotionProps<"div">;
}

/**
 * Ulaz okvira i smirivanje slike u njemu; prazno bez `reveal`.
 * `view`: Framer Motion kada okvir uđe u prikaz (početno stanje je isto na
 * serveru i u pregledaču, a MotionConfig uz smanjeno kretanje preskače
 * pomak). `load`: CSS animacija (globals.css), kreće čim se HTML iscrta.
 */
function revealParts(reveal: PhotoProps["reveal"], delay = 0): RevealParts {
  if (!reveal) return { frame: {}, zoom: {} };
  if (reveal === "load") {
    return {
      frame: {
        className: "enter",
        style: { "--enter-delay": `${delay}s`, "--enter-y": "24px", "--enter-dur": "0.9s" } as MotionStyle,
      },
      zoom: {
        className: "enter-zoom",
        style: { "--enter-delay": `${delay}s`, "--enter-dur": "1.4s" } as MotionStyle,
      },
    };
  }
  const inView = (target: TargetAndTransition): HTMLMotionProps<"div"> => ({
    whileInView: target,
    viewport: VIEWPORT_DEEP,
  });
  return {
    frame: {
      initial: { opacity: 0, y: 24 },
      ...inView({ opacity: 1, y: 0 }),
      transition: { duration: 0.9, delay, ease: EASE_OUT },
    },
    zoom: {
      initial: { scale: 1.1 },
      ...inView({ scale: 1 }),
      transition: { duration: 1.4, delay, ease: EASE_OUT },
    },
  };
}

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

/** Okvir u kome slika klizi sporije od stranice (samo transform, bez promene rasporeda) */
function ParallaxFrame({ className = "", parallax = 0, reveal, revealDelay, ...media }: PhotoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { frame, zoom } = revealParts(reveal, revealDelay);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const shift = reduceMotion ? 0 : parallax;
  // Funkcija (a ne niz vrednosti): pomak se računa u JavaScript-u, isto u svakom pregledaču
  const y = useTransform(scrollYProgress, (value) => `${(value * 2 - 1) * shift}%`);

  return (
    <motion.div
      ref={frameRef}
      {...frame}
      className={`relative isolate overflow-hidden ${className} ${frame.className ?? ""}`}
    >
      {/* Sloj je viši od okvira tačno za dvostruki pomak, pa se ivica nikada ne vidi */}
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `${-parallax}%`, bottom: `${-parallax}%`, y }}
      >
        <motion.div {...zoom} className={`absolute inset-0 ${zoom.className ?? ""}`}>
          <Media {...media} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Originalna fotografija u okviru unapred zadatih mera (bez pomeranja
 * rasporeda). Rezervni sadržaj se vidi odmah, a fotografija ga prekrije
 * kada se učita; ako nije dostupna, rezervni sadržaj ostaje.
 */
export function Photo(props: PhotoProps) {
  if ((props.parallax ?? 0) > 0) return <ParallaxFrame {...props} />;
  return <StillFrame {...props} />;
}

function StillFrame({ className = "", parallax: _parallax, reveal, revealDelay, ...media }: PhotoProps) {
  const { frame, zoom } = revealParts(reveal, revealDelay);
  return (
    <motion.div {...frame} className={`relative isolate overflow-hidden ${className} ${frame.className ?? ""}`}>
      <motion.div {...zoom} className={`absolute inset-0 ${zoom.className ?? ""}`}>
        <Media {...media} />
      </motion.div>
    </motion.div>
  );
}

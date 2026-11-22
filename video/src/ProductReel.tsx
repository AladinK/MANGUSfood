import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CONTOURS } from "../../components/ui/contours";
import { CATEGORIES, PRODUCTS, type CategoryId, type Product } from "../../data/magnusData";
import { FONT_FAMILY } from "./fonts";

/**
 * „Asortiman na traci“: deset Magnus pakovanja prolazi kroz kadar kao na
 * pokretnoj traci. Svako stane na svetlo, a uz njega se pojave naziv, masa,
 * temperatura čuvanja i dve osobine iz kataloga. Traka se kreće u krug, pa je
 * poslednji kadar nastavak prvog i film se vrti u petlji bez šava.
 *
 * Svi podaci dolaze iz `data/magnusData.ts`, istog izvora kao sajt.
 */

export type Lang = "sr" | "en";
export type ReelLayout = "wide" | "tall";

export type ProductReelProps = {
  lang: Lang;
  layout: ReelLayout;
};

/** Pakovanje stoji na svetlu, pa se traka pomeri za jedno mesto */
export const HOLD_SECONDS = 1.4;
export const MOVE_SECONDS = 0.6;
const STEP_SECONDS = HOLD_SECONDS + MOVE_SECONDS;

export const reelDurationInFrames = (fps: number): number =>
  Math.round(STEP_SECONDS * fps) * PRODUCTS.length;

const COLORS = {
  stage: "#1d1d1b",
  text: "#f8f6f1",
  muted: "#bdb9ac",
  green: "#74ca00",
  rail: "rgba(241, 234, 219, 0.18)",
};

const MOVE_EASING = Easing.bezier(0.65, 0, 0.35, 1);

type LayoutSpec = {
  /** Središte pakovanja koje stoji na svetlu */
  stage: { x: number; y: number };
  /** Razmak između pakovanja na traci */
  spacing: number;
  pack: { width: number; height: number };
  logo: { x: number; y: number; height: number };
  category: { x: number; y: number; size: number };
  text: { x: number; y: number; width: number; nameSize: number; specSize: number; noteSize: number };
  ticks: { x: number; y: number; width: number; gap: number };
  contours: { x: number; y: number; width: number; height: number };
};

const LAYOUTS: Record<ReelLayout, LayoutSpec> = {
  // Računar: tekst levo na mirnom delu, traka desno
  wide: {
    stage: { x: 1320, y: 430 },
    spacing: 640,
    pack: { width: 720, height: 540 },
    logo: { x: 140, y: 96, height: 64 },
    category: { x: 140, y: 286, size: 36 },
    text: { x: 140, y: 344, width: 780, nameSize: 116, specSize: 46, noteSize: 34 },
    ticks: { x: 140, y: 780, width: 56, gap: 12 },
    contours: { x: 640, y: -140, width: 1500, height: 1200 },
  },
  // Telefon: pakovanje gore, tekst ispod
  tall: {
    stage: { x: 540, y: 500 },
    spacing: 700,
    pack: { width: 760, height: 568 },
    logo: { x: 80, y: 80, height: 60 },
    category: { x: 80, y: 858, size: 40 },
    text: { x: 80, y: 914, width: 920, nameSize: 112, specSize: 48, noteSize: 36 },
    ticks: { x: 80, y: 1266, width: 64, gap: 14 },
    contours: { x: -260, y: 80, width: 1600, height: 1280 },
  },
};

/* ------------------------------------------------------------------ */
/* Vreme i položaj trake                                               */
/* ------------------------------------------------------------------ */

/** Položaj trake u jedinicama proizvoda; ceo broj znači da pakovanje stoji na svetlu */
const useBelt = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const step = Math.round(STEP_SECONDS * fps);
  const hold = Math.round(HOLD_SECONDS * fps);
  const index = Math.floor(frame / step);
  const local = frame - index * step;
  const position =
    index +
    interpolate(local, [hold, step], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: MOVE_EASING,
    });
  return { position, current: index % PRODUCTS.length, local, hold };
};

/** Udaljenost proizvoda od svetla kroz petlju: 0 na svetlu, 1 sledeći, −1 prethodni */
const offsetOf = (itemIndex: number, position: number): number => {
  const total = PRODUCTS.length;
  let offset = (((itemIndex - position) % total) + total) % total;
  if (offset > total / 2) offset -= total;
  return offset;
};

/** Koliko je proizvod „na svetlu“ (1 na svetlu, 0 jedno mesto dalje ili više) */
const presence = (offset: number): number => Math.max(0, 1 - Math.abs(offset));

/* ------------------------------------------------------------------ */
/* Tekst iz kataloga                                                   */
/* ------------------------------------------------------------------ */

/** Naziv bez reči „Magnus“ (znak brenda je već u kadru) */
const displayName = (product: Product, lang: Lang): string => {
  const name = product.name[lang].replace(/^Magnus\s+/, "");
  return name.charAt(0).toLocaleUpperCase(lang) + name.slice(1);
};

/** Neto masa i broj komada kao na deklaraciji, pa temperatura čuvanja */
const specLine = (product: Product, lang: Lang): string => {
  const weight = product.specs.netWeight ? product.specs.netWeight[lang].split(", ") : [];
  return [...weight, "−18 °C"].join(" · ");
};

/** Dve osobine iz kataloga, bez mase (ona je već u oznaci) */
const noteLine = (product: Product, lang: Lang): string =>
  product.highlights
    .map((highlight) => highlight[lang])
    .filter((text) => !/^\d+\s?g\b/.test(text))
    .slice(0, 2)
    .join(" · ");

const categoryName = (id: CategoryId, lang: Lang): string =>
  CATEGORIES.find((category) => category.id === id)?.name[lang] ?? "";

/* ------------------------------------------------------------------ */
/* Delovi kadra                                                        */
/* ------------------------------------------------------------------ */

const Stage: React.FC<{ spec: LayoutSpec }> = ({ spec }) => {
  const { stage, pack, contours } = spec;
  return (
    <>
      {/* Izohipse Peštera: isti motiv kao na sajtu, jedva vidljive */}
      <svg
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          left: contours.x,
          top: contours.y,
          width: contours.width,
          height: contours.height,
        }}
      >
        {CONTOURS.map((d, index) => (
          <path
            key={index}
            d={d}
            fill="none"
            stroke="rgba(241, 234, 219, 0.055)"
            strokeWidth={index % 4 === 3 ? 2 : 1.2}
          />
        ))}
      </svg>
      {/* Svetlo na mestu gde pakovanje staje */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${stage.x}px ${stage.y}px, rgba(241, 234, 219, 0.11) 0%, rgba(241, 234, 219, 0.04) 24%, rgba(241, 234, 219, 0) 46%)`,
        }}
      />
      {/* Senka na podu ispod pakovanja */}
      <div
        style={{
          position: "absolute",
          left: stage.x - pack.width * 0.42,
          top: stage.y + pack.height * 0.36,
          width: pack.width * 0.84,
          height: pack.height * 0.16,
          background: "radial-gradient(closest-side, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0))",
        }}
      />
    </>
  );
};

const Pack: React.FC<{ product: Product; itemIndex: number; spec: LayoutSpec }> = ({
  product,
  itemIndex,
  spec,
}) => {
  const { position, current, local, hold } = useBelt();
  const offset = offsetOf(itemIndex, position);
  if (Math.abs(offset) > 2.2 || !product.imageSrc) return null;

  // Pakovanje na svetlu se za vreme zastoja polako približava
  const pushIn =
    itemIndex === current
      ? interpolate(local, [0, hold], [0, 0.035], { extrapolateRight: "clamp" }) * presence(offset)
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: spec.stage.x - spec.pack.width / 2,
        top: spec.stage.y - spec.pack.height / 2,
        width: spec.pack.width,
        height: spec.pack.height,
        translate: `${offset * spec.spacing}px ${interpolate(Math.abs(offset), [0, 1], [0, 36], {
          extrapolateRight: "clamp",
        })}px`,
        scale:
          interpolate(offset, [-1, 0, 1, 2], [0.78, 1, 0.62, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }) *
          (1 + pushIn),
        rotate: `${interpolate(offset, [-1, 0, 1], [-7, 0, 6], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}deg`,
        opacity: interpolate(offset, [-0.6, -0.2, 0], [0, 0.85, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        filter: `brightness(${interpolate(Math.abs(offset), [0, 1], [1, 0.5], {
          extrapolateRight: "clamp",
        })}) drop-shadow(0 34px 30px rgba(8, 8, 7, 0.6))`,
      }}
    >
      <Img
        src={staticFile(product.imageSrc.replace(/^\//, ""))}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
};

const ProductText: React.FC<{ product: Product; itemIndex: number; spec: LayoutSpec; lang: Lang }> = ({
  product,
  itemIndex,
  spec,
  lang,
}) => {
  const { position } = useBelt();
  const offset = offsetOf(itemIndex, position);
  if (Math.abs(offset) > 1) return null;
  const { text } = spec;

  return (
    <div
      style={{
        position: "absolute",
        left: text.x,
        top: text.y,
        width: text.width,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        // Stari naziv odlazi naviše, novi dolazi odozdo
        opacity: interpolate(offset, [-0.5, -0.12, 0.12, 0.6], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: `0px ${interpolate(offset, [-1, 0, 1], [-44, 0, 44])}px`,
      }}
    >
      <div
        style={{
          fontSize: text.nameSize,
          fontWeight: 680,
          fontStretch: "66%",
          lineHeight: 0.94,
          letterSpacing: "-0.01em",
          color: COLORS.text,
          textWrap: "balance",
        }}
      >
        {displayName(product, lang)}
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: text.specSize,
          fontWeight: 600,
          fontStretch: "76%",
          fontVariantNumeric: "tabular-nums",
          color: COLORS.text,
        }}
      >
        {specLine(product, lang)}
      </div>
      <div style={{ fontSize: text.noteSize, fontWeight: 400, color: COLORS.muted, lineHeight: 1.3 }}>
        {noteLine(product, lang)}
      </div>
    </div>
  );
};

/** Naziv linije (meso ili testo): menja se samo kada traka pređe u drugu liniju */
const CategoryLabel: React.FC<{ id: CategoryId; spec: LayoutSpec; lang: Lang }> = ({ id, spec, lang }) => {
  const { position } = useBelt();
  // Koliko je linija na svetlu i sa koje strane dolazi (+) ili odlazi (−)
  let weight = 0;
  let side = 0;
  PRODUCTS.forEach((product, index) => {
    if (product.category !== id) return;
    const offset = offsetOf(index, position);
    weight += presence(offset);
    side += presence(offset) * offset;
  });
  const direction = weight > 0 ? side / weight : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: spec.category.x,
        top: spec.category.y,
        fontSize: spec.category.size,
        fontWeight: 500,
        color: COLORS.muted,
        // Kvadrat pojačava razliku, pa se dva natpisa ne mešaju na pola puta
        opacity: weight * weight,
        translate: `0px ${direction * 44}px`,
      }}
    >
      {categoryName(id, lang)}
    </div>
  );
};

/** Deset crtica: koja je po redu stanica na traci */
const Ticks: React.FC<{ spec: LayoutSpec }> = ({ spec }) => {
  const { position } = useBelt();
  const { ticks } = spec;
  return (
    <div style={{ position: "absolute", left: ticks.x, top: ticks.y, display: "flex", gap: ticks.gap }}>
      {PRODUCTS.map((product, index) => (
        <div
          key={product.id}
          style={{ position: "relative", width: ticks.width, height: 4, borderRadius: 2, background: COLORS.rail }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 2,
              background: COLORS.green,
              opacity: presence(offsetOf(index, position)),
            }}
          />
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */

export const ProductReel: React.FC<ProductReelProps> = ({ lang, layout }) => {
  const spec = LAYOUTS[layout];
  const categories = Array.from(new Set(PRODUCTS.map((product) => product.category)));

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.stage, fontFamily: FONT_FAMILY, overflow: "hidden" }}>
      <Stage spec={spec} />

      {PRODUCTS.map((product, index) => (
        <Pack key={product.id} product={product} itemIndex={index} spec={spec} />
      ))}

      <Img
        src={staticFile("originals/magnus-logo-green.svg")}
        style={{ position: "absolute", left: spec.logo.x, top: spec.logo.y, height: spec.logo.height }}
      />

      {categories.map((id) => (
        <CategoryLabel key={id} id={id} spec={spec} lang={lang} />
      ))}

      {PRODUCTS.map((product, index) => (
        <ProductText key={product.id} product={product} itemIndex={index} spec={spec} lang={lang} />
      ))}

      <Ticks spec={spec} />
    </AbsoluteFill>
  );
};

import type { ReactNode } from "react";
import type { GlyphKind } from "@/data/magnusData";

export type AnyGlyph = GlyphKind | "pester" | "horeca";

interface ProductGlyphProps {
  kind: AnyGlyph;
  /** Boja nadeva / začina */
  accent: string;
  className?: string;
  /** Boja tanjira ispod proizvoda */
  plate?: string;
}

const MEAT = "#8f3b2e";
const MEAT_DARK = "#6a2a20";
const MEAT_LIGHT = "#b05a48";
const DOUGH = "#ecca8a";
const DOUGH_DARK = "#c9984c";
const DOUGH_LIGHT = "#f7e2b4";

/**
 * Ilustracije proizvoda, pogled odozgo. Prikazuju se dok se fotografija
 * učitava i svuda gde fotografije nema, pa kartica nikada nije prazna.
 */
export function ProductGlyph({
  kind,
  accent,
  className,
  plate = "rgb(255 255 255 / 0.7)",
}: ProductGlyphProps) {
  return (
    <svg viewBox="0 0 240 180" className={className} aria-hidden="true" focusable="false">
      {kind !== "pester" && kind !== "horeca" ? (
        <>
          <ellipse cx="120" cy="96" rx="92" ry="74" fill="rgb(13 31 23 / 0.07)" />
          <ellipse cx="120" cy="90" rx="92" ry="74" fill={plate} />
          <ellipse
            cx="120"
            cy="90"
            rx="78"
            ry="62"
            fill="none"
            stroke="rgb(13 31 23 / 0.08)"
            strokeWidth="1"
          />
        </>
      ) : null}
      {GLYPHS[kind](accent)}
    </svg>
  );
}

const GLYPHS: Record<AnyGlyph, (accent: string) => ReactNode> = {
  cevapi: () => (
    <g transform="rotate(-14 120 90)">
      {[0, 1, 2, 3, 4].map((index) => {
        const x = 54 + index * 27;
        return (
          <g key={index}>
            <rect x={x} y="52" width="23" height="80" rx="11.5" fill={MEAT_DARK} />
            <rect x={x} y="48" width="23" height="80" rx="11.5" fill={MEAT} />
            <path
              d={`M${x + 6} 60v52`}
              stroke={MEAT_LIGHT}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d={`M${x + 2} 80l19-7M${x + 2} 104l19-7`}
              stroke={MEAT_DARK}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </g>
  ),

  burger: () => (
    <g>
      <circle cx="120" cy="96" r="52" fill={MEAT_DARK} />
      <circle cx="120" cy="88" r="52" fill={MEAT} />
      <circle cx="120" cy="88" r="44" fill="none" stroke={MEAT_LIGHT} strokeWidth="2" opacity="0.55" />
      {[
        [98, 70],
        [132, 64],
        [150, 92],
        [108, 100],
        [128, 116],
        [90, 94],
        [118, 80],
        [142, 110],
      ].map(([cx, cy], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r={index % 3 === 0 ? 2.4 : 1.7}
          fill={index % 2 === 0 ? "#2a1512" : "#f3e7dc"}
        />
      ))}
    </g>
  ),

  pljeskavica: () => (
    <g>
      <ellipse cx="120" cy="94" rx="66" ry="60" fill={MEAT_DARK} />
      <ellipse cx="120" cy="89" rx="66" ry="60" fill={MEAT} />
      <g stroke={MEAT_DARK} strokeWidth="5" strokeLinecap="round">
        <path d="M78 62l70 62M98 46l66 58M70 88l52 46" />
      </g>
      <g stroke={MEAT_LIGHT} strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
        <path d="M88 52l58 51" />
      </g>
    </g>
  ),

  kobasica: (accent) => (
    <g fill="none" strokeLinecap="round">
      <path d="M46 78Q120 22 196 74" stroke="rgb(13 31 23 / 0.28)" strokeWidth="26" transform="translate(0 5)" />
      <path d="M46 78Q120 22 196 74" stroke={accent} strokeWidth="26" />
      <path d="M58 68Q120 26 182 64" stroke="rgb(255 255 255 / 0.35)" strokeWidth="4" />
      <path d="M44 128Q122 72 198 124" stroke="rgb(13 31 23 / 0.28)" strokeWidth="26" transform="translate(0 5)" />
      <path d="M44 128Q122 72 198 124" stroke={accent} strokeWidth="26" />
      <path d="M56 118Q122 76 184 114" stroke="rgb(255 255 255 / 0.35)" strokeWidth="4" />
      <g stroke="rgb(13 31 23 / 0.45)" strokeWidth="4">
        <path d="M92 44l8 22M140 42l-6 22M90 94l8 22M144 92l-6 22" />
      </g>
    </g>
  ),

  mantije: (accent) => (
    <g transform="rotate(-8 120 90)">
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((column) => {
          const x = 66 + column * 37;
          const y = 38 + row * 36;
          return (
            <g key={`${row}-${column}`}>
              <rect x={x} y={y + 3} width="33" height="32" rx="9" fill={DOUGH_DARK} />
              <rect x={x} y={y} width="33" height="32" rx="9" fill={DOUGH} />
              <path
                d={`M${x + 7} ${y + 7}l19 18M${x + 26} ${y + 7}l-19 18`}
                stroke={DOUGH_DARK}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx={x + 16.5} cy={y + 16} r="4" fill={accent} />
            </g>
          );
        }),
      )}
    </g>
  ),

  pita: (accent) => {
    const coil =
      "M120 90a8 8 0 0 1 16 0a16 16 0 0 1-32 0a24 24 0 0 1 48 0a32 32 0 0 1-64 0a40 40 0 0 1 80 0a48 48 0 0 1-96 0a52 52 0 0 1 52-52";
    return (
      <g fill="none" strokeLinecap="round">
        <path d={coil} stroke={DOUGH_DARK} strokeWidth="15" transform="translate(0 3)" />
        <path d={coil} stroke={DOUGH} strokeWidth="13" />
        <path d={coil} stroke={DOUGH_LIGHT} strokeWidth="3" strokeDasharray="1 13" />
        <circle cx="124" cy="90" r="5.5" fill={accent} stroke={DOUGH_DARK} strokeWidth="1.5" />
        <g fill={accent}>
          <circle cx="152" cy="66" r="2.6" />
          <circle cx="90" cy="112" r="2.6" />
          <circle cx="160" cy="112" r="2.2" />
          <circle cx="84" cy="70" r="2.2" />
        </g>
      </g>
    );
  },

  pester: (accent) => (
    <g fill="none" stroke={accent} strokeLinecap="round" strokeWidth="2.5">
      <path d="M14 118c34-6 46-44 82-44s40 30 70 30 36-22 60-22" />
      <path d="M14 138c38-4 52-38 84-38s38 26 66 26 38-18 62-18" opacity="0.7" />
      <path d="M14 158c40-2 58-30 86-30s36 20 62 20 40-14 64-14" opacity="0.45" />
      <path d="M40 92c20-8 30-40 56-40s32 22 52 22" opacity="0.85" />
      <path d="M70 62c10-6 16-26 28-26s16 12 26 12" />
    </g>
  ),

  horeca: (accent) => (
    <g fill="none" stroke={accent} strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
      <path d="M46 122h148" />
      <path d="M58 122a62 62 0 0 1 124 0" />
      <path d="M120 60v-10" />
      <circle cx="120" cy="44" r="6" />
      <path d="M84 104a38 38 0 0 1 22-24" strokeWidth="3" opacity="0.6" />
      <path d="M36 138h168" strokeWidth="3" opacity="0.6" />
    </g>
  ),
};

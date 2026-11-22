import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { COMPANY, LINKS } from "@/data/magnusData";

export const alt = "Magnus Food Industry: meso i pite sa Peštera";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontsDir = join(process.cwd(), "app", "fonts");
const displayFont = await readFile(join(fontsDir, "Archivo-Condensed-ExtraBold.ttf"));
const textFont = await readFile(join(fontsDir, "Archivo-Medium.ttf"));

/** Slika za deljenje na društvenim mrežama, generisana pri izgradnji sajta. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#1d1d1b",
          color: "#f8f6f1",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                fontFamily: "Archivo Condensed",
                fontSize: 60,
                letterSpacing: 2,
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              Magnus
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderLeft: "2px solid rgba(248, 246, 241, 0.35)",
                paddingLeft: 16,
                fontSize: 22,
                lineHeight: 1.1,
              }}
            >
              <span>Food</span>
              <span>Industry</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "12px 22px",
              borderRadius: 999,
              backgroundColor: "#74ca00",
              color: "#1d1d1b",
              fontFamily: "Archivo Condensed",
              fontSize: 30,
              letterSpacing: 1,
            }}
          >
            100% PEŠTER
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Archivo Condensed",
            fontSize: 168,
            lineHeight: 0.94,
            letterSpacing: -2,
          }}
        >
          <span>Meso i pite</span>
          <span>sa Peštera</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#bdb9ac",
          }}
        >
          <span>{COMPANY.tagline.sr}</span>
          <span style={{ color: "#f8f6f1" }}>{LINKS.siteLabel}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo Condensed", data: displayFont, weight: 800, style: "normal" },
        { name: "Archivo", data: textFont, weight: 500, style: "normal" },
      ],
    },
  );
}

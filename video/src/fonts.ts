import { continueRender, delayRender, staticFile } from "remotion";

/**
 * Archivo, isti promenljivi font kao na sajtu (osa širine 62–100 %).
 * Kadar se ne iscrtava dok font nije učitan, pa nema zamene fonta u filmu.
 */
export const FONT_FAMILY = "Archivo";

const handle = delayRender("Učitavanje fonta Archivo");

const archivo = new FontFace(
  FONT_FAMILY,
  `url('${staticFile("fonts/Archivo-Variable.woff2")}') format('woff2')`,
  { weight: "100 900", stretch: "62% 100%" },
);

archivo
  .load()
  .then(() => {
    document.fonts.add(archivo);
    continueRender(handle);
  })
  .catch((error: unknown) => {
    console.error("Font Archivo nije učitan", error);
    continueRender(handle);
  });

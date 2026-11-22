// Kopira slike i font sa sajta u public/ ovog projekta.
// Sajt je jedini izvor: ambalaža, logo i font se ovde ne čuvaju u git-u.
import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const site = join(here, "..", "..");
const target = join(here, "..", "public");

const copy = (from, to) => {
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
};

const originals = join(site, "public", "originals");
let count = 0;
for (const name of readdirSync(originals)) {
  if (name.startsWith("pack-") || name === "magnus-logo-green.svg") {
    copy(join(originals, name), join(target, "originals", name));
    count += 1;
  }
}
copy(join(site, "app", "fonts", "Archivo-Variable.woff2"), join(target, "fonts", "Archivo-Variable.woff2"));
console.log(`Kopirano: ${count} slika i font Archivo`);

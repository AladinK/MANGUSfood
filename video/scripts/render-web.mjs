// Renderuje film za sajt: dve verzije (široka i uspravna) na dva jezika,
// sa naslovnim kadrom (poster), i kopira ih u ../public/video.
//
//   npm run render:web
//
// Ako Remotion ne može sam da preuzme pregledač, zadajte postojeći Chrome:
//   REMOTION_BROWSER=/usr/bin/google-chrome npm run render:web
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");
const site = join(root, "..", "public", "video");
mkdirSync(out, { recursive: true });
mkdirSync(site, { recursive: true });

const browser = process.env.REMOTION_BROWSER
  ? ["--browser-executable", process.env.REMOTION_BROWSER, "--chrome-mode", "chrome-for-testing"]
  : [];

const run = (args) => {
  const result = spawnSync("npx", ["remotion", ...args, ...browser], { cwd: root, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

const bundle = join(out, "bundle");
run(["bundle", "--out-dir", bundle]);

// Kadar za poster: prvo pakovanje stoji na svetlu
const POSTER_FRAME = 20;

for (const [composition, name] of [
  ["ProductReelWide", "reel-wide"],
  ["ProductReelTall", "reel-tall"],
]) {
  for (const lang of ["sr", "en"]) {
    const props = JSON.stringify({ lang });
    const base = `${name}-${lang}`;
    run([
      "render", bundle, composition, join(out, `${base}.mp4`),
      "--props", props,
      "--codec", "h264", "--crf", "27", "--x264-preset", "veryfast",
      "--pixel-format", "yuv420p", "--muted",
    ]);
    run([
      "still", bundle, composition, join(out, `${base}.jpg`),
      "--props", props, "--frame", String(POSTER_FRAME), "--image-format", "jpeg", "--jpeg-quality", "82",
    ]);
    copyFileSync(join(out, `${base}.mp4`), join(site, `${base}.mp4`));
    copyFileSync(join(out, `${base}.jpg`), join(site, `${base}.jpg`));
  }
}
console.log(`Gotovo: fajlovi su u ${site}`);

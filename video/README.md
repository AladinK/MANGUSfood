# Magnus Food: film „Asortiman na traci“

Remotion projekat za kratak film sa asortimanom na početnoj stranici sajta.

- `src/ProductReel.tsx`: film (traka, tekst, oznake linija, crtice napretka)
- `src/Root.tsx`: dve kompozicije, `ProductReelWide` (1920 × 880) i `ProductReelTall` (1080 × 1350)
- Podaci: `../data/magnusData.ts`; slike i font se kopiraju sa sajta (`npm run sync`)

```bash
npm install
npm run dev          # Studio
npm run render:web   # sve četiri verzije (sr/en, široka/uspravna) u ../public/video
```

Ako Remotion ne može sam da preuzme pregledač:
`REMOTION_BROWSER=/putanja/do/chrome npm run render:web`

Licenca: Remotion je besplatan za timove do 3 osobe; veće firme trebaju Company License
(https://www.remotion.dev/docs/license).

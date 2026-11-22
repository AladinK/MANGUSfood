import { Composition } from "remotion";
import "./fonts";
import { ProductReel, reelDurationInFrames, type ProductReelProps } from "./ProductReel";

const FPS = 30;

/**
 * Dve verzije istog filma: široka za računar i uspravna (4:5) za telefon.
 * Jezik se bira kroz props: {"lang": "sr"} ili {"lang": "en"}.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductReelWide"
        component={ProductReel}
        durationInFrames={reelDurationInFrames(FPS)}
        fps={FPS}
        width={1920}
        height={880}
        defaultProps={{ lang: "sr", layout: "wide" } satisfies ProductReelProps}
      />
      <Composition
        id="ProductReelTall"
        component={ProductReel}
        durationInFrames={reelDurationInFrames(FPS)}
        fps={FPS}
        width={1080}
        height={1350}
        defaultProps={{ lang: "sr", layout: "tall" } satisfies ProductReelProps}
      />
    </>
  );
};

"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { UI } from "@/data/dictionary";
import { useLang } from "@/lib/i18n";
import { PauseIcon, PlayIcon } from "./ui/Icons";

/** Ispod ove širine ide uspravna verzija filma (4:5), iznad široka */
const SMALL_SCREEN = "(max-width: 639px)";

type Intent = "auto" | "play" | "pause";

/**
 * Film „Asortiman na traci“, napravljen u Remotion-u (izvor je u `video/`,
 * podaci iz `data/magnusData.ts`). Ovde je običan video bez zvuka:
 *
 * - ništa se ne preuzima dok se film ne približi ekranu (`preload="none"`),
 * - pušta se samo dok je vidljiv i samo verzija koja odgovara širini ekrana,
 * - uz smanjeno kretanje ne kreće sam; dugme ga uvek pušta ili zaustavlja.
 *
 * Isti proizvodi su odmah ispod u katalogu, pa je film za čitače ekrana
 * sakriven, a opis stoji na okviru.
 */
export function ProductReelVideo() {
  const { lang, t } = useLang();
  const frameRef = useRef<HTMLElement>(null);
  const wideRef = useRef<HTMLVideoElement>(null);
  const tallRef = useRef<HTMLVideoElement>(null);

  const [inView, setInView] = useState(false);
  const [small, setSmall] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [intent, setIntent] = useState<Intent>("auto");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const smallQuery = window.matchMedia(SMALL_SCREEN);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setSmall(smallQuery.matches);
      setReduced(motionQuery.matches);
    };
    update();
    smallQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      smallQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const active = small ? tallRef.current : wideRef.current;
    const hidden = small ? wideRef.current : tallRef.current;
    hidden?.pause();
    if (!active) return;

    const shouldPlay = inView && (intent === "play" || (intent === "auto" && !reduced));
    if (shouldPlay) {
      active.muted = true;
      active.play().catch(() => setPlaying(false));
    } else {
      active.pause();
    }
  }, [inView, small, reduced, intent, lang]);

  // Stanje dugmeta prati samo verziju koja je na ekranu
  const track = (event: SyntheticEvent<HTMLVideoElement>) => {
    const active = small ? tallRef.current : wideRef.current;
    if (event.currentTarget === active) setPlaying(!event.currentTarget.paused);
  };

  const shared = {
    muted: true,
    loop: true,
    playsInline: true,
    preload: "none" as const,
    disablePictureInPicture: true,
    "aria-hidden": true,
    onPlay: track,
    onPause: track,
  };

  return (
    <figure
      ref={frameRef}
      aria-label={t(UI.catalog.reelLabel)}
      className="relative overflow-hidden rounded-2xl bg-coal-900"
    >
      <video
        key={`tall-${lang}`}
        ref={tallRef}
        poster={`/video/reel-tall-${lang}.jpg`}
        className="block aspect-[1080/1350] w-full sm:hidden"
        {...shared}
      >
        <source src={`/video/reel-tall-${lang}.mp4`} type="video/mp4" />
      </video>
      <video
        key={`wide-${lang}`}
        ref={wideRef}
        poster={`/video/reel-wide-${lang}.jpg`}
        className="hidden aspect-[1920/880] w-full sm:block"
        {...shared}
      >
        <source src={`/video/reel-wide-${lang}.mp4`} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={() => setIntent(playing ? "pause" : "play")}
        aria-label={t(playing ? UI.catalog.reelPause : UI.catalog.reelPlay)}
        className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-coal-950/60 text-paper-50 ring-1 ring-paper-50/15 backdrop-blur-sm transition-colors duration-150 hover:bg-coal-950/85 sm:bottom-4 sm:right-4"
      >
        {playing ? <PauseIcon width={18} height={18} /> : <PlayIcon width={18} height={18} />}
      </button>
    </figure>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { UI, fill } from "@/data/dictionary";
import { INSTAGRAM_ITEMS, LINKS, type InstagramItem } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { ExternalLink } from "./ui/ExternalLink";
import { ChevronDownIcon, ExternalIcon, InstagramIcon } from "./ui/Icons";
import { EASE_OUT, VIEWPORT, riseItem, staggerParent } from "./ui/motion";
import { Photo } from "./ui/Photo";
import { ProductGlyph } from "./ui/ProductGlyph";
import { RevealText } from "./ui/RevealText";
import { SectionLabel } from "./ui/SectionLabel";
import { buttonOutlineLight } from "./ui/styles";

const TONES: Record<InstagramItem["tone"], { tile: string; plate: string }> = {
  brand: { tile: "bg-coal-800", plate: "rgb(255 255 255 / 0.1)" },
  frost: { tile: "bg-paper-100", plate: "rgb(255 255 255 / 0.8)" },
  wheat: { tile: "bg-kraft-100", plate: "rgb(255 255 255 / 0.75)" },
  zar: { tile: "bg-coal-700", plate: "rgb(255 255 255 / 0.1)" },
};

const arrowButton =
  "grid h-12 w-12 place-items-center rounded-full border border-paper-50/25 text-paper-50 transition-[background-color,border-color,opacity] duration-300 hover:border-paper-50/60 hover:bg-paper-50/10 disabled:cursor-default disabled:opacity-30 disabled:hover:border-paper-50/25 disabled:hover:bg-transparent";

export function InstagramShowcaseSection() {
  const { t } = useLang();
  const stripRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Strelice se gase na krajevima trake.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const update = () => {
      setAtStart(strip.scrollLeft <= 4);
      setAtEnd(strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4);
    };
    update();
    strip.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      strip.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByTile = (direction: 1 | -1) => {
    const strip = stripRef.current;
    const tile = strip?.querySelector("li");
    if (!strip || !tile) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollBy({
      left: direction * (tile.getBoundingClientRect().width + 16),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="instagram"
      aria-labelledby="instagram-naslov"
      className="isolate overflow-hidden bg-coal-950 pb-[var(--space-2xl)] pt-[var(--space-2xl)] text-paper-50"
    >
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerParent}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <motion.div variants={riseItem}>
              <SectionLabel surface="dark">{t(UI.sections.instagram)}</SectionLabel>
            </motion.div>
            <h2
              id="instagram-naslov"
              className="font-display mt-4 text-[clamp(2.75rem,8vw,6.75rem)]"
            >
              <RevealText text={t(UI.instagram.title)} />
            </h2>
            <motion.p variants={riseItem} className="mt-4 max-w-[34rem] text-[1.06rem] text-mist">
              {fill(t(UI.instagram.intro), { handle: LINKS.instagramHandle })}
            </motion.p>
          </div>

          <motion.div variants={riseItem} className="flex items-center gap-3">
            <ExternalLink href={LINKS.instagram} className={`${buttonOutlineLight} flex-1 sm:flex-none`}>
              <InstagramIcon />
              {t(UI.instagram.cta)}
            </ExternalLink>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                aria-label={t(UI.instagram.previous)}
                disabled={atStart}
                onClick={() => scrollByTile(-1)}
                className={arrowButton}
              >
                <ChevronDownIcon className="rotate-90" />
              </button>
              <button
                type="button"
                aria-label={t(UI.instagram.next)}
                disabled={atEnd}
                onClick={() => scrollByTile(1)}
                className={arrowButton}
              >
                <ChevronDownIcon className="-rotate-90" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Traka od ivice do ivice: prevlačenje prstom, točkić ili strelice */}
      <ul
        ref={stripRef}
        aria-label={t(UI.instagram.feedLabel)}
        className="px-gutter no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain sm:gap-4"
      >
        {INSTAGRAM_ITEMS.map((item, index) => {
          const tone = TONES[item.tone];
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.07, ease: EASE_OUT }}
              className="w-[72vw] max-w-[24rem] shrink-0 snap-start sm:w-[42vw] lg:w-[26vw]"
            >
              <ExternalLink
                href={item.href ?? LINKS.instagram}
                className={`ig-tile group relative block overflow-hidden rounded-2xl ${tone.tile}`}
              >
                {/* Originalna fotografija; ilustracija je rezerva dok se ne učita */}
                <Photo
                  src={item.imageSrc}
                  alt=""
                  sizes="(min-width: 1024px) 26vw, (min-width: 640px) 42vw, 72vw"
                  className="aspect-[4/5]"
                  imgClassName="transition-opacity duration-150 group-hover:opacity-90"
                >
                  <ProductGlyph
                    kind={item.glyph}
                    accent={item.accent}
                    plate={tone.plate}
                    className="h-full w-full p-[12%] pb-[30%]"
                  />
                </Photo>

                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-coal-950/75 text-paper-50 backdrop-blur-sm">
                  <InstagramIcon width={18} height={18} />
                </span>

                <span className="absolute inset-x-0 bottom-0 block bg-[linear-gradient(to_top,rgb(18_18_17/0.94)_30%,rgb(18_18_17/0.7)_68%,transparent)] px-4 pb-4 pt-12 text-paper-50 sm:px-5 sm:pb-5">
                  <span className="font-display block text-[1.6rem] sm:text-[1.85rem]">
                    {t(item.title)}
                  </span>
                  <span className="ig-reveal">
                    <span className="block">
                      <span className="mt-1 block text-[0.92rem] leading-snug text-paper-100">
                        {t(item.caption)}
                      </span>
                      <span className="mt-1.5 flex flex-wrap gap-x-2 text-[0.8125rem] text-mist">
                        {item.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1 text-[0.8125rem] font-medium text-paper-50">
                        {t(UI.instagram.tileCta)}
                        <ExternalIcon width={14} height={14} />
                      </span>
                    </span>
                  </span>
                </span>
              </ExternalLink>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

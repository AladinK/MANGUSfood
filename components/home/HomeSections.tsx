"use client";

import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { UI } from "@/data/dictionary";
import {
  ROUTES,
  SECTION_MEDIA,
  getProduct,
  inquiryHref,
  type Product,
} from "@/data/magnusData";
import { HOME } from "@/data/pages";
import { useLang } from "@/lib/i18n";
import { PostCard } from "../PostCard";
import { ProductCard } from "../ProductCard";
import { useCatalog } from "../SiteShell";
import { ContourLines } from "../ui/ContourLines";
import { Photo } from "../ui/Photo";
import { SectionLabel } from "../ui/SectionLabel";
import { buttonDark, buttonOutlineDark, buttonOutlineLight, buttonPrimary } from "../ui/styles";

/** Isti proizvodi koje izdvaja početna stranica na magnusfood.rs */
const FEATURED_IDS = ["pazarski-cevapi", "premium-burger", "pita-sa-krompirom", "pazarske-mantije"];

const FEATURED: ReadonlyArray<Product> = FEATURED_IDS.map((id) => getProduct(id)).filter(
  (product): product is Product => product !== undefined,
);

export function HomeProducts() {
  const { t } = useLang();

  return (
    <section
      aria-labelledby="izdvojeno-naslov"
      className="bg-paper-50 pb-[var(--space-2xl)] pt-[var(--space-3xl)]"
    >
      <div className="container-page">
        <div className="grid gap-x-12 gap-y-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>{t(HOME.products.label)}</SectionLabel>
            <h2
              id="izdvojeno-naslov"
              className="font-display mt-4 text-[clamp(2.75rem,7.5vw,5.75rem)] text-coal-900"
            >
              {t(HOME.products.title)}
            </h2>
          </div>
          <p className="max-w-[36rem] text-[1.06rem] leading-relaxed text-muted lg:col-span-5 lg:pb-2">
            {t(HOME.products.intro)}
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {FEATURED.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard
                product={product}
                sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 108px"
              />
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link href={ROUTES.products} className={`${buttonDark} px-7`}>
            {t(HOME.products.cta)}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomePester() {
  const { t } = useLang();

  return (
    <section aria-labelledby="pester-naslov" className="bg-paper-50 py-[var(--space-2xl)]">
      <div className="container-page">
        <figure className="relative overflow-hidden rounded-2xl text-paper-50">
          <Photo
            src={SECTION_MEDIA.pester}
            alt={t(HOME.pester.alt)}
            sizes="(min-width: 1280px) 1216px, 94vw"
            className="aspect-[4/5] bg-coal-800 sm:aspect-[16/9] lg:aspect-[21/9]"
            imgClassName="object-[50%_60%]"
          >
            <ContourLines className="h-full w-full text-leaf-500/55" />
          </Photo>
          <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(18_18_17/0.94)_22%,rgb(18_18_17/0.6)_64%,transparent)] p-6 pt-24 sm:p-10 sm:pt-32">
            <h2 id="pester-naslov" className="font-display text-[clamp(2.2rem,6vw,4.5rem)]">
              {t(HOME.pester.title)}
            </h2>
            <p className="mt-3 max-w-[36rem] text-[1.02rem] leading-relaxed text-paper-100">
              {t(HOME.pester.body)}
            </p>
            <Link href={ROUTES.pester} className={`${buttonOutlineLight} mt-6 px-7`}>
              {t(HOME.pester.cta)}
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function HomeHoreca() {
  const { t } = useLang();
  const { openCatalog } = useCatalog();

  return (
    <section aria-labelledby="horeca-naslov" className="bg-paper-100 py-[var(--space-2xl)]">
      <div className="container-page grid gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <Photo
            src={SECTION_MEDIA.horeca}
            alt={t(HOME.horeca.alt)}
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="aspect-[4/3] rounded-2xl bg-coal-800"
          />
        </div>
        <div className="lg:col-span-6">
          {/* Zvanični znak „Magnus HoReCa“ */}
          <Image
            src={SECTION_MEDIA.logoHoreca}
            alt="Magnus HoReCa"
            width={131}
            height={15}
            unoptimized
            className="h-[1.15rem] w-auto"
          />
          <h2
            id="horeca-naslov"
            className="font-display mt-5 text-[clamp(2.2rem,5vw,3.75rem)] text-coal-900"
          >
            {t(HOME.horeca.title)}
          </h2>
          <div className="mt-5 grid max-w-[38rem] gap-4 text-[1.04rem] leading-relaxed text-muted">
            {HOME.horeca.body.map((paragraph) => (
              <p key={paragraph.sr.slice(0, 24)}>{t(paragraph)}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={inquiryHref()} className={`${buttonPrimary} px-7`}>
              {t(HOME.horeca.cta)}
            </Link>
            <button
              type="button"
              onClick={openCatalog}
              aria-haspopup="dialog"
              className={`${buttonOutlineDark} px-7`}
            >
              {t(UI.common.requestCatalog)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeNews() {
  const { t } = useLang();

  return (
    <section aria-labelledby="novosti-naslov" className="bg-paper-50 pb-[var(--space-3xl)] pt-[var(--space-2xl)]">
      <div className="container-page">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>{t(HOME.news.label)}</SectionLabel>
            <h2
              id="novosti-naslov"
              className="font-display mt-4 text-[clamp(2.6rem,7vw,4.5rem)] text-coal-900"
            >
              {t(HOME.news.title)}
            </h2>
          </div>
          <div>
            <Link href={ROUTES.blog} className={buttonOutlineDark}>
              {t(HOME.news.cta)}
            </Link>
          </div>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {BLOG_POSTS.slice(0, 3).map((post, index) => (
            <li key={post.slug} className={`h-full ${index === 2 ? "sm:hidden lg:block" : ""}`}>
              <PostCard post={post} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

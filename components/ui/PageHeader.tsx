"use client";

import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { ContourLines } from "./ContourLines";
import { Photo } from "./Photo";

interface PageHeaderProps {
  crumbs: ReadonlyArray<Crumb>;
  title: string;
  /** Kratak red ispod naslova */
  lead?: string;
  intro?: ReadonlyArray<string>;
  image?: {
    src: string;
    alt: string;
    /** Klase za tačku fokusa fotografije, npr. object-[50%_60%] */
    position?: string;
  };
  /** Dugmad ili sadržaj ispod uvoda */
  children?: ReactNode;
  /** Sadržaj desne kolone kada nema fotografije */
  aside?: ReactNode;
}

/**
 * Vrh unutrašnje stranice, u istom tonu kao prvi ekran početne: tamna
 * podloga, putanja, naslov i uvod levo, jedna fotografija desno.
 */
export function PageHeader({ crumbs, title, lead, intro, image, children, aside }: PageHeaderProps) {
  const side = image ? (
    <Photo
      src={image.src}
      alt={image.alt}
      sizes="(min-width: 1024px) 40vw, 92vw"
      eager
      className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-coal-800 lg:aspect-[5/4]"
      imgClassName={image.position ?? ""}
    >
      <ContourLines className="h-full w-full text-paper-50/10" />
    </Photo>
  ) : (
    aside
  );

  return (
    <section data-dark-header className="bg-coal-900 text-paper-50">
      <div className="container-page grid gap-x-12 gap-y-10 pb-14 pt-24 sm:pt-28 lg:grid-cols-12 lg:items-center lg:pb-20 lg:pt-32">
        <div className={side ? "lg:col-span-7" : "lg:col-span-10"}>
          <Breadcrumbs items={crumbs} surface="dark" />
          <h1 className="font-display mt-5 text-[clamp(2.9rem,9vw,6.25rem)]">{title}</h1>
          {lead ? (
            <p className="font-condensed mt-5 text-[clamp(1.25rem,2.4vw,1.6rem)] font-semibold leading-snug text-kraft-300">
              {lead}
            </p>
          ) : null}
          {intro && intro.length > 0 ? (
            <div className="mt-6 grid max-w-[38rem] gap-4 text-[1.06rem] leading-relaxed text-mist sm:text-lg">
              {intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
        {side ? <div className="lg:col-span-5">{side}</div> : null}
      </div>
    </section>
  );
}

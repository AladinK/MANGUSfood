"use client";

import Link from "next/link";
import { ContourLines } from "@/components/ui/ContourLines";
import { buttonOutlineLight, buttonPrimary } from "@/components/ui/styles";
import { UI } from "@/data/dictionary";
import { ROUTES } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";

/** Stranica 404, u istom vizuelnom jeziku kao početna. */
export default function NotFound() {
  const { t } = useLang();

  return (
    <section className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-coal-900 px-5 pb-24 pt-32 text-paper-50">
      <ContourLines className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-leaf-500/35" />

      <div className="w-full max-w-3xl">
        <p className="label-section text-mist">{t(UI.notFound.label)}</p>
        <p
          aria-hidden="true"
          className="font-display mt-2 text-[clamp(7rem,34vw,20rem)] leading-[0.8] text-paper-50/95"
        >
          404
        </p>
        <h1 className="font-display mt-6 text-[clamp(2.2rem,7vw,4.5rem)]">{t(UI.notFound.title)}</h1>
        <p className="mt-4 max-w-[34rem] text-mist">{t(UI.notFound.body)}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={ROUTES.home} className={`${buttonPrimary} px-7`}>
            {t(UI.notFound.home)}
          </Link>
          <Link href={ROUTES.products} className={`${buttonOutlineLight} px-7`}>
            {t(UI.notFound.products)}
          </Link>
        </div>
      </div>
    </section>
  );
}

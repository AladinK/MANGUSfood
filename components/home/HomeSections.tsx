"use client";

import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { ROUTES } from "@/data/magnusData";
import { HOME } from "@/data/pages";
import { useLang } from "@/lib/i18n";
import { PostCard } from "../PostCard";
import { RevealText } from "../ui/RevealText";
import { SectionLabel } from "../ui/SectionLabel";
import { buttonOutlineDark } from "../ui/styles";

/** Novosti sa bloga na početnoj: tri poslednja članka i link ka svim člancima */
export function HomeNews() {
  const { t } = useLang();

  return (
    <section aria-labelledby="novosti-naslov" className="bg-paper-100 py-[var(--space-2xl)]">
      <div className="container-page">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>{t(HOME.news.label)}</SectionLabel>
            <h2
              id="novosti-naslov"
              className="font-display mt-4 text-[clamp(2.6rem,7vw,4.75rem)] text-coal-900"
            >
              <RevealText text={t(HOME.news.title)} />
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

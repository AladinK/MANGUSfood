"use client";

import Link from "next/link";
import { BLOG_CATEGORY, formatPostDate, postHref, type BlogPost } from "@/data/blog";
import { useLang } from "@/lib/i18n";
import { Photo } from "./ui/Photo";

interface PostCardProps {
  post: BlogPost;
  sizes: string;
  /** Nivo naslova kartice, prema strukturi stranice */
  headingLevel?: "h2" | "h3";
  /** Fotografija u prvom ekranu se učitava odmah */
  eager?: boolean;
}

/** Kartica članka; naslov je link i pokriva celu karticu. */
export function PostCard({ post, sizes, headingLevel = "h3", eager = false }: PostCardProps) {
  const { t, lang } = useLang();
  const Heading = headingLevel;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-paper-200 bg-surface shadow-card transition-shadow duration-300 hover:shadow-lift">
      <Photo
        src={post.image}
        alt={t(post.imageAlt)}
        sizes={sizes}
        eager={eager}
        className="aspect-[16/10] bg-paper-200"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.88rem] text-muted">
          <span className="font-medium text-ink">{t(BLOG_CATEGORY)}</span>
          <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
        </p>
        <Heading className="font-display mt-3 text-[1.65rem] text-coal-900 sm:text-[1.85rem]">
          <Link
            href={postHref(post.slug)}
            className="after:absolute after:inset-0 after:z-10 after:content-[''] group-hover:text-coal-700"
          >
            {t(post.title)}
          </Link>
        </Heading>
        <p className="mt-3 text-[0.97rem] leading-relaxed text-muted">{t(post.excerpt)}</p>
      </div>
    </article>
  );
}

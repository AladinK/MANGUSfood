"use client";

import Link from "next/link";
import {
  BLOG_CATEGORY,
  BLOG_POSTS,
  formatPostDate,
  getPost,
} from "@/data/blog";
import { UI } from "@/data/dictionary";
import { ROUTES, navLabel } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { PostCard } from "../PostCard";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { PageHeader } from "../ui/PageHeader";
import { Photo } from "../ui/Photo";
import { buttonDark } from "../ui/styles";

/** Lista članaka */
export function BlogIndexPage() {
  const { t } = useLang();

  return (
    <>
      <PageHeader
        crumbs={[{ label: t(navLabel("pocetna")), href: ROUTES.home }, { label: t(navLabel("blog")) }]}
        title={t(UI.blog.heading)}
        intro={[t(UI.blog.intro)]}
      />
      <section
        aria-label={t(UI.blog.listLabel)}
        className="bg-paper-50 pb-[var(--space-3xl)] pt-[var(--space-xl)]"
      >
        <div className="container-page">
          <ul className="grid gap-5 sm:grid-cols-2 xl:gap-6">
            {BLOG_POSTS.map((post, index) => (
              <li key={post.slug} className="h-full">
                <PostCard
                  post={post}
                  headingLevel="h2"
                  sizes="(min-width: 640px) 46vw, 92vw"
                  eager={index < 2}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/** Jedan članak */
export function BlogPostPage({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const post = getPost(slug);
  if (!post) return null;

  const others = BLOG_POSTS.filter((candidate) => candidate.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="bg-paper-50 pb-[var(--space-2xl)] pt-24 sm:pt-28 lg:pt-32">
        <div className="container-page">
          <header className="mx-auto max-w-[46rem]">
            <Breadcrumbs
              items={[
                { label: t(navLabel("pocetna")), href: ROUTES.home },
                { label: t(navLabel("blog")), href: ROUTES.blog },
                { label: t(post.title) },
              ]}
            />
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.92rem] text-muted">
              <span className="font-medium text-ink">{t(BLOG_CATEGORY)}</span>
              <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
            </p>
            <h1 className="font-display mt-3 text-[clamp(2.4rem,6vw,4.25rem)] text-coal-900">
              {t(post.title)}
            </h1>
          </header>

          <Photo
            src={post.image}
            alt={t(post.imageAlt)}
            sizes="(min-width: 1100px) 64rem, 94vw"
            eager
            className="mx-auto mt-10 aspect-[16/9] max-w-[64rem] rounded-2xl bg-paper-200"
          />

          <div className="mx-auto mt-12 max-w-[42rem] text-[1.1rem] leading-[1.75] text-ink/90">
            {post.body.map((block, index) =>
              block.kind === "h" ? (
                <h2
                  key={index}
                  className="font-display mt-12 text-[clamp(1.75rem,3.4vw,2.25rem)] leading-[1] text-coal-900 first:mt-0"
                >
                  {t(block.text)}
                </h2>
              ) : (
                <p key={index} className="mt-5 first:mt-0">
                  {t(block.text)}
                </p>
              ),
            )}
            <p className="font-condensed mt-12 text-[1.45rem] font-semibold text-coal-900">
              {t(post.signoff)}
            </p>
          </div>
        </div>
      </article>

      <section
        aria-labelledby="jos-clanaka"
        className="border-t border-paper-200 bg-paper-100 pb-[var(--space-3xl)] pt-[var(--space-2xl)]"
      >
        <div className="container-page">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="jos-clanaka" className="font-display text-[clamp(2.2rem,5vw,3.5rem)] text-coal-900">
              {t(UI.blog.more)}
            </h2>
            <div>
              <Link href={ROUTES.blog} className={buttonDark}>
                {t(UI.blog.all)}
              </Link>
            </div>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:gap-6">
            {others.map((other) => (
              <li key={other.slug} className="h-full">
                <PostCard post={other} sizes="(min-width: 640px) 46vw, 92vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

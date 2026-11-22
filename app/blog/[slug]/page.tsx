import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { BlogPostPage } from "@/components/pages/BlogPages";
import { BLOG_POSTS, getPost, postHref } from "@/data/blog";
import { ROUTES } from "@/data/magnusData";
import { blogPostingLd, breadcrumbLd, graph, pageMetadata } from "@/lib/seo";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title.sr,
    description: post.excerpt.sr,
    path: postHref(post.slug),
    type: "article",
  });
}

export default async function BlogPostRoute({ params }: RouteProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          blogPostingLd(post),
          breadcrumbLd([
            { name: "Početna", path: ROUTES.home },
            { name: "Blog", path: ROUTES.blog },
            { name: post.title.sr, path: postHref(post.slug) },
          ]),
        )}
      />
      <BlogPostPage slug={post.slug} />
    </>
  );
}

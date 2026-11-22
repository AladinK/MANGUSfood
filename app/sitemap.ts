import type { MetadataRoute } from "next";
import { BLOG_POSTS, postHref } from "@/data/blog";
import { PRODUCTS, ROUTES, productHref } from "@/data/magnusData";
import { absoluteUrl } from "@/lib/seo";

/** Sve stranice sajta; politika privatnosti nije tu dok je nacrt. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl(ROUTES.home), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl(ROUTES.products), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl(ROUTES.about), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl(ROUTES.pester), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl(ROUTES.contact), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl(ROUTES.blog), changeFrequency: "monthly", priority: 0.6 },
  ];

  const products: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: absoluteUrl(productHref(product.id)),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: absoluteUrl(postHref(post.slug)),
    lastModified: post.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...products, ...posts];
}

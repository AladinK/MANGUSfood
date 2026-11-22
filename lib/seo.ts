/**
 * Metapodaci i strukturirani podaci (JSON-LD) za pojedinačne stranice.
 * Srpski je jezik koji se indeksira; engleski se uključuje u pregledaču.
 */

import type { Metadata } from "next";
import type { BlogPost } from "@/data/blog";
import { postHref } from "@/data/blog";
import {
  COMPANY,
  FAQ_ITEMS,
  LINKS,
  getCategory,
  productHref,
  type Product,
} from "@/data/magnusData";

export const SITE_TITLE = "Magnus Food Industry | Meso i pite sa Peštera";
export const SITE_DESCRIPTION =
  "Brzo zamrznuti proizvodi od 100% junetine i pite i mantije spremne za pečenje, iz Novog Pazara. HACCP i HALAL. Zatražite katalog ili pošaljite upit za saradnju.";

export const ORGANIZATION_ID = `${LINKS.site}/#organization`;
export const WEBSITE_ID = `${LINKS.site}/#website`;

export const absoluteUrl = (path: string): string =>
  path === "/" ? LINKS.site : `${LINKS.site}${path}`;

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

/**
 * Slika za deljenje (app/opengraph-image.tsx). Navodi se izričito, jer
 * openGraph na stranici zamenjuje onaj iz layouta zajedno sa slikom.
 */
const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Magnus Food Industry: meso i pite sa Peštera",
};

/** Naslov, opis, kanonska adresa i Open Graph za jednu stranicu */
export function pageMetadata({ title, description, path, type = "website" }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: absoluteUrl(path),
      siteName: COMPANY.brand,
      title,
      description,
      locale: "sr_RS",
      alternateLocale: ["en_US"],
      images: [SHARE_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE.url] },
  };
}

/* ------------------------------------------------------------------ */

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export const breadcrumbLd = (items: ReadonlyArray<BreadcrumbItem>) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const productLd = (product: Product) => ({
  "@type": "Product",
  "@id": `${absoluteUrl(productHref(product.id))}#product`,
  name: product.name.sr,
  description: product.story.sr,
  url: absoluteUrl(productHref(product.id)),
  category: getCategory(product.category).name.sr,
  brand: { "@type": "Brand", name: COMPANY.shortBrand },
  manufacturer: { "@id": ORGANIZATION_ID },
  ...(product.imageSrc ? { image: absoluteUrl(product.imageSrc) } : {}),
});

export const productListLd = (products: ReadonlyArray<Product>) => ({
  "@type": "ItemList",
  name: "Magnus Food Industry — proizvodi",
  numberOfItems: products.length,
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(productHref(product.id)),
    name: product.name.sr,
  })),
});

export const faqLd = () => ({
  "@type": "FAQPage",
  inLanguage: "sr-Latn",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question.sr,
    acceptedAnswer: { "@type": "Answer", text: item.answer.sr },
  })),
});

export const blogPostingLd = (post: BlogPost) => ({
  "@type": "BlogPosting",
  "@id": `${absoluteUrl(postHref(post.slug))}#article`,
  headline: post.title.sr,
  description: post.excerpt.sr,
  datePublished: post.date,
  dateModified: post.date,
  inLanguage: "sr-Latn",
  image: absoluteUrl(post.image),
  mainEntityOfPage: absoluteUrl(postHref(post.slug)),
  author: { "@id": ORGANIZATION_ID },
  publisher: { "@id": ORGANIZATION_ID },
});

/** Jedan JSON-LD dokument sa više čvorova */
export const graph = (...nodes: ReadonlyArray<object>) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

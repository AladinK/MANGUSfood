import type { NextConfig } from "next";
import { BLOG_POSTS, postHref } from "./data/blog";

/**
 * Stare adrese sa WordPress sajta trajno vode na nove, da linkovi i
 * pozicije u pretrazi ne propadnu kada novi sajt zameni stari.
 */
const LEGACY_REDIRECTS: ReadonlyArray<{ source: string; destination: string }> = [
  { source: "/home-agriculture", destination: "/pester" },
  { source: "/magnus-proizvodi", destination: "/proizvodi" },
  { source: "/privacy-policy", destination: "/politika-privatnosti" },
  { source: "/category/novosti", destination: "/blog" },
  ...BLOG_POSTS.map((post) => ({ source: post.legacyPath, destination: postHref(post.slug) })),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Sve slike su lokalne (/public/originals); optimizator ih služi u AVIF/WebP.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Stari sajt koristi kosu crtu na kraju adrese; pokrivamo oba oblika.
    return LEGACY_REDIRECTS.flatMap(({ source, destination }) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ]);
  },
};

export default nextConfig;

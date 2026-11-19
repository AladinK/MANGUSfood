import type { MetadataRoute } from "next";
import { LINKS } from "@/data/magnusData";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${LINKS.site}/sitemap.xml`,
    host: LINKS.site,
  };
}

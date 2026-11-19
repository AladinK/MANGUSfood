import type { MetadataRoute } from "next";
import { LINKS } from "@/data/magnusData";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: LINKS.site,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

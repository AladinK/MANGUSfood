import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Sve slike su lokalne (/public/originals); optimizator ih služi u AVIF/WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Match the WordPress URLs (e.g. /ubud-pilates/) so existing links and rankings keep working.
  trailingSlash: true,
  partialPrefetching: true,
  images: {
    // Sources are capped at 2048px (scripts/optimize-images.mjs), so skip the 3840 variant.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Static imports are content-hashed, so optimised copies can be cached for a month.
    minimumCacheTTL: 2678400,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

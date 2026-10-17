import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    const pageSources = [
      "/",
      "/about",
      "/services/:path*",
      "/casestudy/:path*",
      "/blog/:path*",
      "/blogs",
      "/book-consultation",
      "/calculator/:path*",
      "/contacts",
      "/admin/:path*",
    ];

    return [
      // HTML must revalidate after a deployment so mobile browsers do not
      // keep an old document that points at stale responsive markup/CSS.
      ...pageSources.map((source) => ({
        source,
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, must-revalidate",
          },
        ],
      })),
      // Never reuse API responses that may contain updated CMS content.
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "virtualnexgen.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "freepngimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "file.aiquickdraw.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "catalyit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ml.globenewswire.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nexprobyte.com",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;

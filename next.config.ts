import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
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

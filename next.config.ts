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
  async redirects() {
    return [
      {
        source: "/services/insurance-virtual-assistants",
        destination: "/service/Insurance-Virtual-Assistants",
        permanent: true,
      },
      {
        source: "/blog/restoration-virtual-assistant-emergency-job-coordination",
        destination: "/blog/restoration-virtual-assistant-emergency-job-coordinations",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/service/Insurance-Virtual-Assistants",
        destination: "/services/insurance-virtual-assistants",
      },
    ];
  },
};

export default nextConfig;

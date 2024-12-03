import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'content.lifeclicks.gr'], // Add localhost to allowed domains
  },
};

export default nextConfig;

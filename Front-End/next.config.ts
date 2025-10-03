import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: [
      "api.remailer.eu",
      "raw.githubusercontent.com",
      "github.com",
      "plus.unsplash.com",
    ],
  },
};

export default nextConfig;

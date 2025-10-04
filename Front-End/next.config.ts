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
      "as2.ftcdn.net",
      "as1.ftcdn.net",
      "t3.ftcdn.net",
      "t4.ftcdn.net",
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 도메인 허용
      },
      {
        protocol: "http",
        hostname: "**", // 모든 도메인 허용
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },{
        protocol: "https",
        hostname: "https://todokevin4.pythonanywhere.com/",
      },
    ],
  }

};

export default nextConfig;

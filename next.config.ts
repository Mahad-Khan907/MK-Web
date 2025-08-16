import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.freepik.com",
      "encrypted-tbn0.gstatic.com",
      "cdn.sanity.io", // ✅ allow Sanity images
    ],
  },
};

export default nextConfig;

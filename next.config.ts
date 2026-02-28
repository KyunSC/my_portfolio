import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "framer-motion"],
    optimizeCss: true,
  },
};

export default nextConfig;

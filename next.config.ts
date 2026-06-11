import type { NextConfig } from "next";

// Static export. The base path depends on the host:
//  - GitHub Pages serves at /peg-plush  -> build with NEXT_PUBLIC_BASE_PATH=/peg-plush
//  - Vercel serves at the domain root   -> build with no env var
// src/lib/constants.ts reads the same env var for public asset URLs.
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: { unoptimized: true },
};

export default nextConfig;

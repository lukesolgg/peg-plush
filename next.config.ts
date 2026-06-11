import type { NextConfig } from "next";

// Static export for GitHub Pages (served at /peg-plush/). basePath only in
// production builds so local `next dev` stays at the root.
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/peg-plush" : "",
  images: { unoptimized: true },
};

export default nextConfig;

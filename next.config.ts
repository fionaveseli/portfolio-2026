import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Link hrefs are checked against real routes at type-check time.
  typedRoutes: true,
  poweredByHeader: false,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/moontrade-ai',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/dex-api/:path*',
  //       destination: 'http://192.168.50.237:8888/dex-api/:path*',
  //     },
  //   ];
  // },
 
};

export default nextConfig;
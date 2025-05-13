/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverMinification: false,
  // },
  productionBrowserSourceMaps: true,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
    ],
  },
};

export default nextConfig;

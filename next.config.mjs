/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  reactStrictMode: true,
};

export default nextConfig;

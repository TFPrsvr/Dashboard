/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  experimental: {
    serverActions: true,
  },

  images: {
    domains: ["localhost", "127.0.0.1"],
  },
};

module.exports = nextConfig;

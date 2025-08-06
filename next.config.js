/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  images: {
    unoptimized: true,
  },

  // Disable all experimental features
  experimental: {},
};

module.exports = nextConfig;

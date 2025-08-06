/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  
  images: {
    unoptimized: true,
  },

  // Disable all experimental features
  experimental: {},
};

module.exports = nextConfig;

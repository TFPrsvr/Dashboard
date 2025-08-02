// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image configuration
  images: {
    domains: ["localhost", "127.0.0.1"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Environment-specific output configuration
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // Disable turbo in production to avoid clientModules issues
  experimental: process.env.NODE_ENV !== 'production' ? {
    turbo: {
      // Turbo only in development
    },
  } : {},

  // Error handling for production builds
  onError: (err) => {
    console.error('Next.js build error:', err);
  },

  // Webpack configuration for better compatibility
  webpack: (config, { dev, isServer }) => {
    // Fix for clerk and other ESM modules
    if (!dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Transpile packages that need it
  transpilePackages: ['@clerk/nextjs'],
};

module.exports = nextConfig;

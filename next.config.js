// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Completely disable output file tracing to prevent manifest errors
  experimental: {
    ...(process.env.NODE_ENV !== 'production' ? {
      turbo: {
        // Turbo only in development
      },
    } : {}),
    outputFileTracing: false,
  },

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

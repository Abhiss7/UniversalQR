/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@universalqr/shared-types', '@universalqr/shared-config'],
  images: {
    domains: ['localhost'],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;

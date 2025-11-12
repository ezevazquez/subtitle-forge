/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@subtitleforge/ui'],
  // Logging para debug en producción
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Asegurar que PostCSS se ejecute correctamente
  experimental: {
    optimizePackageImports: ['@subtitleforge/ui'],
  },
};

export default nextConfig;

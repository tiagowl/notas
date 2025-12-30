/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  // Desabilitar geração estática de páginas de erro
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
}

module.exports = nextConfig




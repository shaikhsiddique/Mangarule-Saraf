/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["images.unsplash.com", "assets-global.website-files.com", "cdn.pixabay.com"] },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  output: 'standalone',
}

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'images.meesho.com', 'cdn.meesho.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.meesho.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.meesho.com',
      },
    ],
  },
}

module.exports = nextConfig


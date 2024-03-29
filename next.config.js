/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'flagcdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig

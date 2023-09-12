/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "tm-poster-images.fra1.cdn.digitaloceanspaces.com",
      "tm-poster-images.blr1.cdn.digitaloceanspaces.com",
    ],
  },
}

module.exports = nextConfig

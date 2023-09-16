/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "tm-poster-images.fra1.cdn.digitaloceanspaces.com",
      "tm-poster-images.blr1.cdn.digitaloceanspaces.com",
      "external-preview.redd.it",
      "images.unsplash.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/echoes",
        destination: "https://echoes.hustlesasa.shop/",
        permanent: true,
      },
      {
        source: "/",
        destination: "https://echoes.hustlesasa.shop/",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

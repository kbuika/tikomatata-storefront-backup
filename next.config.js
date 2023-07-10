/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/renderconke",
        destination: "http://localhost:3000/main",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

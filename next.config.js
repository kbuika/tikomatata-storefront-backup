/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "tm-poster-images.fra1.cdn.digitaloceanspaces.com",
      "tm-poster-images.blr1.cdn.digitaloceanspaces.com",
      "tm-posters.blr1.cdn.digitaloceanspaces.com",
      "tm-images.blr1.cdn.digitaloceanspaces.com",
      "external-preview.redd.it",
      "images.unsplash.com",
      "github.com",
      "tikomatata.com",
      "files.tikomatata.co.ke",
      "minio-lcswg0k.37.60.233.230.sslip.io",
      "ibb.co",
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
        source: "/the-jump-off",
        destination: "https://tikomatata.com/events/THE%20JUMP%20OFF%20?id=6",
        permanent: true,
      },
      {
        source: "/bnp",
        destination: "https://tikomatata.com/event/bnp-experience",
        permanent: true,
      },
      {
        source: "/ftla",
        destination: "https://triply.co/ftla",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs")

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "tikomatata",
    project: "javascript-nextjs",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
)

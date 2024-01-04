import Head from "next/head"
export default function SEO({
  title,
  description = "",
  image = "https://dev.tikomatata.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftikomatata-round.fcf8ea3e.png&w=3840&q=75",
}) {
  const metaDescription =
    description || "Where Every Event is an Experience, and Every Experience is Extraordinary "

  return (
    <Head>
      <title>{title} | Tikomatata | touch grass!</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="og:title" property="og:title" content={title} />
      <meta name="og:description" property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={image} />
      <link rel="icon" type="image/png" href="/static/favicon.ico" />
      <link rel="apple-touch-icon" href="/static/favicon.ico" />
    </Head>
  )
}

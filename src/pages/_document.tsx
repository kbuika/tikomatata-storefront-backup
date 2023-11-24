import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Tikomatata | touch grass!</title>
      <meta
        name="description"
        content="Where Every Event is an Experience, and Every Experience is Extraordinary "
      />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="Tikomatata | touch grass!" />
      <meta
        property="og:description"
        content="Where Every Event is an Experience, and Every Experience is Extraordinary"
      />
      <meta
        property="og:image"
        content="https://dev.tikomatata.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftikomatata-round.fcf8ea3e.png&w=3840&q=75"
      />
      <meta property="twitter:title" content="Tikomatata | touch grass!" />
      <meta
        property="twitter:description"
        content="Where Every Event is an Experience, and Every Experience is Extraordinary"
      />
      <meta
        property="twitter:image"
        content="https://dev.tikomatata.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftikomatata-round.fcf8ea3e.png&w=3840&q=75"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Trade+Winds&display=swap"
        rel="stylesheet"
      ></link>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;800&display=swap"
        rel="stylesheet"
      ></link>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

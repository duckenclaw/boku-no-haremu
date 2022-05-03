import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/toasts.scss'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Boku No Haremu</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/images/android-chrome-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-8DC1F0GW4R"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-8DC1F0GW4R');`}
      </Script>
      <Component {...pageProps} />
    </>
  )
}

export default App

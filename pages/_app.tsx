import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { WaxProvider } from 'contexts/wax_context'

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
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
      <Hydrate state={pageProps.dehydratedState}>
        <WaxProvider>
          <Component {...pageProps} />
        </WaxProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App

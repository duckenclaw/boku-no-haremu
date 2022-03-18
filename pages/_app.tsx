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

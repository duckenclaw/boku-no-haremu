import React, { useState } from 'react'
import Modal from 'react-modal'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from 'react-query/devtools'

import { useWax, WaxProvider } from 'contexts/wax_context'
import { GameContextProvider } from './game_context'
import { GameFooter } from 'game/components/game_footer'
import { GameHeader } from 'game/components/game_header'
import { Router } from 'game/screens/router'
import { useGetResources, useInitAccount } from './game_api'
import { GameLayout } from './game_layout'
import { Loader } from 'components/shared-ui/loader'

import s from './game_component.module.scss'
import { Wallets } from './components/game_wallets'
import { InitAccount } from './components/game_init_account'

Modal.setAppElement('#__next')

export const Game = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <WaxProvider>
        <GameComponent />
        <ReactQueryDevtools />
        <ToastContainer toastStyle={{ top: 100 }} />
      </WaxProvider>
    </QueryClientProvider>
  )
}

export const GameComponent = () => {
  const { isLoading: isLoadingWax, isConnected } = useWax()
  const { data: resourcesData, isLoading: isLoadingResources } =
    useGetResources()
  const { isLoading: isInitAccountLoading } = useInitAccount()
  return (
    <GameLayout>
      <Loader
        isLoading={isLoadingWax || isLoadingResources || isInitAccountLoading}
      >
        {isConnected ? (
          resourcesData?.isUserInitialized ? (
            <GameContextProvider>
              <GameHeader />
              <Router />
              <GameFooter />
            </GameContextProvider>
          ) : (
            <InitAccount />
          )
        ) : (
          <Wallets />
        )}
      </Loader>
    </GameLayout>
  )
}

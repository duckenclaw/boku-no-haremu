import React, { useState } from 'react'
import Modal from 'react-modal'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from 'react-query/devtools'

import { useWax, WaxProvider } from 'contexts/wax_context'
import { GameContextProvider } from 'game/game_context'
import { GameFooter } from 'game/components/game_footer'
import { GameHeader } from 'game/components/game_header'
import { Wallets } from 'game/components/game_wallets'
import { InitAccount } from 'game/components/game_init_account'
import { Router } from 'game/screens/router'
import { useConfig, useGetResources, useInitAccount } from './game_api'
import { GameLayout } from 'game/game_layout'
import { Loader } from 'components/shared-ui/loader'

Modal.setAppElement('#__next')

export const Game = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            cacheTime: 1000,
            staleTime: 1000,
          },
        },
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <WaxProvider>
        <GameComponent />
        <ReactQueryDevtools />
        <ToastContainer
          toastStyle={{ top: 100 }}
          autoClose={2000}
          pauseOnHover={false}
          draggable={true}
        />
      </WaxProvider>
    </QueryClientProvider>
  )
}

export const GameComponent = () => {
  const { isLoading: isLoadingWax, isConnected } = useWax()
  const {
    data: resourcesData,
    isLoading: isLoadingResources,
    isError: isErrorResources,
    refetch: refetchResources,
  } = useGetResources()
  const { isLoading: isInitAccountLoading } = useInitAccount()
  const { isLoading: isConfigLoading, data: configData } = useConfig()
  return (
    <GameLayout>
      <Loader
        isLoading={
          isLoadingWax ||
          isLoadingResources ||
          isInitAccountLoading ||
          isConfigLoading
        }
        isError={isErrorResources}
        onRetry={refetchResources}
      >
        {isConnected ? (
          configData?.is_paused === 1 ? (
            <h1>The game is currently on pause</h1>
          ) : resourcesData?.isUserInitialized ? (
            <GameContextProvider config={configData!}>
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

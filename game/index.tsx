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
import { Button } from 'game/components/button'
import { useGetResources, useInitAccount } from './game_api'
import { GameLayout } from './game_layout'
import { Loader } from 'components/shared-ui/loader'

import s from './game_component.module.scss'
import { Wallets } from './components/game_wallets'

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
  const { mutateAsync: initAccount, isLoading: isInitAccountLoading } =
    useInitAccount()
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
            <div className={s.login}>
              <Button
                onClick={() => initAccount()}
                disabled={isInitAccountLoading}
              >
                init Game Account
              </Button>
            </div>
          )
        ) : (
          <div className={s.wallets}>
            <Wallets />
          </div>
        )}
      </Loader>
    </GameLayout>
  )
}

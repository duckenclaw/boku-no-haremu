import React from 'react'

import { useWax } from 'contexts/wax_context'
import { GameContextProvider } from './game_context'
import { GameFooter } from './game_footer'
import { GameHeader } from './game_header'
import { Router } from './router'
import { Button } from 'components/shared-ui/button'
import { useGetResources, useInitAccount } from './game_api'
import { GameLayout } from './game_layout'
import { Loader } from 'components/shared-ui/loader'

import s from './game_component.module.scss'

export const GameComponent = () => {
  const { isLoading: isLoadingWax, isConnected, login } = useWax()
  const { data: resourcesData, isLoading: isLoadingResources } =
    useGetResources()
  const { mutateAsync: initAccount, isLoading: isInitAccountLoading } =
    useInitAccount()
  return (
    <GameLayout>
      {(isLoadingWax || isLoadingResources) && <Loader />}
      {isConnected && resourcesData ? (
        resourcesData?.isUserInitialized ? (
          <GameContextProvider>
            <GameHeader />
            <Router />
            <GameFooter />
          </GameContextProvider>
        ) : (
          <Button onClick={() => initAccount()} disabled={isInitAccountLoading}>
            Initialize Game Account
          </Button>
        )
      ) : (
        <Button
          onClick={() => login()}
          className={s.login_button}
          disabled={isLoadingWax}
        >
          Login
        </Button>
      )}
    </GameLayout>
  )
}

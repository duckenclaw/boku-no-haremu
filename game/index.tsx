import React from 'react'

import { useWax } from 'contexts/wax_context'
import { GameContextProvider } from './game_context'
import { GameFooter } from './game_footer'
import { GameHeader } from './game_header'
import { Router } from './router'
import { Button } from 'game/components/button'
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
          <div className={s.login}>
            <Button onClick={() => login('waxjs')} disabled={isLoadingWax}>
              Login WCW
            </Button>
            <Button
              disabled={isLoadingWax}
              onClick={() => {
                login('anchor')
              }}
            >
              Login Anchor
            </Button>
            {process.env.NEXT_PUBLIC_TESTNET === 'true' && (
              <Button
                disabled={isLoadingWax}
                onClick={() => {
                  login('testnet')
                }}
              >
                Login Testnet
              </Button>
            )}
          </div>
        )}
      </Loader>
    </GameLayout>
  )
}

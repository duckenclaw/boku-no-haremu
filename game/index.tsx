import { useWax } from 'contexts/wax_context'
import React from 'react'
import { GameContextProvider } from './game_context'
import { GameFooter } from './game_footer'
import { GameHeader } from './game_header'
import { Router } from './router'

import s from './game_component.module.scss'
import { Button } from 'components/shared-ui/button'
import { Placeholder } from './screens/placeholder'

export const GameComponent = () => {
  const { isLoading, isConnected, login } = useWax()
  if (process.env.NEXT_PUBLIC_ENABLE_GAME === 'true')
    return (
      <div className={s.layout}>
        {isConnected ? (
          <GameContextProvider>
            <GameHeader />
            <Router />
            <GameFooter />
          </GameContextProvider>
        ) : (
          <Button
            onClick={() => login()}
            className={s.login_button}
            disabled={isLoading}
          >
            Login
          </Button>
        )}
      </div>
    )
  else
    return (
      <div className={s.layout}>
        <Placeholder />
      </div>
    )
}

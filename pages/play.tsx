import React from 'react'
import { NextPage } from 'next'
import { ErrorBoundary } from 'react-error-boundary'
import dynamic from 'next/dynamic'

import { GameLayout } from 'game/game_layout'
import { Placeholder } from 'game/screens/placeholder'
import { Loader } from 'components/shared-ui/loader'
import { Button } from 'components/shared-ui/button'

// TODO loader
const GameComponent = dynamic(() => import('game').then((m) => m.Game as any), {
  ssr: false,
  loading: ({ isLoading, error, retry }) => {
    return (
      <Loader
        isLoading={isLoading}
        isError={!!error}
        onRetry={retry}
        customRetryComponent={<Button onClick={retry}>Try Again</Button>}
      ></Loader>
    )
  },
})

const Game: NextPage = () => {
  return (
    <GameLayout>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => {
          return (
            <>
              <h2>An unexpected error has occurred</h2>
              <h3>{error.message}</h3>
              <Button onClick={resetErrorBoundary}>Try Again</Button>
            </>
          )
        }}
      >
        {process.env.NEXT_PUBLIC_ENABLE_GAME === 'true' ? (
          <GameComponent />
        ) : (
          <Placeholder />
        )}
      </ErrorBoundary>
    </GameLayout>
  )
}

export default Game

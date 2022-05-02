import React from 'react'
import { NextPage } from 'next'
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
      {process.env.NEXT_PUBLIC_ENABLE_GAME === 'true' ? (
        <GameComponent />
      ) : (
        <Placeholder />
      )}
    </GameLayout>
  )
}

export default Game

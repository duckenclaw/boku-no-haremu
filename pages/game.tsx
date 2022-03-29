import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

// TODO loader
const GameComponent = dynamic(
  () => import('game').then((m) => m.GameComponent as any),
  { ssr: false }
)

const Game: NextPage = () => {
  return <GameComponent />
}

export default Game

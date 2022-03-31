import React from 'react'

import { useGame } from 'game/game_context'
import { Craft } from 'game/screens/craft'
import { Mine } from 'game/screens/mine'
import { Withdraw } from 'game/screens/withdraw'
import { Placeholder } from 'game/screens/placeholder'

export const Router = () => {
  const { screen } = useGame()
  switch (screen) {
    case 'mine':
      return <Mine />
    case 'craft':
      return <Craft />
    case 'withdraw':
      return <Withdraw />
    default:
      return <Placeholder />
  }
}

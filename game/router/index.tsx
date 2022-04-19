import React from 'react'

import { useGame } from 'game/game_context'
import { Placeholder } from 'game/screens/placeholder'

import { Craft } from 'game/screens/craft'
import { Mine } from 'game/screens/mine'
import { Withdraw } from 'game/screens/withdraw'
import { Fusion } from 'game/screens/fusion'
import { Inventory } from 'game/screens/inventory'

export const Router = () => {
  const { screen } = useGame()
  switch (screen) {
    case 'mine':
      return <Mine />
    case 'craft':
      return <Craft />
    case 'withdraw':
      return <Withdraw />
    case 'fusion':
      return <Fusion />
    case 'inventory':
      return <Inventory />
    default:
      return <Placeholder />
  }
}

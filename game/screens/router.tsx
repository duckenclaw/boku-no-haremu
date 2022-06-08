import React, { useEffect, useState } from 'react'
import { animated, useTransition } from '@react-spring/web'

import { GameRoutes, useGame } from 'game/game_context'
import { Placeholder } from 'game/screens/placeholder'

import { Craft } from 'game/screens/craft'
import { Mine } from 'game/screens/mine'
import { Withdraw } from 'game/screens/withdraw'
import { Fusion } from 'game/screens/fusion'
import { Inventory } from 'game/screens/inventory'

type ScreenProps = {
  screen: string
}

const Screen = ({ screen }: ScreenProps) => {
  switch (screen) {
    case 'mine':
      return <Mine />
    case 'craft':
      return <Craft />
    case 'atm':
      return <Withdraw />
    case 'fuse':
      return <Fusion />
    case 'inventory':
      return <Inventory />
    default:
      return <Placeholder />
  }
}

export const Router = () => {
  const { screen: contextScreen } = useGame()
  const [{ screen, goingRight }, setState] = useState({
    screen: contextScreen,
    lastScreen: contextScreen,
    goingRight: true,
  })
  useEffect(() => {
    setState((prevState) => ({
      lastScreen: prevState.screen,
      screen: contextScreen,
      goingRight:
        GameRoutes.indexOf(contextScreen as any) >=
        GameRoutes.indexOf(prevState.screen as any),
    }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [contextScreen])

  const transitions = useTransition(screen, {
    initial: {
      position: 'static',
      move: 0,
    },
    from: {
      position: 'static',
      move: -1,
    },
    enter: {
      position: 'static',
      move: 0,
      scale: 1,
    },
    leave: {
      position: 'absolute',
      move: 1,
      maxHeight: '90vh',
      maxWidth: '100vw',
      overflow: 'hidden',
    },
  })
  return (
    <main
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        height: 'auto',
      }}
    >
      {transitions(({ move, ...style }, s, t) => {
        return (
          <animated.div
            style={{
              ...(style as any),
              translateX: move
                .to([-1, 1], goingRight ? [200, -200] : [-200, 200])
                .to((v) => `${v}vw`),
              top: 0,
              left: 0,
            }}
            key={s}
          >
            <Screen screen={s} />
          </animated.div>
        )
      })}
    </main>
  )
}

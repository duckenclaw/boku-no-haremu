import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { useReducer } from 'react'

export const GameRoutes = ['mine', 'craft', 'fuse', 'atm', 'inventory'] as const

export type GameState = {
  screen: typeof GameRoutes[number] | (string & Record<never, never>)
}

type GameContextValue = {
  dispatch: React.Dispatch<Action>
} & GameState &
  GameConfig

type Action = {
  type: 'setScreen'
  screen: GameState['screen']
}

const context = createContext<GameContextValue | null>(null)
context.displayName = 'GameContext'

const reducer = (state: GameState, action: Action) => {
  switch (action.type) {
    case 'setScreen':
      const screen = action.screen.trim()
      if (screen && screen.length > 0 && state.screen !== screen)
        return { ...state, screen: screen ?? 'mine' }
      else return state
    default:
      throw new Error('Unknown action for GameContext')
  }
}

type InitArgs = {
  screen?: GameState['screen'] | null
}

type GameContextProviderProps = {
  config: GameConfig
}

const init = ({ screen: screenArg }: InitArgs): GameState => {
  const screen = screenArg ? (screenArg ?? 'mine').trim() : 'mine'
  return {
    screen: screen as any,
  }
}

export const GameContextProvider: React.FC<GameContextProviderProps> = ({
  config,
  children,
}) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(
    reducer,
    { screen: window.location.hash.replace('#', '') as any },
    init
  )
  useEffect(() => {
    router.push(``, { hash: state.screen })
  }, [state.screen])

  useEffect(() => {
    dispatch({
      type: 'setScreen',
      screen: window.location.hash.replace('#', '') as any,
    })
  }, [router.pathname])

  const value = useMemo(
    () => ({
      ...state,
      ...config,
      dispatch,
    }),
    [state, config]
  )
  return <context.Provider value={value}>{children}</context.Provider>
}

export const useGame = () => {
  const r = useContext(context)
  if (!r) throw new Error('useGame was used outside GameContext')
  return r
}

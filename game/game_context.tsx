import React, { createContext, useContext, useMemo } from 'react'
import { useReducer } from 'react'

export type GameState = {
  screen: 'mine' | 'craft' | 'fusion' | 'withdraw' | 'inventory'
}

type GameContextValue = {
  dispatch: React.Dispatch<Action>
} & GameState

type Action = {
  type: 'setScreen'
  screen: GameState['screen']
}

const context = createContext<GameContextValue | null>(null)
context.displayName = 'GameContext'

const reducer = (state: GameState, action: Action) => {
  switch (action.type) {
    case 'setScreen':
      return { ...state, screen: action.screen }
    default:
      throw new Error('Unknown action for GameContext')
  }
}

const init = (): GameState => ({
  screen: 'mine',
})

export const GameContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, init)
  const value = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state]
  )
  return <context.Provider value={value}>{children}</context.Provider>
}

export const useGame = () => {
  const r = useContext(context)
  if (!r) throw new Error('useGame was used outside GameContext')
  return r
}

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { WaxJS } from '@waxio/waxjs/dist'

import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

const waxConfig =
  process.env.NEXT_PUBLIC_TESTNET === 'true'
    ? {
        apiSigner: new JsSignatureProvider([
          process.env.NEXT_PUBLIC_ACTIVE_KEY_PRIV!,
          process.env.NEXT_PUBLIC_OWNER_KEY_PRIV!,
        ]),
        pubKeys: [
          process.env.NEXT_PUBLIC_ACTIVE_KEY_PUB!,
          process.env.NEXT_PUBLIC_OWNER_KEY_PUB!,
        ],
        rpcEndpoint: 'http://testnet.wax.blacklusion.io',
        userAccount: process.env.NEXT_PUBLIC_ACCOUNT,
      }
    : { rpcEndpoint: 'https://wax.greymass.com/' }

const context = createContext<WaxContextValue | null>(null)
context.displayName = 'WaxContext'

type WaxContextValue = {
  login: () => Promise<void>
  isConnected: boolean
} & WaxContextState

type WaxContextState =
  | {
      isLoading: true

      wax: null
    }
  | {
      isLoading: false
      wax: WaxJS
    }

const initer = () =>
  ({
    isLoading: true,
    wax: null,
  } as WaxContextState)

export const WaxProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<WaxContextState>(initer)
  useEffect(() => {
    const wax = new WaxJS(waxConfig)
    setState({
      isLoading: false,
      wax,
    })
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      isConnected: !!state.wax?.user,
      login: () =>
        state.wax?.login().then(() => setState((s) => ({ ...s }))) ??
        Promise.resolve(),
    }),
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      state,
      state.wax,
    ]
  )

  return <context.Provider value={value}>{children}</context.Provider>
}

export const useWax = () => {
  const r = useContext(context)
  if (!r) throw new Error('useWax was used outside of WaxProvider')
  return r
}

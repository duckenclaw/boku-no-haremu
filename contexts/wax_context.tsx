import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { WaxJS } from '@waxio/waxjs/dist'

import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import { Api, JsonRpc } from 'eosjs'

const createWax = (): WaxJS => {
  if (process.env.NEXT_PUBLIC_TESTNET === 'true') {
    const waxFakeObject: any = {
      userAccount: null,
      login: () => {
        waxFakeObject.userAccount = process.env.NEXT_PUBLIC_ACCOUNT
        waxFakeObject.api = new Api({
          rpc: new JsonRpc('http://testnet.wax.blacklusion.io'),
          signatureProvider: new JsSignatureProvider([
            process.env.NEXT_PUBLIC_ACTIVE_KEY_PRIV!,
            process.env.NEXT_PUBLIC_OWNER_KEY_PRIV!,
          ]),
        })
        return Promise.resolve()
      },
    }
    return waxFakeObject
  }
  return new WaxJS({ rpcEndpoint: 'https://wax.greymass.com/' })
}

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
    const wax = createWax()
    setState({
      isLoading: false,
      wax,
    })
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      isConnected: !!state.wax?.userAccount,
      login: () =>
        state.wax?.login().then(() => setState((s) => ({ ...s }))) ??
        Promise.resolve(),
    }),
    [
      state,
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { WaxJS } from '@waxio/waxjs/dist'

import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import { Api, JsonRpc } from 'eosjs'

import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
import { toast } from 'react-toastify'

const LS_TYPE_KEY = 'bokunoharemu_login_type'

const loginWithAnchor = () => {
  const transport = new AnchorLinkBrowserTransport()
  const link = new AnchorLink({
    transport,
    chains: [
      {
        chainId:
          '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
        nodeUrl: 'https://wax.greymass.com',
      },
    ],
  })
  return link
    .restoreSession(process.env.NEXT_PUBLIC_WAX_CONTRACT!)
    .then(
      (s) =>
        s ||
        link.login(process.env.NEXT_PUBLIC_WAX_CONTRACT!).then((l) => l.session)
    )
    .then((s) => {
      let api: any = new Api({
        rpc: new JsonRpc('https://wax.greymass.com'),
        signatureProvider: s?.makeSignatureProvider(),
      })
      api['transact'] = (...ars: any[]) => {
        return (s as any).transact(...ars)
      }
      return {
        api,
        account: s.auth.actor.toString(),
        auth: s.auth as any as { actor: string; permission: string }, // anchor has special auth object so we force it
        logout: () =>
          link.removeSession(
            process.env.NEXT_PUBLIC_WAX_CONTRACT!,
            s.auth,
            s.chainId
          ),
      }
    })
}

const loginWithWax = () => {
  const wax = new WaxJS({ rpcEndpoint: 'https://wax.greymass.com/' })
  return wax.login().then(() => ({
    api: wax.api,
    account: wax.userAccount,
    auth: { actor: wax.userAccount, permission: 'active' },
    logout: () => Promise.resolve(),
  }))
}

const loginWithTestnet = () =>
  Promise.resolve({
    api: new Api({
      rpc: new JsonRpc('https://testnet.wax.pink.gg'),
      signatureProvider: new JsSignatureProvider([
        process.env.NEXT_PUBLIC_ACTIVE_KEY_PRIV!,
        process.env.NEXT_PUBLIC_OWNER_KEY_PRIV!,
      ]),
    }),
    auth: { actor: process.env.NEXT_PUBLIC_ACCOUNT!, permission: 'active' },
    account: process.env.NEXT_PUBLIC_ACCOUNT,
    logout: () => Promise.resolve(),
  })

const login = (type: LoginTypes) => {
  switch (type) {
    case 'anchor':
      return loginWithAnchor()
    case 'waxjs':
      return loginWithWax()
    case 'testnet':
      return loginWithTestnet()
  }
}

const context = createContext<WaxContextValue | null>(null)
context.displayName = 'WaxContext'

type LoginTypes = 'anchor' | 'waxjs' | 'testnet'

type WaxContextValue = {
  login: (type: LoginTypes) => Promise<void>
} & WaxContextState

type WaxContextState = {
  isLoading: boolean
  isConnected: boolean
  api?: Api
  account?: string
  auth?: {
    actor: string
    permission: string
  }
  logout?: () => Promise<void>
}

export const WaxProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<WaxContextState>(() => ({
    isConnected: false,
    isLoading: true,
  }))

  const value: WaxContextValue = useMemo(
    () => ({
      ...state,
      login: (type) => {
        setState((s) => ({ ...s, isLoading: true }))
        return login(type)
          .then((loginResult) => {
            localStorage.setItem(LS_TYPE_KEY, type)
            setState({
              ...state,
              ...loginResult,
              isLoading: false,
              isConnected: true,
              logout: () => {
                localStorage.removeItem(LS_TYPE_KEY)
                setState({
                  isLoading: true,
                  isConnected: false,
                })
                return loginResult.logout().finally(() => {
                  setState({
                    isLoading: false,
                    isConnected: false,
                  })
                })
              },
            })
          })
          .catch(() => {
            toast.error('There was an error connecting to wallet')
            setState((s) => ({ ...s, isLoading: false }))
          })
      },
    }),
    [state]
  )

  useEffect(() => {
    const type = localStorage.getItem(LS_TYPE_KEY)
    if (type) {
      value.login(type as any)
    } else {
      setState({
        isConnected: false,
        isLoading: false,
      })
    }
  }, [])

  return <context.Provider value={value}>{children}</context.Provider>
}

export const useWax = () => {
  const r = useContext(context)
  if (!r) throw new Error('useWax was used outside of WaxProvider')
  return r
}

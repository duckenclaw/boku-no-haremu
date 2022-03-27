import axios from 'axios'
import { useWax } from 'contexts/wax_context'
import { useEffect, useMemo } from 'react'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'

export const AtomicHubApi = axios.create({
  baseURL: 'https://wax.api.atomicassets.io/atomicassets/v1/',
  withCredentials: false,
})

export const balanceStringToObject = (
  value: string,
  fallbackCurrency?: string
) => {
  const [balance_str, currency_str] = value.split(' ', 2)
  const balance = Number.parseFloat(balance_str)
  return {
    balance: isNaN(balance) ? 0 : balance,
    currency: currency_str ?? fallbackCurrency,
  } as BalanceType
}

export const useGetAllCards = () => {
  const { wax } = useWax()
  return useInfiniteQuery<GetAllCardsResponseType>({
    queryKey: ['wax/getAllCards', { account: wax?.userAccount }],
    enabled: !!wax?.user,
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam }) =>
      AtomicHubApi.post('/assets', {
        owner: wax!.userAccount,
        page: String(pageParam ?? 1),
        limit: '20',
        collection_name: process.env.NEXT_PUBLIC_NFT_COLLECTION,
      }).then((res) => res.data as GetAllCardsResponseType),
    getNextPageParam: (page, pages) => {
      if (page.data.length === 20) {
        return pages.length + 1
      } else return false
    },
  })
}

export const useGetResources = () => {
  const { wax, isConnected } = useWax()
  return useQuery({
    queryKey: ['wax/resources', { address: wax?.userAccount }],
    enabled: isConnected && !!wax?.userAccount,
    queryFn: () =>
      wax?.rpc
        .get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          scope: wax.userAccount,
          table: 'accounts',
          limit: 1,
          reverse: false,
          show_payer: false,
        })
        .catch((e) => console.log(e))
        .then((res) => {
          if (res?.rows[0]) {
            const row = res.rows[0]
            return {
              smp: balanceStringToObject(row.resource_balances[0], 'SMP'),
              nya: balanceStringToObject(row.resource_balances[1], 'NYA'),
              bnt: balanceStringToObject(row.resource_balances[2], 'BHT'),
              cht: balanceStringToObject(row.resource_balances[3], 'CHT'),
              is_blocked: row.is_blocked > 0,
            }
          }
          return {
            smp: balanceStringToObject('0', 'SMP'),
            nya: balanceStringToObject('0', 'NYA'),
            bnt: balanceStringToObject('0', 'BHT'),
            cht: balanceStringToObject('0', 'CHT'),
            is_blocked: false,
          }
        }),
  })
}

export const useWaxBalance = () => {
  const { wax, isConnected } = useWax()
  return useQuery({
    queryKey: ['wax/balance', { address: wax?.userAccount }],
    enabled: isConnected && !!wax?.userAccount,
    queryFn: () =>
      wax?.api.rpc
        .get_currency_balance('eosio.token', wax.userAccount, 'WAX')
        .then((v) => balanceStringToObject(v[0], 'WAX') as BalanceType),
  })
}

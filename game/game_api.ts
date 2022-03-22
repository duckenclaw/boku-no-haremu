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
          limit: 10000,
          reverse: false,
          show_payer: false,
        })
        .catch((e) => console.log(e))
        .then((res) => {
          console.log('wax/resources table', res)
          return {
            nya: 0,
            bnt: 0,
            spt: 0,
            cht: 0,
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
        .then((v) => v[0] as string),
  })
}

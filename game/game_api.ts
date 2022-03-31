import axios from 'axios'
import { useWax } from 'contexts/wax_context'
import { useEffect, useMemo } from 'react'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'

export const AtomicHubApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TESTNET
    ? 'https://test.wax.api.atomicassets.io/atomicassets/v1/'
    : 'https://wax.api.atomicassets.io/atomicassets/v1/',
  withCredentials: false,
})

// balance
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

// get all Waifu NFTs for user
export const useGetAllCards = () => {
  const { wax } = useWax()
  return useInfiniteQuery<GetAllCardsResponseType>({
    queryKey: ['wax/getAllCards', { account: wax?.userAccount }],
    enabled: !!wax?.userAccount,
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam }) =>
      AtomicHubApi.post('/assets', {
        owner: wax!.userAccount,
        page: String(pageParam ?? 1),
        limit: '20',
        collection_name: process.env.NEXT_PUBLIC_NFT_CARDS_COLLECTION,
        schema_name: process.env.NEXT_PUBLIC_NFT_CARDS_SCHEMA,
      }).then((res) => res.data as GetAllCardsResponseType),
    getNextPageParam: (page, pages) => {
      if (page.data.length === 20) {
        return pages.length + 1
      } else return false
    },
  })
}

// get all Banknotes NFTs for user
export const useGetAllBanknotes = () => {
  const { wax } = useWax()
  return useInfiniteQuery<GetAllCardsResponseType>({
    queryKey: ['wax/getAllBanknotes', { account: wax?.userAccount }],
    enabled: !!wax?.userAccount,
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam }) =>
      AtomicHubApi.post('/assets', {
        owner: wax!.userAccount,
        page: String(pageParam ?? 1),
        limit: '20',
        collection_name: process.env.NEXT_PUBLIC_BANKNOTE_NFT_COLLECTION,
        schema_name: process.env.NEXT_PUBLIC_BANKNOTE_NFT_SCHEMA,
      }).then((res) => res.data as GetAllCardsResponseType),
    getNextPageParam: (page, pages) => {
      if (page.data.length === 20) {
        return pages.length + 1
      } else return false
    },
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

// get resources amount for user
export const useGetResources = () => {
  const { wax, isConnected } = useWax()
  return useQuery({
    queryKey: ['wax/resources', { address: wax?.userAccount }],
    enabled: isConnected && !!wax?.userAccount,
    queryFn: () =>
      wax?.api.rpc
        .get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          scope: wax.userAccount,
          table: 'accounts',
          limit: 1,
          reverse: false,
          show_payer: false,
        })
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

// get all mining/set cards for user
export const useGetMiningCards = () => {
  const { wax, isConnected } = useWax()
  return useQuery({
    queryKey: ['wax/mining', { address: wax?.userAccount }],
    enabled: isConnected && !!wax?.userAccount,
    queryFn: () =>
      wax?.api.rpc
        .get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          scope: wax.userAccount,
          table: 'minerecords',
          limit: 10,
        })
        .then((res) => res.rows as MineRecordType[]),
  })
}

type useGetCardByAssetIdOptions = {
  asset_id?: string | null
}

// get card metadata
export const useGetCardByAssetId = ({
  asset_id,
}: useGetCardByAssetIdOptions) => {
  return useQuery({
    queryKey: ['wax/getCardByAssetId', { asset_id }],
    enabled: !!asset_id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AtomicHubApi.get(`/assets/${asset_id}`).then(
        (res) => res.data as GetCardByIdResponseType
      ),
  })
}

type useGetMiningRecipeOptions = {
  template_id?: string
}

// get mining recipe for particular card
export const useGetMiningRecipe = ({
  template_id,
}: useGetMiningRecipeOptions) => {
  const { wax, isConnected } = useWax()
  return useQuery({
    queryKey: ['wax/mining_recipes', { template_id }],
    enabled: isConnected && !!wax?.userAccount && !!template_id,
    queryFn: () =>
      wax?.api.rpc
        .get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          scope: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          table: 'miningrecipe',
          limit: 1,
          index_position: 2,
          key_type: 'i64',
          lower_bound: template_id,
        })
        .then((res) => {
          const row = res.rows[0]
          row.mined_resource = balanceStringToObject(row.mined_resource)
          row.cost = row.cost.map((c: any) => balanceStringToObject(c))
          return row as MiningRecipeRecordType
        }),
  })
}

type useMineArguments = {
  asset_id: string
}

// place card into slot
export const useInitMine = () => {
  const { wax } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMineArguments>({
    mutationKey: 'wax/initMine',
    mutationFn: ({ asset_id }) =>
      wax!.api.transact(
        {
          actions: [
            {
              name: 'initmine',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: wax?.userAccount!,
                  permission: 'active',
                },
              ],
              data: {
                username: wax?.userAccount,
                asset_id,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      ),
    onSuccess: () => {
      qc.invalidateQueries(['wax/mining'])
    },
  })
}

// place card into slot
export const useUnsetMine = () => {
  const { wax } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMineArguments>({
    mutationKey: 'wax/unsetMine',
    mutationFn: ({ asset_id }) =>
      wax!.api.transact(
        {
          actions: [
            {
              name: 'unsetmine',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: wax?.userAccount!,
                  permission: 'active',
                },
              ],
              data: {
                username: wax?.userAccount,
                asset_id,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      ),
    onSuccess: () => {
      qc.invalidateQueries(['wax/mining'])
    },
  })
}

// mine card in the slot
export const useMine = () => {
  const { wax } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMineArguments>({
    mutationKey: 'wax/start_mine',
    mutationFn: ({ asset_id }) =>
      wax!.api.transact(
        {
          actions: [
            {
              name: 'startmine',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: wax?.userAccount!,
                  permission: 'active',
                },
              ],
              data: {
                username: wax?.userAccount,
                asset_id,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      ),
    onSuccess: () => {
      qc.invalidateQueries(['wax/mining'])
      qc.invalidateQueries(['wax/resources'])
    },
  })
}

// claimed mined card
export const useClaim = () => {
  const { wax } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMineArguments>({
    mutationKey: 'wax/claim',
    mutationFn: ({ asset_id }) =>
      wax!.api.transact(
        {
          actions: [
            {
              name: 'claim',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: wax?.userAccount!,
                  permission: 'active',
                },
              ],
              data: {
                username: wax?.userAccount,
                asset_id,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      ),
    onSuccess: () => {
      qc.invalidateQueries(['wax/mining'])
      qc.invalidateQueries(['wax/resources'])
    },
  })
}

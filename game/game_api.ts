import axios from 'axios'
import { useWax } from 'contexts/wax_context'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import { toast } from 'react-toastify'

export const AtomicHubApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_TESTNET === 'true'
      ? 'https://test.wax.api.atomicassets.io/atomicassets/v1/'
      : 'https://wax.api.atomicassets.io/atomicassets/v1/',
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
})

/// QUERIES

// balance string helper
export const balanceStringToObject = (
  value?: string,
  fallbackCurrency?: string
) => {
  const [balance_str, currency_str] = value?.split(' ', 2) ?? [
    '0',
    fallbackCurrency ?? '',
  ]
  const balance = Number.parseFloat(balance_str)
  return {
    balance: isNaN(balance) ? 0 : balance,
    currency: currency_str,
  } as BalanceType
}

/// get WAX balance
export const useWaxBalance = () => {
  const { api, account, isConnected } = useWax()
  return useQuery({
    queryKey: ['wax/balance', { address: account }],
    enabled: isConnected,
    queryFn: () =>
      api?.rpc
        .get_currency_balance('eosio.token', account!, 'WAX')
        .then((v) => balanceStringToObject(v[0], 'WAX') as BalanceType),
  })
}

// get all Waifu NFTs for user
export const useGetAllCards = () => {
  const { api, isConnected, account } = useWax()
  return useInfiniteQuery<GetAllCardsResponseType>({
    queryKey: ['wax/getAllCards', { account }],
    enabled: isConnected,
    queryFn: ({ pageParam }) =>
      AtomicHubApi.get('/assets', {
        params: {
          owner: account,
          page: String(pageParam ?? 1),
          limit: '20',
          collection_name: process.env.NEXT_PUBLIC_CARDS_NFT_COLLECTION,
          schema_name: process.env.NEXT_PUBLIC_CARDS_NFT_SCHEMA,
        },
      }).then((res) => res.data as GetAllCardsResponseType),
    getNextPageParam: (page, pages) => {
      if (page.data.length === 20) {
        return pages.length + 1
      } else return false
    },
  })
}

// get templates data by id

type UseGetTemplateByIdOptions = {
  template_id?: number
}

export const useGetTemplateById = ({
  template_id,
}: UseGetTemplateByIdOptions) => {
  const { isConnected } = useWax()
  return useQuery<GetTemplateByIdResponseType>({
    queryKey: ['wax/getTemplate', { template_id }],
    enabled: isConnected && !!template_id,
    queryFn: () =>
      AtomicHubApi.get(
        `/templates/${process.env.NEXT_PUBLIC_CARDS_NFT_COLLECTION}/${template_id}`
      ).then((res) => res.data as GetTemplateByIdResponseType),
  })
}

// get all Banknotes NFTs for user
export const useGetAllBanknotesTemplates = () => {
  const { isConnected } = useWax()
  return useInfiniteQuery<GetAllBanknotesResponseType>({
    queryKey: ['wax/getAllBanknotes'],
    enabled: isConnected,
    queryFn: ({ pageParam }) =>
      AtomicHubApi.post('/templates', {
        page: String(pageParam ?? 1),
        limit: '40',
        collection_name: process.env.NEXT_PUBLIC_BANKNOTE_NFT_COLLECTION,
        schema_name: process.env.NEXT_PUBLIC_BANKNOTE_NFT_SCHEMA,
      }).then((res) => res.data as GetAllBanknotesResponseType),
    getNextPageParam: (page, pages) => {
      if (page.data.length === 20) {
        return pages.length + 1
      } else return false
    },
  })
}

// get banknote balance stats for user
export const useGetBanknotesBalances = () => {
  const { account, isConnected } = useWax()
  return useQuery<GetBanknoteBalancesResponseType>({
    queryKey: ['wax/getBanknotesBalances', { account }],
    enabled: isConnected,

    queryFn: () =>
      AtomicHubApi.post(
        `/accounts/${account}/${process.env.NEXT_PUBLIC_BANKNOTE_NFT_COLLECTION}`
      ).then((res) => res.data as GetBanknoteBalancesResponseType),
  })
}

type useGetBanknotesByTemplateIdOptions = {
  template_id: string
}

// get all NFTs of specific banknote for user
export const useGetBanknotesByTemplateId = ({
  template_id,
}: useGetBanknotesByTemplateIdOptions) => {
  const { account, isConnected } = useWax()
  return useInfiniteQuery<GetAllCardsResponseType>({
    queryKey: ['wax/getBanknotesByTemplateId', { account, template_id }],
    enabled: isConnected,
    queryFn: ({ pageParam }) =>
      AtomicHubApi.post('/assets', {
        owner: account,
        page: String(pageParam ?? 1),
        limit: '20',
        template_id,
      }).then((res) => res.data as GetAllCardsResponseType),
    getNextPageParam: (page, pages) => {
      if (page.data.length === 20) {
        return pages.length + 1
      } else return false
    },
  })
}

// get resources amount for user
export const useGetResources = () => {
  const { api, isConnected, account } = useWax()
  return useQuery({
    queryKey: ['wax/resources', { account }],
    enabled: isConnected,
    queryFn: () =>
      api?.rpc
        .get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          scope: account,
          table: 'accounts',
          limit: 1,
          reverse: false,
          show_payer: false,
        })
        .then((res) => {
          if (res?.rows[0]) {
            const row = res.rows[0]
            return {
              isUserInitialized: true,
              smp: balanceStringToObject(row.resource_balances[0], 'SMP'),
              nya: balanceStringToObject(row.resource_balances[1], 'NYA'),
              bnt: balanceStringToObject(row.resource_balances[2], 'BHT'),
              cht: balanceStringToObject(row.resource_balances[3], 'CHT'),
              is_blocked: row.is_blocked > 0,
            }
          }
          return {
            isUserInitialized: false,
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
  const { account, api, isConnected } = useWax()
  return useQuery({
    queryKey: ['wax/mining', { account }],
    enabled: isConnected,
    queryFn: () =>
      api?.rpc
        .get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          scope: account,
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
    queryFn: () =>
      AtomicHubApi.post(`/assets/${asset_id}`).then(
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
  const { api, isConnected } = useWax()
  return useQuery({
    queryKey: ['wax/mining_recipes', { template_id }],
    enabled: isConnected && !!template_id,
    queryFn: () =>
      api?.rpc
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

// get craft recipes
export const useCraftRecipes = () => {
  const { api, isConnected } = useWax()
  return useQuery({
    queryKey: ['wax/craft_recipes'],
    enabled: isConnected,
    queryFn: () =>
      api?.rpc
        .get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          scope: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          table: 'craftrecipes',
          limit: 100,
        })
        .then((res) => {
          res.rows = res.rows.map((r) => ({
            ...r,
            cost: r.cost.map((c: any) => balanceStringToObject(c)),
          }))
          return res.rows as CraftRecipe[]
        }),
  })
}

/// MUTATIONS

export const useInitAccount = () => {
  const { api, account } = useWax()
  const qc = useQueryClient()
  return useMutation({
    mutationKey: 'wax/login',
    mutationFn: () =>
      api!.transact(
        {
          actions: [
            {
              name: 'login',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: account!,
                  permission: 'active',
                },
              ],
              data: {
                username: account,
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
      qc.invalidateQueries(['wax/resources'])
    },
  })
}

type useMineArguments = {
  asset_id: string
}
// place card into slot
export const useInitMine = () => {
  const { api, account } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMineArguments>({
    mutationKey: 'wax/initMine',
    mutationFn: ({ asset_id }) =>
      api!.transact(
        {
          actions: [
            {
              name: 'initmine',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: account!,
                  permission: 'active',
                },
              ],
              data: {
                username: account!,
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
  const { api, account } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMineArguments>({
    mutationKey: 'wax/unsetMine',
    mutationFn: ({ asset_id }) =>
      api!.transact(
        {
          actions: [
            {
              name: 'unsetmine',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: account!,
                  permission: 'active',
                },
              ],
              data: {
                username: account!,
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
  const { api, account } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMineArguments>({
    mutationKey: 'wax/start_mine',
    mutationFn: ({ asset_id }) =>
      api!.transact(
        {
          actions: [
            {
              name: 'startmine',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: account!,
                  permission: 'active',
                },
              ],
              data: {
                username: account,
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
      qc.invalidateQueries('wax/resources')
      qc.invalidateQueries('wax/mining')
    },
  })
}

// claimed mined card
export const useClaim = () => {
  const { api, account } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMineArguments>({
    mutationKey: 'wax/claim',
    mutationFn: ({ asset_id }) =>
      api!.transact(
        {
          actions: [
            {
              name: 'claim',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: account!,
                  permission: 'active',
                },
              ],
              data: {
                username: account,
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

type useMintBanknoteOptions = {
  template_id: string
}

// mint banknote by template_id
export const useMintBanknote = ({ template_id }: useMintBanknoteOptions) => {
  const { account, api } = useWax()
  const qc = useQueryClient()
  return useMutation({
    mutationKey: 'wax/mintBanknote',
    mutationFn: () =>
      api!.transact(
        {
          actions: [
            {
              name: 'buybanknote',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: account!,
                  permission: 'active',
                },
              ],
              data: {
                username: account!,
                banknote_template_id: template_id,
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
      toast.success('Banknote minted!')
      qc.invalidateQueries('wax/resources')
      qc.invalidateQueries('wax/getBanknotesBalances')
      qc.invalidateQueries('wax/getAllBanknotes')
    },
  })
}

type UseBurnBanknoteVariables = {
  asset_id: string
}

/// burn selected user banknote
export const useBurnBanknote = () => {
  const { api, account } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, UseBurnBanknoteVariables>({
    mutationKey: 'wax/burn_banknote',
    mutationFn: ({ asset_id }) =>
      api!.transact(
        {
          actions: [
            {
              name: 'burnasset',
              account: 'atomicassets',
              authorization: [
                {
                  actor: account!,
                  permission: 'active',
                },
              ],
              data: {
                asset_id,
                asset_owner: account,
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
      toast.success('Banknote burned!')
      qc.invalidateQueries('wax/resources')
      qc.invalidateQueries('wax/getBanknotesBalances')
      qc.invalidateQueries('wax/getAllBanknotes')
      qc.invalidateQueries(['wax/getBanknotesByTemplateId'])
    },
  })
}

type UseFuseCardsVariables = {
  primeCards: string[]
  secondaryCards: string[]
}

/// fuse cards
export const useFuseCards = () => {
  const { account, api } = useWax()
  const qc = useQueryClient()

  return useMutation<any, any, UseFuseCardsVariables>({
    mutationKey: 'wax/fuse_cards',
    mutationFn: ({ primeCards, secondaryCards }) =>
      api!.transact(
        {
          actions: [
            {
              name: 'transfer',
              account: 'atomicassets',
              authorization: [
                {
                  actor: account!,
                  permission: 'active',
                },
              ],
              data: {
                from: account,
                to: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
                asset_ids: [...primeCards, ...secondaryCards],
                memo: 'fuse_waifu',
              },
            },
            {
              name: 'fuse',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: account!,
                  permission: 'active',
                },
              ],
              data: {
                username: account,
                primary_asset_ids: primeCards,
                secondary_asset_ids: secondaryCards,
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
      toast.success('New Waifu NFT created!')
      qc.invalidateQueries('wax/getAllCards')
    },
  })
}

type UseCraftCardOptions = {
  template_id: number
}

// mint banknote by template_id
export const useCraftCard = ({ template_id }: UseCraftCardOptions) => {
  const { account, api } = useWax()
  const qc = useQueryClient()
  return useMutation({
    mutationKey: 'wax/craftasset',
    mutationFn: () =>
      api!.transact(
        {
          actions: [
            {
              name: 'craftasset',
              account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
              authorization: [
                {
                  actor: account!,
                  permission: 'active',
                },
              ],
              data: {
                username: account,
                asset_template_id: template_id,
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
      toast.success('New Waifu NFT crafted!')
      qc.invalidateQueries('wax/resources')
      qc.invalidateQueries('wax/getAllCards')
    },
  })
}

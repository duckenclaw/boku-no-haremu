import axios from 'axios'
import { useWax } from 'contexts/wax_context'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import { toast } from 'react-toastify'
import { Serialize, type Api } from 'eosjs'
import { useGame } from './game_context'

export const AtomicHubApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WAX_API!,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
})

//#region  HELPERS
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

const MAX_TRIES = 10
const WAIT_DELAY = 2000

const waitFor = (time: number) =>
  new Promise<void>((res) => setTimeout(() => res(), time))

const waitForWaxConfirmation = (api: Api) => async (result: any) => {
  console.log('WAIT FOR CONFR:', result)
  const transaction_id =
    result?.transaction_id ?? result?.transaction?.id?.()?.toString?.() ?? null
  if (transaction_id) {
    await waitFor(WAIT_DELAY / 2)
    for (let index = 0; index < MAX_TRIES; index++) {
      const history = await api.rpc
        .history_get_transaction(transaction_id)
        .catch(() => null)
      console.log('HISTORY FOR ', transaction_id, ':', result)
      if (history?.trx?.receipt?.status === 'executed') {
        return result
      }
      await waitFor(WAIT_DELAY)
    }
  }
  return result
}

const types = Serialize.createInitialTypes()

const nameToUint64 = (name: string): string => {
  let ser = new Serialize.SerialBuffer()
  ser.pushName(name)
  return types.get('uint64')?.deserialize(ser)
}

const uint64ToName = (num: string): string => {
  let ser = new Serialize.SerialBuffer()
  types.get('uint64')?.serialize(ser, num)
  return ser.getName()
}

const uint64Plus1 = (num: string) => {
  let reduceIndex = 0
  return num
    .split('')
    .reduceRight((acc, char, index, array) => {
      let currentNumber = Number(char)
      acc[reduceIndex] =
        (acc[reduceIndex] ?? 0) +
        currentNumber +
        (index === array.length - 1 ? 1 : 0)

      if (acc[reduceIndex] > 9) {
        acc[reduceIndex + 1] = 1
        acc[reduceIndex] = acc[reduceIndex] % 10
      }
      reduceIndex += 1
      return acc
    }, [] as number[])
    .reverse()
    .join('')
}

const transformResourcesRow = (row: any) => {
  if (row) {
    const balances = (row.resource_balances as string[] | null)?.reduce(
      (dict, balanceStr) => {
        const b = balanceStringToObject(balanceStr)
        if (b.currency) {
          dict[b.currency.toLowerCase()] = b
        }
        return dict
      },
      {} as { [key: string]: BalanceType }
    )
    return {
      isUserInitialized: true,
      is_blocked: row.is_blocked > 0,
      ...balances,
    } as UseGetResourcesResponseType
  }
  return {
    isUserInitialized: false,
    smp: balanceStringToObject('0', 'SMP'),
    nya: balanceStringToObject('0', 'NYA'),
    bnt: balanceStringToObject('0', 'BHT'),
    cht: balanceStringToObject('0', 'CHT'),
    is_blocked: false,
  } as UseGetResourcesResponseType
}

//#endregion

//#region QUERIES
// get WAX balance
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

export const useConfig = () => {
  const { api, isConnected } = useWax()
  return useQuery({
    queryKey: [
      'wax/config',
      { contract: process.env.NEXT_PUBLIC_WAX_CONTRACT },
    ],
    enabled: isConnected,
    queryFn: () => {
      return api?.rpc
        .get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          scope: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          table: 'config',
          limit: 1,
          reverse: false,
          show_payer: false,
        })
        .then((res) => {
          return res.rows[0] as GameConfig
        })
    },
  })
}

// get all Waifu NFTs for user

type UseGetAllCardsOptions = {
  limit?: number
  template_id?: string
}

export const useGetAllCards = ({
  limit = 8,
  template_id,
}: UseGetAllCardsOptions) => {
  const { collection_name, schema_name } = useGame()
  const { isConnected, account } = useWax()
  return useInfiniteQuery<GetAllCardsResponseType>({
    queryKey: ['wax/getAllCards', { account, template_id, limit }],
    enabled: isConnected,
    cacheTime: 500,
    queryFn: ({ pageParam }) =>
      AtomicHubApi.get('/assets', {
        params: {
          owner: account,
          page: String(pageParam ?? 1),
          limit,
          template_id,
          collection_name: collection_name,
          schema_name: schema_name,
        },
      }).then((res) => res.data as GetAllCardsResponseType),
    getNextPageParam: (page, pages) => {
      if (page.data.length === limit) {
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
  const { collection_name } = useGame()
  const { isConnected } = useWax()
  return useQuery<GetTemplateByIdResponseType>({
    queryKey: ['wax/getTemplate', { template_id }],
    enabled: isConnected && !!template_id,
    queryFn: () =>
      AtomicHubApi.get(`/templates/${collection_name}/${template_id}`).then(
        (res) => res.data as GetTemplateByIdResponseType
      ),
  })
}

// get all Banknotes NFTs for user
export const useGetAllBanknotesTemplates = () => {
  const { banknote_schema_name, banknote_collection_name } = useGame()
  const { isConnected } = useWax()
  return useQuery<GetAllBanknotesResponseType>({
    queryKey: ['wax/getAllBanknotes'],
    enabled: isConnected,
    queryFn: ({ pageParam }) =>
      AtomicHubApi.get('/templates', {
        params: {
          collection_name: banknote_collection_name,
          schema_name: banknote_schema_name,
        },
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
  const { banknote_collection_name } = useGame()
  const { account, isConnected } = useWax()
  return useQuery<GetBanknoteBalancesResponseType>({
    queryKey: ['wax/getBanknotesBalances', { account }],
    enabled: isConnected,
    queryFn: () =>
      AtomicHubApi.get(`/accounts/${account}/${banknote_collection_name}`).then(
        (res) => res.data as GetBanknoteBalancesResponseType
      ),
  })
}

type useGetBanknotesByTemplateIdOptions = {
  template_id?: string
  limit?: number
}

// get all NFTs of specific banknote for user
export const useGetAllBanknotes = ({
  template_id,
  limit = 9,
}: useGetBanknotesByTemplateIdOptions) => {
  const { banknote_collection_name, banknote_schema_name } = useGame()
  const { account, isConnected } = useWax()
  return useInfiniteQuery<GetAllCardsResponseType>({
    queryKey: ['wax/getAllBanknotes', { account, template_id }],
    enabled: isConnected,
    cacheTime: 500,
    queryFn: ({ pageParam }) =>
      AtomicHubApi.get('/assets', {
        params: {
          owner: account,
          page: String(pageParam ?? 1),
          collection_name: banknote_collection_name,
          schema_name: banknote_schema_name,
          limit: limit,
          template_id,
        },
      }).then((res) => res.data as GetAllCardsResponseType),
    getNextPageParam: (page, pages) => {
      if (page.data.length === limit) {
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
    refetchInterval: 15000,
    queryFn: () => {
      return api?.rpc
        .get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          scope: account,
          table: 'accounts',
          limit: 1,
          reverse: false,
          show_payer: false,
        })
        .then((res) => transformResourcesRow(res.rows[0]))
    },
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
      AtomicHubApi.get(`/assets/${asset_id}`).then(
        (res) => res.data as GetCardByIdResponseType
      ),
  })
}

type useGetCardsByAssetIds = {
  assetIds?: string[] | null
}

export const useGetCardsByAssetIds = ({ assetIds }: useGetCardsByAssetIds) => {
  return useQuery({
    queryKey: ['wax/getCardsByAssetIds', assetIds],
    enabled: !!assetIds,
    queryFn: () =>
      AtomicHubApi.get(`/assets`, {
        params: { ids: assetIds?.join(',') },
      }).then((res) => res.data as GetCardsByIdsResponseType),
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

export const useFuseRecipes = () => {
  const { api, isConnected } = useWax()
  return useQuery({
    queryKey: ['wax/fuse_recipes'],
    enabled: isConnected,
    queryFn: () =>
      api?.rpc
        .get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          scope: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          table: 'fuserecipes',
          limit: 100,
        })
        .then((res) => {
          res.rows.forEach((row) => {
            row.cost = row.cost.map((c: any) => balanceStringToObject(c))
          })
          return res.rows as FuseRecipe[]
        }),
  })
}

type UseFuseQueueOptions = {
  enabled?: boolean
}

export const useFuseQueue = ({ enabled = true }: UseFuseQueueOptions) => {
  const { api, isConnected, account } = useWax()
  return useQuery({
    queryKey: ['wax/fuse_queue', { account }],
    enabled: enabled && isConnected,
    refetchInterval: 5000,
    queryFn: () =>
      api?.rpc
        .get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          scope: process.env.NEXT_PUBLIC_WAX_CONTRACT,
          index_position: 2,
          key_type: 'name',
          lower_bound: account,
          upper_bound: uint64ToName(uint64Plus1(nameToUint64(account!))),
          table: 'fusingqueue',
          limit: 100,
        })
        .then((res) => {
          return res.rows as FuseQueueRecordType[]
        }),
  })
}

//

type UseGetTemplateOptions = {
  mode: 'card' | 'banknote'
}

export const useGetTemplates = ({ mode }: UseGetTemplateOptions) => {
  const {
    banknote_collection_name,
    banknote_schema_name,
    collection_name,
    schema_name,
  } = useGame()
  return useQuery({
    queryKey: ['wax/getTemplates', { mode }],
    queryFn: () =>
      AtomicHubApi.get(`/templates`, {
        params: {
          collection_name:
            mode === 'card' ? collection_name : banknote_collection_name,
          schema_name: mode === 'card' ? schema_name : banknote_schema_name,
        },
      }).then((res) => res.data as GetTemplatesResponseType),
  })
}
//#endregion

//#region MUTATIONS
export const useInitAccount = () => {
  const { api, account, auth } = useWax()
  const qc = useQueryClient()
  return useMutation({
    mutationKey: 'wax/login',
    mutationFn: () =>
      api!
        .transact(
          {
            actions: [
              {
                name: 'login',
                account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
                authorization: [auth!],
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
        )

        .then(waitForWaxConfirmation(api!)),

    onSuccess: () => {
      toast.success('Account successfully initialized!')
      qc.invalidateQueries('wax/resources')
    },
    onError: (e: any) => {
      console.log('error', e)
      toast.error(e?.message ?? 'Error occurred during transaction')
    },
  })
}

type useMineArguments = {
  asset_id: string
}
// place card into slot
export const useInitMine = () => {
  const { api, account, auth } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMineArguments>({
    mutationKey: 'wax/initMine',
    mutationFn: ({ asset_id }) =>
      api!
        .transact(
          {
            actions: [
              {
                name: 'initmine',
                account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
                authorization: [auth!],
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
        )

        .then(waitForWaxConfirmation(api!)),

    onSuccess: () => {
      toast.success('Card placed into mining slot!')
      qc.invalidateQueries('wax/mining')
    },
    onError: (e: any) => {
      console.log('error', e)
      toast.error(e?.message ?? 'Error occurred during transaction')
    },
  })
}

// place card into slot
export const useUnsetMine = () => {
  const { api, account, auth } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMineArguments>({
    mutationKey: 'wax/unsetMine',
    mutationFn: ({ asset_id }) =>
      api!
        .transact(
          {
            actions: [
              {
                name: 'unsetmine',
                account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
                authorization: [auth!],
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
        )
        .then(waitForWaxConfirmation(api!)),

    onSuccess: () => {
      toast.success('Card removed from mining slot!')
      qc.invalidateQueries('wax/mining')
    },
    onError: (e: any) => {
      console.log('error', e)
      toast.error(e?.message ?? 'Error occurred during transaction')
    },
  })
}

// mine card in the slot
export const useMine = () => {
  const { api, account, auth } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMineArguments>({
    mutationKey: 'wax/start_mine',
    mutationFn: ({ asset_id }) =>
      api!
        .transact(
          {
            actions: [
              {
                name: 'startmine',
                account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
                authorization: [auth!],
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
        )

        .then(waitForWaxConfirmation(api!)),

    onSuccess: () => {
      toast.success('Resource mining started!')
      qc.invalidateQueries('wax/resources')
      qc.invalidateQueries('wax/mining')
    },
    onError: (e: any) => {
      console.log('error', e)
      toast.error(e?.message ?? 'Error occurred during transaction')
    },
  })
}

type UseClaimResultType = {
  delta_balances: {
    nya: number
    bnt: number
    cht: number
    smp: number
  } & Record<string, number>
}

// claimed mined card
export const useClaim = () => {
  const { api, account, auth } = useWax()
  const qc = useQueryClient()
  return useMutation<UseClaimResultType, any, useMineArguments>({
    mutationKey: 'wax/claim',
    mutationFn: async ({ asset_id }) => {
      const getResources = () =>
        api!.rpc
          .get_table_rows({
            json: true,
            code: process.env.NEXT_PUBLIC_WAX_CONTRACT,
            scope: account,
            table: 'accounts',
            limit: 1,
            reverse: false,
            show_payer: false,
          })
          .then((res) => transformResourcesRow(res.rows[0]))

      const beforeRes = await getResources()
      await api!
        .transact(
          {
            actions: [
              {
                name: 'claim',
                account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
                authorization: [auth!],
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
        )
        .then(waitForWaxConfirmation(api!))
      const afterRes = await getResources()
      return {
        delta_balances: {
          nya: afterRes.nya.balance - beforeRes.nya.balance,
          bnt: afterRes.bnt.balance - beforeRes.bnt.balance,
          cht: afterRes.cht.balance - beforeRes.cht.balance,
          smp: afterRes.smp.balance - beforeRes.smp.balance,
        },
      }
    },
    onSuccess: () => {
      toast.success('Rewards claimed!')
      qc.invalidateQueries('wax/mining')
      qc.invalidateQueries('wax/resources')
    },
    onError: (e: any) => {
      console.log('error', e)
      toast.error(e?.message ?? 'Error occurred during transaction')
    },
  })
}

type useMintBanknoteVariables = {
  template_id: string
}

// mint banknote by template_id
export const useMintBanknote = () => {
  const { account, api, auth } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, useMintBanknoteVariables>({
    mutationKey: 'wax/mintBanknote',
    mutationFn: ({ template_id }) =>
      api!
        .transact(
          {
            actions: [
              {
                name: 'buybanknote',
                account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
                authorization: [auth!],
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
        )

        .then(waitForWaxConfirmation(api!)),

    onSuccess: () => {
      toast.success('Banknote minted!')
      qc.invalidateQueries('wax/resources')
      qc.invalidateQueries('wax/getBanknotesBalances')
      qc.invalidateQueries('wax/getAllBanknotes')
    },
    onError: (e: any) => {
      console.log('error', e)
      toast.error(e?.message ?? 'Error occurred during transaction')
    },
  })
}

type UseBurnBanknoteVariables = {
  asset_id: string
}

/// burn selected user banknote
export const useBurnBanknote = () => {
  const { api, account, auth } = useWax()
  const qc = useQueryClient()
  return useMutation<any, any, UseBurnBanknoteVariables>({
    mutationKey: 'wax/burn_banknote',
    mutationFn: ({ asset_id }) =>
      api!
        .transact(
          {
            actions: [
              {
                name: 'burnasset',
                account: 'atomicassets',
                authorization: [auth!],
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
        )

        .then(waitForWaxConfirmation(api!)),

    onSuccess: () => {
      toast.success('Banknote burned!')
      qc.invalidateQueries('wax/resources')
      qc.invalidateQueries('wax/getBanknotesBalances')
      qc.invalidateQueries('wax/getAllBanknotes')
      qc.invalidateQueries('wax/getBanknotesByTemplateId')
    },
    onError: (e: any) => {
      console.log('error', e)
      toast.error(e?.message ?? 'Error occurred during transaction')
    },
  })
}

type UseFuseCardsVariables = {
  primeCards: string[]
  secondaryCards: string[]
}

/// fuse cards
export const useFuseCards = () => {
  const { account, api, auth } = useWax()
  const qc = useQueryClient()

  return useMutation<any, any, UseFuseCardsVariables>({
    mutationKey: 'wax/fuse_cards',
    mutationFn: ({ primeCards, secondaryCards }) =>
      api!
        .transact(
          {
            actions: [
              {
                name: 'transfer',
                account: 'atomicassets',
                authorization: [auth!],
                data: {
                  from: account,
                  to: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
                  asset_ids: [...primeCards, ...secondaryCards],
                  memo: 'Fuse waifu',
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
        )

        .then(waitForWaxConfirmation(api!)),

    onSuccess: () => {
      toast.success('New Waifu NFT created!')
      qc.invalidateQueries('wax/resources')
      qc.invalidateQueries('wax/resources')
      qc.invalidateQueries('wax/fuse_queue')
    },
    onError: (e: any) => {
      toast.error(e?.message ?? 'Error occurred during transaction')
    },
  })
}

type UseCraftCardOptions = {
  template_id: number
}

// mint banknote by template_id
export const useCraftCard = ({ template_id }: UseCraftCardOptions) => {
  const { account, api, auth } = useWax()
  const qc = useQueryClient()
  return useMutation({
    mutationKey: 'wax/craftasset',
    mutationFn: () =>
      api!
        .transact(
          {
            actions: [
              {
                name: 'craftasset',
                account: process.env.NEXT_PUBLIC_WAX_CONTRACT!,
                authorization: [auth!],
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
        )
        .then(waitForWaxConfirmation(api!)),
    onSuccess: () => {
      toast.success('New Waifu NFT crafted!')
      qc.invalidateQueries('wax/resources')
      qc.invalidateQueries('wax/getAllCards')
    },
    onError: (e: any) => {
      console.log('error', e)
      toast.error(e?.message ?? 'Error occurred during transaction')
    },
  })
}

//#endregion

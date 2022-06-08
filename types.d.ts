type ResourceType = {
  name: string
  image: string
  apiName: 'NYA' | 'CHT' | 'SMP' | 'BNT'
}

type AtomicAssetImmutableData = {
  clothes?: string
  emotional?: string
  eyes?: string
  hair?: string
  img?: string
  passionate?: string
  shy?: string
  accessories?: string
  background?: string
  name?: string
  symbol?: string
  amount?: string
}

type AtomicAsset = {
  asset_id: string
  auctions: []
  backed_tokens: []
  burned_at_block: null
  burned_at_time: null
  burned_by_account: null
  collection: AtomicCollection
  contract: string
  data: {
    [key: string]: string
  }
  immutable_data: {
    [key: string]: string
  }
  is_burnable: boolean
  is_transferable: boolean
  minted_at_block: string
  minted_at_time: string
  mutable_data: {}
  name: string
  owner: string
  prices: []
  sales: []
  schema: AtomicSchema
  template: {
    template_id: string
    created_at_block: string
    created_at_time: string
    immutable_data: {
      [key: string]: string
    }
    is_burnable: boolean
    is_transferable: boolean
    issued_supply: string
    max_supply: string
  }
  template_mint: string
  transferred_at_block: string
  transferred_at_time: string
  updated_at_block: string
  updated_at_time: string
}

type AtomicSchema = {
  schema_name: string
  format: any[]
  created_at_block: string
  created_at_time: string
}

type AtomicCollection = {
  name: string
  allow_notify: boolean
  author: string
  authorized_accounts: []
  collection_name: string
  created_at_block: string
  created_at_time: sting
  img: string
  market_fee: number
  notify_accounts: []
}

type AtomicStats = {
  schemas: {
    schema_name: string
    assets: string
  }[]
  templates: {
    template_id: string
    assets: string
  }[]
}

type AtomicTemplate = {
  template_id: string
  collection: AtomicCollection
  contract: string
  created_at_block: string
  created_at_time: string
  immutable_data: any
  is_burnable: boolean
  is_transferable: boolean
  issued_supply: string
  max_supply: string
  name: string
  schema: AtomicSchema
}

type GetAllCardsResponseType = {
  data: AtomicAsset[]
  query_time: number
  success: boolean
}

type GetAllBanknotesResponseType = {
  data: AtomicTemplate[]
  query_time: number
  success: boolean
}

type GetBanknoteBalancesResponseType = {
  data: AtomicStats
  query_time: number
  success: boolean
}

type CharacterSlider = {
  background: string
  characterImg: StaticImageData
  title: string
  description: string
  logo: string
  price: {
    nyan?: string
    simptetix?: string
    crystal?: string
  }
  imageDesktop: StaticImageData
}

type BalanceType = {
  balance: number
  currency: ResourceKey | string
}

type GameConfig = {
  banknote_amount_field: string
  schema_name: string
  collection_name: string
  banknote_collection_name: string
  banknote_schema_name: string
  banknote_symbol_field: string
  is_paused: 0 | 1
  multiplier_to_risk: { key: number; value: number }[]
  reward_precision: number
  time_multiplier: number
}

type CraftRecipe = {
  result_template_id: number
  cost: BalanceType[]
}

type FuseRecipe = {
  result_template_id: number
  source_template_id: number
  cost: BalanceType[]
}

type MineRecordType = {
  finishing_at: number
  staked_asset_id: string
  status_code: number
  reward_multiplier: number
  username: string
}

type FuseQueueRecordType = {
  id: number
  result_template_id: number
  username: string
  primary_asset_ids: string[]
  secondary_asset_ids: string[]
}

type UseGetResourcesResponseType = {
  isUserInitialized: boolean
  smp: BalanceType
  nya: BalanceType
  bnt: BalanceType
  cht: BalanceType
  is_blocked: boolean
}

type ResourceKey = 'smp' | 'nya' | 'bnt' | 'cht'

type MiningRecipeRecordType = {
  asset_template_id: number
  cost: BalanceType[]
  id: number
  mined_resource: BalanceType
  mining_time: number
}

type GetCardByIdResponseType = {
  data: AtomicAsset
  query_time: number
  success: boolean
}

type GetCardsByIdsResponseType = {
  data: AtomicAsset[]
  query_time: number
  success: boolean
}

type GetTemplateByIdResponseType = {
  data: AtomicTemplate
  query_time: number
  success: boolean
}

type GetTemplatesResponseType = {
  data: AtomicTemplate[]
  query_time: number
  success: boolean
}

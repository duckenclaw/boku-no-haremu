type AtomicAsset = {
  asset_id: string
  auctions: []
  backed_tokens: []
  burned_at_block: null
  burned_at_time: null
  burned_by_account: null
  collection: AtomicCollection
  contract: string
  data: any
  immutable_data: {}
  is_burnable: boolean
  is_transferable: boolean
  minted_at_block: string
  minted_at_time: string
  mutable_data: {}
  name: string
  owner: string
  prices: []
  sales: []
  schema: {}
  template: {
    template_id: string
    created_at_block: string
    created_at_time: string
    immutable_data: any
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

type GetAllCardsResponseType = {
  data: AtomicAsset[]
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
  currency: string
}

type MineRecordType = {
  finishing_at: number
  staked_asset_id: string
  status_code: number
  username: string
}

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

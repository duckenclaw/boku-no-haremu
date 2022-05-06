import { CardImage } from 'game/components/card_image'
import { ipfsToUrlSafe } from 'utils'
import { useGetCardByAssetId } from 'game/game_api'
import s from './fusion.module.scss'

type Props = {
  className?: string
  asset_id?: string
}

const FusionModalCard: React.FC<Props> = ({ className, asset_id }) => {
  const { data } = useGetCardByAssetId({
    asset_id,
  })

  return (
    <CardImage
      className={className}
      style={{ objectFit: 'cover' }}
      alt={data?.data.name}
      src={ipfsToUrlSafe(data?.data.data.img)}
      key={data?.data.asset_id}
    />
  )
}

export { FusionModalCard }

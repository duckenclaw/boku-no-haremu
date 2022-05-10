import { useGetCardByAssetId } from 'game/game_api'
import { useMemo } from 'react'
import { ipfsToUrlSafe } from 'utils'
import cn from 'classnames'

import s from './fusion_traits.module.scss'
import { CardImage } from 'game/components/card_image'

type FusionTraitsCardProps = {
  asset_id?: string
  className?: string
}

export const FusionTraitsCard = ({
  className,
  asset_id,
}: FusionTraitsCardProps) => {
  const { data } = useGetCardByAssetId({
    asset_id,
  })
  console.log('🚀 ~ file: fusion_traits_card.tsx ~ line 20 ~ data', data)

  const characterTraits = useMemo(
    () => data?.data?.immutable_data,
    [data?.data?.immutable_data]
  )

  return (
    <div className={cn(className, s.card)}>
      <CardImage
        className={s.image}
        src={ipfsToUrlSafe(characterTraits?.img)}
      />
      <div className={s.info}>
        <div className={s.title}>you will receive</div>
        <div className={cn(s.item, s.type)}>
          <span className={s.trait}>Type:</span>
          <span className={s.traitValue}>aaa</span>
        </div>
      </div>
    </div>
  )
}

import {
  useClaim,
  useGetCardByAssetId,
  useGetMiningRecipe,
  useMine,
  useUnsetMine,
} from 'game/game_api'
import { Button } from 'game/components/button'
import { useEffect, useMemo, useState } from 'react'
import { Duration } from 'luxon'
import { ipfsToUrlSafe } from 'utils'
import { BaseSlot } from 'game/components/base_slot'
import { CardImage } from 'game/components/card_image'

import s from './mine.module.scss'
import { Resource } from 'game/components/resource'

type SlotProps = {
  className?: string
  asset_data?: MineRecordType
  isLoading?: boolean
  onPlaceCard?: () => void
}

const useTime = (interval: number | boolean = 1000) => {
  const s = useState({})
  useEffect(() => {
    if (typeof interval === 'boolean') return
    const t = setInterval(() => {
      s[1]({})
    }, interval)
    return () => clearInterval(t)
  }, [interval])
  return new Date()
}

export const Slot = ({
  className,
  isLoading = false,
  asset_data,
  onPlaceCard,
}: SlotProps) => {
  const asset_id = asset_data?.staked_asset_id
  const status = asset_data?.status_code ?? 0

  const { data: cardData, isLoading: isMetadataLoading } = useGetCardByAssetId({
    asset_id,
  })
  const { data: mineRecipe } = useGetMiningRecipe({
    template_id: cardData?.data.template.template_id,
  })
  const card = cardData?.data

  const { mutateAsync: unsetMine, isLoading: isUnsetLoading } = useUnsetMine()
  const { mutateAsync: mine, isLoading: isMineLoading } = useMine()
  const { mutateAsync: claim, isLoading: isClaimLoading } = useClaim()

  const finishing_at = useMemo(() => {
    if (asset_data) {
      const d = new Date(0)
      d.setUTCSeconds(asset_data.finishing_at)
      return d
    }
    return new Date()
  }, [asset_data])

  const now = useTime(status === 1 ? 1000 : false)
  const showTimer = finishing_at > now
  return (
    <BaseSlot
      className={className}
      onClick={asset_id ? undefined : onPlaceCard}
      isLoading={isLoading || isMetadataLoading}
      isEmpty={!asset_id || !card}
      contentClassName={s.slot}
      overlayChildren={
        <>
          {status == 1 && !showTimer && (
            <Button
              size="small"
              disabled={isClaimLoading || isMineLoading}
              onClick={() => claim({ asset_id: asset_id! })}
            >
              Claim
            </Button>
          )}
          {status == 0 && (
            <Button
              size="small"
              disabled={isUnsetLoading || isMineLoading}
              onClick={() => mine({ asset_id: asset_id! })}
            >
              Mine (
              {mineRecipe
                ? Duration.fromObject({
                    seconds: mineRecipe.mining_time,
                  }).toFormat('hh:mm:ss')
                : '...'}
              )
            </Button>
          )}
          {status == 0 && (
            <Button
              size="small"
              color="blue"
              disabled={isUnsetLoading || isMineLoading}
              onClick={() => unsetMine({ asset_id: asset_id! })}
            >
              Return
            </Button>
          )}
        </>
      }
    >
      {card && (
        <CardImage
          alt={card.asset_id}
          disabled={status === 1 && showTimer}
          src={ipfsToUrlSafe(card.data.img)}
        />
      )}
      {status == 1 && showTimer && (
        <div className={s.timer}>
          {Duration.fromMillis(finishing_at.getTime() - now.getTime()).toFormat(
            'hh:mm:ss'
          )}
        </div>
      )}
      {mineRecipe && (
        <div className={s.lower_content}>
          <div className={s.row}>
            <Resource
              sign="plus"
              size="large"
              color="purple"
              balance={mineRecipe.mined_resource}
            />
          </div>
          {status === 0 && (
            <div className={s.row}>
              {mineRecipe.cost.map((c, index) => (
                <Resource sign="minus" balance={c} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </BaseSlot>
  )
}

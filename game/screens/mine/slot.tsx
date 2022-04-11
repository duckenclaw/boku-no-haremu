import {
  useClaim,
  useGetCardByAssetId,
  useGetMiningRecipe,
  useMine,
  useUnsetMine,
} from 'game/game_api'
import Image from 'next/image'
import { Button } from 'game/components/button'
import { useEffect, useMemo, useState } from 'react'
import { Duration } from 'luxon'
import { ipfsToUrlSafe } from 'utils'
import { BaseSlot } from 'game/components/base_slot'

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
      overlayChildren={
        <>
          {status == 1 && !showTimer && (
            <Button
              disabled={isClaimLoading || isMineLoading}
              onClick={() => claim({ asset_id: asset_id! })}
            >
              Claim
            </Button>
          )}
          {status == 1 && mineRecipe && (
            <div>
              {mineRecipe.cost
                .map((c) => `${c.balance} ${c.currency}`)
                .join('+')}
              =&gt;{mineRecipe.mined_resource.balance}{' '}
              {mineRecipe.mined_resource.currency}
            </div>
          )}
          {status == 0 && (
            <Button
              disabled={isUnsetLoading || isMineLoading}
              onClick={() => mine({ asset_id: asset_id! })}
            >
              Mine (
              {mineRecipe
                ? Duration.fromObject({
                    seconds: mineRecipe.mining_time,
                  }).toHuman()
                : '...'}
              )
            </Button>
          )}
          {status == 0 && (
            <Button
              disabled={isUnsetLoading || isMineLoading}
              onClick={() => unsetMine({ asset_id: asset_id! })}
            >
              Return
            </Button>
          )}
        </>
      }
    >
      <div>
        {card && (
          <Image
            width={234}
            height={352}
            alt={card.asset_id}
            src={ipfsToUrlSafe(card.data.img)}
          />
        )}
      </div>
      {status == 1 && showTimer && (
        <div>
          {Duration.fromMillis(
            finishing_at.getTime() - now.getTime()
          ).toISOTime()}
        </div>
      )}
    </BaseSlot>
  )
}

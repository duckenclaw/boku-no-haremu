import cn from 'classnames'
import {
  useClaim,
  useGetCardByAssetId,
  useGetMiningRecipe,
  useMine,
  useUnsetMine,
} from 'game/game_api'
import Image from 'next/image'
import s from './mine.module.scss'
import placeholder from 'public/images/mimi_1.png'
import { Button } from 'components/shared-ui/button'
import { useEffect, useMemo, useState } from 'react'
import { DateTime, Duration } from 'luxon'

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
    <div
      className={cn(className, s.slot)}
      onClick={asset_id ? undefined : onPlaceCard}
    >
      <div className={s.background} />
      <div className={s.content}>
        {isLoading || isMetadataLoading ? (
          <>Loading...</>
        ) : asset_id && card ? (
          <>
            <div>
              <Image
                width={234}
                height={352}
                alt={card.asset_id}
                src={
                  card.data.img
                    ? `https://ipfs.io/ipfs/${card.data.img}`
                    : placeholder
                }
              />
            </div>
            {status == 1 && showTimer && (
              <div>
                {Duration.fromMillis(
                  finishing_at.getTime() - now.getTime()
                ).toISOTime()}
              </div>
            )}
            {status == 1 && !showTimer && (
              <Button
                disabled={isClaimLoading || isMineLoading}
                onClick={() => claim({ asset_id })}
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
                onClick={() => mine({ asset_id })}
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
                onClick={() => unsetMine({ asset_id })}
              >
                Return
              </Button>
            )}
          </>
        ) : (
          <>
            <span>EMPTY SLOT</span>
            <div>+</div>
          </>
        )}
      </div>
    </div>
  )
}

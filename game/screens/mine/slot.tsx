/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react'
import { Duration } from 'luxon'

import {
  useClaim,
  useGetCardByAssetId,
  useGetMiningRecipe,
  useGetResources,
  useMine,
  useUnsetMine,
} from 'game/game_api'
import { Button } from 'game/components/button'
import { BaseSlot } from 'game/components/base_slot'
import { CardImage } from 'game/components/card_image'
import { Resource } from 'game/components/resource'
import { ipfsToS3Url, ipfsToUrlSafe, isEmptyObj } from 'utils'

import s from './mine.module.scss'

import { MineModal } from './mine_modal'
import { useGame } from 'game/game_context'
import { ResourceAnimation } from './claim_animation'

type SlotProps = {
  className?: string
  asset_data?: MineRecordType
  isLoading?: boolean
  isError: boolean
  onRetry: () => void
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
  isError,
  onRetry,
  asset_data,
  onPlaceCard,
}: SlotProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const asset_id = asset_data?.staked_asset_id
  const status = asset_data?.status_code ?? 0
  const { data: resourcesData } = useGetResources()
  const {
    data: cardData,
    isLoading: isMetadataLoading,
    isError: isErrorMetadata,
  } = useGetCardByAssetId({
    asset_id,
  })
  const { data: mineRecipe } = useGetMiningRecipe({
    template_id: cardData?.data.template.template_id,
  })
  const card = cardData?.data
  const { mutateAsync: unsetMine, isLoading: isUnsetLoading } = useUnsetMine()
  const { mutateAsync: mine, isLoading: isMineLoading } = useMine()
  const { reward_precision } = useGame()
  const {
    mutateAsync: claim,
    isLoading: isClaimLoading,
    isSuccess: isClaimSuccess,
    data: claimData,
  } = useClaim()

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

  const isMineDisabled =
    !(resourcesData && mineRecipe) ||
    !!mineRecipe.cost.find(({ balance, currency }) => {
      resourcesData[currency.toLowerCase() as ResourceKey].balance < balance
    })

  const currentMultiplier =
    asset_data?.reward_multiplier &&
    Number((asset_data?.reward_multiplier / reward_precision).toFixed(1))

  const productionResource = useMemo(() => {
    if (!mineRecipe) return null
    if (currentMultiplier) {
      return {
        ...mineRecipe.mined_resource,
        balance: currentMultiplier * mineRecipe.mined_resource.balance,
      }
    }
    return mineRecipe.mined_resource
  }, [currentMultiplier, mineRecipe])

  return (
    <>
      <MineModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onConfirm={(desiredValue?: number) =>
          mine({ asset_id: asset_id!, desired_reward: desiredValue }).finally(
            () => setModalIsOpen(false)
          )
        }
        cardData={
          isEmptyObj(card?.immutable_data) ? card?.data : card?.immutable_data
        }
        mineRecipe={mineRecipe}
      />
      <BaseSlot
        classes={{ container: className, content: s.slot }}
        onClick={asset_id ? undefined : onPlaceCard}
        isLoading={isLoading || isMetadataLoading}
        isEmpty={!asset_id || !card}
        isError={isError || isErrorMetadata}
        onRetry={onRetry}
        forceOverlay={
          (status == 1 && !showTimer) ||
          isMineLoading ||
          isClaimLoading ||
          isUnsetLoading
        }
        overlayChildren={
          <>
            {status == 1 && !showTimer && (
              <Button
                size="small"
                isLoading={isClaimLoading}
                disabled={isMineLoading}
                onClick={() => claim({ asset_id: asset_id! })}
              >
                Claim
              </Button>
            )}
            {status == 0 && (
              <Button
                size="small"
                isLoading={isMineLoading}
                disabled={isMineDisabled || isUnsetLoading}
                onClick={() => setModalIsOpen(true)}
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
            isActive
            alt={card.asset_id}
            disabled={status === 1 && showTimer}
            src={[ipfsToS3Url(card.data.img), ipfsToUrlSafe(card.data.img)]}
          />
        )}
        {status == 1 && showTimer && (
          <div className={s.timer}>
            {Duration.fromMillis(
              finishing_at.getTime() - now.getTime()
            ).toFormat('hh:mm:ss')}
          </div>
        )}
        {mineRecipe && (
          <div className={s.lower_content}>
            <div className={s.row}>
              <Resource
                sign="plus"
                size="large"
                color="purple"
                balance={productionResource || mineRecipe.mined_resource}
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
        <ResourceAnimation
          resource={mineRecipe?.mined_resource.currency ?? ''}
          showAnimation={isClaimSuccess}
          amount={
            claimData?.delta_balances[
              mineRecipe?.mined_resource.currency.toLowerCase() ?? ''
            ] ?? 0
          }
        />
      </BaseSlot>
    </>
  )
}

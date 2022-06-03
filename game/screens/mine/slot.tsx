/* eslint-disable @next/next/no-img-element */
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Duration } from 'luxon'
import {
  animated,
  useSpring,
  config,
  useChain,
  useTrail,
} from '@react-spring/web'

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
import { currencyToImg, Resource } from 'game/components/resource'
import { Image } from 'components/shared-ui/image'
import { getDistanceBetweenElements, ipfsToS3Url, ipfsToUrlSafe } from 'utils'

import s from './mine.module.scss'

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

  return (
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
          isActive
          alt={card.asset_id}
          disabled={status === 1 && showTimer}
          src={[ipfsToS3Url(card.data.img), ipfsToUrlSafe(card.data.img)]}
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
  )
}

type ResourceAnimation = {
  resource: string
  showAnimation: boolean
  amount: number
}

const ResourceAnimation = ({
  resource,
  showAnimation,
  amount,
}: ResourceAnimation) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [{ v }, bounceApi] = useSpring(() => ({
    from: {
      v: 0,
    },
    config: config.gentle,
  }))
  const [trail, flyApi] = useTrail(
    Math.min(amount, 100),
    () => ({
      from: { x: 0, y: 0, show: false },
    }),
    []
  )
  const [end, endApi] = useSpring(() => ({
    from: {
      t: 0,
    },
    onRest: () => {
      bounceApi.update({ v: 0 })
      flyApi.set({ x: 0, y: 0, show: false })
    },
    config: config.slow,
  }))

  useChain([bounceApi as any, flyApi, endApi], [0, 0.2, 0.9], 3000)

  useLayoutEffect(() => {
    if (showAnimation && containerRef.current) {
      const headerResource = document.getElementById(
        `header-resource-${resource.toLowerCase()}`
      )
      if (!headerResource) return
      const { x, y } = getDistanceBetweenElements(
        containerRef.current,
        headerResource
      )
      // reset values
      endApi.start({ t: 0 })
      bounceApi.set({ v: 0 })
      flyApi.set({ x: 0, y: 0, show: false })
      // start again
      bounceApi.start({ v: 1000 })
      flyApi.start({ x, y, show: true })
      endApi.start({ t: 1000 })

      const cb = () => {
        const { x, y } = getDistanceBetweenElements(
          containerRef.current!,
          headerResource
        )
        flyApi.start({ x, y })
      }
      window.addEventListener('scroll', cb, { passive: true })
      return () => {
        window.removeEventListener('scroll', cb)
      }
    }
  }, [showAnimation, resource])

  return (
    <div ref={containerRef} className={s.resource_animation}>
      <animated.img
        className={s.main_img}
        alt=""
        src={currencyToImg(resource)}
        style={{
          display: v.to((v) => (v <= 0 ? 'none' : 'block')),
          scale: v
            .to([0, 500, 750, 1000], [0, 100, 110, 100], 'extend')
            .to((v) => `${v}%`),
          background: `radial-gradient(circle, rgba(237,28,255,1) 0%, rgba(237,28,255,0) 80%)`,
        }}
      />
      {trail.map((t, i) => (
        <animated.div
          key={i}
          className={s.fly_image}
          style={{
            translateX: t.x,
            translateY: t.y,
            display: t.show.to((v) => (v ? 'block' : 'none')),
            opacity: end.t.to([0, 900, 1000], [1, 0.9, 0]),
          }}
        >
          <Image alt="" src={currencyToImg(resource)} mode="none" />
        </animated.div>
      ))}
    </div>
  )
}

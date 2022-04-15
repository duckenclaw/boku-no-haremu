import { useMemo } from 'react'
import Image from 'next/image'
import cn from 'classnames'

import { ipfsToUrlSafe } from 'utils'
import { Loader } from 'components/shared-ui/loader'
import { useGetAllCards, useGetMiningCards } from 'game/game_api'

import s from './mine.module.scss'
import { LinkButton } from 'game/components/button'

type CardsSelectionProps = {
  onSelect?: (asset_id: string) => void
  blockedCards?: string[]
}

export const CardsSelection = ({
  onSelect,
  blockedCards,
}: CardsSelectionProps) => {
  const { data: miningData, isLoading: isMiningDataLoading } =
    useGetMiningCards()
  const { data, isLoading } = useGetAllCards()
  const cards = useMemo(
    () =>
      data?.pages
        .flatMap((p) => p.data)
        .map((c) => ({
          ...c,
          is_blocked_by_game:
            blockedCards?.includes(c.asset_id) ||
            miningData?.find((d) => d.staked_asset_id === c.asset_id),
        })) ?? [],
    [data, blockedCards, miningData]
  )
  return (
    <>
      <div className={s.cards}>
        <Loader isLoading={isLoading || isMiningDataLoading}>
          {cards.map((c) => (
            <div
              className={cn(s.card, { [s.blocked]: c.is_blocked_by_game })}
              key={c.asset_id}
              onClick={() => !c.is_blocked_by_game && onSelect?.(c.asset_id)}
            >
              <Image
                height={215}
                width={120}
                objectFit="cover"
                alt={c.name}
                src={ipfsToUrlSafe(c.data.img)}
              />
            </div>
          ))}
        </Loader>
      </div>
      <LinkButton
        className={s.buy}
        href={`https://wax.atomichub.io/market?collection_name=${encodeURIComponent(
          process.env.NEXT_PUBLIC_CARDS_NFT_COLLECTION ?? ''
        )}`}
        target="_blank"
      >
        Buy Cards
      </LinkButton>
    </>
  )
}

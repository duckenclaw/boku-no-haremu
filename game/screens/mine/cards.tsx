import { useGetAllCards } from 'game/game_api'
import Image from 'next/image'
import s from './mine.module.scss'

import { useMemo } from 'react'
import { ipfsToUrlSafe } from 'utils'

type CardsSelectionProps = {
  onSelect?: (asset_id: string) => void
  blockedCards?: string[]
}

export const CardsSelection = ({
  onSelect,
  blockedCards = [],
}: CardsSelectionProps) => {
  const { data } = useGetAllCards()
  const cards = useMemo(
    () =>
      data?.pages
        .flatMap((p) => p.data)
        .filter((c) => !blockedCards.includes(c.asset_id)) ?? [],
    [data, blockedCards]
  )
  return (
    <div className={s.cards}>
      {cards.map((c) => (
        <div
          className={s.card}
          key={c.asset_id}
          onClick={() => onSelect?.(c.asset_id)}
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
    </div>
  )
}

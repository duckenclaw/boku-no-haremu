import { useGetAllCards } from 'game/game_api'
import Image from 'next/image'
import s from './mine.module.scss'

import placeholder from 'public/images/mimi_1.png'
import { useMemo } from 'react'

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
            src={
              c.data.img ? `https://ipfs.io/ipfs/${c.data.img}` : placeholder
            }
          />
        </div>
      ))}
    </div>
  )
}

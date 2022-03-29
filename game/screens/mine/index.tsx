import { useState } from 'react'

import { GameModal } from 'game/game_modal'
import { CardsSelection } from './cards'
import { Slot } from './slot'

import s from './mine.module.scss'
import { useGetMiningCards, useInitMine } from 'game/game_api'

const SLOTS_COUNT = 5

export const Mine = () => {
  const [isOpenModal, setIsOpen] = useState(false)
  const { data, isLoading: isCardsLoading } = useGetMiningCards()
  const { mutateAsync, isLoading: isInitMineLoading } = useInitMine()

  const onSelectCard = (id: string) => {
    setIsOpen(false)
    mutateAsync({ asset_id: id })
  }

  console.log(data)

  const isLoading = isCardsLoading || isInitMineLoading

  return (
    <>
      <GameModal isOpen={isOpenModal} onRequestClose={() => setIsOpen(false)}>
        <CardsSelection blockedCards={data ?? []} onSelect={onSelectCard} />
      </GameModal>
      <div className={s.slots}>
        {Array(SLOTS_COUNT)
          .fill(0)
          .map((_, i) => (
            <Slot
              key={i}
              isLoading={isLoading}
              onPlaceCard={() => {
                setIsOpen(true)
              }}
            />
          ))}
      </div>
    </>
  )
}

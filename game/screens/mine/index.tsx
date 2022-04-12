import { useMemo, useState } from 'react'

import { GameModal } from 'game/game_modal'
import { CardsSelection } from './cards'
import { Slot } from './slot'

import s from './mine.module.scss'
import { useGetMiningCards, useInitMine, useMine } from 'game/game_api'
import { Loader } from 'components/shared-ui/loader'

const MAX_SLOTS_COUNT = 5

export const Mine = () => {
  const [isOpenModal, setIsOpen] = useState(false)
  const { data, isLoading: isCardsLoading } = useGetMiningCards()
  const { mutateAsync: initMine, isLoading: isInitMineLoading } = useInitMine()

  const onSelectCard = (id: string) => {
    setIsOpen(false)
    initMine({ asset_id: id })
  }
  const isLoading = isCardsLoading || isInitMineLoading

  const blockedCards = useMemo(
    () => data?.map((s) => s.staked_asset_id) ?? [],
    [data]
  )

  return (
    <>
      <GameModal
        title="CHOOSE CARD FOR STAKE"
        isOpen={isOpenModal}
        onRequestClose={() => setIsOpen(false)}
      >
        <CardsSelection blockedCards={blockedCards} onSelect={onSelectCard} />
      </GameModal>
      <div className={s.slots}>
        <Loader isLoading={isCardsLoading}>
          {data?.map((s) => (
            <Slot
              key={s.staked_asset_id}
              isLoading={isLoading}
              asset_data={s}
            />
          ))}
          {!isLoading && data!.length < MAX_SLOTS_COUNT && (
            <Slot
              onPlaceCard={() => {
                setIsOpen(true)
              }}
            />
          )}
        </Loader>
      </div>
    </>
  )
}

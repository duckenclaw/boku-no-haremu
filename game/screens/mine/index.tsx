import { useState } from 'react'

import { Slot } from './slot'

import s from './mine.module.scss'
import { useGetMiningCards, useInitMine } from 'game/game_api'
import { Loader } from 'components/shared-ui/loader'
import { CardModal } from 'game/components/card_modal'

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

  return (
    <>
      <CardModal
        title={'WHat DO YOU Want to mine?'}
        subtitle={'select the nft you want to use'}
        isOpen={isOpenModal}
        onClose={() => setIsOpen(false)}
        onSelect={onSelectCard}
      />
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

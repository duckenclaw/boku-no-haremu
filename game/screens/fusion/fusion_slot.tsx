import { useState } from 'react'
import Image from 'next/image'
import classnames from 'classnames'

import { BaseSlot } from 'game/components/base_slot'
import { GameModal } from 'game/game_modal'
import { useGetCardByAssetId } from 'game/game_api'
// TODO: refactor to separate modal component
import { CardsSelection } from 'game/screens/mine/cards'

import { ipfsToUrlSafe } from 'utils'

import s from './fusion.module.scss'

type FusionSlotProps = {
  assetId: string | null
  blockedCards: string[]
  onSetCard?: (assetId: string | null) => void
  isPrime?: boolean
}

export const FusionSlot = ({
  assetId,
  onSetCard,
  blockedCards,
  isPrime,
}: FusionSlotProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { data: cardData, isLoading: isCardLoading } = useGetCardByAssetId({
    asset_id: assetId,
  })
  return (
    <>
      <GameModal
        title={'WHAT DO YOU WANT TO FUSE?'}
        isOpen={isOpenModal}
        onRequestClose={() => {
          setIsOpenModal(false)
        }}
      >
        <CardsSelection
          blockedCards={blockedCards}
          onSelect={(assetId) => {
            onSetCard?.(assetId)
            setIsOpenModal(false)
          }}
        />
      </GameModal>
      <BaseSlot
        className={classnames(s.slot, { [s.prime_slot]: isPrime })}
        isEmpty={!assetId}
        onClick={() => {
          setIsOpenModal(true)
        }}
      >
        {cardData && (
          <Image
            width={234}
            height={352}
            objectFit="cover"
            alt={cardData.data.name}
            src={ipfsToUrlSafe(cardData.data.data.img)}
          />
        )}
      </BaseSlot>
    </>
  )
}

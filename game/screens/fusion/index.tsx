import classNames from 'classnames'

import { Button, Toggle } from 'game/components/button'
import { ConfirmModal } from 'game/components/confirm_modal'
import { ScreenContainer } from 'game/components/screen_container'
import { useFuseCards } from 'game/game_api'
import { useEffect, useMemo, useState } from 'react'
import { ScreenTitle } from 'game/components/screen_title'
import { FusionModalCard } from './fusion_modal_card'

import { FusionQueue } from './fusion_queue'
import { FusionSlot } from './fusion_slot'
import { FusionTraits } from './traits'
import s from './fusion.module.scss'

type FusionMode = '3to1' | '5to2'

export type FusionSlotData = {
  asset_id: string
  template_id: string
  is_prime?: boolean
} | null

export const Fusion = () => {
  const [fusionCount, setFusionCount] = useState(0)
  const [mode, setMode] = useState<FusionMode>('3to1')
  const [cards, setCards] = useState<FusionSlotData[]>([null, null, null])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    setCards(Array(mode === '3to1' ? 3 : 5).fill(null))
  }, [mode])

  const { mutateAsync, isLoading: isFuseLoading } = useFuseCards()

  const blockedCards = useMemo(
    () => cards.filter((c) => c).map((c) => c?.asset_id!),
    [cards]
  ) as string[]

  const disableFuse = useMemo(
    () =>
      isFuseLoading ||
      (cards.some((c) => !c) &&
        cards
          .filter((c) => c?.template_id)
          .every((c, _, array) => c?.template_id === array[0]?.template_id)),
    [cards, isFuseLoading]
  )

  const onConfirm = () => {
    return mutateAsync({
      primeCards: (mode === '3to1'
        ? [cards[1]?.asset_id]
        : cards.slice(0, 2).map((c) => c?.asset_id)) as string[],
      secondaryCards: (mode === '3to1'
        ? [cards[0]?.asset_id, cards[2]?.asset_id]
        : cards.slice(2).map((c) => c?.asset_id)) as string[],
    })
      .then(() => {
        setFusionCount((c) => c + 1)
        setCards(Array(mode === '3to1' ? 3 : 5).fill(null))
        setModalIsOpen(false)
      })
      .catch(() => setModalIsOpen(false))
  }

  const checkIsPrime = (index: number) =>
    mode === '3to1' ? index === 1 : index <= 1

  return (
    <>
      <ConfirmModal
        isOpen={modalIsOpen}
        onConfirm={onConfirm}
        onClose={() => setModalIsOpen(false)}
        title={'Are you sure?'}
        dialogChildren={
          <>
            <p>
              “Senpai, are you sure you want to lose these waifus forever? Make
              your choice, we believe in you!”
            </p>
          </>
        }
      >
        <div className={s.modal}>
          <div className={s.modalSubtitle}>you will lose forever</div>
          <div className={s.modalCards}>
            {cards.map((card, index) => (
              <FusionModalCard
                className={s.modalCard}
                key={index}
                asset_id={card?.asset_id}
              />
            ))}
          </div>
        </div>
      </ConfirmModal>
      <ScreenContainer
        header={
          <div className={s.header}>
            <div className={s.side}>
              <FusionQueue
                counter={fusionCount}
                onCounterReset={() => setFusionCount(0)}
              />
            </div>
            <ScreenTitle className={classNames(s.center, s.title)}>
              FUSE
            </ScreenTitle>
            <div className={s.side}></div>
          </div>
        }
      >
        <div className={s.modes}>
          <Toggle
            isLeft={mode === '3to1'}
            onChange={(isLeft) => setMode(isLeft ? '3to1' : '5to2')}
            leftLabel={'3 to 1'}
            rightLabel={'5 to 2'}
          />
        </div>
        <div className={classNames(s.cards, { [s.five]: mode === '5to2' })}>
          {cards.map((c, index) => (
            <FusionSlot
              isPrime={checkIsPrime(index)}
              blockedCards={blockedCards}
              slotData={c}
              key={index}
              onSetCard={(asset_id, template_id) => {
                if (asset_id && template_id) {
                  cards[index] = {
                    asset_id: asset_id!,
                    template_id: template_id!,
                    is_prime: checkIsPrime(index),
                  }
                } else {
                  cards[index] = null
                }
                setCards([...cards])
              }}
            />
          ))}
        </div>

        <div className={s.actions}>
          <Button disabled={disableFuse} onClick={() => setModalIsOpen(true)}>
            Fuse
          </Button>
          <FusionTraits
            disabled={disableFuse}
            slotData={cards}
            className={s.traitsButton}
          />
        </div>
      </ScreenContainer>
    </>
  )
}

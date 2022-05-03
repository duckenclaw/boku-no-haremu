import classNames from 'classnames'

import { Button } from 'game/components/button'
import { ScreenContainer } from 'game/components/screen_container'
import { useFuseCards, useFuseRecipes } from 'game/game_api'
import { useEffect, useMemo, useState } from 'react'

import s from './fusion.module.scss'
import { FusionSlot } from './fusion_slot'

type FusionMode = '3to1' | '5to2'

export const Fusion = () => {
  const [mode, setMode] = useState<FusionMode>('3to1')
  const [cards, setCards] = useState<
    ({ asset_id: string; template_id: string } | null)[]
  >([null, null, null])

  useEffect(() => {
    setCards(Array(mode === '3to1' ? 3 : 5).fill(null))
  }, [mode])

  const blockedCards = useMemo(
    () => cards.filter((c) => c).map((c) => c?.asset_id!),
    [cards]
  ) as string[]

  const disableFuse = cards.some((c) => !c)

  const { mutateAsync } = useFuseCards()
  return (
    <ScreenContainer vertical>
      <div className={s.header}>
        <div className={s.side}>
          <Button disabled size="small">
            Fusion Queue
          </Button>
        </div>
        <h1 className={classNames(s.center, s.title)}>FUSION</h1>
        <div className={s.side}></div>
      </div>
      <div className={s.modes}>
        <Button disabled={mode === '3to1'} onClick={() => setMode('3to1')}>
          3 to 1
        </Button>
        <Button disabled={mode === '5to2'} onClick={() => setMode('5to2')}>
          5 to 2
        </Button>
      </div>
      <div className={s.cards}>
        {cards.map((c, index) => (
          <FusionSlot
            isPrime={mode === '3to1' ? index === 1 : index <= 1}
            blockedCards={blockedCards}
            slotData={c}
            slotsData={cards}
            key={index}
            onSetCard={(asset_id, template_id) => {
              cards[index] = { asset_id: asset_id!, template_id: template_id! }
              setCards([...cards])
            }}
          />
        ))}
      </div>
      <Button
        disabled={disableFuse}
        onClick={() =>
          mutateAsync({
            primeCards: (mode === '3to1'
              ? [cards[1]?.asset_id]
              : cards.slice(0, 2).map((c) => c?.asset_id)) as string[],
            secondaryCards: (mode === '3to1'
              ? [cards[0]?.asset_id, cards[2]?.asset_id]
              : cards.slice(2)) as string[],
          }).then(() => setCards(Array(mode === '3to1' ? 3 : 5).fill(null)))
        }
      >
        Fuse
      </Button>
    </ScreenContainer>
  )
}

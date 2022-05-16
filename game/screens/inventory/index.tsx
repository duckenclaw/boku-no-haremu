import { useState } from 'react'
import cn from 'classnames'

import { BanknoteInventory, CardsInventory } from 'game/components/card_modal'
import { ScreenContainer } from 'game/components/screen_container'

import s from './inventory.module.scss'

export const Inventory = () => {
  const [mode, setMode] = useState<'cards' | 'banknote'>('cards')
  return (
    <ScreenContainer classes={{ content: s.content }}>
      <div className={s.sizer}>
        <div className={s.header}>
          <div
            className={cn(s.button, { [s.active]: mode === 'cards' })}
            onClick={() => setMode('cards')}
          >
            Cards
          </div>
          <div
            className={cn(s.button, { [s.active]: mode === 'banknote' })}
            onClick={() => setMode('banknote')}
          >
            Banknotes
          </div>
        </div>
        <div className={s.container}>
          {mode === 'cards' && <CardsInventory />}
          {mode === 'banknote' && <BanknoteInventory />}
        </div>
      </div>
    </ScreenContainer>
  )
}

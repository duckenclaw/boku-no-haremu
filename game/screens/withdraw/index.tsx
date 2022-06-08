import { Toggle } from 'game/components/button'
import { ScreenContainer } from 'game/components/screen_container'
import { ScreenTitle } from 'game/components/screen_title'
import { useState } from 'react'
import s from './withdraw.module.scss'
import { WithdrawCash } from './withdraw_cash'
import { WithdrawCreate } from './withdraw_create'

type WithdrawMode = 'create' | 'cashOut'

export const Withdraw = () => {
  const [mode, setMode] = useState<WithdrawMode>('create')

  return (
    <ScreenContainer
      header={<ScreenTitle className={s.title}>atm</ScreenTitle>}
      classes={{
        content: s.screenContent,
      }}
    >
      <Toggle
        className={s.toggle}
        isLeft={mode === 'create'}
        onChange={() =>
          mode === 'create' ? setMode('cashOut') : setMode('create')
        }
        leftLabel="Cash Out"
        rightLabel="Claim"
      />
      {mode === 'create' ? <WithdrawCreate /> : <WithdrawCash />}
    </ScreenContainer>
  )
}

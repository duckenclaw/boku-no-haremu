import { Loader } from 'components/shared-ui/loader'
import { Button, Toggle } from 'game/components/button'
import { ScreenContainer } from 'game/components/screen_container'
import { ScreenTitle } from 'game/components/screen_title'
import {
  useGetAllBanknotesTemplates,
  useGetBanknotesBalances,
} from 'game/game_api'
import { useMemo, useState } from 'react'
import s from './withdraw.module.scss'
import { WithdrawCash } from './withdraw_cash'
import { WithdrawCreate } from './withdraw_create'

type WithdrawMode = 'create' | 'cashOut'

export const RESOURCES: {
  name: string
  image: string
  currency: 'NYA' | 'CHT' | 'SMP' | 'BNT'
}[] = [
  {
    name: 'Nyan',
    image: '/images/currencies/nyan.png',
    currency: 'NYA',
  },
  {
    name: 'Chantment',
    image: '/images/currencies/crystal.png',
    currency: 'CHT',
  },
  {
    name: 'Symptrtix',
    image: '/images/currencies/simptetix.png',
    currency: 'SMP',
  },
  {
    name: 'Bento',
    image: '/images/currencies/bento.png',
    currency: 'BNT',
  },
]

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
        leftLabel="create"
        rightLabel="cash out"
      />
      {mode === 'create' ? <WithdrawCreate /> : <WithdrawCash />}
    </ScreenContainer>
  )
}

import cn from 'classnames'
import { Button } from 'game/components/button'
import { useGetAllBanknotesTemplates } from 'game/game_api'
import { useState } from 'react'
import s from './withdraw_create.module.scss'
import { WithdrawSlotBanknote } from './withdraw_slot_banknote'
import { WithdrawSlotResource } from './withdraw_slot_resource'

type Props = {
  className?: string
}

export type CurrentResourceType = {
  name: string
  image: string
  currency: string
} | null

const WithdrawCreate: React.FC<Props> = ({ className }) => {
  const [currentResource, setCurrentResource] =
    useState<null | CurrentResourceType>(null)

  return (
    <>
      <WithdrawSlotResource
        selectResource={setCurrentResource}
        currentResource={currentResource}
      />
      {currentResource && <WithdrawSlotBanknote />}
      <Button
        className={s.button}
        disabled={true}
        onClick={() => console.log('create')}
      >
        create
      </Button>
    </>
  )
}

export { WithdrawCreate }

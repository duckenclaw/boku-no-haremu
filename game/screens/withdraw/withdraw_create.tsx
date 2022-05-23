import cn from 'classnames'
import { useState } from 'react'
import { Button } from 'game/components/button'
import { Image } from 'components/shared-ui/image'
import s from './withdraw.module.scss'
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
      <div className={s.slots}>
        <WithdrawSlotResource
          selectResource={setCurrentResource}
          currentResource={currentResource}
          mode="create"
        />
        {currentResource && (
          <>
            <Image
              className={s.arrow}
              src="/images/svg/arrow2.svg"
              mode="none"
              alt="arrow"
            />
            <WithdrawSlotBanknote currentResource={currentResource} />
          </>
        )}
      </div>
      <Button
        className={s.button}
        disabled={true}
        onClick={() => console.log('create')}
      >
        Create
      </Button>
    </>
  )
}

export { WithdrawCreate }

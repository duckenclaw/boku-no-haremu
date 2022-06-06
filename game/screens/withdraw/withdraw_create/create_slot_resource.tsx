import { Image } from 'components/shared-ui/image'
import { CardImage } from 'game/components/card_image'
import { GameModal } from 'game/components/game_modal'
import { useGetResources } from 'game/game_api'
import { useState } from 'react'
import cn from 'classnames'
import { WithdrawSlot } from '../withdraw_slot'
import { CurrentResourceType } from '.'
import { RESOURCES } from '..'

import s from './withdraw_create.module.scss'

type CreateSlotResourceProps = {
  className?: string
  selectResource: (resource: CurrentResourceType) => void
  currentResource: CurrentResourceType
  mode: 'create' | 'withdraw'
}

const CreateSlotResource: React.FC<CreateSlotResourceProps> = ({
  className,
  selectResource,
  currentResource,
  mode,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <GameModal
        className={s.resourceModal}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title="Here's a list of available resources"
        showClose
      >
        <div className={s.resources}>
          {RESOURCES.map((item) => (
            <div
              className={s.resource}
              key={item.name}
              onClick={() => {
                setIsModalOpen(false)
                selectResource(item)
              }}
            >
              <Image
                className={s.resourceImage}
                alt={item.name}
                src={item.image}
              />
              <div className={s.resourceName}>{item.name}</div>
            </div>
          ))}
        </div>
      </GameModal>
      <WithdrawSlot
        className={s.slot}
        isEmpty={currentResource === null}
        onRetry={() => null}
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        {currentResource && (
          <CardImage
            className={cn(s.slotImage, s.slotImageResource)}
            alt={currentResource.name}
            src={currentResource.image}
          />
        )}
      </WithdrawSlot>
    </>
  )
}

export { CreateSlotResource }

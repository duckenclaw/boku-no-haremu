import cn from 'classnames'
import { BaseSlot } from 'game/components/base_slot'
import { GameModal } from 'game/components/game_modal'
import { useGetResources } from 'game/game_api'
import { useState } from 'react'
import { Image } from 'components/shared-ui/image'
import s from './withdraw.module.scss'
import { CardImage } from 'game/components/card_image'
import { CurrentResourceType } from './withdraw_create'
import { RESOURCES } from '.'
import { Button } from 'game/components/button'

type withdrawSlotProps = {
  className?: string
  selectResource: (resource: CurrentResourceType) => void
  currentResource: CurrentResourceType
  mode: 'create' | 'withdraw'
}

const WithdrawSlotResource: React.FC<withdrawSlotProps> = ({
  className,
  selectResource,
  currentResource,
  mode,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data: resourcesData,
    isLoading: isResourcesLoading,
    isError: isResourcesError,
  } = useGetResources()

  return (
    <>
      <GameModal
        className={s.resourceModal}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title="Here's a list of available resources."
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
      <div className={s.slotContainer}>
        <BaseSlot
          classes={{
            container: s.slot,
            content: s.slotContent,
            emptyTitle: s.slotEmptyTitle,
          }}
          className={s.slot}
          isEmpty={currentResource === null}
          isLoading={isResourcesLoading}
          isError={isResourcesError}
          onRetry={() => null}
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          {currentResource && (
            <CardImage
              className={s.slotImage}
              alt={currentResource.name}
              src={currentResource.image}
            />
          )}
        </BaseSlot>
      </div>
    </>
  )
}

export { WithdrawSlotResource }

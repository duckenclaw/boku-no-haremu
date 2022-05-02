import { BaseSlot } from 'game/components/base_slot'
import { useCraftCard, useGetTemplateById } from 'game/game_api'

import { ipfsToUrlSafe } from 'utils'

import { Button } from 'game/components/button'
import { Resource } from 'game/components/resource'
import { CardImage } from 'game/components/card_image'

import s from './craft.module.scss'

type CraftSlotProps = {
  template_id: number
  cost: BalanceType[]
}

export const CraftSlot = ({ template_id, cost }: CraftSlotProps) => {
  const {
    data: templateData,
    isLoading: isTemplateLoading,
    isError: templateIsError,
    refetch: refetchTemplate,
  } = useGetTemplateById({ template_id })
  const { mutateAsync: craft, isLoading: isCraftLoading } = useCraftCard({
    template_id,
  })

  const isLoading = isTemplateLoading || isCraftLoading
  return (
    <BaseSlot
      isLoading={isLoading}
      isError={templateIsError}
      onRetry={refetchTemplate}
      overlayChildren={
        <Button size="small" onClick={() => craft()}>
          Craft
        </Button>
      }
      contentClassName={s.craft_content}
    >
      <CardImage
        isActive
        alt={template_id.toString()}
        src={ipfsToUrlSafe(templateData?.data.immutable_data.img)}
      />
      <div className={s.cost}>
        {cost.map((c, i) => (
          <Resource key={i} balance={c} />
        ))}
      </div>
    </BaseSlot>
  )
}

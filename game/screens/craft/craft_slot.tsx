import { Image } from 'components/shared-ui/image'
import { BaseSlot } from 'game/components/base_slot'
import { useCraftCard, useGetTemplateById } from 'game/game_api'

import { ipfsToUrlSafe } from 'utils'

import s from './craft.module.scss'
import { Button } from 'game/components/button'

type CraftSlotProps = {
  template_id: number
  cost: BalanceType[]
}

export const CraftSlot = ({ template_id, cost }: CraftSlotProps) => {
  const { data: templateData, isLoading: isTemplateLoading } =
    useGetTemplateById({ template_id })
  const { mutateAsync: craft, isLoading: isCraftLoading } = useCraftCard({
    template_id,
  })

  const isLoading = isTemplateLoading || isCraftLoading
  return (
    <BaseSlot
      isLoading={isLoading}
      className={s.slot}
      overlayChildren={
        <Button size="small" onClick={() => craft()}>
          Craft
        </Button>
      }
    >
      <Image
        width={234}
        height={352}
        alt={template_id.toString()}
        src={ipfsToUrlSafe(templateData?.data.immutable_data.img)}
      />
      <div>
        {cost.map((c, i) => (
          <div key={i}>
            {c.balance} {c.currency}
          </div>
        ))}
      </div>
    </BaseSlot>
  )
}

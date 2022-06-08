import { BaseSlot } from 'game/components/base_slot'
import {
  useCraftCard,
  useGetMiningRecipe,
  useGetResources,
  useGetTemplateById,
} from 'game/game_api'

import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'

import { Resource } from 'game/components/resource'
import { CardImage } from 'game/components/card_image'

import s from './craft.module.scss'
import { ConfirmModal } from 'game/components/confirm_modal'
import { useMemo, useState } from 'react'
import classNames from 'classnames'

type CraftSlotProps = {
  template_id: number
  cost: BalanceType[]
}

const dialogStrings = [
  `<p>“You want to craft her, Senpai?</p> \n
  <p>
    I just adore all of them! They are as faithful as they are
    amorous, the best companions you can find!”
  </p>`,
]

export const CraftSlot = ({ template_id, cost }: CraftSlotProps) => {
  const {
    data: templateData,
    isLoading: isTemplateLoading,
    isError: templateIsError,
    refetch: refetchTemplate,
  } = useGetTemplateById({ template_id })
  const { data: recipeData, isLoading: isRecipeDataLoading } =
    useGetMiningRecipe({
      template_id: template_id.toString(),
    })
  const [isOpen, setIsOpen] = useState(false)
  const { mutateAsync: craft, isLoading: isCraftLoading } = useCraftCard({
    template_id,
  })
  const isLoading = isTemplateLoading || isCraftLoading
  const [isHovering, setIsHovering] = useState(false)
  const { data: resourcesData } = useGetResources()
  const isCraftDisabled =
    !resourcesData ||
    !!cost.find(({ balance, currency }) => {
      resourcesData[currency.toLowerCase() as ResourceKey].balance < balance
    })

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={() => craft().then(() => setIsOpen(false))}
        onClose={() => setIsOpen(false)}
        title={'YOUR CHOICE'}
        dialogStrings={dialogStrings}
      >
        <div className={s.choice_container}>
          <CardImage
            className={s.image}
            src={[
              ipfsToS3Url(templateData?.data.immutable_data.img),
              ipfsToUrlSafe(templateData?.data.immutable_data.img),
            ]}
          />
          <div className={s.info}>
            <div className={s.info_title}>
              {templateData?.data.immutable_data?.name ?? 'CARD'}
            </div>
            <div className={s.row}>
              <div className={s.row_title}>PRODUCTION</div>
              <div className={s.row_content}>
                {recipeData && (
                  <Resource
                    size={'large'}
                    balance={recipeData?.mined_resource}
                  />
                )}
              </div>
            </div>
            <div className={s.row}>
              <div className={s.row_title}>COST</div>
              <div className={s.row_content}>
                {recipeData?.cost.map((r, i) => (
                  <Resource balance={r} key={i} size={'large'} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ConfirmModal>
      <BaseSlot
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        isLoading={isLoading}
        isError={templateIsError}
        onRetry={refetchTemplate}
        overlayChildren={
          <div
            className={classNames(s.overlay, { [s.disabled]: isCraftDisabled })}
            onClick={() => setIsOpen(true)}
          >
            <span className={s.overlay_text}>CRAFT</span>
          </div>
        }
        classes={{ content: s.craft_content }}
      >
        <CardImage
          alt={template_id.toString()}
          className={classNames({ [s.blur]: isHovering })}
          src={[
            ipfsToS3Url(templateData?.data.immutable_data.img),
            ipfsToUrlSafe(templateData?.data.immutable_data.img),
          ]}
        />
        <div className={s.cost}>
          {cost.map((c, i) => (
            <Resource key={i} balance={c} vertical />
          ))}
        </div>
      </BaseSlot>
    </>
  )
}

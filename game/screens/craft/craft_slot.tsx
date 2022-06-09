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

const dialogStrings = (type: string) => {
  switch (type) {
    case 'Mimi-chan':
      return [
        `<p>“You want to craft <span>MIMI-CHAN</span>, Senpai?</p> \n
      <p>I just adore them! They are as faithful as they are amorous, the best companions you can find!</p> \n
      <p>They produce <span>2 Bentos</span> and consume <span>2 Nyans</span>, they really are needy, aren’t they?"</p>`,
      ]
    case 'Hitomi':
      return [
        `<p>“You want to craft <span>HITOMI</span>, Senpai?</p> \n
      <p>Yeah, they sure feel like home, caring for you and making sure you never go hungry with their Bentos</p> \n
      <p>They produce <span>10 Bentos</span> and consume <span>5 Nyans</span>. They sure need your affection, don’t they?"</p>`,
      ]
    case 'H1-Bride':
      return [
        `<p>“You want to craft <span>H1-BRIDE</span>, Senpai?</p> \n
      <p>You can say they are deadly smart, incredibly so. In return for your affection you will get the most innovative technologies created by them, sounds like a good deal right?</p> \n
      <p>They produce <span>3 Simpthetix</span> and consume <span>3 Bentos</span> and <span>4 Nyans</span>. A small price for even a fraction of their innovations.”</p>
      `,
      ]
    case 'Chantress':
      return [
        `<p>You want to craft <span>Chantress</span>, Senpai?</p> \n
      <p>Their magic sure is something, don’t you think? You are very lucky to have an opportunity to access their powers</p> \n
      <p>They produce <span>5 Chantments</span> and consume <span>2 Bentos</span> and <span>4 Nyans</span>. Magic for food and love?? Count me in Senpai.”</p>
      `,
      ]
    default:
      return [`<p>I will help and guide you through your harem.</p>`]
  }
}

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

  console.log(templateData)

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={() => craft().then(() => setIsOpen(false))}
        onClose={() => setIsOpen(false)}
        title={'YOUR CHOICE'}
        dialogStrings={dialogStrings(templateData?.data.immutable_data.type)}
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

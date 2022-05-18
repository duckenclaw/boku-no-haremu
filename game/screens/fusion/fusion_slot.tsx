import { useMemo, useState } from 'react'
import classnames from 'classnames'

import { BaseSlot } from 'game/components/base_slot'
import { useFuseRecipes, useGetCardByAssetId } from 'game/game_api'
import { CardModal } from 'game/components/card_modal'
import { CardImage } from 'game/components/card_image'
import { Button } from 'game/components/button'

import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'

import { FusionSlotData } from '.'

import s from './fusion.module.scss'

type FusionSlotProps = {
  slotData: FusionSlotData
  blockedCards: string[]
  onSetCard?: (assetId: string | null, templateId: string | null) => void
  isPrime?: boolean
}

export const FusionSlot = ({
  slotData,
  onSetCard,
  blockedCards,
  isPrime,
}: FusionSlotProps) => {
  const asset_id = slotData?.asset_id ?? null
  const template_id = slotData?.template_id ?? null
  const [isOpenModal, setIsOpenModal] = useState(false)
  const {
    data: cardData,
    isLoading: isCardLoading,
    isError: isErrorCard,
    refetch: refetchCard,
  } = useGetCardByAssetId({
    asset_id,
  })

  const { data: fuseRecipesData, isLoading: isFuseRecipesData } =
    useFuseRecipes()

  const allowedTemplateIds = useMemo(() => {
    // if none cards are chosen enforce only available template ids from recipes
    if (fuseRecipesData) {
      return fuseRecipesData
        .filter((f) => f.source_template_id)
        .map((f) => String(f.source_template_id))
    }
    // if no fuseRecipes available then no templates are allowed
    return []
  }, [fuseRecipesData, template_id])

  return (
    <>
      <CardModal
        title="WHAT DO YOU WANT TO FUSE?"
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false)
        }}
        allowedTemplateIds={allowedTemplateIds}
        blockedCards={blockedCards}
        onSelect={(assetId, card) => {
          onSetCard?.(assetId, card.template.template_id)
          setIsOpenModal(false)
        }}
      />
      <BaseSlot
        className={classnames(s.slot, { [s.prime_slot]: isPrime })}
        isEmpty={!asset_id}
        isLoading={isCardLoading || isFuseRecipesData}
        isError={isErrorCard}
        onRetry={refetchCard}
        onClick={() => {
          setIsOpenModal(true)
        }}
        contentClassName={s.content}
        overlayChildren={
          <div className={s.buttons}>
            <Button
              color="blue"
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpenModal(true)
              }}
            >
              Change Card
            </Button>
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onSetCard?.(null, null)
              }}
            >
              Remove
            </Button>
          </div>
        }
      >
        {cardData && (
          <CardImage
            src={[
              ipfsToS3Url(cardData.data.data.img),
              ipfsToUrlSafe(cardData.data.data.img),
            ]}
          />
        )}
      </BaseSlot>
    </>
  )
}

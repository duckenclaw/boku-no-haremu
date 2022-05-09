import { Button } from 'game/components/button'
import { GameModal } from 'game/components/game_modal'
import { useGetCardByAssetId, useGetTemplateById } from 'game/game_api'
import { useMemo, useState } from 'react'
import { FusionSlotData } from '..'

import s from './fusion_traits.module.scss'

type FusionTraitsProps = {
  className?: string
  disabled?: boolean
  slotData: FusionSlotData[]
}

export const FusionTraits = ({
  className,
  disabled,
  slotData,
}: FusionTraitsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const template_id = useMemo(() => {
    const isCardsEqual = slotData.every((val, i, arr) =>
      val?.template_id ? val.template_id === arr[0]!.template_id : false
    )
    if (isCardsEqual) {
      return Number(slotData[0]!.template_id)
    }
    return undefined
  }, [slotData])

  const { data } = useGetTemplateById({
    template_id,
  })
  console.log('🚀 ~ file: fusion_traits.tsx ~ line 29 ~ data', data)

  return (
    <>
      <Button
        className={className}
        disabled={disabled}
        size="small"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        SHOW TRAITS
      </Button>
      <GameModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        title={'Your choice'}
      >
        <div className={s.modal}>content</div>
      </GameModal>
    </>
  )
}

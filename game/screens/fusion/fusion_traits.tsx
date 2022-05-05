import { Button } from 'game/components/button'
import { GameModal } from 'game/components/game_modal'
import { useState } from 'react'
import { FusionSlotData } from '.'

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
  return (
    <>
      <Button
        className={className}
        disabled={disabled}
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
      ></GameModal>
    </>
  )
}

import { useMemo, useState } from 'react'
import cn from 'classnames'
import { Button } from 'game/components/button'
import { GameModal } from 'game/components/game_modal'
import SlideIcon from 'public/game/svg/modal_slide.svg'
import s from './fusion_traits.module.scss'
import { FusionTraitsCard } from './fusion_traits_card'
import { FusionSlotData } from '..'

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
  const [activeCard, setActiveCard] = useState(0)
  const primeCards = useMemo(() => {
    const isTemplatesEqual = slotData.every((val, i, arr) =>
      val?.template_id ? val.template_id === arr[0]!.template_id : false
    )
    if (isTemplatesEqual) {
      return slotData.filter((item) => item?.is_prime)
    }
    return []
  }, [slotData])

  const nextSlide = () =>
    activeCard < primeCards.length - 1 && setActiveCard(activeCard + 1)

  const prevSlide = () => activeCard > 0 && setActiveCard(activeCard - 1)

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
        <div className={s.content}>
          <SlideIcon
            className={cn(s.side, {
              [s.disabled]: activeCard >= primeCards?.length,
            })}
            onClick={prevSlide}
          />
          {primeCards
            ?.filter((_, index) => index === activeCard)
            .map((card) => (
              <FusionTraitsCard
                asset_id={card?.asset_id}
                key={card?.asset_id}
              />
            ))}
          <SlideIcon className={cn(s.side, s.rotate)} onClick={nextSlide} />
        </div>
      </GameModal>
    </>
  )
}

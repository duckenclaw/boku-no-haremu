import cn from 'classnames'
import { Image } from 'components/shared-ui/image'
import { BaseSlot } from 'game/components/base_slot'
import s from './withdraw.module.scss'

// Slots

type WithdrawSlotsProps = {
  className?: string
  firstSlot?: React.ReactNode
  secondSlot?: React.ReactNode
}

const WithdrawSlots: React.FC<WithdrawSlotsProps> = ({
  className,
  firstSlot,
  secondSlot,
}) => (
  <div className={cn(s.slots, className)}>
    {firstSlot}
    {secondSlot && (
      <Image
        className={s.arrow}
        src="/images/svg/arrow2.svg"
        mode="none"
        alt="arrow"
      />
    )}
    {secondSlot}
  </div>
)

// Slot

type WithdrawSlotProps = {
  className?: string
  children?: React.ReactNode
} & React.ComponentProps<typeof BaseSlot>

const WithdrawSlot: React.FC<WithdrawSlotProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <BaseSlot
      classes={{
        container: cn(s.slot, className),
        content: s.slotContent,
        emptyTitle: s.slotEmptyTitle,
      }}
      {...props}
    >
      {children}
    </BaseSlot>
  )
}

export { WithdrawSlots, WithdrawSlot }

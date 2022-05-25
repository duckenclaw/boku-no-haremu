import cn from 'classnames'
import { BaseSlot } from 'game/components/base_slot'
import s from './withdraw.module.scss'

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

export { WithdrawSlot }

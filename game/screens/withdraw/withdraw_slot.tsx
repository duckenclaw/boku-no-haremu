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
  isEmpty = false,
  ...props
}) => {
  return (
    <BaseSlot
      classes={{
        container: cn(s.slot, className),
        content: cn(!isEmpty && s.slotContent),
        emptyTitle: s.slotEmptyTitle,
      }}
      isEmpty={isEmpty}
      {...props}
    >
      {children}
    </BaseSlot>
  )
}

export { WithdrawSlot }

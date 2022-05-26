import cn from 'classnames'
import s from './withdraw.module.scss'
import { Image } from 'components/shared-ui/image'

type WithdrawExchangeRowProps = {
  className?: string
  mode?: 'modal' | 'slots'
  exchangeSlot?: React.ReactNode
  receiveSlot?: React.ReactNode
}

const WithdrawExchangeRow: React.FC<WithdrawExchangeRowProps> = ({
  className,
  exchangeSlot,
  receiveSlot,
  mode = 'slots',
}) => {
  return (
    <div
      className={cn(s.exchangeRow, className, {
        [s.slotsRow]: mode === 'slots',
        [s.modalRow]: mode === 'modal',
      })}
    >
      {exchangeSlot}
      {receiveSlot && (
        <Image
          className={cn(s.arrow, {
            [s.arrowSlots]: mode === 'slots',
            [s.arrowModal]: mode === 'modal',
          })}
          src="/images/svg/arrow2.svg"
          mode="none"
          alt="arrow"
        />
      )}
      {receiveSlot}
    </div>
  )
}

export { WithdrawExchangeRow }

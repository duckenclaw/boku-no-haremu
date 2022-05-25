import cn from 'classnames'
import s from './withdraw.module.scss'
import { Image } from 'components/shared-ui/image'

type WithdrawExchangeRowProps = {
  classes?: { container?: string; arrow?: string }
  exchangeSlot?: React.ReactNode
  receiveSlot?: React.ReactNode
}

const WithdrawExchangeRow: React.FC<WithdrawExchangeRowProps> = ({
  classes,
  exchangeSlot,
  receiveSlot,
}) => {
  return (
    <div className={cn(s.exchangeRow, classes?.container)}>
      {exchangeSlot}
      {receiveSlot && (
        <Image
          className={cn(s.arrow, classes?.arrow)}
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

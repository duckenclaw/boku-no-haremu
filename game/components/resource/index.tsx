import cn from 'classnames'
import s from './resource.module.scss'

type ResourceProps = {
  balance: BalanceType
} & React.ComponentProps<'div'>

export const Resource = ({ balance, className, ...props }: ResourceProps) => {
  return (
    <span {...props} className={cn(className, s.balance)}>
      {balance.balance}
    </span>
  )
}

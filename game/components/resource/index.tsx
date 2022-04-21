import cn from 'classnames'
import Image from 'next/image'
import s from './resource.module.scss'

type ResourceProps = {
  balance: BalanceType
} & React.ComponentProps<'div'>



export const Resource = ({ balance, className, ...props }: ResourceProps) => {
  return (
    <span {...props} className={cn(className, s.balance)}>
      <Image src="">  
      {balance.balance}
    </span>
  )
}

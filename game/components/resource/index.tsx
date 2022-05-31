import cn from 'classnames'
import { Image } from 'components/shared-ui/image'
import s from './resource.module.scss'

import Plus from 'public/game/svg/resource_plus.svg'
import Minus from 'public/game/svg/resource_minus.svg'

type ResourceProps = {
  balance: BalanceType
  sign?: 'none' | 'plus' | 'minus'
  vertical?: boolean
  size?: 'default' | 'large' | 'small'
  color?: 'default' | 'purple'
} & React.ComponentProps<'span'>

export const currencyToImg = (c: string) => {
  switch (c.toLowerCase()) {
    default:
    case 'nya':
      return '/images/currencies/game_nyan.png'
    case 'cht':
      return '/images/currencies/game_chantment.png'
    case 'smp':
      return '/images/currencies/game_simpthetix.png'
    case 'bnt':
      return '/images/currencies/game_bento.png'
  }
}

export const Resource = ({
  balance,
  className,
  vertical,
  sign = 'none',
  size = 'default',
  color = 'default',
  ...props
}: ResourceProps) => {
  return (
    <span
      {...props}
      className={cn(
        className,
        s.balance,
        s['size__' + size],
        s['color__' + color],
        vertical && s.vertical
      )}
    >
      <div className={cn(s.image_container)}>
        <Image
          className={s.image}
          alt={balance.currency}
          src={currencyToImg(balance.currency)}
        />
        {sign == 'plus' && <Plus className={s.sign} />}
        {sign == 'minus' && <Minus className={s.sign} />}
      </div>

      {balance.balance.toFixed(0)}
    </span>
  )
}

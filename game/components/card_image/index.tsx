/* eslint-disable jsx-a11y/alt-text */
import cn from 'classnames'

import { Image } from 'components/shared-ui/image'
import s from './card_image.module.scss'

type CardImageProps = {
  disabled?: boolean
  isActive?: boolean
} & React.ComponentProps<typeof Image>

export const CardImage = ({
  className,
  isActive = false,
  disabled = false,
  ...props
}: CardImageProps) => (
  <Image
    {...props}
    className={cn(s.image, className, {
      [s.disabled]: disabled,
      [s.active]: isActive,
    })}
  />
)

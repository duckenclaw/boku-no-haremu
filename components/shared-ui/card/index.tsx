/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import s from './card.module.scss'

type CardProps = {
  className?: string
  frameColor?: string
  ratingBackgroundColor?: string
  iconBackgroundColor?: string
  rating: number
  icon: string
  image: string
}

export const Card: React.FC<CardProps> = ({
  className,
  rating,
  frameColor,
  image,
  icon,
  ratingBackgroundColor,
  iconBackgroundColor,
}) => {
  return (
    <div className={classNames(className, s.container)}>
      <div className={s.frame} style={{ borderColor: frameColor }}>
        <div className={s.rating} style={{ background: ratingBackgroundColor }}>
          {rating}
        </div>
        <div
          className={s.iconContainer}
          style={{ background: iconBackgroundColor }}
        >
          <img className={s.icon} src={`images/${icon}.png`} alt="" />
        </div>
        <img className={s.image} src={`images/${image}.png`} alt="" />
      </div>
    </div>
  )
}

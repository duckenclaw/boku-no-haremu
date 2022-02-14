/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import s from './card.module.scss'

type CardProps = {
  className?: string
  frameColor?: string
  ratingBackgroundColor?: string
  iconBackgroundColor?: string
  rating?: string
  icon?: string
  image?: string
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
          {rating || '?'}
        </div>
        <div
          className={s.iconContainer}
          style={{ background: iconBackgroundColor }}
        >
          {icon ? (
            <img className={s.icon} src={`images/${icon}.png`} alt="" />
          ) : (
            <div className={s.iconEmpty}>?</div>
          )}
        </div>
        {image ? (
          <img className={s.image} src={`images/${image}.png`} alt="" />
        ) : (
          <div className={s.empty}>?</div>
        )}
      </div>
    </div>
  )
}

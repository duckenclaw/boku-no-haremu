/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import s from './text-header.module.scss'

type TextHeaderProps = {
  className?: string
  title?: string
  subtitle?: string
  id?: string
}

export const TextHeader: React.FC<TextHeaderProps> = ({
  className,
  title,
  subtitle,
  id
}) => (
  <div id={id} className={classNames(className, s.container)}>
    {title && <div className={s.title}>{title}</div>}
    {subtitle && <div className={s.subtitle}>{subtitle}</div>}
  </div>
)

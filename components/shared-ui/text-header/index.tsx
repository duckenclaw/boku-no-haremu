/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import s from './text-header.module.scss'

type TextHeaderProps = {
  className?: string
  title?: string
  subtitle?: string
}

export const TextHeader: React.FC<TextHeaderProps> = ({ className, title }) => (
  <h2 className={classNames(className, s.container)}>{title}</h2>
)

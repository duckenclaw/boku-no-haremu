import classNames from 'classnames'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

import s from './screen_container.module.scss'

type ScreenContainerProps = {
  vertical?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const ScreenContainer = ({
  className,
  children,
  vertical = false,
  ...props
}: ScreenContainerProps) => (
  <div
    {...props}
    className={classNames(s.container, className, {
      [s.vertical]: vertical,
    })}
  >
    {children}
  </div>
)

import cn from 'classnames'
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

import s from './screen_container.module.scss'

type ScreenContainerProps = {
  mode?: 'slots'
  header?: ReactNode
  classes?: {
    container?: string
    content?: string
  }
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const ScreenContainer = ({
  className,
  header,
  children,
  classes,
  mode,
  ...props
}: ScreenContainerProps) => (
  <section className={cn(s.section, classes?.container)} {...props}>
    {header}
    <div
      className={cn(s.content, classes?.content, {
        [s.slots]: mode === 'slots',
      })}
    >
      {children}
    </div>
  </section>
)

import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'

type ContainerProps = {
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
}) => <div className={classNames(className, s.container)}>{children}</div>

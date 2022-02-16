import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'

type Props = {
  className?: string
}

const Container: React.FC<Props> = ({ className, children }) => {
  return <div className={classNames(className, s.container)}>{children}</div>
}

export default Container

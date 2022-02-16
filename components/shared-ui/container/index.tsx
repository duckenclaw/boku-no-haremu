import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import Layout from '../../layout/layout'

type Props = {
  className?: string
}

const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <Layout>
      <div className={classNames(className, s.container)}>{children}</div>
    </Layout>
  )
}

export default Container

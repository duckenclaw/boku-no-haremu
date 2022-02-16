import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { Navigation } from './navigation'
import { Socials } from '../socials'
import Container from '../container'

type Props = {
  className?: string
}

const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={classNames(className, s.container)}>
      <Container className={s.wrapper}>
        <Navigation />
        <Socials />
      </Container>
    </header>
  )
}

export { Header }

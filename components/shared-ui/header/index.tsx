import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { Navigation } from './navigation'
import { Socials } from '../socials'
import Container from '../container'
import { MobileMenu } from './mobile-menu/mobile-menu'

type Props = {
  className?: string
}

const Header: React.FC<Props> = ({ className }) => (
  <header className={classNames(className, s.container)}>
    <Container className={s.wrapper}>
      <Navigation />
      <MobileMenu />
      <Socials />
    </Container>
  </header>
)

export { Header }

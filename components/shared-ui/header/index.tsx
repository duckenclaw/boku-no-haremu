import React from 'react'
import classNames from 'classnames'
import { Container } from 'components/shared-ui/container'
import { Image } from 'components/shared-ui/image'
import { Navigation } from './navigation'
import { MobileMenu } from './mobile-menu/mobile-menu'
import { Socials } from '../socials'
import s from './styles.module.scss'

type Props = {
  className?: string
}

const Header: React.FC<Props> = ({ className }) => (
  <header className={classNames(className, s.container)}>
    <Container className={s.wrapper}>
      <Image raw className={s.logo} src="/images/svg/logo.svg" alt="logo" />
      <div className={s.nav}>
        <Navigation />
      </div>
      <MobileMenu />
      <div className={s.socials}>
        <Socials />
      </div>
    </Container>
  </header>
)

export { Header }

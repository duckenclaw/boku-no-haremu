import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { Navigation } from './navigation'
import { Socials } from '../socials'
import { Container } from 'components/shared-ui/container'
import { MobileMenu } from './mobile-menu/mobile-menu'
import { Image } from 'components/shared-ui/image'

type Props = {
  className?: string
}

const Header: React.FC<Props> = ({ className }) => (
  <header className={classNames(className, s.container)}>
    <Container className={s.wrapper}>
      <Image className={s.logo} src="/images/svg/logo.svg" />
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

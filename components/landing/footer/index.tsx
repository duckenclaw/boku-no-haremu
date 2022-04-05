/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import s from './footer.module.scss'
import { Socials } from 'components/shared-ui/socials'
import { Container } from 'components/shared-ui/container'

export const Footer = () => (
  <Container className={s.container}>
    <div className={s.left}>
      <Socials className={s.socials} />
      <p className={s.privateDesktop}>
        © 2022 BOKU NO COMPANY LIMITED. Private Limited Company
      </p>
    </div>
    <div className={s.right}>
      <div className={s.contact_text}>
        <p>
          <div className={s.heading}>Company address:</div>{' '}
          <br className={s.br} />
          Unit 1603, 16th Floor, The L. Plaza, 367 - 375 Queen's Road Central,
          Sheung Wan, Hong Kong
        </p>
        <p>
          <div className={s.heading}> Email:</div>
          <br className={s.br} />
          <a href="mailto: 'info@bokunoharemu.com'">info@bokunoharemu.com</a>
        </p>
        <p>
          <div className={s.heading}> CEO:</div> <br className={s.br} /> Elza
          Gafurova
        </p>
        <p>License</p>
        <p className={s.privateMobile}>
          © 2022 BOKU NO COMPANY LIMITED. Private Limited Company
        </p>
      </div>
    </div>
  </Container>
)

/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import s from './footer.module.scss'
import { Socials } from 'components/shared-ui/socials'

export const Footer = () => (
  <div className={s.container}>
    <div className={s.inner}>
      <div className={s.left}>
        <Socials className={s.socials} />
        <p className={s.privateDesktop}>
          © 2022 BOKU NO COMPANY LIMITED. Private Limited Company
        </p>
      </div>
      <div className={s.contact_text}>
        <div className={s.heading}>
          Company address: <br className={s.br} />
          <br className={s.br} />
          Unit 1603, 16th Floor, The L. Plaza, 367 - 375 Queen's Road Central,
          Sheung Wan, Hong Kong, China
        </div>
        <div className={s.heading}>
          Email: <br className={s.br} />
          <br className={s.br} />
          <a href="mailto: 'info@bokunoharemu.com'">info@bokunoharemu.com</a>
        </div>
        <div className={s.heading}>
          CEO: <br className={s.br} />
          <br className={s.br} /> Elza Gafurova
        </div>
        <div className={s.heading}>
          Incorporation number: <br className={s.br} />
          <br className={s.br} />
          3140973
        </div>
        <div className={s.privateMobile}>
          <div>© 2022 BOKU NO COMPANY LIMITED. Private Limited Company</div>
        </div>
      </div>
    </div>
  </div>
)

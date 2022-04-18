/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import s from './footer.module.scss'
import { Socials } from 'components/shared-ui/socials'
import { Container } from 'components/shared-ui/container'

export const Footer = () => (
  <footer className={s.footer}>
    <Container className={s.container}>
      <div className={s.left}>
        <div className={s.info_item}>
          <span>COMPANY ADDRESS:</span>
          <p>
            Unit 1603, 16th Floor, The L. Plaza, 367 - 375 Queen's Road Central,
            Sheung Wan, Hong Kong, China
          </p>
        </div>
        <div className={s.info_item}>
          <span>CEO:</span>
          <p>Elza Gafurova</p>
        </div>
        <div className={s.info_item}>
          <span>INCORPORATION NUMBER:</span>
          <p>3140973</p>
        </div>
        <div className={s.trademark}>
          © 2022 BOKU NO COMPANY LIMITED. Private Limited Company
        </div>
      </div>
      <div className={s.right}>
        <div className={s.info_item}>
          <span>FOLLOW US</span>
          <Socials className={s.socials} />
        </div>
        <div className={s.info_item}>
          <span>CONTACT US</span>
          <a href="mailto:Email: info@bokunoharemu.com" className={s.mail}>
            Email: info@bokunoharemu.com
          </a>
        </div>
      </div>
    </Container>
    <div className={s.trademark_mobile}>
      <span>© 2022 BOKU NO COMPANY LIMITED. Private Limited Company</span>
    </div>
  </footer>
)

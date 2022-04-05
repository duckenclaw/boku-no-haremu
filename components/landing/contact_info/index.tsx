/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import s from './contact.module.scss'
import { Socials } from 'components/shared-ui/socials'
import { Container } from 'components/shared-ui/container'

export const ContactInfo = () => {
  return (
    <Container>
      <div className={s.container}>
        <div className={s.left}>
          <Socials />
          <p>© 2022 BOKU NO COMPANY LIMITED. Private Limited Company</p>
        </div>
        <div className={s.right}>
          <div className={s.contact_text}>
            <p>
              Company address: Unit 1603, 16th Floor, The L. Plaza, 367 - 375
              Queen's Road Central, Sheung Wan, Hong Kong
            </p>
            <p>
              Email:{' '}
              <a href="mailto: 'info@bokunoharemu.com'">
                info@bokunoharemu.com
              </a>
            </p>
            <p>CEO: Elza Gafurova</p>
            <p>Licence</p>
          </div>
        </div>
      </div>
    </Container>
  )
}

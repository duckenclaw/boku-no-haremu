import React from 'react'
import cn from 'classnames'
import s from './our_partners.module.scss'
import { TextHeader } from 'components/shared-ui/text-header'
import { Container } from 'components/shared-ui/container'
import { Image } from 'components/shared-ui/image'

export const OurPartners = () => {
  return (
    <section className={cn(s.section, 'section')}>
      <Container className={s.container}>
        <TextHeader title="OUR PARTNERS" className={s.textHeader} />
        <div className={s.images}>
          <div className={s.image_item}>
            <Image raw src="images/logo1.png" className={s.logo} alt="logo" />
          </div>
          <div className={s.image_item}>
            <Image raw src="images/logo2.png" className={s.logo} alt="logo" />
          </div>
          <div className={s.image_item}>
            <Image raw src="images/logo3.png" className={s.logo} alt="logo" />
          </div>
        </div>
      </Container>
    </section>
  )
}

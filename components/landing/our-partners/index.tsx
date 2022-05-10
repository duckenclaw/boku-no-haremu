import React from 'react'
import cn from 'classnames'
import s from './our_partners.module.scss'
import { Container } from 'components/shared-ui/container'
import { TextHeader } from 'components/shared-ui/text-header'

export const OurPartners = () => {
  return (
    <section className={cn(s.section, 'section')}>
      <Container className={s.container}>
        <TextHeader title="Our Partners" className={s.textHeader} />
      </Container>
    </section>
  )
}

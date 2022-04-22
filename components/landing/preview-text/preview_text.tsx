import { Container } from 'components/shared-ui/container'
import React from 'react'
import s from './preview_text.module.scss'
import { Image } from 'components/shared-ui/image'

export const PreviewText = () => {
  return (
    <Container className={s.container}>
      <div className={s.image}>
        <Image raw src="/images/wizard.png" alt="wizard" />
      </div>
      <div className={s.text}>
        <div className={s.title}>
          LEAD YOUR LOVING AND ADORING WAIFUS TO VICTORY!
        </div>
        <p>
          Have you ever thought that our world could be very different? Imagine
          a civilization without cities, without government.
        </p>
        <p>
          Only harems waiting for a hero to lead them to a bright future…. The
          whole economy is based on waifus that, if treated right, give you all
          they got.
        </p>
      </div>
    </Container>
  )
}

import { Container } from 'components/shared-ui/container'
import React from 'react'
import Image from 'next/image'
import cn from 'classnames'
import s from './preview_text.module.scss'

export const PreviewText = () => {
  return (
    <Container className={cn(s.container)}>
      <div className={s.image}>
        <Image src="/images/wizard.png" alt="wizard" width={924} height={916} />
      </div>
      <div className={s.text}>
        <div className={s.title}>
          LEAD YOUR LOVING AND ADORING WAIFUS TO VICTORY!
        </div>
        <p>
          Have you ever thought that our world could be very different? Imagine
          a civilisation without cities, without government.
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

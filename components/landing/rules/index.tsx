import React from 'react'
import s from './rules.module.scss'
import { Image } from 'components/shared-ui/image'
import { Container } from 'components/shared-ui/container'

export const Rules = () => (
  <Container className={s.container}>
    <div className={s.text}>
      <h2 className={s.title}>Become a gentleman-hero</h2>
      <p className={s.paragraph}>
        The most powerful leader has the most waifus and knows how to treat them
        like ladies that they are.
      </p>
      <p className={s.paragraph}>
        Develop the economy building not only relationships between actors on
        the market, but also with your precious waifus.
      </p>
      <p className={s.paragraph}>
        After all, LOVE is the main currency in this world…
      </p>
      <a href="https://discord.gg/S3rbu5GXGQ" className={s.desktop_btn}>
        open your heart
      </a>
    </div>
    <div className={s.image}>
      <Image
        raw
        className={s.image_pic}
        src="/images/become.png"
        alt="person"
      />
    </div>
    <a href="https://discord.gg/S3rbu5GXGQ" className={s.mobile_btn}>
      open your heart
    </a>
  </Container>
)

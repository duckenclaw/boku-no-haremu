/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import s from './GrowWaifu.module.scss'
import { TextHeader } from '../shared-ui/text-header'
import { Card } from '../shared-ui/card'
import Image from 'next/image'
import Container from '../shared-ui/container'

type GrowWaifuProps = {
  className?: string
}

export const GrowWaifu: React.FC<GrowWaifuProps> = ({ className }) => (
  <section className={classNames(className, s.section)}>
    <Container>
      <TextHeader
        title="GROW YOUR UNIQUE WAIFU"
        subtitle="The panel designers have found the best possible solution to protect the damaged ends of the panels with thin but rigid aluminium profiles. This ensures a durable construction and a clean seam."
        className={s.textHeader}
      />
      <div className={s.content}>
        <Card
          className={s.card}
          icon="nyan"
          image="girl3"
          rating="1"
          frameColor="#93d8ec"
        />
        <div className={s.arrow}>
          <Image src="/arrow_pink.svg" alt="arrow" width={90} height={36} />
        </div>

        <Card
          className={s.card}
          icon="nyan"
          image="girl2"
          rating="2"
          frameColor="#d87193"
        />
        <div className={s.arrow}>
          <Image src="/arrow_yellow.svg" alt="arrow" width={90} height={36} />
        </div>
        <Card
          className={s.card}
          frameColor="#e8dc3f"
          iconBackgroundColor="#e8dc3f"
          ratingBackgroundColor="#e8dc3f"
        />
      </div>
    </Container>
  </section>
)

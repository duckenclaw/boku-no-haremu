import React from 'react'
import classNames from 'classnames'
import s from './smart_blending.module.scss'
import Container from '../shared-ui/container'
import { TextHeader } from '../shared-ui/text-header'
import { Card } from '../shared-ui/card'
import Image from 'next/image'

type SmartBlendingProps = {
  className?: string
}
export const SmartBlending: React.FC<SmartBlendingProps> = ({ className }) => (
  <section className={classNames(className, s.section)}>
    <Container className={s.container}>
      <TextHeader
        title="SMART BLENDING"
        subtitle="Resource mining increases with each new level"
        className={s.textHeader}
      />
      <div className={s.content}>
        <div className={s.row}>
          <div className={s.leftSide}>
            <Card
              className={s.card}
              icon="nyan"
              image="girl3"
              rating="1"
              frameColor="#93d8ec"
            />
            <Card
              className={s.card}
              icon="nyan"
              image="girl3"
              rating="2"
              frameColor="#d87193"
            />
            <Card
              className={s.card}
              icon="nyan"
              image="girl3"
              rating="2"
              frameColor="#d87193"
            />
          </div>
          <div className={s.rightSide}>
            <div className={s.arrow}>
              <Image
                src="/arrow_pink.svg"
                alt="arrow"
                width={165}
                height={82}
              />
            </div>
            <Card
              className={s.card}
              icon="nyan"
              image="girl2"
              rating="2"
              frameColor="#d87193"
            />
          </div>
        </div>
        <div className={s.row}>
          <div className={s.leftSide}>
            <Card
              className={s.card}
              icon="nyan"
              image="girl2"
              rating="1"
              frameColor="#93d8ec"
            />
            <Card
              className={s.card}
              icon="nyan"
              image="girl2"
              rating="2"
              frameColor="#d87193"
            />
            <Card
              className={s.card}
              icon="nyan"
              image="girl2"
              rating="2"
              frameColor="#d87193"
            />
          </div>
          <div className={s.rightSide}>
            <div className={s.arrow}>
              <Image
                src="/arrow_yellow.svg"
                alt="arrow"
                width={165}
                height={82}
              />
            </div>
            <Card
              className={s.card}
              frameColor="#e8dc3f"
              iconBackgroundColor="#e8dc3f"
              ratingBackgroundColor="#e8dc3f"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
)

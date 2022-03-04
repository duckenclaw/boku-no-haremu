/* eslint-disable @next/next/no-img-element */
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
        title="SMART FUSION"
        subtitle="Resource mining increases with each new level"
        className={s.textHeader}
      />
      <div className={s.content}>
        <div className={s.column}>
          <img className={s.imageTop} alt="" src="/images/mimi.png" />
          <div className={s.arrow}>
            <Image
              src="/images/svg/arrow.svg"
              alt="arrow"
              width={56}
              height={36}
            />
            <div className={s.arrowText}>
              <span className={s.multiplier}>x1</span>
              <span className={s.nextLvl}>next lvl</span>
            </div>
          </div>
          <Card
            className={s.card}
            icon="nyan"
            image="girl2"
            rating="2"
            frameColor="#d87193"
          />
        </div>
        <div className={s.column}>
          <img className={s.imageTop} alt="" src="/images/mimi2.png" />
          <div className={s.arrow}>
            <Image
              src="/images/svg/arrow.svg"
              alt="arrow"
              width={56}
              height={36}
            />
            <div className={s.arrowText}>
              <span className={s.multiplier}>x2</span>
              <span className={s.nextLvl}>next lvl</span>
            </div>
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
    </Container>
  </section>
)

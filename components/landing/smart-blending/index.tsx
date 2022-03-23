/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import { Container } from 'components/shared-ui/container'
import { TextHeader } from 'components/shared-ui/text-header'
import Image from 'next/image'

import s from './smart_blending.module.scss'

type SmartBlendingProps = {
  className?: string
}

export const SmartBlending: React.FC<SmartBlendingProps> = ({ className }) => (
  <section className={classNames(className, s.section)}>
    <Container className={s.container}>
      <TextHeader title="SMART FUSION" className={s.textHeader} id="fusion" />
      <div className={s.content}>
        <div className={s.column}>
          <img className={s.imageTop} alt="" src="/images/mimi_3.png" />
          <div className={s.arrow}>
            <Image
              className={s.arrowLeft}
              src="/images/svg/arrow2.svg"
              alt="arrow"
              width={60}
              height={82}
            />
            <div className={s.arrowText}>
              <div className={s.multiplier}>x1</div>
              <div className={s.nextLvl}>next lvl</div>
            </div>
          </div>
          <Image src="/images/mimi_1.png" alt="" width={188} height={283} />
        </div>
        <div className={s.column}>
          <img className={s.imageTop} alt="" src="/images/cantress_5.png" />
          <div className={s.arrow2}>
            <Image
              src="/images/svg/arrow2.svg"
              alt="arrow"
              width={60}
              height={82}
            />
            <div className={s.arrowText}>
              <div className={s.multiplier}>x2</div>
              <div className={s.nextLvl}>next lvl</div>
            </div>
          </div>
          <Image
            alt=""
            src="/images/chantress_2.png"
            width={289}
            height={283}
          />
        </div>
      </div>
    </Container>
  </section>
)

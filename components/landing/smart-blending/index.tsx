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
  <section className={classNames(className, s.section)} id="fusion">
    <Container className={s.container}>
      <TextHeader title="SMART FUSION" className={s.textHeader} />
      <div className={s.content}>
        <div className={s.column}>
          <img className={s.imageTop} alt="" src="/images/mimi_3.png" />
          <div className={s.arrowText}>
            <div className={s.multiplier}>x1</div>
            <div className={s.nextLvl}>next lvl</div>
            <div className={s.arrow}>
              <Image
                className={s.arrow}
                src="/images/svg/arrow2.svg"
                alt="arrow"
                width={28}
                height={38}
              />
            </div>
          </div>

          <Image src="/images/mimi_1.png" alt="" width={151} height={228} />
        </div>
        <div className={s.column}>
          <img className={s.imageTop} alt="" src="/images/cantress_5.png" />

          <div className={s.arrowText}>
            <div className={s.multiplier}>x2</div>
            <div className={s.nextLvl}>next lvl</div>
            <div className={s.arrow}>
              <Image
                src="/images/svg/arrow2.svg"
                alt="arrow"
                width={28}
                height={38}
              />
            </div>
          </div>
          <Image
            alt=""
            src="/images/chantress_2.png"
            width={233}
            height={228}
          />
        </div>
      </div>
    </Container>
  </section>
)

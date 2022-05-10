/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import { Container } from 'components/shared-ui/container'
import { TextHeader } from 'components/shared-ui/text-header'
import { Image } from 'components/shared-ui/image'
import s from './smart_blending.module.scss'

type SmartBlendingProps = {
  className?: string
}

export const SmartBlending: React.FC<SmartBlendingProps> = ({ className }) => (
  <section className={classNames(className, s.section, 'section')}>
    <a className="anchor" id="fusion" />
    <Container className={s.container}>
      <TextHeader
        title="SMART FUSION"
        className={classNames(className, s.text_header)}
      />
      <div className={s.content}>
        <div className={s.column}>
          <Image raw className={s.imageTop} alt="" src="/images/mimi_3.webp" />
          <div className={s.arrowText}>
            <div className={s.multiplier}>x1</div>
            <div className={s.nextLvl}>next lvl</div>
            <div className={s.arrow}>
              <Image
                raw
                className={s.arrow}
                src="/images/svg/arrow2.svg"
                alt="arrow"
                width={28}
                height={38}
              />
            </div>
          </div>
          <div className={s.single_image}>
            <Image
              raw
              src="/images/shadow.webp"
              alt=""
              width={151}
              height={228}
            />
          </div>
        </div>
        <div className={s.column}>
          <Image
            raw
            className={s.imageTop}
            alt=""
            src="/images/chantress_5.webp"
          />

          <div className={s.arrowText}>
            <div className={s.multiplier}>x2</div>
            <div className={s.nextLvl}>next lvl</div>
            <div className={s.arrow}>
              <Image
                raw
                src="/images/svg/arrow2.svg"
                alt="arrow"
                width={28}
                height={38}
              />
            </div>
          </div>
          <div className={s.single_image}>
            <Image
              raw
              alt=""
              src="/images/chantress_2.webp"
              width={233}
              height={228}
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
)

/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import s from './GrowWaifu.module.scss'
import { TextHeader } from 'components/shared-ui/text-header'
import { Image } from 'components/shared-ui/image'
import { Container } from 'components/shared-ui/container'

type GrowWaifuProps = {
  className?: string
}

export const GrowWaifu: React.FC<GrowWaifuProps> = ({ className }) => {
  return (
    <section className={classNames(className, s.section, 'section')}>
      <a className="anchor" id="growth" />
      <Container className={s.container}>
        <TextHeader
          title="fully generated waifu"
          className={classNames(className, s.text_header)}
        />
        <div className={s.description}>
          <p>
            Every level your Waifu receives a new trait that will be with her
            forever!!!
          </p>
          <p>You Raise your Waifu every level and see her grow!!!</p>
        </div>
        <div className={s.content}>
          <Image
            raw
            src="images/mimi1.webp"
            className={s.mimi_card}
            alt="mimi_card"
          />
          <div className={s.arrow}>
            <Image
              raw
              src="/images/svg/arrow.svg"
              alt="arrow"
              width={55}
              height={70}
            />
          </div>
          <Image
            raw
            src="images/mimi2_new.webp"
            className={s.mimi_card}
            alt="mimi_card"
          />
          <div className={s.arrow}>
            <Image
              raw
              src="/images/svg/arrow.svg"
              alt="arrow"
              width={55}
              height={70}
            />
          </div>
          <Image
            raw
            src="images/mimi4.webp"
            className={s.mimi_card}
            alt="mimi_card"
          />
          <div className={s.arrow}>
            <Image
              raw
              src="/images/svg/arrow.svg"
              alt="arrow"
              width={55}
              height={70}
            />
          </div>
          <Image
            raw
            src="images/mimi3_new.webp"
            className={s.mimi_card}
            alt="mimi_card"
          />
        </div>
      </Container>
    </section>
  )
}

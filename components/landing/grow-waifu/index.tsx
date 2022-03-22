/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import s from './GrowWaifu.module.scss'
import { TextHeader } from 'components/shared-ui/text-header'
import Image from 'next/image'
import { Container } from 'components/shared-ui/container'
import { PreviewText } from '../preview-text/preview_text'

type GrowWaifuProps = {
  className?: string
}

export const GrowWaifu: React.FC<GrowWaifuProps> = ({ className }) => (
  <section className={classNames(className, s.section)}>
    <div className={s.bg_top}></div>
    <Container>
      <TextHeader
        title="GROW YOUR UNIQUE WAIFU"
        className={s.textHeader}
        id="growth"
      />
      <div className={s.content}>
        <Image
          src="/images/mimi1.png"
          alt="mimi_card"
          width={244}
          height={362}
        />

        <div className={s.arrow}>
          <Image
            src="/images/svg/arrow.svg"
            alt="arrow"
            width={46}
            height={26}
          />
        </div>
        <Image
          src="/images/mimi2_new.png"
          alt="mimi_card"
          width={244}
          height={362}
        />

        <div className={s.arrow}>
          <Image
            src="/images/svg/arrow.svg"
            alt="arrow"
            width={46}
            height={26}
          />
        </div>
        <Image
          src="/images/mimi3_new.png"
          alt="mimi_card"
          width={244}
          height={362}
        />
      </div>
    </Container>
    <div className={s.bg_bot}></div>
  </section>
)

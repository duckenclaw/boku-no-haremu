/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import s from './GrowWaifu.module.scss'
import { TextHeader } from 'components/shared-ui/text-header'
import { Image } from 'components/shared-ui/image'
import { Container } from 'components/shared-ui/container'
import Mimi1 from 'public/images/mimi1.png'
import Mimi2 from 'public/images/mimi2_new.png'
import Mimi3 from 'public/images/mimi3_new.png'

type GrowWaifuProps = {
  className?: string
}

export const GrowWaifu: React.FC<GrowWaifuProps> = ({ className }) => {
  return (
    <section className={classNames(className, s.section)} id="growth">
      <Container className={s.container}>
        <TextHeader title="GROW YOUR UNIQUE WAIFU" className={s.textHeader} />
        <div className={s.content}>
          <Image src={Mimi1.src} className={s.mimi_card} alt="mimi_card" />
          <div className={s.arrow}>
            <Image
              src="/images/svg/arrow.svg"
              alt="arrow"
              width={90}
              height={36}
            />
          </div>
          <Image src={Mimi2.src} className={s.mimi_card} alt="mimi_card" />
          <div className={s.arrow}>
            <Image
              src="/images/svg/arrow.svg"
              alt="arrow"
              width={90}
              height={36}
            />
          </div>
          <Image src={Mimi3.src} className={s.mimi_card} alt="mimi_card" />
        </div>
      </Container>
    </section>
  )
}

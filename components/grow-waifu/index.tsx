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
        subtitle="Inside every waifu there is a milfu. Milfus are more powerful and experienced than their younger counterparts. Let your milfus guide your waifus on their path to excellence."
        className={s.textHeader}
        id="growth"
      />
      <div className={s.content}>
        <Image src="/images/mimi1.png" alt="mimi_card" width={244} height={362} />
        {/*<Card
          className={s.card}
          icon="nyan"
          image="catgirllvl1-1"
          rating="1"
          frameColor="#93d8ec"
        />*/}
        <div className={s.arrow}>
          <Image src="/images/svg/arrow.svg" alt="arrow" width={46} height={26} />
        </div>
        <Image src="/images/mimi_rare2.png" alt="mimi_card"  width={244} height={362}/>
        {/*<Card
          className={s.card}
          icon="nyan"
          image="lisa1"
          rating="2"
          frameColor="#d87193"
        />*/}
        <div className={s.arrow}>
          <Image src="/images/svg/arrow.svg" alt="arrow" width={46} height={26} />
        </div>
        {/*<Card
          className={s.card}
          frameColor="#e8dc3f"
          iconBackgroundColor="#479EC5"
          ratingBackgroundColor="#e8dc3f"
          rating="3"
        />*/}
        <Image src="/images/question.png" alt="mimi_card"  width={244} height={362}/>
      </div>
    </Container>
  </section>
)

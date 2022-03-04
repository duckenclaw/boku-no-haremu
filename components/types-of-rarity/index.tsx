/* eslint-disable @next/next/no-img-element */
import s from './types-of-rarity.module.scss'
import Container from '../shared-ui/container'
import { TextHeader } from '../shared-ui/text-header'
import { Card } from '../shared-ui/card'
import classNames from 'classnames'
import Image from 'next/image'

type Props = {
  className?: string
}

export const TypesOfRarity: React.FC<Props> = () => (
  <section>
    <Container>
      <TextHeader
        className={s.textHeader}
        title="TIERS OF RARITY"
        subtitle="Increase the rarity of your waifu by blending other waifus of the same type into one more love giving  waifu."
      />
      <div className={s.imageTopContainer}>
        <img className={s.imageTop} alt="" src="/images/mimi.png" />
      </div>
      <div className={s.cardsBottom}>
        <div className={classNames(s.cardWrapper)}>
          <div className={s.arrowFirst}>
            <div className={s.arrow}>
              <Image
                src="/images/svg/arrow.svg"
                alt="arrow"
                width={79}
                height={49}
              />
            </div>
          </div>
          <Card
            className={s.card}
            icon="nyan"
            image="girl2"
            rating="2"
            frameColor="#d87193"
          />
          <div style={{ color: 'white' }} className={s.cardName}>
            Common
          </div>
        </div>
        <div className={classNames(s.cardWrapper)}>
          <div className={s.arrowSecond}>
            <div className={s.arrow}>
              <Image
                src="/images/svg/arrow.svg"
                alt="arrow"
                width={79}
                height={49}
              />
            </div>
          </div>
          <Card
            className={s.card}
            icon="nyan"
            image="girl2"
            rating="2"
            frameColor="#d87193"
          />
          <div style={{ color: '#D5436F' }} className={s.cardName}>
            Rare
          </div>
        </div>
        <div className={classNames(s.cardWrapper)}>
          <div className={s.arrowThird}>
            <div className={s.arrow}>
              <Image
                src="/images/svg/arrow.svg"
                alt="arrow"
                width={79}
                height={49}
              />
            </div>
          </div>
          <Card
            className={s.card}
            frameColor="#e8dc3f"
            iconBackgroundColor="#e8dc3f"
            ratingBackgroundColor="#e8dc3f"
          />
          <div style={{ color: '#e8dc3f' }} className={s.cardName}>
            Epic
          </div>
        </div>
      </div>
    </Container>
  </section>
)

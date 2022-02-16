import s from './types-of-rarity.module.scss'
import Container from '../shared-ui/container'
import { TextHeader } from '../shared-ui/text-header'
import { Card } from '../shared-ui/card'
import classNames from 'classnames'
import Image from 'next/image'
import Arrow from '/public/arrow_pink.svg'

type Props = {
  className?: string
}

export const TypesOfRarity: React.FC<Props> = () => (
  <section>
    <Container>
      <TextHeader
        className={s.textHeader}
        title="TYPES OF RARITY"
        subtitle="Increase the rarity of your waifu by blending other waifus of the same type"
      />
      <div className={s.cardsTop}>
        <Card
          className={classNames(s.card, s.firstCard)}
          icon="crystal"
          image="girl1"
          rating="1"
          frameColor="#93d8ec"
        />
        <Card
          className={classNames(s.card, s.secondCard)}
          icon="crystal"
          image="girl1"
          rating="1"
          frameColor="#93d8ec"
        />
        <Card
          className={classNames(s.card, s.thirdCard)}
          icon="crystal"
          image="girl1"
          rating="1"
          frameColor="#93d8ec"
        />
      </div>
      <div className={s.cardsBottom}>
        <div className={classNames(s.cardWrapper)}>
          <div className={s.arrowFirst}>
            <Arrow />
          </div>
          <Card
            className={s.card}
            icon="crystal"
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
            <Arrow />
          </div>
          <Card
            className={s.card}
            icon="crystal"
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
            <Arrow />
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

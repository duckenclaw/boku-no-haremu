/* eslint-disable @next/next/no-img-element */
import s from './types-of-rarity.module.scss'
import { Container } from 'components/shared-ui/container'
import { TextHeader } from 'components/shared-ui/text-header'
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
        id="rarity"
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
          <Image
            src="/images/mimi1.png"
            alt="mimi_card"
            width={244}
            height={362}
          />
          <div style={{ color: 'white' }} className={s.cardName}>
            89% Common
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
          <Image
            src="/images/mimi_epic2.png"
            alt="mimi_card"
            width={244}
            height={362}
          />
          <div style={{ color: '#D5436F' }} className={s.cardName}>
            10% Rare
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
          <Image
            src="/images/mimi_rare2.png"
            alt="mimi"
            width={244}
            height={362}
          />
          <div style={{ color: '#e8dc3f' }} className={s.cardName}>
            1% Epic
          </div>
        </div>
      </div>
    </Container>
  </section>
)

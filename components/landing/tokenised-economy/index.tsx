import cn from 'classnames'

import { Image } from 'components/shared-ui/image'
import { Container } from 'components/shared-ui/container'
import { TextHeader } from 'components/shared-ui/text-header'

import s from './tokenised_economy.module.scss'

type Props = {
  className?: string
}

type Card = {
  title: string
  description: string
  logo: string
  cash: string
}

const cards: Card[] = [
  {
    title: 'NYAN',
    description:
      'The more your feline spouses love you, the more nyans you have. Purrs made tangible. Sometimes even barks.',
    logo: 'nyan',
    cash: 'cash1',
  },
  {
    title: 'Simptetix',
    description:
      'This resource lets you simpthesize a new feature for your waifus. True custom love.',
    logo: 'simptetix',
    cash: 'cash2',
  },
  {
    title: 'BENTO',
    description:
      'Made with love. Demonstrates how much you treasure your waifus.',
    logo: 'bento',
    cash: 'cash3',
  },
  {
    title: 'Chantment',
    description:
      'Filled with magical stuff that unlocks your waifu’s lovetential.',
    logo: 'crystal',
    cash: 'cash4',
  },
]

export const TokenisedEconomy: React.FC<Props> = ({ className }) => (
  <section className={cn(s.section, 'section')}>
    <a className="anchor" id="resources" />
    <Container className={s.container}>
      <TextHeader
        className={cn(className, s.text_header)}
        title="in-game resources and trade"
      />
      <div className={s.cards}>
        {cards?.map((card: Card) => (
          <div key={card.title} className={s.card}>
            <Image
              className={s.cardLogo}
              raw
              src={`images/currencies/${card.logo}.png`}
              alt={card.title}
            />
            <div className={s.cardTitle}>{card.title}</div>
            <div className={s.cardDescription}>{card.description}</div>
            <div className={s.cash_block}>
              <div className={s.arrow}>
                <Image raw src="/images/svg/arrow.svg" alt="arrow" />
              </div>
              <Image
                className={s.cash}
                raw
                src={`images/${card.cash}.png`}
                alt={card.title}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
)

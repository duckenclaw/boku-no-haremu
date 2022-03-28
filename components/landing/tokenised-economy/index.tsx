/* eslint-disable @next/next/no-img-element */
import { Button } from 'components/shared-ui//button'
import { Container } from 'components/shared-ui/container'
import { TextHeader } from 'components/shared-ui/text-header'

import s from './TokenisedEconomy.module.scss'

type Props = {
  className?: string
}

type Card = {
  title: string
  description: string
  logo: string
}

const cards: Card[] = [
  {
    title: 'NYAN',
    description:
      'The more your feline spouses love you, the more nyans you have. Purrs made tangible. Sometimes even barks.',
    logo: 'nyan',
  },
  {
    title: 'Simptetix',
    description:
      'This resource lets you simpthesize a new feature for your waifus. True custom love.',
    logo: 'simptetix',
  },
  {
    title: 'BENTO',
    description:
      'Made with love. Demonstrates how much you treasure your waifus.',
    logo: 'bento',
  },
  {
    title: 'Chantment',
    description:
      'Filled with magical stuff that unlocks your waifu’s lovetential.',
    logo: 'crystal',
  },
]

export const TokenisedEconomy: React.FC<Props> = () => (
  <section className={s.section}>
    <Container className={s.container}>
      <TextHeader
        className={s.textHeader}
        title="in-game resources"
        id="resources"
      />
      <div className={s.cards}>
        {cards?.map((card: Card) => (
          <div key={card.title} className={s.card}>
            <img
              className={s.cardLogo}
              src={`images/currencies/${card.logo}.png`}
              alt={card.title}
            />
            <div className={s.cardTitle}>{card.title}</div>
            <div className={s.cardDescription}>{card.description}</div>
          </div>
        ))}
      </div>
    </Container>
  </section>
)

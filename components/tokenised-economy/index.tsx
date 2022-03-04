/* eslint-disable @next/next/no-img-element */
import { Button } from '../shared-ui/buttons/button'
import Container from '../shared-ui/container'
import { TextHeader } from '../shared-ui/text-header'
import s from './TokenisedEconomy.module.scss'
import Image from 'next/image'
import { PreviewText } from '../preview-text/preview_text'

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
      'An energetic resource, in which your waifu’s character and emotions forwarded to you are concluded.',
    logo: 'nyan',
  },
  {
    title: 'Simptetix',
    description:
      'A versatile resource that gives your waifu traits that worth simping over',
    logo: 'simptetix',
  },
  {
    title: 'BENTO',
    description:
      'Made with love and care not only gives energy for farming of resources but also demonstrates the care with which you treat your waifus',
    logo: 'bento',
  },
  {
    title: 'Chantment',
    description:
      'Filled with magicy stuff that unlocks your waifus Lovetential',
    logo: 'crystal',
  },
]

export const TokenisedEconomy: React.FC<Props> = () => (
  <section className={s.section}>
    <div className={s.wave} />
    <Container>
      <PreviewText />
      <TextHeader
        className={s.textHeader}
        title="TOKENISED ECONOMY"
        subtitle="   We present the latest technological solution for mobile design of
          expositions, museums, galleries, exhibitions."
      />
      <div className={s.cards}>
        {cards?.map((card: Card) => (
          <div key={card.title} className={s.card}>
            <div className={s.cardHeader}>
              <img
                className={s.cardLogo}
                src={`images/${card.logo}.png`}
                alt={card.title}
              />
              <div className={s.cardTitle}>{card.title}</div>
              <div className={s.cardDescription}>{card.description}</div>
            </div>
            <Button className={s.button} handler={() => null}>
              VIEW ON ALCOR
            </Button>
          </div>
        ))}
      </div>
    </Container>
  </section>
)

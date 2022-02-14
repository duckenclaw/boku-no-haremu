/* eslint-disable @next/next/no-img-element */
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
      'Nyans are an energetic resource, in which your waifu’s character and emotions forwarded to you are concluded.',
    logo: 'nyan',
  },
  {
    title: 'METAL',
    description:
      'Metal is a versatile resource that gives your waifus weapon, accessories and more.',
    logo: 'metal',
  },
  {
    title: 'BENTO',
    description:
      'Bento made made with love and care not only gives energy for farming of resources but also demonstrate the care with which you treat your waifus.',
    logo: 'bento',
  },
  {
    title: 'CRYSTAL',
    description:
      'Magic crystals that fill your waifus with life and unlock their potential. The concept of our resources is a subject to change, and it will develop with every update and give players more opportunities.',
    logo: 'crystal',
  },
]

export const TokenisedEconomy: React.FC<Props> = () => (
  <div className={s.container}>
    <div className={s.title}>TOKENISED ECONOMY</div>
    <div className={s.subtitle}>
      We present the latest technological solution for mobile design of
      expositions, museums, galleries, exhibitions.
    </div>
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
          <button className={s.cardButton}>VIEW ON ALCOR</button>
        </div>
      ))}
    </div>
  </div>
)

/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import s from './ExclusiveNfts.module.scss'
import { TextHeader } from '../shared-ui/text-header'
import { Card } from '../shared-ui/card'

type ExclusiveNftsProps = {
  className?: string
}

const cards = [
  {
    title: 'Cat girls',
    description:
      'catgirls are ideal companions and thanks to their loving nature, their emotions towards their masters materialize into Nyans',
    icon: 'nyan',
  },
  {
    title: 'Enchantresses',
    description:
      'alluring and enchanting senchantresses that can change the world around them at a snap of a finger, but for it they need to encase their energy inside magical Crystals',
    icon: 'crystal',
  },
  {
    title: 'Cyberloli',
    description:
      'Cyberloli - deadly lolis, thanks to their extraordinary intelligence, they move the progress making new technologies using Metal in this new world ',
    icon: 'metal',
  },
  {
    title: 'Schoolgirls',
    description:
      'Schoolgirls - cute and nostalgic, show their affection with homey Bento with notes to you.',
    icon: 'bento',
  },
]

export const ExclusiveNfts: React.FC<ExclusiveNftsProps> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <TextHeader
      title="EXCLUSIVE NFTS"
      subtitle="The panel designers have found the best possible solution to protect the damaged ends of the panels with thin but rigid aluminium profiles. This ensures a durable construction and a clean seam."
      className={s.textHeader}
    />
    <div className={s.cards}>
      {cards.map((card) => (
        <div key={card.title} className={s.cardContainer}>
          <Card
            className={s.card}
            icon="crystal"
            image="girl1"
            rating={1}
            frameColor="#93d8ec"
          />
          <div className={s.cardInfo}>
            <div className={s.cardTitle}>{card.title}</div>
            <div className={s.cardDescription}>{card.description}</div>
            <img className={s.cardIcon} src={`images/${card.icon}.png`} alt="" />
          </div>
        </div>
      ))}
    </div>
  </div>
)

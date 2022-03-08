/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import s from './ExclusiveNfts.module.scss'
import { TextHeader } from '../shared-ui/text-header'
import { Card } from '../shared-ui/card'
import Container from '../shared-ui/container'

type ExclusiveNftsProps = {
  className?: string
}

const cards = [
  {
    title: 'Mimi-chan',
    description:'Ideal companions and because of their every-loving nature, their emotions towards their masters materialize into Nyans.',
    icon: 'nyan',
    image: 'catgirllvl1-1',
    price: {
      sim: 6000,
      crystal: 8000
    }
  },
  {
    title: 'Chantresses',
    description:'Alluring and enchanting, they can change the world around them at a snap of a finger, but for it they need to encase their energy inside magical Chantments.',
    icon: 'crystal',
    image: 'wizardlvl1',
    price: {
      sim: 4000,
      nyan: 400
    }
  },
  {
    title: 'H1-bride ',
    description:'Deadly and charming, thanks to their extraordinary intelligence, move the progress making new technologies using Simptetix.',
    icon: 'sim',
    image: 'mechalvl1',
    price: {
      crystal: 4000,
      nyan: 400
    }
  },
  {
    title: 'Hitomi',
    description:'Cute and nostalgic, care for you showing their affection to you with homey Bento.',
    icon: 'bento',
    image: 'schoollvl1',
    price: {
      crystal: 3000,
      nyan: 800,
      sim: 3000
    }
  },
]

export const ExclusiveNfts: React.FC<ExclusiveNftsProps> = ({ className }) => (
  <section className={classNames(className, s.section)}>
    <Container>
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
              icon={card.icon}
              image={card.image}
              rating="1"
              frameColor="#93d8ec"
            />
            <div className={s.cardInfo}>
              <div className={s.cardTitleWrapper}>
                <div className={s.cardTitle}>{card.title}</div>
                <img
                className={s.cardIcon}
                src={`images/${card.icon}.png`}
                alt=""
                />
              </div>
              <div className={s.cardDescription}>{card.description}</div>
              <div className={s.cardSubTitle}>Asking out cost</div>
              <div className={s.cardPrices}>
                {card.price.sim && 
                  <div className={s.cardPrice}>
                    <img className={s.cardPriceIcon} src={`images/sim.png`} />
                    <div className={s.cardPriceContent}>{card.price.sim}</div>
                  </div>
                }
                {card.price.crystal && 
                  <div className={s.cardPrice}>
                    <img className={s.cardPriceIcon} src={`images/crystal.png`} />
                    <div className={s.cardPriceContent}>{card.price.crystal}</div>
                  </div>
                }
                {card.price.nyan && 
                  <div className={s.cardPrice}>
                    <img className={s.cardPriceIcon} src={`images/nyan.png`} />
                    <div className={s.cardPriceContent}>{card.price.nyan}</div>
                  </div>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
)

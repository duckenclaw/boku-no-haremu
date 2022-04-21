/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import s from './ExclusiveNfts.module.scss'
import { TextHeader } from 'components/shared-ui/text-header'
import { Container } from 'components/shared-ui/container'

type ExclusiveNftsProps = {
  className?: string
}

const cards = [
  {
    title: 'Mimi-chan',
    description:
      'An ideal companion. She love you so much, that you get Nyans from them.',
    icon: 'nyan',
    image: '/images/mimi1.png',
    price: {
      sim: 7500,
      crystal: 8250,
      nyan: 300,
    },
  },
  {
    title: 'Chantress',
    description:
      'Enchant the reality to shift according to her will. So can you, if she presents her power to you in small boxes called Chantments.',
    icon: 'crystal',
    image: '/images/chan1.png',
    price: {
      sim: 6000,
      nyan: 600,
    },
  },
  {
    title: 'H1-bride ',
    description:
      'As deadly as she is charming. She is so smart - Simpthetix are like child’s for her.',
    icon: 'sim',
    image: '/images/h11.png',
    price: {
      crystal: 6000,
      nyan: 600,
    },
  },
  {
    title: 'Hitomi',
    description:
      'Home impersonated. She takes such good care of you. You’ll never go hungry without a delicious Bento with her.',
    icon: 'bento',
    image: '/images/hitomi1.png',
    price: {
      crystal: 4500,
      nyan: 1200,
      sim: 4500,
    },
  },
]

export const ExclusiveNfts: React.FC<ExclusiveNftsProps> = ({ className }) => (
  <section className={classNames(className, s.section, 'section')}>
    <a className="anchor" id="nfts" />
    <Container className={s.container}>
      <TextHeader
        title="EXCLUSIVE NFTS"
        className={classNames(className, s.text_header)}
      />
      <div className={s.imageContainer}>
        <img src="/images/nft3.webp" className={s.nfts3} alt="" />
        <img src="/images/svg/ellipse.svg" className={s.ellipse} />
      </div>
      <img src="/images/nft4.png" className={s.nfts4} alt="" />
      <img src="/images/svg/ellipse.svg" className={s.ellipse_mobile} />
    </Container>
  </section>
)

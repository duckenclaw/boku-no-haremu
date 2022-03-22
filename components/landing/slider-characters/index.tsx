import React, { useState } from 'react'
import styles from './slider_characters.module.scss'
import Slider from 'react-slick'
import { SliderItem } from 'components/shared-ui/slider-item'

const characters: CharacterSlider[] = [
  {
    background: 'character-background1',
    characterImg: 'character1',
    title: 'Chantresses',
    description:
      'Enchant the reality to shift according to her will. So can you, if she presents her power to you in small boxes called Chantments.',
    logo: 'string',
    price: {
      nyan: 'string',
      simptetix: 'string',
      crystal: 'string',
    },
  },
  {
    background: 'character-background2',
    characterImg: 'character2',
    title: 'mimi-chan',
    description:
      'An ideal companion. She love you so much, that you get Nyans from her.',
    logo: 'string',
    price: {
      nyan: 'string',
      simptetix: 'string',
      crystal: 'string',
    },
  },
  {
    background: 'character-background3',
    characterImg: 'character3',
    title: 'Hitomi',
    description:
      'Home impersonated. She takes such good care of you. You’ll never go hungry without a delicious Bento with her.',
    logo: 'string',
    price: {
      nyan: 'string',
      simptetix: 'string',
      crystal: 'string',
    },
  },
  {
    background: 'character-background4',
    characterImg: 'character4',
    title: 'H1-bride',
    description:
      'As deadly as she is charming. She is so smart - Simpthetix are like child’s for her.',
    logo: 'string',
    price: {
      nyan: 'string',
      simptetix: 'string',
      crystal: 'string',
    },
  },
]

export const SliderCharacters = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (
      dots:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined
    ) => (
      <div>
        <ul className={styles.listDots}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className={styles.dot}>{characters[i].title}</div>
    ),
  }

  return (
    <div className={styles.root}>
      <Slider className={styles.slider} {...settings}>
        {characters.map((character, index) => (
          <SliderItem key={index} data={character} />
        ))}
      </Slider>
    </div>
  )
}

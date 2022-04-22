import React from 'react'
import styles from './slider_characters.module.scss'
import Slider from 'react-slick'
import { SliderItem } from 'components/shared-ui/slider-item'
import classNames from 'classnames'
import imageDesktop1 from 'public/images/slider/content_1.png'
import imageDesktop2 from 'public/images/slider/content_2.png'
import imageDesktop3 from 'public/images/slider/content_3.png'
import imageDesktop4 from 'public/images/slider/content_4.png'
import Character1 from 'public/images/characters/character1.png'
import Character2 from 'public/images/characters/character2.png'
import Character3 from 'public/images/characters/character3.png'
import Character4 from 'public/images/characters/character4.png'
import FirstDot from 'public/images/svg/first-dot.svg'
import LastDot from 'public/images/svg/last-dot.svg'

const characters: CharacterSlider[] = [
  {
    background: 'character-background2_peace',
    characterImg: Character2,
    title: 'mimi-chan',
    description:
      'An ideal companion. She love you so much, that you get Nyans from her.',
    logo: 'string',
    price: {
      nyan: 'string',
      simptetix: 'string',
      crystal: 'string',
    },
    imageDesktop: imageDesktop2,
  },
  {
    background: 'character-background1',
    characterImg: Character1,
    title: 'Chantress',
    description:
      'Enchant the reality to shift according to her will. So can you, if she presents her power to you in small boxes called Chantments.',
    logo: 'string',
    price: {
      nyan: 'string',
      simptetix: 'string',
      crystal: 'string',
    },
    imageDesktop: imageDesktop1,
  },
  {
    background: 'character-background4_peace',
    characterImg: Character3,
    title: 'Hitomi',
    description:
      'Home impersonated. She takes such good care of you. You’ll never go hungry without a delicious Bento with her.',
    logo: 'string',
    price: {
      nyan: 'string',
      simptetix: 'string',
      crystal: 'string',
    },
    imageDesktop: imageDesktop3,
  },
  {
    background: 'character-background3',
    characterImg: Character4,
    title: 'H1-bride',
    description:
      'As deadly as she is charming. She is so smart - Simpthetix are like child’s for her.',
    logo: 'string',
    price: {
      nyan: 'string',
      simptetix: 'string',
      crystal: 'string',
    },
    imageDesktop: imageDesktop4,
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
      <div>
        {i === 0 && (
          <div className={classNames(styles.sideDot, 'slider-character-dot')}>
            <div className={classNames(styles.dotText, styles.dotTextFirst)}>
              {' '}
              {characters[i].title}
            </div>
            <FirstDot />
          </div>
        )}
        {i !== 0 && i !== characters.length - 1 && (
          <div className={classNames(styles.dot, 'slider-character-dot')}>
            {characters[i].title}
          </div>
        )}
        {i == characters.length - 1 && (
          <div className={classNames(styles.sideDot, 'slider-character-dot')}>
            <div className={classNames(styles.dotText, styles.dotTextLast)}>
              {' '}
              {characters[i].title}
            </div>
            <LastDot />
          </div>
        )}
        <div
          className={classNames(
            styles.dotMobile,
            'slider-character-mobile-dots'
          )}
        ></div>
      </div>
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

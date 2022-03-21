import React from 'react'
import styles from './slider_characters.module.scss'
import Slider from 'react-slick'
import { SliderItem } from 'components/shared-ui/slider-item'

const characters: CharacterSlider[] = [
  {
    background: 'character-background1',
    characterImg: 'string',
    title: '1',
    description: 'string',
    logo: 'string',
    price: {
      nyan: 'string',
      simptetix: 'string',
      crystal: 'string',
    },
  },
  {
    background: 'character-background2',
    characterImg: 'string',
    title: '2',
    description: 'string',
    logo: 'string',
    price: {
      nyan: 'string',
      simptetix: 'string',
      crystal: 'string',
    },
  },
  {
    background: 'character-background3',
    characterImg: 'string',
    title: '3',
    description: 'string',
    logo: 'string',
    price: {
      nyan: 'string',
      simptetix: 'string',
      crystal: 'string',
    },
  },
  {
    background: 'character-background4',
    characterImg: 'string',
    title: '4',
    description: 'string',
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
      <div
        style={{
          backgroundColor: '#ddd',
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
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

/* eslint-disable @next/next/no-img-element */
import React from 'react'
import s from './slider_item.module.scss'
import { Image } from 'components/shared-ui/image'
import { Container } from '../container'

type SliderItemProps = {
  data: CharacterSlider
}

export const SliderItem: React.FC<SliderItemProps> = ({ data }) => (
  <div
    className={s.root}
    style={{
      backgroundImage: `linear-gradient(to bottom, #2B0A37, transparent,  #2B0A37), url(/images/characters/${data.background}.png)`,
    }}
  >
    <Container className={s.container}>
      <div className={s.personImg}>
        <Image
          raw
          className={s.image}
          alt=""
          src={`${data.characterImg.src}`}
        />
      </div>
      <div className={s.characterInfoWrapperDesktop}>
        <Image
          raw
          className={s.image}
          src={`${data.imageDesktop.src}`}
          alt="card_info"
        />
      </div>
      <div className={s.background}></div>
    </Container>
  </div>
)

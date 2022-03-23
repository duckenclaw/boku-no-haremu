/* eslint-disable @next/next/no-img-element */
import React from 'react'
import s from './slider_item.module.scss'
import Image from 'next/image'

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
    <div className={s.personImg}>
      <img
        className={s.image}
        alt=""
        src={`${data.characterImg.src}`}
      />
    </div>
    {console.log(data.imageDesktop)}
    <div className={s.characterInfoWrapperDesktop}>
      <Image
        src={`${data.imageDesktop.src}`}
        alt="card_info"
        width={755}
        height={526}
      />
    </div>
  </div>
)

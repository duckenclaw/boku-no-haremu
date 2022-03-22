/* eslint-disable @next/next/no-img-element */
import React from 'react'
import s from './slider_item.module.scss'
import Image from 'next/image'

type SliderItemProps = {
  data: CharacterSlider
}

export const SliderItem: React.FC<SliderItemProps> = ({ data }) => {
  return (
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
          src={`/images/characters/${data.characterImg}.png`}
        />
      </div>

      <div className={s.characterInfoWrapperDesktop}>
        <Image
          src={`${data.imageDesktop}.png`}
          alt="card_info"
          width={755}
          height={526}
        />
      </div>
      <div className={s.characterInfoWrapperMobile}>
        <Image
          src={`${data.imageDesktop}.png`}
          alt="card_info"
          width={755}
          height={526}
        />
      </div>
    </div>
  )
}

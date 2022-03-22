/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from './slider_item.module.scss'

type SliderItemProps = {
  data: CharacterSlider
}

export const SliderItem: React.FC<SliderItemProps> = ({ data }) => {
  return (
    <div
      className={styles.root}
      style={{
        backgroundImage: `linear-gradient(to bottom, #2B0A37, transparent,  #2B0A37), url(/images/characters/${data.background}.png)`,
      }}
    >
      <img
        className={styles.image}
        alt=""
        src={`/images/characters/${data.characterImg}.png`}
      />
      <div className={styles.characterInfo}></div>
    </div>
  )
}

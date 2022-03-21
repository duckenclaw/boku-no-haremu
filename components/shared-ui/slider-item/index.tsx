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
        backgroundImage: `url(/images/characters/${data.background}.png)`,
      }}
    >
      <img
        className={styles.image}
        alt=""
        src={`/images/characters/${data.characterImg}.png`}
      />
    </div>
  )
}

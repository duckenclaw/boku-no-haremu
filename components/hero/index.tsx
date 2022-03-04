/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import Image from 'next/image'
import Text from '/public/images/svg/only-haremu.svg'
import { SakuraAnimation } from './SakuraAnimation'

type Props = {
  className?: string
}

const Hero: React.FC<Props> = ({ className }) => {
  return (
    <section className={classNames(className, s.section)}>
      <div className={s.characters}>
        <SakuraAnimation />
        <img
          className={s.charactersImg}
          src={'images/characters.png'}
          alt="characters"
        />
      </div>
      <div className={s.content}>
        <button className={s.button}>PLAY & EARN</button>
        <Text className={s.text} />
      </div>
    </section>
  )
}

export { Hero }

/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import Image from 'next/image'
//import Text from '/public/images/svg/boku-no-haremu.svg'
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
        <div className={s.title}>Boku no haremu</div>
        <div className={s.subtitle}>a true strategy nft game</div>
      </div>
    </section>
  )
}

export { Hero }

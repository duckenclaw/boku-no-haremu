/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { SakuraAnimation } from './SakuraAnimation'
import Link from 'next/link'

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
        <button className={s.button}>PLAY</button>
        <div>
          <div className={s.title}>Boku no haremu</div>
          <div className={s.subtitle}>GROW YOUR UNIQUE WAIFU</div>
z        </div>
      </div>
    </section>
  )
}

export { Hero }

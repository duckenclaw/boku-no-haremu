/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { SakuraAnimation } from './sakura_animation'
import { useMediaQuery } from 'react-responsive'

type Props = {
  className?: string
}

const Hero: React.FC<Props> = ({ className }) => {
  const isMobile = useMediaQuery({
    query: '(min-width: 768px)',
  })

  return (
    <section className={classNames(className, s.section)}>
      {isMobile && <SakuraAnimation className={s.canvas} />}
      <img
        className={s.characters_img}
        src={'images/characters.webp'}
        alt="characters"
      />
      <div className={s.content}>
        <a href="https://discord.gg/FYWk9dEe" className={s.cta}>
          <button className={s.button}>JOIN</button>
        </a>
        <div className={s.text_wrap}>
          <div className={s.title}>Boku no haremu</div>
          <div className={s.subtitle}>GROW YOUR UNIQUE WAIFU</div>
        </div>
      </div>
    </section>
  )
}

export { Hero }

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
        <Link href="/game">
          <a className={s.button}>PLAY &amp; EARN</a>
        </Link>
        <div>
          <div className={s.title}>Boku no haremu</div>
          <div className={s.subtitle}>a true strategy nft game</div>
        </div>
      </div>
    </section>
  )
}

export { Hero }

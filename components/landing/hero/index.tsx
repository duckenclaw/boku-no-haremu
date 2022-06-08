/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { SakuraAnimation } from './sakura_animation'

import { Image } from 'components/shared-ui/image'
import Link from 'next/link'
type Props = {
  className?: string
}

const Hero: React.FC<Props> = ({ className }) => {
  const [isCharactersLoaded, setIsCharactersLoaded] = useState(false)

  return (
    <section className={classNames(className, s.section)}>
      <SakuraAnimation className={s.canvas} />
      <Image
        className={classNames(isCharactersLoaded && s.loaded, s.characters_img)}
        mode="scale-animate"
        src={'images/characters.webp'}
        alt="characters"
        onLoad={() => setIsCharactersLoaded(true)}
      />
      <div className={s.content}>
        <div className={s.buttons}>
          <Link href="/play">
            <a className={s.cta}>
              <button className={s.button}>PLAY</button>
            </a>
          </Link>
          <a href="https://bridge.bokunoharemu.com/" className={s.bridge_btn}>
            <button className={s.button}>Bridge</button>
          </a>
        </div>

        <div className={s.text_wrap}>
          <div className={s.title}>Boku no haremu</div>
          <div className={s.subtitle}>GROW YOUR UNIQUE WAIFU</div>
        </div>
      </div>
    </section>
  )
}

export { Hero }

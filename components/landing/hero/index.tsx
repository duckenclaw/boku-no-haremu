/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { SakuraAnimation } from './sakura_animation'

import { Image } from 'components/shared-ui/image'
type Props = {
  className?: string
}

const Hero: React.FC<Props> = ({ className }) => {
  const [isClient, setIsClient] = useState(false)
  const [isCharactersLoaded, setIsCharactersLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className={classNames(className, s.section)}>
      <SakuraAnimation className={s.canvas} />
      {isClient && (
        <Image
          className={classNames(
            isCharactersLoaded && s.loaded,
            s.characters_img
          )}
          src={'images/characters.webp'}
          alt="characters"
          onLoad={() => setIsCharactersLoaded(true)}
        />
      )}
      <div className={s.content}>
        <a href="https://discord.gg/S3rbu5GXGQ" className={s.cta}>
          <button className={s.button}>PLAY</button>
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

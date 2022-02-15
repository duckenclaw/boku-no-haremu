import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import Image from 'next/image'

type Props = {
  className?: string
}

const Hero: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames(className, s.container)}>
      <div className={s.characters}>
        <Image
          objectFit="cover"
          layout="fill"
          src={'/images/characters.png'}
          alt="characters"
        />
      </div>
      <div className={s.content}>
        <button className={s.button}>PLAY & EARN</button>
        <h1 className={s.title}>Only Haremu</h1>
        <h2 className={s.description}>A true strategy NFT game</h2>
      </div>
    </div>
  )
}

export { Hero }

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
          src={'/images/characters.png'}
          alt="characters"
          width={1494}
          height={842}
        />
      </div>
      <div className={s.text}>
        <button>PLAY & EARN</button>
        <h1 className={s.title}>Only Haremu</h1>
        <h2 className={s.description}>A true strategy NFT game</h2>
      </div>
    </div>
  )
}

export { Hero }

import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import Link from 'next/link'
import IconInst from '/public/images/svg/Subtract.svg'
import IconMed from '/public/images/svg/medium.svg'
import IconDisc from '/public/images/svg/discord.svg'
import IconTwit from '/public/images/svg/icon-twitter.svg'

type Props = {
  className?: string
}

const Socials: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames(className, s.container)}>
      <ul className={s.list}>
        <li>
          <Link href="#">
            <a className={s.item}>
              <IconDisc />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a className={s.item}>
              <IconMed />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a className={s.item}>
              <IconTwit />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a className={s.item}>
              <IconInst />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export { Socials }

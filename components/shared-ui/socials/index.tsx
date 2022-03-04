import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import Link from 'next/link'
import IconInst from '/public/images/svg/icon-inst.svg'
import IconFace from '/public/images/svg/icon-face.svg'
import IconDisc from '/public/images/svg/icon-disc.svg'
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
              <IconInst />
            </a>
          </Link>
        </li>
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
              <IconFace />
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
      </ul>
    </div>
  )
}

export { Socials }

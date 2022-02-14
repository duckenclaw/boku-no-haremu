import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import Link from 'next/link'

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
              <img src="images/svg/icon-inst.svg" alt="" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a className={s.item}>
              <img src="images/svg/icon-disc.svg" alt="" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a className={s.item}>
              <img src="images/svg/icon-face.svg" alt="" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a className={s.item}>
              <img src="images/svg/icon-twitter.svg" alt="" />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export { Socials }

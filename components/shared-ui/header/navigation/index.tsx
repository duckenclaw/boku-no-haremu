import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'

type Props = {
  className?: string
}

const Navigation: React.FC<Props> = ({ className }) => {
  return (
    <nav className={classNames(className, s.container)}>
      <ul className={s.navList}>
        <li>
          <a className={s.navItem} href="#">
            TOKENS
          </a>
        </li>
        <li>
          <a className={s.navItem} href="#">
            NFTS
          </a>
        </li>
        <li>
          <a className={s.navItem} href="#">
            GROWTH
          </a>
        </li>
        <li>
          <a className={s.navItem} href="#">
            BLENDING
          </a>
        </li>
        <li>
          <a className={s.navItem} href="#">
            TYPES
          </a>
        </li>
        <li>
          <a className={s.navItem} href="#">
            ROAD MAP
          </a>
        </li>
      </ul>
    </nav>
  )
}

export { Navigation }

import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'

type Props = {
  className?: string
}

const Navigation: React.FC<Props> = ({ className }) => (
  <nav className={classNames(className, s.container)}>
    <ul className={s.navList}>
      <li className={s.navItem}>
        <a className={s.navLink} href="#">
          TOKENS
        </a>
      </li>
      <li className={s.navItem}>
        <a className={s.navLink} href="#">
          NFTS
        </a>
      </li>
      <li className={s.navItem}>
        <a className={s.navLink} href="#">
          GROWTH
        </a>
      </li>
      <li className={s.navItem}>
        <a className={s.navLink} href="#">
          BLENDING
        </a>
      </li>
      <li className={s.navItem}>
        <a className={s.navLink} href="#">
          TYPES
        </a>
      </li>
      <li className={s.navItem}>
        <a className={s.navLink} href="#">
          ROAD MAP
        </a>
      </li>
      <li className={s.navItem}>
        <a className={s.navLink} href="#">
          WHITE PAPER
        </a>
      </li>
    </ul>
  </nav>
)

export { Navigation }

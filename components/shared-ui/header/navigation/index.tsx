import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import Link from 'next/link'

type Props = {
  className?: string
}

const Navigation: React.FC<Props> = ({ className }) => (
  <nav className={classNames(className, s.container)}>
    <ul className={s.navList}>
      <li className={s.navItem}>
        <Link href="/tokens/">
          <a className={s.navLink}>TOKENS</a>
        </Link>
      </li>
      <li className={s.navItem}>
        <Link href="/nfts/">
          <a className={s.navLink}>NFTS</a>
        </Link>
      </li>
      <li className={s.navItem}>
        <Link href="/growth/">
          <a className={s.navLink}>GROWTH</a>
        </Link>
      </li>
      <li className={s.navItem}>
        <Link href="/blending/">
          <a className={s.navLink}>BLENDING</a>
        </Link>
      </li>
      <li className={s.navItem}>
        <Link href="/rarity/">
          <a className={s.navLink}>RARITY</a>
        </Link>
      </li>
      <li className={s.navItem}>
        <Link href="/road_map/">
          <a className={s.navLink}>ROAD MAP</a>
        </Link>
      </li>
      <li className={s.navItem}>
        <Link href="/white_paper/">
          <a className={s.navLink}>WHITE PAPER</a>
        </Link>
      </li>
    </ul>
  </nav>
)

export { Navigation }

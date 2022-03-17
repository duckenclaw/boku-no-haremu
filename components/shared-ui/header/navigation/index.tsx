import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
//import Link from 'next/link'
import { Link, animateScroll as scroll } from 'react-scroll'

type Props = {
  className?: string
}

const items = [
  { value: 'TOKENS', href: 'tokens' },
  { value: 'NFTS', href: 'nfts' },
  { value: 'GROWTH', href: 'growth' },
  { value: 'BLENDING', href: 'blending' },
  { value: 'RARITY', href: 'rarity' },
  { value: 'ROAD MAP', href: 'road_map' },
  { value: 'WHITE PAPER', href: '/white_paper' },
]

const Navigation: React.FC<Props> = ({ className }) => (
  <nav className={classNames(className, s.container)}>
    <ul className={s.navList}>
      {items.map((el, i) => (
        <li className={s.navItem} key={i}>
          <Link 
            to={el.href} 
            smooth={true}
            offset={-100}
            duration={500}>
            <a className={s.navLink}>{el.value}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export { Navigation }

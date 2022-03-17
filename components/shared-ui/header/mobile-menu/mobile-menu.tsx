import Link from 'next/link'
import React from 'react'
import s from './styles.module.scss'

const items = [
  { value: 'TOKENS', href: '/tokens' },
  { value: 'NFTS', href: '/nfts' },
  { value: 'GROWTH', href: '/growth' },
  { value: 'BLENDING', href: '/blending' },
  { value: 'RARITY', href: '/rarity' },
  { value: 'ROAD MAP', href: '/road_map' },
  { value: 'WHITE PAPER', href: '/white_paper' },
]

export const MobileMenu = () => (
  <div className={s.container}>
    <div className="hamburger-menu">
      <input id="menu__toggle" type="checkbox" className={s.menu__toggle} />
      <label className={s.menu__btn} htmlFor="menu__toggle">
        <span></span>
      </label>
      <ul className={s.menu__box}>
        {items.map((el, i) => (
          <li className={s.menu__item} key={i}>
            <Link href={el.href}>
              <a className={s.navLink}>{el.value}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

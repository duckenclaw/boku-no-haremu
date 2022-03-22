import React, { useState } from 'react'
import s from './styles.module.scss'
import { default as NextLink } from 'next/link'
import { Link, animateScroll as scroll } from 'react-scroll'

const items = [
  { value: 'TOKENS', href: 'tokens' },
  { value: 'NFTS', href: 'nfts' },
  { value: 'GROWTH', href: 'growth' },
  { value: 'BLENDING', href: 'blending' },
  { value: 'RARITY', href: 'rarity' },
  { value: 'ROAD MAP', href: 'road_map' },
]

export const MobileMenu = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleOnChange = () => {
    setIsChecked(!isChecked)
  }
  return (
    <div className={s.container}>
      <div className="hamburger-menu">
        <input
          id="menu__toggle"
          type="checkbox"
          checked={isChecked}
          onChange={handleOnChange}
          className={s.menu__toggle}
        />
        <label className={s.menu__btn} htmlFor="menu__toggle">
          <span></span>
        </label>
        <ul className={s.menu__box}>
          {items.map((el, i) => (
            <li className={s.menu__item} onClick={handleOnChange} key={i}>
              <Link
                to={el.href}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={handleOnChange}
              >
                {el.value}
              </Link>
            </li>
          ))}
          <li className={s.menu__item}>
            <NextLink href="/white_paper">WHITE PAPER</NextLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

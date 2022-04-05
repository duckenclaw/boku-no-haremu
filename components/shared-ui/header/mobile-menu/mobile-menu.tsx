import React, { useState } from 'react'
import s from './styles.module.scss'
import { default as NextLink } from 'next/link'
// import { Link, animateScroll as scroll } from 'react-scroll'

const items = [
  { value: 'GROWTH', href: 'growth' },
  { value: 'RESOURCES', href: 'resources' },
  // { value: 'TRADE', href: 'trade' },
  { value: 'NFTS', href: 'nfts' },
  { value: 'FUSION', href: 'fusion' },
  // { value: 'ROADMAP', href: 'roadmap' },
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
            <li className={s.menu__item} key={i} onClick={handleOnChange}>
              <NextLink href={`/#${el.href}`} scroll={false}>
                {el.value}
              </NextLink>
            </li>
          ))}
          <li className={s.menu__item}>
            <a
              href="https://bokunoharemu.notion.site/bokunoharemu/Boku-no-Haremu-Whitepaper-417e138e88b949098bbbe71e5c74631e"
              target="_blank"
              rel="noreferrer"
            >
              WHITE PAPER
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

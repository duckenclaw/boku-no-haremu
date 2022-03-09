import React from 'react'
import s from './styles.module.scss'

export const MobileMenu = () => {
  return (
    <div className={s.container}>
      <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" className={s.menu__toggle} />
        <label className={s.menu__btn} htmlFor="menu__toggle">
          <span></span>
        </label>
        <ul className={s.menu__box}>
          <li><a className={s.menu__item} href="#">TOKENS</a></li>
          <li><a className={s.menu__item} href="#">NFTS</a></li>
          <li><a className={s.menu__item} href="#">GROWTH</a></li>
          <li><a className={s.menu__item} href="#">BLENDING</a></li>
          <li><a className={s.menu__item} href="#">TYPES</a></li>
          <li><a className={s.menu__item} href="#">ROAD MAP</a></li>
          <li><a className={s.menu__item} href="#">WHITE PAPER</a></li>
        </ul>
      </div>
    </div>
  )
}

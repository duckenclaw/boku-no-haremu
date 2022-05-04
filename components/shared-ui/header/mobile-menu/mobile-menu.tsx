import React, { useEffect, useState } from 'react'
import s from './styles.module.scss'
import IconBurger from 'public/images/svg/humburger.svg'
import IconCross from 'public/images/svg/cross.svg'
import { Socials } from 'components/shared-ui/socials'
import { Navigation } from '../navigation'
import cn from 'classnames'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'

export const MobileMenu = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleOnChange = () => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    const $scrollableElement = document.querySelector('.menu-box-scrollable')
    if (isChecked && $scrollableElement) {
      disablePageScroll($scrollableElement)
    }
  })

  return (
    <div className={s.container}>
      <input
        id="menu__toggle"
        type="checkbox"
        checked={isChecked}
        onChange={handleOnChange}
        className={s.menu__toggle}
      />
      <label className={s.menu__btn} htmlFor="menu__toggle">
        {isChecked ? <IconCross /> : <IconBurger />}
      </label>
      <div className={cn(s.menu__box, 'menu-box-scrollable')}>
        <Navigation setIsChecked={setIsChecked} />
        <div className={s.menu__social}>
          <Socials />
        </div>
      </div>
    </div>
  )
}

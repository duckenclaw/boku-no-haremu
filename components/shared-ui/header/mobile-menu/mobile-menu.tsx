import React, { useEffect, useLayoutEffect, useState } from 'react'
import s from './styles.module.scss'
import disableScroll from 'disable-scroll'

import IconBurger from 'public/images/svg/humburger.svg'
import IconCross from 'public/images/svg/cross.svg'
import { Socials } from 'components/shared-ui/socials'
import { Navigation } from '../navigation'

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

  useEffect(() => {
    if (isChecked) {
      disableScroll['on']()
    } else {
      disableScroll['off']()
    }
  }, [isChecked])

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
      <div className={s.menu__box}>
        <Navigation />
        <div className={s.menu__social}>
          <Socials />
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useLayoutEffect, useState } from 'react'
import s from './styles.module.scss'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'

import IconBurger from 'public/images/svg/humburger.svg'
import IconCross from 'public/images/svg/cross.svg'
import { Socials } from 'components/shared-ui/socials'

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
  const router = useRouter()

  const styleLink = (href: string) =>
    router.asPath != href ? { color: '#FF418A' } : { color: '#2E92BF' }

  useEffect(() => {
    document.addEventListener('scroll', () => {
      let elem = document.elementFromPoint(window.screen.width / 2, 100)
      console.log(elem?.id)
      if (elem?.id) router.push(`#${elem?.id}`)
    })
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
      <div className={s.menu__box}>
        <ul className={s.menu__list}>
          {items.map((el, i) => (
            <li
              className={s.menu__item}
              style={styleLink(`/#${el.href}`)}
              key={i}
              onClick={handleOnChange}
            >
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

        <Socials />
      </div>
    </div>
  )
}

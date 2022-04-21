import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { default as NextLink } from 'next/link'
import useScrollSpy from 'react-use-scrollspy'

const OFFSET = 90

type Props = {
  className?: string
  setIsChecked?: React.Dispatch<React.SetStateAction<boolean>>
}

const items = [
  { value: 'GROWTH', href: 'growth' },
  { value: 'RESOURCES', href: 'resources' },
  { value: 'NFTS', href: 'nfts' },
  { value: 'FUSION', href: 'fusion' },
  { value: 'ROADMAP', href: 'roadmap' },
]

const Navigation: React.FC<Props> = ({ className, setIsChecked }) => {
  const [isScrollspyActive, setIsScrollspyActive] = useState(false)
  const handleOnChange = () => {
    if (setIsChecked) setIsChecked(false)
  }
  const sectionRefs = [
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
  ]

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.section')
    const handleScroll = () => {
      if (OFFSET <= sections[0].getBoundingClientRect().top) {
        setIsScrollspyActive(false)
      } else {
        setIsScrollspyActive(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    sectionRefs.forEach(
      (item, i) => (item.current = sections[i] as HTMLElement)
    )
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const activeSection = useScrollSpy({
    activeSectionDefault: -1,
    sectionElementRefs: sectionRefs,
    offsetPx: -OFFSET,
  })

  return (
    <nav className={classNames(className, s.container)}>
      <ul className={s.navList}>
        {items.map((el, i) => {
          return (
            <li className={s.navItem} key={i} onClick={handleOnChange}>
              <NextLink href={`/#${el.href}`} scroll={false}>
                <a
                  className={classNames(
                    activeSection === i && isScrollspyActive && s.navItem_active
                  )}
                >
                  {el.value}
                </a>
              </NextLink>
            </li>
          )
        })}
        <li className={s.navItem}>
          <a
            href="https://bokunoharemu.notion.site/bokunoharemu/Boku-no-Haremu-Whitepaper-417e138e88b949098bbbe71e5c74631e"
            target="_blank"
            rel="noreferrer"
          >
            WHITE PAPER
          </a>
        </li>
      </ul>
    </nav>
  )
}

export { Navigation }

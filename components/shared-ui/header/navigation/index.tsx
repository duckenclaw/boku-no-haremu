import React, { useRef } from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import { Scrollspy } from '@makotot/ghostui'

type Props = {
  className?: string
  setIsChecked?: React.Dispatch<React.SetStateAction<boolean>>
}

const items = [
  { value: 'GROWTH', href: 'growth' },
  { value: 'RESOURCES', href: 'resources' },
  // { value: 'TRADE', href: 'trade' },
  { value: 'NFTS', href: 'nfts' },
  { value: 'FUSION', href: 'fusion' },
  { value: 'ROADMAP', href: 'roadmap' },
]

const Navigation: React.FC<Props> = ({ className, setIsChecked }) => {
  const handleOnChange = () => {
    if (setIsChecked) setIsChecked(false)
  }

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  return (
    <nav className={classNames(className, s.container)}>
      <Scrollspy sectionRefs={sectionRefs}>
        {({ currentElementIndexInViewport }) => (
          <ul className={s.navList}>
            {items.map((el, i) => (
              <li
                className={
                  currentElementIndexInViewport === i
                    ? s.navItem_active
                    : s.navItem
                }
                key={i}
                onClick={handleOnChange}
              >
                <NextLink href={`/#${el.href}`} scroll={false}>
                  {el.value}
                </NextLink>
              </li>
            ))}
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
        )}
      </Scrollspy>
    </nav>
  )
}

export { Navigation }

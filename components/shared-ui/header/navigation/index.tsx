import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import Scrollspy from 'react-scrollspy'

type Props = {
  className?: string
}

const items = [
  { value: 'GROWTH', href: 'growth' },
  { value: 'RESOURCES', href: 'resources' },
  // { value: 'TRADE', href: 'trade' },
  { value: 'NFTS', href: 'nfts' },
  { value: 'FUSION', href: 'fusion' },
  { value: 'ROADMAP', href: 'roadmap' },
]

const Navigation: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  const onUpdate = (elem: HTMLElement) => {
    if (elem?.id && `/#${elem?.id}` !== router.asPath) {
      console.log(elem.id)
      router.push(
        {
          pathname: `#${elem?.id}`,
        },
        `#${elem?.id}`,
        { shallow: true }
      )
    }
  }
  return (
    <nav className={classNames(className, s.container)}>
      <Scrollspy
        items={items.map((el) => el.href)}
        className={s.navList}
        currentClassName={s.navItem_active}
        onUpdate={onUpdate}
      >
        {items.map((el, i) => (
          <li className={s.navItem} key={i}>
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
      </Scrollspy>
    </nav>
  )
}

export { Navigation }

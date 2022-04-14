import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  className?: string
}

const items = [
  { value: 'GROWTH', href: 'growth' },
  { value: 'RESOURCES', href: 'resources' },
  // { value: 'TRADE', href: 'trade' },
  { value: 'NFTS', href: 'nfts' },
  { value: 'FUSION', href: 'fusion' },
  // { value: 'ROADMAP', href: 'roadmap' },
]

const Navigation: React.FC<Props> = ({ className }) => {
  const router = useRouter()

  const styleLink = (href: string) =>
    router.asPath != href ? { color: '#FF418A' } : { color: '#2E92BF' }

  return (
    <nav className={classNames(className, s.container)}>
      <ul className={s.navList}>
        {items.map((el, i) => (
          <li className={s.navItem} key={i} style={styleLink(`/#${el.href}`)}>
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
    </nav>
  )
}

export { Navigation }

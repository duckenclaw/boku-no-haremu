import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import { default as NextLink } from 'next/link'

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

const Navigation: React.FC<Props> = ({ className }) => (
  <nav className={classNames(className, s.container)}>
    <ul className={s.navList}>
      {items.map((el, i) => (
        <li className={s.navItem} key={i}>
          <NextLink href={`/#${el.href}`} scroll={false}>
            {el.value}
          </NextLink>
        </li>
      ))}
      <li className={s.navItem}>
        <NextLink href="/white_paper">WHITE PAPER</NextLink>
      </li>
    </ul>
  </nav>
)

export { Navigation }

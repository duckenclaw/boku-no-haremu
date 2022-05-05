import classNames from 'classnames'
import React from 'react'
import s from './styles.module.scss'
import { Image } from 'components/shared-ui/image'

type Props = {
  className?: string
}

const Socials: React.FC<Props> = ({ className }) => (
  <ul className={classNames(s.list, className)}>
    <li>
      <a
        href="https://discord.gg/S3rbu5GXGQ"
        className={s.item}
        target="_blank"
        rel="noreferrer"
      >
        <Image raw src="/images/svg/discord.svg" className={s.icon} />
      </a>
    </li>
    <li>
      <a
        href="https://wax.atomichub.io/explorer/collection/bokunoharemu"
        className={s.item}
        target="_blank"
        rel="noreferrer"
      >
        <Image raw src="/images/svg/atomic.svg" className={s.icon} />
      </a>
    </li>
    <li>
      <a
        href="https://medium.com/@bokunoharemu"
        className={s.item}
        target="_blank"
        rel="noreferrer"
      >
        <Image raw src="/images/svg/medium.svg" className={s.icon} />
      </a>
    </li>
    <li>
      <a
        href="https://twitter.com/bokunoharemu"
        className={s.item}
        target="_blank"
        rel="noreferrer"
      >
        <Image raw src="/images/svg/twitter.svg" className={s.icon} />
      </a>
    </li>
    <li>
      <a
        href="https://t.me/bokunoharemu"
        className={s.item}
        target="_blank"
        rel="noreferrer"
      >
        <Image src="/images/svg/telegram.svg" className={s.icon} />
      </a>
    </li>
    {/*<li>
      <a className={s.item}>
        <Image src="/images/svg/nefty.svg" className={s.icon} />
      </a>
    </li>*/}
  </ul>
)

export { Socials }

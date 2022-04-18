import classNames from 'classnames'
import React from 'react'
import s from './styles.module.scss'

type Props = {
  className?: string
}

const Socials: React.FC<Props> = ({ className }) => (
  <ul className={classNames(s.list, className)}>
    <li>
      <a href="https://discord.gg/S3rbu5GXGQ" className={s.item}>
        <img src="/images/svg/discord.svg" className={s.icon} />
      </a>
    </li>
    <li>
      <a href="https://medium.com/@bokunoharemu" className={s.item}>
        <img src="/images/svg/medium.svg" className={s.icon} />
      </a>
    </li>
    <li>
      <a href="https://twitter.com/bokunoharemu" className={s.item}>
        <img src="/images/svg/twitter.svg" className={s.icon} />
      </a>
    </li>
    {/*<li>
      <a className={s.item}>
        <img src="/images/svg/nefty.svg" className={s.icon} />
      </a>
    </li>*/}
  </ul>
)

export { Socials }

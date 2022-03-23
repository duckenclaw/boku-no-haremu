import React from 'react'
import s from './styles.module.scss'

type Props = {
  className?: string
}

const Socials: React.FC<Props> = () => (
  <ul className={s.list}>
    <li>
      <a href="https://discord.gg/GN5CukNF" className={s.item}>
        <img src="/images/discord.png" className={s.icon} />
      </a>
    </li>
    <li>
      <a href="https://medium.com/@bokunoharemu" className={s.item}>
        <img src="/images/medium.png" className={s.icon} />
      </a>
    </li>
    <li>
      <a href="https://twitter.com/bokunoharemu" className={s.item}>
        <img src="/images/twitter.png" className={s.icon} />
      </a>
    </li>
    {/*<li>
      <a className={s.item}>
        <img src="/images/nefty.png" className={s.icon} />
      </a>
    </li>*/}
  </ul>
)

export { Socials }

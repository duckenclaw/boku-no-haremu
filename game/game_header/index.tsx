import { useWax } from 'contexts/wax_context'
import s from './game_header.module.scss'

type Res = {
  value: string
  logo: string
}

const res: Res[] = [
  {
    value: '0',
    logo: 'nyan',
  },
  {
    value: '0',
    logo: 'crystal',
  },
  {
    value: '0',
    logo: 'simptetix',
  },
  {
    value: '0',
    logo: 'bento',
  },
]

export const GameHeader = () => {
  const { wax } = useWax()
  return (
    <header className={s.container}>
      <div className={s.profile_info}>{wax?.userAccount}</div>
      <div className={s.cards}>
        {res?.map((item: Res) => (
          <div key={item.logo} className={s.res}>
            <img className={s.cardPriceIcon} src={`images/${item.logo}.png`} />
            {item.value}
          </div>
        ))}
        <div>
          <img src="images/Icon.png" />
        </div>
      </div>
    </header>
  )
}

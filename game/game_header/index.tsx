import { useWax } from 'contexts/wax_context'
import { useGetResources, useWaxBalance } from 'game/game_api'
import IconInfo from 'public/game/svg/IconInfo.svg'
import IconSound from 'public/game/svg/IconSound.svg'
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
  const { data: resourcesData } = useGetResources()
  const { data: balanceData } = useWaxBalance()
  return (
    <header className={s.container}>
      <div className={s.profile_info}>
        <span className={s.user}>{wax?.userAccount}</span>
        <span>
          {balanceData?.balance} {balanceData?.currency}
        </span>
      </div>

      <div className={s.cards}>
        <div className={s.res}>
          <img
            className={s.cardPriceIcon}
            alt="nya"
            src={`images/currencies/nyan.png`}
          />
          {resourcesData?.nya.balance ?? 0}
        </div>
        <div className={s.res}>
          <img
            className={s.cardPriceIcon}
            alt="crystal"
            src={`images/currencies/crystal.png`}
          />
          {resourcesData?.cht.balance ?? 0}
        </div>
        <div className={s.res}>
          <img
            className={s.cardPriceIcon}
            alt="simptetix"
            src={`images/currencies/simptetix.png`}
          />
          {resourcesData?.smp.balance ?? 0}
        </div>
        <div className={s.res}>
          <img
            className={s.cardPriceIcon}
            alt="bento"
            src={`images/currencies/bento.png`}
          />
          {resourcesData?.bnt.balance ?? 0}
        </div>
      </div>
      <div className={s.info}>
        <IconInfo className={s.icon_info} />
        <IconSound />
      </div>
    </header>
  )
}

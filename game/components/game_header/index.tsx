import { animated, useSpring } from '@react-spring/web'
import { useWax } from 'contexts/wax_context'
import { useGetResources, useWaxBalance } from 'game/game_api'
import IconInfo from 'public/game/svg/icon_info.svg'
import IconSound from 'public/game/svg/icon_sound.svg'
import s from './game_header.module.scss'
import { Image } from 'components/shared-ui/image'

type ResourceBalanceProps = {
  value?: number
}
const ResourceBalance = animated(({ value = 0 }: ResourceBalanceProps) => {
  return <>{value.toFixed(0)}</>
})

export const GameHeader = () => {
  const { account } = useWax()
  const { data: resourcesData } = useGetResources()
  const { data: balanceData } = useWaxBalance()

  const { bnt, cht, nya, smp } = useSpring({
    to: {
      bnt: resourcesData?.bnt.balance,
      cht: resourcesData?.cht.balance,
      nya: resourcesData?.nya.balance,
      smp: resourcesData?.smp.balance,
    },
  })
  return (
    <header className={s.container}>
      <div className={s.profile_info}>
        <span className={s.user}>{account}</span>
        <span>
          {balanceData?.balance} {balanceData?.currency}
        </span>
      </div>

      <div className={s.cards}>
        <div className={s.res}>
          <Image
            className={s.cardPriceIcon}
            alt="nya"
            src={`/images/currencies/nyan.png`}
          />
          <ResourceBalance value={nya} />
        </div>
        <div className={s.res}>
          <Image
            className={s.cardPriceIcon}
            alt="crystal"
            src={`/images/currencies/crystal.png`}
          />
          <ResourceBalance value={cht} />
        </div>
        <div className={s.res}>
          <Image
            className={s.cardPriceIcon}
            alt="simptetix"
            src={`/images/currencies/simptetix.png`}
          />
          <ResourceBalance value={smp} />
        </div>
        <div className={s.res}>
          <Image
            className={s.cardPriceIcon}
            alt="bento"
            src={`/images/currencies/bento.png`}
          />
          <ResourceBalance value={bnt} />
        </div>
      </div>
      <div className={s.info}>
        <IconInfo className={s.icon_info} />
        <IconSound />
      </div>
    </header>
  )
}

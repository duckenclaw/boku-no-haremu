import { useEffect, useState, useRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
import cn from 'classnames'

import { useWax } from 'contexts/wax_context'
import { Tooltip } from 'game/components/tooltip'
import { Image } from 'components/shared-ui/image'
import { useGetResources, useWaxBalance } from 'game/game_api'

import IconInfo from 'public/game/svg/icon_info.svg'
import IconSound from 'public/game/svg/icon_sound.svg'
import IconArrow from 'public/game/svg/dropdown_arrow.svg'

import s from './game_header.module.scss'

type ResourceBalanceProps = {
  value?: number
}
const ResourceBalance = animated(({ value = 0 }: ResourceBalanceProps) => {
  return <>{value.toFixed(0)}</>
})

export const GameHeader = () => {
  const { account, logout } = useWax()
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

  ///TODO DROPDOWN LOGIC refactor out to header
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cb = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!ref.current || ref.current.contains(target)) {
        return
      }
      setIsDropdownOpen(false)
    }
    window.addEventListener('click', cb, { passive: true })
    return () => window.removeEventListener('click', cb)
  }, [])

  return (
    <header className={s.container}>
      <div className={s.profile_info}>
        <div
          className={s.user}
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen)
          }}
          ref={ref}
        >
          {account}
          <IconArrow className={cn(s.arrow, { [s.open]: isDropdownOpen })} />
        </div>
        <span>
          {balanceData?.balance} {balanceData?.currency}
        </span>
        <div
          className={cn(s.header_dropdown, { [s.open]: isDropdownOpen })}
          onClick={(e) => e.stopPropagation()}
        >
          <a href={`https://wax.bloks.io/account/${account}`}>My Wallet</a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              logout?.()
            }}
          >
            logout
          </a>
        </div>
      </div>

      <div className={s.cards}>
        <div className={s.res} data-tip="Nyan">
          <Image
            className={s.cardPriceIcon}
            alt="nyan"
            mode="none"
            src={`/images/currencies/nyan.png`}
          />
          <ResourceBalance value={nya} />
        </div>
        <div className={s.res} data-tip="Chantment">
          <Image
            className={s.cardPriceIcon}
            alt="crystal"
            mode="none"
            src={`/images/currencies/crystal.png`}
          />
          <ResourceBalance value={cht} />
        </div>
        <div className={s.res} data-tip="Simpthetix">
          <Image
            className={s.cardPriceIcon}
            alt="simptetix"
            mode="none"
            src={`/images/currencies/simptetix.png`}
          />
          <ResourceBalance value={smp} />
        </div>
        <div className={s.res} data-tip="Bento">
          <Image
            className={s.cardPriceIcon}
            alt="bento"
            mode="none"
            src={`/images/currencies/bento.png`}
          />
          <ResourceBalance value={bnt} />
        </div>
        <Tooltip />
      </div>
      <div className={s.info}>
        <IconInfo className={s.icon_info} />
        <IconSound />
      </div>
    </header>
  )
}

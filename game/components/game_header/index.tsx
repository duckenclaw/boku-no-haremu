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
import { GameDialog } from '../game_dialog'
import { useGame } from 'game/game_context'

type ResourceBalanceProps = {
  value?: number
}
const ResourceBalance = animated(({ value = 0 }: ResourceBalanceProps) => {
  return <>{value.toFixed(0)}</>
})

const LS_TIP_KEY = 'BOKUNOHAREMU_user_seen_tip_'

const hasUserSeenScreen = (screen: string) => {
  return !!localStorage.getItem(LS_TIP_KEY + screen)
}

const setUserSeenScreen = (screen: string) => {
  localStorage.setItem(LS_TIP_KEY + screen, 'true')
}

const getTextByScreen = (screen: string) => {
  switch (screen) {
    case 'craft':
      return `Here happens magic, your resources become waifu, but unfortunately only first level ones. Though, you can choose between Mimi-chan, Hitomi, H1-Bride and Chantress!`
    case 'mine':
      return `Your waifus await orders from you Senpai and here you can give them what they want! They can gather resources and do everything for prosperity of the Harem. But remember they need love and care!`
    case 'atm':
      return `Here you can withdraw resources you gathered in Boku no Haremu world to the outside world and vice versa. With that you can trade them with other harem masters.`
    case 'fuse':
      return `Your waifus are evolving with you! Fuse your cards of the same level and type to get cards of the next level! Your primary waifu in the fusion will get new traits as well as upgrade her level.`
    case 'inventory':
      return `Here you can see all your waifus and banknotes. Inspect them more closely and find out which traits each of them has, what level are they and so on.`
    default:
      return `I will help and guide you through your harem.`
  }
}

export const GameHeader = () => {
  const { screen } = useGame()
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  useEffect(() => {
    if (!hasUserSeenScreen(screen)) setIsInfoOpen(true)
  }, [screen])

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
    <>
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
          <div className={s.res} id="header-resource-nya" data-tip="Nyan">
            <Image
              className={s.cardPriceIcon}
              alt="nyan"
              mode="none"
              src={`/images/currencies/game_nyan.png`}
            />
            <ResourceBalance value={nya} />
          </div>
          <div className={s.res} id="header-resource-cht" data-tip="Chantment">
            <Image
              className={s.cardPriceIcon}
              alt="crystal"
              mode="none"
              src={`/images/currencies/game_chantment.png`}
            />
            <ResourceBalance value={cht} />
          </div>
          <div className={s.res} id="header-resource-smp" data-tip="Simpthetix">
            <Image
              className={s.cardPriceIcon}
              alt="simptetix"
              mode="none"
              src={`/images/currencies/game_simpthetix.png`}
            />
            <ResourceBalance value={smp} />
          </div>
          <div className={s.res} id="header-resource-bnt" data-tip="Bento">
            <Image
              className={s.cardPriceIcon}
              alt="bento"
              mode="none"
              src={`/images/currencies/game_bento.png`}
            />
            <ResourceBalance value={bnt} />
          </div>
          <Tooltip />
        </div>
        <div className={s.info}>
          <IconInfo
            className={s.icon_info}
            onClick={() => setIsInfoOpen(true)}
          />
          <IconSound className={s.icon_sound} data-tip="Coming Soon" />
        </div>
      </header>
      <GameDialog
        cancelLabel="Don't show again"
        isOpen={isInfoOpen}
        onClickOutside={() => {
          setIsInfoOpen(false)
        }}
        onCancel={() => {
          setIsInfoOpen(false)
          setUserSeenScreen(screen)
        }}
        onOk={() => {
          setIsInfoOpen(false)
        }}
      >
        {getTextByScreen(screen)}
      </GameDialog>
    </>
  )
}

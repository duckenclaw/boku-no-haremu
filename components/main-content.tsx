import React from 'react'
import classNames from 'classnames'
import s from '/styles/Home.module.css'
import RoadMap from './road_map/road_map'
import { GrowWaifu } from './GrowWaifu'
import { TokenisedEconomy } from './TokenisedEconomy'
import { ExclusiveNfts } from './ExclusiveNfts'

type Props = {
  className?: string
}

const MainContent: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames(className, s.container)}>
      <main className={s.main}>
        <TokenisedEconomy />
        <ExclusiveNfts />
        <GrowWaifu />
        <RoadMap />
      </main>
    </div>
  )
}

export default MainContent

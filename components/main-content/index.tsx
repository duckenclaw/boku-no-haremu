import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import RoadMap from '../road-map/road_map'
import { GrowWaifu } from '../grow-waifu'
import { TokenisedEconomy } from '../tokenised-economy'
import { ExclusiveNfts } from '../exclusive-nfts'
import { Hero } from '../hero'
import { Header } from '../shared-ui/header'

type Props = {
  className?: string
}

const MainContent: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames(className, s.container)}>
      <Header />
      <main className={s.main}>
        <Hero />
        <div className={s.sections}>
          <TokenisedEconomy />
          <ExclusiveNfts />
          <GrowWaifu />
          <RoadMap />
        </div>
      </main>
    </div>
  )
}

export default MainContent

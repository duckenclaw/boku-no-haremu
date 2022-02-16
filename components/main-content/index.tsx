import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'
import RoadMap from '../road-map/road_map'
import { GrowWaifu } from '../grow-waifu'
import { TokenisedEconomy } from '../tokenised-economy'
import { ExclusiveNfts } from '../exclusive-nfts'
import { Hero } from '../hero'
import { Header } from '../shared-ui/header'
import { TypesOfRarity } from '../types-of-rarity'

type Props = {
  className?: string
}

const MainContent: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <Header />
    <main className={s.main}>
      <Hero />
      <div className={s.sections}>
        <TokenisedEconomy />
        <ExclusiveNfts />
        <GrowWaifu />
        <TypesOfRarity />
        <RoadMap />
      </div>
    </main>
  </div>
)

export default MainContent

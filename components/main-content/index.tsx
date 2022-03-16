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
import { SmartBlending } from '../smart-blending'
import { Rules } from '../rules'
import { ContactInfo } from '../contact_info'

const MainContent: React.FC = () => (
  <>
    <TokenisedEconomy />
    <ExclusiveNfts />
    <GrowWaifu />
    <SmartBlending />
    <TypesOfRarity />
    <Rules />
    <RoadMap />
    <ContactInfo />
  </>
)

export default MainContent

import React from 'react'
import classNames from 'classnames'
import s from '/styles/Home.module.css'
import { Footer } from './shared-ui/footer/footer'
import RoadMap from './road_map/road_map'
import { GrowWaifu } from './GrowWaifu'

type Props = {
  className?: string
}

const MainContent: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames(className, s.container)}>
      <main className={s.main}>
        <GrowWaifu />
        <RoadMap />
      </main>
      <Footer />
    </div>
  )
}

export default MainContent

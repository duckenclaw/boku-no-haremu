import type { NextPage } from 'next'
import { ExclusiveNfts } from 'components/landing/exclusive-nfts'
import { GrowWaifu } from 'components/landing/grow-waifu'
import { Layout } from 'components/landing/layout'
import { RoadMap } from 'components/landing/road-map'
import { Rules } from 'components/landing/rules'
import { SmartBlending } from 'components/landing/smart-blending'
import { TokenisedEconomy } from 'components/landing/tokenised-economy'
import { PreviewText } from 'components/landing/preview-text/preview_text'
import { SliderCharacters } from 'components/landing/slider-characters'

const Home: NextPage = () => (
  <Layout>
    <PreviewText />
    <GrowWaifu />
    <TokenisedEconomy />
    <ExclusiveNfts />
    <SliderCharacters />
    <SmartBlending />
    <Rules />
    <RoadMap />
  </Layout>
)

export default Home

import type { NextPage } from 'next'
import { ContactInfo } from 'components/landing/contact_info'
import { ExclusiveNfts } from 'components/landing/exclusive-nfts'
import { GrowWaifu } from 'components/landing/grow-waifu'
import { Layout } from 'components/landing/layout'
import { RoadMap } from 'components/landing/road-map'
import { Rules } from 'components/landing/rules'
import { SmartBlending } from 'components/landing/smart-blending'
import { TokenisedEconomy } from 'components/landing/tokenised-economy'
import { TypesOfRarity } from 'components/landing/types-of-rarity'
import { PreviewText } from 'components/landing/preview-text/preview_text'
import { SliderCharacters } from 'components/landing/slider-characters'

const Home: NextPage = () => (
  <Layout>
    <PreviewText />
    <GrowWaifu />
    <TokenisedEconomy />
    <ExclusiveNfts />
    <SmartBlending />
    {/*<TypesOfRarity />*/}
    <Rules />
    <SliderCharacters />
    <RoadMap />
    <ContactInfo />
  </Layout>
)

export default Home

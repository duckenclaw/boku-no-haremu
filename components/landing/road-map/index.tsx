import React from 'react'
import s from './road_map.module.scss'
import { TextHeader } from 'components/shared-ui/text-header'
import { Container } from 'components/shared-ui/container'

export const RoadMap = () => {
  const row = [
    {
      number: 'Q1 2022',
      text: [
        'Create Mintpass',
        'Create NFTs',
        'Create SmartContract',
        'Release of packs, sales',
      ],
    },
    {
      number: 'Q2 2022',
      text: [
        'Token listing',
        'Whitelisted on AtomicHub',
        'New Waifus',
        'New resource gathering modes',
      ],
    },
    {
      number: 'Q3 2022',
      text: [
        'Achievements',
        'PVP mode',
        'Listing Partnerships',
        'Launch on BSC',
      ],
    },
    {
      number: 'Q4 2022',
      text: [
        'Bridge for NFT and tokens',
        'Guilds, guild battles',
        'Launch on Mobile(Android/iOS)',
      ],
    },
  ]

  return (
    <section>
      <Container className={s.wrap}>
        <TextHeader title="ROADMAP" className={s.textHeader} id="road_map" />
        <div className={s.columns_wrapper}>
          {row.map((item, index) => (
            <div className={s.row} key={index}>
              <div className={s.number}>{item.number}</div>
              <div className={s.circle}></div>
              <div className={s.text}>
                <ul className={s.list}>
                  {item.text.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

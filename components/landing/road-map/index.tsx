import React from 'react'
import s from './road_map.module.scss'
import { TextHeader } from 'components/shared-ui/text-header'
import { Container } from 'components/shared-ui/container'
import cn from 'classnames'

export const RoadMap = () => {
  const row = [
    {
      number: 'MARCH 2022',
      text: ['Webpage', 'Create SmartContract'],
      className: 'done',
    },
    {
      number: 'APRIL 2022',
      text: [
        'Whitelist on AtomicHub',
        'Mintpass sale',
        'Packs sale',
        'Release the Demo Game',
      ],
    },
    {
      number: 'MAY 2022',
      text: ['Generative NFTs up to Lvl 3', 'Launch'],
    },
    {
      number: 'JUNE 2022',
      text: [
        'Generative Waifu NFTs up to 5th Lvl',
        'Bridge NFTs of 5th Lvl to Ethereum',
      ],
    },
  ]

  return (
    <section className={cn(s.section, 'section')}>
      <a className="anchor" id="roadmap" />
      <Container className={s.wrap}>
        <TextHeader title="ROADMAP" className={s.textHeader} />
        <div className={s.first_shadow} />
        <div className={s.second_shadow} />
        <div className={s.columns_wrapper}>
          {row.map((item, index) => (
            <div className={s.row} key={index}>
              <div className={s.circle}></div>
              {index % 2 ? (
                <div className={s.item_right}>
                  <div className={s.number}>{item.number}</div>
                  <div className={s.text}>
                    <ul className={s.list}>
                      {item.text.map((el, i) => (
                        <li key={i}>{el}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className={s.item_left}>
                  <div className={s.number}>{item.number}</div>
                  <div className={s.text}>
                    <ul className={s.list}>
                      {item.text.map((el, i) => (
                        <li key={i}>{el}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

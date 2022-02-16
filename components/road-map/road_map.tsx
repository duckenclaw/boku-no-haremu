import React from 'react'
import s from './road_map.module.scss'
import { TextHeader } from '../shared-ui/text-header'
import Container from '../shared-ui/container'

export const RoadMap = () => {
  const row = [
    {
      number: 'Q1 2022',
      text: [
        'Ideation',
        'Team Formation',
        'Strategic Advisors',
        'Game Logic Development',
        'MVP Development',
      ],
      color: '#E669A3',
      background: '#E669A3',
      boxShadow: '0px 0px 33px 40px rgba(230, 105, 163, 0.2)',
    },
    {
      number: 'Q2 2022',
      text: [
        'Ideation',
        'Team Formation',
        'Strategic Advisors',
        'Game Logic Development',
        'MVP Development',
      ],
      color: '#FDF150',
      background: '#FDF150',
      boxShadow: '0px 0px 33px 40px rgba(253, 241, 80, 0.2)',
    },
    {
      number: 'Q3 2022',
      text: [
        'Ideation',
        'Team Formation',
        'Strategic Advisors',
        'Game Logic Development',
        'MVP Development',
      ],
      color: '#00FF75',
      background: '#00FF75',
      boxShadow: '0px 0px 33px 40px rgba(0, 255, 117, 0.2)',
    },
    {
      number: 'Q4 2022',
      text: [
        'Ideation',
        'Team Formation',
        'Strategic Advisors',
        'Game Logic Development',
        'MVP Development',
      ],
      color: '#56CCF2',
      background: '#56CCF2',
      boxShadow: '0px 0px 33px 40px rgba(86, 204, 242, 0.2)',
    },
  ]

  return (
    <section>
      <Container className={s.wrap}>
        <TextHeader
          title="ROAD MAP"
          subtitle="The panel designers have found the best possible solution to protect the damaged ends of the panels with thin but rigid aluminium profiles. This ensures a durable construction and a clean seam."
          className={s.textHeader}
        />
        <div className={s.columns_wrapper}>
          {row.map((item, index) => (
            <div className={s.row} key={index}>
              <div className={s.number} style={{ color: item.color }}>
                {item.number}
              </div>
              <div
                className={s.circle}
                style={{
                  background: item.background,
                  boxShadow: item.boxShadow,
                }}
              ></div>
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

export default RoadMap

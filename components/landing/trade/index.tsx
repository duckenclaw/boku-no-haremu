import React from 'react'
import s from './styles.module.scss'
import { TextHeader } from 'components/shared-ui/text-header'
import { Container } from 'components/shared-ui/container'
import { Image } from 'components/shared-ui/image'

export const Trade = () => {
  type Row = {
    title: string
    logo: string
  }

  const rows: Row[] = [
    {
      title: 'NYAN',
      logo: 'nyan',
    },
    {
      title: 'Simptetix',
      logo: 'simptetix',
    },
    {
      title: 'BENTO',
      logo: 'bento',
    },
    {
      title: 'Chantment',
      logo: 'crystal',
    },
  ]
  return (
    <section>
      <Container className={s.wrap}>
        <TextHeader title="Trade resource assets" className={s.textHeader} />
        <div className={s.resource}>
          {rows?.map((row: Row) => (
            <div key={row.title} className={s.row}>
              <Image
                raw
                className={s.rowLogo}
                src={`images/${row.logo}.png`}
                alt={row.title}
              />
              <Image
                raw
                className={s.arrow}
                src="images/svg/arrow.svg"
                alt="arrow"
              />
              <Image raw className={s.bill} src="images/bill.png" alt="bill" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

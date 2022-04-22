import Head from 'next/head'
import React from 'react'
import { Hero } from '../hero'
import { Header } from 'components/shared-ui/header'
import s from './layout.module.scss'
import cn from 'classnames'
import { Footer } from '../footer'
import { Image } from 'components/shared-ui/image'

export const Layout: React.FC = ({ children }) => (
  <>
    <Head>
      <title>Boku no haremu</title>
    </Head>
    <Header />
    <Hero />
    <main className={s.main}>
      <div className={s.wave_gr}>
        <Image src="/images/clouds.png" className={s.wave} />
      </div>
      <div className={cn(s.sections, 'sections')}>{children}</div>
      <Footer />
    </main>
  </>
)

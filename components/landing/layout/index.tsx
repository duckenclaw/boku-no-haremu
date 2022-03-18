import Head from 'next/head'
import React from 'react'
import { Hero } from '../hero'
import { Header } from 'components/shared-ui/header'
import s from './layout.module.scss'

export const Layout: React.FC = ({ children }) => (
  <>
    <Head>
      <link rel="shortcut icon" href="images/favicon.ico" />
      <title>Boku no haremu</title>
    </Head>
    <Header />
    <Hero />
    <main className={s.main}>
      <div className={s.wave} />
      <div className={s.sections}>{children}</div>
    </main>
  </>
)

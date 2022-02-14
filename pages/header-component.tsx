import React from 'react'
import classNames from 'classnames'
import { Header } from '../components/shared-ui/header.tsx'
import { Hero } from '../components/shared-ui/hero'

type Props = {
  className?: string
}

const HeaderComponent: React.FC<Props> = ({ className }) => {
  return (
    <>
      <Header />
      <Hero />
      <div
        style={{
          height: 800,
          marginTop: '100vh',
          width: '100%',
          position: 'relative',
          zIndex: '2',
          background: 'red',
        }}
      ></div>
    </>
  )
}

export default HeaderComponent

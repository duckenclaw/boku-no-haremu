import React from 'react'
import s from './layout.module.scss'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className={s.layout}>
    <div className={s.content}>{children}</div>
  </div>
)

export default Layout

import React from 'react'
import classNames from 'classnames'
import s from '/styles/Home.module.css'
import Image from 'next/image'

type Props = {
  className?: string
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={s.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className={s.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  )
}

export { Footer }

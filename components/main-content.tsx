import React from 'react'
import classNames from 'classnames'
import s from '/styles/Home.module.css'
import { Footer } from './shared-ui/footer/footer'
import { TokenisedEconomy } from './TokenisedEconomy'

type Props = {
  className?: string
}

const MainContent: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames(className, s.container)}>
      <main className={s.main}>
        <h1 className={s.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={s.description}>
          Get started by editing <code className={s.code}>pages/index.tsx</code>
        </p>

        <div className={s.grid}>
          <a href="https://nextjs.org/docs" className={s.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={s.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={s.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={s.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
      <TokenisedEconomy />
      <Footer />
    </div>
  )
}

export default MainContent

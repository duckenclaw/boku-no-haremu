import React from 'react'
import classNames from 'classnames'
import s from './tokens.module.scss'
import Layout from '../../components/layout/layout'
import { Header } from '../../components/shared-ui/header'
import Container from '../../components/shared-ui/container'
import { PageTitle } from '../../components/page_title'

const Tokens = () => {
  return (
    <Layout>
      <Header />
      <Container>
        <PageTitle />
      </Container>
    </Layout>
  )
}

export default Tokens

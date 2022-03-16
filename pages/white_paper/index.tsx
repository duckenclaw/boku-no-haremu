import React from 'react'
import Layout from '../../components/layout/layout'
import { PageTitle } from '../../components/page_title'
import Container from '../../components/shared-ui/container'
import { Header } from '../../components/shared-ui/header'

const WhitePaper = () => {
  return (
    <Layout>
      <Header />
      <Container>
        <PageTitle />
      </Container>
    </Layout>
  )
}

export default WhitePaper

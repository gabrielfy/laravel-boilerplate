import React from 'react'
import App from '@/containers/App'
import Card, { CardBody } from '@/components/Card'

function Home() {
  return (
    <App>
      <Card>
        <CardBody>You are logged in!</CardBody>
      </Card>
    </App>
  )
}

export default Home

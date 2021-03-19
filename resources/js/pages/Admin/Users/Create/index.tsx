import React from 'react'

import Admin from '@/containers/Admin'
import Card, { CardBody } from '@/components/Card'

const UserCreate = () => {
  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Users',
          url: route('admin.users.index')
        },
        {
          label: 'Create',
          url: route('admin.users.index')
        }
      ]}
    >
      <Card>
        <CardBody>
          <div className="space-y-4">create</div>
        </CardBody>
      </Card>
    </Admin>
  )
}

export default UserCreate

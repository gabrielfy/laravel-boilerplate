import React from 'react'

import Admin from '@/containers/Admin'
import Card, { CardBody } from '@/components/Card'

const RoleCreate = () => {
  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Roles',
          url: route('admin.roles.index')
        },
        {
          label: 'Create',
          url: route('admin.roles.index')
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

export default RoleCreate

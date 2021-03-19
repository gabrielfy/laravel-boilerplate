import React from 'react'

import Admin from '@/containers/Admin'

const RolesEdit = () => {
  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Roles',
          url: route('admin.roles.index')
        },
        {
          label: 'Edit',
          url: route('admin.roles.index')
        }
      ]}
    >
      Edit
    </Admin>
  )
}

export default RolesEdit

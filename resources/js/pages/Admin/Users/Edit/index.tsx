import React from 'react'

import Admin from '@/containers/Admin'

const UserEdit = () => {
  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Users',
          url: route('admin.users.index')
        },
        {
          label: 'Edit',
          url: route('admin.users.index')
        }
      ]}
    >
      Edit
    </Admin>
  )
}

export default UserEdit

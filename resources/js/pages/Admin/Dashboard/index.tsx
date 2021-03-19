import React from 'react'

import Admin from '@/containers/Admin'

const Dashboard = () => {
  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Dashboard',
          url: route('admin.dashboard')
        }
      ]}
    >
      <h1>Dashboard</h1>
    </Admin>
  )
}

export default Dashboard

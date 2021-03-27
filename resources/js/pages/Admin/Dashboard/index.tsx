import React from 'react'

import Admin from '@/containers/Admin'
import { useAuth } from '@/hooks'

const Dashboard = () => {
  const { first_name } = useAuth()
  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Dashboard',
          url: route('admin.dashboard')
        }
      ]}
    >
      <h1 className="font-semibold text-2xl text-gray-600">
        Welcome back, {first_name}!
      </h1>
    </Admin>
  )
}

export default Dashboard
